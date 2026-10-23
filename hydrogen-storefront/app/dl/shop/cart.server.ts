// The bag is a Shopify cart. Each item carries its site product and selection in a hidden
// `_dl` attribute; a monogram is a nested add-on line under it, holding the initials.
import type {HydrogenCart} from '@shopify/hydrogen';

/** What the cart queries return (Hydrogen requires this fragment name). */
export const CART_QUERY_FRAGMENT = `#graphql
  fragment CartApiQuery on Cart {
    id
    checkoutUrl
    lines(first: $numCartLines) {
      nodes {
        id
        quantity
        attributes { key value }
        cost { totalAmount { amount } }
        merchandise { ... on ProductVariant { id title product { title } } }
        ... on CartLine { parentRelationship { parent { id } } }
      }
    }
  }`;

export type BagLine = {id: string; qty: number; total: number; dl: any; title: string; variant: string; kids: {id: string; qty: number; total: number}[]};
export type Bag = {checkoutUrl: string; lines: BagLine[]};

/** The cart as the bag needs it: top-level items, with their add-ons folded in. */
export function toBag(cart: any): Bag {
  const nodes: any[] = (cart && cart.lines && cart.lines.nodes) || [];
  const kidsOf = (id: string) => nodes.filter(n => n.parentRelationship && n.parentRelationship.parent && n.parentRelationship.parent.id === id);
  const lines = nodes.filter(n => !(n.parentRelationship && n.parentRelationship.parent)).map(n => {
    const a = (n.attributes || []).find((x: any) => x.key === '_dl');
    let dl = null; try { dl = a ? JSON.parse(a.value) : null; } catch (e) {}
    return {
      id: n.id, qty: n.quantity, total: Math.round(+n.cost.totalAmount.amount), dl,
      title: (n.merchandise && n.merchandise.product && n.merchandise.product.title) || '', variant: (n.merchandise && n.merchandise.title) || '',
      kids: kidsOf(n.id).map(k => ({id: k.id, qty: k.quantity, total: Math.round(+k.cost.totalAmount.amount)})),
    };
  });
  return {checkoutUrl: (cart && cart.checkoutUrl) || '', lines};
}

export async function getBag(cart: HydrogenCart): Promise<Bag> {
  return toBag(await cart.get().catch(() => null));
}
