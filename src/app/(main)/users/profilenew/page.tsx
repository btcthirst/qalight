import { UserProfileForm } from "@/components/forms/UserProfileForm";
import { requireUser } from "@/lib/require-user";

export default async function NewUserPage() {
  const user = await requireUser();
  return <UserProfileForm user={user} isNew />;
}
