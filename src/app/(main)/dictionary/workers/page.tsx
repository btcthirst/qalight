import { ListPage } from "@/components/ListPage";
import { workersRepo } from "@/lib/db";
import { workerFullName } from "@/lib/format";
import { requireUser } from "@/lib/require-user";

export default async function WorkersListPage() {
  const user = await requireUser();
  const rows = await workersRepo.list();

  return (
    <ListPage
      user={user}
      active="workers"
      title="Сотрудники"
      crumbs={[{ label: "Словари", href: "/dictionary" }, { label: "Сотрудники" }]}
      boxTitle="Список сотрудников"
      addHref="/dictionary/workers/edit"
      rows={rows}
      rowHref={(row) => `/dictionary/workers/edit/${row.id}`}
      columns={[
        { header: "Сотрудник", render: (row) => workerFullName(row) },
        { header: "Телефон", render: (row) => row.phone },
      ]}
    />
  );
}
