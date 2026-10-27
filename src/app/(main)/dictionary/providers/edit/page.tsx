import { ProviderForm } from "@/components/forms/ProviderForm";
import { providersRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewProviderPage() {
  const user = await requireUser();
  return <ProviderForm user={user} />;
}
