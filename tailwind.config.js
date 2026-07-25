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
        // ── Crayon-box accents — the kindergarten palette ──
        crayon: {
          sun:   '#FFC93C',   // sunshine yellow
          grass: '#5FBB6E',   // grass green
          sky:   '#6EC6F2',   // sky blue
          coral: '#FF8A6B',   // warm coral
          grape: '#9B7EDE',   // soft purple
        },
        cream: '#FFF8EE',      // warm page background
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
