import { Link } from 'react-router-dom'
import {
  GraduationCap, Utensils, BookOpen, Building2, Shirt, Trophy,
  Gift, CalendarHeart, HeartHandshake, Package, Briefcase, Clock,
  ShieldCheck, ReceiptText, Target, Eye,
  Heart, Phone, MessageCircle, Mail, ArrowRight,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { DONATE } from '../lib/giving'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import { DonationForm } from './Donate'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader from '../assets/bunono/bunono-13.webp'   // pool play

/* Bunono DONATE — storybook design. Same copy as the Nalugala page
 * (from lib/giving.js), and the same DonationForm logic in a different skin. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'
const CRAYONS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2', '#9B7EDE']

const ICONS = {
  GraduationCap, Utensils, BookOpen, Building2, Shirt, Trophy,
  Gift, CalendarHeart, HeartHandshake, Package, Briefcase, Clock,
  ShieldCheck, ReceiptText, Target, Eye,
}

export default function DonateBunono() {
  const { campusInfo } = useCampus()
  const tel = campusInfo.phone.replace(/\s+/g, '')
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')

  return (
    <main className="overflow-hidden bg-cream">

      <PageHeader
        crumb="Donate"
        title="Send a Child"
        accentWord="to School"
        kicker="Support Bunono"
        subtitle="Our fees stay affordable because friends of the school help carry the cost. Your gift becomes books, lunch, a uniform, or a whole school place for a child who had none."
        image={imgHeader}
        nextBg={CREAM}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#give"
            className="inline-flex items-center gap-2 rounded-full bg-crayon-sun px-6 py-3 font-heading text-sm font-extrabold text-mosai-red-dark shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Heart className="h-4 w-4" /> I Would Like to Give
          </a>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 font-heading text-sm font-extrabold text-white transition-colors duration-200 hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" /> Talk to Us First
          </a>
        </div>
      </PageHeader>

      {/* ── Why ────────────────────────────────────────────────────────── */}
      <section className="relative py-16">
        <Doodles names={['balloon', 'star']} count={2} />
        <div className="relative z-[3] mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className={`mb-6 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            Fees alone don’t{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>fill a classroom</span>
          </h2>
          <div className="space-y-4">
            {DONATE.intro.map((para) => (
              <p key={para.slice(0, 24)} className={`font-body leading-relaxed ${INK2}`}>{para}</p>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link to="/scholarships" className="group inline-flex items-center gap-2 font-heading text-sm font-extrabold text-mosai-red">
              Read about our scholarship programme
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <PhotoBand img={bunonoPhotos[32]} cap="A day at Bunono" bg="bg-cream" />

      {/* ── Impact tiers — price tags on tilted cards ──────────────────── */}
      <section className="relative bg-white py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className={`mb-3 font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
              What a gift{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>actually does</span>
            </h2>
            <p className={`font-body ${INK2}`}>
              Give any amount you like, and these are just the figures behind the things we buy most often.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {DONATE.tiers.map((tier, i) => {
              const color = CRAYONS[i % CRAYONS.length]
              return (
                <div
                  key={tier.label}
                  className={`relative flex flex-col rounded-[2rem] border-2 border-dashed p-7 transition-transform duration-200 hover:-translate-y-1.5 ${
                    tier.featured ? 'bg-mosai-red text-white' : 'bg-cream'
                  }`}
                  style={{ borderColor: tier.featured ? '#FFC93C' : color, transform: `rotate(${i % 2 ? 1 : -1}deg)` }}
                >
                  {tier.featured && (
                    <span className="absolute -top-3.5 left-6 rounded-full bg-crayon-sun px-3 py-1 font-heading text-[10px] font-extrabold tracking-wider text-mosai-red-dark uppercase shadow-md">
                      Most needed
                    </span>
                  )}
                  <p className={`font-heading text-2xl font-extrabold ${tier.featured ? 'text-white' : INK}`}>{tier.label}</p>
                  <p className={`mt-0.5 font-body text-xs ${tier.featured ? 'text-white/70' : 'text-gray-400'}`}>{tier.approx}</p>
                  <h3 className={`mt-4 mb-2 font-heading text-lg font-extrabold ${tier.featured ? 'text-white' : INK}`}>{tier.title}</h3>
                  <p className={`flex-1 font-body text-sm leading-relaxed ${tier.featured ? 'text-white/85' : INK2}`}>{tier.text}</p>
                  <a
                    href="#give"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3 font-heading text-sm font-extrabold transition-transform duration-200 hover:-translate-y-0.5"
                    style={
                      tier.featured
                        ? { backgroundColor: '#FFC93C', color: '#B71C1C' }
                        : { backgroundColor: color, color: '#FFFFFF' }
                    }
                  >
                    Give {tier.label.replace('UGX ', '')}
                  </a>
                </div>
              )
            })}
          </div>

          <p className="mt-7 text-center font-body text-xs text-gray-400">
            Foreign currency equivalents are approximate and move with the exchange rate.
          </p>
        </div>
      </section>

      {/* ── Where it goes — round badges ───────────────────────────────── */}
      <section className="relative bg-cream py-16">
        <WaveDivider variant="scallop" color="#FFFFFF" flip className="absolute top-0 right-0 left-0" />
        <Doodles names={['flower', 'leaf']} count={2} />
        <div className="relative z-[3] mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className={`mb-3 font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
              What your giving{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FF8A6B' }}>supports</span>
            </h2>
            <p className={`font-body ${INK2}`}>
              Point your gift at any of these, or leave it to us to use where the need is greatest that term.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {DONATE.areas.map((area, i) => {
              const Icon = ICONS[area.icon]
              return (
                <div key={area.title} className="text-center">
                  <div
                    className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full shadow-lg"
                    style={{ backgroundColor: area.color, transform: `rotate(${i % 2 ? 4 : -4}deg)` }}
                  >
                    <Icon className="h-9 w-9 text-white" />
                  </div>
                  <h3 className={`mb-2 font-heading text-lg font-extrabold ${INK}`}>{area.title}</h3>
                  <p className={`font-body text-sm leading-relaxed ${INK2}`}>{area.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Ways to give ───────────────────────────────────────────────── */}
      <section className="relative bg-white py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <h2 className={`mb-12 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            More than one way to{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#6EC6F2' }}>give</span>
          </h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {DONATE.ways.map((way, i) => {
              const Icon = ICONS[way.icon]
              const color = CRAYONS[i % CRAYONS.length]
              return (
                <div
                  key={way.title}
                  className="flex gap-4 rounded-[2rem] border-2 border-dashed bg-cream p-7"
                  style={{ borderColor: color, transform: `rotate(${i % 2 ? 0.7 : -0.7}deg)` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: color }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`mb-1.5 font-heading text-base font-extrabold ${INK}`}>{way.title}</h3>
                    <p className={`font-body text-sm leading-relaxed ${INK2}`}>{way.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How giving works ───────────────────────────────────────────── */}
      <section className="relative bg-mosai-red py-16 text-white">
        <WaveDivider variant="scallop" color="#FFFFFF" flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-6xl px-4 pt-10 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-heading text-3xl font-extrabold sm:text-4xl">
              How giving{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>works</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body leading-relaxed text-white/85">
              MOSAI Schools does not take payments through this website. You tell us what you would like to do, and the
              school office sends its official instructions directly to you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DONATE.howItWorks.map((step, i) => (
              <div
                key={step.title}
                className="rounded-[2rem] bg-white/10 p-7 backdrop-blur-sm"
                style={{ transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
              >
                <span
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-full font-heading text-lg font-extrabold text-mosai-red-dark shadow-md"
                  style={{ backgroundColor: CRAYONS[i % CRAYONS.length] }}
                >
                  {i + 1}
                </span>
                <h3 className="mb-2 font-heading text-base font-extrabold">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed text-white/85">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Assurances ─────────────────────────────────────────────────── */}
      <section className="relative bg-cream py-16">
        <WaveDivider variant="scallop" color="#D32F2F" flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-5xl px-4 pt-10 sm:px-6">
          <h2 className={`mb-12 text-center font-heading text-3xl font-extrabold sm:text-4xl ${INK}`}>
            How we look after{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>what you give</span>
          </h2>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {DONATE.assurances.map((a, i) => {
              const Icon = ICONS[a.icon]
              const color = CRAYONS[i % CRAYONS.length]
              return (
                <div key={a.title} className="flex gap-4 rounded-[2rem] bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: color }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`mb-1.5 font-heading text-base font-extrabold ${INK}`}>{a.title}</h3>
                    <p className={`font-body text-sm leading-relaxed ${INK2}`}>{a.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <PhotoBand img={bunonoPhotos[46]} cap="Room to play and grow" bg="bg-cream" />

      {/* ── The form ───────────────────────────────────────────────────── */}
      <section id="give" className="relative scroll-mt-24 bg-white py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 right-0 left-0" />
        <div className="relative z-[3] mx-auto max-w-7xl px-4 pt-8 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">

            <div className="rounded-[2rem] border-2 border-dashed border-crayon-coral bg-cream p-7 sm:p-10 lg:col-span-3">
              <h2 className={`font-heading text-3xl font-extrabold ${INK}`}>
                I would like to{' '}
                <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>give</span>
              </h2>
              <p className={`mt-2 mb-7 font-body text-sm leading-relaxed ${INK2}`}>
                Tell us what you have in mind and the office will reply within one working day with the official payment
                details. Nothing is charged here, and you can change your mind at any point.
              </p>
              <DonationForm theme="bunono" />
            </div>

            <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-2">
              <div className="rotate-[1deg] rounded-[2rem] bg-mosai-red p-7 text-white shadow-lg">
                <h3 className="mb-2 font-heading text-lg font-extrabold">Prefer to speak to someone?</h3>
                <p className="mb-5 font-body text-sm leading-relaxed text-white/85">
                  The Bunono office is happy to talk anything through before you commit. Monday to Friday,
                  8:00 AM to 4:00 PM.
                </p>
                <div className="space-y-2.5">
                  <a href={`tel:${tel}`} className="flex items-center gap-2.5 rounded-full bg-crayon-sun px-5 py-3 font-heading text-sm font-extrabold text-mosai-red-dark transition-transform hover:-translate-y-0.5">
                    <Phone className="h-4 w-4" /> {campusInfo.phone}
                  </a>
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-full border-2 border-white/40 px-5 py-3 font-heading text-sm font-extrabold text-white transition-colors hover:bg-white/10">
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <a href={`mailto:${campusInfo.email}?subject=Donation%20Enquiry`} className="flex items-center gap-2.5 rounded-full border-2 border-white/40 px-5 py-3 font-heading text-sm font-extrabold text-white transition-colors hover:bg-white/10">
                    <Mail className="h-4 w-4" /> Email the office
                  </a>
                </div>
              </div>

              <div className="-rotate-[1deg] rounded-[2rem] border-2 border-dashed border-crayon-sky bg-white p-7">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-crayon-sky shadow-md">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <h3 className={`mb-2 font-heading text-lg font-extrabold ${INK}`}>Who your gift reaches</h3>
                <p className={`mb-4 font-body text-sm leading-relaxed ${INK2}`}>
                  Scholarship places go to vulnerable and disadvantaged, yet able and gifted children, chosen against
                  criteria approved by school management.
                </p>
                <Link to="/scholarships" className="group inline-flex items-center gap-2 font-heading text-sm font-extrabold text-mosai-red">
                  See how children are chosen
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
