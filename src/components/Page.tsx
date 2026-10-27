import type { ReactNode } from "react";

import type { SessionUser } from "@/lib/types";
import { Header, Sidebar, type MenuKey } from "./Chrome";

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageProps {
  user: SessionUser;
  active: MenuKey;
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  children: ReactNode;
}

function ContentHeader({ title, subtitle, crumbs }: Omit<PageProps, "user" | "active" | "children">) {
  return (
    <section className="content-header">
      <h1>
        {title}
        <small>{subtitle ?? ""}</small>
      </h1>
      <ol className="breadcrumb">
        <li>
          <a href="/">
            <i className="fa fa-dashboard" />
            Домой
          </a>
        </li>
        {crumbs.map((crumb, index) =>
          crumb.href ? (
            <li key={index}>
              <a href={crumb.href}>{crumb.label}</a>
            </li>
          ) : (
            <li key={index} className="active">
              {crumb.label}
            </li>
          ),
        )}
      </ol>
    </section>
  );
}

export function Page({ user, active, title, subtitle, crumbs, children }: PageProps) {
  return (
    <div className="wrapper">
      <Header user={user} />
      <Sidebar user={user} active={active} />
      <div className="content-wrapper">
        <ContentHeader title={title} subtitle={subtitle} crumbs={crumbs} />
        <section className="content">{children}</section>
      </div>
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b />
        </div>
        <strong>
          Copyright © 2016 <a href="http://itpmgroup.com">ITPM Group</a>
        </strong>
      </footer>
    </div>
  );
}
