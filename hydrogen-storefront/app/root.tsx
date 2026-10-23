import {Links, Meta, Outlet, Scripts, isRouteErrorResponse, useRouteError} from '@remix-run/react';
import type {ReactNode} from 'react';
import pseudoStyles from '~/dl/pseudo.css?url';
import {Shell} from '~/dl/Shell';
import {NotFoundView} from '~/dl/NotFoundView';

export const meta = () => [{title: 'Daily Loom'}];

export function links() {
  return [
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&display=swap'},
    {rel: 'stylesheet', href: pseudoStyles},
  ];
}

// The design file's <helmet> style, unchanged.
const DESIGN_CSS = `
html,body{margin:0;background:#F4EFE6;-webkit-font-smoothing:antialiased}
button,input{font:inherit;color:inherit}
::selection{background:#C8925E;color:#fff}
a{color:#7E5232;text-decoration:none}
a:hover{color:#221E18}
`;
// Page-level CSS the design tool's runtime adds around the design.
const RUNTIME_CSS = 'html,body{height:100%;margin:0}#dc-root,#dc-root>.sc-host{height:100%}';
// Until the app starts, the page waits behind the curtain (the root's last child),
// exactly as the design opens; Shell removes this and plays the curtain lift.
const BOOT_CSS = '#dc-root>.sc-host>div>div:last-child{transform:translateY(0)!important}';

function Document({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style dangerouslySetInnerHTML={{__html: DESIGN_CSS}} />
        <style dangerouslySetInnerHTML={{__html: RUNTIME_CSS}} />
        <style id="dl-boot" dangerouslySetInnerHTML={{__html: BOOT_CSS}} />
        <noscript>
          <style dangerouslySetInnerHTML={{__html: '#dc-root>.sc-host>div>div:last-child{display:none}'}} />
        </noscript>
        <script src="/image-slot.js" defer />
      </head>
      <body>
        <div id="dc-root">
          <div className="sc-host" data-sc-name="Root">
            {children}
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Shell>
        <Outlet />
      </Shell>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <Document>
      <Shell view="notfound">
        <NotFoundView notFound={notFound} />
      </Shell>
    </Document>
  );
}
