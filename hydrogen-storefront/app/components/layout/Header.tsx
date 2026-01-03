import {Link, useLocation} from '@remix-run/react';
import {useState, useEffect} from 'react';

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
  const location = useLocation();

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

  return (
    <>
      {/* Fixed Header */}
      <header className="header-fixed">
        <div className="header-left">
          <Link to="/" className="header-logo-link">
            <div className="header-logo-box">
              <img
                src={logoUrl}
                alt={logoAlt}
                className="header-logo-img"
                width={40}
                height={40}
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
            <div className="header-brand-info">
              <h1 className="header-brand-name">DAILY LOOM</h1>
              <p className="header-brand-tagline">Handcrafted Luxury Textiles</p>
            </div>
          </Link>
        </div>

        <div className="header-right">
          {/* Search Icon */}
          <button className="header-icon" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="header-icon header-cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span className="header-cart-badge">{cartCount}</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="header-icon hamburger-btn"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile/Hamburger Menu */}
      <nav className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <button className="menu-close-btn" onClick={closeMenu} aria-label="Close menu">
          ×
        </button>

        {/* Shop with Submenu */}
        <div
          className={`menu-item submenu-toggle ${shopSubmenuOpen ? 'open' : ''}`}
          onClick={() => setShopSubmenuOpen(!shopSubmenuOpen)}
        >
          <span>Shop</span>
          <span className="submenu-arrow">›</span>
        </div>
        <div className={`submenu ${shopSubmenuOpen ? 'open' : ''}`}>
          <Link to="/collections/bedsheets" className="menu-item submenu-item" onClick={closeMenu}>
            Bedsheets
          </Link>
          <Link to="/collections/duvets" className="menu-item submenu-item" onClick={closeMenu}>
            Duvets
          </Link>
          <Link to="/collections/towels" className="menu-item submenu-item" onClick={closeMenu}>
            Towels
          </Link>
          <Link to="/collections/all" className="menu-item submenu-item" onClick={closeMenu}>
            All Collections
          </Link>
        </div>

        <Link to="/pages/about" className="menu-item" onClick={closeMenu}>
          Our Story
        </Link>
        <Link to="/pages/care-guide" className="menu-item" onClick={closeMenu}>
          Care Guides
        </Link>
        <Link to="/pages/contact" className="menu-item" onClick={closeMenu}>
          Contact
        </Link>
        <Link to="/account" className="menu-item" onClick={closeMenu}>
          Account
        </Link>
      </nav>
    </>
  );
}
