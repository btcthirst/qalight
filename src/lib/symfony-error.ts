/** Symfony default production error page, byte-for-byte the same as the original site. */
export const INTERNAL_ERROR_HTML = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>An Error Occurred: Internal Server Error</title>
    </head>
    <body>
        <h1>Oops! An Error Occurred</h1>
        <h2>The server returned a "500 Internal Server Error".</h2>

        <div>
            Something is broken. Please let us know what you were doing when this error occurred.
            We will fix it as soon as possible. Sorry for any inconvenience caused.
        </div>
    </body>
</html>
`;

export function internalErrorResponse(): Response {
  return new Response(INTERNAL_ERROR_HTML, {
    status: 500,
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
