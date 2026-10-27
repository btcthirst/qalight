import { WorkerForm } from "@/components/forms/WorkerForm";
import { workersRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewWorkerPage() {
  const user = await requireUser();
  return <WorkerForm user={user} />;
}
