import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* New page → start at the top, unless the link names a section (/admissions#fees),
 * in which case scroll to that section once it has rendered. */
export default function ScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    let tries = 0
    let timer
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView({ block: 'start' })
      else if (tries++ < 20) timer = setTimeout(seek, 50)   // page may still be rendering
      else window.scrollTo(0, 0)
    }
    seek()
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}
