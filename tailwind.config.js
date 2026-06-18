/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mosai-blue': {
          light: '#E8EEF6',
          DEFAULT: '#1E4D8C',
          dark: '#153764',
        },
        'mosai-red': {
          light: '#FFEBEE',
          DEFAULT: '#D32F2F',
          dark: '#B71C1C',
        },
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
