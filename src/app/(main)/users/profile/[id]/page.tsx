import { notFound } from "next/navigation";

import { UserProfileForm } from "@/components/forms/UserProfileForm";
import { usersRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const record = await usersRepo.get(Number(id));
  if (!record) notFound();
  return <UserProfileForm user={user} record={record} />;
}
