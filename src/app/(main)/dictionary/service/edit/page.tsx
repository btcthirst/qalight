import { ServiceForm } from "@/components/forms/ServiceForm";
import { serviceRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function NewServicePage() {
  const user = await requireUser();
  return <ServiceForm user={user} />;
}
