import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is the GitHub Pages project subpath (https://ianbenji.github.io/mosaischools/).
// If you later move to a custom domain / Netlify, set this back to '/'.
export default defineConfig({
  base: '/mosaischools/',
  plugins: [react()],
})
