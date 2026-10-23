// Reads the site's products from the Shopify Storefront API: prices, compare-at prices,
// stock and photos, plus the monogram add-on.
import type {Storefront} from '@shopify/hydrogen';
import {MONOGRAM_HANDLE, SHOP_HANDLES} from './map';
import type {Live} from './live';

const PRODUCT = `#graphql
  fragment DlProduct on Product {
    handle
    images(first: 20) { nodes { url altText } }
    variants(first: 50) { nodes { id availableForSale price { amount } compareAtPrice { amount } selectedOptions { value } image { url } } }
  }`;

const QUERY = `#graphql
  ${PRODUCT}
  query DlCatalog { ${[...SHOP_HANDLES, MONOGRAM_HANDLE].map((h, i) => `p${i}: product(handle: "${h}") { ...DlProduct }`).join(' ')} }`;

/** Photos are shown at most this wide; Shopify's CDN resizes them (and serves WebP/AVIF). */
const PHOTO_WIDTH = 1800;
const sized = (url: string) => url + (url.includes('?') ? '&' : '?') + 'width=' + PHOTO_WIDTH;

export async function getLive(storefront: Storefront): Promise<Live> {
  const data: any = await storefront.query(QUERY, {cache: storefront.CacheCustom({mode: 'public', maxAge: 30, staleWhileRevalidate: 300})});
  const products: Live['products'] = {};
  for (const p of Object.values(data || {}) as any[]) {
    if (!p) continue;
    products[p.handle] = {
      images: p.images.nodes.map((im: any) => ({url: sized(im.url), alt: im.altText || ''})),
      variants: p.variants.nodes.map((v: any) => ({
        id: v.id, ok: !!v.availableForSale, price: Math.round(+v.price.amount),
        cmp: v.compareAtPrice ? Math.round(+v.compareAtPrice.amount) : 0,
        values: v.selectedOptions.map((o: any) => o.value).filter((x: string) => x !== 'Default Title'),
        image: v.image ? sized(v.image.url) : '',
      })),
    };
  }
  return {products};
}
