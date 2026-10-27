import { saveEntity } from "@/app/actions";
import { EditPage, HiddenFields, SelectField, TextField } from "@/components/EditPage";
import { dealTypeName, formatDealDate } from "@/lib/format";
import type { Deal, DealType, SessionUser, Spare, SpareOperation } from "@/lib/types";

export function SpareOperationForm({
  user,
  record,
  deals,
  types,
  spares,
}: {
  user: SessionUser;
  record?: SpareOperation;
  deals: Deal[];
  types: DealType[];
  spares: Spare[];
}) {
  return (
    <EditPage
      user={user}
      active="spare_operation"
      entity="spare_operation"
      isNew={!record}
      action={saveEntity}
    >
      <HiddenFields entity="spare_operation" id={record?.id} redirectTo="/spare_operation" />
      <TextField
        entity="spare_operation"
        field="spareCount"
        label="Spare count"
        required
        value={record?.count}
      />
      <SelectField
        entity="spare_operation"
        field="deal"
        label="Deal"
        value={record?.dealId}
        emptyOption
        options={deals.map((deal) => ({
          value: String(deal.id),
          label: `${dealTypeName(types, deal.typeId)} ${formatDealDate(deal)}`,
        }))}
      />
      <SelectField
        entity="spare_operation"
        field="spare"
        label="Spares"
        value={record?.spareId}
        emptyOption
        options={spares.map((spare) => ({ value: String(spare.id), label: spare.name }))}
      />
    </EditPage>
  );
}
