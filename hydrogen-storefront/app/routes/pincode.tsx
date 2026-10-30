// POST /pincode {pin}: whether we deliver to a pincode, and in how many days from payment (Shiprocket).
import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';
import {sameOrigin} from '~/dl/shop/guard.server';
import {deliveryFor} from '~/dl/shop/delivery.server';

export async function action({request, context}: ActionFunctionArgs) {
  if (!sameOrigin(request)) return json({error: 'forbidden'}, {status: 403});
  const body: any = await request.json().catch(() => ({}));
  const pin = String(body.pin || '');
  if (!/^[1-9]\d{5}$/.test(pin)) return json({error: 'pin'}, {status: 400});
  try {
    return json(await deliveryFor((context as any).env, pin));
  } catch (e: any) {
    console.error('pincode check:', e && e.message);
    return json({error: 'unavailable', reason: String((e && e.message) || e).slice(0, 80)}, {status: 503});
  }
}
