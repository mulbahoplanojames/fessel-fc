import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      const signInUrl = new URL("/sign-in", request.nextUrl.origin);
      signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};