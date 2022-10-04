/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura:{
          50: '#fff8f8',
        }
      }
    },
  },
  plugins: [],
}
