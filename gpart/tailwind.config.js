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
      },
      orange: {
        50: '#fff880',
        100: '#ffa500'
      }
    },
  },
  plugins: [require("daisyui")],
}
