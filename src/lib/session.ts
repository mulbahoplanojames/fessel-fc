import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.role !== "ADMIN") redirect("/");
  return session;
}

export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
}

export async function requireAdminInRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}