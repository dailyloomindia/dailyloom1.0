// Delivery estimates for a pincode, from Shiprocket's courier serviceability API: which couriers deliver
// there from our warehouse, and in how many days. The Shiprocket API user's email and password are the
// SHIPROCKET_EMAIL and SHIPROCKET_PASSWORD environment variables; they never reach the browser.

const API = 'https://apiv2.shiprocket.in/v1/external';
/** The warehouse parcels are picked up from. */
export const PICKUP_PIN = '250002';
/** Days from payment to handing the parcel to the courier: within 48 hours, which also covers festival weeks. */
export const DISPATCH_DAYS = 2;
/** Parcel weight (kg) used for the check; serviceability does not change with weight for our parcels. */
const WEIGHT_KG = 1;

// Shiprocket tokens last 10 days; one is kept for 8, in memory and in the worker cache so every
// request does not log in again. Answers for a pincode are kept for 12 hours.
const TOKEN_KEY = 'https://cache.dailyloom.internal/shiprocket/token';
const pinKey = (pin: string) => `https://cache.dailyloom.internal/shiprocket/pin2/${pin}`;
const TOKEN_TTL = 8 * 24 * 3600, PIN_TTL = 12 * 3600;
let memo: {token: string; exp: number} | null = null;

async function cacheGet(key: string): Promise<any> {
  try { const r = await (await caches.open('dl-delivery')).match(key); return r ? await r.json() : null; } catch (e) { return null; }
}
async function cachePut(key: string, value: any, ttl: number) {
  try { await (await caches.open('dl-delivery')).put(key, new Response(JSON.stringify(value), {headers: {'Content-Type': 'application/json', 'Cache-Control': `max-age=${ttl}`}})); } catch (e) {}
}

async function token(env: any, fresh = false): Promise<string> {
  if (!fresh && memo && memo.exp > Date.now()) return memo.token;
  if (!fresh) { const c = await cacheGet(TOKEN_KEY); if (c && c.token) { memo = {token: c.token, exp: Date.now() + 3600e3}; return c.token; } }
  if (!env.SHIPROCKET_EMAIL || !env.SHIPROCKET_PASSWORD) throw new Error('Shiprocket API user not set');
  const r = await fetch(API + '/auth/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email: env.SHIPROCKET_EMAIL, password: env.SHIPROCKET_PASSWORD})});
  const d: any = await r.json().catch(() => ({}));
  if (!r.ok || !d.token) throw new Error('Shiprocket login failed: ' + r.status + (d.message ? ' ' + d.message : ''));
  memo = {token: d.token, exp: Date.now() + TOKEN_TTL * 1000};
  await cachePut(TOKEN_KEY, {token: d.token}, TOKEN_TTL);
  return d.token;
}

/** Days from payment to delivery: the recommended courier's estimate (else the middle one), plus dispatch. */
function daysFrom(d: any): number | null {
  const list = ((d && d.data && d.data.available_courier_companies) || []).filter((c: any) => +c.estimated_delivery_days > 0);
  if (!list.length) return null;
  const rec = list.find((c: any) => c.courier_company_id === d.data.recommended_courier_company_id);
  const sorted = list.map((c: any) => +c.estimated_delivery_days).sort((a: number, b: number) => a - b);
  return (rec ? +rec.estimated_delivery_days : sorted[Math.floor(sorted.length / 2)]) + DISPATCH_DAYS;
}

const title = (x: string) => x.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());

/** The town and state a pincode belongs to, e.g. "New Delhi, Delhi": from Shiprocket's couriers, else India Post's directory. */
async function placeOf(pin: string, d: any): Promise<string> {
  const c = ((d && d.data && d.data.available_courier_companies) || []).find((x: any) => x.city);
  if (c) return [c.city, c.state].filter(Boolean).map((x: string) => title(String(x).trim())).join(', ');
  try {
    const r = await fetch(`https://api.postalpincode.in/pincode/${pin}`, {signal: AbortSignal.timeout(3000)});
    const po = ((await r.json())[0] || {}).PostOffice;
    if (po && po[0]) return [po[0].District, po[0].State].filter(Boolean).join(', ');
  } catch (e) {}
  return '';
}

/** {ok: true, days, place} when couriers deliver to the pincode; {ok: false, place} when none do. Throws when Shiprocket can't be reached. */
export async function deliveryFor(env: any, pin: string): Promise<{ok: boolean; days?: number; place?: string}> {
  const cached = await cacheGet(pinKey(pin));
  if (cached) return cached;
  const url = `${API}/courier/serviceability/?pickup_postcode=${PICKUP_PIN}&delivery_postcode=${pin}&weight=${WEIGHT_KG}&cod=0`;
  const get = async (fresh: boolean) => fetch(url, {headers: {Authorization: 'Bearer ' + await token(env, fresh)}});
  let r = await get(false);
  if (r.status === 401) r = await get(true);
  const d: any = await r.json().catch(() => null);
  if (!d) throw new Error('Shiprocket serviceability: ' + r.status);
  if (r.status >= 500 || r.status === 401 || r.status === 403) throw new Error('Shiprocket serviceability: ' + r.status);
  const days = daysFrom(d), place = await placeOf(pin, d), out = days ? {ok: true, days, place} : {ok: false, place};
  await cachePut(pinKey(pin), out, PIN_TTL);
  return out;
}
