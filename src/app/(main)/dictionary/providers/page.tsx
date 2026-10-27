import { ListPage } from "@/components/ListPage";
import { providersRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function ProvidersListPage() {
  const user = await requireUser();
  const rows = await providersRepo.list();

  return (
    <ListPage
      user={user}
      active="prov_cus"
      title="Стороны сделок"
      crumbs={[{ label: "Словари", href: "/dictionary" }, { label: "Стороны сделок" }]}
      boxTitle="Список контрагентов"
      addHref="/dictionary/providers/edit"
      rows={rows}
      rowHref={(row) => `/dictionary/providers/edit/${row.id}`}
      columns={[
        { header: "Наименование", render: (row) => row.name },
        { header: "Адрес", render: (row) => row.address },
        { header: "Телефон", render: (row) => row.phone },
        {
          header: "Физ.лицо",
          render: (row) => <span className="label label-success">{row.isFl ? "1" : ""}</span>,
        },
      ]}
    />
  );
}
