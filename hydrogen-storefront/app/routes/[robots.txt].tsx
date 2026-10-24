// /robots.txt: lets search engines crawl the shop, not the account and cart, and points them to the sitemap.
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request}: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin;
  const body = ['User-agent: *', 'Disallow: /account', 'Disallow: /cart', '', `Sitemap: ${origin}/sitemap.xml`, ''].join('\n');
  return new Response(body, {headers: {'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=86400'}});
}
