import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler, type AppLoadContext} from '@shopify/remix-oxygen';
import {createHydrogenContext} from '@shopify/hydrogen';

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const {storefront, cart, session, customerAccount} = createHydrogenContext({
        env,
        request,
        executionContext,
        waitUntil: executionContext.waitUntil.bind(executionContext),
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
}
