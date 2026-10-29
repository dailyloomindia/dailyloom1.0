// Collection story page: /collections/<handle>
import {useLoaderData} from '@remix-run/react';
import {Analytics} from '@shopify/hydrogen';
import {json, redirect, type HeadersFunction, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useShell, type ShellLogic} from '~/dl/Shell';
import {StoryView} from '~/dl/views/StoryView';
import {CATS, P, RECS, SRC, fmt} from '~/dl/data/catalog';
import {STORY} from '~/dl/data/story.server';
import {CAT_BY_HANDLE} from '~/dl/routing';
import {DESKTOP_MEDIA, MOBILE_MEDIA, preloadHeader, storyHero, storyHeroMobile} from '~/dl/preload';
import {choices, dealOf, dealVals, fromDeal, inStore, minDeal} from '~/dl/shop/live';
import {breadcrumbs, seo} from '~/dl/seo/meta';
import {CAT_SEO} from '~/dl/seo/keywords';

const COLLECTION_QUERY = `#graphql
  query DlCollection($handle: String!) { collection(handle: $handle) { id handle title } }`;

export async function loader({params, context}: LoaderFunctionArgs) {
  const k = CAT_BY_HANDLE[params.handle || ''];
  // The earlier theme's all-products page.
  if (params.handle === 'all') throw redirect('/', 301);
  if (!k) throw new Response('Not found', {status: 404});
  // The Shopify collection, for Shopify analytics' collection views.
  const {collection} = await (context as any).storefront.query(COLLECTION_QUERY, {variables: {handle: params.handle}, cache: (context as any).storefront.CacheLong()}).catch(() => ({collection: null}));
  return json({k, st: STORY[k], collection}, {headers: {Link: preloadHeader([[storyHeroMobile(k), MOBILE_MEDIA], [storyHero(k), DESKTOP_MEDIA]])}});
}

export const meta = ({data, params}: any) => {
  if (!data) return [];
  const name = (CATS.find((c: any) => c.k === data.k) || {}).name, path = '/collections/' + params.handle, kw = CAT_SEO[data.k];
  return seo({title: kw ? kw.title : name, description: kw ? kw.description : [data.st.tagline, data.st.intro, data.st.accent].filter(Boolean).join(' '), image: storyHero(data.k), path, ld: [breadcrumbs([[name, path]])]});
};

export const headers: HeadersFunction = ({loaderHeaders}) => loaderHeaders;

function storyVals(sh: ShellLogic, k: string, st: any){
  const s = sh.state;
  const cat = CATS.find((c: any) => c.k === k) || CATS[0];
  const cur = st.closer.points[s.cl] || st.closer.points[0];
  const live = sh.props.live;
  // Products the store does not sell yet (not in Shopify, or not published to the Hydrogen channel) show as coming soon.
  const isSoon = (it: any) => !!it.soon || !inStore(live, it.pid);
  const stItems = cat.items.map((it: any, i: number) => {
    const pp = it.pid && P[it.pid], soon = isSoon(it), name = it.soon ? it.name : pp.name;
    // More than one colour: swatches under the card; a pick shows that colour's photo and opens the buy page in it.
    const co = !soon && pp.opts.find((o: any) => o.swatch), picked = !!co && (s.stCol || {})[it.pid] != null, ci = picked ? s.stCol[it.pid] : 0;
    const cp = picked && (sh.visible(it.pid, {...sh.defSel(it.pid, it.sel), Colour: ci}).find((m: any) => m.url && (m.tags.includes(co.vals[ci].v) || m.prefer.includes(co.vals[ci].v))) || {}).url;
    const cols = co && co.vals.length > 1 ? {hasCols:true, colName: co.vals[ci].v, cols: co.vals.map((c: any, j: number) => ({label:c.v, hex:c.hex, ring: j === ci ? '0 0 0 2px #F4EFE6, 0 0 0 3.5px #221E18' : 'inset 0 0 0 1px rgba(34,30,24,.16)', pick: () => sh.setState((x: any) => ({stCol: {...x.stCol, [it.pid]: j}}))}))} : {hasCols:false, colName:'', cols:[]};
    const d = soon ? null : it.sel && it.sel.Type != null ? dealOf(live, it.pid, sh.defSel(it.pid, it.sel)) : fromDeal(live, it.pid);
    return {badge: soon ? '' : it.badge || '', hasBadge: !soon && !!it.badge, soon, notSoon:!soon, title: name, label: it.soon ? (it.soonLabel || 'A lighter weight for warmer nights') : (it.label || pp.short), price: soon ? '' : ((it.sel && it.sel.Type != null && P[it.pid].opts[0].n === 'Type') ? P[it.pid].opts[0].vals[it.sel.Type].v + ' towel · ' : (P[it.pid].opts.every((o: any) => choices(o) <= 1) ? '' : 'From ')) + fmt(d!.now), deal: d ? dealVals(d, fmt) : {has:false}, delay: i * 120, nf: soon ? sh.notifyFor(name, `the ${name} arrives`) : null, slotId:`col-${cat.k}-${i}`, src: cp || SRC[`col-${cat.k}-${i}`] || '', ph:`${name}${it.label ? ' · ' + it.label.split(' · ')[0] : ''} · product image`, buy: soon ? null : () => sh.openProduct(it.pid, picked ? {...it.sel, Colour: ci} : it.sel), ...cols, ...(() => { const so = !soon && pp.opts.find((o: any) => o.n === 'Size'); return so && so.vals.length > 1 ? {hasSizes:true, sizes: so.vals.map((v: any) => `${v.v} ${fmt(sh.priceOf(it.pid, {...sh.defSel(it.pid, it.sel), Size: so.vals.indexOf(v)}))}`).join('  ·  ')} : {hasSizes:false, sizes:''}; })()};
  });
  return {
    stTitle: cat.name, stHandle: cat.k, stTagline: st.tagline, stIntro: st.intro, stIntroAccent: st.accent, stHeroSlot:`story-${cat.k}-hero`, stHeroSrc: s.mobile ? storyHeroMobile(cat.k) : storyHero(cat.k), stHeroPh:`${cat.name} · full-bleed story hero`,
    stLinks: [['Overview','st-overview'],['Why Daily Loom','st-why'],['Closer look','st-closer'],['Compare','st-compare']].map(([label, id]) => ({label, go: () => sh.scrollToId(id)})),
    stBuyScroll: () => sh.scrollToId('st-buy'),
    ...(() => { const typed = cat.items.filter((x: any) => !isSoon(x) && x.sel && x.sel.Type != null); if (typed.length) { const d = minDeal(typed.map((x: any) => dealOf(sh.props.live, x.pid, sh.defSel(x.pid, x.sel)))); return {stFrom: 'Bath towels from ' + fmt(d.now), stDeal: dealVals(d, fmt)}; } const sold = cat.items.filter((x: any) => !isSoon(x)); if (!sold.length) return {stFrom: '', stDeal: {has:false}}; const d = minDeal(sold.map((x: any) => fromDeal(live, x.pid))); const single = sold.length === 1 && P[sold[0].pid].opts.every((o: any) => choices(o) <= 1); return {stFrom: (single ? '' : 'From ') + fmt(d.now), stDeal: dealVals(d, fmt)}; })(),
    hasLayers: !!st.layers, layersTitle: st.layers ? st.layers.title : '', layersLede: st.layers ? st.layers.lede : '',
    layerOpts: (st.layers ? st.layers.opts : []).map((l: any, i: number) => ({...l, delay: i * 140, isBuy: l.action === 'buy', isRequest: l.action === 'request', tagColor: l.action === 'buy' ? '#55573F' : '#7E5232', buy: () => sh.openProduct(cat.items[0].pid, cat.items[0].sel), href: 'mailto:contact@dailyloom.in?subject=' + encodeURIComponent('Special order: three-layer Winter Duvet')})),
    ...(() => { const rid = (RECS[cat.k] || []).find((r: string) => P[r] && inStore(live, r)); if (!rid) return {hasPair:false}; const ci = CATS.findIndex((c: any) => c.items.some((x: any) => x.pid === rid)); const ii = CATS[ci].items.findIndex((x: any) => x.pid === rid); const slot = `col-${CATS[ci].k}-${ii}`; return {hasPair:true, pairName:P[rid].name, pairShort:P[rid].pairShort || P[rid].short, pairPrice:'From ' + fmt(fromDeal(sh.props.live, rid).now), pairDeal: dealVals(fromDeal(sh.props.live, rid), fmt), pairSlot:slot, pairSrc:SRC[slot] || '', pairOpen:() => sh.openProduct(rid)}; })(),
    stWhy: st.why.map((w: any, i: number) => ({...w, hasB: !!w.b, hasCmp: !!w.cmp, cmpCols: w.cmp ? w.cmp.cols.map((c: any) => ({...c, hasBadge: !!c.badge, hasImg: !!c.img, imgBg: c.img ? `url(${c.img})` : 'none'})) : [], cmpRows: w.cmp ? w.cmp.rows.map((r: any) => ({k:r[0], a:r[1], b:r[2]})) : [], dir: i % 2 ? 'row-reverse' : 'row', slot: w.key || `story-${cat.k}-why-${i}`, src: SRC[w.key || `story-${cat.k}-why-${i}`] || '', ph:`${cat.name} · ${w.tag.toLowerCase()}`})),
    stCloserTitle: st.closer.title, stCloserLede: st.closer.lede, stCloserBase: st.closer.base, stCloserScale: `${Math.round(90 + cur.z * 40)}%`, stCloserPos: ['30% 40%','62% 58%','80% 30%'][s.cl] || '50% 50%', stCloserLabel: cur.label, stCloserSrc: cur.src || sh.lastCloserSrc || '', hasCloserSrc: !!(cur.src || sh.lastCloserSrc), stCloserBg: (cur.src || sh.lastCloserSrc) ? `url(${cur.src || sh.lastCloserSrc})` : 'none', stCloserImgOp: cur.src ? 1 : 0, stCloserImgZ: cur.src ? 'scale(1)' : 'scale(1.06)', stCloserShadeOp: cur.src ? 0 : 1, ...(cur.src ? (sh.lastCloserSrc = cur.src, {}) : {}),
    stPoints: st.closer.points.map((pt: any, i: number) => ({t:pt.t, b:pt.b, color: i === s.cl ? '#F4EFE6' : '#8E8576', pick: () => sh.setState({cl:i})})),
    stCompare: st.compare.map((r: any) => ({k:r[0], a:r[1], b:r[2], note:r[3] || '', hasNote: !!r[3]})), isStandard: !!st.standard, notStandard: !st.standard, hasCloser: !st.noCloser, stCare: st.care,
    ritKey: st.ritual && st.ritual.key ? st.ritual.key.map((x: any) => ({t:x[0], b:x[1]})) : [], hasRitKey: !!(st.ritual && st.ritual.key), ritRows: s.ritOpen ? '1fr' : '0fr', ritToggleLabel: s.ritOpen ? 'Hide the full care guide' : 'Read the full care guide', ritToggle: () => sh.setState((x: any) => ({ritOpen: !x.ritOpen})), hasCareText: !!st.care, hasRitual: !!st.ritual, ritTitle: st.ritual ? st.ritual.title : '', ritLede: st.ritual ? st.ritual.lede : '', ritNote: st.ritual ? st.ritual.note : '', ritGroups: st.ritual ? st.ritual.groups.map((g: any) => ({t:g.t, items:g.items.map((x: any) => ({t:x[0], b:x[1]}))})) : [], stBuyLede: st.buyLede, stItems,
  };
}

export default function Story() {
  const {k, st, collection} = useLoaderData<typeof loader>();
  const {sh, base} = useShell();
  return <>
    <StoryView vals={{...base, ...storyVals(sh, k, st)}} />
    {collection ? <Analytics.CollectionView data={{collection: {id: collection.id, handle: collection.handle}}} /> : null}
  </>;
}
