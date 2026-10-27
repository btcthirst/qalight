import { saveEntity } from "@/app/actions";
import { DateTimeField, EditPage, HiddenFields, TextField } from "@/components/EditPage";
import { nowParts, parseDateParts } from "@/lib/format";
import type { ServiceRecord, SessionUser } from "@/lib/types";

export function ServiceForm({ user, record }: { user: SessionUser; record?: ServiceRecord }) {
  const value = record ? parseDateParts(record.date) : nowParts();

  return (
    <EditPage user={user} active="service" entity="service" isNew={!record} action={saveEntity}>
      <HiddenFields entity="service" id={record?.id} redirectTo="/dictionary/service" />
      <TextField
        entity="service"
        field="apparatNumber"
        label="Apparat number"
        required
        value={record?.apparatNumber}
      />
      <TextField entity="service" field="changes" label="Changes" value={record?.changes} />
      <TextField entity="service" field="operations" label="Operations" value={record?.operations} />
      <TextField entity="service" field="worker" label="Worker" value={record?.worker} />
      <DateTimeField entity="service" field="date" label="Date" value={value} />
    </EditPage>
  );
}
