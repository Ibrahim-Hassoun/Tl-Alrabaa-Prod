/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#231f20',
        'secondary': '#d5a64c',
        'tertiary': '#f0eeef',
      }
    },
  },
  plugins: [],
}
