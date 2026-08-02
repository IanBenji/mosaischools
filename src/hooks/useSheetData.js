import { useEffect, useState } from 'react'
import { fetchDataset, DATASETS } from '../lib/schoolData'

/* Reads one school-maintained dataset (announcements / events / documents).
 *
 * Returns { rows, loading, live, error }:
 *   rows    — normalised records, always an array (never null)
 *   loading — true only on a genuinely cold load; a cache hit paints instantly
 *   live    — true when the data came from the school's sheet rather than the
 *             bundled fallback, so a page can show a "last checked" note
 *   error   — set when the sheet could not be reached; `rows` still holds the
 *             last good cache or the fallback, so the page never goes blank
 *
 * Responses are cached in sessionStorage for ten minutes. That keeps the site
 * quick and cheap on a metered mobile connection while still picking up a
 * notice the office posted this morning.
 */

const TTL_MS = 10 * 60 * 1000
const cacheKey = (name) => `mosai.sheet.${name}`

function readCache(name) {
  try {
    const raw = sessionStorage.getItem(cacheKey(name))
    if (!raw) return null
    const { t, rows } = JSON.parse(raw)
    if (!Array.isArray(rows)) return null
    return { rows: revive(rows), fresh: Date.now() - t < TTL_MS }
  } catch {
    return null                       // private mode, quota, or corrupt entry
  }
}

function writeCache(name, rows) {
  try {
    sessionStorage.setItem(cacheKey(name), JSON.stringify({ t: Date.now(), rows }))
  } catch { /* nothing worth breaking the page for */ }
}

// JSON round-tripping turns Dates into strings; put them back.
const DATE_FIELDS = ['date', 'start', 'end', 'expires', 'updated']
function revive(rows) {
  return rows.map((r) => {
    const out = { ...r }
    for (const f of DATE_FIELDS) if (typeof out[f] === 'string') out[f] = new Date(out[f])
    return out
  })
}

export default function useSheetData(name) {
  const configured = Boolean(DATASETS[name]?.url)

  // Lazy initialiser — sessionStorage is touched once per mount, not per render.
  const [state, setState] = useState(() => {
    const cached = configured ? readCache(name) : null
    return {
      rows:    cached?.rows ?? DATASETS[name]?.fallback ?? [],
      loading: configured && !cached,
      live:    Boolean(cached),
      error:   null,
    }
  })

  useEffect(() => {
    // No sheet configured, or a cache entry that is still fresh — nothing to do.
    if (!configured) return
    const hit = readCache(name)
    if (hit?.fresh) return

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    let cancelled = false

    fetchDataset(name, { signal: controller.signal })
      .then(({ rows, live }) => {
        if (cancelled) return
        writeCache(name, rows)
        setState({ rows, loading: false, live, error: null })
      })
      .catch((err) => {
        if (cancelled) return
        // Keep whatever we already had on screen — a stale notice beats none.
        setState(s => ({
          rows: s.rows.length ? s.rows : (DATASETS[name]?.fallback ?? []),
          loading: false,
          live: s.live,
          error: err?.name === 'AbortError' ? new Error('Timed out') : err,
        }))
      })
      .finally(() => clearTimeout(timeout))

    return () => { cancelled = true; clearTimeout(timeout); controller.abort() }
  }, [name, configured])

  return state
}
