/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#FEFFFF',
      'black': '#272727',
      'orange': '#FF652F',
      'dark': '#25274D',
      'gray': '#464866',
      'light': '#F2F2F2',
      'errorRed': '#DC2626',
      'googleBlue': '#1D4EB8',
    },
  },
  plugins: [],
}

