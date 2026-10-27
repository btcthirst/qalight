import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="/">
          <b>Account of spare</b>
        </a>
      </div>
      <div className="login-box-body">
        <p className="login-box-msg">Авторизация</p>
        <form action="/login_check" method="post">
          <div className="form-group has-feedback">
            <input type="text" className="form-control" placeholder="Email" name="_username" defaultValue="" />
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input type="password" className="form-control" placeholder="Password" name="_password" id="password" />
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>
          <div className="row">
            <div className="col-xs-8" />
            <div className="col-xs-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">
                Вход
              </button>
            </div>
          </div>
        </form>
        <a href="#">Напомнить пароль</a>
        <br />
        <a href="register.html" className="text-center">
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
}
