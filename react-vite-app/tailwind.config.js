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
      'backgroundDark': '#1A1A1D',
      'activeCyan': '#66FCF1',
      'activeBackGray': '#4E4E50',
      'notActiveCyan': '#45A29E',
    },
  },
  plugins: [],
}

