// /sitemap.xml: every page of the site, with its photos, for Google Search Console and other search engines.
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {CATS} from '~/dl/data/catalog';
import {HANDLE, urlFor} from '~/dl/routing';
import {photosOf} from '~/dl/Shell';
import {getLive} from '~/dl/shop/catalog.server';
import {storyHero} from '~/dl/preload';

const POLICIES = `#graphql
  query DlPolicies { shop { privacyPolicy { handle } termsOfService { handle } refundPolicy { handle } shippingPolicy { handle } } }`;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export async function loader({request, context}: LoaderFunctionArgs) {
  const origin = new URL(request.url).origin, {storefront} = context as any;
  const [{shop}, live] = await Promise.all([
    storefront.query(POLICIES, {cache: storefront.CacheLong()}).catch(() => ({shop: {}})),
    getLive(storefront).catch(() => null),
  ]);
  const pids = [...new Set(CATS.flatMap((c: any) => c.items.filter((x: any) => !x.soon).map((x: any) => x.pid)))] as string[];
  const pages: [string, string[]][] = [
    ['/', []],
    ...Object.entries(HANDLE).map(([k, h]) => [`/collections/${h}`, [storyHero(k)].filter(Boolean)] as [string, string[]]),
    ...pids.map(pid => [urlFor('product', undefined, pid), photosOf(live, pid).slice(0, 10)] as [string, string[]]),
    ['/help', []],
    ...Object.values(shop || {}).filter(Boolean).map((p: any) => [`/policies/${p.handle}`, []] as [string, string[]]),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    pages.map(([p, imgs]) => `  <url><loc>${esc(origin + p)}</loc>${imgs.map(u => `<image:image><image:loc>${esc(u)}</image:loc></image:image>`).join('')}</url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(xml, {headers: {'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600'}});
}
