/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'jakora-green': '#4a704a',
        'jakora-light-green': '#a3e4b7',
      },
    },
  },
  plugins: [],
}