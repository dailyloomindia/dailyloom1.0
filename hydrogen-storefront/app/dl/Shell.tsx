// The persistent part of the storefront: header, mobile menu, footer, bag,
// fabric scrollbar and page curtain, plus the design's state and behaviour.
// Ported from the `Component` logic class in "Daily Loom v4.dc.html"; the
// differences are that the current view, collection and product come from
// the URL, and moving between views navigates to that view's route.
import {Component, createContext, createRef, useContext, type ReactNode} from 'react';
import {useLocation, useNavigate} from '@remix-run/react';
import {CATS, P, SHOP_MEDIA, IMG, fmt} from './data/catalog';
import {parseRoute, urlFor, type Route, type View} from './routing';
import {ShellView} from './views/ShellView';

/** The design's tweak values, as the v4 file was finalised. */
export const PROPS: {
  motion: 'refined' | 'reduced';
  scrollbar: 'fabric' | 'native';
  photoBlend: 'dissolve' | 'dissolve + multiply' | 'framed';
  devNotes: boolean;
  pdpPreview: 'ready' | 'loading' | 'sold out';
} = {motion: 'refined', scrollbar: 'fabric', photoBlend: 'dissolve', devNotes: false, pdpPreview: 'ready'};

const EASE = 'cubic-bezier(.76,0,.24,1)';
const UP = 'translateY(calc(-100% - 48px))', DOWN = 'translateY(calc(100% + 48px))';
const RESET = {barHidden:false, menuOpen:false, gi:null, notified:false, qty:1, added:false, pinMsg:'', acc:'Details', cl:0, mono:'', ritOpen:false, bagOpen:false};

/** The option preset a collection card opens a product with. */
const presetFor = (pid: string) => (CATS.flatMap((c: any) => c.items).find((x: any) => x.pid === pid) || {}).sel;

type ShellProps = {route: Route; locKey: string; navigate: (to: string) => void; children: ReactNode};
type Ctx = {sh: ShellLogic; base: any};
const ShellContext = createContext<Ctx | null>(null);

/** Shell state, methods and the shared template values, for route views. */
export function useShell(): Ctx {
  const c = useContext(ShellContext);
  if (!c) throw new Error('useShell outside <Shell>');
  return c;
}

export function Shell({view, children}: {view?: View; children: ReactNode}) {
  const location = useLocation();
  const navigate = useNavigate();
  const route = view ? {view} : parseRoute(location.pathname, location.search);
  return <ShellLogic route={route} locKey={location.key} navigate={navigate}>{children}</ShellLogic>;
}

export class ShellLogic extends Component<ShellProps, any> {
  [k: string]: any;
  constructor(p: ShellProps){
    super(p);
    // Browser-kept state (bag, account, last category) is restored in componentDidMount,
    // so the server render and the first client render are identical.
    this.state = {cat: p.route.cat || 'duvets', pid: p.route.pid || 'winter-duvet', sel:{}, selPid:null, qty:1, bag:[], bagOpen:false, tc:0, tMat:0, tType:2, tCol:0, cl:0, pin:'', pinMsg:'', added:false, acc:'Details', checkingOut:false, acct:{}, acForm:{}, acErr:'', retOpen:false};
    ['ctaRef','rootRef','navRef','curtainRef','trackRef','clothRef','rollRef','tagRef','bagBtnRef'].forEach(k => this[k] = createRef());
  }
  view(){ return this.props.route.view; }
  cat(){ return this.props.route.cat || this.state.cat; }
  pid(){ return this.props.route.pid || this.state.pid; }
  selOf(pid: string, st = this.state){ return st.selPid === pid ? st.sel : presetFor(pid); }
  componentDidMount(){
    let s: any = {}, bag: any = [], acct: any = {};
    try { s = JSON.parse(localStorage.getItem('dl2-nav') || '{}'); bag = JSON.parse(localStorage.getItem('dl2-bag') || '[]'); } catch(e) {}
    try { acct = JSON.parse(localStorage.getItem('dl2-acct') || '{}'); } catch(e) {}
    this.setState({bag: Array.isArray(bag) ? bag : [], acct, ...(!this.props.route.cat && CATS.some((c: any) => c.k === s.cat) ? {cat: s.cat} : {})});
    this.onResize = () => { const m = innerWidth < 768; if (m !== this.state.mobile) { this.setState({mobile:m}); this.applySb(); } };
    window.addEventListener('resize', this.onResize); this.onResize();
    window.addEventListener('scroll', this.onScroll, {passive:true});
    window.addEventListener('resize', this.onScroll);
    this.applySb(); this.observe(); this.onScroll(); this.snap();
    // The server-rendered page starts behind the curtain (see root.tsx); hand it to the animation.
    document.getElementById('dl-boot')?.remove();
    const c = this.curtainRef.current;
    if (c && c.animate && PROPS.motion !== 'reduced' && document.visibilityState === 'visible') {
      c.animate([{transform:'translateY(0)'},{transform:DOWN}], {duration:1000, delay:450, easing:EASE, fill:'backwards'});
    }
  }
  componentWillUnmount(){ window.removeEventListener('scroll', this.onScroll); window.removeEventListener('resize', this.onScroll); window.removeEventListener('resize', this.onResize); this.io && this.io.disconnect(); }
  snap(){ const {bag} = this.state; this._prev = {view:this.view(), cat:this.cat(), pid:this.pid(), key:this.props.locKey, bag, sb:PROPS.scrollbar}; }
  componentDidUpdate(){
    const ps = this._prev || {}, s = this.state;
    if (ps.sb !== PROPS.scrollbar) this.applySb();
    if (ps.key !== this.props.locKey) this.onLocation();
    if (ps.view !== this.view() || ps.cat !== this.cat() || ps.pid !== this.pid()) { this.observe(); this.onScroll(); }
    if (ps.bag !== s.bag) try { localStorage.setItem('dl2-bag', JSON.stringify(s.bag)); } catch(e) {}
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
    tr.setPointerCapture && tr.setPointerCapture(e.pointerId); tr.style.cursor = 'grabbing';
    const move = (ev: any) => { const r = tr.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height)); window.scrollTo(0, p * (document.documentElement.scrollHeight - innerHeight)); };
    const up = () => { tr.style.cursor = 'grab'; tr.removeEventListener('pointermove', move); tr.removeEventListener('pointerup', up); };
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
  defSel(pid: string, preset?: any){ const o: any = {}; P[pid].opts.forEach((x: any) => o[x.n] = (preset && preset[x.n] != null && preset[x.n] < x.vals.length) ? preset[x.n] : 0); return o; }
  priceOf(pid: string, sel: any){ const p = P[pid]; return p.base + p.opts.reduce((a: number, o: any) => a + (o.vals[sel[o.n] ?? 0].p || 0), 0); }
  openProduct(pid: string, preset?: any){ this.go({view:'product', pid, cat:P[pid].cat, sel:this.defSel(pid, preset)}); }
  media(pid: string){ const p = P[pid]; const col = p.opts.find((o: any) => o.swatch);
    return (SHOP_MEDIA[pid] || []).map(([f, alt]: any, i: number) => { const tags = alt ? alt.split('|').map((x: string) => x.trim()) : []; const cv = col && col.vals.find((v: any) => tags.includes(v.v));
      return {i, url: f ? IMG(f) : '', tags, alt: alt ? p.name + ' · ' + alt : p.name, tint: cv ? cv.hex : '#E2D6C2', ink: cv && /^#[0-6]/.test(cv.hex) ? '#F4EFE6' : '#3B342B'}; }); }
  visible(pid: string, sel: any){ const p = P[pid]; const vals = p.opts.map((o: any) => o.vals[sel[o.n] ?? 0].v); return this.media(pid).filter((m: any) => !m.tags.length || m.tags.every((tg: string) => vals.includes(tg))); }
  pickOpt(pid: string, name: string, vi: number){ this.setState((st: any) => { const sel = {...this.defSel(pid, this.selOf(pid, st)), [name]:vi}; const val = P[pid].opts.find((o: any) => o.n === name).vals[vi].v; const vis = this.visible(pid, sel);
    const hit = vis.find((m: any) => m.tags.includes(val)); const keep = vis.find((m: any) => m.i === st.gi); return {sel, selPid:pid, added:false, notified:false, gi: hit ? hit.i : keep ? keep.i : (vis[0] ? vis[0].i : 0)}; }); }
  addToBag = () => {
    const pid = this.pid(), {qty} = this.state, sel = this.defSel(pid, this.selOf(pid)), p = P[pid];
    const key = pid + JSON.stringify(sel) + (this.state.mono || '');
    const mono = sel.Monogram === 1 && this.state.mono ? this.state.mono : '';
    const desc = p.opts.filter((o: any) => !(o.n === 'Monogram' && sel.Monogram !== 1)).map((o: any) => o.n === 'Monogram' ? 'Monogram ' + (mono || '—') : o.vals[sel[o.n]].v).join(' · ');
    const col = p.opts.find((o: any) => o.swatch);
    const chip = col ? col.vals[sel[col.n]].hex : '#E5DCCB';
    const unit = this.priceOf(pid, sel);
    this.setState((s: any) => {
      const bag = s.bag.slice(); const i = bag.findIndex((b: any) => b.key === key);
      if (i >= 0) bag[i] = {...bag[i], qty: bag[i].qty + qty}; else bag.push({key, pid, desc, chip, unit, qty});
      return {bag, added:true};
    });
    const b = this.bagBtnRef.current;
    if (b && b.animate && PROPS.motion !== 'reduced') b.animate([{transform:'scale(1)'},{transform:'scale(1.22)'},{transform:'scale(.96)'},{transform:'scale(1)'}], {duration:620, easing:'cubic-bezier(.2,.7,.2,1)'});
    clearTimeout(this.addT); this.addT = setTimeout(() => this.setState({bagOpen:true}), 650);
  };
  bagQty(i: number, d: number){ this.setState((s: any) => { const bag = s.bag.slice(); const q = bag[i].qty + d; if (q <= 0) bag.splice(i, 1); else bag[i] = {...bag[i], qty:q}; return {bag}; }); }
  checkPin = () => {
    const pin = this.state.pin;
    if (!/^[1-9]\d{5}$/.test(pin)) return this.setState({pinMsg:'Please enter a valid 6-digit pincode.'});
    const d = new Date(); d.setDate(d.getDate() + 3 + (+pin[0] % 3));
    this.setState({pinMsg:`Estimated delivery by ${d.toLocaleDateString('en-IN', {weekday:'short', day:'numeric', month:'short'})} to ${pin}.`});
  };
  /** Template values shared by every view (the header, menu, footer, bag, scrollbar and photo masks). */
  baseVals(){
    const s = this.state, devNotes = !!PROPS.devNotes, fabric = (PROPS.scrollbar ?? 'fabric') === 'fabric' && !s.mobile;
    const activeCat = this.view() === 'home' || this.view() === 'notfound' ? null : this.cat();
    const cats = CATS.map((c: any) => ({name:c.name, onClick:() => this.goStory(c.k), navColor: activeCat === c.k ? '#7E5232' : '#221E18'}));
    const bagCount = s.bag.reduce((a: number, b: any) => a + b.qty, 0);
    const subtotal = s.bag.reduce((a: number, b: any) => a + b.qty * b.unit, 0);
    const a = s.acct || {};
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
      acOpen: () => this.go({view:'account', acScreen: a.auth ? 'orders' : 'signin'}),
      navDisp: s.mobile ? 'none' : 'flex', menuDisp: s.mobile ? 'grid' : 'none', toggleMenu: () => this.setState((x: any) => ({menuOpen: !x.menuOpen})),
      menuTf: s.menuOpen && s.mobile ? 'translateY(0)' : 'translateY(-16px)', menuOp: s.menuOpen && s.mobile ? 1 : 0, menuPe: s.menuOpen && s.mobile ? 'auto' : 'none',
      menuIcon1: s.menuOpen ? 'M3 2l14 10' : 'M1 4h18', menuIcon2: s.menuOpen ? 'M3 12L17 2' : 'M1 10h18',
      helpLinks: [['Returns','help-returns'],['Care guide','help-care'],['Contact','help-contact']].map(([label, id]) => ({label, go: () => this.openHelp(id)})),
      hasBag: bagCount > 0, bagCount, bagEmpty: bagCount === 0, subtotal: fmt(subtotal),
      bagItems: s.bag.map((b: any, i: number) => ({name:P[b.pid] ? P[b.pid].name : b.pid, desc:b.desc, chip:b.chip, qty:b.qty, line:fmt(b.unit * b.qty), inc: () => this.bagQty(i, 1), dec: () => this.bagQty(i, -1), remove: () => this.bagQty(i, -b.qty)})),
      openBag: () => this.setState({bagOpen:true, checkingOut:false}), closeBag: () => this.setState({bagOpen:false}), closeBagHome: () => this.go({view:'home'}),
      bagX: s.bagOpen ? 'translateX(0)' : 'translateX(104%)', bagOverlayOp: s.bagOpen ? 1 : 0, bagPe: s.bagOpen ? 'auto' : 'none',
      checkout: () => this.setState({checkingOut:true}), checkoutLabel: s.checkingOut ? 'Opening secure checkout…' : 'Checkout'
    };
  }
  render(){
    const base = this.baseVals();
    return (
      <ShellContext.Provider value={{sh: this, base}}>
        <ShellView vals={base}>{this.props.children}</ShellView>
      </ShellContext.Provider>
    );
  }
}
