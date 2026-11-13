import { Link } from 'react-router-dom'
import {
  FolderOpen, FileText, Download, ExternalLink, Phone,
  CalendarDays, Megaphone, ArrowRight, HardDriveDownload,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { groupDocuments, formatDateShort } from '../lib/schoolData'
import { trackEvent } from '../lib/analytics'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import { LoadingRows, EmptyState, StaleNotice } from '../components/DataState'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader from '../assets/bunono/bunono-45.webp'

/* Bunono DOWNLOADS: a storybook shelf. Documents sit as tilted folder cards in
 * dashed crayon frames rather than the Nalugala two column list. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'
const CRAYONS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2', '#9B7EDE']

const VIEWABLE = ['LINK', 'PAGE']

export default function DownloadsBunono({ documents }) {
  const { campus, campusInfo } = useCampus()
  const groups = groupDocuments(documents.rows, campus)
  const total  = groups.reduce((n, g) => n + g.docs.length, 0)
  const tel    = campusInfo.phone.replace(/\s+/g, '')

  return (
    <main className="overflow-hidden bg-cream">

      <PageHeader
        crumb="Downloads"
        title="Forms &"
        accentWord="Papers"
        kicker="All in one place"
        subtitle="Fee structures, class requirements, uniform lists and school forms. Save them to your phone and bring them along when you visit Bunono."
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
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 font-heading text-sm font-extrabold text-white transition-colors duration-200 hover:bg-white/10"
          >
            <Megaphone className="h-4 w-4" /> School News
          </Link>
        </div>
      </PageHeader>

      {/* The shelf */}
      <section className="relative py-16">
        <Doodles names={['star', 'leaf']} count={2} />
        <div className="relative z-[3] mx-auto max-w-5xl px-4 sm:px-6">

          {documents.loading ? (
            <LoadingRows count={4} bunono />
          ) : total === 0 ? (
            <EmptyState icon={FolderOpen} title="Our shelf is still being filled" bunono accent="#6EC6F2">
              <p>
                We are putting our forms and information sheets online. Nothing is ready to download here
                just yet.
              </p>
              <p className="mt-3">
                For now, fees and class requirements are set out on the{' '}
                <Link to="/admissions" className="font-semibold text-mosai-red hover:underline">Admissions page</Link>,
                and what each class covers is on the{' '}
                <Link to="/programs" className="font-semibold text-mosai-red hover:underline">Programs page</Link>.
              </p>
              <p className="mt-3">
                Anything else, ring{' '}
                <a href={`tel:${tel}`} className="font-semibold text-mosai-red hover:underline">{campusInfo.phone}</a>{' '}
                and we will send it to you.
              </p>
            </EmptyState>
          ) : (
            <div className="space-y-14">
              {groups.map(({ category, docs }, gi) => {
                const colour = CRAYONS[gi % CRAYONS.length]
                return (
                  <div key={category}>
                    <h2 className={`mb-8 text-center font-heading text-2xl font-extrabold sm:text-3xl ${INK}`}>
                      <span className="crayon-underline" style={{ '--crayon-color': colour }}>{category}</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                      {docs.map((doc, i) => {
                        const opensInBrowser = VIEWABLE.includes(doc.fileType)
                        const isInternal = doc.fileType === 'PAGE' && doc.url?.startsWith('/')
                        const Wrapper = isInternal ? Link : 'a'
                        const linkProps = isInternal
                          ? { to: doc.url }
                          : { href: doc.url, target: '_blank', rel: 'noreferrer', download: opensInBrowser ? undefined : '' }

                        return (
                          <Wrapper
                            key={doc.id}
                            {...linkProps}
                            onClick={() => trackEvent('document_open', { title: doc.title, campus })}
                            className="flex gap-4 rounded-[2rem] border-2 border-dashed bg-white p-6 transition-transform duration-200 hover:-translate-y-1.5"
                            style={{ borderColor: colour, transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
                          >
                            <span
                              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-[10px] font-extrabold text-white shadow-md"
                              style={{ backgroundColor: colour }}
                            >
                              {doc.fileType.slice(0, 4)}
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className={`block font-heading text-base font-extrabold ${INK}`}>{doc.title}</span>
                              {doc.summary && (
                                <span className={`mt-1 block font-body text-sm leading-relaxed ${INK2}`}>{doc.summary}</span>
                              )}
                              <span className="mt-3 flex flex-wrap items-center gap-3 font-body text-xs text-gray-400">
                                <span className="inline-flex items-center gap-1.5 font-extrabold" style={{ color: colour }}>
                                  {opensInBrowser
                                    ? <><ExternalLink className="h-3.5 w-3.5" /> Open</>
                                    : <><Download className="h-3.5 w-3.5" /> Download</>}
                                </span>
                                {doc.size && <span>{doc.size}</span>}
                                {doc.updated && <span>Updated {formatDateShort(doc.updated)}</span>}
                              </span>
                            </span>
                          </Wrapper>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {documents.error && <StaleNotice bunono />}
        </div>
      </section>

      <PhotoBand img={bunonoPhotos[44]} cap="Our classrooms" bg="bg-cream" />

      {/* Guidance */}
      <section className="relative bg-mosai-red py-16 text-white">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <h2 className="mb-10 text-center font-heading text-3xl font-extrabold sm:text-4xl">
            How to use{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>these</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: HardDriveDownload, title: 'Save it once', text: 'Downloading keeps the file on your phone, so you can open it later without using data again.' },
              { icon: FileText,          title: 'Bring it along', text: 'If a form needs filling in, print it or copy the details onto paper and bring it to the office. We can also hand you a copy at the gate.' },
              { icon: Phone,             title: 'Cannot open it?', text: `Ring ${campusInfo.phone} and we will read it to you or send it on WhatsApp instead.` },
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
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-crayon-sun px-6 py-3 font-heading text-sm font-extrabold text-mosai-red-dark transition-transform hover:-translate-y-0.5"
            >
              Ask us for a document
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
