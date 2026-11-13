import { Link } from 'react-router-dom'
import {
  GraduationCap, HeartHandshake, Sparkles, Users,
  BookOpen, Home, ShieldCheck, Smile, CalendarCheck, Handshake,
  Phone, MessageCircle, Heart, ArrowRight, Info,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { SCHOLARSHIPS } from '../lib/giving'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import { ContactForm } from './Contact'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader from '../assets/bunono/bunono-06.webp'   // assembly

/* Bunono SCHOLARSHIPS — storybook design. Same words as the Nalugala page
 * (from lib/giving.js), wholly different layout and furniture. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'
const CRAYONS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2', '#9B7EDE']

const ICONS = {
  GraduationCap, HeartHandshake, Sparkles, Users,
  BookOpen, Home, ShieldCheck, Smile, CalendarCheck, Handshake,
}

export default function ScholarshipsBunono() {
  const { campusInfo } = useCampus()
  const tel = campusInfo.phone.replace(/\s+/g, '')
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')

  return (
    <main className="overflow-hidden bg-cream">

      <PageHeader
        crumb="Scholarships"
        title="A Place"
        accentWord="For Every Child"
        kicker="Scholarships · Limited places"
        subtitle="A small number of scholarships for vulnerable and disadvantaged, yet able and gifted children, because what a child can become should never depend on what a family can afford."
        image={imgHeader}
        nextBg={CREAM}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-full bg-crayon-sun px-6 py-3 font-heading text-sm font-extrabold text-mosai-red-dark shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            <GraduationCap className="h-4 w-4" /> Apply for a Scholarship
          </a>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 font-heading text-sm font-extrabold text-white transition-colors duration-200 hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" /> Ask us on WhatsApp
          </a>
        </div>
      </PageHeader>

      {/* ── The school's own words, in a speech bubble ─────────────────── */}
      <section className="relative py-16">
        <Doodles names={['star', 'flower']} count={2} />
        <div className="relative z-[3] mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative rotate-[-0.6deg] rounded-[2.5rem] border-4 border-dashed border-crayon-coral bg-white p-8 shadow-sm sm:p-12">
            <span className="absolute -top-5 left-8 rounded-full bg-crayon-sun px-4 py-1.5 font-heading text-xs font-extrabold tracking-wide text-mosai-red-dark uppercase shadow-md">
              ✦ Our promise
            </span>
            <p className={`font-heading text-xl leading-relaxed font-bold sm:text-2xl ${INK}`}>
              {SCHOLARSHIPS.statement}
            </p>
            <p className={`mt-4 font-body text-sm ${INK2}`}>Mosai Schools management</p>
          </div>
        </div>
      </section>

      {/* ── Why ────────────────────────────────────────────────────────── */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className={`mb-6 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            Why we{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>do this</span>
          </h2>
          <div className="space-y-4">
            {SCHOLARSHIPS.purpose.map((para) => (
              <p key={para.slice(0, 24)} className={`font-body leading-relaxed ${INK2}`}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand img={bunonoPhotos[5]} cap="Assembly at Bunono" bg="bg-cream" />

      {/* ── Aims — big round badges ────────────────────────────────────── */}
      <section className="relative bg-mist py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <h2 className={`mb-12 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            What it sets out{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>to do</span>
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SCHOLARSHIPS.aims.map((aim, i) => {
              const Icon = ICONS[aim.icon]
              const color = CRAYONS[i % CRAYONS.length]
              return (
                <div key={aim.title} className="text-center">
                  <div
                    className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full shadow-lg"
                    style={{ backgroundColor: color, transform: `rotate(${i % 2 ? 3 : -3}deg)` }}
                  >
                    <Icon className="h-11 w-11 text-white" />
                  </div>
                  <h3 className={`mb-2 font-heading text-lg font-extrabold ${INK}`}>{aim.title}</h3>
                  <p className={`font-body text-sm leading-relaxed ${INK2}`}>{aim.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Eligibility — dashed bubble cards ──────────────────────────── */}
      <section className="relative bg-cream py-16">
        <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 right-0 left-0" />
        <Doodles names={['balloon', 'leaf']} count={2} />
        <div className="relative z-[3] mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className={`mb-4 font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
              Who can{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FF8A6B' }}>apply</span>
            </h2>
            <p className={`font-body leading-relaxed ${INK2}`}>
              School management weighs every application against the points below. A child need not tick every box,
              but real ability and real need must both be there.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {SCHOLARSHIPS.eligibility.map((item, i) => {
              const Icon = ICONS[item.icon]
              const color = CRAYONS[i % CRAYONS.length]
              return (
                <div
                  key={item.title}
                  className="rounded-[2rem] border-2 border-dashed bg-white p-7 shadow-sm transition-transform duration-200 hover:-translate-y-1.5"
                  style={{ borderColor: color, transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: color }}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className={`mb-2 font-heading text-lg font-extrabold ${INK}`}>{item.title}</h3>
                  <p className={`font-body text-sm leading-relaxed ${INK2}`}>{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Process — numbered stepping stones ─────────────────────────── */}
      <section className="relative bg-mosai-red py-16 text-white">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-extrabold sm:text-4xl">
              How a scholarship is{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>awarded</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body leading-relaxed text-white/85">
              Every application takes the same seven steps, and every award is decided by a panel from school management
              against criteria they have set and approved.
            </p>
          </div>

          <ol className="space-y-4">
            {SCHOLARSHIPS.process.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-[2rem] bg-white/10 p-6 backdrop-blur-sm"
                style={{ transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)` }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-lg font-extrabold text-mosai-red-dark shadow-md"
                  style={{ backgroundColor: CRAYONS[i % CRAYONS.length] }}
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-heading text-lg font-extrabold">{step.title}</h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-white/85">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Good to know ───────────────────────────────────────────────── */}
      <section className="relative bg-cream py-16">
        <WaveDivider variant="scallop" color="#D32F2F" flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-3xl px-4 pt-10 sm:px-6">
          <h2 className={`mb-10 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            Good to{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#6EC6F2' }}>know</span>
          </h2>
          <ul className="space-y-3">
            {SCHOLARSHIPS.goodToKnow.map((line, i) => (
              <li
                key={line.slice(0, 24)}
                className="flex items-start gap-3 rounded-[1.75rem] border-2 border-dashed bg-white p-5"
                style={{ borderColor: CRAYONS[i % CRAYONS.length] }}
              >
                <Info className="mt-0.5 h-5 w-5 shrink-0" style={{ color: CRAYONS[i % CRAYONS.length] }} />
                <p className={`font-body text-sm leading-relaxed ${INK2}`}>{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PhotoBand img={bunonoPhotos[12]} cap="Learning together" bg="bg-cream" />

      {/* ── Apply ──────────────────────────────────────────────────────── */}
      <section id="apply" className="relative scroll-mt-24 bg-mist py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">

            <div className="rounded-[2rem] border-2 border-dashed border-crayon-coral bg-cream p-7 sm:p-10 lg:col-span-3">
              <h2 className={`font-heading text-3xl font-extrabold ${INK}`}>
                Tell us about your{' '}
                <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>child</span>
              </h2>
              <p className={`mt-2 mb-7 font-body text-sm leading-relaxed ${INK2}`}>
                Send a few details and the Bunono office will reply within one working day with the next steps and the
                documents to bring. Please include your child’s age, the class you are hoping for, and a little about
                your family’s situation.
              </p>
              <ContactForm defaultSubject="Scholarship Application" />
            </div>

            <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-2">
              <div className="rotate-[1deg] rounded-[2rem] bg-mosai-red p-7 text-white shadow-lg">
                <h3 className="mb-2 font-heading text-lg font-extrabold">Would you rather talk?</h3>
                <p className="mb-5 font-body text-sm leading-relaxed text-white/85">
                  It is often easier to explain things in person. Call, message or visit the Bunono office.
                  Monday to Friday, 8:00 AM to 4:00 PM.
                </p>
                <div className="space-y-2.5">
                  <a
                    href={`tel:${tel}`}
                    className="flex items-center gap-2.5 rounded-full bg-crayon-sun px-5 py-3 font-heading text-sm font-extrabold text-mosai-red-dark transition-transform hover:-translate-y-0.5"
                  >
                    <Phone className="h-4 w-4" /> {campusInfo.phone}
                  </a>
                  <a
                    href={`https://wa.me/${wa}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 rounded-full border-2 border-white/40 px-5 py-3 font-heading text-sm font-extrabold text-white transition-colors hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="-rotate-[1deg] rounded-[2rem] border-2 border-dashed border-crayon-grass bg-white p-7">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-crayon-grass shadow-md">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <h3 className={`mb-2 font-heading text-lg font-extrabold ${INK}`}>Want to fund a place?</h3>
                <p className={`mb-4 font-body text-sm leading-relaxed ${INK2}`}>
                  Every scholarship exists because someone paid for it. If you would like to sponsor a child, we would
                  love to hear from you.
                </p>
                <Link to="/donate" className="group inline-flex items-center gap-2 font-heading text-sm font-extrabold text-mosai-red">
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
