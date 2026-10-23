// Collection story page: /collections/<handle>
import {useLoaderData} from '@remix-run/react';
import {json, type HeadersFunction, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useShell, type ShellLogic} from '~/dl/Shell';
import {StoryView} from '~/dl/views/StoryView';
import {CATS, P, RECS, SRC, fmt} from '~/dl/data/catalog';
import {STORY} from '~/dl/data/story.server';
import {CAT_BY_HANDLE} from '~/dl/routing';
import {preloadHeader, storyHero} from '~/dl/preload';
import {fromPrice} from '~/dl/shop/live';

export async function loader({params}: LoaderFunctionArgs) {
  const k = CAT_BY_HANDLE[params.handle || ''];
  if (!k) throw new Response('Not found', {status: 404});
  return json({k, st: STORY[k]}, {headers: {Link: preloadHeader([storyHero(k)])}});
}

export const headers: HeadersFunction = ({loaderHeaders}) => loaderHeaders;

function storyVals(sh: ShellLogic, k: string, st: any){
  const s = sh.state;
  const cat = CATS.find((c: any) => c.k === k) || CATS[0];
  const cur = st.closer.points[s.cl] || st.closer.points[0];
  const stItems = cat.items.map((it: any, i: number) => {
    const pp = it.pid && P[it.pid];
    return {badge: it.badge || '', hasBadge: !!it.badge, soon:!!it.soon, notSoon:!it.soon, title: it.soon ? it.name : pp.name, label: it.soon ? (it.soonLabel || 'A lighter weight for warmer nights') : (it.label || pp.short), price: it.soon ? '' : ((it.sel && it.sel.Type != null && P[it.pid].opts[0].n === 'Type') ? P[it.pid].opts[0].vals[it.sel.Type].v + ' towel · ' : (P[it.pid].opts.every((o: any) => o.vals.length === 1) ? '' : 'From ')) + fmt(it.sel && it.sel.Type != null ? sh.priceOf(it.pid, sh.defSel(it.pid, it.sel)) : fromPrice(sh.props.live, it.pid)), delay: i * 120, slotId:`col-${cat.k}-${i}`, src: SRC[`col-${cat.k}-${i}`] || '', ph:`${it.soon ? it.name : pp.name}${it.label ? ' · ' + it.label.split(' · ')[0] : ''} · product image`, buy: it.soon ? null : () => sh.openProduct(it.pid, it.sel), ...(() => { const so = !it.soon && pp.opts.find((o: any) => o.n === 'Size'); return so && so.vals.length > 1 ? {hasSizes:true, sizes: so.vals.map((v: any) => `${v.v} ${fmt(sh.priceOf(it.pid, {...sh.defSel(it.pid, it.sel), Size: so.vals.indexOf(v)}))}`).join('  ·  ')} : {hasSizes:false, sizes:''}; })()};
  });
  return {
    stTitle: cat.name, stHandle: cat.k, stTagline: st.tagline, stIntro: st.intro, stIntroAccent: st.accent, stHeroSlot:`story-${cat.k}-hero`, stHeroSrc: SRC[`story-${cat.k}-hero`] || '', stHeroPh:`${cat.name} · full-bleed story hero`,
    stLinks: [['Overview','st-overview'],['Why Daily Loom','st-why'],['Closer look','st-closer'],['Compare','st-compare']].map(([label, id]) => ({label, go: () => sh.scrollToId(id)})),
    stBuyScroll: () => sh.scrollToId('st-buy'),
    stFrom: (() => { const typed = cat.items.filter((x: any) => !x.soon && x.sel && x.sel.Type != null); if (typed.length) return 'Bath towels from ' + fmt(Math.min(...typed.map((x: any) => sh.priceOf(x.pid, sh.defSel(x.pid, x.sel))))); const live = cat.items.filter((x: any) => !x.soon); const ps = live.map((x: any) => fromPrice(sh.props.live, x.pid)); const single = live.length === 1 && P[live[0].pid].opts.every((o: any) => o.vals.length === 1); return ps.length ? (single ? '' : 'From ') + fmt(Math.min(...ps)) : ''; })(),
    hasLayers: !!st.layers, layersTitle: st.layers ? st.layers.title : '', layersLede: st.layers ? st.layers.lede : '',
    layerOpts: (st.layers ? st.layers.opts : []).map((l: any, i: number) => ({...l, delay: i * 140, isBuy: l.action === 'buy', isRequest: l.action === 'request', tagColor: l.action === 'buy' ? '#55573F' : '#7E5232', buy: () => sh.openProduct(cat.items[0].pid, cat.items[0].sel), href: 'mailto:contact@dailyloom.in?subject=' + encodeURIComponent('Special order: three-layer Winter Duvet')})),
    ...(() => { const rid = (RECS[cat.k] || [])[0]; if (!rid || !P[rid]) return {hasPair:false}; const ci = CATS.findIndex((c: any) => c.items.some((x: any) => x.pid === rid)); const ii = CATS[ci].items.findIndex((x: any) => x.pid === rid); const slot = `col-${CATS[ci].k}-${ii}`; return {hasPair:true, pairName:P[rid].name, pairShort:P[rid].pairShort || P[rid].short, pairPrice:'From ' + fmt(fromPrice(sh.props.live, rid)), pairSlot:slot, pairSrc:SRC[slot] || '', pairOpen:() => sh.openProduct(rid)}; })(),
    stWhy: st.why.map((w: any, i: number) => ({...w, hasB: !!w.b, hasCmp: !!w.cmp, cmpCols: w.cmp ? w.cmp.cols.map((c: any) => ({...c, hasBadge: !!c.badge, hasImg: !!c.img, imgBg: c.img ? `url(${c.img})` : 'none'})) : [], cmpRows: w.cmp ? w.cmp.rows.map((r: any) => ({k:r[0], a:r[1], b:r[2]})) : [], dir: i % 2 ? 'row-reverse' : 'row', slot: w.key || `story-${cat.k}-why-${i}`, src: SRC[w.key || `story-${cat.k}-why-${i}`] || '', ph:`${cat.name} · ${w.tag.toLowerCase()}`})),
    stCloserTitle: st.closer.title, stCloserLede: st.closer.lede, stCloserBase: st.closer.base, stCloserScale: `${Math.round(90 + cur.z * 40)}%`, stCloserPos: ['30% 40%','62% 58%','80% 30%'][s.cl] || '50% 50%', stCloserLabel: cur.label, stCloserSrc: cur.src || sh.lastCloserSrc || '', hasCloserSrc: !!(cur.src || sh.lastCloserSrc), stCloserBg: (cur.src || sh.lastCloserSrc) ? `url(${cur.src || sh.lastCloserSrc})` : 'none', stCloserImgOp: cur.src ? 1 : 0, stCloserImgZ: cur.src ? 'scale(1)' : 'scale(1.06)', stCloserShadeOp: cur.src ? 0 : 1, ...(cur.src ? (sh.lastCloserSrc = cur.src, {}) : {}),
    stPoints: st.closer.points.map((pt: any, i: number) => ({t:pt.t, b:pt.b, color: i === s.cl ? '#F4EFE6' : '#8E8576', pick: () => sh.setState({cl:i})})),
    stCompare: st.compare.map((r: any) => ({k:r[0], a:r[1], b:r[2], note:r[3] || '', hasNote: !!r[3]})), isStandard: !!st.standard, notStandard: !st.standard, hasCloser: !st.noCloser, stCare: st.care,
    ritKey: st.ritual && st.ritual.key ? st.ritual.key.map((x: any) => ({t:x[0], b:x[1]})) : [], hasRitKey: !!(st.ritual && st.ritual.key), ritRows: s.ritOpen ? '1fr' : '0fr', ritToggleLabel: s.ritOpen ? 'Hide the full care guide' : 'Read the full care guide', ritToggle: () => sh.setState((x: any) => ({ritOpen: !x.ritOpen})), hasCareText: !!st.care, hasRitual: !!st.ritual, ritTitle: st.ritual ? st.ritual.title : '', ritLede: st.ritual ? st.ritual.lede : '', ritNote: st.ritual ? st.ritual.note : '', ritGroups: st.ritual ? st.ritual.groups.map((g: any) => ({t:g.t, items:g.items.map((x: any) => ({t:x[0], b:x[1]}))})) : [], stBuyLede: st.buyLede, stItems,
  };
}

export default function Story() {
  const {k, st} = useLoaderData<typeof loader>();
  const {sh, base} = useShell();
  return <StoryView vals={{...base, ...storyVals(sh, k, st)}} />;
}
