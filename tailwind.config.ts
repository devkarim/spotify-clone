import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        card: '#242424',
        'section-card': '#181818',
        'section-card-active': '#282828',
        'section-card-secondary': '#282828',
      },
    },
  },
  rippleui: {
    themes: [
      {
        themeName: 'dark',
        colors: {
          primary: '#1DB954',
          secondary: '#ffffff',
          backgroundPrimary: '#000000',
          backgroundSecondary: '#121212',
          error: '#ff0000',
        },
      },
    ],
  },
  plugins: [require('rippleui')],
};
export default config;
