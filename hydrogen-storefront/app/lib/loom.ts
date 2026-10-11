import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';

export interface MoneyV2 {
  amount: string;
  currencyCode: CurrencyCode;
}

export interface LoomImage {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface LoomVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {name: string; value: string}[];
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  image: LoomImage | null;
}

export interface LoomOption {
  name: string;
  optionValues: {name: string}[];
}

export interface LoomProduct {
  id: string;
  handle: string;
  title: string;
  productType: string;
  description: string;
  availableForSale: boolean;
  priceRange: {minVariantPrice: MoneyV2};
  compareAtPriceRange: {minVariantPrice: MoneyV2};
  featuredImage: LoomImage | null;
  images: {nodes: LoomImage[]};
  options: LoomOption[];
  variants: {nodes: LoomVariant[]};
}

export interface LoomCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: {nodes: LoomProduct[]};
}

export const LOOM_PRODUCT_FRAGMENT = `#graphql
  fragment LoomProduct on Product {
    id
    handle
    title
    productType
    description
    availableForSale
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } }
    featuredImage { id url altText width height }
    images(first: 8) { nodes { id url altText width height } }
    options { name optionValues { name } }
    variants(first: 50) {
      nodes {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        image { id url altText width height }
      }
    }
  }
`;

export function formatMoney(amount: string | number, currencyCode: string = 'INR') {
  const n = Number(amount);
  const whole = Number.isInteger(n);
  return new Intl.NumberFormat(currencyCode === 'INR' ? 'en-IN' : 'en', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(n);
}

export function formatMoneyV2(m: MoneyV2 | null | undefined) {
  return m ? formatMoney(m.amount, m.currencyCode) : '';
}

/** Real Shopify titles here are long SEO strings ("Daily Loom X - (King) | Crisp | ...");
 * the first segment without the brand prefix is the readable name. */
export function shortenTitle(title: string): string {
  const stripped = title.replace(/^daily loom\s+/i, '');
  const first = stripped.split(/\s+\||\s+-\s+/)[0].trim() || stripped;
  return first.length > 48 ? first.slice(0, 45).trimEnd() + '…' : first;
}

/** Options a shopper actually chooses between — a single-variant product
 * reports one "Title: Default Title" option, which is not a real choice. */
export function realOptions(product: Pick<LoomProduct, 'options'>): LoomOption[] {
  return (product.options || []).filter(
    (o) => !(o.name === 'Title' && o.optionValues.length === 1 && o.optionValues[0].name === 'Default Title'),
  );
}

export function isColourOption(name: string) {
  return /colou?r/i.test(name);
}

export function findVariant(variants: LoomVariant[], selected: Record<string, string>) {
  return variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value));
}

export function selectionOf(variant: LoomVariant | undefined): Record<string, string> {
  const sel: Record<string, string> = {};
  variant?.selectedOptions.forEach((o) => (sel[o.name] = o.value));
  return sel;
}

/** Colour values that exist across the product's variants, in option order. */
export function colourValues(product: Pick<LoomProduct, 'options'>): string[] {
  const opt = (product.options || []).find((o) => isColourOption(o.name));
  return opt ? opt.optionValues.map((v) => v.name) : [];
}

export function joinWords(words: string[]) {
  if (words.length <= 1) return words.join('');
  return words.slice(0, -1).join(', ') + ' and ' + words[words.length - 1];
}

/** Decorative only — the swatch's aria-label carries the real value.
 * Longest key first so "dark gray" wins over "gray". */
export function swatchColor(name: string): string {
  const n = name.toLowerCase();
  const map: Record<string, string> = {
    white: '#F3EFE7',
    ivory: '#F1EADB',
    cream: '#EFE6D3',
    ecru: '#E8DFCC',
    black: '#23241F',
    gray: '#8B8A86',
    grey: '#8B8A86',
    'dark gray': '#5A5954',
    'dark grey': '#5A5954',
    charcoal: '#3A3A36',
    slate: '#5E6466',
    brown: '#6B4A35',
    'dark brown': '#4A3326',
    beige: '#E4D9C4',
    navy: '#2B3345',
    indigo: '#34405A',
    blue: '#3F5A78',
    green: '#5C6E4F',
    sage: '#A3A585',
    clay: '#B9805E',
    gold: '#B8985A',
    red: '#8A3B32',
    pink: '#D9A9A0',
  };
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const key of keys) if (n.includes(key)) return map[key];
  return '#E5DCCB';
}

export function productPath(handle: string) {
  return `/products/${handle}`;
}

export function collectionPath(handle: string) {
  return `/collections/${handle}`;
}

/** Shopify Menu/policy URLs are absolute on the shop's domain; on-site paths
 * become relative so they route inside this app, anything else stays external. */
export function toSitePath(url: string): {href: string; external: boolean} {
  try {
    const u = new URL(url);
    const local = /^\/(collections|products|pages|blogs|search|cart)(\/|$)|^\/$/.test(u.pathname);
    return local ? {href: u.pathname + u.search, external: false} : {href: url, external: true};
  } catch {
    return {href: url, external: false};
  }
}
