import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { SiteHeader, type NavItem } from "~/components/loom/SiteHeader";
import { SiteFooter } from "~/components/loom/SiteFooter";
import { BagDrawer, BagProvider, type BagCart } from "~/components/loom/Bag";
import { FabricScrollbar } from "~/components/loom/FabricScrollbar";
import { PageCurtain } from "~/components/loom/PageCurtain";
import { useReveal } from "~/components/loom/useReveal";
import { collectionPath, toSitePath } from "~/lib/loom";
import appStyles from "~/styles/app.css?url";
import loomStyles from "~/styles/loom.css?url";

export function links() {
  return [
    { rel: "stylesheet", href: appStyles },
    { rel: "stylesheet", href: loomStyles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&display=swap",
    },
    { rel: "preconnect", href: "https://cdn.shopify.com" },
    { rel: "icon", type: "image/png", href: "/images/v3/logo-mark-192.png" },
  ];
}

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront, cart } = context;

  const [cartData, { shop }, { menu }, { collections }] = await Promise.all([
    cart.get(),
    storefront.query(SHOP_QUERY),
    storefront.query(MENU_QUERY, { variables: { handle: "main-menu" } }),
    storefront.query(COLLECTIONS_NAV_QUERY),
  ]);

  const shopCollections: NavItem[] = (collections?.nodes || [])
    .filter((c: { products: { nodes: unknown[] } }) => c.products.nodes.length > 0)
    .map((c: { handle: string; title: string }) => ({
      title: c.title,
      href: collectionPath(c.handle),
      external: false,
    }));

  const menuItems: NavItem[] = (menu?.items || []).map((item: { title: string; url: string }) => ({
    title: item.title,
    ...toSitePath(item.url),
  }));

  const policies: NavItem[] = [shop?.shippingPolicy, shop?.refundPolicy, shop?.privacyPolicy, shop?.termsOfService]
    .filter(Boolean)
    .map((p: { title: string; url: string }) => ({ title: p.title, href: p.url, external: true }));

  const helpPages = menuItems.filter((m) => m.href.startsWith("/pages/"));

  return {
    shop,
    cart: cartData as BagCart | null,
    nav: menuItems.length > 0 ? menuItems : shopCollections,
    footerShop: shopCollections,
    footerHelp: [...helpPages, ...policies],
    brandAssets: {
      video: shop?.metafield_video?.reference?.sources?.[0] || null,
      videoPreviewImage: shop?.metafield_video?.reference?.previewImage || null,
    },
  };
}

export default function App() {
  const { cart, nav, footerShop, footerHelp, brandAssets } = useLoaderData<typeof loader>();
  const location = useLocation();
  useReveal(location.pathname);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#F4EFE6" />
        <Meta />
        <Links />
      </head>
      <body className="lm">
        <BagProvider>
          <SiteHeader nav={nav} bagCount={cart?.totalQuantity || 0} />
          <Outlet context={{ brandAssets }} />
          <SiteFooter shop={footerShop} help={footerHelp} />
          <BagDrawer cart={cart} />
        </BagProvider>
        <FabricScrollbar />
        <PageCurtain />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="lm">
        <main
          className="lm-pad"
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, textAlign: "center" }}
        >
          <img src="/images/v3/logo-mark-128.webp" alt="" width={60} height={64} />
          <h1 className="lm-h-md">Something went wrong.</h1>
          <p className="lm-lede">We could not load this page. Please try again in a moment.</p>
          <a href="/" className="lm-btn lm-btn--dark">
            Return home
          </a>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

const SHOP_QUERY = `#graphql
  query Shop {
    shop {
      name
      description
      shippingPolicy { title url }
      refundPolicy { title url }
      privacyPolicy { title url }
      termsOfService { title url }
      metafield_video: metafield(namespace: "custom", key: "landing_page_video") {
        reference {
          ... on Video {
            sources { url mimeType width height }
            previewImage { url altText width height }
          }
        }
      }
    }
  }
`;

const MENU_QUERY = `#graphql
  query Menu($handle: String!) {
    menu(handle: $handle) {
      items { id title url }
    }
  }
`;

const COLLECTIONS_NAV_QUERY = `#graphql
  query CollectionsNav {
    collections(first: 20) {
      nodes {
        handle
        title
        products(first: 1) { nodes { id } }
      }
    }
  }
`;
