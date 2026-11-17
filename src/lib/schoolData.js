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
import { SHEET_URLS } from './sheets.js'

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

/* Google Drive share links point at a preview page, not at the file.
 *
 * A spreadsheet cannot hold a PDF, so the documents sheet only carries a link
 * and the file itself lives in the school's Drive. What the office copies out of
 * Drive's Share dialog is .../file/d/<id>/view?usp=sharing, which opens Google's
 * own viewer: Google chrome around the page, a sign in prompt on some phones,
 * and no obvious way to keep the file. Rewriting it to the direct address means
 * "Save it to your phone" on the Downloads page actually saves something.
 *
 * This runs on the way in, so the sheet keeps the link the office pasted and
 * nobody has to learn a second URL format. Anything that is not a Drive address
 * is returned exactly as given, including the /admissions style internal links.
 *
 * Note the file still has to be shared as "anyone with the link". No amount of
 * URL rewriting substitutes for that, which is why the validator says so. */
export function directDownloadUrl(raw) {
  const url = String(raw || '').trim()
  if (!/^https?:\/\/(drive|docs)\.google\.com\//i.test(url)) return url

  // A folder is a place rather than a file, so there is nothing to download.
  if (/\/(drive\/)?(u\/\d+\/)?folders\//i.test(url)) return url

  /* Docs, Sheets and Slides are not stored files at all; Google renders them on
   * demand. They have no download address, but they do export to PDF, which is
   * what a parent wanted from a "form" anyway. */
  const native = url.match(/\/(document|spreadsheets|presentation)\/d\/([\w-]+)/i)
  if (native) return `https://docs.google.com/${native[1]}/d/${native[2]}/export?format=pdf`

  // Already a direct link. Leave it be.
  if (/\/uc\?|[?&]export=download/i.test(url)) return url

  const id = url.match(/\/file\/d\/([\w-]+)/i)?.[1] || queryParam(url, 'id')
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url
}

/** One query parameter, without letting a malformed URL throw. */
function queryParam(url, key) {
  try {
    return new URL(url).searchParams.get(key)
  } catch {
    return null
  }
}

/* Documents — the PDFs and forms parents currently phone the office for. */
function normaliseDocument(row, i) {
  const url = directDownloadUrl(pick(row, 'url', 'link', 'file', 'href'))
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
  const s = String(url || '')
  const m = s.split('?')[0].match(/\.([a-z0-9]{2,4})$/i)
  if (m) return m[1]

  /* A Drive address carries no extension, so the guess has to come from the
   * shape of the link. Getting this wrong is not cosmetic: the Downloads page
   * treats "link" as something that opens in the browser, so a real form would
   * lose its download behaviour and its badge would read LINK. A Google export
   * states its format outright; anything else on Drive is at least known to be
   * a file, even if we cannot tell which kind. */
  const exported = s.match(/[?&]format=([a-z0-9]{2,4})/i)
  if (exported) return exported[1]
  if (/^https?:\/\/(drive|docs)\.google\.com\//i.test(s)) return 'file'

  return /^https?:/i.test(s) ? 'link' : 'page'
}

/* Every dataset the school can maintain. `url` is read at module load; a blank
 * one keeps the dataset on its bundled fallback. */

// Guarded so this module also loads outside Vite, which is what lets the date
// rules and the sheet validator be unit tested in plain Node.
const env = import.meta.env ?? {}

/* The bundled calendar and documents, used whenever the sheet tab is off.
 *
 * Written as sheet rows on purpose, and run through the same normalisers, so
 * they behave exactly like rows the office types and can be pasted straight
 * into the sheet (docs/sheet-templates/ holds the same rows as CSV).
 *
 * The calendar is the Ministry of Education and Sports PROVISIONAL School
 * Academic Year Calendar 2027, supplied by the school board (Nov 2026). It is
 * transcribed exactly: term dates, term holidays and day counts. The board
 * sheet also lists reporting dates for S.1 and S.5; those are secondary
 * classes, which MOSAI (Toddler Class to P.5) does not run, so they are left
 * out. Nothing else is added: add school events here (or in the sheet) only
 * once the school confirms them. The PDFs live in public/documents/, so their
 * address follows the site's base path. */
const BASE = (env.BASE_URL || '/').replace(/\/?$/, '/')
const pdf = (file) => `${BASE}documents/${file}`

// The official 2027 calendar as structured data, rendered as tables on the
// Calendar pages. BUNDLED_EVENTS below is built from the same rows, so the
// tables and the event list can never disagree.
export const ACADEMIC_YEAR_2027 = {
  year: 2027,
  source: 'Ministry of Education and Sports, Provisional School Academic Year Calendar 2027',
  provisional: true,
  terms: [
    { term: 'I',   from: '2027-02-01', to: '2027-04-30', days: 89 },
    { term: 'II',  from: '2027-05-24', to: '2027-08-20', days: 89 },
    { term: 'III', from: '2027-09-13', to: '2027-12-03', days: 82 },
  ],
  totalDays: 260,
  holidays: [
    { term: 'I',   from: '2027-05-01', to: '2027-05-23', days: 23 },
    { term: 'II',  from: '2027-08-21', to: '2027-09-12', days: 23 },
    { term: 'III', from: '2027-12-04', to: '2028-01-30', days: 58 },
  ],
}

const SOURCE_NOTE = 'Ministry of Education and Sports provisional calendar 2027.'

const BUNDLED_EVENTS = ACADEMIC_YEAR_2027.terms.flatMap((t, i) => {
  const h = ACADEMIC_YEAR_2027.holidays[i]
  return [
    { title: `Term ${t.term} 2027 opens`,  start: t.from, type: 'Term', details: `Term ${t.term} is ${t.days} days long. ${SOURCE_NOTE}` },
    { title: `Term ${t.term} 2027 closes`, start: t.to,   type: 'Term', details: `Last day of Term ${t.term}. ${SOURCE_NOTE}` },
    { title: `Term ${h.term} holiday`, start: h.from, end: h.to, type: 'Holiday', details: `${h.days} days. ${SOURCE_NOTE}` },
  ]
})

const BUNDLED_DOCUMENTS = [
  { title: 'Application for Admission, 2027', url: pdf('mosai-admission-form-2027.pdf'), description: 'Print it, fill it in and bring it to the office with the documents listed on the form.', category: 'Forms', filetype: 'PDF', size: '205 KB', updated: '2026-11-13' },
  { title: 'Learner Medical Form', url: pdf('mosai-learner-medical-form.pdf'), description: 'Required for every boarder. Part B is completed and stamped by a clinician.', category: 'Forms', filetype: 'PDF', size: '203 KB', updated: '2026-11-13' },
  { title: 'Fee structure, 2027', url: pdf('mosai-fee-structure-2027.pdf'), description: 'Termly tuition for Day and Boarding, other charges, and how to pay through the School Pay System.', category: 'Fees', filetype: 'PDF', size: '204 KB', updated: '2026-11-13' },
  { title: 'Termly requirements list, 2027', url: pdf('mosai-requirements-list-2027.pdf'), description: 'What Toddler, Nursery, Primary and boarding learners bring on the first day of term.', category: 'Requirements', filetype: 'PDF', size: '205 KB', updated: '2026-11-13' },
  { title: 'School uniform list', url: pdf('mosai-uniform-list.pdf'), description: 'Uniform for boys and girls, sports and house wear, and grooming rules.', category: 'Uniform', filetype: 'PDF', size: '203 KB', updated: '2026-11-13' },
]

export const DATASETS = {
  announcements: {
    url:      env.VITE_SHEET_ANNOUNCEMENTS || SHEET_URLS.announcements,
    normalise: normaliseAnnouncement,
    fallback:  fallbackAnnouncements(),
  },
  events: {
    url:      env.VITE_SHEET_EVENTS || SHEET_URLS.events,
    normalise: normaliseEvent,
    fallback:  BUNDLED_EVENTS.map(normaliseEvent),
  },
  documents: {
    url:      env.VITE_SHEET_DOCUMENTS || SHEET_URLS.documents,
    normalise: normaliseDocument,
    fallback:  BUNDLED_DOCUMENTS.map(normaliseDocument),
  },
}

function fallbackAnnouncements() {
  // The notices already hardcoded into the site before this became editable.
  return [
    {
      id: 'a0',
      date: parseDate('2027-02-01'),
      dateText: '1 February 2027',
      title: 'Term I 2027 Begins: Monday 1 February 2027',
      body: 'Term I of the 2027 academic year runs from Monday 1 February to Friday 30 April 2027, following the Ministry of Education and Sports provisional calendar. Please ensure school fees are settled via the School Pay System and uniforms are ready before the first day of term.',
      category: 'Academic Calendar',
      campus: '', link: '/calendar',
      ticker: 'Term I 2027 begins Monday 1 February 2027',
      pinned: false, expires: null,
    },
    {
      id: 'a1',
      date: null,
      dateText: 'Ongoing',
      title: 'Applications 2027 Now Open',
      body: 'MOSAI Schools is accepting applications from Toddler Class (day care) and the Nursery classes through to Primary Five. Spaces are limited. Visit either campus or contact us to begin the enrolment process.',
      category: 'Admissions',
      campus: '', link: '/admissions',
      ticker: 'Applications 2027 open: Toddler Class (day care) to Primary Five',
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
  'Day school for Nursery · Day and Boarding for Primary learners',
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
export const DOC_CATEGORY_ORDER = [
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

/* Documents for the "Downloadable Forms" block on the Admissions page.
 *
 * Which documents land there is decided by category rather than by a column of
 * its own. That is one rule for the office to remember, and it is the same word
 * that heads the section on the page, so there is nothing to look up: file it
 * under Forms and it appears. The test is loose so "Forms", "Admission Forms"
 * and "Application Forms" all count.
 *
 * Nothing is hidden by this. Every document still lists on the Downloads page
 * whatever its category; this only decides what is repeated on Admissions,
 * where a parent already reading about applying is most likely to want it. */
export function formDocuments(rows, campus) {
  // Whole word only, or "Uniform" would count as a form.
  return forCampus(rows, campus).filter(d => /\bforms?\b/i.test(d.category || ''))
}
