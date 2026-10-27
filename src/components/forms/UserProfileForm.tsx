import { saveEntity } from "@/app/actions";
import { Page } from "@/components/Page";
import { FORM_TOKEN } from "@/components/EditPage";
import type { SessionUser, User } from "@/lib/types";

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  value,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  value?: string;
}) {
  return (
    <div className="form-group">
      <label className={`col-sm-2 control-label${required ? " required" : ""}`} htmlFor={id}>
        {label}
      </label>
      <div className="col-sm-10">
        <input
          type={type}
          id={id}
          name={name}
          required={required || undefined}
          className="form-control"
          defaultValue={value ?? ""}
        />
      </div>
    </div>
  );
}

export function UserProfileForm({
  user,
  record,
  isNew = false,
}: {
  user: SessionUser;
  record?: User;
  isNew?: boolean;
}) {
  const boxTitle = record ? `Профиль пользователя ${record.name}` : "Профиль пользователя ";

  return (
    <Page user={user} active="users" title="Профиль" subtitle="" crumbs={[{ label: "Профиль" }]}>
      <div className="row">
        <div className="col-xs-12">
          <div className="box box-primary">
            <div className="box-header">
              <h3 className="box-title">{boxTitle}</h3>
            </div>
            <form name="userProfileEdit" method="post" action={saveEntity} role="form" className="form-horizontal">
              <div className="box-body">
                <div id="userProfileEdit_user">
                  <input type="hidden" name="_entity" value="userProfileEdit" />
                  <input type="hidden" name="_id" value={record?.id ?? ""} />
                  <input type="hidden" name="_redirect" value={isNew ? "/users" : `/users/profile/${record?.id ?? ""}`} />
                  <Field
                    id="userProfileEdit_user_email"
                    name="userProfileEdit[user][email]"
                    label="Адрес email"
                    type="email"
                    required
                    value={record?.email}
                  />
                  <Field
                    id="userProfileEdit_user_name"
                    name="userProfileEdit[user][name]"
                    label="Пользователь"
                    required
                    value={record?.name}
                  />
                  <Field
                    id="userProfileEdit_user_username"
                    name="userProfileEdit[user][username]"
                    label="Логин"
                    required
                    value={record?.username}
                  />
                  <Field
                    id="userProfileEdit_user_password_password"
                    name="userProfileEdit[user][password][password]"
                    label="Пароль"
                    type="password"
                  />
                  <Field
                    id="userProfileEdit_user_password_password_confirm"
                    name="userProfileEdit[user][password][password_confirm]"
                    label="Подтверждение пароля"
                    type="password"
                  />
                </div>
              </div>
              <div className="box-footer">
                <button type="submit" name="save" className="btn btn-info">
                  {isNew ? "Создать" : "Сохранить"}
                </button>
                {!isNew && (
                  <button type="submit" name="delete" className="btn btn-danger pull-right">
                    Удалить
                  </button>
                )}
              </div>
              <input
                type="hidden"
                id="userProfileEdit__token"
                name="userProfileEdit[_token]"
                className="form-control"
                value={FORM_TOKEN}
              />
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
}
