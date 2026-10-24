// GET /account/authorize: Shopify returns here after sign-in; the session is stored and the visitor goes to /account.
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  return (context as any).customerAccount.authorize();
}
