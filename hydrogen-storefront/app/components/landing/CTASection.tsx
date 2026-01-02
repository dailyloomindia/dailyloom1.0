import {motion} from 'framer-motion';
import {useInView} from 'framer-motion';
import {useRef, useState} from 'react';
import {Link} from '@remix-run/react';

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {once: true, margin: '-100px'});
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess(true);
    setIsSubmitting(false);
    setEmail('');
  };

  return (
    <section ref={sectionRef} className="bg-charcoal-950">
      {/* Decision Summary */}
      <div className="section-padding">
        <div className="container-luxury">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6}}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-display-lg font-display text-cream-100 font-light mb-8">
              By Choosing Daily Loom, You're Choosing:
            </h2>

            <ul className="space-y-4 text-cream-100 text-lg">
              {[
                '100% pure cotton (zero mixing, zero compromise)',
                'Premium durability (5-7 years of use)',
                'Fabric that improves with time',
                'Support for sustainable farming practices',
                'A ritual, not a commodity',
              ].map((item) => (
                <li key={item} className="flex items-center justify-center gap-3">
                  <span className="text-primary-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <motion.div
              initial={{opacity: 0}}
              animate={isInView ? {opacity: 1} : {}}
              transition={{duration: 0.6, delay: 0.3}}
              className="mt-12"
            >
              <Link
                to="/collections/all"
                className="btn-luxury bg-primary-500 text-cream-100 hover:bg-primary-600"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Email Signup */}
      <div className="py-16 border-t border-charcoal-800">
        <div className="container-luxury">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={isInView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.6, delay: 0.2}}
            className="max-w-xl mx-auto text-center"
          >
            <h3 className="font-display text-2xl text-cream-100 mb-3">
              New to Natural Fabrics?
            </h3>
            <p className="text-cream-200 mb-8">
              Let's guide your journey.
            </p>
            <p className="text-cream-300 text-sm mb-6">
              Sign up for our guide: "How to Transition to Pure Cotton
              and Never Look Back" + 15% off your first order.
            </p>

            {success ? (
              <motion.div
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                className="bg-primary-500/20 text-primary-300 p-4 rounded-medium"
              >
                <p className="font-medium">Welcome to Daily Loom!</p>
                <p className="text-sm mt-1 opacity-80">
                  Check your inbox for your guide and discount code.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-5 py-4 bg-charcoal-900 border border-charcoal-700 text-cream-100 placeholder:text-charcoal-500 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-luxury bg-primary-500 text-cream-100 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Subscribe'}
                </button>
              </form>
            )}

            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}

            <p className="text-charcoal-500 text-xs mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
