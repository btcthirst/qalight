import { SpareTypeForm } from "@/components/forms/SpareTypeForm";
import { spareTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewSpareTypePage() {
  const user = await requireUser();
  return <SpareTypeForm user={user} />;
}
