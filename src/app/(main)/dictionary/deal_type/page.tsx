import { ListPage } from "@/components/ListPage";
import { dealTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function DealTypeListPage() {
  const user = await requireUser();
  const rows = await dealTypeRepo.list();

  return (
    <ListPage
      user={user}
      active="deal_type"
      title="Типы сделок"
      crumbs={[{ label: "Словари", href: "/dictionary" }, { label: "Типы сделок" }]}
      boxTitle="Список типов"
      addHref="/dictionary/deal_type/edit"
      rows={rows}
      rowHref={(row) => `/dictionary/deal_type/edit/${row.id}`}
      columns={[{ header: "Наименование", render: (row) => row.name }]}
    />
  );
}
