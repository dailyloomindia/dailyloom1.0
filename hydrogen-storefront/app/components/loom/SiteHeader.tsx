import {useEffect, useRef} from 'react';
import {Link, NavLink} from '@remix-run/react';
import {useBag} from './Bag';

export interface NavItem {
  title: string;
  href: string;
  external: boolean;
}

export function SiteHeader({nav, bagCount}: {nav: NavItem[]; bagCount: number}) {
  const {setOpen} = useBag();
  const bagRef = useRef<HTMLButtonElement>(null);
  const prevCount = useRef(bagCount);

  useEffect(() => {
    const el = bagRef.current;
    if (bagCount > prevCount.current && el?.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.animate(
        [{transform: 'scale(1)'}, {transform: 'scale(1.22)'}, {transform: 'scale(.96)'}, {transform: 'scale(1)'}],
        {duration: 620, easing: 'cubic-bezier(.2,.7,.2,1)'},
      );
    }
    prevCount.current = bagCount;
  }, [bagCount]);

  return (
    <header className="lm-header">
      <Link to="/" className="lm-brand" aria-label="Daily Loom home">
        <img src="/images/v3/logo-mark-64.webp" alt="" width={60} height={64} />
        <span>Daily Loom</span>
      </Link>
      <nav className="lm-nav" aria-label="Shop">
        {nav.map((item) =>
          item.external ? (
            <a key={item.href} href={item.href} rel="noopener">
              {item.title}
            </a>
          ) : (
            <NavLink key={item.href} to={item.href} prefetch="intent">
              {item.title}
            </NavLink>
          ),
        )}
      </nav>
      <button ref={bagRef} type="button" className="lm-bag-btn" aria-label={`Bag, ${bagCount} items`} onClick={() => setOpen(true)}>
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <path d="M2.5 6.5h13l-1 12h-11l-1-12Z" />
          <path d="M6 6.5V5a3 3 0 0 1 6 0v1.5" />
        </svg>
        {bagCount > 0 && <span className="lm-bag-count">{bagCount}</span>}
      </button>
    </header>
  );
}
