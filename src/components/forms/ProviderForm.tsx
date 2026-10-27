import { saveEntity } from "@/app/actions";
import { CheckboxField, EditPage, HiddenFields, TextField } from "@/components/EditPage";
import type { Provider, SessionUser } from "@/lib/types";

export function ProviderForm({ user, record }: { user: SessionUser; record?: Provider }) {
  return (
    <EditPage user={user} active="prov_cus" entity="prov_cus" isNew={!record} action={saveEntity}>
      <HiddenFields entity="prov_cus" id={record?.id} redirectTo="/dictionary/providers" />
      <TextField entity="prov_cus" field="proCustName" label="Pro cust name" required value={record?.name} />
      <TextField entity="prov_cus" field="proCustAddress" label="Pro cust address" required value={record?.address} />
      <TextField entity="prov_cus" field="proCustPhone" label="Pro cust phone" value={record?.phone} />
      <CheckboxField entity="prov_cus" field="proCustIsFl" label="Private person" checked={record?.isFl} />
      <CheckboxField entity="prov_cus" field="isOurFirm" label="Is our firm" checked={record?.isOurFirm} />
    </EditPage>
  );
}
