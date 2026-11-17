/** @type {import('tailwindcss').Config} */
export default {
  // Dark theme is switched by a `dark` class on <html> (see ThemeContext).
  darkMode: 'class',
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
        // Crest green (the head-and-pen emblem on the school badge)
        'mosai-green': {
          light: '#E8F5E9',
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
        },
        // ── Crayon-box accents — the kindergarten palette ──
        crayon: {
          sun:   '#FFC93C',   // sunshine yellow
          grass: '#5FBB6E',   // grass green
          sky:   '#6EC6F2',   // sky blue
          coral: '#FF8A6B',   // warm coral
          grape: '#9B7EDE',   // soft purple
        },
        // Page surfaces are CSS variables (src/index.css) so the dark theme can
        // swap them in one place. The light values are unchanged.
        cream: 'rgb(var(--rgb-cream) / <alpha-value>)',      // #FFF8EE warm page background
        // Soft page backgrounds that replace pure white section backgrounds
        // (cards stay white so they still lift off the page).
        mist: {
          DEFAULT: 'rgb(var(--rgb-mist) / <alpha-value>)',      // #F3F6FA, was bg-white
          deep:    'rgb(var(--rgb-mist-deep) / <alpha-value>)', // #EBF0F6, was bg-gray-50
        },
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      keyframes: {
        'doodle-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--doodle-rot, 0deg))' },
          '50%':      { transform: 'translateY(-18px) rotate(var(--doodle-rot, 0deg))' },
        },
        'doodle-wiggle': {
          '0%, 100%': { transform: 'translateY(0) rotate(calc(var(--doodle-rot, 0deg) - 7deg))' },
          '50%':      { transform: 'translateY(-12px) rotate(calc(var(--doodle-rot, 0deg) + 7deg))' },
        },
        'doodle-spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'pop-bounce': {
          '0%, 100%': { transform: 'translateY(0) scale(1) rotate(var(--doodle-rot, 0deg))' },
          '50%':      { transform: 'translateY(-16px) scale(1.08) rotate(var(--doodle-rot, 0deg))' },
        },
      },
      animation: {
        'doodle-float':  'doodle-float 5s ease-in-out infinite',
        'doodle-wiggle': 'doodle-wiggle 3.4s ease-in-out infinite',
        'doodle-spin':   'doodle-spin 20s linear infinite',
        'pop-bounce':    'pop-bounce 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
