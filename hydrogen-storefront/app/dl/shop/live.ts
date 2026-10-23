// The site's products priced, stocked and photographed from Shopify. A selection is the
// design's option indices ({Size: 1, Colour: 0, Monogram: 1}); see ./map for how each maps
// onto a Shopify variant.
import {CATS, P} from '../data/catalog';
import {MONOGRAM_HANDLE, MONOGRAM_PIECES, SHOPIFY} from './map';

export type LiveVariant = {id: string; ok: boolean; price: number; cmp: number; values: string[]; image: string};
export type Live = {products: Record<string, {images: {url: string; alt: string}[]; variants: LiveVariant[]}>};

const optsOf = (pid: string) => P[pid].opts.filter((o: any) => o.n !== 'Monogram');
const valsOf = (pid: string, sel: any) => Object.fromEntries(optsOf(pid).map((o: any) => [o.n, o.vals[sel[o.n] ?? 0].v]));

/** The Shopify variant a selection is, or null when the store has none. */
export function variantOf(live: Live | null, pid: string, sel: any): LiveVariant | null {
  const pick = SHOPIFY[pid] && SHOPIFY[pid](valsOf(pid, sel));
  const prod = pick && live && live.products[pick.handle];
  if (!pick || !prod || pick.values.some(x => !x)) return null;
  return prod.variants.find(v => pick.values.every(x => v.values.includes(x))) || null;
}

/** The monogram add-on for a product: the Shopify variant charged per piece, and how many pieces. */
export function monogramOf(live: Live | null, pid: string): {id: string; each: number; pieces: number} | null {
  const pieces = MONOGRAM_PIECES[pid], mono = P[pid].opts.find((o: any) => o.n === 'Monogram');
  const prod = live && live.products[MONOGRAM_HANDLE];
  if (!pieces || !mono || !prod) return null;
  const each = (mono.vals[1].p || 0) / pieces, ok = prod.variants.filter(v => v.ok);
  const v = ok.find(x => x.price === each) || ok[0];
  return v ? {id: v.id, each: v.price, pieces} : null;
}

const monoPrice = (live: Live | null, pid: string, sel: any) => {
  const mono = P[pid].opts.find((o: any) => o.n === 'Monogram');
  if (!mono || sel.Monogram !== 1) return 0;
  const m = monogramOf(live, pid);
  return m ? m.each * m.pieces : (mono.vals[1].p || 0);
};

/** Price of one, monogram included. Products the store does not have keep the design's price. */
export function priceOf(live: Live | null, pid: string, sel: any): number {
  const v = variantOf(live, pid, sel), p = P[pid];
  if (!v) return p.base + p.opts.reduce((a: number, o: any) => a + (o.vals[sel[o.n] ?? 0].p || 0), 0);
  return v.price + monoPrice(live, pid, sel);
}

/** The earlier price, when Shopify has a compare-at price above the selling price; otherwise 0. */
export function compareOf(live: Live | null, pid: string, sel: any): number {
  const v = variantOf(live, pid, sel);
  return v && v.cmp > v.price ? v.cmp + monoPrice(live, pid, sel) : 0;
}

/** Whether a selection can be bought. */
export const availableOf = (live: Live | null, pid: string, sel: any) => !!(variantOf(live, pid, sel) || {ok: false}).ok;

/** Every selection of a product's options (monogram aside), as index maps. */
export function combos(pid: string): any[] {
  return optsOf(pid).reduce((acc: any[], o: any) => acc.flatMap(s => o.vals.map((_: any, i: number) => ({...s, [o.n]: i}))), [{}]);
}

/** The lowest price a product sells at, counting only what is in stock while anything is. */
export function fromPrice(live: Live | null, pid: string): number {
  const all = combos(pid), ok = all.filter(s => availableOf(live, pid, s));
  return Math.min(...(ok.length ? ok : all).map(s => priceOf(live, pid, s)));
}

/** The lowest price in a collection. */
export const catFrom = (live: Live | null, k: string) =>
  Math.min(...CATS.find((c: any) => c.k === k).items.filter((x: any) => !x.soon).map((x: any) => fromPrice(live, x.pid)));

/**
 * The product's photos from Shopify, as [url, tags]: a photo set as a variant's image (or whose
 * alt text names an option value) shows only for that value; the rest show for every selection.
 * Null when Shopify has none, so the design's photos stay.
 */
export function mediaOf(live: Live | null, pid: string): [string, string][] | null {
  if (!live || !SHOPIFY[pid]) return null;
  const all = combos(pid), tagOpts = optsOf(pid).filter((o: any) => o.vals.length > 1);
  const handleOf = (s: any) => (SHOPIFY[pid](valsOf(pid, s)) || {handle: ''}).handle;
  const handles = [...new Set(all.map(handleOf))];
  const out: [string, string][] = [];
  for (const h of handles) {
    const prod = live.products[h]; if (!prod) continue;
    // A Shopify product that is one value of a site option (each towel type) has its photos tagged with that value.
    const mine = all.filter(s => handleOf(s) === h);
    const whole = handles.length > 1 ? tagOpts.find((o: any) => new Set(mine.map(s => s[o.n])).size === 1) : null;
    for (const im of prod.images) {
      const tags: string[] = whole ? [whole.vals[mine[0][whole.n]].v] : [];
      for (const o of tagOpts) {
        if (o === whole) continue;
        o.vals.forEach((val: any, i: number) => {
          const v = variantOf(live, pid, {...mine[0], [o.n]: i});
          if ((v && prod.variants.length > 1 && v.image === im.url) || im.alt.split('|').map(x => x.trim()).includes(val.v)) tags.push(val.v);
        });
      }
      out.push([im.url, [...new Set(tags)].join('|')]);
    }
  }
  return out.length ? out : null;
}
