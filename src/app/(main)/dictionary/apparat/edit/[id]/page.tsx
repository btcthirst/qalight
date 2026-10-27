import { notFound } from "next/navigation";

import { ApparatForm } from "@/components/forms/ApparatForm";
import { apparatRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { Apparat } from "@/lib/types";

export default async function EditApparatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const record = (await apparatRepo.get(Number(id))) as Apparat | undefined;
  if (!record) notFound();
  return <ApparatForm user={user} record={record} />;
}
