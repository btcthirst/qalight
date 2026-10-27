import { notFound } from "next/navigation";

import { ProviderForm } from "@/components/forms/ProviderForm";
import { providersRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";
import type { Provider } from "@/lib/types";

export default async function EditProviderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const record = (await providersRepo.get(Number(id))) as Provider | undefined;
  if (!record) notFound();
  return <ProviderForm user={user} record={record} />;
}
