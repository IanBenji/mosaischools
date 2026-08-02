/* Real Excel workbooks for the office to fill in.
 *
 * A CSV opens in Excel, but it arrives as an untyped grid: no column widths, no
 * frozen heading, and Excel free to reinterpret anything that looks like a
 * number. A genuine .xlsx lets us hand over something already shaped for the
 * job, which matters when the person filling it in is a school secretary rather
 * than a spreadsheet enthusiast.
 *
 * The writer is imported on demand, so its weight lands only on the staff member
 * who clicks a download and never on a parent reading the site.
 */

import { SCHEMAS, toRowArrays, exampleRowArrays } from './validateSheet.js'
import { parseDate } from './schoolData.js'

/* Dates are written as plain text in year, month, day order, deliberately NOT
 * as Excel date cells.
 *
 * Two hazards are being avoided. A real Excel date is displayed in the machine's
 * locale, so a workbook edited on a US configured laptop comes back reading
 * 9/7/2026, and our parser reads day first, which would silently turn
 * 7 September into 9 July. A real Excel date is also stored as a serial number
 * with no timezone, and converting it back to a JavaScript date shifts it by the
 * reader's offset, which can move an event to the previous day.
 *
 * Text has neither problem: the cell contains 2026-09-07 and comes back as
 * exactly that, on any machine, anywhere. The cost is that Excel will not offer
 * a date picker for these columns, which is a fair price for never showing a
 * parent the wrong day. */
const DATE_COLUMNS = new Set(['date', 'expires', 'start', 'end', 'updated'])

const isoText = (d) => {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

// Roughly how much room each kind of column needs, in characters.
const WIDTHS = {
  title: 34, body: 60, details: 52, description: 52, ticker: 42,
  url: 46, link: 22, location: 22, category: 20, type: 14,
  filetype: 10, size: 10, campus: 12, pinned: 10,
  date: 14, expires: 14, start: 14, end: 14, updated: 14,
  time: 10, endtime: 10,
}

const HEADER_BG = '#1E4D8C'   // mosai blue, so the heading row is obviously not data

function headerRow(kind) {
  return SCHEMAS[kind].columns.map(col => ({
    value: col.key,
    type: String,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: HEADER_BG,
    align: 'left',
  }))
}

function bodyCell(col, value) {
  let text = String(value ?? '').trim()
  if (!text) return null

  if (DATE_COLUMNS.has(col.key)) {
    // Normalise whatever was typed into the unambiguous order. Anything we
    // cannot read is left exactly as written, so the validator can still
    // complain about it rather than it being quietly dropped.
    const d = parseDate(text)
    if (d) text = isoText(d)
  }

  const long = text.length > 45
  return { value: text, type: String, align: 'left', ...(long ? { wrap: true } : {}) }
}

/* The workbook contents, separated from the act of writing a file so the whole
 * shape can be exercised in a test without a browser. */
export function buildSheetData(kind, rowValues) {
  const cols = SCHEMAS[kind].columns
  return [
    headerRow(kind),
    ...rowValues.map(values => cols.map((col, i) => bodyCell(col, values[i]))),
  ]
}

export function sheetOptions(kind) {
  return {
    sheet: SCHEMAS[kind].label.slice(0, 31),   // Excel caps sheet names at 31 characters
    columns: SCHEMAS[kind].columns.map(c => ({ width: WIDTHS[c.key] ?? 18 })),
    stickyRowsCount: 1,                        // the heading stays put while scrolling
  }
}

/* Note the shape of the call. The writer does not take a file name and save it
 * for you; it returns { toBlob, toFile } and the download only happens when
 * toFile is called. Passing a fileName option instead builds the workbook and
 * quietly throws it away. */
async function writeWorkbook(kind, rowValues, fileName) {
  const { default: writeXlsxFile } = await import('write-excel-file/browser')
  await writeXlsxFile(buildSheetData(kind, rowValues), sheetOptions(kind)).toFile(fileName)
}

/** A starter workbook, optionally with worked example rows. */
export function downloadTemplateXlsx(kind, { withExamples = true } = {}) {
  return writeWorkbook(
    kind,
    withExamples ? exampleRowArrays(kind) : [],
    `mosai-${kind}-${withExamples ? 'template' : 'blank'}.xlsx`,
  )
}

/** The uploaded file, tidied into the canonical column order. */
export function downloadCleanXlsx(kind, rows) {
  return writeWorkbook(kind, toRowArrays(rows, kind), `mosai-${kind}-tidy.xlsx`)
}
