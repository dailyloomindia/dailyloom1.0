// Which Shopify product and variant each product and selection on the site is.
// The site's names and options stay as designed; this maps them onto the store
// (syhvib-tm.myshopify.com), following the owner's product mapping.
import {P} from '../data/catalog';

/** A Shopify variant, named by its product handle and option values (in any order, names ignored). */
export type ShopPick = {handle: string; values: string[]};

const COVER_COLOUR: Record<string, string> = {'Dark taupe': 'Dark Taupe', 'Charcoal grey': 'Charcoal Gray'};
const SHEET_COLOUR: Record<string, string> = {'Dark taupe': 'Dark Brown', 'Charcoal grey': 'Dark Gray'};
const TOWEL_TYPE: Record<string, string> = {Face: 'cotton-face-towe-set', Hand: 'cotton-hand-towel', Bath: 'cotton-bath-towel'};

/** Site product → the Shopify variant for a selection (option name → chosen value name). */
export const SHOPIFY: Record<string, (v: Record<string, string>) => ShopPick | null> = {
  'winter-duvet': v => ({handle: 'winter-duvet', values: [v.Size]}),
  'duvet-cover': v => ({handle: 'duvet-cover', values: [COVER_COLOUR[v.Colour]]}),
  'bedsheet': v => ({handle: '300tc-cotton-percale-bed-sheet-set', values: [SHEET_COLOUR[v.Colour]]}),
  'bed-set': v => ({handle: 'the-complete-bed', values: [COVER_COLOUR[v.Colour], SHEET_COLOUR[v.Colour]]}),
  'latex-pillow': () => ({handle: 'pure-natural-latex-pillow', values: []}),
  'contour-pillow': () => ({handle: 'natural-latex-contour-pillow', values: []}),
  'cotton-towel': v => ({handle: TOWEL_TYPE[v.Type], values: [v.Colour]}),
  'cotton-towel-set': () => ({handle: 'cotton-towel-set', values: []}),
  // Its colours are the Shopify product's Colour values, named exactly as on the site.
  'bamboo-towel': v => ({handle: 'bamboo-towel', values: [v.Colour]}),
};

/** Every Shopify product the site reads. */
export const SHOP_HANDLES = ['winter-duvet', 'duvet-cover', '300tc-cotton-percale-bed-sheet-set', 'the-complete-bed', 'pure-natural-latex-pillow',
  'natural-latex-contour-pillow', 'cotton-face-towe-set', 'cotton-hand-towel', 'cotton-bath-towel', 'cotton-towel-set', 'bamboo-towel'];

/**
 * The monogram is charged as an add-on line nested under its product, from the Shopify
 * product with this handle: one variant per price per piece (₹100 per towel, ₹150 per pillow cover).
 */
/**
 * Photos that belong to one colour, by how their file name in Shopify starts: each shows only while that
 * colour is chosen, in the order of the number after the name (dvt-cvr-cg-1, dvt-cvr-cg-2 …).
 */
export const COLOUR_FILES: Record<string, [RegExp, string][]> = {
  'duvet-cover': [[/^dvt-cvr-cg-/i, 'Charcoal grey'], [/^dvt-darktp-/i, 'Dark taupe']],
  'bedsheet': [[/^(bedhset|bedsheet)-dark-gray-/i, 'Charcoal grey'], [/^bdsht-dt-/i, 'Dark taupe']],
  'bamboo-towel': [[/^bamboo-sand-?brown-/i, 'Sand brown'], [/^bamboo-ash-?gr[ae]y-/i, 'Ash grey'], [/^bamboo-(lilac|dark-?gr[ae]y)/i, 'Lilac grey'], [/^bamboo-dark-?blue-/i, 'Dark blue'], [/^bamboo-dark-?brown-/i, 'Dark brown']],
};

export const MONOGRAM_HANDLE = 'monogram';
/** How many pieces each product's monogram is embroidered on, as the design prices it. */
export const MONOGRAM_PIECES: Record<string, number> = {'cotton-towel': 1, 'bamboo-towel': 1, 'cotton-towel-set': 3, 'bedsheet': 2, 'bed-set': 2};

/** Monogramming is not offered yet: every "Add initials" choice shows as coming soon, with Notify me. */
export const MONOGRAM_SOON = true;
if (MONOGRAM_SOON) for (const pid of Object.keys(P)) {
  const m = P[pid].opts.find((o: any) => o.n === 'Monogram');
  if (m) m.vals.forEach((v: any, i: number) => { if (i > 0) v.soon = true; });
}

// The store sells the winter duvet as Single and King; King covers double beds too.
P['winter-duvet'].opts[0].vals = P['winter-duvet'].opts[0].vals.filter((x: any) => x.v !== 'Double');
