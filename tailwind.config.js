/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Pathing to all our component files for Tailwind class names
    './src/components/**',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}
