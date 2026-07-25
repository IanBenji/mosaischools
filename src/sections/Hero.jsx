import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, Trophy, Waves, GraduationCap,
  Flag, Globe, ArrowRight, MapPin, ShieldCheck, Sparkles,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { CAMPUSES, ACCENT } from '../lib/campus'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'

// ── Activity board ────────────────────────────────────────────────
const ACTIVITIES = [
  { icon: CalendarDays, tag: 'Term Dates',   title: 'Term II 2026 Opens',         detail: '25 May 2026, all learners',        accent: '#D32F2F' },
  { icon: Trophy,       tag: 'Achievement',  title: 'Spelling Bee Champions',      detail: 'Top Class celebrates victory!',     accent: '#FFC93C' },
  { icon: Waves,        tag: 'Facilities',   title: 'Swimming Lessons Ongoing',    detail: 'All classes, Nalugala Campus',      accent: '#6EC6F2' },
  { icon: GraduationCap,tag: 'Admissions',   title: 'Enrolment Now Open',          detail: 'Baby Class to P.3, 2026 intake',   accent: '#5FBB6E' },
  { icon: Flag,         tag: 'Events',       title: 'Sports Day, 7 June 2026',     detail: 'Nalugala Campus, gates at 8:30 AM',accent: '#FF8A6B' },
  { icon: Globe,        tag: 'Languages',    title: '4 Languages of Instruction',  detail: 'English, Swahili, French, Chinese', accent: '#9B7EDE' },
]

function ActivitySlot({ startIndex, intervalMs, delayMs }) {
  const [idx,       setIdx]       = useState(startIndex % ACTIVITIES.length)
  const [animClass, setAnimClass] = useState('board-flip-in')

  useEffect(() => {
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setAnimClass('board-flip-out')
        setTimeout(() => {
          setIdx(i => (i + 1) % ACTIVITIES.length)
          setAnimClass('board-flip-in')
        }, 320)
      }, intervalMs)
    }, delayMs)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [intervalMs, delayMs])

  const act  = ACTIVITIES[idx]
  const Icon = act.icon

  return (
    <div className={`${animClass} bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl px-4 py-3 flex items-center gap-3`}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: act.accent }}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-white/55 mb-0.5">{act.tag}</p>
        <p className="font-heading font-bold text-sm text-white leading-tight truncate">{act.title}</p>
        <p className="font-body text-xs text-white/70 mt-0.5 truncate">{act.detail}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const { campus, campusInfo } = useCampus()
  const hero  = campusInfo.hero
  const theme = campusInfo.theme

  // Cycle the background photos so the bright sky always has real school life behind it.
  const [bgIdx, setBgIdx] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setBgIdx(i => (i + 1) % hero.backgrounds.length), 6000)
    return () => clearInterval(timer)
  }, [hero.backgrounds])

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: theme.heroGradient }}
    >
      {/* Real school-life photos behind the bright sky (cross-fade) */}
      {hero.backgrounds.map((img, i) => (
        <img
          key={`${campus}-${i}`}
          src={img}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${i === bgIdx ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: 0 }}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}

      {/* Bright campus-coloured wash over the photos — keeps the cheerful sky */}
      <div className="absolute inset-0 transition-[background] duration-700" style={{ zIndex: 1, background: theme.heroWash }} />

      {/* Soft light blobs for depth */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-2xl" style={{ zIndex: 1 }} />
      <div className="pointer-events-none absolute bottom-10 right-0 w-80 h-80 rounded-full bg-white/10 blur-2xl" style={{ zIndex: 1 }} />

      {/* Floating campus doodles (sun/cloud vs star/flower) */}
      <Doodles names={theme.doodles} />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 lg:pt-24 lg:pb-36" style={{ zIndex: 3 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Welcome content (re-keyed per campus → fades in) ── */}
          <div key={campus} className="animate-fade-in-up flex flex-col justify-center">

            {/* Credential badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="flex items-center gap-1.5 font-body text-xs font-bold text-white bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Licensed by MoES Uganda
              </span>
              <span className="flex items-center gap-1.5 font-body text-xs font-bold text-white bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {campusInfo.name} · {campusInfo.district}
              </span>
            </div>

            {/* Headline with hand-drawn crayon underline */}
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              {hero.headline}<br />
              <span className="crayon-underline" style={{ '--crayon-color': theme.crayon }}>
                {hero.accentWord}
              </span>
            </h1>

            {/* Tagline */}
            <p className="font-body text-lg text-white/85 leading-relaxed mb-8 max-w-lg">
              {hero.tagline}
            </p>

            {/* CTAs — chunky, high-contrast on any campus colour */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 bg-white text-mosai-blue-dark font-heading font-extrabold text-base px-8 py-4 rounded-full shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200"
              >
                <Sparkles className="w-5 h-5 text-crayon-sun" /> Enroll Now
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-extrabold text-base px-8 py-4 rounded-full hover:bg-white/15 transition-all duration-200"
              >
                Explore Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Campus welcome chips — active campus highlighted */}
            <div className="flex flex-col sm:flex-row gap-3">
              {Object.entries(CAMPUSES).map(([slug, c]) => {
                const isActive = slug === campus
                return (
                  <div
                    key={slug}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-colors duration-300 ${
                      isActive ? 'bg-white/20 border-white/35' : 'bg-white/10 border-white/15'
                    }`}
                  >
                    <div className={`w-2.5 h-9 ${ACCENT[c.accent].bar} rounded-full shrink-0`} />
                    <div>
                      <p className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                        {c.name} Campus
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-crayon-grass animate-pulse" />}
                      </p>
                      <p className="font-body text-xs text-white/65">{c.tagline}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT: School life photo collage (per campus, playful frames) ── */}
          <div key={`${campus}-collage`} className="animate-fade-in-up relative hidden lg:grid grid-rows-2 gap-4 h-[560px]">

            {/* little sticker doodle on the collage */}
            <div className="absolute -top-6 -left-6 z-20 w-20 h-20 animate-pop-bounce" style={{ '--doodle-rot': '-10deg' }}>
              <svg viewBox="0 0 48 48" width="100%" height="100%" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
                <path d="M24 4 L29.5 18 L44 19 L33 29 L36.5 43 L24 35 L11.5 43 L15 29 L4 19 L18.5 18 Z" fill="#FFC93C" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Top — large photo in a soft white frame */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-white/40">
              <img
                src={hero.collage[0].img}
                alt={hero.collage[0].title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-heading font-extrabold text-base">{hero.collage[0].title}</p>
                <p className="font-body text-xs text-white/75">{hero.collage[0].subtitle}</p>
              </div>
            </div>

            {/* Bottom row — two smaller photos */}
            <div className="grid grid-cols-2 gap-4">
              {hero.collage.slice(1, 3).map((c) => (
                <div key={c.title} className="relative rounded-[1.5rem] overflow-hidden shadow-xl ring-4 ring-white/40">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-heading font-bold text-xs">{c.title}</p>
                    <p className="font-body text-[10px] text-white/70">{c.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Happening-at-school strip ── */}
        <div className="mt-12 border-t border-white/20 pt-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="font-body text-xs font-bold text-white/70 uppercase tracking-widest">Happening at School</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ActivitySlot startIndex={0} intervalMs={4200} delayMs={0}    />
            <ActivitySlot startIndex={2} intervalMs={4200} delayMs={1400} />
            <ActivitySlot startIndex={4} intervalMs={4200} delayMs={2800} />
          </div>
        </div>
      </div>

      {/* Playful divider into the news ticker below (shape differs per campus) */}
      <WaveDivider
        variant={theme.divider}
        color="#153764"
        className="absolute bottom-0 left-0 right-0 z-[3]"
      />
    </section>
  )
}
