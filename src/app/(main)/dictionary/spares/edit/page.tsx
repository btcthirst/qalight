import { SpareForm } from "@/components/forms/SpareForm";
import { sparesRepo, spareTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewSparePage() {
  const user = await requireUser();
  return <SpareForm user={user} types={await spareTypeRepo.list()} />;
}
