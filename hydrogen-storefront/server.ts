import {createStorefrontClient, storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler, getBuyerIp, type AppLoadContext} from '@shopify/remix-oxygen';
import {createHydrogenContext, type HydrogenSession} from '@shopify/hydrogen';

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
        // Check for redirects
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
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
