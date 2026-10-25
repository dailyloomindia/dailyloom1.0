import {Links, Meta, Outlet, Scripts, isRouteErrorResponse, useRouteError, useRouteLoaderData, type ShouldRevalidateFunction} from '@remix-run/react';
import {Analytics, getShopAnalytics} from '@shopify/hydrogen';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useState, type ReactNode} from 'react';
import pseudoStyles from '~/dl/pseudo.css?url';
import {Shell} from '~/dl/Shell';
import {NotFoundView} from '~/dl/NotFoundView';
import {getLive} from '~/dl/shop/catalog.server';
import {getBag} from '~/dl/shop/cart.server';
import {GoogleAnalytics} from '~/dl/google';
import {HOME_HERO} from '~/dl/preload';
import {seo} from '~/dl/seo/meta';

export const meta = () => seo({image: HOME_HERO.desktop});

/** Google Analytics 4 property "dailyloom.in", web stream "Daily Loom website". */
const GA_MEASUREMENT_ID = 'G-4B13ET2DZS';

/** Every page gets the store's prices, stock and photos, and the visitor's bag. */
export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, cart, env, customerAccount} = context as any;
  const [live, bag, shop, signedIn] = await Promise.all([
    getLive(storefront).catch(() => null), getBag(cart),
    getShopAnalytics({storefront, publicStorefrontId: env.PUBLIC_STOREFRONT_ID}).catch(() => null),
    customerAccount.isLoggedIn().catch(() => false),
  ]);
  return {
    live, bag, signedIn: !!signedIn,
    // Shopify analytics (Analytics → Reports in Shopify admin). No consent banner: the store sells in India.
    shop, consent: {checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN || env.PUBLIC_STORE_DOMAIN, storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN, withPrivacyBanner: false, country: 'IN', language: 'EN'},
    // Google: the Analytics 4 measurement ID (an Oxygen environment variable overrides it) and Search Console verification.
    google: {ga: env.PUBLIC_GA_MEASUREMENT_ID || GA_MEASUREMENT_ID, verify: env.PUBLIC_GOOGLE_SITE_VERIFICATION || ''},
  };
}

// Loaded once per visit; the bag then updates from the cart actions themselves.
export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export function links() {
  return [
    {rel: 'icon', href: '/favicon.ico', sizes: '32x32'},
    {rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '32x32'},
    {rel: 'icon', type: 'image/png', href: '/icon-192.png', sizes: '192x192'},
    {rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180'},
    {rel: 'manifest', href: '/site.webmanifest'},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&display=swap'},
    {rel: 'stylesheet', href: pseudoStyles},
    // image-slot.js reads the photo framing from this file before it shows any photo.
    {rel: 'preload', as: 'fetch', href: '/.image-slots.state.json', crossOrigin: 'anonymous'},
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
  const data = useRouteLoaderData('root') as any;
  const verify = data && data.google && data.google.verify;
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {verify ? <meta name="google-site-verification" content={verify} /> : null}
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
  const data = useRouteLoaderData('root') as any;
  // The bag's latest Shopify cart: Shopify analytics compares each version with the last to count adds and removals.
  const [cart, setCart] = useState(data.bag ? data.bag.raw : null);
  return (
    <Document>
      <Analytics.Provider cart={cart} shop={data.shop} consent={data.consent}>
        <Shell onCart={setCart}>
          <Outlet />
        </Shell>
        <GoogleAnalytics id={data.google.ga} />
      </Analytics.Provider>
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
