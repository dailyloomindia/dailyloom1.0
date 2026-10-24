// GET /account/logout: ends the Shopify customer session and returns to the home page.
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  return (context as any).customerAccount.logout({postLogoutRedirectUri: '/'});
}
