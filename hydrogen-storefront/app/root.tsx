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
import {AnimatePresence, motion} from 'framer-motion';
import {Header} from '~/components/layout/Header';
import {Footer} from '~/components/layout/Footer';
import {PageTransition} from '~/components/animations/PageTransition';
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

  // Get shop info
  const {shop} = await storefront.query(SHOP_QUERY);

  // Get header menu
  const {menu} = await storefront.query(MENU_QUERY, {
    variables: {handle: 'main-menu'},
  });

  return {
    shop,
    cart: await cartPromise,
    menu: menu?.items || [],
  };
}

export default function App() {
  const {shop, cart, menu} = useLoaderData<typeof loader>();
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
        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{scaleX: 0}}
              animate={{scaleX: 1}}
              exit={{scaleX: 0, opacity: 0}}
              className="fixed top-0 left-0 right-0 h-0.5 bg-primary-500 z-[100] origin-left"
              transition={{duration: 0.5}}
            />
          )}
        </AnimatePresence>

        <Header shop={shop} cart={cart} menu={menu} />

        <main className="flex-1">
          <PageTransition>
            <Outlet />
          </PageTransition>
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
        <div className="container-premium text-center">
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
