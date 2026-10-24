// Google Analytics 4. Loads Google's tag only when a measurement ID is set (PUBLIC_GA_MEASUREMENT_ID),
// and sends it the shop's own events (page, product and collection views, bag adds and removals)
// from Hydrogen's analytics, so Google and Shopify count the same things.
import {useEffect} from 'react';
import {useAnalytics} from '@shopify/hydrogen';

declare global { interface Window { dataLayer: any[]; gtag: (...a: any[]) => void } }

const item = (p: any, qty?: number) => ({
  item_id: p.sku || p.variantId || p.id, item_name: p.title, item_variant: p.variantTitle, item_brand: p.vendor,
  item_category: p.productType, price: +p.price, quantity: qty ?? p.quantity ?? 1,
});
const lineItem = (l: any) => l && l.merchandise ? item({
  id: l.merchandise.product.id, sku: l.merchandise.sku, variantId: l.merchandise.id, title: l.merchandise.product.title,
  variantTitle: l.merchandise.title, vendor: l.merchandise.product.vendor, productType: l.merchandise.product.productType,
  price: l.merchandise.price && l.merchandise.price.amount,
}, l.quantity) : null;

export function GoogleAnalytics({id}: {id: string}) {
  const {subscribe, register} = useAnalytics();
  const {ready} = register('Google Analytics');
  useEffect(() => {
    if (!id) return ready();
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    // Page views are sent below, on every page change the site makes without reloading.
    window.gtag('config', id, {send_page_view: false});
    const s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    const g = (name: string, params: any) => window.gtag('event', name, params);
    subscribe('page_viewed', (d: any) => g('page_view', {page_location: d.url, page_title: document.title}));
    subscribe('product_viewed', (d: any) => {
      const items = (d.products || []).map((p: any) => item(p));
      g('view_item', {currency: 'INR', value: items.reduce((a: number, x: any) => a + x.price, 0), items});
    });
    subscribe('collection_viewed', (d: any) => g('view_item_list', {item_list_id: d.collection && d.collection.handle, item_list_name: d.collection && d.collection.title}));
    subscribe('product_added_to_cart', (d: any) => {
      const it = lineItem(d.currentLine); if (!it) return;
      it.quantity = d.currentLine.quantity - (d.prevLine ? d.prevLine.quantity : 0);
      g('add_to_cart', {currency: 'INR', value: it.price * it.quantity, items: [it]});
    });
    subscribe('product_removed_from_cart', (d: any) => {
      const it = lineItem(d.prevLine); if (!it) return;
      it.quantity = d.prevLine.quantity - (d.currentLine ? d.currentLine.quantity : 0);
      g('remove_from_cart', {currency: 'INR', value: it.price * it.quantity, items: [it]});
    });
    subscribe('cart_viewed', (d: any) => {
      const items = ((d.cart && d.cart.lines && d.cart.lines.nodes) || []).map(lineItem).filter(Boolean);
      g('view_cart', {currency: 'INR', value: d.cart ? +d.cart.cost.totalAmount.amount : 0, items});
    });
    ready();
  }, []);
  return null;
}
