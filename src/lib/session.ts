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

export async function requirePlayer() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.role !== "PLAYER") redirect("/");
  return session;
}

export async function requirePlayerOrAdmin() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  if (session.user.role !== "PLAYER" && session.user.role !== "ADMIN") redirect("/");
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

export async function requireUserInRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return null;
  }
  return session;
}

export async function requirePlayerInRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session || session.user.role !== "PLAYER") {
    return null;
  }
  return session;
}

export async function requirePlayerOrAdminInRequest(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session || (session.user.role !== "PLAYER" && session.user.role !== "ADMIN")) {
    return null;
  }
  return session;
}