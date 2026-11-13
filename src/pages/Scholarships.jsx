import { Link } from 'react-router-dom'
import {
  GraduationCap, HeartHandshake, Sparkles, Users,
  BookOpen, Home, ShieldCheck, Smile, CalendarCheck, Handshake,
  Quote, Info, Phone, MessageCircle, ArrowRight, Heart,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { SCHOLARSHIPS } from '../lib/giving'
import PageHeader from '../components/PageHeader'
import { ContactForm } from './Contact'
import ScholarshipsBunono from './ScholarshipsBunono'

import headerImg from '../assets/TON_8807.webp'   // graduation day
import purposeImg from '../assets/IMG_8818.webp'  // talent show

const ICONS = {
  GraduationCap, HeartHandshake, Sparkles, Users,
  BookOpen, Home, ShieldCheck, Smile, CalendarCheck, Handshake,
}

const CREAM = '#FFF8EE'

export default function Scholarships() {
  const { campus, campusInfo } = useCampus()
  if (campus === 'bunono') return <ScholarshipsBunono />

  const tel = campusInfo.phone.replace(/\s+/g, '')
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')

  return (
    <main className="bg-mist">

      {/* ── 1. Page header ─────────────────────────────────────────────── */}
      <PageHeader
        crumb="Scholarships"
        title="Mosai"
        accentWord="Scholarships"
        kicker="Limited places · Awarded on merit and need"
        subtitle="A limited number of scholarships for vulnerable and disadvantaged, yet able and gifted children, so that ability, not circumstance, decides how far a child goes."
        image={headerImg}
        nextBg="#F3F6FA"
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-full bg-mosai-red px-6 py-3 font-heading text-sm font-bold text-white shadow-lg transition-colors duration-200 hover:bg-mosai-red-dark"
          >
            <GraduationCap className="h-4 w-4" /> Apply for a Scholarship
          </a>
          <a
            href={`tel:${tel}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-heading text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
          >
            <Phone className="h-4 w-4" /> Speak to the Office
          </a>
        </div>
      </PageHeader>

      {/* ── 2. The school's statement + purpose ────────────────────────── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Official wording, quoted */}
          <div className="mx-auto -mt-2 mb-14 max-w-4xl rounded-3xl bg-mosai-blue-light p-8 sm:p-10">
            <Quote className="mb-4 h-8 w-8 text-mosai-blue" />
            <p className="font-heading text-xl leading-relaxed font-bold text-mosai-blue-dark sm:text-2xl">
              {SCHOLARSHIPS.statement}
            </p>
            <p className="mt-4 font-body text-sm text-gray-500">Mosai Schools management</p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Why we do this</span>
              <h2 className="mt-2 mb-5 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
                Every child deserves a{' '}
                <span className="crayon-underline" style={{ '--crayon-color': campusInfo.theme.crayon }}>fair start</span>
              </h2>
              {SCHOLARSHIPS.purpose.map((para) => (
                <p key={para.slice(0, 24)} className="mb-4 font-body leading-relaxed text-gray-600">{para}</p>
              ))}
            </div>

            <div className="relative">
              <img
                src={purposeImg}
                alt="Mosai Schools learners"
                className="h-80 w-full rounded-3xl object-cover shadow-xl sm:h-96"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-mosai-red px-6 py-5 text-white shadow-xl sm:block">
                <p className="font-heading text-3xl font-extrabold">Limited</p>
                <p className="font-body text-xs text-red-100">places each year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What the programme sets out to do ───────────────────────── */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Our purpose</span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
              What the programme is{' '}
              <span className="crayon-underline" style={{ '--crayon-color': campusInfo.theme.crayon }}>for</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SCHOLARSHIPS.aims.map((aim) => {
              const Icon = ICONS[aim.icon]
              return (
                <div key={aim.title} className="rounded-3xl bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mosai-blue-light">
                    <Icon className="h-6 w-6 text-mosai-blue" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-extrabold text-mosai-blue-dark">{aim.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-gray-500">{aim.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Eligibility ─────────────────────────────────────────────── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Eligibility</span>
            <h2 className="mt-2 mb-4 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
              Who can{' '}
              <span className="crayon-underline" style={{ '--crayon-color': campusInfo.theme.crayon }}>apply</span>
            </h2>
            <p className="font-body leading-relaxed text-gray-600">
              School management considers every application against the criteria below. A child does not need to meet
              all of them perfectly, but ability and genuine need must both be present.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SCHOLARSHIPS.eligibility.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mosai-red-light">
                    <Icon className="h-6 w-6 text-mosai-red" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-extrabold text-mosai-blue-dark">{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-gray-500">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Assessment & selection ──────────────────────────────────── */}
      <section className="bg-mosai-blue-dark py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red-light uppercase">Assessment &amp; selection</span>
            <h2 className="mt-2 mb-4 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              How scholarships are awarded
            </h2>
            <p className="mx-auto max-w-2xl font-body leading-relaxed text-blue-200">
              Every application follows the same route, and every award is decided by a panel drawn from school
              management against criteria they have established and approved.
            </p>
          </div>

          <ol className="relative space-y-2">
            {/* connecting rail */}
            <span className="absolute top-4 bottom-4 left-[1.4rem] hidden w-px bg-white/15 sm:block" aria-hidden="true" />
            {SCHOLARSHIPS.process.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 rounded-2xl p-4 transition-colors duration-200 hover:bg-white/5">
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mosai-red font-heading text-base font-extrabold text-white shadow-lg">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-heading text-lg font-extrabold text-white">{step.title}</h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-blue-200">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 6. Good to know ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Before you apply</span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
              Good to{' '}
              <span className="crayon-underline" style={{ '--crayon-color': campusInfo.theme.crayon }}>know</span>
            </h2>
          </div>

          <ul className="space-y-3">
            {SCHOLARSHIPS.goodToKnow.map((line) => (
              <li key={line.slice(0, 24)} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-mosai-blue" />
                <p className="font-body text-sm leading-relaxed text-gray-600">{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 7. Apply / enquire ─────────────────────────────────────────── */}
      <section id="apply" className="scroll-mt-24 bg-mist-deep py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">

            <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-10 lg:col-span-3">
              <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Start an application</span>
              <h2 className="mt-1 mb-2 font-heading text-3xl font-extrabold text-mosai-blue-dark">Tell us about your child</h2>
              <p className="mb-7 font-body text-sm leading-relaxed text-gray-500">
                Send us a few details and the office will be in touch within one working day to explain the next steps
                and what documents to bring. Please include the child’s age, the class you are hoping for, and a short
                description of your family’s circumstances.
              </p>
              <ContactForm defaultSubject="Scholarship Application" />
            </div>

            <div className="space-y-5 lg:sticky lg:top-28 lg:col-span-2">
              <div className="rounded-3xl bg-mosai-blue-dark p-7 text-white">
                <h3 className="mb-2 font-heading text-lg font-extrabold">Would you rather talk?</h3>
                <p className="mb-5 font-body text-sm leading-relaxed text-blue-200">
                  Many families find it easier to explain their situation in person or on the phone. That is completely
                  fine. Call, message or visit the {campusInfo.name} Campus office, Monday to Friday, 8:00 AM to 4:00 PM.
                </p>
                <div className="space-y-2.5">
                  <a
                    href={`tel:${tel}`}
                    className="flex items-center gap-2.5 rounded-full bg-mosai-red px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-mosai-red-dark"
                  >
                    <Phone className="h-4 w-4" /> {campusInfo.phone}
                  </a>
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 rounded-full border border-white/30 px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-mosai-red-light">
                  <Heart className="h-6 w-6 text-mosai-red" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-extrabold text-mosai-blue-dark">Want to fund a place?</h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-gray-500">
                  Every scholarship exists because somebody paid for it. If you would like to sponsor a child or give to
                  the scholarship fund, we would love to hear from you.
                </p>
                <Link
                  to="/donate"
                  className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-mosai-red transition-colors hover:text-mosai-red-dark"
                >
                  Support the Scholarship Fund
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
