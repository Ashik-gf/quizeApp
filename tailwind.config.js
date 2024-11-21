/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // <uniquifier>: Use a unique and descriptive class name
        jaro: ["Jaro", "sans-serif"],
      }
    },
  },
  plugins: [],
}