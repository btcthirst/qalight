import { saveEntity } from "@/app/actions";
import { ClickableRow } from "@/components/ClickableRow";
import { DateTimeField, EditPage, HiddenFields, SelectField } from "@/components/EditPage";
import { nowParts } from "@/lib/format";
import type { Deal, DealType, Provider, SessionUser } from "@/lib/types";

export interface DealSpareRow {
  id: number;
  dealId: string;
  dealLabel: string;
  spare: string;
  count: string;
}

function DealSpares({ rows }: { rows: DealSpareRow[] }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Список запчастей</h3>
            <div className="box-tools">
              <a
                className="btn btn-info btn-sm"
                data-toggle="tooltip"
                title=""
                data-original-title="Add"
                href="/spare_operation/edit"
              >
                <i className="fa fa-plus" />
              </a>
            </div>
          </div>
          <div className="box-body table-responsive no-padding">
            <table className="table table-hover" id="device_list">
              <thead>
                <tr>
                  <th>Сделки</th>
                  <th>Деталь</th>
                  <th>Количество</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <ClickableRow key={row.id} href={`/spare_operation/edit/${row.id}`}>
                    <td>{row.dealLabel}</td>
                    <td>{row.spare}</td>
                    <td>{row.count}</td>
                  </ClickableRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DealForm({
  user,
  record,
  types,
  providers,
  spareRows = [],
}: {
  user: SessionUser;
  record?: Deal;
  types: DealType[];
  providers: Provider[];
  spareRows?: DealSpareRow[];
}) {
  const value = record
    ? {
        day: record.day,
        month: record.month,
        year: record.year,
        hour: record.hour,
        minute: record.minute,
      }
    : nowParts();

  const providerOptions = providers.map((provider) => ({
    value: String(provider.id),
    label: provider.name,
  }));

  const visibleSpares = record ? spareRows.filter((row) => String(row.dealId) === String(record.id)) : spareRows;

  return (
    <EditPage
      user={user}
      active="deal"
      entity="deal"
      isNew={!record}
      action={saveEntity}
      after={<DealSpares rows={visibleSpares} />}
    >
      <HiddenFields entity="deal" id={record?.id} redirectTo="/deal" />
      <DateTimeField entity="deal" field="dealDate" label="Deal date" value={value} />
      <SelectField
        entity="deal"
        field="dealType"
        label="DealType"
        value={record?.typeId}
        emptyOption
        options={types.map((type) => ({ value: String(type.id), label: type.name }))}
      />
      <SelectField
        entity="deal"
        field="customer"
        label="Provider"
        value={record?.customerId}
        emptyOption
        options={providerOptions}
      />
      <SelectField
        entity="deal"
        field="provider"
        label="Customer"
        value={record?.providerId}
        emptyOption
        options={providerOptions}
      />
    </EditPage>
  );
}
