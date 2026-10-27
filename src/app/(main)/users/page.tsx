import { ListPage } from "@/components/ListPage";
import { usersRepo } from "@/lib/db";
import { requireUser } from "@/lib/require-user";

export default async function UsersListPage() {
  const user = await requireUser();
  const rows = await usersRepo.list();

  return (
    <ListPage
      user={user}
      active="users"
      title="Пользователи"
      crumbs={[{ label: "Пользователи" }]}
      boxTitle="Список пользователей"
      addHref="/users/profilenew"
      rows={rows}
      rowHref={(row) => `/users/profile/${row.id}`}
      tableId={null}
      headerInBody
      columns={[
        { header: "№", render: (row) => row.id },
        { header: "Пользователь", render: (row) => row.name },
        { header: "Дата", render: (row) => row.createdAt },
        {
          header: "Статус",
          render: (row) => <span className="label label-success">{row.status}</span>,
        },
        { header: "Комментарий", render: (row) => row.comment },
      ]}
    />
  );
}
