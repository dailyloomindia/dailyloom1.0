// Buy page: /collections/<handle>/buynow[?product=<id>]
import {useLoaderData} from '@remix-run/react';
import {Analytics} from '@shopify/hydrogen';
import {json, redirect, type HeadersFunction, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {PROPS, firstPhoto, photosOf, useShell, valLabel, type ShellLogic} from '~/dl/Shell';
import {ProductView} from '~/dl/views/ProductView';
import {Zoom} from '~/dl/Zoom';
import {CATS, P, RECS, SRC, fmt} from '~/dl/data/catalog';
import {DELIV} from '~/dl/data/product-data';
import {CAT_BY_HANDLE, productFor} from '~/dl/routing';
import {preloadHeader} from '~/dl/preload';
import {analyticsProduct, availableOf, combos, compareOf, dealVals, fromDeal, inStore, priceOf, variantOf} from '~/dl/shop/live';
import {HANDLE} from '~/dl/routing';
import {ORIGIN, RETURN_POLICY, breadcrumbs, seo} from '~/dl/seo/meta';
import {PRODUCT_SEO} from '~/dl/seo/keywords';
import {getLive} from '~/dl/shop/catalog.server';

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const k = CAT_BY_HANDLE[params.handle || ''];
  const pid = k && productFor(k, new URL(request.url).searchParams.get('product'));
  if (!pid) throw new Response('Not found', {status: 404});
  const live = await getLive((context as any).storefront).catch(() => null);
  // Not sold yet: its collection page shows it as coming soon.
  if (!inStore(live, pid)) throw redirect('/collections/' + params.handle, 302);
  const photo = firstPhoto(live, pid), url = new URL(request.url), path = url.pathname + url.search;
  // Product details for search results and Google Shopping (schema.org): one offer per variant the store sells.
  const seen = new Set<string>(), offers: any[] = [];
  for (const s of combos(pid)) {
    const v = variantOf(live, pid, s);
    if (v && seen.has(v.id)) continue;
    if (v) seen.add(v.id);
    offers.push({
      '@type': 'Offer', url: ORIGIN + path, priceCurrency: 'INR', price: priceOf(live, pid, s), itemCondition: 'https://schema.org/NewCondition',
      availability: availableOf(live, pid, s) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      ...(v ? {sku: v.sku || v.id.split('/').pop(), name: v.title === 'Default Title' ? P[pid].name : `${P[pid].name} · ${v.title}`} : {}),
      seller: {'@type': 'Organization', name: 'Daily Loom'}, hasMerchantReturnPolicy: RETURN_POLICY,
    });
  }
  const photos = photosOf(live, pid).slice(0, 8), kw = PRODUCT_SEO[pid];
  const cat = P[pid].cat, catName = CATS.find((c: any) => c.k === cat).name;
  const ld = [
    {'@context': 'https://schema.org', '@type': 'Product', name: P[pid].name, description: kw ? kw.description : P[pid].short,
      ...(photos.length ? {image: photos} : photo ? {image: [photo]} : {}), brand: {'@type': 'Brand', name: 'Daily Loom'}, offers},
    breadcrumbs([[catName, '/collections/' + HANDLE[cat]], [P[pid].name, path]]),
  ];
  return json({pid, photo, path, ld}, photo ? {headers: {Link: preloadHeader([photo])}} : undefined);
}

export const meta = ({data}: any) => {
  if (!data) return [];
  const kw = PRODUCT_SEO[data.pid];
  return seo({title: kw ? kw.title : P[data.pid].name, description: kw ? kw.description : P[data.pid].short, image: data.photo, path: data.path, ld: data.ld});
};

export const headers: HeadersFunction = ({loaderHeaders}) => loaderHeaders;

function pdpVals(sh: ShellLogic, pid: string, p: any, sel: any){
  const s = sh.state, prev = PROPS.pdpPreview ?? 'ready';
  const loading = prev === 'loading', avail = prev !== 'sold out' && availableOf(sh.props.live, pid, sel);
  const was = compareOf(sh.props.live, pid, sel), now = sh.priceOf(pid, sel);
  const all = sh.media(pid), vis = sh.visible(pid, sel);
  const cur = vis.find((m: any) => m.i === s.gi) || vis[0] || all[0] || {i:-1};
  const vi = vis.indexOf(cur);
  const step = (d: number) => () => { if (!vis.length) return; sh.setState({gi: vis[(vi + d + vis.length) % vis.length].i}); };
  const opts = p.opts.map((o: any) => {
    const ci = sel[o.n] ?? 0, cv = o.vals[ci], single = o.vals.length === 1;
    const prices = o.vals.map((v: any, k: number) => sh.priceOf(pid, {...sel, [o.n]:k}));
    const differ = prices.some((x: number) => x !== prices[0]);
    return {name:o.n, current: o.swatch || single ? cv.v : cv.v, single, singleText: cv.d ? cv.v + ' · ' + cv.d : cv.v, swatch: !!o.swatch && !single, tiles: !o.swatch && !single,
      vals: o.vals.map((v: any, k: number) => { const on = k === ci; const off = !!v.soon;
        // Coming soon (monogramming, for now): greyed, and choosing it asks to be notified instead.
        const nf = off ? (o.n === 'Monogram' ? sh.notifyFor(`Monogramming on the ${p.name}`, 'monogramming is available') : sh.notifyFor(`${p.name} · ${v.v}`, `the ${p.name} in ${v.v} arrives`)) : null;
        return {label:v.v, sub: off ? 'Coming soon' : v.d || '', hasNf: !!nf, nfLabel: nf ? nf.label : '', hex:v.hex, price: off ? '' : differ && o.n !== 'Monogram' ? fmt(prices[k]) : (v.p && o.n === 'Monogram' ? '+' + fmt(v.p) : ''), disabled: false, cursor: 'pointer', op: off ? .45 : 1,
          bg: on ? 'rgba(244,239,230,.92)' : 'transparent', bd: on ? '#221E18' : 'rgba(34,30,24,.18)', outline: on ? '1px dashed rgba(126,82,50,.5)' : '1px dashed rgba(126,82,50,0)', fg: off ? '#9A8F7E' : '#221E18', subColor: off ? '#9A8F7E' : '#5F574B',
          ring: on ? '0 0 0 2px #F4EFE6, 0 0 0 3.5px #221E18' : 'inset 0 0 0 1px rgba(34,30,24,.16)', pick: nf ? nf.go : () => sh.pickOpt(pid, o.n, k)}; })};
  });
  const summary = p.opts.filter((o: any) => o.n !== 'Monogram' || sel.Monogram === 1).map((o: any) => o.n === 'Monogram' ? 'Monogram' : valLabel(o.vals[sel[o.n] ?? 0])).join(' · ');
  const mobile = !!s.mobile, showBar = !!s.ctaOut && !loading && !s.barHidden;
  return {
    opts, pLoading: loading, pReady: !loading, pAvail: avail, pSoldOut: !avail, pHasCompare: was > 0, pCompare: was ? fmt(was * s.qty) : '', pOff: was ? Math.round((was - now) / was * 100) + '% off' : '',
    ctaRef: sh.ctaRef, stagePos: (mobile || s.stacked) ? 'relative' : 'sticky', stageTop: (mobile || s.stacked) ? '0px' : '80px', stageH: mobile ? 'min(118vw, 640px)' : s.stacked ? 'min(80vw, 720px)' : 'calc(100vh - 300px)',
    gAll: all.map((m: any) => ({...m, bg: m.url ? 'url("' + m.url + '")' : 'none', hasUrl: !!m.url, noUrl: !m.url, op: m.i === cur.i ? 1 : 0, tf: m.i === cur.i ? 'scale(1)' : 'scale(1.035)'})),
    gThumbs: vis.map((m: any) => ({alt:m.alt, url:m.url, bg: m.url ? 'url("' + m.url + '")' : 'none', hasUrl: !!m.url, tint:m.tint, op: m.i === cur.i ? 1 : .55, ring: m.i === cur.i ? '1px solid #221E18' : '1px solid rgba(34,30,24,0)', pick: () => sh.setState({gi:m.i})})),
    gMulti: vis.length > 1, gCount: vis.length ? (vi + 1) + ' / ' + vis.length : '', gPrev: step(-1), gNext: step(1), gZoom: () => sh.setState({zoom:true}), gCaption: summary || p.name,
    // Sold out: the request goes to the shop; signed-in customers are not asked for their email.
    notifyAsk: !sh.props.signedIn, notifyLede: sh.props.signedIn ? 'We will write to you the day it is back.' : 'Leave your email and we will write the day it is back.',
    notifyEmail: s.notifyEmail || '', onNotifyEmail: (e: any) => sh.setState({notifyEmail: e.target.value, notified:false, notifyErr:''}),
    notifyMe: () => {
      if (s.notified || s.notifying) return;
      const email = (s.notifyEmail || '').trim();
      if (!sh.props.signedIn && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sh.setState({notifyErr: 'Please enter a valid email address.'});
      sh.setState({notifying: true, notifyErr: ''});
      sh.sendNotify(`${p.name} · ${summary}`, sh.props.signedIn ? '' : email).then((err: string) => sh.setState({notifying: false, notifyErr: err, notified: !err}));
    },
    notifyLabel: s.notifying ? 'Sending…' : s.notified ? 'Noted ✓' : 'Notify me', notifyHasErr: !!s.notifyErr, notifyErr: s.notifyErr || '',
    barTf: showBar ? 'translate(-50%, 0)' : 'translate(-50%, 140%)', barOp: showBar ? 1 : 0, barPe: showBar ? 'auto' : 'none',
    barImg: cur.url || '', barBg: cur.url ? 'url("' + cur.url + '")' : 'none', barHasImg: !!cur.url, barTint: cur.tint || '#E2D6C2', barSummary: summary,
    barClose: () => sh.setState({barHidden:true}), barW: mobile ? 'calc(100vw - 20px)' : 'min(980px,calc(100vw - 96px))', barBottom: mobile ? '10px' : '16px', barThumbDisp: 'block', barGap: mobile ? '10px' : '16px', barPad: mobile ? '7px 8px 7px 8px' : '10px 10px 10px 12px', barThumb: mobile ? '40px' : '44px', barNameSize: mobile ? '15px' : '18px', barBtnH: mobile ? '40px' : '46px', barBtnPad: mobile ? '0 16px' : '0 22px', barBtnFont: mobile ? '13px' : '14px', barClose_: mobile ? '30px' : '36px', barPriceDisp: mobile ? 'none' : 'inline', barSub: mobile ? fmt(sh.priceOf(pid, sel) * s.qty) : summary, barLabel: avail ? (s.added ? 'Added ✓' : 'Add to bag') : 'Notify me',
    barAction: avail ? sh.addToBag : () => { const c = sh.ctaRef.current; if (c) window.scrollTo({top: c.getBoundingClientRect().top + scrollY - 140, behavior:'smooth'}); }
  };
}

function productVals(sh: ShellLogic, pid: string){
  const s = sh.state, p = P[pid], sel = sh.defSel(pid, sh.selOf(pid));
  const accDefs = [['Details', p.details], ['Care', p.care], ['Delivery & returns', DELIV]];
  const acc = accDefs.map(([t, b]) => { const open = s.acc === t; return {title:t, body:b, rows: open ? '1fr' : '0fr', rot: open ? 'rotate(45deg)' : 'none', toggle: () => sh.setState((stt: any) => ({acc: stt.acc === t ? '' : t}))}; });
  const recs = (RECS[p.cat] || []).filter((rid: string) => P[rid] && inStore(sh.props.live, rid)).map((rid: string, i: number) => { const ci = CATS.findIndex((c: any) => c.items.some((x: any) => x.pid === rid)); const ii = CATS[ci].items.findIndex((x: any) => x.pid === rid); return {name:P[rid].name, price:'From ' + fmt(fromDeal(sh.props.live, rid).now), deal: dealVals(fromDeal(sh.props.live, rid), fmt), slotId:`col-${CATS[ci].k}-${ii}`, src: SRC[`col-${CATS[ci].k}-${ii}`] || '', ph:`${P[rid].name} · product image`, delay:i * 120, onClick: () => sh.openProduct(rid)}; });
  return {
    pName: p.name, pShort: p.short, pCatName: CATS.find((c: any) => c.k === p.cat).name, goPCat: () => sh.goStory(p.cat),
    pPrice: fmt(sh.priceOf(pid, sel) * s.qty),
    ...pdpVals(sh, pid, p, sel),
    showMono: !!p.opts.find((o: any) => o.n === 'Monogram') && sel.Monogram === 1, monoNote: p.cat === 'towels' ? "Embroidered in our workshop. Monogrammed towels can be returned only if they arrive damaged." : "Embroidered on both pillow covers. Monogrammed pillow covers can be returned only if they arrive damaged.", mono: s.mono || '', onMono: (e: any) => sh.setState({mono: e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3), added:false}), acc, recs, qty: s.qty,
    qtyInc: () => sh.setState((stt: any) => ({qty: Math.min(10, stt.qty + 1), added:false})), qtyDec: () => sh.setState((stt: any) => ({qty: Math.max(1, stt.qty - 1), added:false})),
    g1:`pdp-${pid}-1`, g1src: SRC[`pdp-${pid}-1`] || '', g2:`pdp-${pid}-2`, g3:`pdp-${pid}-3`, g4:`pdp-${pid}-4`, g1ph:`${p.name} · hero product image`,
    addToBag: sh.addToBag, addLabel: s.added ? 'Added to bag ✓' : 'Add to bag', addBg: s.added ? '#55573F' : '#221E18',
    pin: s.pin, onPin: (e: any) => sh.setState({pin: e.target.value.replace(/\D/g, '').slice(0, 6), pinMsg:''}), onPinKey: (e: any) => { if (e.key === 'Enter') sh.checkPin(); }, checkPin: sh.checkPin, pinMsg: s.pinMsg, hasPinMsg: !!s.pinMsg,
  };
}

export default function Product() {
  const {pid} = useLoaderData<typeof loader>();
  const {sh, base} = useShell();
  const sel = sh.defSel(pid, sh.selOf(pid)), product = analyticsProduct(sh.props.live, pid, sel);
  const vals = productVals(sh, pid);
  // The photos the gallery shows for this selection, for the full-screen viewer.
  const photos = sh.state.zoom ? sh.visible(pid, sel).filter((m: any) => m.url) : [];
  const zi = Math.max(0, photos.findIndex((m: any) => m.i === sh.state.gi));
  return <>
    <ProductView vals={{...base, ...vals}} />
    {photos.length ? <Zoom photos={photos} index={zi} caption={vals.gCaption} onIndex={i => sh.setState({gi: photos[i].i})} onClose={() => sh.setState({zoom:false})} /> : null}
    {product ? <Analytics.ProductView data={{products: [product]}} /> : null}
  </>;
}
