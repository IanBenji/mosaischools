import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageview } from '../lib/analytics'

/* Sends one GA4 page view per route change.
 *
 * React Router swaps pages without a browser navigation, so without this the
 * school would only ever see a visit to the home page no matter how much of the
 * site a visitor actually read. Must live INSIDE <BrowserRouter>. */
export default function RouteAnalytics() {
  const { pathname, search } = useLocation()

  useEffect(() => { initAnalytics() }, [])

  useEffect(() => {
    // Wait a tick so the page has set its own document.title first.
    const id = setTimeout(() => {
      trackPageview(`${import.meta.env.BASE_URL.replace(/\/$/, '')}${pathname}${search}`)
    }, 60)
    return () => clearTimeout(id)
  }, [pathname, search])

  return null
}
