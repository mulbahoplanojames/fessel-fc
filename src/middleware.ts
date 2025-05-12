import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  try {
    const session = await auth();
    const protectedRoutes = ["/admin"];

    const isProtectedRoute = protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
