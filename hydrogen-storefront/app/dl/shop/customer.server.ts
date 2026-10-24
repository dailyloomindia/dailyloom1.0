// The signed-in customer and their orders, from the Shopify Customer Account API, in the
// shape the account page shows them.

const QUERY = `#graphql
  query DlCustomer {
    customer {
      firstName lastName displayName
      emailAddress { emailAddress }
      defaultAddress { formatted(withName: true) }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          name processedAt cancelledAt financialStatus statusPageUrl
          totalPrice { amount }
          shippingAddress { formatted(withName: true) zip }
          transactions { kind status paymentDetails { ... on CardPaymentDetails { last4 } } paymentIcon { altText } typeDetails { name } }
          lineItems(first: 50) { nodes { title variantTitle quantity image { url } totalPrice { amount } customAttributes { key value } } }
          fulfillments(first: 10) { nodes { createdAt updatedAt estimatedDeliveryAt status latestShipmentStatus trackingInformation { number url company } events(first: 20) { nodes { status happenedAt } } } }
        }
      }
    }
  }`;

/** One order item: the site product it was bought as (from the cart's `_dl` attribute), or Shopify's own title. */
export type AccountItem = {pid: string; sel: any; mono: string; name: string; variant: string; qty: number; total: number; image: string};
export type AccountOrder = {no: string; placed: number; cancelled: number | null; packed: number | null; shipped: number | null; out: number | null; delivered: number | null; eta: number;
  items: AccountItem[]; total: number; pay: string; awb: string; trackUrl: string; address: string};
export type AccountData = {name: string; email: string; address: string; orders: AccountOrder[]};

const t = (iso?: string | null) => iso ? Date.parse(iso) : null;
const lines = (f: any) => Array.isArray(f) ? f.join(', ') : (f || '');
const DAY = 864e5;
const PAID: Record<string, string> = {PAID: 'Paid', PENDING: 'Payment pending', AUTHORIZED: 'Authorised', PARTIALLY_PAID: 'Partly paid', REFUNDED: 'Refunded', PARTIALLY_REFUNDED: 'Partly refunded', VOIDED: 'Voided', EXPIRED: 'Expired'};

export async function getAccount(customerAccount: any): Promise<AccountData | null> {
  if (!(await customerAccount.isLoggedIn())) return null;
  const {data} = await customerAccount.query(QUERY);
  const c = data && data.customer; if (!c) return null;
  const orders = c.orders.nodes.map((o: any): AccountOrder => {
    const fs = o.fulfillments.nodes || [], evs = fs.flatMap((f: any) => (f.events && f.events.nodes) || []);
    const first = (...st: string[]) => { const x = evs.filter((e: any) => st.includes(e.status)).map((e: any) => t(e.happenedAt) as number); return x.length ? Math.min(...x) : null; };
    const made = fs.length ? Math.min(...fs.map((f: any) => t(f.createdAt) as number)) : null;
    const marked = fs.filter((f: any) => f.latestShipmentStatus === 'DELIVERED').map((f: any) => t(f.updatedAt) as number);
    const delivered = first('DELIVERED') ?? (marked.length ? Math.max(...marked) : null);
    const out = first('OUT_FOR_DELIVERY') ?? delivered;
    const shipped = first('IN_TRANSIT', 'CARRIER_PICKED_UP', 'PICKED_UP') ?? (made && (evs.length === 0 || out) ? made : null);
    const packed = first('LABEL_PRINTED', 'LABEL_PURCHASED', 'CONFIRMED') ?? (made ?? null);
    const placed = t(o.processedAt) as number, zip = (o.shippingAddress && o.shippingAddress.zip) || '';
    const est = fs.map((f: any) => t(f.estimatedDeliveryAt)).filter(Boolean) as number[];
    // No courier estimate yet: the same rule the buy page's pincode check uses.
    const eta = est.length ? Math.max(...est) : placed + (3 + (/^\d/.test(zip) ? +zip[0] % 3 : 0)) * DAY;
    // Items, with each monogram add-on line folded into the item it was embroidered on.
    const items: AccountItem[] = [], addOns: any[] = [];
    for (const li of o.lineItems.nodes) {
      const at = (k: string) => ((li.customAttributes || []).find((a: any) => a.key === k) || {}).value;
      let dl: any = null; try { dl = at('_dl') ? JSON.parse(at('_dl')) : null; } catch (e) {}
      if (at('Initials') != null && !dl) { addOns.push({initials: at('Initials'), total: Math.round(+li.totalPrice.amount)}); continue; }
      items.push({pid: dl ? dl.pid : '', sel: dl ? dl.sel || {} : {}, mono: dl ? dl.mono || '' : (at('Monogram') || ''), name: li.title, variant: li.variantTitle || '', qty: li.quantity, total: Math.round(+li.totalPrice.amount), image: (li.image && li.image.url) || ''});
    }
    for (const a of addOns) { const it = items.find(i => i.sel.Monogram === 1 && i.mono === a.initials) || items[0]; if (it) it.total += a.total; }
    const tx = (o.transactions || []).find((x: any) => ['SALE', 'CAPTURE', 'AUTHORIZATION'].includes(x.kind) && x.status === 'SUCCESS') || (o.transactions || [])[0];
    const card = tx && tx.paymentDetails && tx.paymentDetails.last4;
    const method = card ? 'Card ending ' + card : (tx && ((tx.typeDetails && tx.typeDetails.name) || (tx.paymentIcon && tx.paymentIcon.altText))) || '';
    const track = fs.map((f: any) => f.trackingInformation && f.trackingInformation[0]).find((x: any) => x && x.number);
    return {
      no: o.name, placed, cancelled: t(o.cancelledAt), packed, shipped, out, delivered, eta, items, total: Math.round(+o.totalPrice.amount),
      pay: [method, PAID[o.financialStatus] || ''].filter(Boolean).join(' · '),
      awb: track ? 'AWB ' + track.number : '', trackUrl: (track && track.url) || o.statusPageUrl || '',
      address: lines(o.shippingAddress && o.shippingAddress.formatted),
    };
  });
  return {
    name: c.displayName || [c.firstName, c.lastName].filter(Boolean).join(' '), email: (c.emailAddress && c.emailAddress.emailAddress) || '',
    address: lines(c.defaultAddress && c.defaultAddress.formatted), orders,
  };
}
