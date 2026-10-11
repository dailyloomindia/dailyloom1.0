import {json, type ActionFunctionArgs, type LoaderFunctionArgs, type MetaFunction} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {BagCheckout, BagContents, type BagCart} from '~/components/loom/Bag';

export const meta: MetaFunction = () => [{title: 'Your bag | Daily Loom'}];

export async function loader({context}: LoaderFunctionArgs) {
  return {cart: (await context.cart.get()) as BagCart | null};
}

const MAX_QTY = 10;

function safeRedirect(value: FormDataEntryValue | null) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : null;
}

/** Every bag mutation (add from a product page, quantity and remove from the
 * drawer) goes through here. A new visitor's first add creates the cart, so
 * the cart id must be persisted with setCartId's cookie header or the item
 * is lost on the next request. */
export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;
  const form = await request.formData();
  const intent = form.get('action');

  let result;
  if (intent === 'add') {
    const merchandiseId = String(form.get('variantId') || '');
    const quantity = Math.min(MAX_QTY, Math.max(1, Number(form.get('quantity')) || 1));
    if (!merchandiseId.startsWith('gid://shopify/ProductVariant/')) {
      return json({ok: false, error: 'Please choose an option first.'}, {status: 400});
    }
    result = await cart.addLines([{merchandiseId, quantity}]);
  } else if (intent === 'update' || intent === 'remove') {
    const lineId = String(form.get('lineId') || '');
    const quantity = intent === 'remove' ? 0 : Math.min(MAX_QTY, Math.max(0, Number(form.get('quantity')) || 0));
    if (!lineId) return json({ok: false, error: 'Missing line.'}, {status: 400});
    result = quantity > 0 ? await cart.updateLines([{id: lineId, quantity}]) : await cart.removeLines([lineId]);
  } else {
    return json({ok: false, error: 'Unknown action.'}, {status: 400});
  }

  const headers = result?.cart?.id ? cart.setCartId(result.cart.id) : new Headers();
  const userErrors: {message: string}[] = result?.userErrors || [];
  const ok = Boolean(result?.cart) && userErrors.length === 0;

  const redirectTo = safeRedirect(form.get('redirectTo'));
  if (redirectTo) {
    headers.set('Location', redirectTo);
    return new Response(null, {status: 303, headers});
  }
  return json({ok, error: userErrors[0]?.message || (ok ? null : 'Something went wrong. Please try again.')}, {headers});
}

export default function CartPage() {
  const {cart} = useLoaderData<typeof loader>();
  return (
    <main className="lm-pad" style={{paddingTop: 'calc(var(--lm-nav-h) + 56px)', paddingBottom: 'clamp(80px,10vw,140px)'}}>
      <div style={{maxWidth: 720, margin: '0 auto'}}>
        <span className="lm-tag">Your bag</span>
        <h1 className="lm-h-xl" style={{margin: '20px 0 12px'}}>
          Ready when you are.
        </h1>
        <div className="lm-satin lm-satin--linen" style={{padding: '8px clamp(18px,3vw,28px)', marginTop: 28, outline: '1px dashed rgba(126,82,50,.4)', outlineOffset: 8}}>
          <BagContents cart={cart} />
          <div style={{margin: '0 calc(-1 * clamp(18px,3vw,28px))'}}>
            <BagCheckout cart={cart} />
          </div>
        </div>
      </div>
    </main>
  );
}
