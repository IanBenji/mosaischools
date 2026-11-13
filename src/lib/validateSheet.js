/* Checks a spreadsheet before its contents ever reach a parent.
 *
 * The Google Sheet is the live source of truth for announcements, term dates and
 * documents, which means a typo in a date column becomes a wrong date on the
 * website. This module reads the raw rows the office is about to publish and
 * reports, per row, anything that would break, be silently dropped, or quietly
 * never appear.
 *
 * It changes nothing. It only tells you what would happen.
 */

import { parseDate, parseTime, startOfToday, DOC_CATEGORY_ORDER } from './schoolData.js'
import { canonical } from './csv.js'

const CAMPUS_VALUES = ['', 'all', 'both', 'nalugala', 'bunono']

/* Values worth offering as a dropdown in the sheet itself, so the office picks
 * rather than types. Kept here beside the validator, not in the Admin page, so
 * the list a person is told to paste into Google Sheets is the same list this
 * file judges their file against.
 *
 * `strict` decides what the dropdown should do with anything else, and the two
 * cases are genuinely different:
 *
 *   campus is closed. A value outside the list is not an unusual campus, it is
 *   a row that will never appear on the website, so the dropdown should reject
 *   it outright and the validator already calls it an error.
 *
 *   category and type are open. An unlisted one still works: it groups, it
 *   sorts after the known ones and it picks up a fallback colour. The sheet
 *   already carries a perfectly good "Transport" category that appears in no
 *   list here. So the dropdown should warn rather than reject, and nothing in
 *   this file treats an unlisted value as a problem. */
const CAMPUS_CHOICES = { values: ['all', 'nalugala', 'bunono'], strict: true }

/* Every page that exists on the site. A link beginning with a slash that is not
 * one of these sends a parent to the Page Not Found screen, which the office has
 * no way of discovering on its own. Keep in step with the routes in App.jsx. */
const KNOWN_ROUTES = [
  '/', '/about', '/programs', '/admissions', '/scholarships', '/donate',
  '/news', '/calendar', '/downloads', '/gallery', '/contact', '/privacy', '/terms',
]

function internalRouteProblem(value) {
  const url = String(value || '').trim()
  if (!url.startsWith('/')) return null
  const routePart = url.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  if (KNOWN_ROUTES.includes(routePart)) return null
  // Suggest the closest real page, since these are nearly always near misses.
  const near = KNOWN_ROUTES.find(r => r !== '/' && (routePart.startsWith(r) || r.startsWith(routePart)))
  return `"${url}" is not a page on this website, so it would show Page Not Found.`
    + (near ? ` Did you mean ${near}?` : ` The pages are ${KNOWN_ROUTES.join(', ')}.`)
}

/* Column catalogues. `aliases` mirror what pick() accepts in schoolData.js, so a
 * heading the site would understand is never reported as unknown. */
export const SCHEMAS = {
  announcements: {
    label:    'Announcements',
    feeds:    'the News page, the home page news strip and the scrolling ticker',
    template: 'announcements.csv',
    columns: [
      { key: 'title',    aliases: ['title', 'headline'], required: true,
        help: 'The headline parents read first.' },
      { key: 'body',     aliases: ['body', 'message', 'details', 'preview', 'description'],
        help: 'The paragraph under the headline.' },
      { key: 'date',     aliases: ['date', 'published', 'when'],
        help: 'Leave blank for a standing notice. Free text such as Ongoing is also fine.' },
      { key: 'category', aliases: ['category', 'type'],
        values: ['Academic Calendar', 'Admissions', 'Fees', 'Events', 'Languages', 'Sport', 'Transport', 'General'],
        help: 'Groups the notice and picks its colour. Defaults to General.' },
      { key: 'ticker',   aliases: ['ticker', 'tickertext'],
        help: 'A short version for the scrolling strip. The headline is used if blank.' },
      { key: 'campus',   aliases: ['campus'], ...CAMPUS_CHOICES,
        help: 'nalugala, bunono, or blank for both.' },
      { key: 'pinned',   aliases: ['pinned', 'pin', 'featured'],
        help: 'yes to hold this at the top of the list.' },
      { key: 'expires',  aliases: ['expires', 'expiry', 'until', 'hideafter'],
        help: 'The notice removes itself after this date.' },
      { key: 'link',     aliases: ['link', 'url', 'more'],
        help: 'A Read more destination. Use /admissions for a page on this site.' },
    ],
    examples: [
      {
        title: 'Term III 2026 begins on 7 September',
        body: 'All learners should report by 7:30 AM in full uniform. Please make sure fees are settled through the School Pay System before the first day.',
        date: '2026-09-07', category: 'Academic Calendar',
        ticker: 'Term III begins 7 September. Report by 7:30 AM',
        campus: 'all', pinned: 'yes', expires: '2026-09-14', link: '',
      },
      {
        title: 'Admissions open for the 2027 intake',
        body: 'We are accepting applications from Toddler Class (day care) through to Primary Five. Places are limited, so visit either campus or contact the office to begin.',
        date: '', category: 'Admissions',
        ticker: 'Admissions open for 2027. Places are limited',
        campus: 'all', pinned: 'yes', expires: '', link: '/admissions',
      },
      {
        title: 'Visitation Day at Bunono',
        body: "Parents and guardians are welcome between 10:00 AM and 3:00 PM. Please carry your child's report card.",
        date: '2026-08-20', category: 'Events', ticker: '',
        campus: 'bunono', pinned: '', expires: '2026-08-21', link: '/calendar',
      },
    ],
  },

  events: {
    label:    'Term dates and events',
    feeds:    'the Calendar page and Coming up on the News page',
    template: 'events.csv',
    columns: [
      { key: 'title',    aliases: ['title', 'event', 'name'], required: true,
        help: 'What the day is called.' },
      { key: 'start',    aliases: ['start', 'startdate', 'date', 'from'], required: true,
        help: 'The day it happens. 2026-09-07, 07/09/2026 and 7 September 2026 all work.' },
      { key: 'end',      aliases: ['end', 'enddate', 'to'],
        help: 'Only for something spanning several days.' },
      { key: 'time',     aliases: ['time', 'starttime'],
        help: 'Optional. 09:00 or 2:30 pm. Leave blank for an all day entry.' },
      { key: 'endtime',  aliases: ['endtime', 'finish'],
        help: 'Optional finish time. Two hours is assumed if blank.' },
      { key: 'details',  aliases: ['details', 'description', 'notes', 'body'],
        help: 'Anything parents need to know.' },
      { key: 'location', aliases: ['location', 'venue', 'where'],
        help: 'Where it happens.' },
      { key: 'type',     aliases: ['type', 'category'],
        values: ['Term', 'Holiday', 'Exam', 'Visitation', 'Sport', 'Meeting', 'Event'],
        help: 'Term, Holiday, Exam, Visitation, Sport, Meeting. Defaults to Event.' },
      { key: 'campus',   aliases: ['campus'], ...CAMPUS_CHOICES,
        help: 'nalugala, bunono, or blank for both.' },
    ],
    examples: [
      {
        title: 'Term III begins', start: '2026-09-07', end: '', time: '07:30', endtime: '',
        details: 'All learners report in full uniform. Boarders may arrive from 2:00 PM the day before.',
        location: 'Both campuses', type: 'Term', campus: 'all',
      },
      {
        title: 'Mid term assessments begin', start: '2026-09-25', end: '', time: '', endtime: '',
        details: 'Assessments run for one week. Normal school hours apply.',
        location: 'Classrooms', type: 'Exam', campus: 'all',
      },
      {
        title: 'Independence Day', start: '2026-10-09', end: '', time: '', endtime: '',
        details: 'Public holiday. No classes.', location: '', type: 'Holiday', campus: 'all',
      },
      {
        title: 'Visitation Day', start: '2026-10-17', end: '', time: '10:00', endtime: '15:00',
        details: "Parents and guardians welcome. Please carry your child's report card.",
        location: 'School hall', type: 'Visitation', campus: 'all',
      },
      {
        title: 'Sports Day', start: '2026-11-06', end: '', time: '09:00', endtime: '',
        details: 'Inter house athletics and games. Parents are welcome to attend and cheer.',
        location: 'Playing field', type: 'Sport', campus: 'all',
      },
      {
        title: 'Term III ends', start: '2026-12-04', end: '', time: '', endtime: '',
        details: 'Report cards are issued at the close of the day.',
        location: 'Both campuses', type: 'Term', campus: 'all',
      },
    ],
  },

  documents: {
    label:    'Documents',
    feeds:    'the Downloads page',
    template: 'documents.csv',
    columns: [
      { key: 'title',       aliases: ['title', 'name', 'document'], required: true,
        help: 'What the document is called.' },
      { key: 'url',         aliases: ['url', 'link', 'file', 'href'], required: true,
        help: 'Where the file lives. Use /admissions to point at a page on this site.' },
      { key: 'description', aliases: ['description', 'summary', 'details', 'about'],
        help: 'One line telling parents what is inside.' },
      /* Straight from the ordering the Downloads page groups by, rather than a
       * second copy of the same names. A dropdown listing a category the page
       * does not know how to order would be a slow moving lie. */
      { key: 'category',    aliases: ['category', 'group', 'section'], values: DOC_CATEGORY_ORDER,
        help: 'Admissions, Fees, Requirements, Uniform, Policies. Defaults to General.' },
      { key: 'filetype',    aliases: ['filetype', 'type', 'format'],
        help: 'PDF, DOCX. Worked out from the link if blank.' },
      { key: 'size',        aliases: ['size', 'filesize'],
        help: 'Such as 180 KB, so nobody is surprised by a large download.' },
      { key: 'updated',     aliases: ['updated', 'date', 'lastupdated'],
        help: 'When the document was last revised.' },
      { key: 'campus',      aliases: ['campus'], ...CAMPUS_CHOICES,
        help: 'nalugala, bunono, or blank for both.' },
    ],
    examples: [
      {
        title: 'Fee structure, Term III 2026',
        description: 'Tuition and other charges for every class, payable through the School Pay System.',
        category: 'Fees', url: 'https://example.com/mosai-fees-term3-2026.pdf',
        filetype: 'PDF', size: '180 KB', updated: '2026-08-01', campus: 'all',
      },
      {
        title: 'Admission form',
        description: 'Print this, fill it in and bring it to the office with the required documents.',
        category: 'Admissions', url: 'https://example.com/mosai-admission-form.pdf',
        filetype: 'PDF', size: '95 KB', updated: '2026-07-15', campus: 'all',
      },
      {
        title: 'Baby Class requirements',
        description: 'What a new Baby Class learner needs to bring on the first day.',
        category: 'Requirements', url: 'https://example.com/mosai-baby-class-requirements.pdf',
        filetype: 'PDF', size: '120 KB', updated: '2026-07-15', campus: 'all',
      },
      {
        title: 'Uniform list and suppliers',
        description: 'Full uniform details for boys and girls, plus where to buy each item.',
        category: 'Uniform', url: 'https://example.com/mosai-uniform-list.pdf',
        filetype: 'PDF', size: '240 KB', updated: '2026-06-30', campus: 'all',
      },
      {
        title: 'Fee structure and programmes',
        description: 'Current fees and what each class covers, on our Admissions page.',
        category: 'Fees', url: '/admissions', filetype: 'PAGE', size: '', updated: '', campus: 'all',
      },
    ],
  },
}

const DATE_HINT = 'Use 2026-09-07, 07/09/2026 or 7 September 2026.'

/* A value that is shaped like a date but does not parse is almost always a day
 * that does not exist in that month, such as 31 September. Saying so is far more
 * useful than repeating the accepted formats. */
const DATE_SHAPED = /^\d{1,4}[-/]\d{1,2}[-/]\d{1,4}$|^\d{1,2}\s+[A-Za-z]+\.?\s+\d{4}$/

function dateProblem(raw) {
  return DATE_SHAPED.test(String(raw).trim())
    ? `"${raw}" is not a real date. Check the day exists in that month, for example there is no 31 September.`
    : `"${raw}" is not a date. ${DATE_HINT}`
}

function get(row, col) {
  for (const a of col.aliases) {
    const v = row[canonical(a)]
    if (v !== undefined && v !== '') return v
  }
  return ''
}

/* How well a row of headings matches a dataset. Used to find the heading row,
 * choose the worksheet, and decide whether the file was recognised at all.
 *
 * A heading that is exactly a column's own name counts for much more than one
 * that merely hits an alias. Without that distinction the aliases pull files to
 * the wrong dataset: a perfectly good announcements sheet headed
 * title, description, date, category, campus, link scores higher as Documents,
 * because link satisfies the required url and date satisfies updated. Weighting
 * the exact names keeps each dataset anchored to its own vocabulary. */
const EXACT_REQUIRED = 6
const EXACT_OPTIONAL = 3
const ALIAS_REQUIRED = 2
const ALIAS_OPTIONAL = 1

export function schemaScore(headings, kind) {
  const set = new Set(headings.map(canonical).filter(Boolean))
  let score = 0
  for (const col of SCHEMAS[kind].columns) {
    if (set.has(canonical(col.key))) {
      score += col.required ? EXACT_REQUIRED : EXACT_OPTIONAL
    } else if (col.aliases.some(a => set.has(canonical(a)))) {
      score += col.required ? ALIAS_REQUIRED : ALIAS_OPTIONAL
    }
  }
  return score
}

/* Words that give away which sheet a worksheet tab is meant to be. A file whose
 * tab is literally called "Announcements" should not be argued with. */
const SHEET_NAME_HINTS = {
  announcements: ['announcement', 'news', 'notice', 'update'],
  events:        ['event', 'term', 'date', 'calendar', 'diary'],
  documents:     ['document', 'download', 'form', 'file', 'paper'],
}

/** Extra score when the worksheet name itself names the dataset. */
export function sheetNameScore(sheetName, kind) {
  const n = canonical(sheetName)
  if (!n) return 0
  if (n === canonical(kind)) return 12
  return SHEET_NAME_HINTS[kind].some(w => n.includes(w)) ? 6 : 0
}

/* Columns worth turning into a dropdown in the sheet, so the office picks a
 * value instead of typing one. Returns the letter of the column as it sits in
 * the sheet, because Google's Data validation dialog asks for a range like
 * H2:H1000 and counting columns by hand is exactly where this goes wrong. */
export function dropdownColumns(kind) {
  const cols = SCHEMAS[kind].columns
  return cols
    .map((c, i) => ({ ...c, letter: columnLetter(i) }))
    .filter(c => c.values)
}

/** 0 based column index to its spreadsheet letter. 0 is A, 26 is AA. */
export function columnLetter(index) {
  let n = index, out = ''
  do {
    out = String.fromCharCode(65 + (n % 26)) + out
    n = Math.floor(n / 26) - 1
  } while (n >= 0)
  return out
}

/** True when a heading row matches every required column of a dataset. */
export function hasAllRequired(headings, kind) {
  const set = new Set(headings.map(canonical).filter(Boolean))
  return SCHEMAS[kind].columns
    .filter(c => c.required)
    .every(c => c.aliases.some(a => set.has(canonical(a))))
}

/* Levenshtein distance, capped early. Only ever run over a handful of short
 * column names, so the naive version is fine. */
function distance(a, b) {
  if (a === b) return 0
  const m = a.length, n = b.length
  if (!m || !n) return m || n
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    const row = [i]
    for (let j = 1; j <= n; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    prev = row
  }
  return prev[n]
}

/* The column a misspelt or renamed heading was probably meant to be, so the
 * office is told "did you mean start" rather than just "not recognised". */
export function suggestColumn(heading, kind) {
  const h = canonical(heading)
  if (!h) return null
  let best = null, bestScore = Infinity
  for (const col of SCHEMAS[kind].columns) {
    for (const alias of col.aliases) {
      const a = canonical(alias)
      const d = distance(h, a)
      // Treat a containment either way as very close, which catches things like
      // "startdateofevent" against "startdate".
      const score = (h.includes(a) || a.includes(h)) ? Math.min(d, 2) : d
      if (score < bestScore) { bestScore = score; best = col.key }
    }
  }
  // Beyond a third of the length the "suggestion" is noise.
  return bestScore <= Math.max(2, Math.ceil(h.length / 3)) ? best : null
}

/** Which of a schema's columns are actually present in the uploaded headings. */
function presentColumns(headings, schema) {
  const set = new Set(headings.map(canonical))
  return schema.columns.filter(c => c.aliases.some(a => set.has(canonical(a))))
}

/** Headings the site will ignore because nothing maps to them. */
function unknownColumns(headings, schema) {
  const known = new Set(schema.columns.flatMap(c => c.aliases.map(canonical)))
  return headings.filter(h => h && !known.has(canonical(h)))
}

/**
 * @param {string[]} headings  the header row, as typed
 * @param {object[]} rows      row objects keyed by canonicalised heading
 * @param {string}   kind      announcements | events | documents
 * @returns {{issues: object[], counts: object, present: object[], unknown: string[]}}
 */
export function validateSheet(headings, rows, kind) {
  const schema = SCHEMAS[kind]
  const issues = []
  const today = startOfToday()

  const push = (level, row, column, message) => issues.push({ level, row, column, message })

  // ── File level ─────────────────────────────────────────────────────────
  const present = presentColumns(headings, schema)
  const unknown = unknownColumns(headings, schema)

  /* Counted across the whole file so the sharing reminder is given once.
   * Nothing readable from here proves a file is shared, so a per row warning
   * would fire on every single Drive link and teach the office to scroll past
   * warnings, which is worse than not warning at all. */
  let driveLinks = 0

  for (const col of schema.columns.filter(c => c.required)) {
    if (!present.includes(col)) {
      push('error', null, col.key,
        `There is no ${col.key} column. Every entry needs one, so nothing here can be published.`)
    }
  }
  for (const h of unknown) {
    push('warning', null, h,
      `The column "${h}" is not one the website reads, so it will be ignored. Check the spelling against the template.`)
  }
  if (!rows.length) {
    push('error', null, null, 'The file has a heading row but no entries below it.')
  }

  // ── Row level ──────────────────────────────────────────────────────────
  rows.forEach((row, i) => {
    const n = i + 2                       // +1 for the heading row, +1 for 1 based counting
    const val = (key) => get(row, schema.columns.find(c => c.key === key) || { aliases: [key] })

    // Required values
    for (const col of schema.columns.filter(c => c.required)) {
      if (!get(row, col)) {
        push('error', n, col.key,
          `No ${col.key}. This whole row will be skipped.`)
      }
    }

    // Campus
    const campus = String(val('campus') || '').toLowerCase().trim()
    if (!CAMPUS_VALUES.includes(campus)) {
      push('error', n, 'campus',
        `"${val('campus')}" is not a campus. Use nalugala, bunono, or leave it blank for both. As written, this row will never appear.`)
    }

    if (kind === 'announcements') {
      const raw = val('date')
      if (raw && !parseDate(raw) && !/^[A-Za-z]/.test(raw)) {
        push('warning', n, 'date',
          `${dateProblem(raw)} It will be printed exactly as typed instead.`)
      }
      const exp = val('expires')
      if (exp && !parseDate(exp)) {
        push('error', n, 'expires',
          `${dateProblem(exp)} This notice will never expire as written.`)
      } else if (exp && parseDate(exp) < today) {
        push('warning', n, 'expires',
          `This expired on ${exp}, so parents will not see it. Clear the column to bring it back.`)
      }
      const link = val('link')
      if (link && !/^(\/|https?:\/\/)/.test(link)) {
        push('error', n, 'link',
          `"${link}" is not a working destination. Use /admissions for a page on this site, or a full address beginning https://`)
      } else if (link) {
        const problem = internalRouteProblem(link)
        if (problem) push('error', n, 'link', problem)
      }
      const pinned = String(val('pinned') || '').toLowerCase().trim()
      if (pinned && !/^(yes|y|true|1|x|no|n|false|0)$/.test(pinned)) {
        push('warning', n, 'pinned',
          `"${val('pinned')}" is read as "no". Type yes to pin this to the top.`)
      }
      if (!val('body')) {
        push('warning', n, 'body', 'No body text, so only the headline will show.')
      }
    }

    if (kind === 'events') {
      const rawStart = val('start')
      const start = parseDate(rawStart)
      if (rawStart && !start) {
        push('error', n, 'start',
          `${dateProblem(rawStart)} This event cannot be shown at all until it is corrected.`)
      }
      const rawEnd = val('end')
      const end = parseDate(rawEnd)
      if (rawEnd && !end) {
        push('error', n, 'end', dateProblem(rawEnd))
      } else if (start && end && end < start) {
        push('error', n, 'end',
          'The end date is before the start date, so the dates are the wrong way round.')
      }
      for (const key of ['time', 'endtime']) {
        const t = val(key)
        if (t && !parseTime(t)) {
          push('error', n, key,
            `"${t}" is not a time. Use 09:00, 14:30 or 2:30 pm. Leave it blank for an all day entry.`)
        }
      }
      if (start && (end || start) < today) {
        push('warning', n, 'start',
          'This date has already passed, so it sits under "Show earlier dates" rather than in the main list.')
      }
    }

    if (kind === 'documents') {
      const url = val('url')
      if (url && !/^(\/|https?:\/\/)/.test(url)) {
        push('error', n, 'url',
          `"${url}" will not open. Use a full address beginning https:// or, for a page on this site, /admissions`)
      } else if (url) {
        const problem = internalRouteProblem(url)
        if (problem) push('error', n, 'url', problem)
      }
      /* Drive links are rewritten into a direct download on the way in, by
       * directDownloadUrl in schoolData.js, so the preview page problem no
       * longer needs reporting and the office never has to learn a second URL
       * format. Two things rewriting cannot fix are still worth saying. */
      if (/^https?:\/\/(drive|docs)\.google\.com/.test(url)) {
        driveLinks++
        if (/\/(drive\/)?(u\/\d+\/)?folders\//.test(url)) {
          push('warning', n, 'url',
            'This links to a Drive folder rather than to one document, so parents land in a list of files and have to guess which one they came for. Link the file itself.')
        }
        if (!val('filetype')) {
          push('warning', n, 'filetype',
            'A Drive link does not say what sort of file it is, so this will show as FILE. Type PDF or DOCX here.')
        }
      }
      const upd = val('updated')
      if (upd && !parseDate(upd)) {
        push('warning', n, 'updated', `${dateProblem(upd)} No updated date will be shown.`)
      }
      if (!val('description')) {
        push('warning', n, 'description', 'No description, so parents only see the title.')
      }
    }
  })

  if (driveLinks) {
    push('warning', null, 'url',
      `${driveLinks} ${driveLinks === 1 ? 'document is' : 'documents are'} kept in Google Drive. `
      + 'Open each one in Drive, press Share, and set General access to Anyone with the link. '
      + 'Without that, parents see a Request access screen instead of the document, and nothing on this page can detect it.')
  }

  const counts = {
    errors:   issues.filter(i => i.level === 'error').length,
    warnings: issues.filter(i => i.level === 'warning').length,
    rows:     rows.length,
  }
  return { issues, counts, present, unknown }
}

function escapeCsv(value) {
  const s = String(value ?? '')
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
}

/** Uploaded rows flattened into the canonical column order, as plain strings. */
export function toRowArrays(rows, kind) {
  const cols = SCHEMAS[kind].columns
  return rows.map(row => cols.map(c => get(row, c)))
}

/** A schema's example rows in the canonical column order. */
export function exampleRowArrays(kind) {
  const schema = SCHEMAS[kind]
  return (schema.examples || []).map(ex => schema.columns.map(c => ex[c.key] ?? ''))
}

/** Rebuilds a tidy CSV in the canonical column order, ready to import to Sheets. */
export function toCleanCsv(rows, kind) {
  const cols = SCHEMAS[kind].columns
  const lines = [cols.map(c => c.key).join(',')]
  for (const values of toRowArrays(rows, kind)) {
    lines.push(values.map(escapeCsv).join(','))
  }
  return lines.join('\r\n') + '\r\n'
}

/* A starter file for the office to fill in.
 *
 * Generated from the same SCHEMAS the validator checks against, rather than kept
 * as a separate file somewhere, so a template can never drift out of step with
 * what the website actually reads.
 *
 * `withExamples` includes filled in rows showing the accepted formats. Blank
 * gives the heading row only, for someone who already knows the columns. */
export function templateCsv(kind, { withExamples = true } = {}) {
  const lines = [SCHEMAS[kind].columns.map(c => c.key).join(',')]
  if (withExamples) {
    for (const values of exampleRowArrays(kind)) lines.push(values.map(escapeCsv).join(','))
  }
  return lines.join('\r\n') + '\r\n'
}
