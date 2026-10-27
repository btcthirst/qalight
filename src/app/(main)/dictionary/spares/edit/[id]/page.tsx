import { notFound } from "next/navigation";

import { SpareForm } from "@/components/forms/SpareForm";
import { sparesRepo, spareTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { Spare } from "@/lib/types";

export default async function EditSparePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const types = await spareTypeRepo.list();
  const record = (await sparesRepo.get(Number(id))) as Spare | undefined;
  if (!record) notFound();
  return <SpareForm user={user} record={record} types={types} />;
}
