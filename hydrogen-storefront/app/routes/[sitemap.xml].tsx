// /sitemap.xml: every page of the site, with its photos, for Google Search Console and other search engines.
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {CATS, SRC} from '~/dl/data/catalog';
import {HANDLE, urlFor} from '~/dl/routing';
import {photosOf} from '~/dl/Shell';
import {getLive} from '~/dl/shop/catalog.server';
import {inStore, updatedOf} from '~/dl/shop/live';
import {HOME_HERO, storyHero, storyHeroMobile} from '~/dl/preload';
import {ORIGIN} from '~/dl/seo/meta';

const POLICIES = `#graphql
  query DlPolicies { shop { privacyPolicy { handle } termsOfService { handle } refundPolicy { handle } shippingPolicy { handle } } }`;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export async function loader({context}: LoaderFunctionArgs) {
  const origin = ORIGIN, {storefront} = context as any;
  const [{shop}, live] = await Promise.all([
    storefront.query(POLICIES, {cache: storefront.CacheLong()}).catch(() => ({shop: {}})),
    getLive(storefront).catch(() => null),
  ]);
  const pids = [...new Set(CATS.flatMap((c: any) => c.items.filter((x: any) => !x.soon && inStore(live, x.pid)).map((x: any) => x.pid)))] as string[];
  // A collection page changes when one of its products does; the home page when any product does.
  const newest = (ids: string[]) => ids.map(pid => updatedOf(live, pid)).filter(Boolean).sort().pop();
  const catPids = (k: string) => ((CATS.find((c: any) => c.k === k) || {items: []}).items as any[]).filter(x => !x.soon && inStore(live, x.pid)).map(x => x.pid);
  const pages: [string, string[], string?][] = [
    ['/', [HOME_HERO.desktop, HOME_HERO.mobile], newest(pids)],
    // Each collection page: its story hero (desktop and mobile) and its product card photos.
    ...Object.entries(HANDLE).map(([k, h]) => [`/collections/${h}`, [...new Set([storyHero(k), storyHeroMobile(k), ...((CATS.find((c: any) => c.k === k) || {items: []}).items as any[]).map((x, i) => !x.soon && inStore(live, x.pid) ? SRC[`col-${k}-${i}`] : '')].filter(Boolean))], newest(catPids(k))] as [string, string[], string?]),
    ...pids.map(pid => [urlFor('product', undefined, pid), photosOf(live, pid).slice(0, 10), updatedOf(live, pid)] as [string, string[], string]),
    ['/help', []],
    ...Object.values(shop || {}).filter(Boolean).map((p: any) => [`/policies/${p.handle}`, []] as [string, string[]]),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    pages.map(([p, imgs, mod]) => `  <url><loc>${esc(origin + p)}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ''}${imgs.map(u => `<image:image><image:loc>${esc(u)}</image:loc></image:image>`).join('')}</url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(xml, {headers: {'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600'}});
}
