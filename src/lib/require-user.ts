import { redirect } from "next/navigation";

import { getSession } from "./session";
import type { SessionUser } from "./types";

export async function requireUser(): Promise<SessionUser> {
  const user = await getSession();
  if (!user) redirect("/login");
  return user;
}
