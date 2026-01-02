import {Link, useLocation} from '@remix-run/react';
import {motion, AnimatePresence, useScroll, useTransform} from 'framer-motion';
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

  const {scrollY} = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(250, 245, 236, 0)', 'rgba(250, 245, 236, 0.95)'],
  );

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

  return (
    <>
      <motion.header
        style={{backgroundColor: headerBg}}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled && 'backdrop-blur-md shadow-soft',
        )}
      >
        <div className="container-premium">
          <nav className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="relative z-10 flex items-center gap-3"
            >
              <motion.div
                whileHover={{scale: 1.02}}
                className="flex items-center"
              >
                <span className="font-display text-2xl md:text-3xl tracking-tight text-charcoal-950">
                  Daily
                </span>
                <span className="font-display text-2xl md:text-3xl tracking-tight text-primary-600 ml-1">
                  Loom
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {menu.map((item, index) => (
                <NavLink
                  key={item.id}
                  to={new URL(item.url).pathname}
                  index={index}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-6">
              {/* Search */}
              <button
                className="p-2 hover:bg-charcoal-50 rounded-full transition-colors"
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 hover:bg-charcoal-50 rounded-full transition-colors"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <motion.span
                    initial={{scale: 0}}
                    animate={{scale: 1}}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-cream-50 text-xs flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative z-10 p-2"
                aria-label="Toggle menu"
              >
                <motion.div className="w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    animate={isMenuOpen ? {rotate: 45, y: 8} : {rotate: 0, y: 0}}
                    className="w-full h-0.5 bg-charcoal-950 origin-left"
                  />
                  <motion.span
                    animate={isMenuOpen ? {opacity: 0} : {opacity: 1}}
                    className="w-full h-0.5 bg-charcoal-950"
                  />
                  <motion.span
                    animate={isMenuOpen ? {rotate: -45, y: -8} : {rotate: 0, y: 0}}
                    className="w-full h-0.5 bg-charcoal-950 origin-left"
                  />
                </motion.div>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed inset-0 bg-cream-50 z-40 lg:hidden"
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
                    className="font-display text-4xl text-charcoal-950 hover:text-primary-600 transition-colors"
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
                <Link to="/contact" className="text-sm text-charcoal-600 hover:text-charcoal-950">
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
  index,
}: {
  to: string;
  children: React.ReactNode;
  index: number;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      initial={{opacity: 0, y: -10}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: index * 0.1}}
    >
      <Link
        to={to}
        className={clsx(
          'nav-link py-2',
          isActive && 'text-charcoal-950 after:w-full',
        )}
      >
        {children}
      </Link>
    </motion.div>
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
