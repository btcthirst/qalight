import { saveEntity } from "@/app/actions";
import { DateTimeField, EditPage, HiddenFields, TextField } from "@/components/EditPage";
import { nowParts, parseDateParts } from "@/lib/format";
import type { InstallationRecord, SessionUser } from "@/lib/types";

export function InstallationForm({ user, record }: { user: SessionUser; record?: InstallationRecord }) {
  const value = record ? parseDateParts(record.date) : nowParts();

  return (
    <EditPage user={user} active="installation" entity="installation" isNew={!record} action={saveEntity}>
      <HiddenFields entity="installation" id={record?.id} redirectTo="/dictionary/installation" />
      <TextField
        entity="installation"
        field="apparatNumber"
        label="Apparat number"
        required
        value={record?.apparatNumber}
      />
      <TextField entity="installation" field="spare" label="Spare" value={record?.spare} />
      <TextField entity="installation" field="worker" label="Worker" value={record?.worker} />
      <DateTimeField entity="installation" field="date" label="Date" value={value} />
    </EditPage>
  );
}
