import {motion, useScroll, useTransform} from 'framer-motion';
import {useRef, useEffect, useState} from 'react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] max-h-[1200px] w-full overflow-hidden"
      style={{height: '100vh'}}
    >
      {/* Background Video/Image Placeholder */}
      <motion.div
        style={{y: backgroundY}}
        className="absolute inset-0 w-full h-[120%]"
      >
        <div className="video-placeholder w-full h-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <span className="text-charcoal-400 text-sm uppercase tracking-wider mb-2">
              Video Placeholder
            </span>
            <span className="text-charcoal-500 text-xs max-w-md">
              Macro photography of pristine cotton threads with soft golden hour lighting
            </span>
          </div>
        </div>
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="hero-overlay absolute inset-0 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{opacity: textOpacity}}
        className="relative z-10 h-full flex flex-col justify-between"
      >
        {/* Main content - positioned top-right */}
        <div className="flex-1 flex items-start justify-end pt-32 md:pt-40 px-10 md:px-16 lg:px-20">
          <div className="text-center max-w-lg">
            {/* Brand Name */}
            <motion.h1
              initial={{opacity: 0, scale: 1.05}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1]}}
              className="font-display text-hero text-cream-100 font-light tracking-tighter mb-4"
            >
              DAILY LOOM
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 0.7}}
              transition={{duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1]}}
              className="font-display text-base md:text-lg text-cream-100 italic"
            >
              Experience Natural Luxury
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator - bottom center */}
        <motion.div
          style={{opacity: scrollIndicatorOpacity}}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.8, duration: 0.6}}
            className="scroll-indicator"
          >
            <span className="text-cream-100 text-xs uppercase tracking-wider opacity-60 mb-3">
              Scroll to Discover
            </span>
            <motion.div
              className="scroll-arrow text-cream-100 opacity-60"
              aria-hidden="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
