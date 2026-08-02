/* School-maintained content: announcements, calendar events and documents.
 *
 * ── Why it works this way ────────────────────────────────────────────────
 * Everything here used to be hardcoded, which meant a developer and a redeploy
 * were needed to post "Term II begins on the 25th". Now each dataset is read at
 * runtime from a Google Sheet the school publishes to the web as CSV. The
 * office edits a spreadsheet; the website updates. No backend, no login, no
 * hosting change — which matters because the site is static on GitHub Pages.
 *
 * Set the three VITE_SHEET_* URLs in .env. Any dataset without a URL silently
 * falls back to the bundled defaults below, so the site never breaks and works
 * out of the box before the school has set anything up.
 *
 * Setup guide + column templates: see README "School-editable content".
 */

import { csvToObjects, pick, truthy } from './csv.js'

// ── Dates ────────────────────────────────────────────────────────────────
// Spreadsheet dates arrive as text. Accept the formats a Ugandan school office
// realistically types, and always build a LOCAL date so an event never slips to
// the previous day the way `new Date('2026-05-25')` (parsed as UTC) can.
export function parseDate(value) {
  const s = String(value ?? '').trim()
  if (!s) return null

  // 2026-05-25
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (m) return local(+m[1], +m[2], +m[3])

  // 25/05/2026 or 25-05-2026 (day first — the local convention)
  m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
  if (m) return local(+m[3], +m[2], +m[1])

  // 25 May 2026
  m = s.match(/^(\d{1,2})\s+([A-Za-z]+)\.?\s+(\d{4})$/)
  if (m) {
    const month = MONTHS.findIndex(x => x.startsWith(m[2].slice(0, 3).toLowerCase()))
    if (month >= 0) return local(+m[3], month + 1, +m[1])
  }

  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/* Builds a local date, and refuses one that does not exist.
 *
 * `new Date(2026, 8, 31)` does not fail on 31 September; it quietly returns
 * 1 October. A typo in the sheet would then show parents a real date that is
 * simply the wrong one, which is worse than showing nothing. So we build the
 * date and check it kept the numbers it was given. */
const local = (y, m, d) => {
  const dt = new Date(y, m - 1, d)
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null
  return dt
}

/** "HH:MM" → { h, m }, or null. Accepts "9:00", "09:00", "2:30 pm". */
export function parseTime(value) {
  const s = String(value ?? '').trim().toLowerCase()
  if (!s) return null
  const m = s.match(/^(\d{1,2})[:.](\d{2})\s*(am|pm)?$/) || s.match(/^(\d{1,2})\s*(am|pm)$/)
  if (!m) return null
  let h = +m[1]
  const min = m[2] && /^\d{2}$/.test(m[2]) ? +m[2] : 0
  const ampm = m[3] || (/^\d{1,2}\s*(am|pm)$/.test(s) ? m[2] : null)
  if (ampm === 'pm' && h < 12) h += 12
  if (ampm === 'am' && h === 12) h = 0
  return h > 23 || min > 59 ? null : { h, m: min }
}

export function formatDate(date, opts = {}) {
  if (!date) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', ...opts })
}

export function formatDateShort(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Midnight today, for comparing an event to "now" without the clock interfering. */
export function startOfToday() {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}

// ── Campus filtering ─────────────────────────────────────────────────────
// A blank campus cell means "both campuses" — the forgiving default, since the
// office will leave it empty far more often than not.
export function forCampus(rows, campus) {
  return rows.filter((r) => {
    const c = String(r.campus || '').toLowerCase().trim()
    return !c || c === 'all' || c === 'both' || c === campus
  })
}

// ── Datasets ─────────────────────────────────────────────────────────────

const CATEGORY_COLOURS = {
  'academic calendar': '#FF8A6B',
  academics:           '#FF8A6B',
  admissions:          '#6EC6F2',
  fees:                '#9B7EDE',
  events:              '#FFC93C',
  languages:           '#5FBB6E',
  sport:               '#5FBB6E',
  general:             '#6EC6F2',
}
const FALLBACK_COLOURS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2', '#9B7EDE']

export function colourFor(category, index = 0) {
  return CATEGORY_COLOURS[String(category || '').toLowerCase().trim()]
      || FALLBACK_COLOURS[index % FALLBACK_COLOURS.length]
}

/* Announcements — the notices shown on the home page and the News page, and
 * the source of the scrolling ticker. */
function normaliseAnnouncement(row, i) {
  const date = parseDate(pick(row, 'date', 'published', 'when'))
  return {
    id:       `a${i}`,
    date,
    dateText: pick(row, 'date', 'published', 'when') && !date
      ? pick(row, 'date', 'published', 'when')       // free text like "Ongoing" is fine
      : formatDateShort(date),
    title:    pick(row, 'title', 'headline'),
    body:     pick(row, 'body', 'message', 'details', 'preview', 'description'),
    category: pick(row, 'category', 'type') || 'General',
    campus:   pick(row, 'campus'),
    link:     pick(row, 'link', 'url', 'more'),
    ticker:   pick(row, 'ticker', 'tickertext'),
    pinned:   truthy(pick(row, 'pinned', 'pin', 'featured')),
    expires:  parseDate(pick(row, 'expires', 'expiry', 'until', 'hideafter')),
  }
}

/* Calendar events — term dates, holidays, exams, visitation, meetings. */
function normaliseEvent(row, i) {
  const start = parseDate(pick(row, 'start', 'startdate', 'date', 'from'))
  const end   = parseDate(pick(row, 'end', 'enddate', 'to')) || start
  return {
    id:       `e${i}`,
    start,
    end,
    time:     parseTime(pick(row, 'time', 'starttime')),
    endTime:  parseTime(pick(row, 'endtime', 'finish')),
    title:    pick(row, 'title', 'event', 'name'),
    details:  pick(row, 'details', 'description', 'notes', 'body'),
    location: pick(row, 'location', 'venue', 'where'),
    type:     pick(row, 'type', 'category') || 'Event',
    campus:   pick(row, 'campus'),
  }
}

/* Documents — the PDFs and forms parents currently phone the office for. */
function normaliseDocument(row, i) {
  const url = pick(row, 'url', 'link', 'file', 'href')
  return {
    id:        `d${i}`,
    title:     pick(row, 'title', 'name', 'document'),
    summary:   pick(row, 'description', 'summary', 'details', 'about'),
    category:  pick(row, 'category', 'group', 'section') || 'General',
    url,
    fileType:  (pick(row, 'filetype', 'type', 'format') || guessFileType(url)).toUpperCase(),
    size:      pick(row, 'size', 'filesize'),
    campus:    pick(row, 'campus'),
    updated:   parseDate(pick(row, 'updated', 'date', 'lastupdated')),
  }
}

function guessFileType(url) {
  const m = String(url || '').split('?')[0].match(/\.([a-z0-9]{2,4})$/i)
  if (m) return m[1]
  return /^https?:/i.test(url || '') ? 'link' : 'page'
}

/* Every dataset the school can maintain. `url` is read at module load; a blank
 * one keeps the dataset on its bundled fallback. */

// Guarded so this module also loads outside Vite, which is what lets the date
// rules and the sheet validator be unit tested in plain Node.
const env = import.meta.env ?? {}

export const DATASETS = {
  announcements: {
    url:      env.VITE_SHEET_ANNOUNCEMENTS,
    normalise: normaliseAnnouncement,
    fallback:  fallbackAnnouncements(),
  },
  events: {
    url:      env.VITE_SHEET_EVENTS,
    normalise: normaliseEvent,
    fallback:  [],           // deliberately empty — see note below
  },
  documents: {
    url:      env.VITE_SHEET_DOCUMENTS,
    normalise: normaliseDocument,
    fallback:  [],           // deliberately empty — see note below
  },
}

/* Why `events` and `documents` ship empty:
 *
 * Announcements can fall back safely because the three below were already
 * published on the site, so nothing new is being asserted. Term dates and
 * document links are different — inventing plausible-looking ones would put
 * dates in front of parents that the school never approved, and parents act on
 * term dates. Both pages therefore render a proper empty state until the school
 * fills its sheet. Templates with example rows: docs/sheet-templates/. */

function fallbackAnnouncements() {
  // The notices already hardcoded into the site before this became editable.
  return [
    {
      id: 'a0',
      date: parseDate('2026-05-25'),
      dateText: '25 May 2026',
      title: 'Term II 2026 Begins: 25 May 2026',
      body: 'We warmly welcome all learners back for Term II, 2026. Please ensure school fees are settled via the School Pay System and uniforms are ready before the first day of term.',
      category: 'Academic Calendar',
      campus: '', link: '',
      ticker: 'Term II 2026 begins 25 May. All learners to report by 7:30 AM',
      pinned: false, expires: null,
    },
    {
      id: 'a1',
      date: null,
      dateText: 'Ongoing',
      title: 'Admissions Open for the 2026 Intake',
      body: 'MOSAI Schools is accepting applications for Baby Class, Middle Class, Top Class, and Primary. Spaces are limited. Visit either campus or contact us to begin the enrolment process.',
      category: 'Admissions',
      campus: '', link: '/admissions',
      ticker: 'Admissions open for 2026: Baby Class, Middle Class, Top Class and Primary',
      pinned: true, expires: null,
    },
    {
      id: 'a2',
      date: null,
      dateText: 'All Year',
      title: 'Four Languages: English, Swahili, French and Chinese',
      body: 'MOSAI Schools offers instruction in four languages: English, Swahili, French, and Chinese, giving every learner a multilingual foundation for a globalised future.',
      category: 'Languages',
      campus: '', link: '/programs',
      ticker: 'Four languages offered: English, Swahili, French and Chinese',
      pinned: false, expires: null,
    },
  ]
}

/* Standing facts for the ticker — true all year, so they are not announcements
 * and do not belong in the sheet. Sheet ticker text is prepended to these. */
export const EVERGREEN_TICKER = [
  'School fees payable via School Pay System only. No cash accepted',
  'Nalugala Campus (2025) and Bunono Campus (2026), both now open',
  'Day and Boarding available for Nursery and Primary learners',
  'Modern classrooms with digital interactive boards and computers',
  'Swimming pool on site with trained instructors',
  'Safe school transport covering key routes along Kampala to Entebbe Road',
]

// ── Fetching ─────────────────────────────────────────────────────────────

/** Fetches one dataset's CSV and normalises it. Throws on network/HTTP error. */
export async function fetchDataset(name, { signal } = {}) {
  const ds = DATASETS[name]
  if (!ds) throw new Error(`Unknown dataset: ${name}`)
  if (!ds.url) return { rows: ds.fallback, live: false }

  const res = await fetch(ds.url, { signal, redirect: 'follow' })
  if (!res.ok) throw new Error(`Sheet request failed (${res.status})`)

  const rows = csvToObjects(await res.text())
    .map(ds.normalise)
    .filter(r => r.title)          // a row with no title is a blank spreadsheet line

  return { rows, live: true }
}

export function datasetConfigured(name) {
  return Boolean(DATASETS[name]?.url)
}

// ── Shared shaping ───────────────────────────────────────────────────────
// Both campus designs render the same records in different furniture, so the
// filtering and ordering rules live here rather than in six page files.

/** Announcements for a campus: expired ones dropped, pinned first, newest first. */
export function visibleAnnouncements(rows, campus) {
  const today = startOfToday()
  return forCampus(rows, campus)
    .filter(a => !a.expires || a.expires >= today)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      if (!a.date && !b.date) return 0
      if (!a.date) return 1                 // undated ("Ongoing") sits below dated news
      if (!b.date) return -1
      return b.date - a.date
    })
}

/** Distinct categories present in a set of announcements, for filter chips. */
export function announcementCategories(rows) {
  return [...new Set(rows.map(a => a.category).filter(Boolean))]
}

/** Ticker lines: the school's own short lines first, then the standing facts. */
export function tickerLines(rows, campus) {
  const fromSheet = visibleAnnouncements(rows, campus)
    .map(a => a.ticker || a.title)
    .filter(Boolean)
  return [...new Set([...fromSheet, ...EVERGREEN_TICKER])]
}

/** Events still to come, soonest first. An event spanning days counts until it ends. */
export function upcomingEvents(rows, campus) {
  const today = startOfToday()
  return forCampus(rows, campus)
    .filter(e => e.start && (e.end || e.start) >= today)
    .sort((a, b) => a.start - b.start)
}

/** Events already past, most recent first. */
export function pastEvents(rows, campus) {
  const today = startOfToday()
  return forCampus(rows, campus)
    .filter(e => e.start && (e.end || e.start) < today)
    .sort((a, b) => b.start - a.start)
}

/** Groups events by calendar month, preserving order. */
export function groupEventsByMonth(events) {
  const groups = []
  for (const e of events) {
    const label = e.start.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    const last = groups[groups.length - 1]
    if (last && last.label === label) last.events.push(e)
    else groups.push({ label, events: [e] })
  }
  return groups
}

/** A human phrase for when an event happens — "25 May" or "25–29 May 2026, 9:00 AM". */
export function eventWhen(event) {
  if (!event.start) return ''
  const sameDay = !event.end || event.end.getTime() === event.start.getTime()
  const range = sameDay
    ? formatDate(event.start)
    : `${event.start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} to ${formatDate(event.end)}`
  if (!event.time) return range
  const t = new Date(2000, 0, 1, event.time.h, event.time.m)
    .toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `${range}, ${t}`
}

/* Category order for the Downloads page — the sequence a parent actually needs
 * things in, rather than alphabetical. Anything unlisted follows, A–Z. */
const DOC_CATEGORY_ORDER = [
  'Admissions', 'Fees', 'Requirements', 'Uniform', 'Academics',
  'Calendar', 'Forms', 'Policies', 'Newsletters', 'General',
]

/** Documents for a campus, grouped into ordered categories. */
export function groupDocuments(rows, campus) {
  const groups = new Map()
  for (const doc of forCampus(rows, campus)) {
    const key = doc.category || 'General'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(doc)
  }
  const rank = (name) => {
    const i = DOC_CATEGORY_ORDER.findIndex(c => c.toLowerCase() === name.toLowerCase())
    return i === -1 ? DOC_CATEGORY_ORDER.length : i
  }
  return [...groups.entries()]
    .map(([category, docs]) => ({ category, docs }))
    .sort((a, b) => rank(a.category) - rank(b.category) || a.category.localeCompare(b.category))
}
