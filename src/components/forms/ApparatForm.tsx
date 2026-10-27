import { saveEntity } from "@/app/actions";
import { EditPage, HiddenFields, TextField } from "@/components/EditPage";
import type { Apparat, SessionUser } from "@/lib/types";

export function ApparatForm({ user, record }: { user: SessionUser; record?: Apparat }) {
  return (
    <EditPage user={user} active="apparat" entity="apparat" isNew={!record} action={saveEntity}>
      <HiddenFields entity="apparat" id={record?.id} redirectTo="/dictionary/apparat" />
      <TextField entity="apparat" field="apparatNumber" label="Apparat number" required value={record?.number} />
      <TextField entity="apparat" field="apparatComment" label="Apparat comment" required value={record?.comment} />
    </EditPage>
  );
}
