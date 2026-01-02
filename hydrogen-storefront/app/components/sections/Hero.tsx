import {Link} from '@remix-run/react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useRef, lazy, Suspense} from 'react';
import {fadeInUp, staggerContainer} from '~/components/animations/PageTransition';

// Lazy load the 3D scene for better performance
const FabricScene = lazy(() =>
  import('~/components/three/FabricScene').then((mod) => ({default: mod.FabricScene})),
);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50"
    >
      {/* 3D Background */}
      <motion.div
        style={{y, opacity}}
        className="absolute inset-0 pointer-events-none"
      >
        <Suspense fallback={<FallbackBackground />}>
          <FabricScene className="absolute inset-0 opacity-60" />
        </Suspense>
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream-50/90 via-cream-50/50 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="container-premium relative z-10 pt-32 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
        >
          {/* Tagline */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-xs tracking-extra-wide uppercase font-medium">
              Handcrafted Excellence
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-hero font-display text-charcoal-950 mb-8"
          >
            <span className="block">The Art of</span>
            <span className="block text-primary-600">Handloom Living</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-charcoal-600 leading-relaxed mb-10 max-w-xl"
          >
            Discover the luxury of 100% pure cotton textiles, meticulously woven by skilled artisans.
            Experience unparalleled comfort and timeless elegance in every thread.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4"
          >
            <Link to="/collections/all" className="btn-primary">
              Explore Collection
            </Link>
            <Link to="/pages/our-craft" className="btn-secondary">
              Our Story
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 pt-10 border-t border-charcoal-200"
          >
            <div className="grid grid-cols-3 gap-8">
              {[
                {label: 'Pure Cotton', value: '100%'},
                {label: 'Happy Customers', value: '10K+'},
                {label: 'Countries', value: '25+'},
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.8 + index * 0.1}}
                  className="text-center md:text-left"
                >
                  <span className="block text-3xl md:text-4xl font-display text-charcoal-950 mb-1">
                    {stat.value}
                  </span>
                  <span className="text-sm text-charcoal-500 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.5}}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="scroll-indicator">
          <span className="text-2xs uppercase tracking-extra-wide text-charcoal-500 mb-2">
            Scroll
          </span>
          <div className="scroll-indicator-line" />
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 0.3, scale: 1}}
        transition={{delay: 1, duration: 1}}
        className="absolute right-10 top-1/3 w-64 h-64 bg-primary-200 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 0.2, scale: 1}}
        transition={{delay: 1.2, duration: 1}}
        className="absolute left-1/4 bottom-1/4 w-48 h-48 bg-gold-200 rounded-full blur-3xl pointer-events-none"
      />
    </section>
  );
}

function FallbackBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-primary-50 opacity-50">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-96 h-96 bg-gradient-radial from-primary-100 to-transparent rounded-full blur-2xl"
        />
      </div>
    </div>
  );
}
