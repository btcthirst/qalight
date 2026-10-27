import { ListPage } from "@/components/ListPage";
import { dealRepo, dealTypeRepo, spareOperationRepo, sparesRepo } from "@/lib/db";
import { dealTypeName, findById, formatDealDate, spareName } from "@/lib/format";
import { requireUser } from "@/lib/require-user";

export default async function SpareOperationListPage() {
  const user = await requireUser();
  const [rows, deals, types, spares] = await Promise.all([
    spareOperationRepo.list(),
    dealRepo.list(),
    dealTypeRepo.list(),
    sparesRepo.list(),
  ]);

  return (
    <ListPage
      user={user}
      active="spare_operation"
      title="Запчасти в сделке"
      crumbs={[{ label: "Запчасти в сделке" }]}
      boxTitle="Список запчастей"
      addHref="/spare_operation/edit"
      rows={rows}
      rowHref={(row) => `/spare_operation/edit/${row.id}`}
      columns={[
        {
          header: "Сделки",
          render: (row) => {
            const deal = findById(deals, row.dealId);
            if (!deal) return "";
            return `${dealTypeName(types, deal.typeId)} ${formatDealDate(deal)}`;
          },
        },
        { header: "Деталь", render: (row) => spareName(spares, row.spareId) },
        { header: "Количество", render: (row) => row.count },
      ]}
    />
  );
}
