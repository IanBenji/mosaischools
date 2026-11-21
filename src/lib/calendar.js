/* Turning school events into .ics files parents can add to their phone.
 *
 * A term-dates page nobody transfers into their own calendar has not really
 * done its job, so every event gets an "Add to my calendar" download and the
 * whole term can be taken in one file. Generated in the browser — no service,
 * no account, works offline.
 *
 * Uganda observes EAT (UTC+3) year-round with no daylight saving, so converting
 * a local time to UTC is a fixed subtraction. That is what keeps this simple.
 */

const EAT_OFFSET_HOURS = 3

const pad = (n) => String(n).padStart(2, '0')
const dateStamp = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`

function utcStamp(date, time) {
  const utc = new Date(Date.UTC(
    date.getFullYear(), date.getMonth(), date.getDate(),
    time.h - EAT_OFFSET_HOURS, time.m, 0,
  ))
  return `${utc.getUTCFullYear()}${pad(utc.getUTCMonth() + 1)}${pad(utc.getUTCDate())}`
       + `T${pad(utc.getUTCHours())}${pad(utc.getUTCMinutes())}00Z`
}

const addDays = (d, n) => {
  const out = new Date(d)
  out.setDate(out.getDate() + n)
  return out
}

/* Escapes per RFC 5545: backslash, semicolon, comma and newlines. */
function esc(text) {
  return String(text ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/* Long lines must be folded at 75 octets, continued with a leading space.
 * Outlook in particular rejects files that skip this. */
function fold(line) {
  if (line.length <= 75) return line
  const parts = [line.slice(0, 75)]
  let rest = line.slice(75)
  while (rest.length > 74) { parts.push(' ' + rest.slice(0, 74)); rest = rest.slice(74) }
  if (rest) parts.push(' ' + rest)
  return parts.join('\r\n')
}

function vevent(event, stamp) {
  const lines = [
    'BEGIN:VEVENT',
    `UID:${event.id}-${dateStamp(event.start)}@mosaischools.com`,
    `DTSTAMP:${stamp}`,
  ]

  if (event.time) {
    // A timed event: exact start, and an end two hours later unless given.
    const endDate = event.end || event.start
    const endTime = event.endTime || { h: event.time.h + 2, m: event.time.m }
    lines.push(`DTSTART:${utcStamp(event.start, event.time)}`)
    lines.push(`DTEND:${utcStamp(endDate, endTime)}`)
  } else {
    // An all-day event. DTEND is exclusive, so it lands on the day after.
    lines.push(`DTSTART;VALUE=DATE:${dateStamp(event.start)}`)
    lines.push(`DTEND;VALUE=DATE:${dateStamp(addDays(event.end || event.start, 1))}`)
  }

  lines.push(`SUMMARY:${esc(event.title)}`)
  if (event.details)  lines.push(`DESCRIPTION:${esc(event.details)}`)
  if (event.location) lines.push(`LOCATION:${esc(event.location)}`)
  lines.push('END:VEVENT')

  return lines.map(fold).join('\r\n')
}

/** Builds a complete .ics document for one or more events. */
export function buildIcs(events, calendarName = 'MOSAI Schools') {
  const usable = events.filter(e => e.start)
  const stamp = `${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MOSAI Schools//Website//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    fold(`X-WR-CALNAME:${esc(calendarName)}`),
    'X-WR-TIMEZONE:Africa/Kampala',
    ...usable.map(e => vevent(e, stamp)),
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}

/** Triggers a download of the given events as a .ics file. */
export function downloadIcs(events, filename = 'mosai-schools.ics', calendarName) {
  const list = Array.isArray(events) ? events : [events]
  const blob = new Blob([buildIcs(list, calendarName)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()

  // Give the browser a moment to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** A safe, readable filename from an event title. */
export function slugify(text) {
  return String(text ?? 'event')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'event'
}

/* A WhatsApp share link — the way information actually travels between parents
 * here is one of them forwarding it to the class group. */
export function whatsappShare(text) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
