// Account: sign in (Shopify customer accounts: an email code or Google), orders and order detail.
import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useShell, type ShellLogic} from '~/dl/Shell';
import {AccountView} from '~/dl/views/AccountView';
import {P, fmt} from '~/dl/data/catalog';
import {getAccount, type AccountData} from '~/dl/shop/customer.server';

export async function loader({context}: LoaderFunctionArgs) {
  const account = await getAccount((context as any).customerAccount).catch(() => null);
  return {account};
}

function acctVals(sh: ShellLogic, acc: AccountData | null){
  const s = sh.state, a = s.acct || {}, f = s.acForm || {}, now = Date.now(), DAY = 864e5;
  const auth = !!acc, scr: string = auth ? (s.acScreen === 'order' ? 'order' : 'orders') : 'signin';
  const dt = (d: number) => new Date(now + d * DAY).toLocaleDateString('en-IN', {weekday:'short', day:'numeric', month:'short'});
  const valid = (e: string) => /\S+@\S+\.\S+/.test(e || '');
  const fld = (k: string) => (e: any) => sh.setState({acForm:{...sh.state.acForm, [k]: e.target.value}, acErr:''});
  // Sign-in happens on Shopify's page; the curtain comes down before leaving the site.
  const toShopify = (path: string) => { sh.setState({acErr:''}); const c = sh.curtainRef.current;
    if (c && c.animate) c.animate([{transform:'translateY(calc(-100% - 48px))'},{transform:'translateY(0)'}], {duration:560, easing:'cubic-bezier(.76,0,.24,1)', fill:'forwards'}).finished.then(() => { location.href = path; }, () => { location.href = path; });
    else location.href = path; };
  const name = acc ? acc.name || acc.email : '', first = name.split(' ')[0];
  const day = (ms: number | null) => ms == null ? null : (ms - now) / DAY;
  const RAW: any[] = (acc ? acc.orders : []).map(o => ({...o, placed: day(o.placed), packed: day(o.packed), shipped: day(o.shipped), out: day(o.out), delivered: day(o.delivered), eta: day(o.eta), cancelled: day(o.cancelled)}));
  const orders = RAW.map((o, oi) => {
    const items = o.items.map((it: any) => { const p = P[it.pid], img = it.image ? 'url("' + it.image + '")' : 'none';
      // Bought on another storefront: Shopify's own names.
      if (!p) return {name:it.name, qty:it.qty, price: fmt(it.total), unit: it.total, tint:'#E2D6C2', bg: img, opts: it.variant && it.variant !== 'Default Title' ? it.variant : 'One size'};
      const sel = sh.defSel(it.pid, it.sel), mono = it.mono, col = p.opts.find((x: any) => x.swatch); const m = sh.media(it.pid).find((x: any) => x.url);
      return {name:p.name, qty:it.qty, price: fmt(it.total), unit: it.total, tint: col ? col.vals[sel[col.n]].hex : '#E2D6C2', bg: it.image ? img : m ? 'url("' + m.url + '")' : 'none',
        opts: p.opts.filter((x: any) => x.vals.length > 1 || x.swatch).filter((x: any) => x.n !== 'Monogram' || sel.Monogram === 1).map((x: any) => x.n === 'Monogram' ? 'Monogram ' + mono : x.vals[sel[x.n]].v).join(' · ') || 'One size'}; });
    const total = o.total, count = items.reduce((t2: number, i: any) => t2 + i.qty, 0);
    const del = o.delivered != null, left = del ? Math.ceil((o.delivered + 7) - 0) : 0, sent = (a.ret || {})[o.no];
    const can = del && left > 0 && !sent, closed = del && left <= 0 && !sent;
    const off = o.cancelled != null;
    const status = off ? 'Cancelled' : !del ? 'On its way' : sent ? 'Return requested' : 'Delivered';
    const statusSub = off ? 'Cancelled on ' + dt(o.cancelled) : !del ? 'Arriving by ' + dt(o.eta) : sent ? 'We will reply by email' : can ? 'Return window open · ' + left + (left === 1 ? ' day' : ' days') + ' left' : 'Delivered on ' + dt(o.delivered);
    const stepsDef: any[] = [['Order placed', o.placed], ['Packed in our workshop', o.packed], ['Handed to our delivery partner', o.shipped], ['Out for delivery', o.out], ['Delivered', o.delivered]];
    const steps = stepsDef.map(([label, d], si) => { const done = d != null; const nextDone = si < 4 && stepsDef[si + 1][1] != null;
      return {label, when: done ? dt(d) : (si === 4 ? 'Expected ' + dt(o.eta) : ''), fill: done ? '#221E18' : 'transparent', ring: done ? '#221E18' : 'rgba(34,30,24,.3)', line: si === 4 ? 'transparent' : nextDone ? 'rgba(34,30,24,.55)' : 'rgba(34,30,24,.2)', ink: done ? '#221E18' : '#857A6A'}; });
    return {no:o.no, placed: dt(o.placed), itemsText: items.map((i: any) => i.name + (i.qty > 1 ? ' × ' + i.qty : '')).join(', '), countText: count + (count === 1 ? ' item' : ' items'),
      status, statusSub, dot: off ? '#857A6A' : !del ? '#C8925E' : sent ? '#7E5232' : '#55573F', total: fmt(total), thumbs: items.slice(0, 3).map((i: any) => ({tint:i.tint, bg:i.bg})), items, steps,
      headline: off ? 'Cancelled on ' + dt(o.cancelled) + '.' : !del ? 'Arriving by ' + dt(o.eta) + '.' : 'Delivered on ' + dt(o.delivered) + '.', courierLine: 'Our delivery partner' + (o.awb ? ' · ' + o.awb : ''), trackUrl: o.trackUrl || '#',
      retCan: can && !off, retTitle: off ? 'Order cancelled.' : sent ? 'Return requested.' : can ? 'Return window open.' : closed ? 'Return window closed.' : 'Returns open on delivery.',
      retText: off ? 'This order was cancelled on ' + dt(o.cancelled) + '. Write to contact@dailyloom.in with any questions.' : sent ? 'You told us on ' + new Date(sent).toLocaleDateString('en-IN', {day:'numeric', month:'short'}) + ' that the video is on its way. We review every request and reply by email. Pickup is arranged only once a return is accepted.'
        : can ? 'Closes in ' + left + (left === 1 ? ' day' : ' days') + ', on ' + dt(o.delivered + 7) + '. Returns are accepted only if a product arrives damaged; packaging alone is not covered.'
        : closed ? 'Returns can be requested for 7 days after delivery. This window closed on ' + dt(o.delivered + 7) + '.' : 'Once delivered, you have 7 days to request a return if anything arrives damaged.',
      retSteps: [{n:'1', t:'Your unboxing video', b:'A recording of the parcel being opened, showing it clearly from all sides.'}, {n:'2', t:'Email it to us', b:'Send it to contact@dailyloom.in with order number ' + o.no + '.'}, {n:'3', t:'We reply by email', b:'Once your return is accepted, we confirm by email and our delivery partner arranges the pickup.'}],
      mailto: 'mailto:contact@dailyloom.in?subject=' + encodeURIComponent('Return request · Order ' + o.no) + '&body=' + encodeURIComponent('Order number: ' + o.no + '\nProduct(s) affected:\nWhat is damaged:\n\nUnboxing video attached.'),
      facts: [{k:'Delivery address', v:o.address}, {k:'Payment', v:o.pay}],
      open: () => sh.go({view:'account', acScreen:'order', acOrder:oi})};
  });
  const od = orders[s.acOrder] || orders[0];
  const titles: any = {signin:['Sign in.', 'View your orders, track deliveries and request a return.'], signup:['Create your account.', 'Keep your orders, addresses and returns in one place.'], forgot:['Forgot your password?', 'Enter your email and we will send you a link to set a new one.'], sent:['Link sent.', '']};
  return {
    isAccount: true, acAuth: ['signin','signup','forgot','sent'].includes(scr), acIsSignin: scr === 'signin', acIsSignup: scr === 'signup', acIsForgot: scr === 'forgot', acIsSent: scr === 'sent',
    acIsOrders: scr === 'orders', acIsOrder: scr === 'order', acTitle: (titles[scr] || titles.signin)[0], acLede: (titles[scr] || titles.signin)[1],
    acEmailIn: f.email || '', acPassIn: f.pass || '', acNameIn: f.name || '', acOnEmail: fld('email'), acOnPass: fld('pass'), acOnName: fld('name'), acErr: s.acErr, acHasErr: !!s.acErr,
    acSignin: (e: any) => { e.preventDefault(); const em = (f.email || '').trim(); if (em && !valid(em)) return sh.setState({acErr:'Please enter a valid email address.'}); toShopify('/account/login' + (em ? '?email=' + encodeURIComponent(em) : '')); },
    acSignup: (e: any) => { e.preventDefault(); toShopify('/account/login'); },
    acForgot: (e: any) => { e.preventDefault(); if (!valid(f.email)) return sh.setState({acErr:'Please enter a valid email address.'}); sh.acScreen('sent'); },
    // There is no separate sign-up: the first sign-in creates the account.
    acToSignin: () => sh.acScreen('signin'), acToSignup: () => toShopify('/account/login'), acToForgot: () => sh.acScreen('signin'),
    acSignout: () => toShopify('/account/logout'),
    acFirst: first, acEmail: acc ? acc.email : '', acOrders: orders, acNoOrders: !orders.length, acToOrders: () => sh.go({view:'account', acScreen:'orders'}),
    acDetails: [{k:'Name', v:name}, {k:'Email', v:acc ? acc.email : ''}, {k:'Default address', v:acc ? acc.address : ''}],
    od, odAsidePos: s.mobile || s.stacked ? 'relative' : 'sticky',
    acRetToggle: () => sh.setState((x: any) => ({retOpen: !x.retOpen})), acRetToggleLabel: s.retOpen ? 'Close' : 'Request a return', acRetRows: s.retOpen ? '1fr' : '0fr',
    acRetSent: () => { sh.setAcct({ret:{...(a.ret || {}), [od.no]: Date.now()}}); sh.setState({retOpen:false}); }
  };
}

export default function Account() {
  const {account} = useLoaderData<typeof loader>();
  const {sh, base} = useShell();
  return <AccountView vals={{...base, ...acctVals(sh, account as AccountData | null)}} />;
}
