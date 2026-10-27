import { Page } from "@/components/Page";
import { requireUser } from "@/lib/require-user";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <Page user={user} active="dashboard" title="Главная" subtitle=" " crumbs={[{ label: "Главная" }]}>
      <div className="row">
        <div className="col-md-12">
          <div className="box">
            <div className="box-header with-border">
              <h3 className="box-title">Добро пожаловать в систему учета запчастей!</h3>
            </div>
            <div className="box-body">
              <div className="box-body" style={{ display: "block" }}>
                <p>
                  Для того, чтобы внести данные о поставщиках, покупателях, сотрудниках, автоматах и справочных данных,
                  перейдите в раздел «Справочники».<br />
                  Если вы хотите внести данные об установке новых запчастей, перейдите в раздел «Установка»<br />
                  Если необходимо заполнить данные об обсулживании торгового автомата, перейдите в разждел «Обсулуживание»<br />
                  Для внесения данных о приобретении, продаже или возврате запчастей перейдите в раздел «Сделки»<br />
                  Отчеты о данных по обслуживанию, хранению запчастей вы можете в разделе построить «Отчеты»
                </p>
              </div>
            </div>
            <div className="box-footer" />
          </div>
        </div>
      </div>
    </Page>
  );
}
