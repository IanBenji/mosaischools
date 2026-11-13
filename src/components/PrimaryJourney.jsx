import { Lock, Sparkles } from 'lucide-react'

/* The Primary section, class by class, from P.1 to P.7.
 *
 * Classes up to `top` (the campus profile's primaryTop) are offered now; the
 * rest show as "coming", because each campus adds one class a year. Stage
 * descriptions follow the structure of Uganda's NCDC primary curriculum:
 * a thematic lower primary (P.1 to P.3), P.4 as the transition into learning
 * by subject, and subject based upper primary (P.5 to P.7). Nothing here is
 * specific to one campus, so both Programs pages share it.
 *
 * variant: 'dark'      — for the Nalugala navy Primary section
 *          'storybook' — for the Bunono cream pages
 */

const PRIMARY_CLASSES = [
  { n: 1, name: 'Primary One',   stage: 'Lower Primary',
    focus: 'Settling into primary school, with reading, writing and number work built on the foundations laid in Top Class.' },
  { n: 2, name: 'Primary Two',   stage: 'Lower Primary',
    focus: 'Growing fluency in reading and writing, stronger number skills and more independent classwork.' },
  { n: 3, name: 'Primary Three', stage: 'Lower Primary',
    focus: 'Completing the lower primary years with confident literacy, numeracy and enquiry about the world around us.' },
  { n: 4, name: 'Primary Four',  stage: 'Transition Year',
    focus: 'The step from lower primary themes to learning by subject: English, Mathematics, Science and Social Studies, with more responsibility for organising their own work.' },
  { n: 5, name: 'Primary Five',  stage: 'Upper Primary' },
  { n: 6, name: 'Primary Six',   stage: 'Upper Primary' },
  { n: 7, name: 'Primary Seven', stage: 'Upper Primary' },
]

const STORY_COLORS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2']

export default function PrimaryJourney({ top, variant = 'dark' }) {
  const offered  = PRIMARY_CLASSES.filter((c) => c.n <= top)
  const upcoming = PRIMARY_CLASSES.filter((c) => c.n > top)
  const dark = variant === 'dark'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {offered.map((c, i) => {
          const isNewest = c.n === top
          const color = STORY_COLORS[i % STORY_COLORS.length]
          return (
            <article
              key={c.n}
              id={`p${c.n}`}
              className={
                dark
                  ? `relative rounded-2xl p-6 border scroll-mt-36 ${isNewest ? 'bg-white text-mosai-blue-dark border-white shadow-xl' : 'bg-white/[0.06] border-white/10 text-white'}`
                  : 'relative rounded-[2rem] p-6 bg-white shadow-sm border-2 border-dashed scroll-mt-36'
              }
              style={dark ? undefined : { borderColor: color }}
            >
              {isNewest && (
                <span className={`absolute -top-3 right-5 inline-flex items-center gap-1 font-heading font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow ${dark ? 'bg-mosai-red text-white' : 'text-white'}`}
                  style={dark ? undefined : { backgroundColor: color }}>
                  <Sparkles className="w-3 h-3" /> Now offered
                </span>
              )}
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className={`font-heading font-black text-4xl leading-none ${dark ? (isNewest ? 'text-mosai-red' : 'text-mosai-red-light') : ''}`}
                  style={dark ? undefined : { color }}
                >
                  P.{c.n}
                </span>
                <span className={`font-body text-[11px] font-bold uppercase tracking-widest ${dark ? (isNewest ? 'text-mosai-blue' : 'text-blue-300') : 'text-[#7A5C4A]'}`}>
                  {c.stage}
                </span>
              </div>
              <h4 className={`font-heading font-extrabold text-lg mb-2 ${dark ? '' : 'text-[#43261A]'}`}>{c.name}</h4>
              <p className={`font-body text-sm leading-relaxed ${dark ? (isNewest ? 'text-gray-600' : 'text-blue-100') : 'text-[#7A5C4A]'}`}>{c.focus}</p>
            </article>
          )
        })}
      </div>

      {upcoming.length > 0 && (
        <div className={`mt-4 flex flex-wrap items-center gap-2 rounded-2xl px-5 py-3 ${dark ? 'bg-white/[0.04] border border-dashed border-white/15' : 'bg-white/70 border-2 border-dashed border-[#E8D9C8]'}`}>
          <span className={`font-body text-xs font-semibold mr-1 ${dark ? 'text-blue-300' : 'text-[#7A5C4A]'}`}>Coming in the years ahead:</span>
          {upcoming.map((c) => (
            <span key={c.n} className={`inline-flex items-center gap-1 font-heading font-bold text-xs px-3 py-1 rounded-full ${dark ? 'bg-white/5 text-white/60' : 'bg-cream text-[#7A5C4A]'}`}>
              <Lock className="w-3 h-3" /> P.{c.n}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
