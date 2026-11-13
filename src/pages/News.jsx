import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Megaphone, CalendarDays, Pin, ArrowRight, ArrowUpRight,
  FolderOpen, MessageCircle, Share2,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import useSheetData from '../hooks/useSheetData'
import {
  visibleAnnouncements, announcementCategories, colourFor,
  upcomingEvents, eventWhen,
} from '../lib/schoolData'
import { whatsappShare } from '../lib/calendar'
import PageHeader from '../components/PageHeader'
import { LoadingRows, EmptyState, StaleNotice } from '../components/DataState'
import NewsBunono from './NewsBunono'

import headerImg from '../assets/IMG_8818.webp'   // talent show

const CREAM = '#FFF8EE'

export default function News() {
  const { campus, campusInfo } = useCampus()
  const announcements = useSheetData('announcements')
  const events        = useSheetData('events')
  const [filter, setFilter] = useState('All')

  if (campus === 'bunono') return <NewsBunono announcements={announcements} events={events} />

  const all        = visibleAnnouncements(announcements.rows, campus)
  const categories = ['All', ...announcementCategories(all)]
  const shown      = filter === 'All' ? all : all.filter(a => a.category === filter)
  const next       = upcomingEvents(events.rows, campus).slice(0, 3)
  const wa         = campusInfo.whatsapp.replace(/[^\d]/g, '')

  return (
    <main className="bg-mist">

      <PageHeader
        crumb="News"
        title="School"
        accentWord="News"
        kicker="Announcements & updates"
        subtitle={`Term dates, admissions notices, events and everything else families need to know at our ${campusInfo.name} Campus.`}
        image={headerImg}
        nextBg="#F3F6FA"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/calendar"
            className="inline-flex items-center gap-2 rounded-full bg-mosai-red px-6 py-3 font-heading text-sm font-bold text-white shadow-lg transition-colors duration-200 hover:bg-mosai-red-dark"
          >
            <CalendarDays className="h-4 w-4" /> Term Dates &amp; Events
          </Link>
          <Link
            to="/downloads"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-heading text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
          >
            <FolderOpen className="h-4 w-4" /> Downloads
          </Link>
        </div>
      </PageHeader>

      <section className="bg-mist-deep py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">

            {/* ── Announcements ─────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Latest first</span>
                  <h2 className="mt-1 font-heading text-3xl font-extrabold text-mosai-blue-dark">
                    Announcements
                  </h2>
                </div>
                {categories.length > 2 && (
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFilter(c)}
                        className={`rounded-full px-4 py-1.5 font-heading text-xs font-bold transition-colors duration-150 ${
                          filter === c
                            ? 'bg-mosai-blue-dark text-white'
                            : 'bg-white text-gray-500 hover:bg-mosai-blue-light hover:text-mosai-blue'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {announcements.loading ? (
                <LoadingRows count={3} />
              ) : shown.length === 0 ? (
                <EmptyState icon={Megaphone} title="Nothing posted just yet">
                  There are no announcements in this category at the moment. Try “All”, or{' '}
                  <Link to="/contact" className="font-semibold text-mosai-blue hover:underline">contact the office</Link>{' '}
                  if you need something specific.
                </EmptyState>
              ) : (
                <div className="space-y-5">
                  {shown.map((item, i) => {
                    const colour = colourFor(item.category, i)
                    const isInternal = item.link?.startsWith('/')
                    return (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
                      >
                        <div className="p-6 sm:p-7">
                          <div className="mb-3 flex flex-wrap items-center gap-3">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-heading text-xs font-bold text-white"
                              style={{ backgroundColor: colour }}
                            >
                              {item.category}
                            </span>
                            {item.pinned && (
                              <span className="inline-flex items-center gap-1 font-heading text-xs font-bold text-mosai-red">
                                <Pin className="h-3.5 w-3.5" /> Pinned
                              </span>
                            )}
                            <span className="ml-auto flex items-center gap-1.5 font-body text-xs text-gray-400">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {item.dateText || 'Ongoing'}
                            </span>
                          </div>

                          <h3 className="font-heading text-xl font-extrabold text-mosai-blue-dark">{item.title}</h3>
                          {item.body && (
                            <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">{item.body}</p>
                          )}

                          <div className="mt-4 flex flex-wrap items-center gap-4">
                            {item.link && (isInternal ? (
                              <Link
                                to={item.link}
                                className="group inline-flex items-center gap-1.5 font-heading text-sm font-bold"
                                style={{ color: colour }}
                              >
                                Read more
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                              </Link>
                            ) : (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-heading text-sm font-bold"
                                style={{ color: colour }}
                              >
                                Read more <ArrowUpRight className="h-4 w-4" />
                              </a>
                            ))}
                            <a
                              href={whatsappShare(`${item.title}\n\n${item.body}\n\nMOSAI Schools`)}
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
              )}

              {announcements.error && <StaleNotice />}
            </div>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <div className="space-y-5 lg:sticky lg:top-28">

              <div className="rounded-3xl bg-mosai-blue-dark p-7 text-white">
                <div className="mb-4 flex items-center gap-2.5">
                  <CalendarDays className="h-5 w-5 text-mosai-red-light" />
                  <h3 className="font-heading text-lg font-extrabold">Coming up</h3>
                </div>

                {events.loading ? (
                  <p className="font-body text-sm text-blue-200">Checking the calendar…</p>
                ) : next.length === 0 ? (
                  <p className="font-body text-sm leading-relaxed text-blue-200">
                    No dates are published yet. Call the office and we will tell you what is coming.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {next.map((e) => (
                      <li key={e.id} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                        <p className="font-heading text-sm font-bold text-white">{e.title}</p>
                        <p className="font-body text-xs text-blue-200">{eventWhen(e)}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  to="/calendar"
                  className="group mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-mosai-red-light transition-colors hover:text-white"
                >
                  See the full calendar
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              <Link
                to="/downloads"
                className="group block rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-mosai-blue-light">
                  <FolderOpen className="h-6 w-6 text-mosai-blue" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-extrabold text-mosai-blue-dark">Forms &amp; documents</h3>
                <p className="font-body text-sm leading-relaxed text-gray-500">
                  Fee structure, requirements lists, uniform details and school forms, all in one place.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm font-bold text-mosai-red">
                  Open downloads
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>

              <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="mb-2 font-heading text-lg font-extrabold text-mosai-blue-dark">Missed something?</h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-gray-500">
                  Message the office and we will send you the details directly.
                </p>
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-heading text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A quiet band so the page never ends on a bare grey field */}
      <section className="py-14" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-extrabold text-mosai-blue-dark">
            Never miss a notice
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-gray-600">
            Announcements posted here are also read out at assembly and sent to class WhatsApp groups.
            If you are not in your child’s group yet, ask the class teacher or contact the office.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-mosai-blue-dark px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-mosai-blue"
          >
            Contact the office <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </main>
  )
}
