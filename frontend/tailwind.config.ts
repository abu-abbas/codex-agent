import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(222, 47%, 11%)',
        foreground: 'hsl(210, 40%, 98%)',
        primary: {
          DEFAULT: 'hsl(222, 89%, 63%)',
          foreground: 'hsl(210, 40%, 98%)'
        },
        muted: {
          DEFAULT: 'hsl(215, 25%, 17%)',
          foreground: 'hsl(215, 20%, 65%)'
        },
        accent: 'hsl(160, 84%, 39%)',
        ring: 'hsl(222, 89%, 63%)'
      }
    }
  },
  plugins: []
} satisfies Config;
