export function HeadAssets() {
  return (
    <>
      {/* Bootstrap 3.3.2 */}
      <link href="/bundles/ap/adminlte/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
      {/* Font Awesome Icons */}
      <link href="/bundles/ap/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
      {/* Ionicons */}
      <link href="/bundles/ap/css/ionicons.min.css" rel="stylesheet" type="text/css" />
      {/* Theme style */}
      <link href="/bundles/ap/adminlte/dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
      {/* AdminLTE Skins */}
      <link href="/bundles/ap/adminlte/dist/css/skins/_all-skins.min.css" rel="stylesheet" type="text/css" />
      <style
        dangerouslySetInnerHTML={{
          __html: ".table-hover tbody tr:hover > td {\n                cursor: pointer\n            }",
        }}
      />
    </>
  );
}

export function BodyScripts() {
  return (
    <>
      {/* jQuery 2.1.3 */}
      <script src="/bundles/ap/adminlte/plugins/jQuery/jQuery-2.1.3.min.js" />
      {/* Bootstrap 3.3.2 JS */}
      <script src="/bundles/ap/adminlte/bootstrap/js/bootstrap.min.js" />
      {/* SlimScroll */}
      <script src="/bundles/ap/adminlte/plugins/slimScroll/jquery.slimscroll.min.js" />
      {/* FastClick */}
      <script src="/bundles/ap/adminlte/plugins/fastclick/fastclick.min.js" />
      {/* AdminLTE App */}
      <script src="/bundles/ap/adminlte/dist/js/app.min.js" />
      <script src="/bundles/ap/adminlte/plugins/chartjs/Chart.js" />
    </>
  );
}
