/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/404.html",
    "./views/about.html",
    "./views/home.html",
    "./public/output.css",
    "./public/tailwind.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  content: [
    "./views/**/*.html",
    "./public/**/*.html",
    "./public/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography')
  ],
}
