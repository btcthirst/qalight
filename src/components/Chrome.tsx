import type { SessionUser } from "@/lib/types";

export type MenuKey =
  | "dashboard"
  | "dictionary"
  | "apparat"
  | "workers"
  | "spareType"
  | "spares"
  | "prov_cus"
  | "deal_type"
  | "service"
  | "installation"
  | "deal"
  | "spare_operation"
  | "users";

const DICTIONARY_ITEMS = [
  { key: "apparat", href: "/dictionary/apparat", label: "Аппарат" },
  { key: "workers", href: "/dictionary/workers", label: "Сотрудники" },
  { key: "spareType", href: "/dictionary/spare_type", label: "Типы запчастей" },
  { key: "spares", href: "/dictionary/spares", label: "Запчасти" },
  { key: "prov_cus", href: "/dictionary/providers", label: "Стороны сделок" },
  { key: "deal_type", href: "/dictionary/deal_type", label: "Типы сделок" },
] as const;

function isDictionaryActive(active: MenuKey): boolean {
  return DICTIONARY_ITEMS.some((item) => item.key === active);
}

export function Header({ user }: { user: SessionUser }) {
  return (
    <header className="main-header">
      <a href="#" className="logo">
        Учет запчастей
      </a>
      <nav className="navbar navbar-static-top" role="navigation">
        <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src="/bundles/ap/adminlte/dist/img/avatar.png" className="user-image" alt={user.name} />
                <span className="hidden-xs">{user.name}</span>
              </a>
              <ul className="dropdown-menu">
                <li className="user-header">
                  <img src="/bundles/ap/adminlte/dist/img/avatar.png" className="img-circle" alt={user.name} />
                  <p>
                    {user.name} -{" "}
                    <small>Зарегистрирован {registeredAt(user.registeredAt)}</small>
                  </p>
                </li>
                <li className="user-footer">
                  <div className="pull-left">
                    <a href={`/users/profile/${user.id}`} className="btn btn-default btn-flat">
                      Профиль
                    </a>
                  </div>
                  <div className="pull-right">
                    <a href="/logout" className="btn btn-default btn-flat">
                      Выход
                    </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

function registeredAt(value: string): string {
  const match = /^(\d{4})-(\d{2})/.exec(value);
  if (!match) return value;
  return `${match[2]}.${match[1]}`;
}

export function Sidebar({ user, active }: { user: SessionUser; active: MenuKey }) {
  const dictionaryActive = isDictionaryActive(active);

  return (
    <aside className="main-sidebar sidebar-offcanvas">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img src="/bundles/ap/adminlte/dist/img/avatar.png" className="img-circle" alt={user.username} />
          </div>
          <div className="pull-left info">
            <p>{user.name}</p>
            <a href="#">
              <i className="fa fa-circle text-alert" /> Offline
            </a>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li id="dashboard" className={active === "dashboard" ? " active " : "  "}>
            <a href="/dashboard">
              <i className="fa fa-dashboard" /> <span>Главная</span>
            </a>
          </li>

          <li id="dictionary" className={dictionaryActive ? " active treeview" : "  treeview"}>
            <a href="#">
              <i className="fa fa-book" /> <span>Словари</span>
              <i className="fa fa-angle-left pull-right" />
            </a>
            <ul className="treeview-menu">
              {DICTIONARY_ITEMS.map((item) => (
                <li key={item.key} className={active === item.key ? "active" : ""} id={item.key}>
                  <a href={item.href}>
                    <i className="fa fa-circle-o" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li id="service_apparat" className={active === "service" ? " active " : "  "}>
            <a href="/dictionary/service">
              <i className="fa fa-wrench" /> <span>Обслуживание</span>
            </a>
          </li>

          <li id="installation" className={active === "installation" ? " active " : "  "}>
            <a href="/dictionary/installation">
              <i className="fa fa-cogs" /> <span>Установка</span>
            </a>
          </li>

          <li id="deal" className={active === "deal" ? " active " : "  "}>
            <a href="/deal">
              <i className="fa fa-money" /> <span>Сделки</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>
  );
}
