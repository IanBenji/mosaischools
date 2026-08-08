/* Where the school's content sheets live.
 *
 * Committed on purpose, rather than kept in .env.
 *
 * These addresses are not secrets. Every one of them ends up in the JavaScript
 * the browser downloads, because a site with no server has to fetch the sheet
 * from the visitor's own browser. Keeping them in a git ignored .env therefore
 * bought no secrecy at all, while guaranteeing they went missing on any host
 * that builds from the repository. That is exactly what happened on Vercel: the
 * site built, but with no sheet address, so it quietly showed the bundled
 * fallback notices instead of the school's real ones.
 *
 * Putting them here means every deploy target works with no configuration.
 *
 * ── One workbook, one tab per dataset ────────────────────────────────────
 * All three datasets live as tabs inside a single spreadsheet rather than in
 * three separate files. The office then has one link to bookmark, one file to
 * find and one sharing setting to get right, which matters a great deal for
 * people who do not work in spreadsheets all day. Google exports any single tab
 * as CSV through the same export endpoint, given that tab's gid.
 *
 * The workbook must be shared as "anyone with the link, Viewer". Publishing to
 * the web is not required; the export endpoint already allows the site to read
 * a link shared sheet, and returns Access-Control-Allow-Origin: *.
 *
 * ── Finding a tab's gid ──────────────────────────────────────────────────
 * Open the tab in Google Sheets and read it off the address bar, after #gid=.
 *
 * Do not assume the first tab is gid=0. Google keeps a tab's original id when
 * it is renamed or recreated, so gid 0 frequently does not exist at all: on
 * this workbook it returns a 400. Always copy the real value.
 *
 * An environment variable of the same name still wins if one is set, which
 * leaves room for a staging sheet without editing this file.
 */

const csv  = (id, gid) => `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`
const edit = (id, gid) => `https://docs.google.com/spreadsheets/d/${id}/edit#gid=${gid}`

/** The school's content workbook. Every dataset below is a tab inside it. */
const WORKBOOK = '1gf8wsrDXxi3SiiBUbDWeLwT0Q0YtPHFDV6GPrvQA0rw'

/* A dataset needs BOTH an id and a gid before it counts as configured.
 *
 * Requiring the gid is a safety rule, not bookkeeping. Omitting it from the
 * export URL does not fail: Google quietly serves the workbook's first tab
 * instead. A half filled entry here would therefore put announcements on the
 * Calendar page rather than showing the empty state, and it would look
 * plausible enough that nobody would question it. Missing gid means off. */
const TABS = {
  announcements: { id: WORKBOOK, gid: '2135516892' },
  events:        { id: WORKBOOK, gid: '60151697' },
  documents:     { id: WORKBOOK, gid: '1424701768' },
}

const build = (fn) => Object.fromEntries(
  Object.entries(TABS).map(([name, { id, gid }]) => [name, id && gid ? fn(id, gid) : '']),
)

/** CSV address the site reads content from. */
export const SHEET_URLS = build(csv)

/** Normal editing address, used for the Open the sheet button on /admin. */
export const SHEET_EDIT_URLS = build(edit)
