import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-shippori-mincho)', 'serif'],
        serif: ['var(--font-shippori-mincho)', 'serif'],
        'shippori': ['var(--font-shippori-mincho)', 'serif'],
        'japanese': ['var(--font-shippori-mincho)', 'serif'],
        'inter': ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Fluid responsive font sizes
        'fluid-xs': 'clamp(0.75rem, 1.5vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 3.5vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 4vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 5vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 6vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 8vw, 3.75rem)',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function({ addUtilities }: any) {
      const newUtilities = {
        '.fluid-text-xs': {
          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
        },
        '.fluid-text-sm': {
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
        },
        '.fluid-text-base': {
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
        },
        '.fluid-text-lg': {
          fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
        },
        '.fluid-text-xl': {
          fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
        },
        '.fluid-text-2xl': {
          fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
        },
        '.fluid-text-3xl': {
          fontSize: 'clamp(1.875rem, 5vw, 2.25rem)',
        },
        '.fluid-text-4xl': {
          fontSize: 'clamp(2.25rem, 6vw, 3rem)',
        },
        '.fluid-text-5xl': {
          fontSize: 'clamp(3rem, 8vw, 3.75rem)',
        },
        '.fluid-p-sm': {
          padding: 'clamp(0.5rem, 2vw, 1rem)',
        },
        '.fluid-p-md': {
          padding: 'clamp(1rem, 3vw, 2rem)',
        },
        '.fluid-p-lg': {
          padding: 'clamp(1.5rem, 4vw, 3rem)',
        },
        '.fluid-p-xl': {
          padding: 'clamp(2rem, 5vw, 4rem)',
        },
      }
      addUtilities(newUtilities)
    }
  ]
};

export default config;
