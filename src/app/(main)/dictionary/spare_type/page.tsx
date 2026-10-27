import { ListPage } from "@/components/ListPage";
import { spareTypeRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function SpareTypeListPage() {
  const user = await requireUser();
  const rows = await spareTypeRepo.list();

  return (
    <ListPage
      user={user}
      active="spareType"
      title="Типы запчастей"
      crumbs={[{ label: "Словари", href: "/dictionary" }, { label: "Типы запчастей" }]}
      boxTitle="Список типов запчастей"
      addHref="/dictionary/spare_type/edit"
      rows={rows}
      rowHref={(row) => `/dictionary/spare_type/edit/${row.id}`}
      columns={[{ header: "Наименование", render: (row) => row.name }]}
    />
  );
}
