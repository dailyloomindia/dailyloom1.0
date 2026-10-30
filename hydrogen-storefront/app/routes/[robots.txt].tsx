// /robots.txt: lets search engines crawl the shop, not the account and cart, and points them to the sitemap.
import {ORIGIN} from '~/dl/seo/meta';

export async function loader() {
  const body = ['User-agent: *', 'Disallow: /account', 'Disallow: /cart', 'Disallow: /notify', 'Disallow: /pincode', '', `Sitemap: ${ORIGIN}/sitemap.xml`, ''].join('\n');
  return new Response(body, {headers: {'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=86400'}});
}
