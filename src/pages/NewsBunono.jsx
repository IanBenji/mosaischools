import { Link } from 'react-router-dom'
import {
  Megaphone, CalendarDays, Pin, ArrowRight, ArrowUpRight,
  FolderOpen, MessageCircle, Share2,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import {
  visibleAnnouncements, colourFor, upcomingEvents, eventWhen,
} from '../lib/schoolData'
import { whatsappShare } from '../lib/calendar'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import { LoadingRows, EmptyState, StaleNotice } from '../components/DataState'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader from '../assets/bunono/bunono-02.webp'   // assembly

/* Bunono NEWS — a storybook pinboard. Same records as the Nalugala page, laid
 * out as tilted notes pegged to a board rather than a list with a sidebar.
 * Data arrives as props: News.jsx runs the hooks before it branches, so the
 * sheet is fetched exactly once. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'
const CRAYONS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2', '#9B7EDE']

export default function NewsBunono({ announcements, events }) {
  const { campus, campusInfo } = useCampus()
  const all  = visibleAnnouncements(announcements.rows, campus)
  const next = upcomingEvents(events.rows, campus).slice(0, 4)
  const wa   = campusInfo.whatsapp.replace(/[^\d]/g, '')

  return (
    <main className="overflow-hidden bg-cream">

      <PageHeader
        crumb="News"
        title="What's"
        accentWord="Happening"
        kicker="Notices from Bunono"
        subtitle="Term dates, admissions news, events and reminders, everything pinned to our board, freshest at the top."
        image={imgHeader}
        nextBg={CREAM}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/calendar"
            className="inline-flex items-center gap-2 rounded-full bg-crayon-sun px-6 py-3 font-heading text-sm font-extrabold text-mosai-red-dark shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            <CalendarDays className="h-4 w-4" /> Term Dates
          </Link>
          <Link
            to="/downloads"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 font-heading text-sm font-extrabold text-white transition-colors duration-200 hover:bg-white/10"
          >
            <FolderOpen className="h-4 w-4" /> Downloads
          </Link>
        </div>
      </PageHeader>

      {/* ── The pinboard ───────────────────────────────────────────────── */}
      <section className="relative py-16">
        <Doodles names={['star', 'balloon']} count={2} />
        <div className="relative z-[3] mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className={`mb-12 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            Our notice{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>board</span>
          </h2>

          {announcements.loading ? (
            <LoadingRows count={3} bunono />
          ) : all.length === 0 ? (
            <EmptyState icon={Megaphone} title="The board is empty for now" bunono accent="#FF8A6B">
              Nothing has been posted yet. Message the Bunono office and we will tell you what is coming up.
            </EmptyState>
          ) : (
            <div className="space-y-8">
              {all.map((item, i) => {
                const colour = colourFor(item.category, i)
                const isInternal = item.link?.startsWith('/')
                return (
                  <article
                    key={item.id}
                    className="relative rounded-[2rem] border-2 border-dashed bg-white p-7 shadow-sm transition-transform duration-200 hover:-translate-y-1 sm:p-9"
                    style={{ borderColor: colour, transform: `rotate(${i % 2 ? 0.7 : -0.7}deg)` }}
                  >
                    {/* the pin */}
                    <span
                      className="absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full shadow-md"
                      style={{ backgroundColor: colour }}
                      aria-hidden="true"
                    >
                      <Pin className="h-4 w-4 text-white" />
                    </span>

                    <div className="mb-3 flex flex-wrap items-center gap-3 pt-2">
                      <span
                        className="rounded-full px-3 py-1 font-heading text-xs font-extrabold text-white"
                        style={{ backgroundColor: colour }}
                      >
                        {item.category}
                      </span>
                      {item.pinned && (
                        <span className="font-heading text-xs font-extrabold text-mosai-red">★ Important</span>
                      )}
                      <span className={`ml-auto font-body text-xs ${INK2}`}>{item.dateText || 'Ongoing'}</span>
                    </div>

                    <h3 className={`font-heading text-xl font-extrabold sm:text-2xl ${INK}`}>{item.title}</h3>
                    {item.body && <p className={`mt-2 font-body text-sm leading-relaxed ${INK2}`}>{item.body}</p>}

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      {item.link && (isInternal ? (
                        <Link
                          to={item.link}
                          className="group inline-flex items-center gap-1.5 font-heading text-sm font-extrabold"
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
                          className="inline-flex items-center gap-1.5 font-heading text-sm font-extrabold"
                          style={{ color: colour }}
                        >
                          Read more <ArrowUpRight className="h-4 w-4" />
                        </a>
                      ))}
                      <a
                        href={whatsappShare(`${item.title}\n\n${item.body}\n\nMOSAI Schools, Bunono Campus`)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-gray-400 transition-colors hover:text-[#25D366]"
                      >
                        <Share2 className="h-4 w-4" /> Share
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {announcements.error && <StaleNotice bunono />}
        </div>
      </section>

      <PhotoBand img={bunonoPhotos[1]} cap="Morning assembly" bg="bg-cream" />

      {/* ── Coming up ──────────────────────────────────────────────────── */}
      <section className="relative bg-mist py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className={`mb-10 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            Coming{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>up</span>
          </h2>

          {next.length === 0 ? (
            <p className={`mx-auto max-w-md text-center font-body text-sm leading-relaxed ${INK2}`}>
              No dates are published yet. Call the office and we will tell you what is coming.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {next.map((e, i) => (
                <div
                  key={e.id}
                  className="flex gap-4 rounded-[2rem] bg-cream p-6"
                  style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
                >
                  <div
                    className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full text-white shadow-md"
                    style={{ backgroundColor: CRAYONS[i % CRAYONS.length] }}
                  >
                    <span className="font-heading text-lg leading-none font-extrabold">{e.start.getDate()}</span>
                    <span className="font-body text-[10px] uppercase">
                      {e.start.toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <p className={`font-heading font-extrabold ${INK}`}>{e.title}</p>
                    <p className={`font-body text-xs ${INK2}`}>{eventWhen(e)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/calendar"
              className="group inline-flex items-center gap-2 rounded-full bg-mosai-red px-6 py-3 font-heading text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
            >
              See the full calendar
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ask us ─────────────────────────────────────────────────────── */}
      <section className="relative bg-mosai-red py-16 text-white">
        <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-3xl px-4 pt-10 text-center sm:px-6">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            Missed{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>something?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body leading-relaxed text-white/85">
            Notices here are also read at assembly and sent to class WhatsApp groups. If you are not in your
            child’s group yet, ask the class teacher, or just message the office.
          </p>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-crayon-sun px-6 py-3 font-heading text-sm font-extrabold text-mosai-red-dark transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
          </a>
        </div>
      </section>

    </main>
  )
}
