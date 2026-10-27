import { notFound } from "next/navigation";

import { SpareOperationForm } from "@/components/forms/SpareOperationForm";
import { spareOperationRepo, dealRepo, dealTypeRepo, sparesRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { SpareOperation } from "@/lib/types";

export default async function EditSpareOperationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const [deals, types, spares] = await Promise.all([dealRepo.list(), dealTypeRepo.list(), sparesRepo.list()]);
  const record = (await spareOperationRepo.get(Number(id))) as SpareOperation | undefined;
  if (!record) notFound();
  return <SpareOperationForm user={user} record={record} deals={deals} types={types} spares={spares} />;
}
