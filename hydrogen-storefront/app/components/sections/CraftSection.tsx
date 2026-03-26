import {Link} from '@remix-run/react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useRef} from 'react';
import {fadeInUp, slideInLeft, slideInRight} from '~/components/animations/PageTransition';

export function CraftSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const craftPoints = [
    {
      title: 'Handwoven Excellence',
      description:
        'Each piece is crafted by skilled artisans using traditional techniques passed down through generations.',
    },
    {
      title: '100% Pure Cotton',
      description:
        'We source only the finest quality cotton, ensuring exceptional softness and durability in every product.',
    },
    {
      title: 'Sustainable Practices',
      description:
        'Our commitment to the environment means eco-friendly processes and natural dyes wherever possible.',
    },
  ];

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal-950" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{once: true}}
            className="relative"
          >
            <motion.div
              variants={slideInLeft}
              style={{y: y1}}
              className="relative aspect-[4/5] max-w-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-cream-200 -rotate-3" />
              <div className="absolute inset-4 bg-cream-100">
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gradient-to-br from-cream-200 to-primary-100 flex items-center justify-center">
                  <span className="text-primary-400 font-display text-2xl">Artisan at Work</span>
                </div>
              </div>
            </motion.div>

            {/* Secondary image */}
            <motion.div
              variants={slideInRight}
              style={{y: y2}}
              className="absolute -bottom-8 -right-8 md:right-0 w-48 md:w-64 aspect-square"
            >
              <div className="absolute inset-0 bg-primary-600 rotate-3" />
              <div className="absolute inset-2 bg-cream-50">
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-gold-100 flex items-center justify-center">
                  <span className="text-primary-500 font-display text-lg text-center px-4">
                    Detail Shot
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{once: true}}
            className="lg:pl-8"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-2xs uppercase tracking-extra-wide text-primary-400 mb-4"
            >
              Our Craft
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="font-display text-display-lg text-cream-50 mb-6"
            >
              Where Tradition
              <span className="block text-primary-400">Meets Luxury</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-cream-300 leading-relaxed mb-10"
            >
              At Daily Loom, every thread tells a story. Our artisans combine centuries-old
              handloom techniques with contemporary design to create textiles that are
              both beautiful and built to last.
            </motion.p>

            {/* Features */}
            <div className="space-y-8 mb-10">
              {craftPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  variants={fadeInUp}
                  custom={index}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary-500 flex items-center justify-center">
                    <span className="text-primary-400 text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-cream-50 mb-1">{point.title}</h3>
                    <p className="text-sm text-cream-400">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp}>
              <Link
                to="/pages/our-craft"
                className="inline-flex items-center gap-2 px-8 py-4 border border-cream-50 text-cream-50 text-sm uppercase tracking-wide hover:bg-cream-50 hover:text-charcoal-950 transition-colors"
              >
                Discover Our Process
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
