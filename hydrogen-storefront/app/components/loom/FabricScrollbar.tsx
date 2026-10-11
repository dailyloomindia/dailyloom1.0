import {useEffect, useRef} from 'react';

/** The design's "fabric bolt" scrollbar: cloth unrolls down the rail as the
 * page scrolls, and the rail can be dragged. Hidden (CSS) on touch and narrow
 * screens, where native scrolling is better. */
export function FabricScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const clothRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let tagTimer = 0;
    const update = () => {
      raf = 0;
      const tr = trackRef.current;
      const cl = clothRef.current;
      const rl = rollRef.current;
      const tg = tagRef.current;
      // Hidden by CSS on touch/narrow screens; skip the work there.
      if (!tr || !cl || !rl || tr.clientHeight === 0) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const dia = 24 - 12 * p;
      const len = p * (tr.clientHeight - 8 - dia);
      cl.style.height = `${len + dia / 2}px`;
      rl.style.top = `${8 + len}px`;
      rl.style.height = `${dia}px`;
      rl.style.backgroundPosition = `0 0, 0 ${-window.scrollY * 0.3}px`;
      if (tg) {
        tg.textContent = `${Math.round(p * 100)}% unrolled`;
        tg.style.top = `${8 + len + dia / 2 - 12}px`;
        tg.style.opacity = '1';
        window.clearTimeout(tagTimer);
        tagTimer = window.setTimeout(() => (tg.style.opacity = '0'), 900);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    update();
    if (tagRef.current) tagRef.current.style.opacity = '0';
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(tagTimer);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const tr = trackRef.current;
    if (!tr) return;
    tr.setPointerCapture?.(e.pointerId);
    tr.style.cursor = 'grabbing';
    const move = (ev: PointerEvent) => {
      const r = tr.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height));
      window.scrollTo(0, p * (document.documentElement.scrollHeight - window.innerHeight));
    };
    const up = () => {
      tr.style.cursor = '';
      tr.removeEventListener('pointermove', move);
      tr.removeEventListener('pointerup', up);
      tr.removeEventListener('pointercancel', up);
    };
    move(e.nativeEvent);
    tr.addEventListener('pointermove', move);
    tr.addEventListener('pointerup', up);
    tr.addEventListener('pointercancel', up);
  };

  return (
    <div ref={trackRef} className="lm-bolt" onPointerDown={onPointerDown} aria-hidden="true">
      <div className="lm-bolt__rail" />
      <div ref={clothRef} className="lm-bolt__cloth" />
      <div className="lm-bolt__bar" />
      <div className="lm-bolt__knob" style={{left: -2}} />
      <div className="lm-bolt__knob" style={{right: -2}} />
      <div ref={rollRef} className="lm-bolt__roll" />
      <div ref={tagRef} className="lm-bolt__tag">0% unrolled</div>
    </div>
  );
}
