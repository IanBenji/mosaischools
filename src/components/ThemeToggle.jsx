import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

/* Light / dark switch. `onDark` is for when it sits over a photo or a dark
 * header (white icon); otherwise it takes the navbar's normal colours. */
export default function ThemeToggle({ onDark = false, className = '' }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={dark}
      title={label}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mosai-red/50 ${
        onDark ? 'text-white hover:bg-white/15' : 'text-mosai-blue-dark hover:bg-mosai-blue-light'
      } ${className}`}
    >
      {dark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  )
}
