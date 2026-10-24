// POST /notify: checks a "Notify me" request for something sold out or coming soon, and gives back
// who it is from: a signed-in customer's account email, or the email they entered. The browser then
// emails it to the shop (lib below), since the email service accepts website forms, not servers.
import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';

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
  return json({ok: true, item, email, name, signedIn});
}
