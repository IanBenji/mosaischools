import { Link } from 'react-router-dom'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { NUTRITION, DAY_BOARDING, GAMES_SPORTS } from '../lib/schoolLife'
import { feeRange, FEES } from '../lib/fees'
import { NAL } from '../assets/nalugala-campus'
import { bunonoPhotos } from '../assets/bunono'

// Nalugala has no swimming photos yet, so the pool shot is borrowed from Bunono.
const POOL = { img: bunonoPhotos[16], cap: 'Swimming lessons (Bunono pool)', alt: 'MOSAI learners playing and learning to swim in the Bunono Campus pool' }

/* About › life at MOSAI, Nalugala campus: Nutrition, Day and Boarding, Games
 * and Sports. Three deliberately different compositions in the flagship's
 * structured navy design: an editorial photo mosaic, two coordinated cards,
 * and an overlapping photo pair over a grid of benefit cards. */

const SPORTS = ['Swimming', 'Soccer', 'Netball', 'Athletics', 'Basketball', 'Skating', 'Aerobics', 'Gymnastics']

function Photo({ photo, className = '', capClass = '' }) {
  return (
    <figure className={`${className.includes('absolute') ? '' : 'relative'} overflow-hidden rounded-3xl bg-zinc-200 shadow-lg group ${className}`}>
      <img src={photo.img} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <figcaption className={`absolute bottom-3 left-3 right-3 font-heading font-bold text-white text-xs sm:text-sm drop-shadow ${capClass}`}>
        {photo.cap}
      </figcaption>
    </figure>
  )
}

/* ── Nutrition — editorial mosaic ───────────────────────────────────────── */
function Nutrition() {
  return (
    <section id="nutrition" className="py-24 bg-mist scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Mosaic */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Photo photo={NAL.farmSign} className="col-span-2 h-64 sm:h-80" />
              <Photo photo={NAL.gardenLesson} className="h-44 sm:h-56" />
              <Photo photo={NAL.gardenOnion}  className="h-44 sm:h-56" />
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-5">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">{NUTRITION.kicker}</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3 mb-5">{NUTRITION.title}</h2>
            <p className="font-body text-gray-600 text-sm leading-relaxed mb-8">{NUTRITION.intro}</p>

            <ul className="space-y-5">
              {NUTRITION.points.map((pt, i) => {
                const Icon = pt.icon
                return (
                  <li key={pt.title} className="flex items-start gap-4">
                    <span className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${i % 2 ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                      <Icon className={`w-5 h-5 ${i % 2 ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                    </span>
                    <div>
                      <p className="font-heading font-bold text-sm text-mosai-blue-dark">{pt.title}</p>
                      <p className="font-body text-sm text-gray-500 leading-relaxed mt-0.5">{pt.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <p className="mt-8 pl-4 border-l-4 border-mosai-red font-heading font-bold text-mosai-blue-dark text-sm leading-relaxed">
              {NUTRITION.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Day and Boarding — two coordinated cards ──────────────────────────── */
function ArrangementCard({ data, photo, fee, icon, dark, inset }) {
  const Icon = icon
  return (
    <article className={`flex flex-col rounded-3xl overflow-hidden shadow-xl ${dark ? 'bg-mosai-blue-dark text-white' : 'bg-white'}`}>
      <figure className="relative h-60 sm:h-72 bg-zinc-200">
        <img src={photo.img} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 font-heading font-bold text-xs px-3 py-1.5 rounded-full shadow ${dark ? 'bg-mosai-red text-white' : 'bg-mosai-blue text-white'}`}>
          <Icon className="w-3.5 h-3.5" /> {data.tag}
        </span>
        <figcaption className="absolute bottom-3 left-4 font-heading font-bold text-sm text-white drop-shadow">{photo.cap}</figcaption>
        {inset && (
          <img
            src={inset.img}
            alt={inset.alt}
            className="hidden sm:block absolute -bottom-8 right-6 w-28 h-28 object-cover rounded-2xl ring-4 ring-mosai-blue-dark shadow-xl"
            loading="lazy"
            decoding="async"
          />
        )}
      </figure>

      <div className="flex-1 flex flex-col p-7 sm:p-8">
        <h3 className={`font-heading font-extrabold text-2xl mb-3 ${dark ? 'text-white' : 'text-mosai-blue-dark'}`}>{data.title}</h3>
        <p className={`font-body text-sm leading-relaxed mb-6 ${dark ? 'text-blue-100' : 'text-gray-600'}`}>{data.text}</p>
        <ul className="space-y-3 mb-7">
          {data.points.map((pt) => {
            const PIcon = pt.icon
            return (
              <li key={pt.text} className="flex items-start gap-3">
                <span className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-mosai-blue-light'}`}>
                  <PIcon className={`w-4 h-4 ${dark ? 'text-mosai-red-light' : 'text-mosai-blue'}`} />
                </span>
                <span className={`font-body text-sm pt-1.5 ${dark ? 'text-blue-100' : 'text-gray-600'}`}>{pt.text}</span>
              </li>
            )
          })}
        </ul>
        <div className={`mt-auto flex items-center justify-between gap-3 rounded-2xl px-5 py-4 ${dark ? 'bg-white/10' : 'bg-mosai-blue-light'}`}>
          <span className={`font-body text-xs uppercase tracking-wide ${dark ? 'text-blue-200' : 'text-gray-500'}`}>Per term</span>
          <span className={`font-heading font-extrabold text-base sm:text-lg text-right ${dark ? 'text-white' : 'text-mosai-blue-dark'}`}>UGX {fee}</span>
        </div>
      </div>
    </article>
  )
}

function DayBoarding() {
  return (
    <section id="day-and-boarding" className="py-24 bg-mosai-blue-light scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">{DAY_BOARDING.kicker}</span>
          <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3 mb-4">{DAY_BOARDING.title}</h2>
          <p className="font-body text-gray-600 text-sm leading-relaxed">{DAY_BOARDING.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <ArrangementCard data={DAY_BOARDING.day}      photo={NAL.classVeranda} fee={feeRange(FEES.primary.day)}      icon={Sun} />
          <ArrangementCard data={DAY_BOARDING.boarding} photo={NAL.dormGirls}    fee={feeRange(FEES.primary.boarding)} icon={Moon} dark inset={NAL.dormTrunks} />
        </div>

        <p className="text-center font-body text-sm text-gray-500 mt-8">
          Nursery learners attend as day scholars; boarding is for Primary learners only.{' '}
          <Link to="/admissions#fees" className="font-semibold text-mosai-blue hover:text-mosai-blue-dark inline-flex items-center gap-1">
            See the full fee structure <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </section>
  )
}

/* ── Games and Sports — overlapping photos + benefit grid ──────────────── */
function GamesSports() {
  return (
    <section id="games-and-sports" className="py-24 bg-mist-deep scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div>
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">{GAMES_SPORTS.kicker}</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3 mb-5">{GAMES_SPORTS.title}</h2>
            <p className="font-body text-gray-600 text-sm leading-relaxed mb-7">{GAMES_SPORTS.intro}</p>
            <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-3">Our sports programme</p>
            <div className="flex flex-wrap gap-2">
              {SPORTS.map((s, i) => (
                <span key={s} className={`font-body text-xs font-semibold px-3.5 py-1.5 rounded-full ${i % 2 ? 'bg-mosai-red-light text-mosai-red' : 'bg-mosai-blue-light text-mosai-blue'}`}>{s}</span>
              ))}
            </div>
          </div>

          {/* Overlapping pair */}
          <div className="relative pb-16 sm:pb-20 sm:pr-10">
            <Photo photo={NAL.playground} className="h-72 sm:h-96" />
            <Photo
              photo={POOL}
              className="absolute -bottom-2 right-0 w-1/2 sm:w-[46%] h-40 sm:h-52 ring-8 ring-gray-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GAMES_SPORTS.benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${i % 2 ? 'bg-mosai-red' : 'bg-mosai-blue'}`}>
                  <Icon className="w-5 h-5 text-white" />
                </span>
                <h3 className="font-heading font-bold text-base text-mosai-blue-dark mb-1.5">{b.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{b.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function AboutLifeNalugala() {
  return (
    <>
      <Nutrition />
      <DayBoarding />
      <GamesSports />
    </>
  )
}
