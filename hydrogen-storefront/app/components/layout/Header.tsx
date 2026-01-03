import {Link, useLocation} from '@remix-run/react';
import {useState, useEffect, useCallback} from 'react';

interface HeaderProps {
  shop: {
    name: string;
    brand?: {
      logo?: {
        image?: {
          url: string;
          altText?: string;
        };
      };
    };
  };
  cart: {totalQuantity?: number} | null;
  menu: Array<{
    id: string;
    title: string;
    url: string;
    items?: Array<{id: string; title: string; url: string}>;
  }>;
  logo?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  } | null;
}

export function Header({shop, cart, menu, logo}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shopSubmenuOpen, setShopSubmenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const location = useLocation();

  // Check if we're on the homepage (hero is only on homepage)
  const isHomepage = location.pathname === '/';

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse hover on top 20% of viewport (only on hero)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isHomepage || scrollY > 100) return;

    const viewportHeight = window.innerHeight;
    const topThreshold = viewportHeight * 0.2;

    setIsHoveringTop(e.clientY < topThreshold);
  }, [isHomepage, scrollY]);

  useEffect(() => {
    if (isHomepage && scrollY < 100) {
      window.addEventListener('mousemove', handleMouseMove, {passive: true});
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isHomepage, scrollY, handleMouseMove]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setShopSubmenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const cartCount = cart?.totalQuantity || 0;

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShopSubmenuOpen(false);
  };

  // Get logo URL from metafield or fallback
  const logoUrl = logo?.url || '/logo.png';
  const logoAlt = logo?.altText || 'Daily Loom Logo';

  // Determine visibility
  // On homepage: hidden at top (unless hovering), visible after 100px scroll
  // On other pages: always visible
  const isInHeroZone = isHomepage && scrollY < 100;
  const headerVisible = !isHomepage || scrollY > 100 || isHoveringTop;
  const hasScrolledPastHero = scrollY > window.innerHeight * 0.8;

  // Determine header state classes
  const headerClasses = [
    'header-smart',
    headerVisible ? 'visible' : '',
    !isInHeroZone ? 'solid-bg' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Smart Header - Hidden on hero, visible on scroll/hover */}
      <header className={headerClasses}>
        <div className="header-inner">
          <div className="header-left">
            <Link to="/" className="header-logo-link">
              <div className="header-logo-box">
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className="header-logo-img"
                  width={36}
                  height={36}
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="header-logo-fallback">DL</span>';
                    }
                  }}
                />
              </div>
              <span className="header-brand-text">DAILY LOOM</span>
            </Link>
          </div>

          <div className="header-right">
            {/* Search Icon */}
            <button className="header-icon-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="header-icon-btn header-cart-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="header-cart-count">{cartCount}</span>
              )}
            </Link>

            {/* Hamburger Menu Button */}
            <button
              className="header-icon-btn hamburger-toggle"
              aria-label="Menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      {/* Slide-in Menu */}
      <nav className={`slide-menu ${isMenuOpen ? 'active' : ''}`}>
        <button className="menu-close" onClick={closeMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Shop with Submenu */}
        <div
          className={`menu-link has-submenu ${shopSubmenuOpen ? 'open' : ''}`}
          onClick={() => setShopSubmenuOpen(!shopSubmenuOpen)}
        >
          <span>Shop</span>
          <svg className="submenu-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
        <div className={`submenu-panel ${shopSubmenuOpen ? 'open' : ''}`}>
          <Link to="/collections/bedsheets" className="submenu-link" onClick={closeMenu}>
            Bedsheets
          </Link>
          <Link to="/collections/duvets" className="submenu-link" onClick={closeMenu}>
            Duvets
          </Link>
          <Link to="/collections/towels" className="submenu-link" onClick={closeMenu}>
            Towels
          </Link>
          <Link to="/collections/all" className="submenu-link" onClick={closeMenu}>
            All Collections
          </Link>
        </div>

        <Link to="/pages/about" className="menu-link" onClick={closeMenu}>
          Our Story
        </Link>
        <Link to="/pages/care-guide" className="menu-link" onClick={closeMenu}>
          Care Guides
        </Link>
        <Link to="/pages/contact" className="menu-link" onClick={closeMenu}>
          Contact
        </Link>
        <Link to="/account" className="menu-link" onClick={closeMenu}>
          Account
        </Link>
      </nav>
    </>
  );
}
