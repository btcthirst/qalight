import { ListPage } from "@/components/ListPage";
import { serviceRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function ServiceListPage() {
  const user = await requireUser();
  const rows = await serviceRepo.list();

  return (
    <ListPage
      user={user}
      active="service"
      title="Обслуживание"
      crumbs={[{ label: "Обслуживание" }]}
      boxTitle="Список работ"
      addHref="/dictionary/service/edit"
      rows={rows}
      rowHref={(row) => `/dictionary/service/edit/${row.id}`}
      columns={[
        { header: "Номер аппарата", render: (row) => row.apparatNumber },
        { header: "Проведенные изменения", render: (row) => row.changes },
        { header: "Проведенные операции", render: (row) => row.operations },
        { header: "Сотрудник", render: (row) => row.worker },
        { header: "Дата", render: (row) => row.date },
      ]}
    />
  );
}
