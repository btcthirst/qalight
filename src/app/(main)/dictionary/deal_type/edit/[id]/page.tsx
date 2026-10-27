import { notFound } from "next/navigation";

import { DealTypeForm } from "@/components/forms/DealTypeForm";
import { dealTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { DealType } from "@/lib/types";

export default async function EditDealTypePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const record = (await dealTypeRepo.get(Number(id))) as DealType | undefined;
  if (!record) notFound();
  return <DealTypeForm user={user} record={record} />;
}
