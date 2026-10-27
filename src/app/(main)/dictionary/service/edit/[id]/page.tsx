import { notFound } from "next/navigation";

import { ServiceForm } from "@/components/forms/ServiceForm";
import { serviceRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { ServiceRecord } from "@/lib/types";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const record = (await serviceRepo.get(Number(id))) as ServiceRecord | undefined;
  if (!record) notFound();
  return <ServiceForm user={user} record={record} />;
}
