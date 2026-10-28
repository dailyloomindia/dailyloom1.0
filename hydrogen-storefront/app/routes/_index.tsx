// Home page.
import {firstPhoto, useShell, type ShellLogic} from '~/dl/Shell';
import {HomeView} from '~/dl/views/HomeView';
import {P, TT, TOWEL_B, TOWEL_C, fmt} from '~/dl/data/catalog';
import {TCS, TOWEL_IMGS} from '~/dl/data/home-data';
import {DESKTOP_MEDIA, HOME_HERO, MOBILE_MEDIA} from '~/dl/preload';
import {catDeal, dealVals, fromDeal, inStore} from '~/dl/shop/live';
import {ORGANIZATION, WEBSITE, seo} from '~/dl/seo/meta';
import {HOME_SEO} from '~/dl/seo/keywords';

export const meta = () => seo({fullTitle: HOME_SEO.title, description: HOME_SEO.description, image: HOME_HERO.desktop, ld: [ORGANIZATION, WEBSITE]});

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
  // Bamboo comes as a bath towel only; its photo is the chosen colour's first photo from Shopify.
  const bambooPhoto = s.tMat ? firstPhoto(live, 'bamboo-towel', {Type: 0, Colour: tci}) : '';
  const TTm = s.tMat ? TT.filter((t: any) => t.v === 'Bath') : TT, tti = s.tMat ? 0 : s.tType;
  const cat = (k: string) => catDeal(live, k), towel = fromDeal(live, tPid);
  const duvet = cat('duvets'), cover = cat('covers'), sheet = cat('sheets'), pillow = cat('pillows');
  // Cotton face and hand towels are sold as a pair.
  const pairD = (t: any) => !s.tMat && t.v !== 'Bath' ? 'Pair · ' + t.d : t.d;
  return {
    heroBottom: s.mobile ? '30%' : '0', heroMobDisp: s.mobile ? 'block' : 'none', heroDeskDisp: s.mobile ? 'none' : 'block',
    storyDuvets: () => sh.goStory('duvets'), storyCovers: () => sh.goStory('covers'), storySheets: () => sh.goStory('sheets'), storyPillows: () => sh.goStory('pillows'), storyTowels: () => sh.goStory('towels'),
    openDuvet: () => sh.openProduct('winter-duvet'),
    nfSummer: sh.notifyFor('Summer Comforter', 'the Summer Comforter arrives'),
    nfTc: sh.notifyFor('Duvet covers and bedsheets in 400, 600 and 800 TC', 'our 400, 600 and 800 TC covers and sheets arrive'),
    duvetFrom: fmt(duvet.now), coverFrom: fmt(cover.now), sheetFrom: fmt(sheet.now), pillowFrom: fmt(pillow.now),
    duvetDeal: dealVals(duvet, fmt), coverDeal: dealVals(cover, fmt), sheetDeal: dealVals(sheet, fmt), pillowDeal: dealVals(pillow, fmt),
    tcs: TCS.map((t: any, i: number) => ({n:t.n, d:t.d, star: t.soon ? '*' : '', color: i === s.tc ? '#221E18' : '#857A6A', pick: () => sh.setState({tc:i})})),
    tcImgs: TCS.map((t: any, i: number) => ({id:`tc-${t.n}`, src:t.src || '', ph:`${t.n} TC · dark taupe percale · 2400 × 2000`, op: i === s.tc ? 1 : 0, tf: i === s.tc ? 'scale(1)' : 'scale(1.06)'})),
    tcNow: tcn, tcZoom: `${Math.round(110 + 260 * 300 / tcn * (300 / tcn))}%`,
    towelHex: TL[tci].hex, sheen: s.tMat ? 1 : 0, towelColourName: TL[tci].v, towelImgs: TOWEL_IMGS.map((im: any) => { const on = im.mat === s.tMat && (im.col < 0 || im.col === tci); return {...im, ...(im.mat && bambooPhoto ? {src: bambooPhoto} : {}), op: on ? 1 : 0, tf: on ? 'scale(1)' : 'scale(1.04)'}; }), towelScale: s.tMat ? '160%' : '260%',
    towelCaption: `${TL[tci].v} · ${s.tMat ? 'Bamboo terry' : 'Cotton terry'} · ${TTm[tti].v} ${pairD(TTm[tti])}`,
    towelMats: ['Cotton', 'Bamboo'].map((l, i) => ({label:l, bg: i === s.tMat ? '#F4EFE6' : 'transparent', shadow: i === s.tMat ? '0 1px 3px rgba(34,30,24,.12)' : 'none', outline: i === s.tMat ? '1px dashed rgba(126,82,50,.45)' : '1px dashed rgba(126,82,50,0)', pick: () => sh.setState({tMat:i, tCol:0})})),
    towelTypes: TTm.map((t: any, i: number) => ({label:t.v, d:pairD(t), color: i === tti ? '#221E18' : '#857A6A', pick: () => { if (!s.tMat) sh.setState({tType:i}); }})),
    towelColours: TL.map((c: any, i: number) => ({label:c.v, hex:c.hex, ring: i === tci ? '0 0 0 2px #F4EFE6, 0 0 0 3.5px #221E18' : 'inset 0 0 0 1px rgba(34,30,24,.16)', pick: () => sh.setState({tCol:i})})),
    // A towel material the store does not sell yet shows as coming soon, with Notify me.
    ...(inStore(live, tPid)
      ? {towelPrice: 'From ' + fmt(towel.now), towelDeal: dealVals(towel, fmt), towelSoon: false, nfTowel: {label: '', go: () => {}}}
      : {towelPrice: 'Coming soon', towelDeal: {has: false}, towelSoon: true, nfTowel: sh.notifyFor(`${P[tPid].name}s`, `our ${P[tPid].name.toLowerCase()}s arrive`)}),
  };
}

export default function Home() {
  const {sh, base} = useShell();
  return <HomeView vals={{...base, ...homeVals(sh)}} />;
}
