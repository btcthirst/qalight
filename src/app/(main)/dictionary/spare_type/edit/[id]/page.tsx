import { notFound } from "next/navigation";

import { SpareTypeForm } from "@/components/forms/SpareTypeForm";
import { spareTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { SpareType } from "@/lib/types";

export default async function EditSpareTypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const record = (await spareTypeRepo.get(Number(id))) as SpareType | undefined;
  if (!record) notFound();
  return <SpareTypeForm user={user} record={record} />;
}
