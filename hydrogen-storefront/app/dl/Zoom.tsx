// Full-screen photo viewer for the buy page, opened by tapping the gallery photo. Phones: pinch or
// double-tap to zoom, drag to look around, swipe to the next photo. Desktop: click to zoom, move the
// mouse to look around, scroll to zoom further. Built from v4 pieces (the gallery's round buttons
// and caption on the page's linen ground).
import {useEffect, useRef, useState} from 'react';

type Photo = {url: string; alt: string};
const MAX = 4, STEP = 2.5;
const btn = {width: '40px', height: '40px', borderRadius: '50%', border: '0', background: 'rgba(244,239,230,.94)', boxShadow: '0 0 0 1px rgba(34,30,24,.12)', cursor: 'pointer', fontSize: '18px', color: '#221E18', transition: 'background .3s,transform .3s'};

export function Zoom({photos, index, caption, onIndex, onClose}: {photos: Photo[]; index: number; caption: string; onIndex: (i: number) => void; onClose: () => void}) {
  const box = useRef<HTMLDivElement>(null), img = useRef<HTMLImageElement>(null), closeRef = useRef<HTMLButtonElement>(null);
  const [v, setV] = useState({s: 1, x: 0, y: 0}), [shown, setShown] = useState(false), [glide, setGlide] = useState(true);
  const vr = useRef(v); vr.current = v;
  const n = photos.length, cur = photos[index] || photos[0];
  const go = (d: number) => n > 1 && onIndex((index + d + n) % n);

  // The photo's on-screen size at scale 1 (fitted whole), and how far it may move at scale s.
  const clamp = (s: number, x: number, y: number) => {
    const b = box.current, im = img.current;
    if (!b || !im || !im.naturalWidth) return {s, x: 0, y: 0};
    const bw = b.clientWidth, bh = b.clientHeight, f = Math.min(bw / im.naturalWidth, bh / im.naturalHeight);
    const mx = Math.max(0, (im.naturalWidth * f * s - bw) / 2), my = Math.max(0, (im.naturalHeight * f * s - bh) / 2);
    return {s, x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y))};
  };
  // Zoom to s keeping the point (px, py), relative to the box centre, where it is.
  const zoomAt = (s: number, px: number, py: number, from = vr.current) => {
    s = Math.max(1, Math.min(MAX, s));
    const k = s / from.s;
    setV(clamp(s, px - (px - from.x) * k, py - (py - from.y) * k));
  };
  const rel = (e: {clientX: number; clientY: number}) => {
    const r = box.current!.getBoundingClientRect();
    return {x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2, w: r.width, h: r.height};
  };

  useEffect(() => { setV({s: 1, x: 0, y: 0}); }, [index]);
  // While open the page behind stays still.
  useEffect(() => {
    requestAnimationFrame(() => setShown(true));
    closeRef.current && closeRef.current.focus();
    const html = document.documentElement, prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = prev; };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); else if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  });
  // Scroll (or a trackpad pinch) zooms at the pointer; it never scrolls the page behind.
  useEffect(() => {
    const b = box.current; if (!b) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); const p = rel(e); zoomAt(vr.current.s * Math.exp(-e.deltaY * (e.ctrlKey ? .01 : .002)), p.x, p.y); };
    b.addEventListener('wheel', onWheel, {passive: false});
    return () => b.removeEventListener('wheel', onWheel);
  }, []);
  // The next and previous photos load in the background so moving between them is instant.
  useEffect(() => { for (const d of [1, -1]) { const p = photos[(index + d + n) % n]; if (p) new Image().src = p.url; } }, [index]);

  // Pointer gestures: one finger drags (or swipes when not zoomed), two fingers pinch.
  const pts = useRef(new Map<number, {x: number; y: number}>()), g = useRef<any>(null), lastTap = useRef(0);
  const start = () => {
    const ps = [...pts.current.values()];
    if (ps.length === 2) {
      const [a, b] = ps;
      g.current = {pinch: true, d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, from: vr.current};
    } else if (ps.length === 1) {
      g.current = {pinch: false, sx: ps[0].x, sy: ps[0].y, from: vr.current, t: Date.now(), moved: false};
    }
  };
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    box.current!.setPointerCapture(e.pointerId);
    pts.current.set(e.pointerId, rel(e)); setGlide(false); start();
  };
  const onMove = (e: React.PointerEvent) => {
    // Desktop, zoomed and not dragging: the photo follows the mouse.
    if (e.pointerType === 'mouse' && !pts.current.size) {
      if (vr.current.s > 1) { const p = rel(e), c = clamp(vr.current.s, 1e9, 1e9); setGlide(true); setV(clamp(vr.current.s, -p.x / (p.w / 2) * c.x, -p.y / (p.h / 2) * c.y)); }
      return;
    }
    if (!pts.current.has(e.pointerId)) return;
    pts.current.set(e.pointerId, rel(e));
    const st = g.current; if (!st) return;
    const ps = [...pts.current.values()];
    if (st.pinch && ps.length === 2) {
      const [a, b] = ps, d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const s = Math.max(1, Math.min(MAX, st.from.s * d / st.d)), k = s / st.from.s;
      setV(clamp(s, mx - (st.mx - st.from.x) * k, my - (st.my - st.from.y) * k));
    } else if (!st.pinch) {
      const dx = ps[0].x - st.sx, dy = ps[0].y - st.sy;
      if (Math.hypot(dx, dy) > 8) st.moved = true;
      if (st.from.s > 1) setV(clamp(st.from.s, st.from.x + dx, st.from.y + dy));
      else { st.dx = dx; st.dy = dy; }
    }
  };
  const onUp = (e: React.PointerEvent) => {
    if (!pts.current.has(e.pointerId)) return;
    const p = pts.current.get(e.pointerId)!, st = g.current;
    pts.current.delete(e.pointerId); setGlide(true);
    if (pts.current.size) { start(); return; }
    g.current = null;
    if (!st || st.pinch) return;
    if (!st.moved && Date.now() - st.t < 350) {
      // A click (mouse) or a double-tap (touch) zooms in at that point, or back out.
      const now = Date.now();
      if (e.pointerType === 'mouse' || now - lastTap.current < 300) {
        lastTap.current = 0;
        if (vr.current.s > 1) setV({s: 1, x: 0, y: 0}); else zoomAt(STEP, p.x, p.y, {s: 1, x: 0, y: 0});
      } else lastTap.current = now;
    } else if (st.from.s === 1 && Math.abs(st.dx || 0) > 50 && Math.abs(st.dx) > Math.abs(st.dy || 0)) go(st.dx < 0 ? 1 : -1);
  };

  const zoomed = v.s > 1;
  return (
    <div role="dialog" aria-modal="true" aria-label="Product photos" style={{position: 'fixed', inset: '0', zIndex: 120, backgroundColor: '#F4EFE6', backgroundImage: 'repeating-linear-gradient(0deg, rgba(126,82,50,.05) 0 1px, transparent 1px 3px),repeating-linear-gradient(90deg, rgba(85,87,63,.05) 0 1px, transparent 1px 3px)', opacity: shown ? 1 : 0, transition: 'opacity .45s cubic-bezier(.2,.7,.2,1)', overscrollBehavior: 'contain'}}>
      <div ref={box} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        style={{position: 'absolute', inset: 'clamp(64px,8vh,88px) clamp(0px,4vw,88px)', overflow: 'hidden', touchAction: 'none', cursor: zoomed ? 'zoom-out' : 'zoom-in', userSelect: 'none'}}>
        <img ref={img} key={cur.url} src={cur.url} alt={cur.alt} draggable={false} onLoad={() => setV(x => clamp(x.s, x.x, x.y))}
          style={{width: '100%', height: '100%', objectFit: 'contain', display: 'block', transform: `translate(${v.x}px,${v.y}px) scale(${v.s})${shown ? '' : ' scale(.98)'}`, transformOrigin: 'center', transition: glide ? 'transform .35s cubic-bezier(.2,.7,.2,1)' : 'none', willChange: 'transform', pointerEvents: 'none'}} />
      </div>
      <button ref={closeRef} onClick={onClose} aria-label="Close" style={{...btn, position: 'absolute', top: '14px', right: '14px', fontSize: '20px'}}>×</button>
      <div style={{position: 'absolute', left: '18px', top: '18px', padding: '9px 14px 8px', backgroundColor: 'rgba(244,239,230,.94)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(126,82,50,.1) 0 1px, transparent 1px 2.5px)', outline: '1px dashed rgba(126,82,50,.5)', outlineOffset: '-4px', fontSize: '12px', letterSpacing: '.08em', color: '#221E18', pointerEvents: 'none'}}>{caption}</div>
      {n > 1 ? (
        <div style={{position: 'absolute', right: '18px', bottom: '18px', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <button onClick={() => go(-1)} aria-label="Previous image" style={btn} className="scpd">‹</button>
          <button onClick={() => go(1)} aria-label="Next image" style={btn} className="scpe">›</button>
        </div>
      ) : null}
    </div>
  );
}
