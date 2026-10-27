import { Page } from "@/components/Page";
import { requireUser } from "@/lib/require-user";

export default async function DictionaryPage() {
  const user = await requireUser();

  return (
    <Page user={user} active="dictionary" title="Словари" subtitle=" Список" crumbs={[{ label: "Словари" }]}>
      <div className="row">
        <div className="col-md-12">
          <div className="box">
            <div className="box-header">
              <h3 className="box-title">Dictionary List</h3>
            </div>
            <div className="box-body table-responsive no-padding">.........</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
