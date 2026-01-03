import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Header} from '~/components/layout/Header';
import {Footer} from '~/components/layout/Footer';
import appStyles from '~/styles/app.css?url';

export function links() {
  return [
    {rel: 'stylesheet', href: appStyles},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
    {rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png',
    },
  ];
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, cart} = context;

  // Get cart data
  const cartPromise = cart.get();

  // Get shop info with metafields for logo and video
  const {shop} = await storefront.query(SHOP_QUERY);

  // Get header menu
  const {menu} = await storefront.query(MENU_QUERY, {
    variables: {handle: 'main-menu'},
  });

  // Extract metafields
  const logoMetafield = shop?.metafield_logo;
  const videoMetafield = shop?.metafield_video;

  return {
    shop,
    cart: await cartPromise,
    menu: menu?.items || [],
    brandAssets: {
      logo: logoMetafield?.reference?.image || null,
      video: videoMetafield?.reference?.sources?.[0] || null,
      videoPreviewImage: videoMetafield?.reference?.previewImage || null,
    },
  };
}

export default function App() {
  const {shop, cart, menu, brandAssets} = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#faf5ec" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Simple loading indicator - CSS only */}
        {isLoading && (
          <div className="loading-bar" />
        )}

        <Header shop={shop} cart={cart} menu={menu} logo={brandAssets.logo} />

        <main className="flex-1">
          <Outlet context={{brandAssets}} />
        </main>

        <Footer shop={shop} />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Error boundary
export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col items-center justify-center bg-cream-50">
        <div className="container-luxury text-center">
          <h1 className="text-display-lg mb-4">Something went wrong</h1>
          <p className="text-charcoal-600 mb-8">
            We apologize for the inconvenience. Please try again later.
          </p>
          <a href="/" className="btn-primary">
            Return Home
          </a>
        </div>
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
      brand {
        logo {
          image {
            url
            altText
          }
        }
        slogan
      }
      metafield_logo: metafield(namespace: "custom", key: "daily_loom_logo") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
      metafield_video: metafield(namespace: "custom", key: "landing_page_video") {
        reference {
          ... on Video {
            sources {
              url
              mimeType
              width
              height
            }
            previewImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

const MENU_QUERY = `#graphql
  query Menu($handle: String!) {
    menu(handle: $handle) {
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;
