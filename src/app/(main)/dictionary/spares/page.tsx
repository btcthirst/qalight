import { ListPage } from "@/components/ListPage";
import { spareTypeRepo, sparesRepo } from "@/lib/db";
import { spareTypeName } from "@/lib/format";
import { requireUser } from "@/lib/require-user";

export default async function SparesListPage() {
  const user = await requireUser();
  const [rows, types] = await Promise.all([sparesRepo.list(), spareTypeRepo.list()]);

  return (
    <ListPage
      user={user}
      active="spares"
      title="Запчасти"
      crumbs={[{ label: "Словари", href: "/dictionary" }, { label: "Запчасти" }]}
      boxTitle="Список запчастей"
      addHref="/dictionary/spares/edit"
      rows={rows}
      rowHref={(row) => `/dictionary/spares/edit/${row.id}`}
      columns={[
        { header: "Наименование", render: (row) => row.name },
        { header: "Тип", render: (row) => spareTypeName(types, row.typeId) },
      ]}
    />
  );
}
