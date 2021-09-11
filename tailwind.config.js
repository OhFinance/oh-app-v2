// @ts-check
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  important: true,
  mode: 'jit',
  darkMode: 'class',
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx'],
    options: {
      safelist: ['dark'], //specific classes
    },
  },
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.teal,
        gray: colors.trueGray,
        siteBG1: {
          light: 'rgba(248,249,250,1) 0%',
          DEFAULT: 'rgba(38,0,20,1) 0%',
          dark: 'rgba(38,0,20,1) 0%',
        },
        siteBG2: {
          light: 'rgba(0,156,226,0.19791666666666663) 64%',
          DEFAULT: 'rgba(13,0,6,1) 100%)',
          dark: 'rgba(13,0,6,1) 100%)',
        },
        siteBG3: {
          light: 'rgba(255,255,255,0.3) 100%',
          DEFAULT: 'rgba(13,0,6,1) 100%)',
          dark: 'rgba(13,0,6,1) 100%)',
        },
        siteBG4: {
          light: 'rgb(248,249,250)',
          DEFAULT: 'rgb(38,0,20)',
          dark: 'rgb(38,0,20)',
        },
        modalAccent: {
          light: '#ccebf9',
          DEFAULT: '#1c1019',
          dark: '#1c1019',
        },
        modalAccentHover: {
          light: '#9bcae0',
          DEFAULT: '#2d1a28',
          dark: '#2d1a28',
        },
        modalBG: {
          light: '#f5c8e4',
          DEFAULT: '#111113',
          dark: '#111113',
        },
        modalBGHover: {
          light: '#f1a5d4',
          DEFAULT: '#222227',
          dark: '#222227',
        },
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code:before': {
              content: 'none',
            },
            'code:after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  future: {
    purgeLayersByDefault: true,
  },
};
