/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/404.ejs",
    "./views/about.ejs",
    "./views/home.ejs",
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
    "./views/**/*.ejs",
    "./public/**/*.ejs",
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
