/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          orange: '#FF8C42',
          brown: '#8B4513',
          beige: '#F5DEB3',
          cream: '#FFF8DC',
        },
      },
    },
  },
  plugins: [],
}
