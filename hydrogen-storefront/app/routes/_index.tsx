// Home page.
import {useShell, type ShellLogic} from '~/dl/Shell';
import {HomeView} from '~/dl/views/HomeView';
import {P, TT, TOWEL_B, TOWEL_C, fmt} from '~/dl/data/catalog';
import {GOOGLE, REVIEWS, TCS, TOWEL_IMGS} from '~/dl/data/home-data';
import {DESKTOP_MEDIA, HOME_HERO, MOBILE_MEDIA} from '~/dl/preload';
import {catDeal, dealVals, fromDeal} from '~/dl/shop/live';

// The hero is fetched first, only in the size the screen shows.
export const links = () => [
  {rel: 'preload', as: 'image', href: HOME_HERO.mobile, media: MOBILE_MEDIA, fetchpriority: 'high'},
  {rel: 'preload', as: 'image', href: HOME_HERO.desktop, media: DESKTOP_MEDIA, fetchpriority: 'high'},
];

function homeVals(sh: ShellLogic){
  const s = sh.state, live = sh.props.live;
  const tcn = TCS[s.tc].n;
  const tPid = s.tMat ? 'bamboo-towel' : 'cotton-towel';
  const TL = s.tMat ? TOWEL_B : TOWEL_C, tci = Math.min(s.tCol, TL.length - 1);
  const cat = (k: string) => catDeal(live, k), towel = fromDeal(live, tPid);
  const duvet = cat('duvets'), cover = cat('covers'), sheet = cat('sheets'), pillow = cat('pillows');
  return {
    heroBottom: s.mobile ? '30%' : '0', heroMobDisp: s.mobile ? 'block' : 'none', heroDeskDisp: s.mobile ? 'none' : 'block',
    storyDuvets: () => sh.goStory('duvets'), storyCovers: () => sh.goStory('covers'), storySheets: () => sh.goStory('sheets'), storyPillows: () => sh.goStory('pillows'), storyTowels: () => sh.goStory('towels'),
    openDuvet: () => sh.openProduct('winter-duvet'),
    duvetFrom: fmt(duvet.now), coverFrom: fmt(cover.now), sheetFrom: fmt(sheet.now), pillowFrom: fmt(pillow.now),
    duvetDeal: dealVals(duvet, fmt), coverDeal: dealVals(cover, fmt), sheetDeal: dealVals(sheet, fmt), pillowDeal: dealVals(pillow, fmt),
    tcs: TCS.map((t: any, i: number) => ({n:t.n, d:t.d, star: t.soon ? '*' : '', color: i === s.tc ? '#221E18' : '#857A6A', pick: () => sh.setState({tc:i})})),
    tcImgs: TCS.map((t: any, i: number) => ({id:`tc-${t.n}`, src:t.src || '', ph:`${t.n} TC · dark taupe percale · 2400 × 2000`, op: i === s.tc ? 1 : 0, tf: i === s.tc ? 'scale(1)' : 'scale(1.06)'})),
    tcNow: tcn, tcZoom: `${Math.round(110 + 260 * 300 / tcn * (300 / tcn))}%`,
    towelHex: TL[tci].hex, sheen: s.tMat ? 1 : 0, towelColourName: TL[tci].v, towelImgs: TOWEL_IMGS.map((im: any) => { const on = im.mat === s.tMat && (im.col < 0 || im.col === tci); return {...im, op: on ? 1 : 0, tf: on ? 'scale(1)' : 'scale(1.04)'}; }), towelScale: s.tMat ? '160%' : '260%',
    towelCaption: `${TL[tci].v} · ${s.tMat ? 'Bamboo waffle' : 'Cotton terry'} · ${TT[s.tType].v} ${TT[s.tType].d}`,
    towelMats: ['Cotton', 'Bamboo'].map((l, i) => ({label:l, bg: i === s.tMat ? '#F4EFE6' : 'transparent', shadow: i === s.tMat ? '0 1px 3px rgba(34,30,24,.12)' : 'none', outline: i === s.tMat ? '1px dashed rgba(126,82,50,.45)' : '1px dashed rgba(126,82,50,0)', pick: () => sh.setState({tMat:i, tCol:0})})),
    towelTypes: TT.map((t: any, i: number) => ({label:t.v, d:t.d, color: i === s.tType ? '#221E18' : '#857A6A', pick: () => sh.setState({tType:i})})),
    towelColours: TL.map((c: any, i: number) => ({label:c.v, hex:c.hex, ring: i === tci ? '0 0 0 2px #F4EFE6, 0 0 0 3.5px #221E18' : 'inset 0 0 0 1px rgba(34,30,24,.16)', pick: () => sh.setState({tCol:i})})),
    towelPrice: 'From ' + fmt(towel.now), towelDeal: dealVals(towel, fmt),
    reviews: (REVIEWS.length ? REVIEWS : [0,1,2].map(() => ({name:'Customer name', place:'City', product:'Product', stars:5, text:'Paste a Google review here.', ph:true}))).slice(0, 3).map((r: any, i: number) => ({name:r.name, meta:[r.place, r.product].filter(Boolean).join(' · '), stars:'★'.repeat(r.stars || 5), text: r.ph ? r.text : '“' + r.text + '”', textColor: r.ph ? '#9A8F7E' : '#221E18', delay:i * 120})),
    revSummary: GOOGLE.rating ? `${GOOGLE.rating} on Google · ${GOOGLE.count} reviews` : 'Rated on Google', revUrl: GOOGLE.url,
  };
}

export default function Home() {
  const {sh, base} = useShell();
  return <HomeView vals={{...base, ...homeVals(sh)}} />;
}
