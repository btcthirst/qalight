import { ApparatForm } from "@/components/forms/ApparatForm";
import { apparatRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewApparatPage() {
  const user = await requireUser();
  return <ApparatForm user={user} />;
}
