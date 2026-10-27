import { ListPage } from "@/components/ListPage";
import { apparatRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function ApparatListPage() {
  const user = await requireUser();
  const rows = await apparatRepo.list();

  return (
    <ListPage
      user={user}
      active="apparat"
      title="Аппарат"
      crumbs={[{ label: "Словари", href: "/dictionary" }, { label: "Аппарат" }]}
      boxTitle="Список аппаратов"
      addHref="/dictionary/apparat/edit"
      rows={rows}
      rowHref={(row) => `/dictionary/apparat/edit/${row.id}`}
      columns={[
        { header: "Номер", render: (row) => row.number },
        { header: "Комментарий", render: (row) => row.comment },
      ]}
    />
  );
}
