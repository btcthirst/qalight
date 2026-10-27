import { NextResponse } from "next/server";

import { authenticate, createSession } from "@/lib/session";

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const login = String(formData.get("_username") ?? "").trim();
  const password = String(formData.get("_password") ?? "");

  const user = await authenticate(login, password);
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url), 302);
  }

  await createSession(user);
  return NextResponse.redirect(new URL("/", request.url), 302);
}
