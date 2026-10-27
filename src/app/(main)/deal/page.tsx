import { ListPage } from "@/components/ListPage";
import { dealRepo, dealTypeRepo, providersRepo } from "@/lib/db";
import { dealTypeName, formatDealDate, providerName } from "@/lib/format";
import { requireUser } from "@/lib/require-user";

export default async function DealListPage() {
  const user = await requireUser();
  const [rows, types, providers] = await Promise.all([
    dealRepo.list(),
    dealTypeRepo.list(),
    providersRepo.list(),
  ]);

  return (
    <ListPage
      user={user}
      active="deal"
      title="Сделки"
      crumbs={[{ label: "Сделки" }]}
      boxTitle="Список сделок"
      addHref="/deal/edit"
      rows={rows}
      rowHref={(row) => `/deal/edit/${row.id}`}
      columns={[
        { header: "Дата", render: (row) => formatDealDate(row) },
        { header: "Тип", render: (row) => dealTypeName(types, row.typeId) },
        { header: "Покупатель", render: (row) => providerName(providers, row.customerId) },
        { header: "Поставщик", render: (row) => providerName(providers, row.providerId) },
      ]}
    />
  );
}
