// Addresses of the store's earlier Shopify theme (still in Google's index, old links and Shopify's
// Google & YouTube product feed), and the page of this site each one now lives at.
import {P} from '../data/catalog';
import {SHOPIFY} from '../shop/map';
import {combos} from '../shop/live';
import {urlFor} from '../routing';

/** Shopify product handle → the buy page that sells it. */
export function productPath(handle: string): string | null {
  for (const pid of Object.keys(SHOPIFY)) {
    const vals = (s: any) => Object.fromEntries(P[pid].opts.filter((o: any) => o.n !== 'Monogram').map((o: any) => [o.n, o.vals[s[o.n] ?? 0].v]));
    if (combos(pid).some(s => (SHOPIFY[pid](vals(s)) || {handle: ''}).handle === handle)) return urlFor('product', undefined, pid);
  }
  return null;
}

/** /pages/<handle> → this site's page. */
export const PAGES: Record<string, string> = {contact: '/help', bedsheets: '/collections/bed-sheet-set'};
