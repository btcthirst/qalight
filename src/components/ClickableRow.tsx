"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function ClickableRow({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  return <tr onClick={() => router.push(href)}>{children}</tr>;
}
