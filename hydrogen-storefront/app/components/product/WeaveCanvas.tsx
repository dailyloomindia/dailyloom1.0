import {useEffect, useRef, useState} from 'react';

/**
 * Scroll-driven canvas weave-zoom, ported from the Claude Design canvas.
 * Pauses all rAF work while off-screen (IntersectionObserver) and bails
 * out to a single static frame under prefers-reduced-motion, so it costs
 * nothing on a low-power device or a page the visitor never scrolls to.
 */
export function WeaveCanvas({label}: {label: string}) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copy, setCopy] = useState('Cotton, top to bottom');
  const [mag, setMag] = useState('1×');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext('2d', {alpha: false});
    if (!ctx) return;

    let raf = 0;
    let visible = false;
    let dirty = true;
    let zp = -1;
    let cw = 0;
    let ch = 0;

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas!.getBoundingClientRect();
      canvas!.width = Math.max(1, Math.round(r.width * dpr));
      canvas!.height = Math.max(1, Math.round(r.height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = r.width;
      ch = r.height;
    }

    function draw(p: number) {
      const x = ctx!;
      const W = cw;
      const H = ch;
      const cell = 7 * Math.pow(26, p);
      x.fillStyle = '#23241f';
      x.fillRect(0, 0, W, H);
      const tw = cell * 0.84;
      const cols = Math.ceil(W / cell) + 2;
      const rows = Math.ceil(H / cell) + 2;
      const ox = -cell * 0.5;
      const oy = -cell * 0.5;

      for (let i = 0; i < cols; i++) {
        const xx = ox + i * cell;
        const g = x.createLinearGradient(xx, 0, xx + tw, 0);
        g.addColorStop(0, '#1b1c18');
        g.addColorStop(0.38, '#43453c');
        g.addColorStop(0.62, '#4d4f45');
        g.addColorStop(1, '#1b1c18');
        x.fillStyle = g;
        x.fillRect(xx, 0, tw, H);
      }
      for (let j = 0; j < rows; j++) {
        const yy = oy + j * cell;
        const g = x.createLinearGradient(0, yy, 0, yy + tw);
        g.addColorStop(0, '#232520');
        g.addColorStop(0.38, '#54564b');
        g.addColorStop(0.62, '#5e6055');
        g.addColorStop(1, '#232520');
        x.fillStyle = g;
        for (let i = 0; i < cols; i++) {
          if ((i + j) % 2 === 0) continue;
          x.fillRect(ox + i * cell - cell * 0.08, yy, cell, tw);
        }
      }

      if (cell > 26) {
        const a = Math.min(0.5, (cell - 26) / 130);
        x.lineWidth = Math.max(0.6, cell * 0.012);
        let seed = 1;
        const rnd = () => {
          seed = (seed * 16807) % 2147483647;
          return seed / 2147483647;
        };
        for (let i = 0; i < cols; i++) {
          const xx = ox + i * cell;
          for (let k = 0; k < Math.round(cell / 3); k++) {
            const fy = rnd() * H;
            const fx = xx + tw * (0.1 + rnd() * 0.8);
            x.strokeStyle = 'rgba(214,208,192,' + (a * (0.2 + rnd() * 0.5)).toFixed(3) + ')';
            x.beginPath();
            x.moveTo(fx, fy);
            x.quadraticCurveTo(fx + cell * 0.1, fy + cell * 0.34, fx - cell * 0.05, fy + cell * 0.72);
            x.stroke();
          }
        }
        for (let j = 0; j < rows; j++) {
          const yy = oy + j * cell;
          for (let k = 0; k < Math.round(cell / 3); k++) {
            const fx2 = rnd() * W;
            const fy2 = yy + tw * (0.1 + rnd() * 0.8);
            x.strokeStyle = 'rgba(226,220,205,' + (a * (0.18 + rnd() * 0.45)).toFixed(3) + ')';
            x.beginPath();
            x.moveTo(fx2, fy2);
            x.quadraticCurveTo(fx2 + cell * 0.34, fy2 + cell * 0.08, fx2 + cell * 0.7, fy2 - cell * 0.05);
            x.stroke();
          }
        }
      }

      const sg = x.createLinearGradient(0, 0, W, H);
      const c0 = 0.12 + p * 0.5;
      sg.addColorStop(Math.max(0, c0 - 0.3), 'rgba(247,243,235,0)');
      sg.addColorStop(Math.min(1, c0), 'rgba(247,243,235,' + (0.05 + p * 0.05).toFixed(3) + ')');
      sg.addColorStop(Math.min(1, c0 + 0.3), 'rgba(247,243,235,0)');
      x.fillStyle = sg;
      x.fillRect(0, 0, W, H);

      const v = x.createRadialGradient(W * 0.5, H * 0.45, Math.min(W, H) * 0.2, W * 0.5, H * 0.5, Math.max(W, H) * 0.78);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(1, 'rgba(0,0,0,.55)');
      x.fillStyle = v;
      x.fillRect(0, 0, W, H);
    }

    function loop() {
      if (!visible) {
        raf = 0;
        return;
      }
      const r = root!.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -r.top / span));
      if (Math.abs(p - zp) > 0.0005 || dirty) {
        zp = p;
        draw(p);
        const nextCopy = p < 0.3 ? 'Cotton, top to bottom' : p < 0.65 ? '300 threads to the inch' : 'One over, one under';
        const nextMag = Math.round(1 + p * 119) + '×';
        setCopy((c) => (c === nextCopy ? c : nextCopy));
        setMag((m) => (m === nextMag ? m : nextMag));
      }
      dirty = false;
      raf = requestAnimationFrame(loop);
    }

    sizeCanvas();
    const onResize = () => {
      sizeCanvas();
      dirty = true;
    };
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) {
          dirty = true;
          if (!raf) loop();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      {threshold: 0},
    );
    io.observe(root);

    return () => {
      window.removeEventListener('resize', onResize);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <section className={`dl-weave${reduceMotion ? ' dl-weave--static' : ''}`} ref={rootRef}>
      <div className="dl-weave__stage">
        {!reduceMotion && <canvas className="dl-weave__canvas" ref={canvasRef} aria-hidden="true" />}
        <div className="dl-weave__label">{label}</div>
        <div className="dl-weave__foot">
          <h2 className="dl-weave__copy">{copy}</h2>
          <div className="dl-weave__mag">
            <div className="dl-weave__mag-n">{mag}</div>
            <div className="dl-weave__mag-l">magnification</div>
          </div>
        </div>
      </div>
    </section>
  );
}
