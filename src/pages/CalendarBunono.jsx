import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, CalendarPlus, Share2, MapPin, History,
  Megaphone, FolderOpen, ArrowRight, Phone,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import {
  upcomingEvents, pastEvents, groupEventsByMonth, eventWhen,
} from '../lib/schoolData'
import { downloadIcs, slugify, whatsappShare } from '../lib/calendar'
import { trackEvent } from '../lib/analytics'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import { LoadingRows, EmptyState, StaleNotice } from '../components/DataState'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader from '../assets/bunono/bunono-47.webp'   // playground

/* Bunono CALENDAR — a storybook timeline: months as scalloped bands, each date
 * a round crayon badge on a dotted spine. Same events as the Nalugala page. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'
const CRAYONS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2', '#9B7EDE']

export default function CalendarBunono({ events }) {
  const { campus, campusInfo } = useCampus()
  const [showPast, setShowPast] = useState(false)

  const upcoming = upcomingEvents(events.rows, campus)
  const past     = pastEvents(events.rows, campus)
  const months   = groupEventsByMonth(upcoming)
  const tel      = campusInfo.phone.replace(/\s+/g, '')

  function addAll() {
    downloadIcs(upcoming, 'mosai-bunono-calendar.ics', 'MOSAI Schools, Bunono Campus')
    trackEvent('calendar_download', { campus, scope: 'all', count: upcoming.length })
  }

  function addOne(event) {
    downloadIcs(event, `${slugify(event.title)}.ics`, 'MOSAI Schools')
    trackEvent('calendar_download', { campus, scope: 'event' })
  }

  return (
    <main className="overflow-hidden bg-cream">

      <PageHeader
        crumb="Calendar"
        title="Dates for"
        accentWord="Your Diary"
        kicker="Term dates & events"
        subtitle="When term opens and closes, holidays, visitation days and every other date worth writing down at Bunono."
        image={imgHeader}
        nextBg={CREAM}
      >
        <div className="flex flex-wrap gap-3">
          {upcoming.length > 0 && (
            <button
              type="button"
              onClick={addAll}
              className="inline-flex items-center gap-2 rounded-full bg-crayon-sun px-6 py-3 font-heading text-sm font-extrabold text-mosai-red-dark shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              <CalendarPlus className="h-4 w-4" /> Add all dates to my phone
            </button>
          )}
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 font-heading text-sm font-extrabold text-white transition-colors duration-200 hover:bg-white/10"
          >
            <Megaphone className="h-4 w-4" /> School News
          </Link>
        </div>
      </PageHeader>

      {/* ── Timeline ───────────────────────────────────────────────────── */}
      <section className="relative py-16">
        <Doodles names={['flower', 'leaf']} count={2} />
        <div className="relative z-[3] mx-auto max-w-3xl px-4 sm:px-6">

          {events.loading ? (
            <LoadingRows count={4} bunono />
          ) : upcoming.length === 0 ? (
            <EmptyState icon={CalendarDays} title="No dates published yet" bunono accent="#FFC93C">
              <p>
                We publish each term’s dates once they are confirmed against the Ministry of Education
                and Sports calendar. Nothing is listed at the moment.
              </p>
              <p className="mt-3">
                Ring the Bunono office on{' '}
                <a href={`tel:${tel}`} className="font-semibold text-mosai-red hover:underline">{campusInfo.phone}</a>{' '}
                and we will tell you the dates for this term.
              </p>
            </EmptyState>
          ) : (
            <div className="space-y-14">
              {months.map(({ label, events: monthEvents }) => (
                <div key={label}>
                  <h2 className={`mb-8 text-center font-heading text-2xl font-extrabold sm:text-3xl ${INK}`}>
                    <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>{label}</span>
                  </h2>

                  <ol className="relative space-y-7">
                    {/* dotted spine */}
                    <span
                      className="absolute top-6 bottom-6 left-[1.7rem] hidden w-0 border-l-2 border-dashed border-[#E2CDB6] sm:block"
                      aria-hidden="true"
                    />
                    {monthEvents.map((e, i) => {
                      const colour = CRAYONS[i % CRAYONS.length]
                      return (
                        <li key={e.id} className="relative flex flex-col gap-5 sm:flex-row">
                          <div
                            className="relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full text-white shadow-md"
                            style={{ backgroundColor: colour, transform: `rotate(${i % 2 ? 4 : -4}deg)` }}
                          >
                            <span className="font-heading text-lg leading-none font-extrabold">{e.start.getDate()}</span>
                            <span className="font-body text-[10px] uppercase">
                              {e.start.toLocaleDateString('en-GB', { month: 'short' })}
                            </span>
                          </div>

                          <div
                            className="min-w-0 flex-1 rounded-[2rem] border-2 border-dashed bg-white p-6"
                            style={{ borderColor: colour, transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}
                          >
                            <div className="mb-1.5 flex flex-wrap items-center gap-2">
                              <span
                                className="rounded-full px-2.5 py-1 font-heading text-[11px] font-extrabold text-white"
                                style={{ backgroundColor: colour }}
                              >
                                {e.type}
                              </span>
                              <span className={`font-body text-xs ${INK2}`}>{eventWhen(e)}</span>
                            </div>

                            <h3 className={`font-heading text-lg font-extrabold ${INK}`}>{e.title}</h3>
                            {e.details && <p className={`mt-1 font-body text-sm leading-relaxed ${INK2}`}>{e.details}</p>}
                            {e.location && (
                              <p className={`mt-2 inline-flex items-center gap-1.5 font-body text-xs ${INK2}`}>
                                <MapPin className="h-3.5 w-3.5" /> {e.location}
                              </p>
                            )}

                            <div className="mt-4 flex flex-wrap items-center gap-4">
                              <button
                                type="button"
                                onClick={() => addOne(e)}
                                className="inline-flex items-center gap-1.5 font-heading text-sm font-extrabold"
                                style={{ color: colour }}
                              >
                                <CalendarPlus className="h-4 w-4" /> Add to my phone
                              </button>
                              <a
                                href={whatsappShare(`${e.title}\n${eventWhen(e)}${e.location ? `\n${e.location}` : ''}\n\nMOSAI Schools, Bunono Campus`)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gray-400 transition-colors hover:text-[#25D366]"
                              >
                                <Share2 className="h-4 w-4" /> Share
                              </a>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              ))}
            </div>
          )}

          {events.error && <StaleNotice bunono />}

          {past.length > 0 && (
            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={() => setShowPast(p => !p)}
                className={`inline-flex items-center gap-2 font-heading text-sm font-extrabold ${INK2}`}
              >
                <History className="h-4 w-4" />
                {showPast ? 'Hide' : 'Show'} earlier dates ({past.length})
              </button>

              {showPast && (
                <ul className="mt-5 space-y-2 text-left">
                  {past.map((e) => (
                    <li
                      key={e.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 rounded-[1.5rem] bg-white px-5 py-3"
                    >
                      <span className={`font-heading text-sm font-extrabold ${INK2}`}>{e.title}</span>
                      <span className="font-body text-xs text-gray-400">{eventWhen(e)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      <PhotoBand img={bunonoPhotos[46]} cap="Room to play" bg="bg-cream" />

      {/* ── Helper band ────────────────────────────────────────────────── */}
      <section className="relative bg-mosai-red py-16 text-white">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <h2 className="mb-10 text-center font-heading text-3xl font-extrabold sm:text-4xl">
            Making the most{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>of it</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: CalendarPlus, title: 'Put it in your phone', text: 'The button downloads a file your phone already understands, and the date lands in your calendar app and you can set your own reminder.' },
              { icon: Share2,       title: 'Send it on',           text: 'Share opens WhatsApp with the date ready to forward to your class group.' },
              { icon: Phone,        title: 'Check with us',        text: `Dates sometimes shift. Ring ${campusInfo.phone} and we will confirm anything that matters.` },
            ].map((card, i) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="rounded-[2rem] bg-white/10 p-7 backdrop-blur-sm"
                  style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow-md"
                    style={{ backgroundColor: CRAYONS[i % CRAYONS.length] }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-extrabold">{card.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-white/85">{card.text}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/downloads"
              className="group inline-flex items-center gap-2 rounded-full bg-crayon-sun px-6 py-3 font-heading text-sm font-extrabold text-mosai-red-dark transition-transform hover:-translate-y-0.5"
            >
              <FolderOpen className="h-4 w-4" /> Fee structure &amp; forms
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
