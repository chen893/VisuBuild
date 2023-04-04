/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#4B5563',
      },
      width: {
        '450': '450px',
      },
    },
  },
  plugins: [],
}

