/* Where each Google Sheet lives, so the office never has to go and find it.
 *
 * The link can be baked in at build time (VITE_SHEET_*_EDIT in .env), or pasted
 * in once from the admin page and remembered in that browser. The second route
 * exists so nobody has to redeploy the site just to record a link, which is
 * exactly the kind of developer errand this whole feature is meant to remove.
 */

import { SHEET_EDIT_URLS } from './sheets.js'

const env = import.meta.env ?? {}

const ENV_KEYS = {
  announcements: 'VITE_SHEET_ANNOUNCEMENTS_EDIT',
  events:        'VITE_SHEET_EVENTS_EDIT',
  documents:     'VITE_SHEET_DOCUMENTS_EDIT',
}

const storageKey = (kind) => `mosai.sheetlink.${kind}`

/** The editing link for a sheet, or an empty string if none is known yet. */
export function getSheetLink(kind) {
  const fromEnv = env[ENV_KEYS[kind]]
  if (fromEnv) return fromEnv
  if (SHEET_EDIT_URLS[kind]) return SHEET_EDIT_URLS[kind]
  try {
    return localStorage.getItem(storageKey(kind)) || ''
  } catch {
    return ''                      // private browsing
  }
}

/** Remembers a link in this browser. Ignored when one is set in .env. */
export function setSheetLink(kind, url) {
  try {
    const clean = String(url || '').trim()
    if (clean) localStorage.setItem(storageKey(kind), clean)
    else localStorage.removeItem(storageKey(kind))
  } catch { /* nothing worth breaking the page for */ }
}

/** True when the link is set in the code or .env, so the page cannot change it. */
export function isSheetLinkFixed(kind) {
  return Boolean(env[ENV_KEYS[kind]] || SHEET_EDIT_URLS[kind])
}

/** A Google Sheets address, roughly. Enough to catch a pasted mistake. */
export function looksLikeSheetLink(url) {
  return /^https:\/\/docs\.google\.com\/spreadsheets\//i.test(String(url || '').trim())
}
