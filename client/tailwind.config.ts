import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      light: '#fff',
      dark: '#000',
      neutral: {
        100: '#f8f9fa',
        200: '#e9ecef',
        300: '#dee2e6',
        400: '#ced4da',
        500: '#adb5bd',
        600: '#868e96',
        700: '#495057',
        800: '#343a40',
        900: '#212529',
      },
      primary: {
        100: '#e2f2ff',
        200: '#b6e0ff',
        300: '#80cfff',
        400: '#4da6ff',
        500: '#0070f3',
        600: '#0052cc',
        700: '#003da6',
        800: '#002d80',
        900: '#001d59',
      },
      secondary: {
        100: '#ffdbf8',
        200: '#ffafe8',
        300: '#ff7fdb',
        400: '#ff4fc1',
        500: '#ff0080',
        600: '#cc0066',
        700: '#a60052',
        800: '#800040',
        900: '#59002d',
      },
      red: {
        100: '#ffe3e3',
        200: '#ff8f8f',
        300: '#ff4c4c',
        400: '#ff0000',
        500: '#cc0000',
        600: '#990000',
        700: '#660000',
        800: '#330000',
        900: '#000000',
      },
      link: {
        100: '#e2f2ff',
        200: '#b6e0ff',
        300: '#80cfff',
        400: '#4da6ff',
        500: '#0070f3',
        600: '#0052cc',
        700: '#003da6',
        800: '#002d80',
        900: '#001d59',
      },
    },
  },
  plugins: [],
};
export default config;
