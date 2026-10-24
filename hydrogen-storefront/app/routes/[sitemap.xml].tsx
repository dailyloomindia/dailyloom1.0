// /sitemap.xml: every page of the site, for Google Search Console and other search engines.
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {CATS} from '~/dl/data/catalog';
import {HANDLE, urlFor} from '~/dl/routing';

const POLICIES = `#graphql
  query DlPolicies { shop { privacyPolicy { handle } termsOfService { handle } refundPolicy { handle } shippingPolicy { handle } } }`;

export async function loader({request, context}: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin;
  const {shop} = await (context as any).storefront.query(POLICIES, {cache: (context as any).storefront.CacheLong()}).catch(() => ({shop: {}}));
  const pids = [...new Set(CATS.flatMap((c: any) => c.items.filter((x: any) => !x.soon).map((x: any) => x.pid)))] as string[];
  const paths = [
    '/', ...Object.values(HANDLE).map(h => `/collections/${h}`), ...pids.map(pid => urlFor('product', undefined, pid)), '/help',
    ...Object.values(shop || {}).filter(Boolean).map((p: any) => `/policies/${p.handle}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map(p => `  <url><loc>${origin}${p.replace(/&/g, '&amp;')}</loc></url>`).join('\n') + '\n</urlset>\n';
  return new Response(xml, {headers: {'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600'}});
}
