import type { ReactNode } from "react";

import { ClickableRow } from "./ClickableRow";
import { Page, type Crumb } from "./Page";
import type { SessionUser } from "@/lib/types";
import type { MenuKey } from "./Chrome";

export interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
}

interface ListPageProps<T extends { id: number }> {
  user: SessionUser;
  active: MenuKey;
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  boxTitle: string;
  addHref: string;
  columns: Column<T>[];
  rows: T[];
  rowHref: (row: T) => string;
  tableId?: string | null;
  headerInBody?: boolean;
}

export function ListPage<T extends { id: number }>({
  user,
  active,
  title,
  subtitle = " Список",
  crumbs,
  boxTitle,
  addHref,
  columns,
  rows,
  rowHref,
  tableId = "device_list",
  headerInBody = false,
}: ListPageProps<T>) {
  const headerCells = columns.map((column) => <th key={column.header}>{column.header}</th>);

  return (
    <Page user={user} active={active} title={title} subtitle={subtitle} crumbs={crumbs}>
      <div className="row">
        <div className="col-md-12">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">{boxTitle}</h3>
              <div className="box-tools">
                <a
                  className="btn btn-info btn-sm"
                  data-toggle="tooltip"
                  title=""
                  data-original-title="Add"
                  href={addHref}
                >
                  <i className="fa fa-plus" />
                </a>
              </div>
            </div>
            <div className="box-body table-responsive no-padding">
              <table className="table table-hover" id={tableId ?? undefined}>
                {!headerInBody && (
                  <thead>
                    <tr>{headerCells}</tr>
                  </thead>
                )}
                <tbody>
                  {headerInBody && <tr>{headerCells}</tr>}
                  {rows.map((row) => (
                    <ClickableRow key={row.id} href={rowHref(row)}>
                      {columns.map((column) => (
                        <td key={column.header}>{column.render(row)}</td>
                      ))}
                    </ClickableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
