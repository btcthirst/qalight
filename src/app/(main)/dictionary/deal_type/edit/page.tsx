import { DealTypeForm } from "@/components/forms/DealTypeForm";
import { dealTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewDealTypePage() {
  const user = await requireUser();
  return <DealTypeForm user={user} />;
}
