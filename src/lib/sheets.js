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
 * The sheets themselves must be shared as "anyone with the link, Viewer".
 * Publishing to the web is not required; the export endpoint below already
 * allows the site to read a link shared sheet.
 *
 * An environment variable of the same name still wins if one is set, which
 * leaves room for a staging sheet without editing this file.
 */

const sheet = (id) => `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`
const edit  = (id) => `https://docs.google.com/spreadsheets/d/${id}/edit`

const IDS = {
  announcements: '1gf8wsrDXxi3SiiBUbDWeLwT0Q0YtPHFDV6GPrvQA0rw',
  events:        '',      // not created yet; the Calendar page shows its empty state
  documents:     '',      // not created yet; the Downloads page shows its empty state
}

/** CSV address the site reads content from. */
export const SHEET_URLS = {
  announcements: IDS.announcements ? sheet(IDS.announcements) : '',
  events:        IDS.events        ? sheet(IDS.events)        : '',
  documents:     IDS.documents     ? sheet(IDS.documents)     : '',
}

/** Normal editing address, used for the Open the sheet button on /admin. */
export const SHEET_EDIT_URLS = {
  announcements: IDS.announcements ? edit(IDS.announcements) : '',
  events:        IDS.events        ? edit(IDS.events)        : '',
  documents:     IDS.documents     ? edit(IDS.documents)     : '',
}
