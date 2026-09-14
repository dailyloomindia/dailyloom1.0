/**
 * Daily Loom luxury product story — scroll-driven weave zoom + reveal-on-scroll.
 * No dependencies. Pauses all rAF work while its section is off-screen and
 * bails out to a single static frame under prefers-reduced-motion, so it
 * costs nothing on a low-power device or a page the visitor never scrolls to.
 */
(() => {
  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  class DLWeave {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector('.dl-weave__canvas');
      this.copyEl = root.querySelector('[data-weave-copy]');
      this.magEl = root.querySelector('[data-weave-mag]');
      this.stage = root.querySelector('.dl-weave__stage');
      if (!this.canvas || !this.stage) return;

      if (REDUCE_MOTION) {
        root.classList.add('dl-weave--static');
        return;
      }

      this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.visible = false;
      this.dirty = true;
      this.zp = -1;
      this.raf = 0;

      this.sizeCanvas();
      this.onResize = this.debounce(() => {
        this.sizeCanvas();
        this.dirty = true;
      }, 120);
      window.addEventListener('resize', this.onResize);

      this.io = new IntersectionObserver(
        (entries) => {
          this.visible = entries[0].isIntersecting;
          if (this.visible) {
            this.dirty = true;
            this.loop();
          } else if (this.raf) {
            cancelAnimationFrame(this.raf);
            this.raf = 0;
          }
        },
        { threshold: 0 }
      );
      this.io.observe(root);
    }

    debounce(fn, ms) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
      };
    }

    sizeCanvas() {
      const c = this.canvas;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.cw = r.width;
      this.ch = r.height;
    }

    loop = () => {
      if (!this.visible) {
        this.raf = 0;
        return;
      }
      const r = this.root.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.max(0, Math.min(1, -r.top / span));
      if (Math.abs(p - this.zp) > 0.0005 || this.dirty) {
        this.zp = p;
        this.draw(p);
        this.updateCopy(p);
      }
      this.dirty = false;
      this.raf = requestAnimationFrame(this.loop);
    };

    updateCopy(p) {
      const copy = p < 0.3 ? 'Cotton, top to bottom' : p < 0.65 ? '300 threads to the inch' : 'One over, one under';
      const mag = Math.round(1 + p * 119) + '×';
      if (this.copyEl && this.copyEl.textContent !== copy) this.copyEl.textContent = copy;
      if (this.magEl && this.magEl.textContent !== mag) this.magEl.textContent = mag;
    }

    draw(p) {
      const x = this.ctx;
      if (!x) return;
      const W = this.cw;
      const H = this.ch;
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
  }

  function initReveal() {
    const els = document.querySelectorAll('.dl-reveal');
    if (!els.length) return;
    if (REDUCE_MOTION || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    els.forEach((el) => io.observe(el));
  }

  function initSmoothAnchors(root) {
    root.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href').slice(1);
        const target = id && document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: REDUCE_MOTION ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  function init() {
    document.querySelectorAll('[data-dl-story]').forEach((root) => {
      root.querySelectorAll('[data-dl-weave]').forEach((w) => new DLWeave(w));
      initSmoothAnchors(root);
    });
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
