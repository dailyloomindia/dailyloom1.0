import React, { useState, useEffect } from 'react';

/**
 * Centered Navigation Link Component
 * Logic is structured for a Shopify Headless environment.
 */
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-[12px] font-normal tracking-[0.02em] text-[#2B2B2B]/80 hover:text-[#2B2B2B] transition-colors duration-[180ms] relative group py-1 no-underline uppercase font-sans"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#6B8E72] scale-x-0 group-hover:scale-x-100 transition-transform duration-[180ms] origin-center" />
  </a>
);

/**
 * Apple-style Bag Icon SVG
 */
const BagIcon = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    width={size}
    height={size}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

/**
 * Apple-style 2-line Hamburg Icon SVG
 */
const MenuIcon = ({ className, size = 22 }: { className?: string; size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2" 
    strokeLinecap="round" 
    className={className}
    width={size}
    height={size}
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
  </svg>
);

interface HeaderProps {
  shop: { name: string };
  cart: { totalQuantity?: number } | null;
  logo?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  } | null;
}

export function Header({ shop, cart, logo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setCurrentPath(window.location.pathname);
    
    const handleScroll = () => {
      // Show header immediately on scroll
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const cartCount = cart?.totalQuantity || 0;
  
  // Logic: 
  // - On Homepage: Only show when scrolled.
  // - On other pages: Always show.
  const isHomepage = currentPath === '/' || currentPath === null;
  const shouldBeVisible = hasMounted && (!isHomepage || isScrolled);

  const LogoMark = () => (
    <a
      href="/"
      className="flex items-center justify-center w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-[3px] overflow-hidden transition-all duration-[160ms] ease-out hover:opacity-70 cursor-pointer no-underline group"
    >
      {logo?.url ? (
        <img 
          src={logo.url} 
          alt={logo.altText || shop.name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#6B8E72] flex items-center justify-center">
          <span className="text-[#FFF9F3] text-[9px] md:text-[10px] font-semibold tracking-tighter uppercase font-sans">
            DL
          </span>
        </div>
      )}
    </a>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between bg-[rgba(255,249,243,0.92)] backdrop-blur-[15px] border-b border-[rgba(0,0,0,0.05)] h-[44px] px-4 md:px-6 transition-all duration-[400ms] ease-out ${
          shouldBeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{ WebkitBackdropFilter: 'blur(15px)' }}
      >
        <div className="flex items-center justify-center w-full max-w-[1100px] mx-auto relative h-full">
          
          {/* MOBILE: Logo (Left) | Utility Cluster (Right) */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Logo (Extreme Left) */}
            <LogoMark />

            {/* Utility Cluster (Extreme Right) */}
            <div className="flex items-center gap-4">
              {/* Bag Icon - Kept at 20px as per perfect mobile view */}
              <a
                href="/cart"
                className="relative text-[#2B2B2B]/80 hover:text-[#2B2B2B] no-underline flex items-center p-1"
              >
                <BagIcon size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-[0px] -right-[1px] w-[10px] h-[10px] bg-[#6B8E72] text-white text-[7px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>

              {/* Hamburger (Extreme Right after Bag) - Kept at 22px */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-[#2B2B2B]/80 hover:text-[#2B2B2B] bg-transparent border-none cursor-pointer p-1 flex items-center"
              >
                <MenuIcon size={22} />
              </button>
            </div>
          </div>

          {/* DESKTOP: Centered Cluster (Logo | Links | Bag) */}
          <div className="hidden lg:flex items-center justify-center w-full gap-10">
            {/* Logo */}
            <LogoMark />

            {/* Links */}
            <NavLink href="/collections/all">Store</NavLink>
            <NavLink href="/collections/bedsheets">Bedsheets</NavLink>
            <NavLink href="/collections/duvets">Duvets</NavLink>
            <NavLink href="/collections/towels">Towels</NavLink>

            {/* Bag - Reduced to 17px to match 12px nav text scale */}
            <a
              href="/cart"
              className="relative text-[#2B2B2B]/80 hover:text-[#6B8E72] transition-all duration-[160ms] ease-out no-underline flex items-center p-1"
            >
              <BagIcon size={17} />
              {cartCount > 0 && (
                <span className="absolute top-[0px] -right-[1px] min-w-[11px] h-[11px] px-[2px] bg-[#6B8E72] text-[#FFF9F3] text-[7px] font-bold rounded-full flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/10 z-[1100] backdrop-blur-[2px]" onClick={() => setIsMenuOpen(false)} />
          <nav className="fixed top-0 left-0 bottom-0 w-full max-w-[300px] bg-[#FFF9F3] z-[1200] p-8 shadow-xl flex flex-col transition-transform duration-350 ease-out">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-[#666666] bg-transparent border-none cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="mt-10 flex flex-col gap-6">
              {[
                { title: 'Store', href: '/collections/all' },
                { title: 'Home', href: '/' },
                { title: 'Bedsheets', href: '/collections/bedsheets' },
                { title: 'Duvets', href: '/collections/duvets' },
                { title: 'Towels', href: '/collections/towels' }
              ].map((link) => (
                <a key={link.href} href={link.href} className="text-[15px] font-normal tracking-[0.03em] text-[#2B2B2B] no-underline border-b border-[rgba(0,0,0,0.03)] pb-3" onClick={() => setIsMenuOpen(false)}>
                  {link.title}
                </a>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}