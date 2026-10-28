// The persistent part of the storefront: header, mobile menu, footer, bag,
// fabric scrollbar and page curtain, plus the design's state and behaviour.
// Ported from the `Component` logic class in "Daily Loom v4.dc.html"; the
// differences are that the current view, collection and product come from
// the URL, and moving between views navigates to that view's route.
import {Component, createContext, createRef, useContext, type ReactNode} from 'react';
import {useLocation, useNavigate, useRouteLoaderData} from '@remix-run/react';
import {Analytics} from '@shopify/hydrogen';
import {CATS, P, SHOP_MEDIA, IMG, fmt} from './data/catalog';
import {availableOf, combos, mediaOf, priceOf, type Live} from './shop/live';
import type {Bag, BagLine} from './shop/cart.server';
import {parseRoute, urlFor, type Route, type View} from './routing';
import {HOME_HERO, storyHero, storyHeroMobile, warm} from './preload';
import {ShellView} from './views/ShellView';

/** The design's tweak values, as the v4 file was finalised. */
/** An option value as the bag, captions and orders name it: a value sold as a pair says so ("Face pair"). */
export const valLabel = (v: any) => /^Pair\b/.test(v.d || '') ? v.v + ' pair' : v.v;

export const PROPS: {
  motion: 'refined' | 'reduced';
  scrollbar: 'fabric' | 'native';
  photoBlend: 'dissolve' | 'dissolve + multiply' | 'framed';
  devNotes: boolean;
  pdpPreview: 'ready' | 'loading' | 'sold out';
} = {motion: 'refined', scrollbar: 'fabric', photoBlend: 'dissolve', devNotes: false, pdpPreview: 'ready'};

const EASE = 'cubic-bezier(.76,0,.24,1)';
const UP = 'translateY(calc(-100% - 48px))', DOWN = 'translateY(calc(100% + 48px))';
/** Where Notify me requests are emailed: contact@dailyloom.in, through formsubmit.co's private alias (the address itself stays out of the page). */
const NOTIFY_FORM = 'https://formsubmit.co/ajax/adcee9d3c4a7b990ec98a36757ccf8d5';
const RESET = {zoom:false, nf:null, notifyErr:'', barHidden:false, menuOpen:false, gi:null, notified:false, qty:1, added:false, pinMsg:'', acc:'Details', cl:0, mono:'', ritOpen:false, bagOpen:false};

/** The option preset a collection card opens a product with. */
const presetFor = (pid: string) => (CATS.flatMap((c: any) => c.items).find((x: any) => x.pid === pid) || {}).sel;

type ShellProps = {route: Route; locKey: string; navigate: (to: string) => void; live: Live | null; bag: Bag | null; signedIn?: boolean; onCart?: (cart: any) => void; children: ReactNode};
type Ctx = {sh: ShellLogic; base: any};
const ShellContext = createContext<Ctx | null>(null);

/** Shell state, methods and the shared template values, for route views. */
export function useShell(): Ctx {
  const c = useContext(ShellContext);
  if (!c) throw new Error('useShell outside <Shell>');
  return c;
}

export function Shell({view, onCart, children}: {view?: View; onCart?: (cart: any) => void; children: ReactNode}) {
  const location = useLocation();
  const navigate = useNavigate();
  const route = view ? {view} : parseRoute(location.pathname, location.search);
  const data = useRouteLoaderData('root') as {live: Live | null; bag: Bag | null; signedIn?: boolean} | undefined;
  return <ShellLogic route={route} locKey={location.key} navigate={navigate} live={data ? data.live : null} bag={data ? data.bag : null} signedIn={!!(data && data.signedIn)} onCart={onCart}>{children}</ShellLogic>;
}

export class ShellLogic extends Component<ShellProps, any> {
  [k: string]: any;
  constructor(p: ShellProps){
    super(p);
    // Browser-kept state (account, last category) is restored in componentDidMount,
    // so the server render and the first client render are identical.
    this.state = {cat: p.route.cat || 'duvets', pid: p.route.pid || 'winter-duvet', sel:{}, selPid:null, qty:1, bag:bagItems(p.bag), checkoutUrl:(p.bag && p.bag.checkoutUrl) || '', bagOpen:false, tc:0, tMat:0, tType:2, tCol:0, cl:0, pin:'', pinMsg:'', added:false, acc:'Details', checkingOut:false, acct:{}, acForm:{}, acErr:'', retOpen:false};
    ['ctaRef','rootRef','navRef','curtainRef','trackRef','clothRef','rollRef','tagRef','bagBtnRef'].forEach(k => this[k] = createRef());
  }
  view(){ return this.props.route.view; }
  cat(){ return this.props.route.cat || this.state.cat; }
  pid(){ return this.props.route.pid || this.state.pid; }
  selOf(pid: string, st = this.state){ return st.selPid === pid ? st.sel : presetFor(pid); }
  componentDidMount(){
    let s: any = {}, acct: any = {};
    try { s = JSON.parse(localStorage.getItem('dl2-nav') || '{}'); } catch(e) {}
    try { acct = JSON.parse(localStorage.getItem('dl2-acct') || '{}'); } catch(e) {}
    this.setState({acct, ...(!this.props.route.cat && CATS.some((c: any) => c.k === s.cat) ? {cat: s.cat} : {})});
    this.onResize = () => { const m = innerWidth < 768; if (m !== this.state.mobile) { this.setState({mobile:m}); this.applySb(); } };
    window.addEventListener('resize', this.onResize); this.onResize();
    window.addEventListener('scroll', this.onScrolled, {passive:true});
    window.addEventListener('mousemove', this.onMouse, {passive:true});
    window.addEventListener('resize', this.onScroll);
    this.applySb(); this.observe(); this.onScroll(); this.snap();
    // The server-rendered page starts behind the curtain (see root.tsx); hand it to the animation.
    document.getElementById('dl-boot')?.remove();
    const c = this.curtainRef.current;
    if (c && c.animate && PROPS.motion !== 'reduced' && document.visibilityState === 'visible') {
      c.animate([{transform:'translateY(0)'},{transform:DOWN}], {duration:1000, delay:450, easing:EASE, fill:'backwards'});
    }
  }
  componentWillUnmount(){ window.removeEventListener('scroll', this.onScrolled); window.removeEventListener('mousemove', this.onMouse); window.removeEventListener('resize', this.onScroll); window.removeEventListener('resize', this.onResize); this.io && this.io.disconnect(); }
  snap(){ const {bag} = this.state; this._prev = {view:this.view(), cat:this.cat(), pid:this.pid(), key:this.props.locKey, bag, sb:PROPS.scrollbar}; }
  componentDidUpdate(){
    const ps = this._prev || {}, s = this.state;
    if (ps.sb !== PROPS.scrollbar) this.applySb();
    if (ps.key !== this.props.locKey) this.onLocation();
    if (ps.view !== this.view() || ps.cat !== this.cat() || ps.pid !== this.pid()) { this.observe(); this.onScroll(); }
    if (this.view() === 'help' && this.helpJump) { const id = this.helpJump; this.helpJump = null; setTimeout(() => this.scrollToId(id), 60); }
    this.snap();
  }
  /** A new URL has rendered. */
  onLocation(){
    const r = this.props.route;
    if (r.cat && (r.cat !== this.state.cat || (r.pid && r.pid !== this.state.pid))) this.setState({cat:r.cat, ...(r.pid ? {pid:r.pid} : {})});
    try { localStorage.setItem('dl2-nav', JSON.stringify({view:r.view, cat:this.cat(), pid:this.pid()})); } catch(e) {}
    if (this.navPending) {
      this.navPending = false;
      window.scrollTo(0, 0);
      const f = this.afterNav; this.afterNav = null; f && f();
    } else {
      // Browser back / forward: same resets as an in-page move, without the curtain.
      this.setState({acScreen:undefined, acErr:'', retOpen:false, ...RESET});
    }
  }
  applySb(){
    let el = document.getElementById('dl-sb');
    if (!el) { el = document.createElement('style'); el.id = 'dl-sb'; document.head.appendChild(el); }
    el.textContent = (PROPS.scrollbar ?? 'fabric') === 'fabric' && innerWidth >= 768 ? 'html{scrollbar-width:none}html::-webkit-scrollbar{display:none}' : '';
  }
  observe(){
    const root = this.rootRef.current; if (!root) return;
    this.folds = [];
    if (!this.io) this.io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'none'; this.io.unobserve(e.target); } }), {threshold:.1, rootMargin:'0px 0px -5% 0px'});
    const still = PROPS.motion === 'reduced';
    root.querySelectorAll('[data-reveal]:not([data-rv])').forEach((el: HTMLElement) => {
      el.setAttribute('data-rv', '1'); if (still) return;
      if (document.visibilityState !== 'visible') return;
      const d = +(el.getAttribute('data-reveal') || 0);
      el.style.opacity = '0'; el.style.transform = 'translateY(32px)';
      el.style.transition = `opacity 1.2s cubic-bezier(.2,.7,.2,1) ${d}ms, transform 1.2s cubic-bezier(.2,.7,.2,1) ${d}ms`;
      this.io.observe(el);
    });
    clearTimeout(this.revealT);
    this.revealT = setTimeout(() => root.querySelectorAll('[data-rv]').forEach((el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      if (el.style.opacity === '0' && r.top < innerHeight && r.bottom > 0) { el.style.opacity = '1'; el.style.transform = 'none'; }
    }), 2000);
  }
  /** The fabric scrollbar shows while the page moves (or the pointer is at the right edge, or it is held) and fades once it stops. */
  showSb(){
    const tr = this.trackRef.current; if (!tr) return;
    tr.style.opacity = '1';
    clearTimeout(this.sbT); this.sbT = setTimeout(() => { if (!this.sbHeld && !this.sbNear) tr.style.opacity = '0'; }, 1000);
  }
  onScrolled = () => { this.showSb(); this.onScroll(); };
  onMouse = (e: MouseEvent) => { const near = e.clientX > innerWidth - 60; if (near !== !!this.sbNear) { this.sbNear = near; this.showSb(); } };
  onScroll = () => {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      const ce = this.ctaRef && this.ctaRef.current;
      const out = this.view() === 'product' && !!ce && ce.getBoundingClientRect().bottom < 60;
      const stacked = innerWidth < 980;
      if (out !== !!this.state.ctaOut || stacked !== !!this.state.stacked) this.setState({ctaOut: out, stacked});
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const tr = this.trackRef.current, cl = this.clothRef.current, rl = this.rollRef.current, tg = this.tagRef.current;
      if (tr && cl && rl) {
        const dia = 24 - 12 * p;
        const L = p * (tr.clientHeight - 8 - dia);
        cl.style.height = L + dia / 2 + 'px';
        rl.style.top = (8 + L) + 'px';
        rl.style.height = dia + 'px';
        rl.style.backgroundPosition = `0 0, 0 ${-scrollY * .3}px`;
        if (tg) {
          tg.textContent = Math.round(p * 100) + '% unrolled';
          tg.style.top = (8 + L + dia / 2 - 12) + 'px';
          tg.style.opacity = '1';
          clearTimeout(this.tagT); this.tagT = setTimeout(() => { tg.style.opacity = '0'; }, 900);
        }
      }
      if (this.folds && PROPS.motion !== 'reduced') this.folds.forEach((f: HTMLElement) => {
        const r = f.parentElement!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        f.style.transform = `translate3d(0, ${(-k * 70).toFixed(1)}px, 0)`;
      });
    });
  };
  onTrackDown = (e: any) => {
    const tr = this.trackRef.current; if (!tr) return;
    tr.setPointerCapture && tr.setPointerCapture(e.pointerId); tr.style.cursor = 'grabbing'; this.sbHeld = true; this.showSb();
    const move = (ev: any) => { const r = tr.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height)); window.scrollTo(0, p * (document.documentElement.scrollHeight - innerHeight)); };
    const up = () => { tr.style.cursor = 'grab'; this.sbHeld = false; this.showSb(); tr.removeEventListener('pointermove', move); tr.removeEventListener('pointerup', up); };
    move(e); tr.addEventListener('pointermove', move); tr.addEventListener('pointerup', up);
  };
  /** Move to another view: curtain down, navigate to its route, curtain up once it has rendered. */
  go(next: any){
    const {view, cat, pid, sel, ...rest} = next;
    const to = urlFor(view, cat, pid);
    const apply = () => {
      this.setState({acScreen:undefined, acErr:'', retOpen:false, ...rest, ...(cat ? {cat} : {}), ...(pid ? {pid, sel, selPid:pid} : {}), ...RESET});
      if (to !== location.pathname + location.search) { this.navPending = true; this.props.navigate(to); return true; }
      window.scrollTo(0, 0);
      return false;
    };
    const c = this.curtainRef.current;
    if (PROPS.motion === 'reduced' || !c || !c.animate) return void apply();
    if (this.busy) return; this.busy = true;
    // The next page's first photo downloads while the curtain comes down.
    warm(view === 'home' ? (this.state.mobile ? HOME_HERO.mobile : HOME_HERO.desktop) : view === 'story' ? (this.state.mobile ? storyHeroMobile(cat) : storyHero(cat)) : view === 'product' ? firstPhoto(this.props.live, pid, sel) : '');
    let done = false, a1: any;
    const reveal = () => setTimeout(() => {
      const a = c.animate([{transform:'translateY(0)'},{transform:DOWN}], {duration:760, easing:EASE, fill:'forwards'});
      const end = () => { if (!this.busy) return; this.busy = false; c.style.transform = UP; a1 && a1.cancel(); a.cancel(); };
      a.finished.then(end, end); setTimeout(end, 1000);
    }, 220);
    const mid = () => {
      if (done) return; done = true;
      if (!apply()) return void reveal();
      // The next route's code and data load while the curtain is down.
      this.afterNav = reveal;
      setTimeout(() => { if (this.afterNav === reveal) { this.afterNav = null; this.navPending = false; reveal(); } }, 10000);
    };
    a1 = c.animate([{transform:UP},{transform:'translateY(0)'}], {duration:560, easing:EASE, fill:'forwards'});
    a1.finished.then(mid, mid); setTimeout(mid, 620);
  }
  openHelp(id: string){ if (this.view() === 'help') return this.scrollToId(id); this.helpJump = id; this.go({view:'help'}); }
  setAcct(patch: any){ this.setState((s: any) => { const acct = {...s.acct, ...patch}; try { localStorage.setItem('dl2-acct', JSON.stringify(acct)); } catch(e) {} return {acct}; }); }
  acScreen(k: string){ this.setState({acScreen:k, acErr:''}); window.scrollTo(0, 0); }
  goStory(k: string){ this.go({view:'story', cat:k}); }
  scrollToId(id: string){ const el = document.getElementById(id); if (!el) return; window.scrollTo({top: el.getBoundingClientRect().top + scrollY - 107, behavior: PROPS.motion === 'reduced' ? 'auto' : 'smooth'}); }
  defSel(pid: string, preset?: any){ const o: any = {}, given = (x: any) => preset && preset[x.n] != null && preset[x.n] < x.vals.length; P[pid].opts.forEach((x: any) => o[x.n] = given(x) ? preset[x.n] : 0);
    // Options left open start on the first selection Shopify has in stock.
    // Coming-soon choices (monogramming) are never selected.
    P[pid].opts.forEach((x: any) => { if (x.vals[o[x.n]] && x.vals[o[x.n]].soon) o[x.n] = 0; });
    if (!availableOf(this.props.live, pid, o)) { const ok = combos(pid).find((c: any) => P[pid].opts.every((x: any) => !given(x) || x.n === 'Monogram' || c[x.n] === o[x.n]) && availableOf(this.props.live, pid, c)); if (ok) Object.assign(o, ok); }
    return o; }
  priceOf(pid: string, sel: any){ return priceOf(this.props.live, pid, sel); }
  openProduct(pid: string, preset?: any){ this.go({view:'product', pid, cat:P[pid].cat, sel:this.defSel(pid, preset)}); }
  media(pid: string){ const p = P[pid]; const col = p.opts.find((o: any) => o.swatch);
    return (mediaOf(this.props.live, pid) || SHOP_MEDIA[pid] || []).map(([f, alt]: any, i: number) => { const all = alt ? alt.split('|').map((x: string) => x.trim()) : [];
      // "value" shows the photo only for that value; "~value" shows it always, first when that value is chosen.
      const tags = all.filter((x: string) => x[0] !== '~'), prefer = all.filter((x: string) => x[0] === '~').map((x: string) => x.slice(1)), named = [...tags, ...prefer];
      const cv = col && col.vals.find((v: any) => named.includes(v.v));
      return {i, url: f ? (/^https?:/.test(f) ? f : IMG(f)) : '', tags, prefer, alt: named.length ? p.name + ' · ' + named.join(' · ') : p.name, tint: cv ? cv.hex : '#E2D6C2', ink: cv && /^#[0-6]/.test(cv.hex) ? '#F4EFE6' : '#3B342B'}; }); }
  visible(pid: string, sel: any){ const p = P[pid]; const vals = p.opts.map((o: any) => o.vals[sel[o.n] ?? 0].v);
    const shown = this.media(pid).filter((m: any) => !m.tags.length || m.tags.every((tg: string) => vals.includes(tg)));
    // The chosen size or colour's own photos first, then the general ones, then the other options' photos.
    const rank = (m: any) => !m.prefer.length ? 1 : m.prefer.some((tg: string) => vals.includes(tg)) ? 0 : 2;
    return shown.map((m: any, k: number) => [m, k]).sort((a: any, b: any) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map((x: any) => x[0]); }
  pickOpt(pid: string, name: string, vi: number){ this.setState((st: any) => { const sel = {...this.defSel(pid, this.selOf(pid, st)), [name]:vi}; const val = P[pid].opts.find((o: any) => o.n === name).vals[vi].v; const vis = this.visible(pid, sel);
    const hit = vis.find((m: any) => m.tags.includes(val) || m.prefer.includes(val)); const keep = vis.find((m: any) => m.i === st.gi); return {sel, selPid:pid, added:false, notified:false, gi: hit ? hit.i : keep ? keep.i : (vis[0] ? vis[0].i : 0)}; }); }
  addToBag = () => {
    const pid = this.pid(), {qty} = this.state, sel = this.defSel(pid, this.selOf(pid));
    const mono = sel.Monogram === 1 && this.state.mono ? this.state.mono : '';
    // Shown in the bag at once; the Shopify cart then confirms it.
    const item = {...bagItem({id:'', qty, total: this.priceOf(pid, sel) * qty, dl:{pid, sel, mono}, title:'', variant:'', kids:[]}), key:'pending'};
    this.setState((s: any) => {
      const bag = s.bag.slice(); const i = bag.findIndex((b: any) => b.same === item.same);
      if (i >= 0) bag[i] = {...bag[i], qty: bag[i].qty + qty, total: bag[i].total + item.total}; else bag.push(item);
      return {bag, added:true};
    });
    this.cart({op:'add', pid, sel, qty, mono});
    const b = this.bagBtnRef.current;
    if (b && b.animate && PROPS.motion !== 'reduced') b.animate([{transform:'scale(1)'},{transform:'scale(1.22)'},{transform:'scale(.96)'},{transform:'scale(1)'}], {duration:620, easing:'cubic-bezier(.2,.7,.2,1)'});
    clearTimeout(this.addT); this.addT = setTimeout(() => this.setState({bagOpen:true, bagByHand:false}), 650);
  };
  bagQty(i: number, d: number){
    const b = this.state.bag[i]; if (!b) return;
    this.setState((s: any) => { const bag = s.bag.slice(); const q = bag[i].qty + d; if (q <= 0) bag.splice(i, 1); else bag[i] = {...bag[i], qty:q, total: bag[i].total / bag[i].qty * q}; return {bag}; });
    if (b.key !== 'pending') this.cart({op:'qty', line:b.key, qty:b.qty + d});
  }
  /** Sends a bag change to the Shopify cart, one at a time, and shows the cart it returns. */
  cart(body: any){
    this.cartQ = (this.cartQ || Promise.resolve()).then(() => fetch('/cart', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)})
      .then(r => r.json()).then((r: any) => { if (r && r.bag) { this.setState({bag: bagItems(r.bag), checkoutUrl: r.bag.checkoutUrl || ''}); if (this.props.onCart) this.props.onCart(r.bag.raw); } if (r && r.error) console.warn('Cart:', r.error); })
      .catch(e => console.warn('Cart:', e)));
    return this.cartQ;
  }
  checkPin = () => {
    const pin = this.state.pin;
    if (!/^[1-9]\d{5}$/.test(pin)) return this.setState({pinMsg:'Please enter a valid 6-digit pincode.'});
    const d = new Date(); d.setDate(d.getDate() + 3 + (+pin[0] % 3));
    this.setState({pinMsg:`Estimated delivery by ${d.toLocaleDateString('en-IN', {weekday:'short', day:'numeric', month:'short'})} to ${pin}.`});
  };
  /** Template values shared by every view (the header, menu, footer, bag, scrollbar and photo masks). */
  /**
   * "Notify me" for something sold out or coming soon. `item` names it in the email to the shop;
   * `when` ends "we will write the day …". Signed-in customers are noted at once, with their account's
   * email; anyone else is asked for an email first.
   */
  notifyFor(item: string, when: string){
    const done = !!(this.state.noted && this.state.noted[item]);
    return {label: done ? 'Noted ✓' : 'Notify me', go: () => {
      if (done) return;
      if (this.props.signedIn) return this.sendNotify(item, '');
      this.setState({nf: {item, when, email: (this.state.nf && this.state.nf.email) || '', err: '', sent: false}});
    }};
  }
  /** Sends a notify-me request to the shop. Resolves to an error message, or '' when sent. */
  sendNotify(item: string, email: string): Promise<string> {
    const failed = 'Something went wrong. Please write to contact@dailyloom.in.';
    return fetch('/notify', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({item, email})})
      .then(r => r.json()).catch(() => ({error: 'send'}))
      .then((r: any) => {
        if (!r || !r.ok) return r && r.error === 'email' ? 'Please enter a valid email address.' : failed;
        // The email to contact@dailyloom.in (formsubmit.co, a form-to-email service; replies go to the customer).
        return fetch(NOTIFY_FORM, {method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify({
          _subject: `Notify me: ${r.item}`, _template: 'table', _captcha: 'false',
          Product: r.item, email: r.email, Name: r.name || '—', 'Signed in': r.signedIn ? 'Yes' : 'No', Page: location.href,
        })}).then(x => x.json()).catch(() => null).then((x: any) => {
          if (!x || String(x.success) !== 'true') return failed;
          this.setState((s: any) => ({noted: {...(s.noted || {}), [item]: true}}));
          return '';
        });
      });
  }

  baseVals(){
    const s = this.state, devNotes = !!PROPS.devNotes, fabric = (PROPS.scrollbar ?? 'fabric') === 'fabric' && !s.mobile;
    const activeCat = this.view() === 'home' || this.view() === 'notfound' || this.view() === 'policy' ? null : this.cat();
    const cats = CATS.map((c: any) => ({name:c.name, onClick:() => this.goStory(c.k), navColor: activeCat === c.k ? '#7E5232' : '#221E18'}));
    const bagCount = s.bag.reduce((a: number, b: any) => a + b.qty, 0);
    const subtotal = s.bag.reduce((a: number, b: any) => a + b.total, 0);
    return {
      rootRef:this.rootRef, navRef:this.navRef, curtainRef:this.curtainRef, trackRef:this.trackRef, clothRef:this.clothRef, rollRef:this.rollRef, tagRef:this.tagRef, bagBtnRef:this.bagBtnRef,
      devNotes, fabric, cats, onTrackDown:this.onTrackDown,
      ...(() => {
        const m = PROPS.photoBlend ?? 'dissolve';
        if (m === 'framed') return {mEdgeSoft:'none', mHero:'none', mEdge:'none', mLeft:'none', mTB:'none', pBlend:'normal', pFrame:'1px dashed rgba(126,82,50,.4)'};
        return {
          mEdgeSoft:'linear-gradient(to right, transparent 0%, rgba(0,0,0,.7) 1%, #000 2.5%, #000 97.5%, rgba(0,0,0,.7) 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.7) 1%, #000 2.5%, #000 97.5%, rgba(0,0,0,.7) 99%, transparent 100%)',
          mHero:'linear-gradient(to bottom, #000 0%, #000 50%, rgba(0,0,0,.55) 74%, transparent 100%)',
          mEdge:'linear-gradient(to right, transparent 0%, rgba(0,0,0,.55) 1.5%, rgba(0,0,0,.9) 3.5%, #000 5.5%, #000 94.5%, rgba(0,0,0,.9) 96.5%, rgba(0,0,0,.55) 98.5%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.55) 1.5%, rgba(0,0,0,.9) 3.5%, #000 5.5%, #000 94.5%, rgba(0,0,0,.9) 96.5%, rgba(0,0,0,.55) 98.5%, transparent 100%)',
          mLeft:'linear-gradient(to right, transparent 0%, rgba(0,0,0,.35) 22%, rgba(0,0,0,.8) 42%, #000 58%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          mTB:'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.6) 3%, #000 8%, #000 92%, rgba(0,0,0,.6) 97%, transparent 100%)',
          pBlend: m === 'dissolve + multiply' ? 'multiply' : 'normal', pFrame:'none'
        };
      })(),
      ...(s.mobile && (PROPS.photoBlend ?? 'dissolve') !== 'framed' ? {mHero:'linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%)'} : {}),
      goHome: () => this.go({view:'home'}),
      acOpen: () => this.go({view:'account'}),
      navDisp: s.mobile ? 'none' : 'flex', menuDisp: s.mobile ? 'grid' : 'none', toggleMenu: () => this.setState((x: any) => ({menuOpen: !x.menuOpen})),
      menuTf: s.menuOpen && s.mobile ? 'translateY(0)' : 'translateY(-16px)', menuOp: s.menuOpen && s.mobile ? 1 : 0, menuPe: s.menuOpen && s.mobile ? 'auto' : 'none',
      menuIcon1: s.menuOpen ? 'M3 2l14 10' : 'M1 4h18', menuIcon2: s.menuOpen ? 'M3 12L17 2' : 'M1 10h18',
      helpLinks: [['Returns','help-returns'],['Care guide','help-care'],['Contact','help-contact']].map(([label, id]) => ({label, go: () => this.openHelp(id)})),
      hasBag: bagCount > 0, bagCount, bagEmpty: bagCount === 0, subtotal: fmt(subtotal),
      // Each bag item shows the first photo its buy page shows for that selection (else Shopify's photo of it).
      bagItems: s.bag.map((b: any, i: number) => ({photo: (u => u ? `url("${u}")` : 'none')((b.pid && ((this.visible(b.pid, b.sel || {})[0] || {}).url)) || b.image), name:b.name, desc:b.desc, chip:b.chip, qty:b.qty, line:fmt(b.total), inc: () => this.bagQty(i, 1), dec: () => this.bagQty(i, -1), remove: () => this.bagQty(i, -b.qty)})),
      openBag: () => this.setState({bagOpen:true, bagByHand:true, checkingOut:false}), closeBag: () => this.setState({bagOpen:false}), closeBagHome: () => this.go({view:'home'}),
      bagX: s.bagOpen ? 'translateX(0)' : 'translateX(104%)', bagOverlayOp: s.bagOpen ? 1 : 0, bagPe: s.bagOpen ? 'auto' : 'none',
      ...(() => {
        const nf = s.nf, open = !!(nf && !nf.closed), sent = !!(nf && nf.sent);
        const close = () => this.setState((x: any) => ({nf: x.nf && {...x.nf, closed: true}}));
        const send = () => {
          if (!nf || nf.sending) return;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((nf.email || '').trim())) return this.setState({nf: {...nf, err: 'Please enter a valid email address.'}});
          this.setState({nf: {...nf, err: '', sending: true}});
          this.sendNotify(nf.item, nf.email.trim()).then(err => this.setState((x: any) => ({nf: {...x.nf, sending: false, err, sent: !err}})));
        };
        return {
          nfOp: open ? 1 : 0, nfPe: open ? 'auto' : 'none', nfTf: open ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% + 16px))', nfClose: close,
          nfTitle: sent ? 'Noted.' : 'Notify me.', nfAsk: !sent,
          nfText: !nf ? '' : sent ? `Thank you. We will write to ${nf.email.trim()} the day ${nf.when}.` : `Leave your email and we will write the day ${nf.when}.`,
          nfEmail: (nf && nf.email) || '', onNfEmail: (e: any) => this.setState({nf: {...nf, email: e.target.value, err: ''}}),
          nfSend: send, nfLabel: nf && nf.sending ? 'Sending…' : 'Notify me', nfHasErr: !!(nf && nf.err), nfErr: (nf && nf.err) || '',
        };
      })(),
      checkout: () => { this.setState({checkingOut:true}); (this.cartQ || Promise.resolve()).then(() => { if (this.state.checkoutUrl) location.href = this.state.checkoutUrl; else this.setState({checkingOut:false}); }); }, checkoutLabel: s.checkingOut ? 'Opening secure checkout…' : 'Checkout'
    };
  }
  render(){
    const base = this.baseVals();
    return (
      <ShellContext.Provider value={{sh: this, base}}>
        <ShellView vals={base}>{this.props.children}</ShellView>
        {/* A visitor opening the bag (not the bag opening itself after an add) counts as viewing it. */}
        {this.props.onCart && this.state.bagOpen && this.state.bagByHand ? <Analytics.CartView /> : null}
      </ShellContext.Provider>
    );
  }
}

/** The gallery photo a buy page opens on (its preset options unless given), or '' when it has none. */
/** Every photo of a product, for search engines. */
export function photosOf(live: Live | null, pid: string): string[] {
  const sh: any = Object.create(ShellLogic.prototype); sh.props = {live};
  return [...new Set((sh.media(pid) || []).map((m: any) => m.url).filter(Boolean))] as string[];
}

export function firstPhoto(live: Live | null, pid: string, sel?: any): string {
  const sh: any = Object.create(ShellLogic.prototype); sh.props = {live};
  const m = sh.visible(pid, sel || sh.defSel(pid, presetFor(pid)))[0];
  return (m && m.url) || '';
}

/** A bag row as the design shows it, from a Shopify cart line (its add-ons priced in). */
function bagItem(l: BagLine){
  const total = l.total + l.kids.reduce((a, k) => a + k.total, 0), dl = l.dl, p = dl && P[dl.pid];
  if (!p) return {key:l.id, same:l.id, image:l.image || '', name:l.title, desc:l.variant === 'Default Title' ? '' : l.variant, chip:'#E5DCCB', qty:l.qty, total};
  const sel = dl.sel || {}, mono = dl.mono || '';
  const desc = p.opts.filter((o: any) => !(o.n === 'Monogram' && sel.Monogram !== 1)).map((o: any) => o.n === 'Monogram' ? 'Monogram ' + (mono || '—') : valLabel(o.vals[sel[o.n] ?? 0])).join(' · ');
  const col = p.opts.find((o: any) => o.swatch);
  return {key:l.id, same:dl.pid + JSON.stringify(sel) + mono, pid: dl.pid, sel, image:l.image || '', name:p.name, desc, chip: col ? col.vals[sel[col.n] ?? 0].hex : '#E5DCCB', qty:l.qty, total};
}
const bagItems = (bag: Bag | null) => (bag ? bag.lines : []).map(bagItem);
