import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sun, Moon, Star, Apple, ZoomIn } from 'lucide-react'
import { NUTRITION, DAY_BOARDING, GAMES_SPORTS } from '../lib/schoolLife'
import { feeRange, FEES } from '../lib/fees'
import { BUN, bunonoPhotos } from '../assets/bunono'
import { NAL } from '../assets/nalugala-campus'   // garden + dormitory photos Bunono doesn't have yet
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import Lightbox    from '../components/Lightbox'

/* About › life at Mosai, Bunono campus, in the storybook design.
 *
 * Bunono has no photographs of its garden or boarding rooms yet, so per the
 * school's rule these borrow Nalugala's. Neither campus has a photo of meals;
 * swap one in here when the school has it. */

const CREAM = '#FFF8EE'
const INK   = 'text-[#43261A]'
const INK2  = 'text-[#7A5C4A]'
const COLORS = ['#FF8A6B', '#5FBB6E', '#FFC93C', '#6EC6F2', '#9B7EDE', '#FF8A6B']

const SPORTS = ['Swimming', 'Soccer', 'Netball', 'Athletics', 'Skating', 'Basketball']

/* ── Nutrition — bubble cards around an illustrated plate ──────────────── */
function Nutrition() {
  return (
    <section id="nutrition" className="relative bg-cream py-16 scroll-mt-20">
      <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 left-0 right-0" />
      <Doodles names={['leaf', 'star']} count={2} />
      <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">{NUTRITION.kicker}</p>
          <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
            <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>{NUTRITION.title}</span>
          </h2>
          <p className={`font-body mt-5 leading-relaxed ${INK2}`}>{NUTRITION.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-6 items-center">
          {[NUTRITION.points.slice(0, 2), null, NUTRITION.points.slice(2)].map((col, ci) =>
            col === null ? (
              /* garden photo — borrowed from Nalugala's urban farm */
              <figure key="garden" className="mx-auto text-center order-first lg:order-none">
                <div className="w-60 h-60 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-xl ring-8 ring-white bg-zinc-200">
                  <img src={NAL.gardenLesson.img} alt={NAL.gardenLesson.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <figcaption className={`mt-3 inline-flex items-center gap-1.5 bg-white rounded-full px-4 py-1.5 shadow-sm font-heading font-bold text-sm ${INK}`}>
                  <Apple className="w-4 h-4 text-mosai-red" /> Growing our own vegetables
                </figcaption>
              </figure>
            ) : (
              <div key={ci} className="space-y-6">
                {col.map((pt, i) => {
                  const Icon = pt.icon
                  const { title, text } = pt
                  const color = COLORS[ci + i * 2]
                  return (
                    <div key={title} className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-dashed" style={{ borderColor: color, transform: `rotate(${(ci + i) % 2 ? 1 : -1}deg)` }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: color }}>
                          <Icon className="w-6 h-6 text-white" />
                        </span>
                        <h3 className={`font-heading font-extrabold text-lg ${INK}`}>{title}</h3>
                      </div>
                      <p className={`font-body text-sm leading-relaxed ${INK2}`}>{text}</p>
                    </div>
                  )
                })}
              </div>
            ),
          )}
        </div>

        <p className={`mt-10 text-center max-w-2xl mx-auto bg-white rounded-full px-6 py-4 shadow-sm border-2 border-dashed border-crayon-grass font-body text-sm ${INK2}`}>
          {NUTRITION.closing}
        </p>
      </div>
    </section>
  )
}

/* ── Day and Boarding — photo blob vs illustrated night card ───────────── */
function Points({ points, light }) {
  return (
    <ul className="space-y-3">
      {points.map((pt) => {
        const Icon = pt.icon
        return (
          <li key={pt.text} className="flex items-start gap-3">
            <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${light ? 'bg-white/20' : 'bg-crayon-sky'}`}>
              <Icon className="w-4 h-4 text-white" />
            </span>
            <span className={`font-body text-sm pt-1 ${light ? 'text-white/90' : INK2}`}>{pt.text}</span>
          </li>
        )
      })}
    </ul>
  )
}

function DayBoarding() {
  const { day, boarding } = DAY_BOARDING
  return (
    <section id="day-and-boarding" className="relative bg-mist py-16 scroll-mt-20">
      <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
      <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">{DAY_BOARDING.kicker}</p>
          <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
            Day{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>and Boarding</span>
          </h2>
          <p className={`font-body mt-5 leading-relaxed ${INK2}`}>{DAY_BOARDING.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Day — sunny cream card with a real photo */}
          <article className="bg-cream rounded-[2.5rem] p-6 sm:p-8 border-2 border-dashed border-crayon-sun -rotate-[0.6deg]">
            <figure className="relative mb-6">
              <div className="overflow-hidden ring-8 ring-white shadow-lg bg-zinc-200" style={{ borderRadius: '46% 54% 42% 58% / 55% 42% 58% 45%' }}>
                <img src={BUN.crest.img} alt={BUN.crest.alt} className="w-full h-56 sm:h-64 object-cover" loading="lazy" decoding="async" />
              </div>
              <figcaption className={`absolute -bottom-3 left-6 bg-white rounded-full px-4 py-1.5 shadow font-heading font-bold text-sm ${INK}`}>{BUN.crest.cap}</figcaption>
            </figure>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-12 rounded-full bg-crayon-sun flex items-center justify-center shadow-md"><Sun className="w-6 h-6 text-white" /></span>
              <div>
                <h3 className={`font-heading font-extrabold text-2xl ${INK}`}>{day.title}</h3>
                <p className="font-heading font-bold text-sm text-[#C9930A]">{day.tag}</p>
              </div>
            </div>
            <p className={`font-body text-sm leading-relaxed mb-5 ${INK2}`}>{day.text}</p>
            <Points points={day.points} />
            <p className={`mt-6 inline-block bg-white rounded-full px-5 py-2 font-heading font-extrabold text-sm shadow-sm ${INK}`}>
              Day · UGX {feeRange(FEES.primary.day)} per term
            </p>
          </article>

          {/* Boarding — night-sky card, illustrated */}
          <article className="relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8 text-white rotate-[0.6deg]" style={{ background: 'linear-gradient(160deg, #3B2A6B 0%, #7A1414 100%)' }}>
            {[[12, 18], [70, 10], [85, 40], [30, 32], [55, 24]].map(([x, y], i) => (
              <Star key={i} className="absolute text-crayon-sun/70 animate-doodle-float" style={{ left: `${x}%`, top: `${y}%`, width: 14 + (i % 3) * 6, height: 14 + (i % 3) * 6, '--doodle-rot': '0deg', animationDelay: `${i * 0.5}s` }} aria-hidden />
            ))}
            <figure className="relative mb-6">
              <div className="overflow-hidden ring-8 ring-white/15 shadow-lg bg-zinc-800" style={{ borderRadius: '58% 42% 55% 45% / 45% 55% 45% 55%' }}>
                <img src={NAL.dormBunks.img} alt={NAL.dormBunks.alt} className="w-full h-56 sm:h-64 object-cover" loading="lazy" decoding="async" />
              </div>
              <figcaption className="absolute -bottom-3 right-6 bg-white rounded-full px-4 py-1.5 shadow font-heading font-bold text-sm text-[#3B2A6B]">{NAL.dormBunks.cap}</figcaption>
            </figure>
            <div className="relative flex items-center gap-3 mb-3">
              <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"><Moon className="w-6 h-6 text-white" /></span>
              <div>
                <h3 className="font-heading font-extrabold text-2xl">{boarding.title}</h3>
                <p className="font-heading font-bold text-sm text-crayon-sun">{boarding.tag}</p>
              </div>
            </div>
            <p className="relative font-body text-sm leading-relaxed mb-5 text-white/90">{boarding.text}</p>
            <div className="relative"><Points points={boarding.points} light /></div>
            <p className="relative mt-6 inline-block bg-white/15 border border-white/25 rounded-full px-5 py-2 font-heading font-extrabold text-sm">
              Boarding · UGX {feeRange(FEES.primary.boarding)} per term
            </p>
          </article>
        </div>

        <p className={`text-center font-body text-sm mt-10 ${INK2}`}>
          The same fees apply to Nursery and Primary.{' '}
          <Link to="/admissions#fees" className="font-bold text-mosai-red hover:underline inline-flex items-center gap-1">
            See all fees <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </section>
  )
}

/* ── Games and Sports — polaroid strip + colourful benefit cards ───────── */
const GAME_SHOTS = [
  { ...BUN.exercise,   rot: '-3deg' },
  { ...BUN.houses,     rot: '2deg'  },
  { img: bunonoPhotos[16], cap: 'Swimming lessons', alt: 'Mosai Bunono learners playing and learning to swim in the school pool', rot: '-2deg' },
  { ...BUN.stretching, rot: '3deg'  },
]

function GamesSports() {
  const [idx, setIdx] = useState(null)
  return (
    <section id="games-and-sports" className="relative bg-cream py-16 scroll-mt-20">
      <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 left-0 right-0" />
      <Doodles names={['balloon', 'star']} count={2} />
      <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">{GAMES_SPORTS.kicker}</p>
          <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
            Games and{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#6EC6F2' }}>Sports</span>
          </h2>
          <p className={`font-body mt-5 leading-relaxed ${INK2}`}>{GAMES_SPORTS.intro}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 sm:gap-6 mb-14">
          {GAME_SHOTS.map((ph, i) => (
            <figure
              key={ph.cap}
              onClick={() => setIdx(i)}
              className="group cursor-pointer bg-white p-3 pb-4 rounded-lg shadow-xl w-[46%] sm:w-56 hover:-translate-y-2 hover:rotate-0 transition-transform duration-200"
              style={{ transform: `rotate(${ph.rot})` }}
            >
              <div className="relative w-full h-32 sm:h-44 rounded-md overflow-hidden bg-zinc-200">
                <img src={ph.img} alt={ph.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <figcaption className={`font-heading font-bold text-center text-sm sm:text-base mt-3 ${INK}`}>{ph.cap}</figcaption>
            </figure>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GAMES_SPORTS.benefits.map((b, i) => {
            const Icon = b.icon
            const { title, text } = b
            const color = COLORS[i % COLORS.length]
            return (
              <div key={title} className="bg-white rounded-[2rem] p-6 shadow-sm" style={{ boxShadow: `inset 0 -6px 0 ${color}` }}>
                <span className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-md" style={{ backgroundColor: color }}>
                  <Icon className="w-6 h-6 text-white" />
                </span>
                <h3 className={`font-heading font-extrabold text-lg ${INK}`}>{title}</h3>
                <p className={`font-body text-sm leading-relaxed mt-1 ${INK2}`}>{text}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className={`font-heading font-bold text-sm mr-1 ${INK}`}>We play:</span>
          {SPORTS.map((s, i) => (
            <span key={s} className={`font-body text-sm font-semibold px-4 py-1.5 rounded-full bg-white shadow-sm border-2 ${INK}`} style={{ borderColor: COLORS[i % COLORS.length] }}>{s}</span>
          ))}
        </div>
      </div>
      <Lightbox photos={GAME_SHOTS} index={idx} setIndex={setIdx} />
    </section>
  )
}

export default function AboutLifeBunono() {
  return (
    <>
      <Nutrition />
      <DayBoarding />
      <GamesSports />
    </>
  )
}
