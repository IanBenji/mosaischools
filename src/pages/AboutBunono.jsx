import { Link } from 'react-router-dom'
import {
  CalendarDays, School, MapPin, UserCog, Users, GraduationCap,
  Heart, Shield, Sparkles, Award, ArrowRight, Sprout,
} from 'lucide-react'
import { useCampus }   from '../context/CampusContext'
import { MOSAI_ETHOS } from '../lib/campus'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import AboutLifeBunono from '../sections/AboutLifeBunono'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader     from '../assets/bunono/bunono-02.webp'  // morning assembly, Bunono
/* Optimised into src/assets/bunono/ rather than read from the originals folder,
 * which .gitignore excludes. Importing from there built fine on any machine that
 * had the originals and failed everywhere else, including on the deploy host.
 * Deliberately not named bunono-NN.webp, so the gallery glob does not pick up a
 * staff portrait. */
import imgHeadmaster from '../assets/bunono/headmaster.webp'
import imgDirector   from '../assets/Director.webp'          // shared Director, same as Nalugala

/* Bunono ABOUT — storybook design, shares no layout with the Nalugala About. */

const CREAM = '#FFF8EE'
const INK   = 'text-[#43261A]'
const INK2  = 'text-[#7A5C4A]'

const VALUE_ICONS  = { 'God fearing': Shield, 'Love': Heart, 'Humility': Sparkles, 'Excellence': Award }
const VALUE_COLORS = ['#FF8A6B', '#5FBB6E', '#FFC93C', '#6EC6F2']

export default function AboutBunono() {
  const { campusInfo } = useCampus()
  const p = campusInfo.profile

  const facts = [
    { icon: CalendarDays,  label: 'Opened',      value: p.opened,      color: '#FF8A6B' },
    { icon: School,        label: 'Classes',     value: p.classes,     color: '#FFC93C' },
    { icon: Users,         label: 'Enrolment',   value: p.enrolment,   color: '#5FBB6E' },
    { icon: UserCog,       label: 'Director',    value: p.director,    color: '#6EC6F2' },
    { icon: GraduationCap, label: 'Headteacher', value: p.headteacher, color: '#9B7EDE' },
    { icon: MapPin,        label: 'Where',       value: `${p.address}, ${p.area}`, color: '#FF8A6B' },
  ].filter(f => f.value)

  return (
    <main className="bg-cream overflow-hidden">
      <PageHeader
        crumb="About"
        title="About"
        accentWord="Bunono"
        subtitle="A warm, brand new nursery and primary school in Bunono Village, Katabi, offering quality, affordable and holistic education in a safe, caring, learner friendly home."
        image={imgHeader}
        nextBg={CREAM}
      />

      {/* Fun facts — colourful bubble cards */}
      <section className="relative py-16">
        <Doodles names={['star', 'balloon']} count={2} />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">Say hello 👋</p>
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
              Meet{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>Bunono Campus</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facts.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={f.label}
                  className="bg-white rounded-[2rem] p-7 shadow-sm border-2 border-dashed hover:-translate-y-1.5 transition-transform duration-200"
                  style={{ borderColor: f.color, transform: `rotate(${i % 2 ? 1 : -1}deg)` }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md" style={{ backgroundColor: f.color }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-body text-[11px] font-bold uppercase tracking-widest text-gray-400">{f.label}</p>
                  <p className={`font-heading font-bold mt-1 leading-snug ${INK}`}>{f.value}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 bg-white rounded-full px-6 py-4 shadow-sm max-w-2xl mx-auto border-2 border-dashed border-crayon-grass">
            <Sprout className="w-6 h-6 text-crayon-grass shrink-0" />
            <p className={`font-body text-sm ${INK2}`}><span className={`font-bold ${INK}`}>Growing together!</span> {p.growth}.</p>
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[38]} cap="Welcome to Bunono" bg="bg-cream" />

      {/* Headteacher welcome — speech bubble */}
      {p.welcome && (
        <section className="relative bg-mist py-16">
          <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
          <div className="relative z-[3] max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 items-start">
              <div className="mx-auto text-center">
                <div className="w-64 sm:w-72 lg:w-80 aspect-[3/4] rounded-[2rem] overflow-hidden bg-mosai-red shadow-lg ring-8 ring-cream mx-auto">
                  <img src={imgHeadmaster} alt={p.headteacher} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <p className={`font-heading font-extrabold mt-4 ${INK}`}>{p.headteacher}</p>
                <p className="font-body text-sm text-mosai-red font-semibold">Headteacher</p>
              </div>
              <div className="relative bg-cream rounded-[2rem] p-8 shadow-sm border-2 border-dashed border-crayon-coral">
                <span className="absolute -left-3 top-10 hidden md:block w-6 h-6 bg-cream border-l-2 border-b-2 border-dashed border-crayon-coral rotate-45" />
                <p className="font-body text-lg font-bold text-mosai-red mb-2">Welcome to the Mosai family! 👋</p>
                <p className={`font-body leading-relaxed ${INK2}`}>{p.welcome}</p>
                {p.staff && <p className={`font-body text-sm leading-relaxed mt-4 pt-4 border-t border-dashed border-crayon-coral ${INK2}`}>{p.staff}</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Director's message — photo card + speech bubble */}
      <section className="relative bg-cream py-16">
        <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['star', 'leaf']} count={2} />
        <div className="relative z-[3] max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">A word from leadership</p>
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
              Director&rsquo;s{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#6EC6F2' }}>Message</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 items-start">
            <div className="mx-auto text-center">
              <div className="w-64 sm:w-72 lg:w-80 aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg ring-8 ring-white bg-mosai-blue-light mx-auto -rotate-1">
                <img src={imgDirector} alt={p.director} className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <p className={`font-heading font-extrabold mt-4 ${INK}`}>{p.director}</p>
              <p className="font-body text-sm text-mosai-blue font-semibold">Director, Mosai Schools</p>
            </div>
            <div className="relative bg-white rounded-[2rem] p-8 shadow-sm border-2 border-dashed border-crayon-sky">
              <span className="absolute -left-3 top-10 hidden md:block w-6 h-6 bg-white border-l-2 border-b-2 border-dashed border-crayon-sky rotate-45" />
              <div className={`space-y-4 font-body leading-relaxed ${INK2}`}>
                <p>
                  It is my honour to welcome you to our school, a learning community committed to excellence, integrity, and holistic education. At Mosai Schools, we believe that every child is unique and capable of achieving greatness when nurtured with care, vision, and purpose.
                </p>
                <p>
                  The message is <span className={`font-bold ${INK}`}>Self agency</span>, the core belief that the capacity for growth, transformation, and self improvement is largely internal. We teach our learners that real change starts by looking inward, and the main mandate of our school is identifying the unique potential of each child and building self confidence and self belief.
                </p>
                <p>
                  All our programs are thoughtfully designed to build scholarly strength, emotional resilience, creativity, and a strong sense of social responsibility. We strive to create an environment where learning is joyful, curiosity is encouraged, and values are deeply rooted.
                </p>
              </div>
              <blockquote className="mt-5 pl-4 border-l-4 border-mosai-red">
                <p className={`font-heading font-bold leading-relaxed ${INK}`}>
                  We believe in nurturing critical thinkers, visionary leaders who are catalysts of change in our communities and globally.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[0]} cap="Morning assembly" bg="bg-mist" />

      {/* Vision & Mission — two big blob cards */}
      <section className="relative bg-cream py-16">
        <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-mosai-red text-white p-10 shadow-lg rotate-1" style={{ borderRadius: '46% 54% 42% 58% / 55% 42% 58% 45%' }}>
              <p className="font-heading font-bold uppercase tracking-widest text-white/70 text-xs mb-3">Our Vision</p>
              <p className="font-heading font-extrabold text-2xl leading-snug">{MOSAI_ETHOS.vision}</p>
            </div>
            <div className="bg-crayon-grass text-white p-10 shadow-lg -rotate-1" style={{ borderRadius: '58% 42% 55% 45% / 45% 55% 45% 55%' }}>
              <p className="font-heading font-bold uppercase tracking-widest text-white/80 text-xs mb-3">Our Mission</p>
              <p className="font-heading font-extrabold text-2xl leading-snug">{MOSAI_ETHOS.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[43]} cap="The school crest" bg="bg-cream" />

      {/* Core values — circles */}
      <section className="relative bg-mist py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl ${INK}`}>
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
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex items-center justify-center shadow-lg ring-4 ring-cream animate-doodle-float"
                    style={{ backgroundColor: color, '--doodle-rot': '0deg', animationDelay: `${i * 0.4}s` }}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <p className={`font-heading font-extrabold text-lg mt-4 ${INK}`}>{v}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Life at Mosai: Nutrition, Day and Boarding, Games and Sports */}
      <AboutLifeBunono />

      {/* CTA */}
      <section className="relative pt-20 pb-16" style={{ background: 'linear-gradient(180deg, #E14B4B 0%, #B71C1C 100%)' }}>
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['star', 'flower']} count={2} />
        <div className="relative z-[3] max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-extrabold text-4xl text-white mb-4">Come Grow With Us</h2>
          <p className="font-body text-white/90 mb-7">Applications for 2026 are open at Bunono Campus. We'd love to meet your family.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/admissions" className="inline-flex items-center gap-2 bg-cream text-mosai-red-dark font-heading font-extrabold px-8 py-4 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              Enroll Your Child <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/80 text-white font-heading font-extrabold px-8 py-4 rounded-full hover:bg-white/15 transition-all">
              Visit Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
