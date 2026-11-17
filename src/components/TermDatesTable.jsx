import { CalendarRange, Sun, Info } from 'lucide-react'
import { ACADEMIC_YEAR_2027 as YEAR } from '../lib/schoolData'

/* The official 2027 term dates and term holidays, as two readable tables.
 * A real <table> from the `sm` breakpoint up; stacked cards on phones, so
 * nothing overflows. `variant` switches between the Nalugala (calm) and
 * Bunono (storybook) skins without duplicating the data or the markup. */

function toDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function longDate(iso) {
  return toDate(iso).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

const SKINS = {
  nalugala: {
    card:   'rounded-3xl border border-gray-100 bg-white shadow-sm',
    head:   'bg-mosai-blue-dark text-white',
    foot:   'bg-mosai-blue-light text-mosai-blue-dark',
    title:  'text-mosai-blue-dark',
    text:   'text-gray-700',
    muted:  'text-gray-500',
    rule:   'border-gray-100',
    pill:   'bg-mosai-red text-white',
    hpill:  'bg-mosai-green text-white',
    mobile: 'rounded-2xl border border-gray-100 bg-white',
  },
  bunono: {
    card:   'rounded-[2rem] border-2 border-dashed border-crayon-sky bg-cream',
    head:   'bg-mosai-red text-white',
    foot:   'bg-crayon-sun/30 text-[#43261A]',
    title:  'text-[#43261A]',
    text:   'text-[#43261A]',
    muted:  'text-[#7A5C4A]',
    rule:   'border-crayon-sky/40',
    pill:   'bg-crayon-coral text-white',
    hpill:  'bg-crayon-grass text-white',
    mobile: 'rounded-2xl border-2 border-dashed border-crayon-sky bg-cream',
  },
}

function DatesBlock({ caption, icon: Icon, rows, total, s, holiday }) {
  return (
    <div>
      <h3 className={`mb-4 flex items-center gap-2 font-heading text-xl font-extrabold ${s.title}`}>
        <Icon className="h-5 w-5" aria-hidden="true" /> {caption}
      </h3>

      {/* Tablet and desktop: a proper table */}
      <div className={`hidden overflow-hidden sm:block ${s.card}`}>
        <table className="w-full text-left">
          <caption className="sr-only">{caption} 2027</caption>
          <thead className={s.head}>
            <tr className="font-heading text-sm">
              <th scope="col" className="px-5 py-3 font-bold">Term</th>
              <th scope="col" className="px-5 py-3 font-bold">From</th>
              <th scope="col" className="px-5 py-3 font-bold">To</th>
              <th scope="col" className="px-5 py-3 text-right font-bold">Days</th>
            </tr>
          </thead>
          <tbody className="font-body text-sm">
            {rows.map((r) => (
              <tr key={r.term} className={`border-t ${s.rule}`}>
                <th scope="row" className="px-5 py-4">
                  <span className={`inline-flex min-w-10 justify-center rounded-full px-2.5 py-1 font-heading text-xs font-extrabold ${holiday ? s.hpill : s.pill}`}>
                    {r.term}
                  </span>
                </th>
                <td className={`px-5 py-4 ${s.text}`}>{longDate(r.from)}</td>
                <td className={`px-5 py-4 ${s.text}`}>{longDate(r.to)}</td>
                <td className={`px-5 py-4 text-right font-heading font-bold ${s.text}`}>{r.days} days</td>
              </tr>
            ))}
          </tbody>
          {total && (
            <tfoot className={s.foot}>
              <tr className="font-heading text-sm font-extrabold">
                <th scope="row" colSpan={3} className="px-5 py-3">Total school days</th>
                <td className="px-5 py-3 text-right">{total} days</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Phones: one card per term */}
      <ul className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <li key={r.term} className={`p-4 ${s.mobile}`}>
            <div className="mb-2 flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 font-heading text-xs font-extrabold ${holiday ? s.hpill : s.pill}`}>
                {holiday ? `Term ${r.term} holiday` : `Term ${r.term}`}
              </span>
              <span className={`font-heading text-sm font-bold ${s.text}`}>{r.days} days</span>
            </div>
            <p className={`font-body text-sm ${s.text}`}><span className={s.muted}>From </span>{longDate(r.from)}</p>
            <p className={`font-body text-sm ${s.text}`}><span className={s.muted}>To </span>{longDate(r.to)}</p>
          </li>
        ))}
        {total && (
          <li className={`flex justify-between rounded-2xl px-4 py-3 font-heading text-sm font-extrabold ${s.foot}`}>
            <span>Total school days</span><span>{total} days</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default function TermDatesTable({ variant = 'nalugala' }) {
  const s = SKINS[variant] || SKINS.nalugala
  return (
    <div className="space-y-10">
      <div>
        <h2 className={`font-heading text-3xl font-extrabold sm:text-4xl ${s.title}`}>
          {YEAR.year} Academic Year
        </h2>
        <p className={`mt-2 flex items-start gap-2 font-body text-sm leading-relaxed ${s.muted}`}>
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Term dates and holidays for every class at both campuses, from the {YEAR.source}.
            {YEAR.provisional && ' The Ministry may still revise these dates; we will update this page if it does.'}
          </span>
        </p>
      </div>

      <DatesBlock caption="Term dates" icon={CalendarRange} rows={YEAR.terms} total={YEAR.totalDays} s={s} />
      <DatesBlock caption="Term holidays" icon={Sun} rows={YEAR.holidays} s={s} holiday />
    </div>
  )
}
