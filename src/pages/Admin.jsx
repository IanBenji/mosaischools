import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Upload, FileSpreadsheet, CheckCircle2, AlertTriangle, XCircle, Download,
  Eye, RotateCcw, Info, ArrowRight, CalendarDays, MapPin, FolderOpen, FileDown,
  ExternalLink, Printer, ChevronDownSquare, Copy, Check,
} from 'lucide-react'
import {
  getSheetLink, setSheetLink, isSheetLinkFixed, looksLikeSheetLink,
} from '../lib/sheetLinks'
import { canonical, parseCsv } from '../lib/csv'
import {
  SCHEMAS, validateSheet, toCleanCsv, templateCsv,
  schemaScore, sheetNameScore, suggestColumn, dropdownColumns,
} from '../lib/validateSheet'
import { downloadTemplateXlsx, downloadCleanXlsx } from '../lib/templateFile'
import {
  DATASETS, visibleAnnouncements, upcomingEvents, pastEvents,
  groupEventsByMonth, groupDocuments, eventWhen, colourFor, formatDateShort,
} from '../lib/schoolData'

/* Staff only. Checks a spreadsheet before the office publishes it.
 *
 * Deliberately plain rather than styled like the rest of the site, so nobody
 * mistakes it for a parent facing page. It is not in the navigation, it is
 * disallowed in robots.txt, and it is loaded as its own chunk so that parents
 * never download any of it.
 *
 * Nothing here writes anywhere. It reads the file in your browser, tells you
 * what the website would make of it, and lets you export a tidy copy.
 */

const KINDS = ['announcements', 'events', 'documents']

// U+FEFF. Written as an escape so the character never sits invisibly in this file.
const BOM = String.fromCharCode(0xFEFF)

// Excel gives back real Date objects and numbers; the rest of the pipeline
// expects the text a person would have typed.
/* Excel gives back real Date objects and numbers; the rest of the pipeline
 * expects the text a person would have typed.
 *
 * Read in UTC, deliberately. An Excel date is a timezone free serial number and
 * the reader maps it to midnight UTC, so 7 September arrives as
 * 2026-09-07T00:00:00Z. Asking that date for its LOCAL day gives the 6th on any
 * machine west of Greenwich, which would quietly shift every date in the file by
 * a day. The UTC accessors give the day that was actually typed, anywhere. */
function cellToText(v) {
  if (v === null || v === undefined) return ''
  if (v instanceof Date) {
    const p = (n) => String(n).padStart(2, '0')
    // Excel stores a bare time as a fraction of a day against its own epoch. If
    // someone types 07:30 into a time column, Excel may hand it back as a date
    // in 1899, so read anything that old as the time it really is rather than
    // publishing a nonsense date.
    if (v.getUTCFullYear() < 1901) return `${p(v.getUTCHours())}:${p(v.getUTCMinutes())}`
    return `${v.getUTCFullYear()}-${p(v.getUTCMonth() + 1)}-${p(v.getUTCDate())}`
  }
  return String(v).trim()
}

function tableToObjects(table, headerIndex = 0) {
  if (!table.length) return { headings: [], rows: [] }
  const headings = (table[headerIndex] || []).map(cellToText)
  const keys = headings.map(canonical)
  const rows = table.slice(headerIndex + 1)
    .filter(r => r.some(c => cellToText(c) !== ''))
    .map((cells) => {
      const o = {}
      keys.forEach((k, i) => { if (k) o[k] = cellToText(cells[i]) })
      return o
    })
  return { headings, rows }
}

/* Finds the heading row, the worksheet and the dataset all at once.
 *
 * Real school spreadsheets rarely begin with the headings. There is usually a
 * title across the top, sometimes a logo, often a blank row, and the workbook
 * may hold several sheets. Rather than demanding a perfectly shaped file, score
 * the first few rows of every sheet against each dataset and take the best
 * match. `score` of 0 means nothing here looked like any of them.
 */
const HEADER_SCAN_ROWS = 15

function detectLayout(sheets) {
  let best = { sheetIndex: 0, headerIndex: 0, kind: null, score: 0, columnScore: 0 }
  sheets.forEach((sheet, sheetIndex) => {
    const limit = Math.min(sheet.table.length, HEADER_SCAN_ROWS)
    for (let headerIndex = 0; headerIndex < limit; headerIndex++) {
      const headings = (sheet.table[headerIndex] || []).map(cellToText)
      if (!headings.some(Boolean)) continue
      for (const kind of KINDS) {
        const columnScore = schemaScore(headings, kind)
        // The worksheet name helps identify which dataset it is, but is tracked
        // separately so a well named tab full of nonsense is still reported as
        // unrecognised.
        const score = columnScore + sheetNameScore(sheet.name, kind)
        if (score > best.score) best = { sheetIndex, headerIndex, kind, score, columnScore }
      }
    }
  })
  return best
}

export default function Admin() {
  const [kind, setKind]         = useState('announcements')
  const [fileName, setFileName] = useState('')
  const [sheets, setSheets]     = useState([])     // [{ name, table }]
  const [layout, setLayout]     = useState(null)   // { sheetIndex, headerIndex, kind, score }
  const [parseError, setParseError] = useState('')
  const [busy, setBusy]         = useState(false)
  const [dragging, setDragging] = useState(false)
  const [previewCampus, setPreviewCampus] = useState('nalugala')
  const [format, setFormat] = useState('xlsx')   // what downloads come out as
  const [linkDraft, setLinkDraft] = useState('')
  const [linkTick, setLinkTick]   = useState(0)  // re-reads the stored link
  const inputRef = useRef(null)

  const sheetLink = useMemo(() => {
    void linkTick            // re-read the stored link whenever it is changed
    return getSheetLink(kind)
  }, [kind, linkTick])

  function saveLink() {
    setSheetLink(kind, linkDraft)
    setLinkDraft('')
    setLinkTick(t => t + 1)
  }

  // Keep this page out of search results.
  useEffect(() => {
    document.title = 'Content check | MOSAI Schools staff'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => { meta.remove() }
  }, [])

  const handleFile = useCallback(async (file) => {
    if (!file) return
    setBusy(true)
    setParseError('')
    setFileName(file.name)
    try {
      let loaded                                   // [{ name, table }]
      if (/\.xlsx$/i.test(file.name)) {
        // The browser build specifically; the package root is for Node only.
        // Loaded on demand, so it costs nothing until someone drops an .xlsx.
        //
        // The default export returns every worksheet, shaped { sheet, data }.
        // We want them all, because the data is not always on the first one.
        const { default: readXlsxFile } = await import('read-excel-file/browser')
        const workbook = await readXlsxFile(file)
        loaded = workbook.map((s, i) => ({ name: s.sheet || `Sheet ${i + 1}`, table: s.data }))
      } else if (/\.csv$/i.test(file.name) || file.type === 'text/csv') {
        loaded = [{ name: 'CSV', table: parseCsv(await file.text()) }]
      } else if (/\.xls$/i.test(file.name)) {
        throw new Error('That is the older .xls format, which browsers cannot read. Open it in Excel, choose Save As, and pick Excel Workbook (.xlsx) or CSV.')
      } else {
        throw new Error('Please choose a .csv or .xlsx file.')
      }

      loaded = loaded.filter(s => Array.isArray(s.table) && s.table.length)
      if (!loaded.length) throw new Error('That file has no rows in it at all.')

      const best = detectLayout(loaded)
      setSheets(loaded)
      setLayout(best)
      if (best.kind) setKind(best.kind)
    } catch (err) {
      setParseError(err?.message || 'That file could not be read.')
      setSheets([]); setLayout(null)
    } finally {
      setBusy(false)
    }
  }, [])

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  function reset() {
    setFileName(''); setSheets([]); setLayout(null); setParseError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const schema = SCHEMAS[kind]

  // The chosen sheet, read from the chosen heading row.
  const { headings, rows: raw } = useMemo(() => {
    if (!layout || !sheets.length) return { headings: [], rows: [] }
    const sheet = sheets[layout.sheetIndex]
    if (!sheet) return { headings: [], rows: [] }
    return tableToObjects(sheet.table, layout.headerIndex)
  }, [sheets, layout])

  // No column in the file looked like any of the three sheets. Judged on the
  // columns alone, so a tab named "News" holding nothing useful still counts.
  const unrecognised = Boolean(layout) && layout.columnScore === 0

  const result = useMemo(
    () => (raw.length || headings.length ? validateSheet(headings, raw, kind) : null),
    [headings, raw, kind],
  )

  // Normalised through the very same function the live site uses, so the
  // preview cannot drift from what parents will actually see.
  const normalised = useMemo(() => {
    if (!raw.length) return []
    return raw.map(DATASETS[kind].normalise).filter(r => r.title)
  }, [raw, kind])

  function downloadCsv(text, filename) {
    // A byte order mark, so Excel opens the file as UTF-8 and does not mangle
    // names with accents. Our own parser strips it again on the way back in.
    const blob = new Blob([BOM + text], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a); a.click(); a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const asExcel = format === 'xlsx'

  function downloadTemplate(k, withExamples) {
    if (asExcel) return downloadTemplateXlsx(k, { withExamples })
    downloadCsv(templateCsv(k, { withExamples }), `mosai-${k}-${withExamples ? 'template' : 'blank'}.csv`)
  }

  function downloadClean() {
    if (asExcel) return downloadCleanXlsx(kind, raw)
    downloadCsv(toCleanCsv(raw, kind), `mosai-${kind}-tidy.csv`)
  }

  const rowIssues = result ? result.issues.filter(i => i.row !== null) : []
  const fileIssues = result ? result.issues.filter(i => i.row === null) : []

  /* A required column is missing. This covers the file nothing matched at all
   * and, far more commonly, the file where the office simply used its own
   * wording: "Event Name" where we expect "title". Both need the same help. */
  const missingRequired = result
    ? SCHEMAS[kind].columns.filter(c => c.required && !result.present.includes(c))
    : []
  const needsRenaming = missingRequired.length > 0

  return (
    <main className="min-h-screen bg-slate-100 pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Header */}
        <header className="mb-8">
          <p className="font-body text-xs font-bold tracking-widest text-slate-400 uppercase">
            Staff tool, not linked from the website
          </p>
          <h1 className="mt-1 font-heading text-3xl font-extrabold text-slate-800">
            Check content before you publish
          </h1>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-500">
            Drop in the Excel file or CSV you are about to put in the Google Sheet. This page reads
            it in your browser, tells you about anything that would break or quietly not appear, and
            shows you exactly how each entry will look to parents.
          </p>

          {/* Said plainly and up front, because the absence of a Save button is
              otherwise read as something being broken. */}
          <div className="mt-4 flex max-w-2xl items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
            <p className="font-body text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-800">There is no Save button here, on purpose.</span>{' '}
              This page cannot change the website. Checking happens here; saving happens in the
              Google Sheet, and takes three clicks once it is set up. The steps are at the bottom of
              this page.
            </p>
          </div>
        </header>

        {/* Drop zone */}
        <section
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`rounded-2xl border-2 border-dashed bg-white p-8 text-center transition-colors ${
            dragging ? 'border-mosai-blue bg-blue-50' : 'border-slate-300'
          }`}
        >
          <Upload className="mx-auto mb-3 h-9 w-9 text-slate-400" />
          <p className="font-heading text-base font-bold text-slate-700">
            Drop your file here, or choose one
          </p>
          <p className="mt-1 font-body text-xs text-slate-400">
            Excel (.xlsx) or CSV. Nothing leaves this computer.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-800 px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-slate-700"
          >
            <FileSpreadsheet className="h-4 w-4" /> Choose a file
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,text/csv"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {fileName && (
            <p className="mt-4 flex items-center justify-center gap-2 font-body text-sm text-slate-600">
              <FileSpreadsheet className="h-4 w-4 text-slate-400" />
              <span className="font-semibold">{fileName}</span>
              <button type="button" onClick={reset} className="ml-2 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700">
                <RotateCcw className="h-3 w-3" /> clear
              </button>
            </p>
          )}
          {busy && <p className="mt-3 font-body text-sm text-slate-400">Reading the file…</p>}
        </section>

        {parseError && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <p className="font-body text-sm text-red-800">{parseError}</p>
          </div>
        )}

        {/* Templates. Always available, because the commonest question is
            "what am I meant to type in?" rather than "is this file right?" */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-slate-800">
              <FileDown className="h-5 w-5 text-slate-400" /> Start from a template
            </h2>
            <div className="flex gap-1 rounded-full bg-slate-100 p-1">
              {[['xlsx', 'Excel'], ['csv', 'CSV']].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormat(value)}
                  className={`rounded-full px-4 py-1.5 font-heading text-xs font-bold transition-colors ${
                    format === value ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-500">
            Download the right one, open it in Excel, fill in your own rows and keep the heading row
            exactly as it is. Then bring it back here to be checked. Every template is built from the
            same rules this page checks against, so it is always current.
          </p>

          <div className="mt-5 divide-y divide-slate-100">
            {KINDS.map((k) => (
              <div key={k} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-heading text-sm font-extrabold text-slate-800">{SCHEMAS[k].label}</p>
                  <p className="font-body text-xs text-slate-400">Feeds {SCHEMAS[k].feeds}.</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => downloadTemplate(k, true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-4 py-2 font-heading text-xs font-bold text-white transition-colors hover:bg-slate-700"
                  >
                    <Download className="h-3.5 w-3.5" /> With examples
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadTemplate(k, false)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 font-heading text-xs font-bold text-slate-600 transition-colors hover:bg-slate-200"
                  >
                    <Download className="h-3.5 w-3.5" /> Headings only
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 font-body text-xs text-slate-400">
            {asExcel
              ? 'Excel workbooks, with the heading row frozen and every date column fixed to the year, month, day order so it cannot be misread. Fill it in, save it, and bring it back here.'
              : 'Plain CSV, which both Excel and Google Sheets open directly. Choose Excel above if you would rather have a workbook with the columns already sized.'}
          </p>
        </section>

        {/* Dropdowns are set up in Google Sheets, not here, so this section can
            only hand over the exact values and say where they go. Keeping the
            lists on this page rather than in a document means they are read
            from the same schema the checker judges an upload against, and so
            cannot quietly fall out of step with it. */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-slate-800">
            <ChevronDownSquare className="h-5 w-5 text-slate-400" /> Turn the fixed columns into dropdowns
          </h2>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-500">
            Some columns only ever hold one of a few values. Making those a dropdown in the sheet
            means picking from a list instead of typing, which is the single best way to stop a
            misspelt value quietly hiding a row from parents. This is set up once, in Google Sheets.
          </p>

          <ol className="mt-4 max-w-2xl list-decimal space-y-1.5 pl-5 font-body text-sm text-slate-600">
            <li>Open the sheet and click the letter at the top of the column to select it.</li>
            <li>Menu <strong>Data</strong>, then <strong>Data validation</strong>, then <strong>Add rule</strong>.</li>
            <li>Set Criteria to <strong>Dropdown</strong> and paste the values below as the items.</li>
            <li>Under Advanced options choose what happens to anything else, as noted per column.</li>
            <li>Press <strong>Done</strong>. Existing rows keep whatever they already say.</li>
          </ol>

          {/* The letters come from the full template. A sheet that leaves out an
              optional column shifts everything after it, and the live
              announcements tab does exactly that, so campus sits at E there
              rather than F. Better to say so than to have someone put a campus
              rule on the link column and wonder why nothing is caught. */}
          <p className="mt-3 max-w-2xl font-body text-xs text-slate-400">
            These letters assume every column of the template is present. If your tab leaves an
            optional column out, everything after it shifts one place left, so read the heading
            in the sheet rather than trusting the letter.
          </p>

          <div className="mt-5 space-y-5">
            {KINDS.map((k) => (
              <div key={k}>
                <p className="font-heading text-sm font-extrabold text-slate-800">{SCHEMAS[k].label}</p>
                <div className="mt-2 space-y-2">
                  {dropdownColumns(k).map((c) => (
                    <DropdownValues key={c.key} column={c} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What we actually found in the file. Shown before any verdict, because
            when something is wrong this is nearly always where the answer is. */}
        {sheets.length > 0 && layout && (
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-slate-800">
              <FileSpreadsheet className="h-5 w-5 text-slate-400" /> What was found in your file
            </h2>

            {sheets.length > 1 && (
              <div className="mt-4">
                <p className="font-body text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  Worksheets ({sheets.length})
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sheets.map((s, i) => (
                    <button
                      key={s.name + i}
                      type="button"
                      onClick={() => setLayout(l => ({ ...l, sheetIndex: i, headerIndex: 0 }))}
                      className={`rounded-full px-4 py-1.5 font-heading text-xs font-bold transition-colors ${
                        layout.sheetIndex === i ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="font-body text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Heading row
              </label>
              <select
                value={layout.headerIndex}
                onChange={(e) => setLayout(l => ({ ...l, headerIndex: Number(e.target.value) }))}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-body text-sm text-slate-700"
              >
                {(sheets[layout.sheetIndex]?.table || [])
                  .slice(0, HEADER_SCAN_ROWS)
                  .map((cells, i) => {
                    const preview = cells.map(cellToText).filter(Boolean).slice(0, 4).join(', ')
                    return (
                      <option key={i} value={i}>
                        Row {i + 1}{preview ? `: ${preview.slice(0, 60)}` : ' (empty)'}
                      </option>
                    )
                  })}
              </select>
              {layout.headerIndex > 0 && (
                <span className="font-body text-xs text-slate-400">
                  The {layout.headerIndex === 1 ? 'row' : `${layout.headerIndex} rows`} above this
                  {layout.headerIndex === 1 ? ' is' : ' are'} being ignored.
                </span>
              )}
            </div>

            <p className="mt-4 font-body text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Column headings read ({headings.filter(Boolean).length})
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {headings.filter(Boolean).length === 0 && (
                <span className="font-body text-sm text-slate-400">None. That row is empty.</span>
              )}
              {headings.filter(Boolean).map((h, i) => {
                const known = result?.present.some(c => c.aliases.some(a => a.toLowerCase().replace(/[^a-z0-9]/g, '') === h.toLowerCase().replace(/[^a-z0-9]/g, '')))
                return (
                  <span
                    key={h + i}
                    className={`rounded-full px-3 py-1.5 font-body text-xs font-semibold ${
                      known ? 'bg-green-50 text-green-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {h}
                  </span>
                )
              })}
            </div>
            <p className="mt-3 font-body text-sm text-slate-500">
              {raw.length} {raw.length === 1 ? 'row' : 'rows'} of data below the heading row.
            </p>
          </section>
        )}

        {/* A required column is missing, so some or all of the file will be
            skipped. This is where the actual fix gets spelled out. */}
        {needsRenaming && (
          <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-amber-900">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {unrecognised
                ? 'This file was not recognised'
                : `Your ${missingRequired.map(c => c.key).join(' and ')} column is missing`}
            </h2>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-amber-900">
              {unrecognised
                ? 'None of the rows looked like any of the three sheets. Usually the headings are named something else, or they are not on the row shown above. Pick the correct worksheet and heading row, or rename your columns to match.'
                : 'Nothing will be published until this is fixed. Almost always it just means a column is called something different in your file. Rename the heading and upload again, or pick a different heading row above.'}
            </p>

            {/* The headings we could not use, each with the column it most
                likely was. This is the sentence that fixes the file. */}
            {result.unknown.length > 0 && (
              <div className="mt-5 rounded-xl bg-white p-4">
                <p className="font-heading text-sm font-extrabold text-slate-800">
                  Headings that were ignored
                </p>
                <ul className="mt-2 space-y-1.5">
                  {result.unknown.map((h, i) => {
                    const guess = suggestColumn(h, kind)
                    const wanted = guess && missingRequired.some(c => c.key === guess)
                    return (
                      <li key={h + i} className="font-body text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">{h}</span>
                        {guess ? (
                          <>
                            <span className="text-slate-400"> is probably your </span>
                            <span className="font-semibold text-slate-800">{guess}</span>
                            <span className="text-slate-400"> column. Rename the heading to </span>
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-slate-800">{guess}</span>
                            {wanted && <span className="font-semibold text-amber-700"> (this is the one that is missing)</span>}
                          </>
                        ) : (
                          <span className="text-slate-400"> does not match any column we read, so it will be ignored.</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div className="mt-5 rounded-xl bg-white p-4">
              <p className="font-heading text-sm font-extrabold text-slate-800">
                What {SCHEMAS[kind].label} must have
              </p>
              <ul className="mt-2 space-y-1">
                {SCHEMAS[kind].columns.filter(c => c.required).map((c) => {
                  const ok = !missingRequired.includes(c)
                  return (
                    <li key={c.key} className="font-body text-sm">
                      <span className={ok ? 'text-green-700' : 'font-semibold text-amber-800'}>
                        {ok ? 'Found' : 'Missing'}: {c.key}
                      </span>
                      <span className="text-slate-400">
                        {' '}(can also be called {c.aliases.filter(a => a !== c.key).join(', ') || c.key}). {c.help}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="mt-5 font-body text-sm text-amber-900">
              If it is easier, download a template above, paste your rows underneath its heading row,
              and upload that instead.
            </p>
          </section>
        )}

        {result && (
          <>
            {/* Which sheet is this */}
            <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-extrabold text-slate-800">This file is being read as</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {KINDS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k)}
                    className={`rounded-full px-4 py-2 font-heading text-sm font-bold transition-colors ${
                      kind === k ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {SCHEMAS[k].label}
                  </button>
                ))}
              </div>
              <p className="mt-3 font-body text-sm text-slate-500">
                Feeds {schema.feeds}. If that is wrong, pick the right one above.
              </p>
            </section>

            {/* Verdict */}
            <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Stat label="Entries found" value={result.counts.rows} tone="neutral" />
              <Stat label={result.counts.errors === 1 ? 'Problem' : 'Problems'} value={result.counts.errors} tone={result.counts.errors ? 'bad' : 'good'} />
              <Stat label={result.counts.warnings === 1 ? 'Thing to check' : 'Things to check'} value={result.counts.warnings} tone={result.counts.warnings ? 'warn' : 'good'} />
            </section>

            {result.counts.errors === 0 && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <div>
                  <p className="font-heading text-sm font-bold text-green-900">This file is safe to publish</p>
                  <p className="mt-1 font-body text-sm text-green-800">
                    Open the {schema.label} sheet, then File, Import, Upload, and choose Replace current
                    sheet. The website updates within ten minutes.
                  </p>
                </div>
              </div>
            )}

            {/* Issues */}
            {(fileIssues.length > 0 || rowIssues.length > 0) && (
              <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
                <h2 className="border-b border-slate-100 px-6 py-4 font-heading text-lg font-extrabold text-slate-800">
                  What to look at
                </h2>

                {fileIssues.length > 0 && (
                  <ul className="divide-y divide-slate-100">
                    {fileIssues.map((iss, i) => <IssueRow key={'f' + i} issue={iss} />)}
                  </ul>
                )}
                {rowIssues.length > 0 && (
                  <ul className="divide-y divide-slate-100">
                    {rowIssues.map((iss, i) => <IssueRow key={'r' + i} issue={iss} />)}
                  </ul>
                )}
              </section>
            )}

            {/* Columns understood */}
            <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-extrabold text-slate-800">Columns the website read</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {schema.columns.map((c) => {
                  const on = result.present.includes(c)
                  return (
                    <span
                      key={c.key}
                      title={c.help}
                      className={`rounded-full px-3 py-1.5 font-body text-xs font-semibold ${
                        on ? 'bg-green-50 text-green-800'
                          : c.required ? 'bg-red-50 text-red-700'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {c.key}{c.required && ' *'}{on ? '' : ' (not in your file)'}
                    </span>
                  )
                })}
              </div>
              <p className="mt-3 font-body text-xs text-slate-400">
                Starred columns are required. Hover any column for what it does. Headings are matched
                loosely, so Start Date, start_date and startdate are all the same column.
              </p>
            </section>

            {/* Preview */}
            {normalised.length > 0 && (
              <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-slate-800">
                    <Eye className="h-5 w-5 text-slate-400" /> How parents will see it
                  </h2>
                  <div className="flex gap-1 rounded-full bg-slate-100 p-1">
                    {['nalugala', 'bunono'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPreviewCampus(c)}
                        className={`rounded-full px-4 py-1.5 font-heading text-xs font-bold capitalize transition-colors ${
                          previewCampus === c ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
                        }`}
                      >
                        {c} campus
                      </button>
                    ))}
                  </div>
                </div>
                <Preview kind={kind} rows={normalised} campus={previewCampus} />
              </section>
            )}

            {/* Next steps */}
            <section className="mt-6 rounded-2xl bg-slate-800 p-6 text-white">
              <h2 className="font-heading text-lg font-extrabold">
                Now save it so parents can see it
              </h2>
              <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-slate-300">
                The website reads its content from a Google Sheet. Putting your file into that sheet
                is what publishes it, and it is the same three steps every time.
              </p>

              {sheetLink ? (
                <a
                  href={sheetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-heading text-base font-bold text-slate-800 transition-transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-5 w-5" /> Open the {schema.label} sheet
                </a>
              ) : (
                <div className="mt-5 rounded-xl bg-white/10 p-4">
                  <p className="font-heading text-sm font-bold text-white">
                    Paste the link to the {schema.label} sheet once, and this becomes a button
                  </p>
                  <p className="mt-1 font-body text-xs text-slate-300">
                    Open the sheet in Google Sheets and copy the address from the top of the browser.
                    It is remembered on this computer, so it only needs doing once.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <input
                      type="url"
                      value={linkDraft}
                      onChange={(e) => setLinkDraft(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/..."
                      className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 font-body text-sm text-white placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={saveLink}
                      disabled={!looksLikeSheetLink(linkDraft)}
                      className="rounded-full bg-white px-5 py-2.5 font-heading text-sm font-bold text-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remember it
                    </button>
                  </div>
                </div>
              )}

              <ol className="mt-5 space-y-2 font-body text-sm text-slate-300">
                {[
                  'Press the button above. The sheet opens in a new tab.',
                  'In that tab click File, then Import, then Upload, and choose this same file.',
                  'Choose Replace current sheet, then press Import data.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 font-heading text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-3 font-body text-sm text-slate-300">
                That is it. The website updates itself within ten minutes.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Printer className="h-4 w-4" /> Print these steps
                </button>
                <button
                  type="button"
                  onClick={downloadClean}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Download className="h-4 w-4" /> Tidied copy ({asExcel ? 'Excel' : 'CSV'})
                </button>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  See the live page <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {sheetLink && !isSheetLinkFixed(kind) && (
                <button
                  type="button"
                  onClick={() => { setSheetLink(kind, ''); setLinkDraft(''); setLinkTick(t => t + 1) }}
                  className="mt-3 font-body text-xs text-slate-400 underline hover:text-white"
                >
                  Change the sheet link
                </button>
              )}
            </section>
          </>
        )}

        {/* One page for the office wall. Hidden on screen, and the only thing
            that appears when the page is printed. See index.css. */}
        <section className="print-guide hidden">
          <h1 style={{ fontFamily: 'Nunito, sans-serif', fontSize: '22pt', fontWeight: 800, margin: 0 }}>
            Updating the MOSAI Schools website
          </h1>
          <p style={{ fontSize: '11pt', margin: '4pt 0 0' }}>
            {schema.label}. This updates {schema.feeds}.
          </p>
          <hr style={{ margin: '12pt 0', border: 0, borderTop: '2px solid #1E4D8C' }} />

          <h2 style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14pt', margin: '0 0 6pt' }}>
            Every time you have new information
          </h2>
          <ol style={{ fontSize: '12pt', lineHeight: 1.7, paddingLeft: '18pt', margin: 0 }}>
            <li>Type your rows into the Excel file. Never change the top row of headings.</li>
            <li>
              Go to the checking page and choose your file. Wait for the green box that says
              <strong> This file is safe to publish</strong>. If it is not green, read what it says
              and fix that, then choose the file again.
            </li>
            <li>Press <strong>Open the {schema.label} sheet</strong>. A new tab opens.</li>
            <li>In the new tab press <strong>File</strong>, then <strong>Import</strong>.</li>
            <li>Press <strong>Upload</strong>, then choose the same file again.</li>
            <li>
              Where it says Import location, choose <strong>Replace current sheet</strong>.
              This matters. Any other choice will leave the old information behind.
            </li>
            <li>Press <strong>Import data</strong>.</li>
            <li>Wait ten minutes, then open the website and check it looks right.</li>
          </ol>

          <h2 style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14pt', margin: '16pt 0 6pt' }}>
            If something is not right
          </h2>
          <ul style={{ fontSize: '11pt', lineHeight: 1.6, paddingLeft: '18pt', margin: 0 }}>
            <li>Nothing changed on the website? Wait the full ten minutes, then refresh the page.</li>
            <li>Old entries still showing? The import was probably added instead of replacing. Do it again and choose Replace current sheet.</li>
            <li>An entry is missing? It usually has no title, or its campus is spelled wrong. The checking page will say which row.</li>
            <li>You cannot break the website by uploading a wrong file. The worst that happens is the wrong words appear until you import a corrected one.</li>
          </ul>

          <p style={{ fontSize: '10pt', marginTop: '16pt', color: '#555' }}>
            Checking page: {typeof window !== 'undefined' ? window.location.href : ''}
          </p>
          {sheetLink && (
            <p style={{ fontSize: '10pt', margin: '2pt 0 0', color: '#555', wordBreak: 'break-all' }}>
              {schema.label} sheet: {sheetLink}
            </p>
          )}
        </section>

        {!result && !parseError && (
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 font-heading text-lg font-extrabold text-slate-800">
              <Info className="h-5 w-5 text-slate-400" /> What this page checks
            </h2>
            <ul className="mt-4 space-y-2 font-body text-sm text-slate-600">
              {[
                'Whether the required columns are there at all, and whether any heading is misspelt.',
                'Whether every date can actually be read, and whether an end date falls before its start.',
                'Whether a campus value is one the website knows, because a typo there hides the entry completely.',
                'Whether links will open, and whether a Google Drive link will really download.',
                'Whether anything has already expired or passed, so you are not surprised when it does not show.',
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}

// ── Small pieces ─────────────────────────────────────────────────────────

function Stat({ label, value, tone }) {
  const tones = {
    good:    'bg-green-50 text-green-800',
    bad:     'bg-red-50 text-red-800',
    warn:    'bg-amber-50 text-amber-800',
    neutral: 'bg-white text-slate-800',
  }
  return (
    <div className={`rounded-2xl p-5 shadow-sm ${tones[tone]}`}>
      <p className="font-heading text-3xl font-extrabold">{value}</p>
      <p className="mt-0.5 font-body text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
    </div>
  )
}

/* One column's dropdown values, with the letter to select and a copy button.
 *
 * The letter matters more than it looks: Google's Data validation dialog asks
 * for a range, and counting columns across to work out that campus is I is
 * exactly the step someone gets wrong at the end of a long afternoon. */
function DropdownValues({ column }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(column.values.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* clipboard blocked; the values are on screen to type anyway */ }
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-heading text-xs font-bold text-slate-700">
          Column {column.letter}
          <span className="ml-1.5 font-body font-normal text-slate-400">{column.key}</span>
        </p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-heading text-xs font-bold text-slate-600 shadow-sm transition-colors hover:text-slate-900"
        >
          {copied
            ? <><Check className="h-3.5 w-3.5 text-green-600" /> Copied</>
            : <><Copy className="h-3.5 w-3.5" /> Copy values</>}
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {column.values.map((v) => (
          <span key={v} className="rounded-full bg-white px-2.5 py-1 font-body text-xs text-slate-600 shadow-sm">
            {v}
          </span>
        ))}
      </div>
      <p className="mt-2 font-body text-xs text-slate-400">
        {column.strict
          ? 'Set "If the data is invalid" to Reject the input. Anything outside this list means the row never appears on the website.'
          : 'Set "If the data is invalid" to Show a warning. Another value still works, it simply sorts after the ones listed here.'}
      </p>
    </div>
  )
}

function IssueRow({ issue }) {
  const bad = issue.level === 'error'
  const Icon = bad ? XCircle : AlertTriangle
  return (
    <li className="flex items-start gap-3 px-6 py-4">
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${bad ? 'text-red-500' : 'text-amber-500'}`} />
      <div className="min-w-0">
        <p className="font-body text-sm text-slate-700">{issue.message}</p>
        <p className="mt-0.5 font-body text-xs text-slate-400">
          {issue.row ? `Row ${issue.row}` : 'Whole file'}
          {issue.column ? ` · column "${issue.column}"` : ''}
          {' · '}{bad ? 'will not work' : 'worth checking'}
        </p>
      </div>
    </li>
  )
}

function Preview({ kind, rows, campus }) {
  if (kind === 'announcements') {
    const list = visibleAnnouncements(rows, campus)
    if (!list.length) return <Nothing campus={campus} />
    return (
      <div className="space-y-3">
        {list.map((a, i) => {
          const colour = colourFor(a.category, i)
          return (
            <div key={a.id} className="overflow-hidden rounded-xl border border-slate-200">
              <div className="h-1 w-full" style={{ backgroundColor: colour }} />
              <div className="p-4">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full px-2.5 py-0.5 font-heading text-[11px] font-bold text-white" style={{ backgroundColor: colour }}>
                    {a.category}
                  </span>
                  {a.pinned && <span className="font-heading text-[11px] font-bold text-mosai-red">Pinned</span>}
                  <span className="ml-auto font-body text-xs text-slate-400">{a.dateText || 'Ongoing'}</span>
                </div>
                <p className="font-heading text-base font-extrabold text-slate-800">{a.title}</p>
                {a.body && <p className="mt-1 font-body text-sm text-slate-500">{a.body}</p>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (kind === 'events') {
    const up = upcomingEvents(rows, campus)
    const past = pastEvents(rows, campus)
    if (!up.length && !past.length) return <Nothing campus={campus} />
    return (
      <div className="space-y-6">
        {groupEventsByMonth(up).map(({ label, events }) => (
          <div key={label}>
            <p className="mb-2 font-heading text-sm font-extrabold text-slate-800">{label}</p>
            <div className="space-y-2">
              {events.map((e, i) => {
                const colour = colourFor(e.type, i)
                return (
                  <div key={e.id} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg text-white" style={{ backgroundColor: colour }}>
                      <span className="font-heading text-base leading-none font-extrabold">{e.start.getDate()}</span>
                      <span className="font-body text-[9px] uppercase">{e.start.toLocaleDateString('en-GB', { month: 'short' })}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-extrabold text-slate-800">{e.title}</p>
                      <p className="font-body text-xs text-slate-400">
                        <CalendarDays className="mr-1 inline h-3 w-3" />{eventWhen(e)}
                        {e.location && <> · <MapPin className="mr-1 inline h-3 w-3" />{e.location}</>}
                      </p>
                      {e.details && <p className="mt-0.5 font-body text-xs text-slate-500">{e.details}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {past.length > 0 && (
          <p className="font-body text-xs text-slate-400">
            {past.length} {past.length === 1 ? 'entry has' : 'entries have'} already passed and will sit
            under “Show earlier dates”.
          </p>
        )}
      </div>
    )
  }

  const groups = groupDocuments(rows, campus)
  if (!groups.length) return <Nothing campus={campus} />
  return (
    <div className="space-y-5">
      {groups.map(({ category, docs }, gi) => (
        <div key={category}>
          <p className="mb-2 flex items-center gap-2 font-heading text-sm font-extrabold text-slate-800">
            <FolderOpen className="h-4 w-4 text-slate-400" />{category}
          </p>
          <div className="space-y-2">
            {docs.map((d) => (
              <div key={d.id} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-heading text-[9px] font-extrabold text-white"
                  style={{ backgroundColor: colourFor(category, gi) }}
                >
                  {d.fileType.slice(0, 4)}
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-extrabold text-slate-800">{d.title}</p>
                  {d.summary && <p className="font-body text-xs text-slate-500">{d.summary}</p>}
                  <p className="font-body text-xs text-slate-400">
                    {d.size || 'size not given'}
                    {d.updated ? ` · updated ${formatDateShort(d.updated)}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Nothing({ campus }) {
  return (
    <p className="rounded-xl bg-slate-50 p-6 text-center font-body text-sm text-slate-500">
      Nothing in this file would appear on the <span className="font-semibold capitalize">{campus}</span> campus
      pages. Check the campus column, and whether dates have already passed.
    </p>
  )
}
