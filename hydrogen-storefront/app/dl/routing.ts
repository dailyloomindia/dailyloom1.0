// URL ↔ view mapping for the storefront.
//   /                                   home
//   /collections/<handle>               collection story page
//   /collections/<handle>/buynow        buy page (first product of the collection)
//   /collections/<handle>/buynow?product=<id>   buy page for another product in it
//   /help, /account
//   /policies/<handle>                  a store policy (privacy, terms, refund, shipping)
// Anything else, including /collections on its own, is a 404.
import {CATS, P} from './data/catalog';

/** Design category key → Shopify collection handle. */
export const HANDLE: Record<string, string> = {
  duvets: 'duvets',
  covers: 'duvet-covers',
  sheets: 'bed-sheet-set',
  pillows: 'pillows',
  towels: 'towels',
};
export const CAT_BY_HANDLE: Record<string, string> = Object.fromEntries(
  Object.entries(HANDLE).map(([k, h]) => [h, k]),
);

export type View = 'home' | 'story' | 'product' | 'help' | 'account' | 'policy' | 'notfound';
export type Route = {view: View; cat?: string; pid?: string};

export const defaultProduct = (k: string): string =>
  CATS.find((c: any) => c.k === k).items.find((x: any) => !x.soon).pid;

/** The product a buy page shows, or null when it does not belong to the collection. */
export function productFor(k: string, product: string | null): string | null {
  if (!product) return defaultProduct(k);
  return P[product] && P[product].cat === k ? product : null;
}

export function urlFor(view: View, cat?: string, pid?: string): string {
  switch (view) {
    case 'story':
      return `/collections/${HANDLE[cat!]}`;
    case 'product': {
      const k = P[pid!].cat;
      return `/collections/${HANDLE[k]}/buynow` + (pid === defaultProduct(k) ? '' : `?product=${pid}`);
    }
    case 'help':
      return '/help';
    case 'account':
      return '/account';
    default:
      return '/';
  }
}

export function parseRoute(pathname: string, search: string): Route {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/') return {view: 'home'};
  if (p === '/help') return {view: 'help'};
  if (p === '/account') return {view: 'account'};
  if (/^\/policies\/[^/]+$/.test(p)) return {view: 'policy'};
  const m = p.match(/^\/collections\/([^/]+)(\/buynow)?$/);
  const k = m && CAT_BY_HANDLE[m[1]];
  if (k) {
    if (!m[2]) return {view: 'story', cat: k};
    const pid = productFor(k, new URLSearchParams(search).get('product'));
    if (pid) return {view: 'product', cat: k, pid};
  }
  return {view: 'notfound'};
}
