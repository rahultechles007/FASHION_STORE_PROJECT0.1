/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./*.html",
    "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
  gold: "#C8A96B",
  goldLight: "#E3C98F",

  beige: "#F5F2EB",
  cream: "#EEE8DD",
  surface: "#F8F6F1",

  premium: "#1E1A17",
  accent: "#2A2522",
  warm: "#3B2F2A",

  paragraph: "#6B7280",

  danger: "#E45858",
  success: "#2FBF71",
}
    },
  },
  plugins: [],
}

