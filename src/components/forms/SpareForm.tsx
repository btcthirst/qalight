import { saveEntity } from "@/app/actions";
import { EditPage, HiddenFields, SelectField, TextField } from "@/components/EditPage";
import type { SessionUser, Spare, SpareType } from "@/lib/types";

export function SpareForm({
  user,
  record,
  types,
}: {
  user: SessionUser;
  record?: Spare;
  types: SpareType[];
}) {
  return (
    <EditPage user={user} active="spares" entity="spares" isNew={!record} action={saveEntity}>
      <HiddenFields entity="spares" id={record?.id} redirectTo="/dictionary/spares" />
      <TextField entity="spares" field="spareName" label="Spare name" required value={record?.name} />
      <SelectField
        entity="spares"
        field="spareType"
        label="SpareType"
        value={record?.typeId}
        emptyOption
        options={types.map((type) => ({ value: String(type.id), label: type.name }))}
      />
    </EditPage>
  );
}
