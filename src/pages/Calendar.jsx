import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, CalendarPlus, Download, Share2, MapPin, Clock,
  ArrowRight, Phone, History, Megaphone,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import useSheetData from '../hooks/useSheetData'
import {
  upcomingEvents, pastEvents, groupEventsByMonth, eventWhen, colourFor,
} from '../lib/schoolData'
import { downloadIcs, slugify, whatsappShare } from '../lib/calendar'
import { trackEvent } from '../lib/analytics'
import PageHeader from '../components/PageHeader'
import TermDatesTable from '../components/TermDatesTable'
import { LoadingRows, EmptyState, StaleNotice } from '../components/DataState'
import CalendarBunono from './CalendarBunono'

import headerImg from '../assets/TON_8742.webp'

const CREAM = 'rgb(var(--rgb-cream))'   // #FFF8EE, follows the theme

export default function Calendar() {
  const { campus, campusInfo } = useCampus()
  const events = useSheetData('events')
  const [showPast, setShowPast] = useState(false)

  if (campus === 'bunono') return <CalendarBunono events={events} />

  const upcoming = upcomingEvents(events.rows, campus)
  const past     = pastEvents(events.rows, campus)
  const months   = groupEventsByMonth(upcoming)
  const tel      = campusInfo.phone.replace(/\s+/g, '')

  function addAll() {
    downloadIcs(upcoming, 'mosai-schools-calendar.ics', `MOSAI Schools, ${campusInfo.name} Campus`)
    trackEvent('calendar_download', { campus, scope: 'all', count: upcoming.length })
  }

  function addOne(event) {
    downloadIcs(event, `${slugify(event.title)}.ics`, 'MOSAI Schools')
    trackEvent('calendar_download', { campus, scope: 'event' })
  }

  return (
    <main className="bg-mist">

      <PageHeader
        crumb="Calendar"
        title="Term Dates &"
        accentWord="Events"
        kicker="School calendar"
        subtitle={`The official 2027 term dates and holidays for our ${campusInfo.name} Campus, ready to put in your diary.`}
        image={headerImg}
        nextBg="#F3F6FA"
      >
        <div className="flex flex-wrap gap-3">
          {upcoming.length > 0 && (
            <button
              type="button"
              onClick={addAll}
              className="inline-flex items-center gap-2 rounded-full bg-mosai-red px-6 py-3 font-heading text-sm font-bold text-white shadow-lg transition-colors duration-200 hover:bg-mosai-red-dark"
            >
              <CalendarPlus className="h-4 w-4" /> Add all dates to my calendar
            </button>
          )}
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-heading text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
          >
            <Megaphone className="h-4 w-4" /> School News
          </Link>
        </div>
      </PageHeader>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <TermDatesTable />
        </div>
      </section>

      <section className="bg-mist-deep py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">Coming up</h2>

          {events.loading ? (
            <LoadingRows count={4} />
          ) : upcoming.length === 0 ? (
            <EmptyState icon={CalendarDays} title="Term dates are not published yet">
              <p>
                The school publishes each term’s dates once they are confirmed against the Ministry of
                Education and Sports calendar. Nothing is listed here at the moment.
              </p>
              <p className="mt-3">
                Please call the office on{' '}
                <a href={`tel:${tel}`} className="font-semibold text-mosai-blue hover:underline">{campusInfo.phone}</a>{' '}
                and we will tell you the dates for this term.
              </p>
            </EmptyState>
          ) : (
            <div className="space-y-12">
              {months.map(({ label, events: monthEvents }) => (
                <div key={label}>
                  <h2 className="mb-5 flex items-center gap-3 font-heading text-2xl font-extrabold text-mosai-blue-dark">
                    {label}
                    <span className="h-px flex-1 bg-gray-200" />
                  </h2>

                  <div className="space-y-4">
                    {monthEvents.map((e, i) => {
                      const colour = colourFor(e.type, i)
                      return (
                        <article
                          key={e.id}
                          className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:flex-row"
                        >
                          {/* Date block */}
                          <div
                            className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl text-white shadow-sm"
                            style={{ backgroundColor: colour }}
                          >
                            <span className="font-heading text-xl leading-none font-extrabold">{e.start.getDate()}</span>
                            <span className="font-body text-[10px] tracking-wide uppercase">
                              {e.start.toLocaleDateString('en-GB', { month: 'short' })}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="mb-1.5 flex flex-wrap items-center gap-2">
                              <span
                                className="rounded-full px-2.5 py-1 font-heading text-[11px] font-bold text-white"
                                style={{ backgroundColor: colour }}
                              >
                                {e.type}
                              </span>
                              <span className="font-body text-xs text-gray-400">{eventWhen(e)}</span>
                            </div>

                            <h3 className="font-heading text-lg font-extrabold text-mosai-blue-dark">{e.title}</h3>
                            {e.details && (
                              <p className="mt-1 font-body text-sm leading-relaxed text-gray-600">{e.details}</p>
                            )}

                            <div className="mt-2 flex flex-wrap items-center gap-4 font-body text-xs text-gray-400">
                              {e.location && (
                                <span className="inline-flex items-center gap-1.5">
                                  <MapPin className="h-3.5 w-3.5" /> {e.location}
                                </span>
                              )}
                              {e.time && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5" /> Starts {eventWhen(e).split(', ').pop()}
                                </span>
                              )}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-4">
                              <button
                                type="button"
                                onClick={() => addOne(e)}
                                className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-mosai-blue transition-colors hover:text-mosai-blue-dark"
                              >
                                <CalendarPlus className="h-4 w-4" /> Add to my calendar
                              </button>
                              <a
                                href={whatsappShare(`${e.title}\n${eventWhen(e)}${e.location ? `\n${e.location}` : ''}\n\nMOSAI Schools`)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gray-400 transition-colors hover:text-[#25D366]"
                              >
                                <Share2 className="h-4 w-4" /> Share
                              </a>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {events.error && <StaleNotice />}

          {/* Past events, tucked away */}
          {past.length > 0 && (
            <div className="mt-14">
              <button
                type="button"
                onClick={() => setShowPast(p => !p)}
                className="inline-flex items-center gap-2 font-heading text-sm font-bold text-gray-500 transition-colors hover:text-mosai-blue"
              >
                <History className="h-4 w-4" />
                {showPast ? 'Hide' : 'Show'} earlier dates ({past.length})
              </button>

              {showPast && (
                <ul className="mt-5 space-y-2">
                  {past.map((e) => (
                    <li
                      key={e.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-white/70 px-5 py-3"
                    >
                      <span className="font-heading text-sm font-bold text-gray-500">{e.title}</span>
                      <span className="font-body text-xs text-gray-400">{eventWhen(e)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How to use it */}
      <section className="py-16" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: Download,
                title: 'Put it in your phone',
                text: '“Add to my calendar” downloads a file your phone already knows how to open, and it lands in the calendar app you use, with a reminder you can set yourself.',
              },
              {
                icon: Share2,
                title: 'Send it to other parents',
                text: 'The Share button opens WhatsApp with the date ready to forward to your class group. It is how this information actually travels.',
              },
              {
                icon: Phone,
                title: 'Check anything with us',
                text: `The 2027 calendar is provisional and dates occasionally shift. If something matters, ring the office on ${campusInfo.phone} and we will confirm it.`,
              },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="rounded-3xl bg-white p-7 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-mosai-blue-light">
                    <Icon className="h-5 w-5 text-mosai-blue" />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-extrabold text-mosai-blue-dark">{card.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-gray-500">{card.text}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/downloads"
              className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-mosai-red transition-colors hover:text-mosai-red-dark"
            >
              Looking for the fee structure or a requirements list?
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
