import { Link } from 'react-router-dom'
import {
  ArrowRight, MapPin, ShieldCheck, Sparkles,
  GraduationCap, House, Wallet, Phone,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { feeRange, FEES } from '../lib/fees'
import useSlideshow from '../hooks/useSlideshow'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'

/* Nalugala home hero — a full-width slideshow of real school photographs.
 * A navy wash from the left keeps the words readable while the photos stay
 * bright on the right. Underneath, a structured information bar answers the
 * first questions parents ask. (Bunono has its own hero in HomeBunono.jsx.) */

export default function Hero() {
  const { campus, campusInfo } = useCampus()
  const hero  = campusInfo.hero
  const theme = campusInfo.theme
  const p     = campusInfo.profile
  const slides = hero.slides
  const [index, go] = useSlideshow(slides.length, 6000)
  const current = slides[index]

  const facts = [
    { icon: GraduationCap, label: 'Classes',           value: p.classesShort },
    { icon: House,         label: 'Day and boarding',  value: 'Nursery and Primary' },
    { icon: Wallet,        label: 'Fees per term',     value: `From UGX ${feeRange(FEES.nursery.day).split(' to ')[0]}`, to: '/admissions#fees' },
    { icon: Phone,         label: 'Call the Head Mistress', value: campusInfo.phone, href: `tel:${campusInfo.phone}` },
  ]

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-mosai-blue-dark">
      {/* Slides: cross-fade, the visible one drifts slowly (Ken Burns) */}
      {slides.map((s, i) => (
        <img
          key={`${campus}-${i}`}
          src={s.img}
          alt={i === index ? s.alt : ''}
          aria-hidden={i !== index}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out ${i === index ? 'opacity-100 slide-kenburns' : 'opacity-0'}`}
          style={{ objectPosition: s.pos }}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : undefined}
          decoding="async"
        />
      ))}

      {/* Navy wash: strong behind the words, clear over the photo */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,55,100,0.94)_0%,rgba(21,55,100,0.78)_38%,rgba(21,55,100,0.25)_72%,rgba(21,55,100,0.10)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(21,55,100,0.55)_0%,rgba(21,55,100,0.75)_45%,rgba(21,55,100,0.95)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-mosai-blue-dark/70 to-transparent" />

      {/* Doodles only where there is room; on phones they land on the text */}
      <div className="hidden md:block"><Doodles names={theme.doodles} count={2} /></div>

      {/* Words */}
      <div className="relative z-[3] flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10">
        <div key={campus} className="animate-fade-in-up max-w-2xl">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="flex items-center gap-1.5 font-body text-xs font-bold text-white bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Licensed by MoES Uganda
            </span>
            <span className="flex items-center gap-1.5 font-body text-xs font-bold text-white bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5">
              <MapPin className="w-3.5 h-3.5" /> {campusInfo.name} Campus, {campusInfo.district}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
            {hero.headline}<br />
            <span className="crayon-underline" style={{ '--crayon-color': theme.crayon }}>{hero.accentWord}</span>
          </h1>

          <p className="font-body text-lg text-white/90 leading-relaxed mb-8 max-w-xl">{hero.tagline}</p>

          <div className="flex flex-wrap gap-4">
            <Link to="/admissions" className="inline-flex items-center gap-2 bg-white text-mosai-blue-dark font-heading font-extrabold text-base px-8 py-4 rounded-full shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200">
              <Sparkles className="w-5 h-5 text-crayon-sun" /> Enroll Now
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-heading font-extrabold text-base px-8 py-4 rounded-full hover:bg-white/15 transition-all duration-200">
              Book a Visit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide caption + controls */}
      <div className="relative z-[3] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 flex items-center justify-between gap-4">
        <p key={index} className="animate-fade-in-up font-heading font-bold text-sm text-white/90 flex items-center gap-2">
          <span className="w-6 h-0.5 bg-crayon-sun rounded-full" aria-hidden /> {current.cap}
        </p>
        <div className="flex items-center gap-2" role="group" aria-label="Choose a photo">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}: ${s.cap}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/75'}`}
            />
          ))}
        </div>
      </div>

      {/* Information bar */}
      <div className="relative z-[3] w-full bg-mosai-blue-dark/80 backdrop-blur-sm border-t border-white/15 pb-10 sm:pb-12">
        <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => {
            const Icon = f.icon
            const inner = (
              <>
                <span className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-crayon-sun" />
                </span>
                <span className="min-w-0">
                  <span className="block font-body text-[11px] text-blue-200">{f.label}</span>
                  <span className="block font-heading font-extrabold text-white text-sm sm:text-base leading-snug">{f.value}</span>
                </span>
              </>
            )
            const cls = `flex items-center gap-3 py-4 sm:px-4 h-full ${i % 2 ? 'pl-3 border-l border-white/10' : ''} ${i === 2 ? 'lg:pl-4 lg:border-l lg:border-white/10' : ''} ${i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''}`
            return (
              <li key={f.label}>
                {f.href ? <a href={f.href} className={`${cls} hover:bg-white/5 transition-colors`}>{inner}</a>
                  : f.to ? <Link to={f.to} className={`${cls} hover:bg-white/5 transition-colors`}>{inner}</Link>
                  : <div className={cls}>{inner}</div>}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Divider into the news ticker below */}
      <WaveDivider variant={theme.divider} color="#153764" className="absolute bottom-0 left-0 right-0 z-[4]" />
    </section>
  )
}
