import { saveEntity } from "@/app/actions";
import { EditPage, HiddenFields, TextField } from "@/components/EditPage";
import type { SessionUser, Worker } from "@/lib/types";

export function WorkerForm({ user, record }: { user: SessionUser; record?: Worker }) {
  return (
    <EditPage user={user} active="workers" entity="workers" isNew={!record} action={saveEntity}>
      <HiddenFields entity="workers" id={record?.id} redirectTo="/dictionary/workers" />
      <TextField entity="workers" field="workerSurname" label="Worker surname" required value={record?.surname} />
      <TextField entity="workers" field="workerName" label="Worker name" required value={record?.name} />
      <TextField entity="workers" field="workerMiddleName" label="Worker middle name" value={record?.middleName} />
      <TextField entity="workers" field="workerPhone" label="Worker phone" value={record?.phone} />
    </EditPage>
  );
}
