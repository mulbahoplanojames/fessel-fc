import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import prisma from "../../prisma";
import { emailTemplate, sendEmail } from "./email";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BASE_URI ||
    "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    (process.env.NODE_ENV === "development"
      ? "dev-only-secret-change-me"
      : undefined),
  database: prismaAdapter(prisma, { provider: "mongodb" }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
        returned: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => await bcrypt.hash(password, 10),
      verify: async ({ hash, password }) =>
        await bcrypt.compare(password, hash),
    },
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Fessel FC password",
        html: emailTemplate({
          title: "Reset your password",
          message: `Hi ${user.name || "there"}, we received a request to reset your Fessel FC password. Click the button below to choose a new one. This link expires shortly.`,
          ctaLabel: "Reset password",
          ctaUrl: url,
        }),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your Fessel FC email",
        html: emailTemplate({
          title: "Verify your email",
          message: `Hi ${user.name || "there"}, welcome to Fessel FC! Confirm your email address to unlock your account.`,
          ctaLabel: "Verify email",
          ctaUrl: url,
        }),
      });
    },
  },
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),
    ...(githubClientId && githubClientSecret
      ? {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        }
      : {}),
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
});

export type Session = typeof auth.$Infer.Session;