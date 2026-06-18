/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./*.html",
    "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        gold: "#C8A96B",
        beige: "#F5F2EB",
        cream: "#EEE8DD",
        premium: "#1E1A17",
        paragraph: "#6B7280",
      }
    },
  },
  plugins: [],
}

