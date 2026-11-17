import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/* Light / dark theme.
 *
 * `preference` is what the visitor chose: 'light', 'dark', or 'system' (the
 * default, which follows the device). `theme` is what is actually showing.
 * The choice is kept in localStorage; a small script in index.html applies
 * it before React loads, so the page never flashes the wrong theme. */

const STORAGE_KEY = 'mosai.theme'
const ThemeContext = createContext(null)

function readPreference() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : 'system'
  } catch {
    return 'system'                      // private mode or storage blocked
  }
}

function systemTheme() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function apply(theme) {
  const root = document.documentElement
  // Switch instantly, without every colour transition on the page firing.
  root.classList.add('theme-switching')
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')))
}

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(readPreference)
  const [system, setSystem] = useState(systemTheme)
  const theme = preference === 'system' ? system : preference

  // Follow the device when the visitor has not chosen.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const onChange = (e) => setSystem(e.matches ? 'dark' : 'light')
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => { apply(theme) }, [theme])

  const choose = useCallback((next) => {
    setPreference(next)
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, next)
    } catch { /* storage unavailable: the choice lasts for this visit */ }
  }, [])

  // The toggle flips between light and dark; it records an explicit choice.
  const toggle = useCallback(() => choose(theme === 'dark' ? 'light' : 'dark'), [choose, theme])

  return (
    <ThemeContext.Provider value={{ theme, preference, choose, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
