/* Minimal RFC 4180 CSV parser.
 *
 * Written by hand rather than pulled from npm because the only CSV this site
 * ever reads is a Google Sheet the school maintains, and a dependency (plus its
 * future security updates) is not worth it for about fifty lines.
 *
 * Handles: quoted fields, commas and newlines inside quotes, escaped double
 * quotes (""), CRLF line endings, and the UTF-8 byte order mark that Google
 * Sheets puts at the start of every export.
 */

// U+FEFF, the byte order mark. Written as a code point rather than pasted in,
// so the character never sits invisibly in this source file.
const BOM = 0xFEFF

export function parseCsv(text) {
  const raw = String(text ?? '')
  const src = raw.charCodeAt(0) === BOM ? raw.slice(1) : raw
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < src.length; i++) {
    const c = src[i]

    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') { field += '"'; i++ }   // escaped quote
        else inQuotes = false
      } else {
        field += c
      }
      continue
    }

    if (c === '"')                      { inQuotes = true }
    else if (c === ',')                 { row.push(field); field = '' }
    else if (c === '\n' || c === '\r')  {
      // Swallow the \n of a \r\n pair.
      if (c === '\r' && src[i + 1] === '\n') i++
      row.push(field); field = ''
      rows.push(row); row = []
    }
    else                                { field += c }
  }

  // Flush whatever is left, since a file need not end with a newline.
  row.push(field)
  rows.push(row)

  // Drop trailing blank lines, of which Sheets exports plenty.
  return rows.filter(r => r.some(cell => cell.trim() !== ''))
}

/* Canonical form of a column heading, so "Start Date", "start_date" and
 * "startdate" all resolve to the same key. */
export function canonical(key) {
  return String(key ?? '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

/* Parses CSV text into row objects keyed by canonicalised headings.
 * The first non empty line is treated as the header row. */
export function csvToObjects(text) {
  const rows = parseCsv(text)
  if (rows.length < 2) return []

  const headers = rows[0].map(canonical)
  return rows.slice(1).map((cells) => {
    const obj = {}
    headers.forEach((h, i) => { if (h) obj[h] = (cells[i] ?? '').trim() })
    return obj
  })
}

/* Reads the first non empty value among several possible column names, so the
 * school can head a column "Details" or "Description" and both will work. */
export function pick(row, ...names) {
  for (const n of names) {
    const v = row[canonical(n)]
    if (v !== undefined && v !== '') return v
  }
  return ''
}

/* Loose truthiness for spreadsheet cells: yes / y / true / 1 / x */
export function truthy(value) {
  return /^(yes|y|true|1|x)$/i.test(String(value ?? '').trim())
}
