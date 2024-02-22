/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        "lift": "3px 3px 6px #bfc3cf, -3px -3px 6px #fff",
        "inner": "inset 3px 3px 3px #cecece, inset -3px -3px 3px #fff"
      },
      colors: {
        "pale-blue": "#071e54",
        "light-gray": "#e8e9ed"
      }
    },
  },
  plugins: [],
}