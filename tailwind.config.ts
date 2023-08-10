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
        },
      },
    ],
  },
  plugins: [require('rippleui')],
};
export default config;
