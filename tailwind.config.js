/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: 'var(--color-main)',
        "text-base": 'var(--color-text-base)',
        "text-inverted": 'var(--color-text-inverted)',
        "text-muted": 'var(--color-text-muted)',
        fill: 'var(--color-fill)',
        "fill-secondary": "var(--color-fill-secondary)",
        "button-accent": 'var(--color-button-accent)',
        "button-muted": 'var(--color-button-muted)',
        "button-accent-hover": 'var(--color-button-accent-hover)',

        'darkYellow': '#f8bb45',
        'lightGray': '#cecfd1',
        'paleBlack': '#4c412c',
        'orange': '#ff7849',
        'paleBrown': '#be9357',
        'yellow': '#ffc82c',
        'grayDark': '#273444',
        'sunGlow': '#ffcc33',
        'charcoal': '#101820ff',
        'yellowbg': '#f49e0b',
        'textblack': '#453b00',
        'textwhite': '#fffbf6',
        'textyellow': '#ffb400',

        gray: {
          '100': '#F8F8F8',
          '200': '#E0E0E0',
          '300': '#C8C8C8',
          '400': '#888888',
          '500': '#707070',
          '600': '#505050',
          '700': '#383838',
          '800': '#282828',
          '900': '#101010',
        },
        textColor: {
          skin: {
            base: 'var(--color-text-base)',
            muted: 'var(--color-text-muted)',
            inverted: 'var(--color-text-inverted)',
            fill: '--color-fill: #f49e0b'
          }
        },
        backgroundColor: {
          skin: {
             fill: 'var(--color-fill)',
            'button-accent': 'var(--color-button-accent)',
            'button-accent-hover': 'var(--color-button-accent-hover)',
            'button-muted': 'var(--color-button-muted)',
          },
        },
        gradientColorStops:{
          skin:{
            hue: 'var(--color-fill)'
          }
        }
      },

    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],

}

