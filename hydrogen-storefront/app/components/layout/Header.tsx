import {Link, useLocation} from '@remix-run/react';
import {motion, AnimatePresence} from 'framer-motion';
import {useState, useEffect} from 'react';
import clsx from 'clsx';

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
}

export function Header({shop, cart, menu}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const cartCount = cart?.totalQuantity || 0;

  // Check if we're on the homepage for transparent header
  const isHomepage = location.pathname === '/';

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-subtle'
            : isHomepage
              ? 'bg-transparent'
              : 'bg-cream-100',
        )}
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="relative z-10 flex items-center"
            >
              <motion.div
                whileHover={{scale: 1.02}}
                className="flex items-center"
              >
                <span
                  className={clsx(
                    'font-display text-xl md:text-2xl tracking-widest transition-colors duration-300',
                    isScrolled || !isHomepage
                      ? 'text-charcoal-950'
                      : 'text-cream-100',
                  )}
                >
                  DAILY LOOM
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={new URL(item.url).pathname}
                  isScrolled={isScrolled}
                  isHomepage={isHomepage}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                className={clsx(
                  'p-2 rounded-full transition-colors',
                  isScrolled || !isHomepage
                    ? 'hover:bg-charcoal-100 text-charcoal-900'
                    : 'hover:bg-white/10 text-cream-100',
                )}
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className={clsx(
                  'relative p-2 rounded-full transition-colors',
                  isScrolled || !isHomepage
                    ? 'hover:bg-charcoal-100 text-charcoal-900'
                    : 'hover:bg-white/10 text-cream-100',
                )}
              >
                <CartIcon />
                {cartCount > 0 && (
                  <motion.span
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-cream-100 text-xs flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={clsx(
                  'lg:hidden relative z-10 p-2',
                  isScrolled || !isHomepage
                    ? 'text-charcoal-900'
                    : 'text-cream-100',
                )}
                aria-label="Toggle menu"
              >
                <motion.div className="w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    animate={isMenuOpen ? {rotate: 45, y: 8} : {rotate: 0, y: 0}}
                    className={clsx(
                      'w-full h-0.5 origin-left',
                      isMenuOpen
                        ? 'bg-charcoal-950'
                        : isScrolled || !isHomepage
                          ? 'bg-charcoal-950'
                          : 'bg-cream-100',
                    )}
                  />
                  <motion.span
                    animate={isMenuOpen ? {opacity: 0} : {opacity: 1}}
                    className={clsx(
                      'w-full h-0.5',
                      isMenuOpen
                        ? 'bg-charcoal-950'
                        : isScrolled || !isHomepage
                          ? 'bg-charcoal-950'
                          : 'bg-cream-100',
                    )}
                  />
                  <motion.span
                    animate={isMenuOpen ? {rotate: -45, y: -8} : {rotate: 0, y: 0}}
                    className={clsx(
                      'w-full h-0.5 origin-left',
                      isMenuOpen
                        ? 'bg-charcoal-950'
                        : isScrolled || !isHomepage
                          ? 'bg-charcoal-950'
                          : 'bg-cream-100',
                    )}
                  />
                </motion.div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed inset-0 bg-cream-100 z-40 lg:hidden"
          >
            <motion.nav
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 20}}
              transition={{delay: 0.1, duration: 0.4}}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {menu.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.2 + index * 0.1}}
                >
                  <Link
                    to={new URL(item.url).pathname}
                    className="font-display text-3xl text-charcoal-950 hover:text-primary-600 transition-colors tracking-wide"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile secondary links */}
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.5}}
                className="flex gap-8 mt-8 pt-8 border-t border-charcoal-200"
              >
                <Link to="/account" className="text-sm text-charcoal-600 hover:text-charcoal-950">
                  Account
                </Link>
                <Link to="/pages/contact" className="text-sm text-charcoal-600 hover:text-charcoal-950">
                  Contact
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  to,
  children,
  isScrolled,
  isHomepage,
}: {
  to: string;
  children: React.ReactNode;
  isScrolled: boolean;
  isHomepage: boolean;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={clsx(
        'text-sm tracking-wide uppercase transition-colors relative py-2',
        isScrolled || !isHomepage
          ? isActive
            ? 'text-primary-600'
            : 'text-charcoal-700 hover:text-charcoal-950'
          : isActive
            ? 'text-cream-100'
            : 'text-cream-200 hover:text-cream-100',
      )}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="underline"
          className={clsx(
            'absolute bottom-0 left-0 right-0 h-0.5',
            isScrolled || !isHomepage ? 'bg-primary-500' : 'bg-cream-100',
          )}
        />
      )}
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
