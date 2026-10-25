import {cartSetIdDefault, storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler, type AppLoadContext} from '@shopify/remix-oxygen';
import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session.server';
import {CART_QUERY_FRAGMENT} from '~/dl/shop/cart.server';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      if (!env.SESSION_SECRET) console.warn('SESSION_SECRET is not set; sessions will not persist between requests.');
      const session = await AppSession.init(request, [env.SESSION_SECRET || crypto.randomUUID()]);
      const {storefront, cart, customerAccount} = createHydrogenContext({
        env,
        request,
        session,
        waitUntil: executionContext.waitUntil.bind(executionContext),
        // The cart cookie: never sent by other websites' requests, never readable by page scripts.
        cart: {queryFragment: CART_QUERY_FRAGMENT, setId: cartSetIdDefault({path: '/', samesite: 'Lax', secure: true, httponly: true})},
      });

      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: (): AppLoadContext => ({
          session,
          storefront,
          cart,
          customerAccount,
          env,
          waitUntil: executionContext.waitUntil.bind(executionContext),
        }),
      });

      const response = await handleRequest(request);

      if (session.isPending) {
        response.headers.append('Set-Cookie', await session.commit());
      }

      if (response.status === 404) {
        // Skip redirect check for known browser requests
        const url = new URL(request.url);
        if (url.pathname.includes('.well-known') ||
            url.pathname.includes('favicon') ||
            url.pathname.includes('.json')) {
          return response;
        }

        // Try to check for redirects, but don't fail if it errors
        try {
          return storefrontRedirect({request, response, storefront});
        } catch (redirectError) {
          console.warn('Redirect check failed:', redirectError);
          return response;
        }
      }

      return response;
    } catch (error) {
      console.error('Server error:', error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};

// @ts-expect-error - vite build
import * as remixBuild from 'virtual:remix/server-build';

interface Env {
  SESSION_SECRET: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PRIVATE_STOREFRONT_API_TOKEN: string;
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_ID: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
  SHOP_ID: string;
  PUBLIC_CHECKOUT_DOMAIN: string;
  PUBLIC_GA_MEASUREMENT_ID?: string;
  PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
}
