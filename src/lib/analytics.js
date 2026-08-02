/* Google Analytics 4 — loaded only when a Measurement ID is configured.
 *
 * Set VITE_GA_MEASUREMENT_ID in .env (format: G-XXXXXXXXXX). With no ID the
 * whole module is inert: no script is injected and no requests are made, so
 * local development and preview builds stay clean.
 *
 * What the school gets: how many people visited, which pages they read, which
 * country/city and device they used, and how they found the site. What it does
 * NOT give — and cannot give — is the identity of an individual visitor. See
 * the Privacy Policy page for the visitor-facing explanation.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
export const analyticsEnabled = Boolean(MEASUREMENT_ID)

let loaded = false

function gtag() {
  // GA requires the raw `arguments` object to be pushed, not an array.
  window.dataLayer.push(arguments)
}

/** Injects the GA4 tag once. Safe to call repeatedly. */
export function initAnalytics() {
  if (!analyticsEnabled || loaded || typeof window === 'undefined') return
  loaded = true

  window.dataLayer = window.dataLayer || []
  window.gtag = gtag

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  gtag('js', new Date())
  // The site is a single-page app, so we send page views ourselves on each
  // route change instead of letting the tag guess.
  gtag('config', MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  })
}

/** Records a page view. `path` should include the basename, e.g. "/mosaischools/donate". */
export function trackPageview(path, title) {
  if (!analyticsEnabled || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  })
}

/** Records a named action, e.g. trackEvent('whatsapp_click', { campus: 'bunono' }). */
export function trackEvent(name, params = {}) {
  if (!analyticsEnabled || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
