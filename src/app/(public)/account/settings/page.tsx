import { requireUser } from "@/lib/session";
import prisma from "../../../../../prisma";
import { AccountSettings } from "@/components/account/account-settings";

export const metadata = {
  title: "Account Settings - FC Fassell",
};

export default async function SettingsPage() {
  const session = await requireUser();

  const [sessions, accounts] = await Promise.all([
    prisma.session.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.account.findMany({
      where: { userId: session.user.id },
    }),
  ]);

  const hasPassword = accounts.some(
    (account) => account.providerId === "credential" && !!account.password
  );

  const githubEnabled = !!(
    process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
  );

  return (
    <AccountSettings
      sessions={sessions.map((s) => ({
        id: s.id,
        token: s.token,
        ipAddress: s.ipAddress,
        userAgent: s.userAgent,
        createdAt: s.createdAt.toISOString(),
        expiresAt: s.expiresAt.toISOString(),
      }))}
      accounts={accounts.map((a) => ({
        id: a.id,
        providerId: a.providerId,
        accountId: a.accountId,
      }))}
      hasPassword={hasPassword}
      githubEnabled={githubEnabled}
    />
  );
}