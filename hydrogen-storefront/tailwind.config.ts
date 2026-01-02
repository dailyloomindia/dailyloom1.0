import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary - Sage Green
        primary: {
          50: '#f4f7f5',
          100: '#e6ece8',
          200: '#cdd9d0',
          300: '#a8c0ad',
          400: '#8ba892',
          500: '#6B8E72', // Main sage green
          600: '#5A7A61',
          700: '#4a6350',
          800: '#3d5142',
          900: '#344438',
          950: '#1b251d',
        },
        // Cream - Warm off-white
        cream: {
          50: '#FFFDFB',
          100: '#FFF9F3', // Main cream background
          200: '#FEF3E8',
          300: '#FDEBD8',
          400: '#FAE0C4',
          500: '#F5D2AB',
          600: '#E8BC88',
          700: '#D4A066',
          800: '#B8824D',
          900: '#96673D',
          950: '#4D3420',
        },
        // Charcoal - Deep text colors
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666', // Secondary text
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#2B2B2B', // Body text
          950: '#1A1A1A', // Main charcoal
        },
        // Gold - Accent (use sparingly)
        gold: {
          50: '#fdfcf3',
          100: '#fbf7e0',
          200: '#f5ecc0',
          300: '#eddb95',
          400: '#e5c563',
          500: '#D4AF37', // Main gold
          600: '#c59330',
          700: '#a4722a',
          800: '#865b29',
          900: '#6e4b26',
          950: '#3f2712',
        },
        // Teal - Alternative accent
        teal: {
          500: '#2B7A78',
          600: '#236562',
        },
        // Border color
        border: {
          DEFAULT: '#D9CCC4',
          light: '#E8E0D9',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
        sans: ['Inter', 'Helvetica Neue', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.6' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['32px', { lineHeight: '1.3' }],
        '4xl': ['44px', { lineHeight: '1.2' }],
        '5xl': ['56px', { lineHeight: '1.2' }],
        'hero': ['clamp(36px, 5vw, 56px)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(32px, 4vw, 44px)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(24px, 3vw, 32px)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '120': '120px',
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'tighter': '-0.01em',
        'wide': '0.02em',
        'wider': '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      boxShadow: {
        'none': 'none',
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'small': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'large': '0 12px 48px rgba(0, 0, 0, 0.2)',
        'inset': 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'none': '0',
        'subtle': '6px',
        'medium': '8px',
        'large': '12px',
        'full': '9999px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '600ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
