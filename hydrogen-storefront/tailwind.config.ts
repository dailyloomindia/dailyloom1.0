import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium earthy palette for handloom brand
        primary: {
          50: '#faf8f5',
          100: '#f4f0e8',
          200: '#e8dfd0',
          300: '#d8c9ae',
          400: '#c5ae8a',
          500: '#b5976d',
          600: '#a78259',
          700: '#8c6a4a',
          800: '#735741',
          900: '#5f4937',
          950: '#33261c',
        },
        // Warm cream/off-white for backgrounds
        cream: {
          50: '#fefdfb',
          100: '#fdfaf5',
          200: '#faf5ec',
          300: '#f5ede0',
          400: '#ede1ce',
          500: '#e2d1b8',
          600: '#d4be9e',
          700: '#c2a67e',
          800: '#a88a5e',
          900: '#8a6f4a',
          950: '#473825',
        },
        // Deep charcoal for text
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#1a1a1a',
        },
        // Accent gold for premium touches
        gold: {
          50: '#fdfcf3',
          100: '#fbf7e0',
          200: '#f5ecc0',
          300: '#eddb95',
          400: '#e5c563',
          500: '#dbb040',
          600: '#c59330',
          700: '#a4722a',
          800: '#865b29',
          900: '#6e4b26',
          950: '#3f2712',
        },
        // Sage green for organic/natural feel
        sage: {
          50: '#f6f7f4',
          100: '#e9ece4',
          200: '#d4d9c9',
          300: '#b7bfa7',
          400: '#98a383',
          500: '#7b8967',
          600: '#606d50',
          700: '#4c5641',
          800: '#3f4637',
          900: '#363c30',
          950: '#1b1f18',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', {lineHeight: '0.875rem'}],
        hero: ['clamp(3rem, 8vw, 6rem)', {lineHeight: '1.1', letterSpacing: '-0.02em'}],
        'display-lg': ['clamp(2.5rem, 5vw, 4rem)', {lineHeight: '1.2', letterSpacing: '-0.02em'}],
        'display-md': ['clamp(2rem, 4vw, 3rem)', {lineHeight: '1.2', letterSpacing: '-0.01em'}],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'extra-wide': '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fabric-wave': 'fabricWave 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        fadeUp: {
          '0%': {opacity: '0', transform: 'translateY(30px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        slideInLeft: {
          '0%': {opacity: '0', transform: 'translateX(-50px)'},
          '100%': {opacity: '1', transform: 'translateX(0)'},
        },
        slideInRight: {
          '0%': {opacity: '0', transform: 'translateX(50px)'},
          '100%': {opacity: '1', transform: 'translateX(0)'},
        },
        scaleIn: {
          '0%': {opacity: '0', transform: 'scale(0.95)'},
          '100%': {opacity: '1', transform: 'scale(1)'},
        },
        float: {
          '0%, 100%': {transform: 'translateY(0px)'},
          '50%': {transform: 'translateY(-20px)'},
        },
        shimmer: {
          '0%': {transform: 'translateX(-100%)'},
          '100%': {transform: 'translateX(100%)'},
        },
        fabricWave: {
          '0%, 100%': {transform: 'rotate(-1deg) scale(1)'},
          '50%': {transform: 'rotate(1deg) scale(1.02)'},
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'texture-linen': "url('/textures/linen-texture.png')",
        'gradient-premium': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
        'premium-lg': '0 35px 60px -15px rgba(0, 0, 0, 0.15)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
