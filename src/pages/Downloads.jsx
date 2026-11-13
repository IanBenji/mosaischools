import { Link } from 'react-router-dom'
import {
  FolderOpen, FileText, Download, ExternalLink, Phone,
  CalendarDays, Megaphone, ArrowRight, HardDriveDownload,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import useSheetData from '../hooks/useSheetData'
import { groupDocuments, colourFor, formatDateShort } from '../lib/schoolData'
import { trackEvent } from '../lib/analytics'
import PageHeader from '../components/PageHeader'
import { LoadingRows, EmptyState, StaleNotice } from '../components/DataState'
import DownloadsBunono from './DownloadsBunono'

import headerImg from '../assets/IMG_8647.webp'

const CREAM = '#FFF8EE'

// File formats that open in the browser rather than saving to the device.
const VIEWABLE = ['LINK', 'PAGE']

export default function Downloads() {
  const { campus, campusInfo } = useCampus()
  const documents = useSheetData('documents')

  if (campus === 'bunono') return <DownloadsBunono documents={documents} />

  const groups = groupDocuments(documents.rows, campus)
  const total  = groups.reduce((n, g) => n + g.docs.length, 0)
  const tel    = campusInfo.phone.replace(/\s+/g, '')

  return (
    <main className="bg-mist">

      <PageHeader
        crumb="Downloads"
        title="Forms &"
        accentWord="Documents"
        kicker="Everything in one place"
        subtitle="The fee structure, class requirements, uniform lists and school forms that families ask us for most often. Save them to your phone and bring them when you visit."
        image={headerImg}
        nextBg="#F3F6FA"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/calendar"
            className="inline-flex items-center gap-2 rounded-full bg-mosai-red px-6 py-3 font-heading text-sm font-bold text-white shadow-lg transition-colors duration-200 hover:bg-mosai-red-dark"
          >
            <CalendarDays className="h-4 w-4" /> Term Dates
          </Link>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-heading text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
          >
            <Megaphone className="h-4 w-4" /> School News
          </Link>
        </div>
      </PageHeader>

      <section className="bg-mist-deep py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {documents.loading ? (
            <LoadingRows count={4} />
          ) : total === 0 ? (
            <EmptyState icon={FolderOpen} title="Documents are being prepared">
              <p>
                The school is putting its forms and information sheets online. Nothing is available to
                download here just yet.
              </p>
              <p className="mt-3">
                In the meantime, the current fee structure and class requirements are set out on the{' '}
                <Link to="/admissions" className="font-semibold text-mosai-blue hover:underline">Admissions page</Link>,
                and what each class covers is on the{' '}
                <Link to="/programs" className="font-semibold text-mosai-blue hover:underline">Programs page</Link>.
              </p>
              <p className="mt-3">
                For anything else, call the office on{' '}
                <a href={`tel:${tel}`} className="font-semibold text-mosai-blue hover:underline">{campusInfo.phone}</a>{' '}
                and we will send it to you.
              </p>
            </EmptyState>
          ) : (
            <div className="space-y-12">
              {groups.map(({ category, docs }, gi) => {
                const colour = colourFor(category, gi)
                return (
                  <div key={category}>
                    <h2 className="mb-5 flex items-center gap-3 font-heading text-2xl font-extrabold text-mosai-blue-dark">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${colour}22` }}
                      >
                        <FolderOpen className="h-5 w-5" style={{ color: colour }} />
                      </span>
                      {category}
                      <span className="h-px flex-1 bg-gray-200" />
                      <span className="font-body text-xs font-semibold text-gray-400">
                        {docs.length} {docs.length === 1 ? 'item' : 'items'}
                      </span>
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {docs.map((doc) => {
                        const opensInBrowser = VIEWABLE.includes(doc.fileType)
                        const isInternal = doc.url?.startsWith('/')
                        const Wrapper = isInternal ? Link : 'a'
                        const linkProps = isInternal
                          ? { to: doc.url }
                          : { href: doc.url, target: '_blank', rel: 'noreferrer', download: opensInBrowser ? undefined : '' }

                        return (
                          <Wrapper
                            key={doc.id}
                            {...linkProps}
                            onClick={() => trackEvent('document_open', { title: doc.title, campus })}
                            className="group flex gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                          >
                            <span
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-heading text-[10px] font-extrabold text-white"
                              style={{ backgroundColor: colour }}
                            >
                              {doc.fileType.slice(0, 4)}
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block font-heading text-base font-extrabold text-mosai-blue-dark">
                                {doc.title}
                              </span>
                              {doc.summary && (
                                <span className="mt-1 block font-body text-sm leading-relaxed text-gray-500">
                                  {doc.summary}
                                </span>
                              )}
                              <span className="mt-3 flex flex-wrap items-center gap-3 font-body text-xs text-gray-400">
                                <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: colour }}>
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

          {documents.error && <StaleNotice />}
        </div>
      </section>

      {/* Guidance band */}
      <section className="py-16" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: HardDriveDownload,
                title: 'Save it once',
                text: 'Downloading a file keeps it on your phone, so you can open it later at the shop or at home without using data again.',
              },
              {
                icon: FileText,
                title: 'Bring it with you',
                text: 'If a form needs filling in, print it or write the details on paper and bring it to the office. We can also give you a copy at the gate.',
              },
              {
                icon: Phone,
                title: 'Cannot open a file?',
                text: `Ring the office on ${campusInfo.phone} and we will read it to you or send it on WhatsApp instead. Nobody needs to miss out because of a phone.`,
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
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-mosai-blue-dark px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-mosai-blue"
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
