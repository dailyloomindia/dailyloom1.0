// POST /cart: the bag's add, quantity and remove actions, on the Shopify cart. Returns the bag.
import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {getLive} from '~/dl/shop/catalog.server';
import {getBag, type Bag} from '~/dl/shop/cart.server';
import {monogramOf, variantOf} from '~/dl/shop/live';

const LINES_ADD = `#graphql
  mutation DlLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id } userErrors { message } warnings { message } }
  }`;
const LINES_UPDATE = `#graphql
  mutation DlLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } userErrors { message } }
  }`;
const LINES_REMOVE = `#graphql
  mutation DlLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } userErrors { message } }
  }`;

/** One bag item's identity: the same product, options and initials are one line. */
const dlKey = (dl: any) => dl ? JSON.stringify([dl.pid, Object.keys(dl.sel || {}).sort().map(k => [k, dl.sel[k]]), dl.mono || '']) : '';

export async function action({request, context}: ActionFunctionArgs) {
  const {cart, storefront} = context as any;
  const body: any = await request.json().catch(() => ({}));
  const ids = cart.getCartId() ? [cart.getCartId()] : [];
  let error = '';
  const fail = (r: any, k: string) => { const e = r && r[k] && r[k].userErrors; if (e && e.length) error = e.map((x: any) => x.message).join(' '); };

  // Sets a top-level line's quantity, keeping its add-ons in step (monogram pieces per item).
  const setQty = async (bag: Bag, lineId: string, qty: number) => {
    const line = bag.lines.find(l => l.id === lineId); if (!line) return;
    if (qty <= 0) return fail(await storefront.mutate(LINES_REMOVE, {variables: {cartId: cart.getCartId(), lineIds: [line.id, ...line.kids.map(k => k.id)]}}), 'cartLinesRemove');
    const per = (k: {qty: number}) => Math.max(1, Math.round(k.qty / line.qty));
    fail(await storefront.mutate(LINES_UPDATE, {variables: {cartId: cart.getCartId(), lines: [{id: line.id, quantity: qty}, ...line.kids.map(k => ({id: k.id, quantity: per(k) * qty}))]}}), 'cartLinesUpdate');
  };

  if (body.op === 'add') {
    const {pid, sel = {}, qty = 1} = body;
    const live = await getLive(storefront);
    const v = variantOf(live, pid, sel);
    if (!v || !v.ok) return json({error: 'sold out', bag: await getBag(cart)}, {status: 409});
    const initials = sel.Monogram === 1 ? String(body.mono || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) : '';
    const dl = {pid, sel, mono: initials};
    const before = await getBag(cart);
    const same = before.lines.find(l => dlKey(l.dl) === dlKey(dl));
    if (same) await setQty(before, same.id, same.qty + qty);
    else {
      const attributes = [{key: '_dl', value: JSON.stringify(dl)}, ...(sel.Monogram === 1 ? [{key: 'Monogram', value: initials || '—'}] : [])];
      const line = {merchandiseId: v.id, quantity: qty, attributes};
      if (!cart.getCartId()) { const r = await cart.create({lines: [line]}); if (r && r.userErrors && r.userErrors.length) error = r.userErrors.map((x: any) => x.message).join(' '); }
      else fail(await storefront.mutate(LINES_ADD, {variables: {cartId: cart.getCartId(), lines: [line]}}), 'cartLinesAdd');
      const mono = sel.Monogram === 1 && !error ? monogramOf(live, pid) : null;
      if (mono) {
        const added = (await getBag(cart)).lines.find(l => dlKey(l.dl) === dlKey(dl));
        if (added) fail(await storefront.mutate(LINES_ADD, {variables: {cartId: cart.getCartId(), lines: [{merchandiseId: mono.id, quantity: mono.pieces * qty, parent: {lineId: added.id}, attributes: [{key: 'Initials', value: initials || '—'}]}]}}), 'cartLinesAdd');
      }
    }
  } else if (body.op === 'qty' && cart.getCartId()) {
    await setQty(await getBag(cart), String(body.line), Math.max(0, Math.min(99, +body.qty || 0)));
  }

  const bag = await getBag(cart);
  const headers = cart.getCartId() && !ids.includes(cart.getCartId()) ? cart.setCartId(cart.getCartId()) : new Headers();
  return json({bag, error}, {headers, status: error ? 400 : 200});
}
