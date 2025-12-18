/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ds-stone-dark': '#2c2418',
        'ds-stone-medium': '#3a3020',
        'ds-stone-light': '#4a4028',
        'ds-border-gold': '#c8a882',
        'ds-border-dark': '#1a1410',
        'ds-text-gold': '#d4c4a0',
        'ds-text-bright': '#f0e6d0',
        'ds-text-dim': '#a89876',
        'ds-bg-dark': '#16120e',
        'ds-bg-panel': '#1f1a15',
        'ds-accent-red': '#8b4a3c',
        'ds-accent-blue': '#4a6288',
      },
      fontFamily: {
        serif: ['Times New Roman', 'serif'],
      },
      letterSpacing: {
        'wider-sm': '0.3px',
        'wider-md': '0.5px',
        'wider-lg': '1px',
      },
    },
  },
  plugins: [],
};
