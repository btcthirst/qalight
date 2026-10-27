import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { HeadAssets } from "@/components/Assets";

export const metadata: Metadata = {
  title: "Account of spare:Авторизация",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const ICHECK_INIT = `$(function () {
                $('input').iCheck({
                    checkboxClass: 'icheckbox_square-blue',
                    radioClass: 'iradio_square-blue',
                    increaseArea: '20%' // optional
                });
            });`;

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadAssets />
      </head>
      <body className="login-page">
        {children}
        {/* jQuery 2.1.3 */}
        <script src="/bundles/ap/adminlte/plugins/jQuery/jQuery-2.1.3.min.js" />
        {/* Bootstrap 3.3.2 JS */}
        <script src="/bundles/ap/adminlte/bootstrap/js/bootstrap.min.js" />
        {/* iCheck */}
        <script src="/bundles/ap/adminlte/plugins/iCheck/icheck.min.js" />
        <script dangerouslySetInnerHTML={{ __html: ICHECK_INIT }} />
      </body>
    </html>
  );
}
