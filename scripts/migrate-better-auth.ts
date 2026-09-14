/**
 * One-time migration: NextAuth/Auth.js (v5 beta) -> Better Auth. IDEMPOTENT.
 *
 * Transformations:
 *  - Drop legacy NextAuth unique index (Account_provider_providerAccountId_key)
 *    BEFORE renaming fields: renamed docs would otherwise key as {null, null}
 *    and violate the unique index.
 *  - User.emailVerified: DateTime|null -> Boolean.
 *  - User.password -> Account{ providerId: "credential" } (Better Auth stores
 *    credential passwords on the Account table, linked by accountId = user id).
 *  - Account: provider -> providerId, providerAccountId -> accountId,
 *    refresh_token -> refreshToken, access_token -> accessToken,
 *    id_token -> idToken, expires_at -> accessTokenExpiresAt (epoch s -> Date),
 *    token_type/session_state dropped, createdAt/updatedAt backfilled if missing.
 *  - Session: sessionToken -> token, expires -> expiresAt, ipAddress/userAgent
 *    added as null. (Old NextAuth cookies are NOT reused by Better Auth, so
 *    users must sign in again.)
 *  - VerificationToken -> Verification (identifier, value, expiresAt).
 *  - Create Better Auth indexes.
 *
 * Run with: DATABASE_URL=... node scripts/migrate-better-auth.ts
 */

import { MongoClient, type Collection } from "mongodb";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const client = new MongoClient(url);

const OLD_ACCOUNT_UNIQUE_INDEX = "Account_provider_providerAccountId_key";

async function dropLegacyAccountIndex(accounts: Collection) {
  const existing = await accounts.indexes();
  const hasLegacy = existing.some((i) => i.name === OLD_ACCOUNT_UNIQUE_INDEX);
  if (hasLegacy) {
    console.log("Dropping legacy index", OLD_ACCOUNT_UNIQUE_INDEX);
    await accounts.dropIndex(OLD_ACCOUNT_UNIQUE_INDEX);
  }
}

async function main() {
  await client.connect();
  const db = client.db();

  const users = db.collection("User");
  const accounts = db.collection("Account");
  const sessions = db.collection("Session");
  const legacyVerification = db.collection("VerificationToken");
  const verification = db.collection("Verification");

  let userCount = 0;
  let credentialAccountsCreated = 0;
  let oauthAccountsMigrated = 0;
  let sessionsMigrated = 0;
  let verificationsMigrated = 0;
  const now = new Date();

  console.log("Migrating users...");
  const cursor = users.find({});
  for await (const user of cursor) {
    const emailVerified = Boolean(user.emailVerified);
    const name = user.name ?? "";

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerified,
          name,
          createdAt: user.createdAt ?? now,
          updatedAt: user.updatedAt ?? now,
        },
        ...(user.password ? { $unset: { password: "" } } : {}),
      }
    );
    userCount++;

    if (user.password) {
      const existing = await accounts.findOne({
        providerId: "credential",
        accountId: String(user._id),
      });
      if (!existing) {
        await accounts.insertOne({
          providerId: "credential",
          accountId: String(user._id),
          password: user.password,
          userId: user._id,
          createdAt: user.createdAt ?? now,
          updatedAt: user.updatedAt ?? now,
        });
        credentialAccountsCreated++;
      }
    }
  }
  console.log(`Migrated ${userCount} users.`);

  // MUST happen before any field renames on Account.
  await dropLegacyAccountIndex(accounts);

  console.log("Migrating OAuth accounts...");

  // Finish any half-renamed accounts (old fields gone, expires_at left behind).
  const partials = accounts.find({ providerId: { $exists: true } });
  for await (const account of partials) {
    const set: Record<string, unknown> = {};
    const unset: Record<string, string> = {};
    if (typeof account.expires_at === "number") {
      set.accessTokenExpiresAt = new Date(account.expires_at * 1000);
      unset.expires_at = "";
    }
    if (account.token_type) unset.token_type = "";
    if (account.session_state) unset.session_state = "";
    if (!account.createdAt) set.createdAt = now;
    if (!account.updatedAt) set.updatedAt = now;
    if (Object.keys(set).length || Object.keys(unset).length) {
      await accounts.updateOne(
        { _id: account._id },
        {
          ...(Object.keys(set).length ? { $set: set } : {}),
          ...(Object.keys(unset).length ? { $unset: unset } : {}),
        }
      );
      oauthAccountsMigrated++;
    }
  }

  // Migrate accounts that still use the legacy field names.
  const legacyAccounts = accounts.find({ provider: { $exists: true } });
  for await (const account of legacyAccounts) {
    const set: Record<string, unknown> = {};
    const unset: Record<string, string> = {};
    if (account.token_type) unset.token_type = "";
    if (account.session_state) unset.session_state = "";
    if (!account.createdAt) set.createdAt = account.createdAt ?? now;
    if (!account.updatedAt) set.updatedAt = now;

    const expiresValue =
      typeof account.expires_at === "number"
        ? new Date(account.expires_at * 1000)
        : undefined;

    await accounts.updateOne(
      { _id: account._id },
      {
        $rename: {
          provider: "providerId",
          providerAccountId: "accountId",
          refresh_token: "refreshToken",
          access_token: "accessToken",
          id_token: "idToken",
        },
        ...(Object.keys(set).length ? { $set: set } : {}),
        ...(expiresValue ? { $set: { accessTokenExpiresAt: expiresValue } } : {}),
        ...(Object.keys(unset).length ? { $unset: unset } : {}),
        ...(typeof account.expires_at !== "undefined" && !expiresValue
          ? { $unset: { expires_at: "" } }
          : {}),
      }
    );
    oauthAccountsMigrated++;
  }

  console.log("Migrating sessions...");
  const sessionCursor = sessions.find({ sessionToken: { $exists: true } });
  for await (const session of sessionCursor) {
    await sessions.updateOne(
      { _id: session._id },
      {
        $rename: {
          sessionToken: "token",
          expires: "expiresAt",
        },
        $set: {
          ipAddress: null,
          userAgent: null,
          createdAt: session.createdAt ?? now,
          updatedAt: session.updatedAt ?? now,
        },
      }
    );
    sessionsMigrated++;
  }

  console.log("Migrating verification tokens...");
  const verificationCursor = legacyVerification.find({});
  for await (const token of verificationCursor) {
    const identifier = token.identifier;
    const value = token.token ?? token.value ?? "";
    if (!value) continue;
    const exists = await verification.findOne({ identifier, value });
    if (!exists) {
      await verification.insertOne({
        identifier,
        value,
        expiresAt: token.expires ?? token.expiresAt ?? now,
        createdAt: now,
        updatedAt: now,
      });
      verificationsMigrated++;
    }
  }

  console.log("Ensuring indexes...");
  async function ensureIndex(
    collection: Collection,
    spec: Record<string, number>,
    options?: { unique?: boolean }
  ) {
    const existing = await collection.indexes();
    const keyMatches = (info: { key: Record<string, string | number> }) =>
      JSON.stringify(info.key) === JSON.stringify(spec);
    if (!existing.some(keyMatches)) {
      await collection.createIndex(spec, options);
    }
  }
  await ensureIndex(accounts, { providerId: 1, accountId: 1 }, { unique: true });
  await ensureIndex(accounts, { userId: 1 });
  await ensureIndex(sessions, { token: 1 }, { unique: true });
  await ensureIndex(sessions, { userId: 1 });
  await ensureIndex(verification, { identifier: 1 });
  await ensureIndex(users, { email: 1 }, { unique: true });

  console.log("Migration complete.");
  console.log({
    userCount,
    credentialAccountsCreated,
    oauthAccountsMigrated,
    sessionsMigrated,
    verificationsMigrated,
  });
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
}).finally(async () => {
  await client.close();
});