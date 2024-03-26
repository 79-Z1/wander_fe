const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,njk,js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
  corePlugins: {
    preflight: true
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.938rem'
      }
    },
    // screens: Object.fromEntries(Object.entries(defaultTheme.screens).filter(([key]) => key !== '4xl')),
    fontFamily: {
      body: 'var(--font-mulish)',
      nunito: 'var(--font-nunito)',
      roboto: 'var(--font-roboto)',
      display: 'var(--font-lucky-guy)',
      lobster: 'var(--font-lobster)'
    },
    extend: {
      // screens: {
      //   '3xl': '1600px'
      // },
      // https://nekocalc.com/px-to-rem-converter
      boxShadow: {
        'sm-primary': '0 0 5px hsl(var(--primary))',
        'md-primary': '0 0 25px hsl(var(--primary))',
        'lg-primary': '0 0 50px hsl(var(--primary))',
        'xl-primary': '0 0 100px hsl(var(--primary))',
        'xs-white': '0 0 5px hsl(var(--foreground))',
        'sm-white': '0 0 12px hsl(var(--foreground))',
        'md-white': '0 0 25px hsl(var(--foreground))',
        'lg-white': '0 0 50px hsl(var(--foreground))',
        'xl-white': '0 0 100px hsl(var(--foreground))'
      },
      fontSize: {
        none: ['0', '0'],
        hero: ['3.5rem', {lineHeight: '4rem', letterSpacing: '0'}],
        h1: ['4rem', {lineHeight: '5rem', letterSpacing: '0'}], //64/80
        h2: ['3rem', {lineHeight: '3.5rem', letterSpacing: '0'}], //48/56
        h3: ['2.25rem', {lineHeight: '3rem', letterSpacing: '0'}], //36/48
        h4: ['2rem', {lineHeight: '2.25rem', letterSpacing: '0'}], //32/36
        h5: ['1.5rem', {lineHeight: '2rem', letterSpacing: '0'}], //24/32
        h6: ['1.25rem', {lineHeight: '1.75rem', letterSpacing: '0'}], //20/28
        base: ['1rem', {lineHeight: '1.5rem', letterSpacing: '0'}], // 16/24
        base2: ['0.875rem', {lineHeight: '1.375rem', letterSpacing: '0'}], // 14/22
        caption: ['0.625rem', {lineHeight: '1rem', letterSpacing: '0'}] // 10/16
      },
      letterSpacing: {
        4: '0.04em', // -4%
        3: '0.03em', // -3%
        2: '0.02em', // -2%
        1: '0.01em' // -1%
      },
      lineHeight: {
        0: '0'
      },
      colors: {
        // https://javisperez.github.io/tailwindcolorshades/
        'default-border': '#D9D9DB',
        'default-text': '#1A1A1A',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        inputSwitch: 'hsl(var(--input-switch))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#f0f2f5',
          100: '#dfe4eb',
          200: '#b8c1cf',
          300: '#909ab0',
          400: '#4e5573',
          500: '#1e1f38',
          600: '#191a33',
          700: '#101129',
          800: '#0b0b21',
          900: '#06061a',
          950: '#02030f',
          DEFAULT: 'hsl(var(--primary))',
          text: 'hsl(var(--primary-text))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          50: '#f1edf5',
          100: '#e5dfeb',
          200: '#baafc9',
          300: '#9083a8',
          400: '#494169',
          500: '#121125',
          600: '#100f24',
          700: '#0a0a1c',
          800: '#070617',
          900: '#040412',
          950: '#02010a',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      backgroundImage: {
        'gradient-45deg': 'linear-gradient(45deg, var(--tw-gradient-stops))'
      },
      maxWidth: {
        '1/2': '50%',
        '2/3': '66.666667%'
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        drawerbackdrop: '1040',
        drawer: '1045',
        modalbackdrop: '1050',
        modal: '1055',
        popover: '1070',
        tooltip: '1080',
        toast: '1090'
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        top: 'top',
        spacing: 'margin, padding'
      },
      transitionDuration: {
        0: '0ms',
        1500: '1500ms',
        2000: '2000ms'
      },
      transitionTimingFunction: {
        // https://cubic-bezier.com/
        'in-out': 'cubic-bezier(.68,.12,.38,.87)',
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      },
      animation: {
        'h-line': 'hLine 200ms ease-in-out infinite',
        'zoom-in': 'zoomIn 6s',
        'zoom-out': 'zoomOut 6s',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      animationDelay: {
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        hLine: {
          '0%': {width: '0px'},
          '100%': {width: '100%'}
        },
        zoomIn: {
          '0%': {transform: 'translateY(0) scale(1, 1)'},
          '100%': {transform: 'translateY(-20px) scale(1.3, 1.3)'}
        },
        zoomOut: {
          '0%': {transform: 'translateY(-20px) scale(1.3, 1.3)'},
          '100%': {transform: 'translateY(0) scale(1, 1)'}
        },
        'accordion-down': {
          from: {height: 0},
          to: {height: 'var(--radix-accordion-content-height)'}
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: 0}
        }
      },
      flex: {
        2: '2 2 0%',
        '2/3': '0 0 66.66666666666667%',
        '1/3': '0 0 33.33333333333333%'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: theme('maxWidth.full'),
            '--tw-prose-body': theme('colors.gray.300'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            h2: {
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.3')
            },
            h3: {
              marginTop: theme('spacing.4')
            },
            ol: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.3')
            },
            ul: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.3')
            },
            li: {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.1')
            },
            p: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.3')
            }
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    plugin(function ({addUtilities, theme, e}) {
      const animationDelayValues = theme('animationDelay');

      addUtilities(
        Object.entries(animationDelayValues).map(([key, value]) => {
          return {
            [`.${e(`animate-delay-${key}`)}`]: {animationDelay: `${value}`}
          };
        })
      );
      addUtilities({
        '.invalid': {
          fontSize: theme('fontSize.xs'),
          color: theme('colors.red.500'),
          fontStyle: 'italic',
          marginTop: theme('spacing.1')
        },
        '.overflow-initial': {
          overflow: 'initial'
        },
        '.pointer-events-all': {
          pointerEvents: 'all'
        }
      });
    })
  ]
};
