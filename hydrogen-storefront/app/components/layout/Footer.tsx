import {Link} from '@remix-run/react';
import {motion} from 'framer-motion';

interface FooterProps {
  shop: {
    name: string;
    description?: string;
  };
}

export function Footer({shop}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      {title: 'Bedding', url: '/collections/bedding'},
      {title: 'Duvet Covers', url: '/collections/duvet-covers'},
      {title: 'Bedsheets', url: '/collections/bedsheets'},
      {title: 'Towels', url: '/collections/towels'},
      {title: 'Pillows', url: '/collections/pillows'},
    ],
    company: [
      {title: 'About Us', url: '/pages/about'},
      {title: 'Our Craft', url: '/pages/craft'},
      {title: 'Sustainability', url: '/pages/sustainability'},
      {title: 'B2B & Wholesale', url: '/pages/wholesale'},
      {title: 'Contact', url: '/pages/contact'},
    ],
    support: [
      {title: 'Shipping & Returns', url: '/pages/shipping'},
      {title: 'Care Guide', url: '/pages/care-guide'},
      {title: 'FAQs', url: '/pages/faqs'},
      {title: 'Track Order', url: '/account/orders'},
    ],
  };

  return (
    <footer className="bg-charcoal-950 text-cream-100">
      {/* Newsletter Section */}
      <div className="border-b border-charcoal-800">
        <div className="container-premium py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              className="font-display text-3xl md:text-4xl text-cream-50 mb-4"
            >
              Join the Daily Loom Family
            </motion.h3>
            <motion.p
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.1}}
              className="text-cream-300 mb-8"
            >
              Subscribe to receive updates on new collections, exclusive offers,
              and stories from our artisans.
            </motion.p>
            <motion.form
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.2}}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-charcoal-900 border border-charcoal-700 rounded-none text-cream-50 placeholder:text-cream-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary-600 text-charcoal-950 font-medium text-sm tracking-wide uppercase hover:bg-primary-500 transition-colors"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-premium py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-2xl text-cream-50">
                Daily <span className="text-primary-400">Loom</span>
              </span>
            </Link>
            <p className="text-sm text-cream-400 leading-relaxed mb-6">
              Handcrafted luxury textiles for your home.
              Pure cotton, timeless design, exceptional comfort.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <SocialLink href="https://instagram.com" label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="https://pinterest.com" label="Pinterest">
                <PinterestIcon />
              </SocialLink>
              <SocialLink href="https://facebook.com" label="Facebook">
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg text-cream-50 mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.url}
                    className="text-sm text-cream-400 hover:text-cream-50 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg text-cream-50 mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.url}
                    className="text-sm text-cream-400 hover:text-cream-50 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg text-cream-50 mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.url}
                    className="text-sm text-cream-400 hover:text-cream-50 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display text-lg text-cream-50 mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-cream-400">
              <li>
                <a
                  href="mailto:hello@dailyloom.com"
                  className="hover:text-cream-50 transition-colors"
                >
                  hello@dailyloom.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+91-XXXXX-XXXXX"
                  className="hover:text-cream-50 transition-colors"
                >
                  +91-XXXXX-XXXXX
                </a>
              </li>
              <li className="text-cream-500">
                India | Worldwide Shipping
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-500">
            <p>© {currentYear} {shop.name}. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/pages/privacy" className="hover:text-cream-50 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/pages/terms" className="hover:text-cream-50 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center border border-charcoal-700 text-cream-400 hover:border-primary-500 hover:text-primary-400 transition-colors"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
