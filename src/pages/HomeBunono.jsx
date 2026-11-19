import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, ArrowRight, Baby, BookOpen, Star, GraduationCap,
  Heart, Shield, Award, Phone, MessageCircle, MapPin, Sun,
  Users, Home as HomeIcon, ZoomIn, Wallet, Moon, CreditCard,
} from 'lucide-react'
import { useCampus }   from '../context/CampusContext'
import { MOSAI_ETHOS } from '../lib/campus'
import { feeRange, FEES } from '../lib/fees'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import Lightbox    from '../components/Lightbox'

import useSlideshow from '../hooks/useSlideshow'

import imgC   from '../assets/bunono/bunono-06.webp'  // morning assembly
import imgD    from '../assets/bunono/bunono-47.webp'  // campus playground
import { BUN, bunonoPhotos } from '../assets/bunono'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'

/* ══════════════════════════════════════════════════════════════════════
 * BUNONO HOME — a wholly separate "storybook garden" design.
 * Warm cream canvas, coral accents, blob-framed photos, scalloped section
 * edges, crayon underlines, tilted scrapbook layouts and dense doodles.
 * Deliberately shares NO layout with the Nalugala (flagship) home.
 * ════════════════════════════════════════════════════════════════════ */

const CREAM = 'rgb(var(--rgb-cream))'   // #FFF8EE, follows the theme

// warm storybook text tones (distinct from Nalugala's navy)
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'

const CLASSES = [
  { icon: Heart,         name: 'Toddler Class', age: 'Ages 1 to 2', color: '#9B7EDE', note: 'Loving day care for the littlest' },
  { icon: Baby,          name: 'Baby Class',   age: 'Ages 2 to 3', color: '#FF8A6B', note: 'Gentle first steps into school' },
  { icon: BookOpen,      name: 'Middle Class', age: 'Ages 3 to 4', color: '#FFC93C', note: 'Curiosity, play and early skills' },
  { icon: Star,          name: 'Top Class',    age: 'Ages 5 to 6', color: '#5FBB6E', note: 'Getting ready for Primary 1' },
  { icon: GraduationCap, name: 'Primary 1 to 5',  age: 'And growing', color: '#6EC6F2', note: 'A new class added every year' },
]

// Crayon dots for the hero slideshow
const DOT_COLORS = ['#FFC93C', '#5FBB6E', '#6EC6F2', '#FF8A6B', '#9B7EDE']

const VALUE_ICONS = { 'God fearing': Shield, 'Love': Heart, 'Humility': Sparkles, 'Excellence': Award }
const VALUE_COLORS = ['#FF8A6B', '#5FBB6E', '#FFC93C', '#6EC6F2']

const SCRAPBOOK = [
  { img: imgC,             cap: 'Morning assembly', alt: 'MOSAI Bunono learners in uniform gathered for morning assembly', rot: '-4deg' },
  { img: BUN.stretching.img, cap: BUN.stretching.cap, alt: BUN.stretching.alt,                                           rot: '3deg'  },
  { img: imgD,             cap: 'Our playground',   alt: 'The colourful playground at MOSAI Bunono, beside the classroom blocks', rot: '-2deg' },
  { img: BUN.verandas.img, cap: BUN.verandas.cap,   alt: BUN.verandas.alt,                                                 rot: '4deg'  },
  { img: bunonoPhotos[25], cap: 'Splash and play',   alt: 'MOSAI Bunono learners swimming and playing in the curved school pool', rot: '3deg'  },
  { img: bunonoPhotos[36], cap: 'Fun in the pool',   alt: 'MOSAI Bunono learners smiling together in the school swimming pool', rot: '-3deg' },
  { img: bunonoPhotos[3],  cap: 'Ready for the day', alt: 'MOSAI Bunono learners in school uniform cheering in the compound beside the painted murals', rot: '2deg' },
  { img: BUN.group.img,    cap: BUN.group.cap,      alt: BUN.group.alt,                                                    rot: '-4deg' },
]

/* Term fees for Bunono Campus. Figures come from lib/fees.js, which the school
 * confirmed apply at both campuses. Boarding is for Primary learners only. */
const FEE_ROWS = [
  { name: 'Toddler Class (Day Care)', sub: 'Ages 1 to 2',              day: FEES.toddler.day, board: FEES.toddler.boarding, color: '#9B7EDE' },
  { name: 'Nursery Section',          sub: 'Baby, Middle & Top Class', day: FEES.nursery.day, board: FEES.nursery.boarding, color: '#FF8A6B' },
  { name: 'Primary Section',          sub: 'P.1 to P.5',               day: FEES.primary.day, board: FEES.primary.boarding, color: '#6EC6F2' },
]

export default function HomeBunono() {
  const { campusInfo } = useCampus()
  const p   = campusInfo.profile
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')
  const tel = campusInfo.phone.replace(/\s+/g, '')
  const [shotIdx, setShotIdx] = useState(null)
  const slides = campusInfo.hero.slides
  const [slideIdx, goSlide] = useSlideshow(slides.length, 6000)

  return (
    <main className="bg-cream overflow-hidden">

      {/* ═══ 1 · HERO — full-width storybook slideshow ═══ */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-mosai-red-dark">
        {/* Slides: cross-fade, the visible one drifts slowly */}
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.img}
            alt={i === slideIdx ? s.alt : ''}
            aria-hidden={i !== slideIdx}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out ${i === slideIdx ? 'opacity-100 slide-kenburns' : 'opacity-0'}`}
            style={{ objectPosition: s.pos }}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
            decoding="async"
          />
        ))}

        {/* Warm red wash rising from the bottom left, photo stays bright top right */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_100%,rgba(122,20,20,0.95)_0%,rgba(183,28,28,0.78)_40%,rgba(225,75,75,0.30)_70%,rgba(225,75,75,0.05)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(122,20,20,0.72)_0%,rgba(122,20,20,0.45)_42%,rgba(122,20,20,0)_68%)] max-lg:bg-[linear-gradient(180deg,rgba(122,20,20,0.35)_0%,rgba(122,20,20,0.55)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#7A1414]/70 to-transparent" />

        {/* Doodles only where there is room; on phones they land on the text */}
        <div className="hidden md:block"><Doodles names={campusInfo.theme.doodles} count={3} /></div>

        <div className="relative z-[3] flex-1 flex items-end w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-36 sm:pb-44">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-10 items-end">
            {/* words */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 -rotate-2 bg-cream text-mosai-red-dark font-heading font-extrabold text-xs uppercase tracking-wide px-4 py-2 rounded-full shadow-lg mb-6">
                <Sparkles className="w-4 h-4 text-crayon-sun" /> New Campus · Opened 10 Feb 2026
              </span>

              <h1 className="font-heading font-extrabold text-5xl sm:text-6xl xl:text-7xl text-white leading-[1.02] mb-5 drop-shadow-sm">
                A New Home to{' '}
                <span className="crayon-underline text-white" style={{ '--crayon-color': '#5FBB6E' }}>Shine.</span>
              </h1>

              <p className="font-body text-white/95 text-lg leading-relaxed mb-8 max-w-xl">
                {campusInfo.hero.tagline}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 bg-cream text-mosai-red-dark font-heading font-extrabold text-base px-8 py-4 rounded-full shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200"
                >
                  <Sun className="w-5 h-5 text-crayon-sun" /> Enroll Your Child
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white/80 text-white font-heading font-extrabold text-base px-8 py-4 rounded-full hover:bg-white/15 transition-all duration-200"
                >
                  Come Visit Us <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* fun stat bubbles */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Users,         label: '100 Learners',   color: '#FFC93C' },
                  { icon: GraduationCap, label: 'Toddler to P.5', color: '#5FBB6E' },
                  { icon: HomeIcon,      label: 'Day & Primary Boarding', color: '#6EC6F2' },
                  { icon: Wallet,        label: `Fees from UGX ${feeRange(FEES.nursery.day).split(' to ')[0]}`, color: '#9B7EDE', href: '#fees' },
                  { icon: Phone,         label: campusInfo.phone, color: '#FF8A6B', href: `tel:${tel}` },
                ].map((s) => {
                  const Icon = s.icon
                  const cls = 'inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full pl-1.5 pr-4 py-1.5 font-heading font-bold text-sm text-white'
                  const inner = (
                    <>
                      <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: s.color }}>
                        <Icon className="w-4 h-4 text-white" />
                      </span>
                      {s.label}
                    </>
                  )
                  return s.href
                    ? <a key={s.label} href={s.href} className={`${cls} hover:bg-white/25 transition-colors`}>{inner}</a>
                    : <span key={s.label} className={cls}>{inner}</span>
                })}
              </div>
            </div>

            {/* caption sticker + crayon dots */}
            <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4">
              <p key={slideIdx} className="animate-fade-in-up rotate-2 bg-cream text-[#43261A] font-heading font-extrabold text-sm sm:text-base px-4 py-2 rounded-xl shadow-lg">
                {slides[slideIdx].cap}
              </p>
              <div className="flex items-center gap-2.5" role="group" aria-label="Choose a photo">
                {slides.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goSlide(i)}
                    aria-label={`Show photo ${i + 1}: ${s.cap}`}
                    aria-current={i === slideIdx}
                    className={`rounded-full border-2 border-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${i === slideIdx ? 'w-5 h-5' : 'w-3.5 h-3.5 opacity-70 hover:opacity-100'}`}
                    style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <WaveDivider variant="scallop" color={CREAM} className="absolute bottom-0 left-0 right-0 z-[2]" />
      </section>

      {/* ═══ 2 · WELCOME — headteacher, warm speech-bubble card ═══ */}
      {p.welcome && (
        <section className="relative bg-cream py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 items-center">
              <div className="mx-auto text-center">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg ring-8 ring-mosai-red mx-auto">
                  <img src={mosaiLogo} alt="MOSAI Schools crest" className="w-24 h-24 object-contain" loading="lazy" decoding="async" />
                </div>
                <p className={`font-heading font-extrabold mt-4 ${INK}`}>Headteacher</p>
                <p className="font-body text-sm text-mosai-red font-semibold">MOSAI Schools, Bunono Campus</p>
              </div>

              {/* speech bubble */}
              <div className="relative bg-white rounded-[2rem] p-8 shadow-md border-2 border-dashed border-crayon-coral">
                <span className="absolute -left-3 top-10 hidden md:block w-6 h-6 bg-white border-l-2 border-b-2 border-dashed border-crayon-coral rotate-45" />
                <p className="font-body text-lg font-bold text-mosai-red mb-2">Welcome to the MOSAI family! 👋</p>
                <p className={`font-body leading-relaxed ${INK2}`}>{p.welcome}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 3 · OUR CLASSES — crayon bubble cards ═══ */}
      <section className="relative bg-mist py-20">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['balloon', 'star']} count={2} />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">Little learners, big dreams</p>
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
              Our{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>Classes</span>
            </h2>
            <p className={`font-body mt-3 max-w-xl mx-auto ${INK2}`}>
              From tiny first steps to confident primary learners: {p.classes}, growing one class every year to P.7.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {CLASSES.map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={c.name}
                  className="group bg-cream rounded-[2rem] p-7 text-center shadow-sm border-2 border-dashed hover:-translate-y-1.5 transition-transform duration-200"
                  style={{ borderColor: c.color, transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                >
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 shadow-md" style={{ backgroundColor: c.color }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`font-heading font-extrabold text-xl ${INK}`}>{c.name}</h3>
                  <p className="font-heading font-bold text-sm mt-0.5" style={{ color: c.color }}>{c.age}</p>
                  <p className={`font-body text-sm mt-2 ${INK2}`}>{c.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ 3b · FEES STRUCTURE — termly fees for Bunono Campus ═══ */}
      <section id="fees" className="relative bg-cream py-20 scroll-mt-28">
        <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 left-0 right-0" />
        <div className="hidden md:block"><Doodles names={['star', 'leaf']} count={2} /></div>
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">Bunono Campus · Per term</p>
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
              Fees{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>Structure</span>
            </h2>
            <p className={`font-body mt-3 max-w-xl mx-auto ${INK2}`}>
              Termly tuition in Uganda Shillings (UGX). Boarding is offered to Primary learners only.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr),minmax(0,7fr)] gap-10 items-center">
            {/* photo */}
            <figure className="relative -rotate-2 bg-white p-3 pb-4 rounded-2xl shadow-xl max-w-md mx-auto w-full">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200">
                <img src={BUN.crest.img} alt={BUN.crest.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <figcaption className={`font-heading font-bold text-center mt-3 ${INK}`}>{BUN.crest.cap}</figcaption>
            </figure>

            {/* fee table */}
            <div className="bg-white rounded-[2rem] shadow-md border-2 border-dashed border-crayon-coral overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1fr,10rem,10rem] gap-4 px-7 py-4 bg-mist font-body text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Class</span>
                <span className="flex items-center gap-1.5"><Sun className="w-4 h-4 text-crayon-sun" /> Day (UGX)</span>
                <span className="flex items-center gap-1.5"><Moon className="w-4 h-4 text-mosai-blue" /> Boarding (UGX)</span>
              </div>
              <ul className="divide-y divide-dashed divide-gray-200">
                {FEE_ROWS.map((r) => (
                  <li key={r.name} className="grid grid-cols-2 sm:grid-cols-[1fr,10rem,10rem] gap-x-4 gap-y-3 px-5 sm:px-7 py-5 items-center">
                    <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                      <span className="w-2.5 h-10 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <div>
                        <p className={`font-heading font-extrabold leading-tight ${INK}`}>{r.name}</p>
                        <p className={`font-body text-sm ${INK2}`}>{r.sub}</p>
                      </div>
                    </div>
                    <div>
                      <p className="sm:hidden font-body text-[11px] font-bold uppercase tracking-widest text-gray-400">Day (UGX)</p>
                      <p className={`font-heading font-extrabold text-sm sm:text-base whitespace-nowrap ${INK}`}>{feeRange(r.day)}</p>
                    </div>
                    <div>
                      <p className="sm:hidden font-body text-[11px] font-bold uppercase tracking-widest text-gray-400">Boarding (UGX)</p>
                      {r.board
                        ? <p className={`font-heading font-extrabold text-sm sm:text-base whitespace-nowrap ${INK}`}>{feeRange(r.board)}</p>
                        : <p className="font-body text-sm text-gray-400">Day school only</p>}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-5 sm:px-7 py-5 bg-cream border-t-2 border-dashed border-crayon-coral space-y-2">
                <p className={`flex items-start gap-2 font-body text-sm ${INK2}`}>
                  <GraduationCap className="w-4 h-4 mt-0.5 text-mosai-red shrink-0" />
                  <span><span className={`font-bold ${INK}`}>One time admission fee:</span> UGX 30,000</span>
                </p>
                <p className={`flex items-start gap-2 font-body text-sm ${INK2}`}>
                  <CreditCard className="w-4 h-4 mt-0.5 text-mosai-red shrink-0" />
                  <span>All fees are per term and paid through the School Pay System only. No cash is accepted at school.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link to="/admissions" className="inline-flex items-center gap-2 bg-mosai-red text-white font-heading font-extrabold px-7 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              How to Apply <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={`tel:${tel}`} className="inline-flex items-center gap-2 border-2 border-mosai-red text-mosai-red font-heading font-extrabold px-7 py-3.5 rounded-full hover:bg-mosai-red-light transition-all">
              <Phone className="w-5 h-5" /> Ask about fees
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 4 · SCRAPBOOK — tilted polaroids of school life ═══ */}
      <section className="relative bg-mist py-20">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl ${INK}`}>
              A Day at{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#6EC6F2' }}>Bunono</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {SCRAPBOOK.map((ph, i) => (
              <figure
                key={i}
                onClick={() => setShotIdx(i)}
                className="group cursor-pointer bg-white p-2 pb-3 sm:p-3 sm:pb-5 rounded-lg shadow-xl w-[calc(50%-0.5rem)] sm:w-56 hover:-translate-y-2 hover:rotate-0 transition-transform duration-200"
                style={{ transform: `rotate(${ph.rot})` }}
              >
                <div className="relative w-full h-32 sm:h-44 rounded-md overflow-hidden bg-zinc-200">
                  <img src={ph.img} alt={ph.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </span>
                  </div>
                </div>
                <figcaption className={`font-heading font-bold text-sm sm:text-base text-center mt-2 sm:mt-3 ${INK}`}>{ph.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5 · CORE VALUES — big friendly circles ═══ */}
      <section className="relative bg-cream py-20">
        <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">What we grow by</p>
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
              Our Core{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {MOSAI_ETHOS.values.map((v, i) => {
              const Icon = VALUE_ICONS[v] || Sparkles
              const color = VALUE_COLORS[i % VALUE_COLORS.length]
              return (
                <div key={v} className="text-center">
                  <div
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex items-center justify-center shadow-lg ring-4 ring-white animate-doodle-float"
                    style={{ backgroundColor: color, '--doodle-rot': '0deg', animationDelay: `${i * 0.4}s` }}
                  >
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <p className={`font-heading font-extrabold text-lg mt-4 ${INK}`}>{v}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ 6 · VISIT — coral scallop CTA with real contacts ═══ */}
      <section className="relative pt-24 pb-20" style={{ background: 'linear-gradient(180deg, #E14B4B 0%, #B71C1C 100%)' }}>
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['star', 'flower']} count={2} />
        <div className="relative z-[3] max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-4">
            Come and See Us in Bunono!
          </h2>
          <p className="font-body text-white/90 text-lg mb-3 leading-relaxed">
            We'd love to show you around our new campus in {p.address}. Applications for 2027 are open now.
          </p>
          <p className="font-body text-white/80 mb-8 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> {p.area}, Wakiso District
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`tel:${tel}`} className="inline-flex items-center gap-2 bg-cream text-mosai-red-dark font-heading font-extrabold px-7 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              <Phone className="w-5 h-5" /> {campusInfo.phone}
            </a>
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-crayon-grass text-white font-heading font-extrabold px-7 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
            <Link to="/admissions" className="inline-flex items-center gap-2 border-2 border-white/80 text-white font-heading font-extrabold px-7 py-3.5 rounded-full hover:bg-white/15 transition-all">
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Lightbox photos={SCRAPBOOK} index={shotIdx} setIndex={setShotIdx} />
    </main>
  )
}
