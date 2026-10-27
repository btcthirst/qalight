import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifySession } from "@/lib/token";
import { internalErrorResponse } from "@/lib/symfony-error";

const PUBLIC_PATHS = [
  /^\/login$/,
  /^\/login_check$/,
  /^\/logout$/,
  /^\/register\.html$/,
  /^\/favicon\.ico$/,
  /^\/apple-touch-icon\.png$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  // The original site crashes on the installation dictionary (list and form pages).
  if (pathname === "/dictionary/installation" || pathname.startsWith("/dictionary/installation/")) {
    return internalErrorResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|bundles|favicon.ico).*)"],
};
