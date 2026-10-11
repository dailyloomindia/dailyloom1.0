import {useEffect, useRef} from 'react';

/**
 * Fades `[data-reveal="<delay ms>"]` blocks up as they scroll into view.
 * Runs after hydration and never hides what is already on screen at first
 * load, so a slow connection still shows server-rendered content right away.
 * After a client-side navigation (behind the page curtain) everything on the
 * new page reveals, slightly delayed so the curtain lifts first.
 */
export function useReveal(routeKey: string) {
  const firstRun = useRef(true);

  useEffect(() => {
    const initial = firstRun.current;
    firstRun.current = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute('data-rv', 'in');
          io.unobserve(e.target);
        }),
      {threshold: 0.1, rootMargin: '0px 0px -5% 0px'},
    );

    const pending: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-rv])').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (initial && r.top < window.innerHeight && r.bottom > 0) {
        el.setAttribute('data-rv', 'done');
        return;
      }
      const delay = (Number(el.dataset.reveal) || 0) + (initial ? 0 : 320);
      el.style.setProperty('--rv-d', `${delay}ms`);
      el.setAttribute('data-rv', 'wait');
      pending.push(el);
      io.observe(el);
    });

    // Failsafe: never leave on-screen content hidden if an observer callback is missed.
    const failsafe = window.setTimeout(() => {
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (el.getAttribute('data-rv') === 'wait' && r.top < window.innerHeight && r.bottom > 0) {
          el.setAttribute('data-rv', 'in');
        }
      });
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      pending.forEach((el) => {
        if (el.getAttribute('data-rv') === 'wait') el.setAttribute('data-rv', 'in');
      });
    };
  }, [routeKey]);
}
