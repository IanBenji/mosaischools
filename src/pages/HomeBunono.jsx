import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, ArrowRight, Baby, BookOpen, Star, GraduationCap,
  Heart, Shield, Award, Phone, MessageCircle, MapPin, Sun,
  Users, Home as HomeIcon, ZoomIn,
} from 'lucide-react'
import { useCampus }   from '../context/CampusContext'
import { MOSAI_ETHOS } from '../lib/campus'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import Lightbox    from '../components/Lightbox'

import imgHero from '../assets/bunono/bunono-33.webp'  // joyful pool splash
import imgA    from '../assets/bunono/bunono-25.webp'  // smiling in the pool
import imgB    from '../assets/bunono/bunono-13.webp'  // pool play
import imgC    from '../assets/bunono/bunono-06.webp'  // morning assembly
import imgD    from '../assets/bunono/bunono-47.webp'  // campus playground

/* ══════════════════════════════════════════════════════════════════════
 * BUNONO HOME — a wholly separate "storybook garden" design.
 * Warm cream canvas, coral accents, blob-framed photos, scalloped section
 * edges, crayon underlines, tilted scrapbook layouts and dense doodles.
 * Deliberately shares NO layout with the Nalugala (flagship) home.
 * ════════════════════════════════════════════════════════════════════ */

const CREAM = '#FFF8EE'

// warm storybook text tones (distinct from Nalugala's navy)
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'

const CLASSES = [
  { icon: Baby,          name: 'Baby Class',   age: 'Ages 2 to 3', color: '#FF8A6B', note: 'Gentle first steps into school' },
  { icon: BookOpen,      name: 'Middle Class', age: 'Ages 3 to 4', color: '#FFC93C', note: 'Curiosity, play and early skills' },
  { icon: Star,          name: 'Top Class',    age: 'Ages 5 to 6', color: '#5FBB6E', note: 'Getting ready for Primary 1' },
  { icon: GraduationCap, name: 'Primary 1 to 4',  age: 'And growing', color: '#6EC6F2', note: 'A new class added every year' },
]

const VALUE_ICONS = { 'God fearing': Shield, 'Love': Heart, 'Humility': Sparkles, 'Excellence': Award }
const VALUE_COLORS = ['#FF8A6B', '#5FBB6E', '#FFC93C', '#6EC6F2']

const SCRAPBOOK = [
  { img: imgC, cap: 'Morning assembly',      rot: '-4deg' },
  { img: imgD, cap: 'Our playground',        rot: '3deg'  },
  { img: imgA, cap: 'Splash time',           rot: '-2deg' },
  { img: imgB, cap: 'Big smiles, every day', rot: '4deg'  },
]

export default function HomeBunono() {
  const { campusInfo } = useCampus()
  const p   = campusInfo.profile
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')
  const tel = campusInfo.phone.replace(/\s+/g, '')
  const [shotIdx, setShotIdx] = useState(null)

  return (
    <main className="bg-cream overflow-hidden">

      {/* ═══ 1 · HERO — two-column, photo composition ═══ */}
      <section
        className="relative overflow-hidden pt-28 pb-36 sm:pb-44"
        style={{ background: 'linear-gradient(155deg, #7A1414 0%, #C0392B 45%, #E14B4B 100%)' }}
      >
        {/* soft decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -left-24 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-1/4 w-80 h-80 rounded-full bg-crayon-sun/20 blur-2xl" />
        <Doodles names={campusInfo.theme.doodles} />

        <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT — words */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 -rotate-2 bg-cream text-mosai-red-dark font-heading font-extrabold text-xs uppercase tracking-wide px-4 py-2 rounded-full shadow-lg mb-6">
                <Sparkles className="w-4 h-4 text-crayon-sun" /> New Campus · Opened 10 Feb 2026
              </span>

              <h1 className="font-heading font-extrabold text-5xl sm:text-6xl xl:text-7xl text-white leading-[1.02] mb-5 drop-shadow-sm">
                A New Home to{' '}
                <span className="crayon-underline text-white" style={{ '--crayon-color': '#5FBB6E' }}>Shine.</span>
              </h1>

              <p className="font-body text-white/90 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                {campusInfo.hero.tagline}
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
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
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { icon: Users,        label: '100 Learners',   color: '#FFC93C' },
                  { icon: GraduationCap, label: 'Baby to P.4',     color: '#5FBB6E' },
                  { icon: HomeIcon,      label: 'Day & Boarding', color: '#6EC6F2' },
                ].map((s) => {
                  const Icon = s.icon
                  return (
                    <span key={s.label} className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full pl-1.5 pr-4 py-1.5 font-heading font-bold text-sm text-white">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: s.color }}>
                        <Icon className="w-4 h-4 text-white" />
                      </span>
                      {s.label}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* RIGHT — photo composition */}
            <div className="relative mx-auto w-[84%] max-w-sm sm:w-full sm:max-w-md lg:max-w-none">
              {/* main blob photo */}
              <div
                className="relative ring-8 ring-cream shadow-2xl overflow-hidden bg-white rotate-2"
                style={{ borderRadius: '46% 54% 42% 58% / 55% 42% 58% 45%' }}
              >
                <img src={imgHero} alt="Children at Bunono Campus" className="w-full h-80 sm:h-96 object-cover" loading="eager" decoding="async" />
              </div>

              {/* small round photo peeking bottom-left */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-8 ring-cream shadow-xl overflow-hidden bg-white -rotate-6">
                <img src={imgA} alt="Learners playing" className="w-full h-full object-cover" loading="eager" decoding="async" />
              </div>

              {/* rotated enrolling badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 rotate-6 bg-crayon-grass text-white font-heading font-extrabold text-sm px-4 py-2 rounded-2xl shadow-lg">
                Now enrolling! ✏️
              </div>

              {/* sun doodle sticker */}
              <div className="absolute top-1/2 -right-3 sm:-right-6 w-16 h-16 animate-pop-bounce" style={{ '--doodle-rot': '0deg' }}>
                <svg viewBox="0 0 48 48" className="animate-doodle-spin" width="100%" height="100%" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
                  <circle cx="24" cy="24" r="11" fill="#FFC93C" />
                  {Array.from({ length: 8 }).map((_, i) => {
                    const a = (i * Math.PI) / 4
                    return <line key={i} x1={24 + Math.cos(a) * 15} y1={24 + Math.sin(a) * 15} x2={24 + Math.cos(a) * 21} y2={24 + Math.sin(a) * 21} stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" />
                  })}
                </svg>
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
                <div className="w-28 h-28 rounded-full bg-mosai-red flex items-center justify-center shadow-lg ring-8 ring-white">
                  <span className="font-heading font-extrabold text-4xl text-white">
                    {p.headteacher.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <p className={`font-heading font-extrabold mt-3 ${INK}`}>{p.headteacher}</p>
                <p className="font-body text-sm text-mosai-red font-semibold">Headteacher</p>
              </div>

              {/* speech bubble */}
              <div className="relative bg-white rounded-[2rem] p-8 shadow-md border-2 border-dashed border-crayon-coral">
                <span className="absolute -left-3 top-10 hidden md:block w-6 h-6 bg-white border-l-2 border-b-2 border-dashed border-crayon-coral rotate-45" />
                <p className="font-body text-lg font-bold text-mosai-red mb-2">Welcome to the Mosai family! 👋</p>
                <p className={`font-body leading-relaxed ${INK2}`}>{p.welcome}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 3 · OUR CLASSES — crayon bubble cards ═══ */}
      <section className="relative bg-white py-20">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* ═══ 4 · SCRAPBOOK — tilted polaroids of school life ═══ */}
      <section className="relative bg-cream py-20">
        <WaveDivider variant="scallop" color="#FFFFFF" flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl ${INK}`}>
              A Day at{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#6EC6F2' }}>Bunono</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {SCRAPBOOK.map((ph, i) => (
              <figure
                key={i}
                onClick={() => setShotIdx(i)}
                className="group cursor-pointer bg-white p-3 pb-5 rounded-lg shadow-xl w-56 hover:-translate-y-2 hover:rotate-0 transition-transform duration-200"
                style={{ transform: `rotate(${ph.rot})` }}
              >
                <div className="relative w-full h-44 rounded-md overflow-hidden bg-zinc-200">
                  <img src={ph.img} alt={ph.cap} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </span>
                  </div>
                </div>
                <figcaption className={`font-heading font-bold text-center mt-3 ${INK}`}>{ph.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5 · CORE VALUES — big friendly circles ═══ */}
      <section className="relative bg-white py-20">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
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
        <WaveDivider variant="scallop" color="#FFFFFF" flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['star', 'flower']} count={2} />
        <div className="relative z-[3] max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-4">
            Come and See Us in Bunono!
          </h2>
          <p className="font-body text-white/90 text-lg mb-3 leading-relaxed">
            We'd love to show you around our new campus in {p.address}. Applications for 2026 are open now.
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
