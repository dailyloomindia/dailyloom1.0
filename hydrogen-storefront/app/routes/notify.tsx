// POST /notify: a "Notify me" request for something sold out or coming soon, emailed to the shop.
// Signed-in customers are identified from their account; anyone else gives an email.
import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';

const SHOP_EMAIL = 'contact@dailyloom.in';
// Delivers the email (formsubmit.co: no account; the first request asks the inbox to confirm once).
const SEND_TO = `https://formsubmit.co/ajax/${SHOP_EMAIL}`;

const ME = `#graphql
  query DlNotifyCustomer { customer { displayName emailAddress { emailAddress } } }`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function action({request, context}: ActionFunctionArgs) {
  const {customerAccount} = context as any;
  const body: any = await request.json().catch(() => ({}));
  const item = String(body.item || '').trim().slice(0, 200);
  if (!item) return json({error: 'item'}, {status: 400});
  let email = String(body.email || '').trim().slice(0, 200), name = '', signedIn = false;
  if (await customerAccount.isLoggedIn().catch(() => false)) {
    const {data} = await customerAccount.query(ME).catch(() => ({data: null}));
    const c = data && data.customer;
    if (c && c.emailAddress && c.emailAddress.emailAddress) { email = c.emailAddress.emailAddress; name = c.displayName || ''; signedIn = true; }
  }
  if (!EMAIL.test(email)) return json({error: 'email'}, {status: 400});
  const res = await fetch(SEND_TO, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json', Origin: 'https://dailyloom.in', Referer: 'https://dailyloom.in/'},
    body: JSON.stringify({
      _subject: `Notify me: ${item}`, _template: 'table', _captcha: 'false',
      Product: item, email, Name: name || '—', 'Signed in': signedIn ? 'Yes' : 'No', Page: String(body.page || '').slice(0, 300),
    }),
  }).catch(() => null);
  const out: any = res ? await res.json().catch(() => null) : null;
  if (!out || String(out.success) !== 'true') {
    console.error('Notify me not delivered:', out && out.message);
    return json({error: 'send'}, {status: 502});
  }
  return json({ok: true});
}
