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
      'black': '#17252A',
      'aqua': '#3AAFA9',
      'gray': '#2B7A78',
      'light': '#F2F2F2',
      'errorRed': '#BE185D',
      'googleBlue': '#1D4EB8',
      'backgroundDark': '#1A1A1D',
      'activeCyan': '#66FCF1',
      'activeBackGray': '#4E4E50',
      'notActiveCyan': '#45A29E',
      red: {
        500: '#EF4444',  // Удаление стандартного красного цвета
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
      },
    },
  },
  plugins: [],
}

