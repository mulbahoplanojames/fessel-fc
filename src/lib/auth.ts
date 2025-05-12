import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
// import prisma from "../../prisma";
import prisma from "../../prisma";
import { saltAndHashPassword } from "@/utils/helpers/hash-salt-password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          required: true,
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const hashedPassword = saltAndHashPassword(
          credentials.password as string
        );

        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
        } else {
          if (!user.password) {
            throw new Error("Invalid credentials");
          }

          const isMatch = await bcrypt.compareSync(
            credentials.password as string,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid credentials from auth lib");
          }
        }
        return user;
      },
    }),
  ],
});
