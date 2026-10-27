import { saveEntity } from "@/app/actions";
import { EditPage, HiddenFields, TextField } from "@/components/EditPage";
import type { DealType, SessionUser } from "@/lib/types";

export function DealTypeForm({ user, record }: { user: SessionUser; record?: DealType }) {
  return (
    <EditPage user={user} active="deal_type" entity="deal_type" isNew={!record} action={saveEntity}>
      <HiddenFields entity="deal_type" id={record?.id} redirectTo="/dictionary/deal_type" />
      <TextField entity="deal_type" field="dealTypeName" label="Deal type name" required value={record?.name} />
    </EditPage>
  );
}
