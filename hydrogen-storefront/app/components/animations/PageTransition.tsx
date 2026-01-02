import {motion, AnimatePresence} from 'framer-motion';
import {useLocation} from '@remix-run/react';
import type {ReactNode} from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function PageTransition({children}: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Reusable animation variants for sections
export const fadeInUp = {
  initial: {opacity: 0, y: 30},
  animate: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]},
  },
};

export const fadeIn = {
  initial: {opacity: 0},
  animate: {
    opacity: 1,
    transition: {duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]},
  },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideInLeft = {
  initial: {opacity: 0, x: -50},
  animate: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]},
  },
};

export const slideInRight = {
  initial: {opacity: 0, x: 50},
  animate: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94]},
  },
};

export const scaleIn = {
  initial: {opacity: 0, scale: 0.95},
  animate: {
    opacity: 1,
    scale: 1,
    transition: {duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94]},
  },
};

// Parallax scroll effect hook helper
export const parallaxVariants = (offset: number = 50) => ({
  initial: {y: 0},
  animate: (scrollY: number) => ({
    y: scrollY * offset * -0.001,
  }),
});
