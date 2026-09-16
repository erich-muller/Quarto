/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#02160E',        // Verde Escuro oficial
          light: '#1FA05C',       // Verde Claro oficial
          white: '#EAEAEA',       // Branco oficial
          accent: '#1FA05C',
          'accent-hover': '#26BD6E',
          'accent-dark': '#157B45',
          // Superfícies tema escuro
          'surface-dark': '#052418',
          'surface-dark-elevated': '#0A3323',
          'border-dark': '#134B34',
          'muted-dark': '#8BA698',
          // Superfícies tema claro
          'bg-light': '#F7FAF8',
          'surface-light': '#FFFFFF',
          'surface-light-elevated': '#EAEAEA',
          'border-light': '#D1DDD6',
          'muted-light': '#4A6256',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'inherit',
            a: {
              color: theme('colors.brand.light'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.brand.accent-hover'),
                textDecoration: 'underline',
              },
            },
            h1: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '700',
              letterSpacing: '-0.02em',
              borderBottomWidth: '1px',
              borderBottomColor: 'currentColor',
              borderBottomOpacity: '0.15',
              paddingBottom: '0.35rem',
            },
            h3: {
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '600',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftColor: theme('colors.brand.light'),
              borderLeftWidth: '3px',
              quotes: 'none',
            },
            table: {
              fontSize: '0.925rem',
            },
            th: {
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

