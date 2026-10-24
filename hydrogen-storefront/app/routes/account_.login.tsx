// GET /account/login[?email=]: sends the visitor to Shopify's sign-in page (email code or Google).
// The email typed on the site, when given, is passed along so that page opens pre-filled.
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request, context}: LoaderFunctionArgs) {
  const res: Response = await (context as any).customerAccount.login();
  const email = new URL(request.url).searchParams.get('email');
  const to = res.headers.get('Location');
  if (!email || !to) return res;
  const u = new URL(to); u.searchParams.set('login_hint', email);
  const headers = new Headers(res.headers); headers.set('Location', u.toString());
  return new Response(null, {status: res.status, headers});
}
