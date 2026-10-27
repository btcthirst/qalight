import { cookies } from "next/headers";

import { usersRepo } from "./db";
import type { SessionUser, User } from "./types";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession } from "./token";

function toSessionUser(user: User): SessionUser {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    registeredAt: user.createdAt,
  };
}

export async function authenticate(login: string, password: string): Promise<SessionUser | null> {
  const users = await usersRepo.list();
  const user = users.find(
    (item) =>
      (item.username && item.username === login) ||
      (item.email && item.email === login),
  );
  if (!user) return null;
  if (user.password !== password) return null;
  return toSessionUser(user);
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = await signSession({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    registeredAt: user.registeredAt,
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const payload = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!payload) return null;
  return {
    id: payload.id,
    name: payload.name,
    username: payload.username,
    email: payload.email,
    registeredAt: payload.registeredAt,
  };
}
