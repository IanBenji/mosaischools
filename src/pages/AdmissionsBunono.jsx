import { Link } from 'react-router-dom'
import {
  FileText, ClipboardCheck, CalendarHeart, Mail, PartyPopper,
  Home as HomeIcon, GraduationCap, CreditCard, ArrowRight, Sparkles,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import { AppForm } from './Admissions'
import { feeRange, FEES } from '../lib/fees'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader from '../assets/bunono/bunono-44.webp'  // Bunono campus building + crest

/* Bunono ADMISSIONS — storybook design, reuses the shared AppForm. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'

const STEPS = [
  { icon: FileText,       title: 'Apply Online',     color: '#FF8A6B' },
  { icon: ClipboardCheck, title: 'Submit Documents', color: '#FFC93C' },
  { icon: CalendarHeart,  title: 'Assessment Day',   color: '#5FBB6E' },
  { icon: Mail,           title: 'Offer Letter',     color: '#6EC6F2' },
  { icon: PartyPopper,    title: 'Pay & Enroll',     color: '#9B7EDE' },
]

export default function AdmissionsBunono() {
  const { campusInfo } = useCampus()
  const p = campusInfo.profile

  const fees = [
    { name: 'Nursery Section', sub: 'Baby, Middle & Top Class', day: FEES.nursery.day, board: FEES.nursery.boarding, color: '#FF8A6B' },
    { name: 'Primary Section', sub: p.primaryRange,             day: FEES.primary.day, board: FEES.primary.boarding, color: '#6EC6F2' },
  ]

  return (
    <main className="bg-cream overflow-hidden">
      <PageHeader
        crumb="Admissions"
        kicker="Now enrolling · 2026"
        title="Join the"
        accentWord="Mosai Family"
        subtitle="Spaces at our brand new Bunono Campus are limited. Secure your child's place in a school where every learner is known, loved and inspired."
        image={imgHeader}
        nextBg={CREAM}
      />

      {/* Steps — colourful bubbles */}
      <section className="relative py-16">
        <Doodles names={['star', 'balloon']} count={2} />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl ${INK}`}>
              How to{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>Apply</span>
            </h2>
            <p className={`font-body mt-3 ${INK2}`}>Five simple, friendly steps.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="text-center">
                  <div className="relative w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg ring-4 ring-cream" style={{ backgroundColor: s.color }}>
                    <Icon className="w-9 h-9 text-white" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-mosai-red-dark font-heading font-extrabold text-sm flex items-center justify-center shadow">{i + 1}</span>
                  </div>
                  <p className={`font-heading font-bold text-sm mt-3 ${INK}`}>{s.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[8]} cap="Poolside fun" bg="bg-cream" />

      {/* Fees — playful cards */}
      <section id="fees" className="relative bg-mist py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl ${INK}`}>
              Term{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>Fees</span>
            </h2>
            <p className={`font-body mt-3 ${INK2}`}>All amounts in Uganda Shillings (UGX), per term. Paid via School Pay only.</p>
          </div>

          <div className="flex items-center justify-center gap-3 bg-cream rounded-full px-6 py-3 max-w-md mx-auto mb-8 border-2 border-dashed border-crayon-sun">
            <GraduationCap className="w-5 h-5 text-mosai-red shrink-0" />
            <p className={`font-body text-sm ${INK2}`}><span className={`font-bold ${INK}`}>One time admission fee:</span> UGX 30,000</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fees.map((f) => (
              <div key={f.name} className="bg-cream rounded-[2rem] overflow-hidden shadow-sm border-2 border-dashed" style={{ borderColor: f.color }}>
                <div className="px-7 py-5 text-white" style={{ backgroundColor: f.color }}>
                  <h3 className="font-heading font-extrabold text-xl">{f.name}</h3>
                  <p className="font-body text-sm text-white/90">{f.sub}</p>
                </div>
                <div className="px-5 sm:px-7 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center">
                    <HomeIcon className="w-5 h-5 mx-auto mb-1" style={{ color: f.color }} />
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wide">Day Scholar</p>
                    <p className={`font-heading font-extrabold text-base sm:text-lg whitespace-nowrap ${INK}`}>{feeRange(f.day)}</p>
                  </div>
                  <div className="text-center border-t sm:border-t-0 sm:border-l border-dashed pt-4 sm:pt-0" style={{ borderColor: f.color }}>
                    <GraduationCap className="w-5 h-5 mx-auto mb-1" style={{ color: f.color }} />
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wide">Boarding</p>
                    <p className={`font-heading font-extrabold text-base sm:text-lg whitespace-nowrap ${INK}`}>{feeRange(f.board)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
            <CreditCard className="w-4 h-4" />
            <p className="font-body text-xs">School Pay System only. No cash accepted at school.</p>
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[12]} cap="Splash time" bg="bg-mist" />

      {/* Application form */}
      <section id="apply" className="relative bg-cream py-16">
        <WaveDivider variant="scallop" color="#F3F6FA" flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-crayon-grass text-white font-heading font-extrabold text-xs uppercase tracking-wide px-4 py-2 rounded-full shadow mb-4">
              <Sparkles className="w-4 h-4" /> Apply online
            </span>
            <h2 className={`font-heading font-extrabold text-4xl ${INK}`}>Application Form</h2>
          </div>
          <div className="bg-white rounded-[2rem] p-7 sm:p-10 shadow-md border-2 border-dashed border-crayon-coral">
            <AppForm />
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[46]} cap="Our playground" bg="bg-cream" />

      {/* CTA */}
      <section className="relative pt-20 pb-16" style={{ background: 'linear-gradient(180deg, #E14B4B 0%, #B71C1C 100%)' }}>
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['flower', 'star']} count={2} />
        <div className="relative z-[3] max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-extrabold text-4xl text-white mb-4">Questions? We're Here to Help</h2>
          <p className="font-body text-white/90 mb-7">Call or WhatsApp our friendly admissions team at Bunono Campus.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-cream text-mosai-red-dark font-heading font-extrabold px-8 py-4 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
