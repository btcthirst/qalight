import { saveEntity } from "@/app/actions";
import { EditPage, HiddenFields, TextField } from "@/components/EditPage";
import type { SessionUser, SpareType } from "@/lib/types";

export function SpareTypeForm({ user, record }: { user: SessionUser; record?: SpareType }) {
  return (
    <EditPage user={user} active="spareType" entity="spareType" isNew={!record} action={saveEntity}>
      <HiddenFields entity="spareType" id={record?.id} redirectTo="/dictionary/spare_type" />
      <TextField entity="spareType" field="spareTypeName" label="Spare type name" required value={record?.name} />
    </EditPage>
  );
}
