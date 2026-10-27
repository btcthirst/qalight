import { notFound } from "next/navigation";

import { WorkerForm } from "@/components/forms/WorkerForm";
import { workersRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { Worker } from "@/lib/types";

export default async function EditWorkerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const record = (await workersRepo.get(Number(id))) as Worker | undefined;
  if (!record) notFound();
  return <WorkerForm user={user} record={record} />;
}
