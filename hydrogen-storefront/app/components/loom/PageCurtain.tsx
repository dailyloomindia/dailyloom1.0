import {useEffect, useRef} from 'react';
import {useLocation, useNavigation} from '@remix-run/react';

const EASE = 'cubic-bezier(.76,0,.24,1)';
const UP = 'translateY(calc(-100% - 48px))';
const DOWN = 'translateY(calc(100% + 48px))';

type Phase = 'up' | 'covering' | 'covered' | 'lifting';

/**
 * The jacquard curtain from the design: it drops while the next page's data
 * loads and lifts once it has rendered, so a slow network shows a calm branded
 * screen instead of a half-updated page. Only fires for a change of page
 * (not for ?variant= tweaks or bag updates) and never under reduced motion.
 */
export function PageCurtain() {
  const navigation = useNavigation();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const phase = useRef<Phase>('up');
  const liftWanted = useRef(false);
  const coverAnim = useRef<Animation | null>(null);

  const lift = () => {
    const el = ref.current;
    if (!el) return;
    phase.current = 'lifting';
    liftWanted.current = false;
    window.setTimeout(() => {
      const anim = el.animate([{transform: 'translateY(0)'}, {transform: DOWN}], {
        duration: 760,
        easing: EASE,
        fill: 'forwards',
      });
      coverAnim.current?.cancel();
      coverAnim.current = null;
      const done = () => {
        anim.cancel();
        phase.current = 'up';
      };
      anim.finished.then(done, done);
    }, 220);
  };

  const target = navigation.location?.pathname;
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.animate !== 'function') return;
    if (navigation.state === 'idle' || !target || target === location.pathname) return;
    if (phase.current !== 'up') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    phase.current = 'covering';
    const anim = el.animate([{transform: UP}, {transform: 'translateY(0)'}], {
      duration: 560,
      easing: EASE,
      fill: 'forwards',
    });
    coverAnim.current = anim;
    const covered = () => {
      if (phase.current !== 'covering') return;
      phase.current = 'covered';
      if (liftWanted.current) lift();
    };
    anim.finished.then(covered, covered);
  }, [navigation.state, target, location.pathname]);

  useEffect(() => {
    if (navigation.state !== 'idle') return;
    if (phase.current === 'covered') lift();
    else if (phase.current === 'covering') liftWanted.current = true;
  }, [navigation.state]);

  return (
    <div ref={ref} className="lm-curtain" aria-hidden="true">
      <div className="lm-curtain__badge">
        <img src="/images/v3/logo-mark-128.webp" alt="" width={120} height={128} />
        <span>DAILY LOOM</span>
      </div>
    </div>
  );
}
