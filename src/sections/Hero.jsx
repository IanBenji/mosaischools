import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, Trophy, Waves, GraduationCap,
  Flag, Globe, ArrowRight, MapPin, ShieldCheck,
} from 'lucide-react'
import Button from '../components/Button'

// Background images — wide campus/activity shots that work as full-screen backdrops
import imgBg1 from '../assets/TON_8735.webp'   // Nalugala Campus grounds
import imgBg2 from '../assets/TON_8667.webp'   // Outdoor play areas
import imgBg3 from '../assets/IMG_8829.webp'   // School activity

// Content collage photos — purposefully chosen to show what happens at MOSAI
import imgAssembly from '../assets/TON_8713.webp'   // Morning assembly = community
import imgArt      from '../assets/IMG_8563.webp'   // Art & craft = creativity
import imgSwim     from '../assets/IMG_8682.webp'   // Swimming = facilities

const BG_IMAGES = [imgBg1, imgBg2, imgBg3]

// â”€â”€ Activity board â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ACTIVITIES = [
  { icon: CalendarDays, tag: 'Term Dates',   title: 'Term II 2026 Opens',         detail: '25 May 2026, all learners',        accent: '#D32F2F' },
  { icon: Trophy,       tag: 'Achievement',  title: 'Spelling Bee Champions',      detail: 'Top Class celebrates victory!',     accent: '#F59E0B' },
  { icon: Waves,        tag: 'Facilities',   title: 'Swimming Lessons Ongoing',    detail: 'All classes, Nalugala Campus',      accent: '#0EA5E9' },
  { icon: GraduationCap,tag: 'Admissions',   title: 'Enrolment Now Open',          detail: 'Baby Class to P.3, 2026 intake',   accent: '#22C55E' },
  { icon: Flag,         tag: 'Events',       title: 'Sports Day, 7 June 2026',     detail: 'Nalugala Campus, gates at 8:30 AM',accent: '#F97316' },
  { icon: Globe,        tag: 'Languages',    title: '4 Languages of Instruction',  detail: 'English, Swahili, French, Chinese', accent: '#8B5CF6' },
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
  }, [])

  const act  = ACTIVITIES[idx]
  const Icon = act.icon

  return (
    <div className={`${animClass} bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 flex items-center gap-3`}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: act.accent + '22' }}>
        <Icon className="w-4 h-4" style={{ color: act.accent }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">{act.tag}</p>
        <p className="font-heading font-bold text-sm text-white leading-tight truncate">{act.title}</p>
        <p className="font-body text-xs text-white/55 mt-0.5 truncate">{act.detail}</p>
      </div>
      <div className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: act.accent }} />
    </div>
  )
}

export default function Hero() {
  const [bgIdx, setBgIdx] = useState(0)

  // Cycle background image every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => setBgIdx(i => (i + 1) % BG_IMAGES.length), 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mosai-blue-dark">

      {/* Background images — cycle with crossfade */}
      {BG_IMAGES.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          aria-hidden
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === bgIdx ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: 1 }}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}

      {/* Gradient overlay — heavier on the left (text) lighter on the right (photo collage) */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2, background: 'linear-gradient(to right, rgba(21,55,100,0.92) 0%, rgba(21,55,100,0.78) 50%, rgba(21,55,100,0.55) 100%)' }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-20" style={{ zIndex: 3 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[80vh]">

          {/* â”€â”€ LEFT: Welcome content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="flex flex-col justify-center">

            {/* Credential badges */}
            <div className="flex flex-wrap gap-2 mb-7">
              <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-white/70 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-mosai-red-light" />
                Licensed by MoES Uganda
              </span>
              <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-white/70 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                <MapPin className="w-3.5 h-3.5 text-mosai-red-light" />
                Katabi, Wakiso District
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Where Every<br />
              <span className="text-mosai-red">Child Shines.</span>
            </h1>

            {/* Tagline */}
            <p className="font-body text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              We believe in creating a lasting change in every child that goes through our hands. Nurturing critical thinkers and visionary leaders from Baby Class through to Primary.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/admissions">
                <Button variant="primary" className="text-base px-8 py-4 shadow-lg">
                  Enroll Now
                </Button>
              </Link>
              <Link to="/programs">
                <Button variant="outline" className="text-base px-8 py-4">
                  Explore Programs
                </Button>
              </Link>
            </div>

            {/* Campus quick info */}
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                { name: 'Nalugala Campus', detail: 'Garuga Road · Est. 2025', color: 'bg-mosai-blue' },
                { name: 'Bunono Campus',   detail: 'Katabi · Est. 2026',      color: 'bg-mosai-red'  },
              ].map(c => (
                <div key={c.name} className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl px-4 py-3">
                  <div className={`w-2 h-8 ${c.color} rounded-full shrink-0`} />
                  <div>
                    <p className="font-heading font-bold text-sm text-white">{c.name}</p>
                    <p className="font-body text-xs text-white/50">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* â”€â”€ RIGHT: School life photo collage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="hidden lg:grid grid-rows-2 gap-4 h-[580px]">

            {/* Top — large photo: Morning assembly (school community) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={imgAssembly}
                alt="Morning assembly at MOSAI Schools"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-heading font-bold text-sm">Morning Assembly</p>
                <p className="font-body text-xs text-white/60">Building community and values every day</p>
              </div>
            </div>

            {/* Bottom row — two smaller photos */}
            <div className="grid grid-cols-2 gap-4">

              {/* Art and craft = creativity */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={imgArt}
                  alt="Art and craft at MOSAI Schools"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-heading font-bold text-xs">Creative Arts</p>
                  <p className="font-body text-[10px] text-white/60">Imagination unleashed</p>
                </div>
              </div>

              {/* Swimming = facilities */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={imgSwim}
                  alt="Swimming lessons at MOSAI Schools"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-heading font-bold text-xs">Swimming Lessons</p>
                  <p className="font-body text-[10px] text-white/60">On-site pool with instructors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* â”€â”€ Activity board — bottom strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ActivitySlot startIndex={0} intervalMs={4200} delayMs={0}    />
            <ActivitySlot startIndex={2} intervalMs={4200} delayMs={1400} />
            <ActivitySlot startIndex={4} intervalMs={4200} delayMs={2800} />
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-mosai-red rounded-full animate-pulse" />
              <span className="font-body text-xs text-white/40 uppercase tracking-widest">Live Updates</span>
            </div>
            <Link to="/gallery" className="font-body text-xs font-semibold text-white/40 hover:text-white transition-colors flex items-center gap-1">
              View Gallery <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
