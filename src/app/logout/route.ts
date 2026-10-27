import { NextResponse } from "next/server";

import { destroySession } from "@/lib/session";

export async function GET(request: Request): Promise<NextResponse> {
  await destroySession();
  return NextResponse.redirect(new URL("/login", request.url), 302);
}
