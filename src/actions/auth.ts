"use server";

import { signIn, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import prisma from "../../prisma";

export async function login(provider: string) {
  await signIn(provider, {
    redirectTo: "/admin",
  });
  revalidatePath("/admin");
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log("User not found", error);
    return null;
  }
};

export const loginWithCredentials = async (formData: FormData) => {
  try {
    const rawFormData = {
      email: formData.get("email") as string,
      password: formData.get("password"),
      role: "USER",
      redirectTo: "/admin",
    };

    // for debugging
    const existingUser = await getUserByEmail(rawFormData.email);
    if (existingUser) {
      console.log("User already exists", existingUser);
    }

    await signIn("credentials", rawFormData);
  } catch (error) {
    console.log("Error", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: {
              message: "Invalid credentials",
            },
          };
        default:
          return {
            error: {
              message: "Something went wrong",
            },
          };
      }
    }

    throw error;
  }

  revalidatePath("/admin");
};
