import { SpareOperationForm } from "@/components/forms/SpareOperationForm";
import { spareOperationRepo, dealRepo, dealTypeRepo, sparesRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewSpareOperationPage() {
  const user = await requireUser();
  return <SpareOperationForm user={user} deals={await dealRepo.list()} types={await dealTypeRepo.list()} spares={await sparesRepo.list()} />;
}
