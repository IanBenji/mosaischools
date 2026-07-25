import { Link } from 'react-router-dom'
import {
  Baby, BookOpen, Star, GraduationCap, Clock,
  Dumbbell, Palette, FlaskConical, Utensils, ArrowRight,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import PageHeader  from '../components/PageHeader'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'

import imgHeader from '../assets/IMG_8647.webp'

/* Bunono PROGRAMS — storybook design. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'

const ACTIVITY_GROUPS = [
  { icon: Dumbbell,     title: 'Sports & Play',  color: '#6EC6F2', items: ['Swimming', 'Soccer', 'Netball', 'Athletics', 'Skating', 'Basketball'] },
  { icon: Palette,      title: 'Creative Arts',  color: '#FF8A6B', items: ['Painting', 'Drawing', 'Music', 'Dance', 'Craft'] },
  { icon: FlaskConical, title: 'Bright Minds',   color: '#5FBB6E', items: ['Science', 'Computers', 'Debates', 'Spelling Bees', 'Reading'] },
  { icon: Utensils,     title: 'Life Skills',    color: '#FFC93C', items: ['Baking', 'Cooking', 'Urban Farming'] },
]

export default function ProgramsBunono() {
  const { campusInfo } = useCampus()
  const p = campusInfo.profile

  const classes = [
    { icon: Baby,          name: 'Baby Class',   age: 'Ages 2 – 3', time: '7:30 – 2:00', color: '#FF8A6B', note: 'Gentle first steps into school through play, songs and stories.' },
    { icon: BookOpen,      name: 'Middle Class', age: 'Ages 3 – 4', time: '7:30 – 2:30', color: '#FFC93C', note: 'Curiosity blooms — early phonics, numbers and lots of discovery.' },
    { icon: Star,          name: 'Top Class',    age: 'Ages 5 – 6', time: '7:30 – 3:00', color: '#5FBB6E', note: 'Reading, writing and confidence — fully ready for Primary 1.' },
    { icon: GraduationCap, name: 'Primary',      age: p.primaryRange, time: 'Full day',  color: '#6EC6F2', note: 'A joyful, rigorous primary journey, adding a class every year to P.7.' },
  ]

  return (
    <main className="bg-cream overflow-hidden">
      <PageHeader
        crumb="Programs"
        title="Our"
        accentWord="Programs"
        subtitle={`Age-appropriate learning at Bunono Campus, from ${p.classes} — where every little learner grows at their own happy pace.`}
        image={imgHeader}
        nextBg={CREAM}
      />

      {/* Classes — big bubble cards */}
      <section className="relative py-16">
        <Doodles names={['balloon', 'star']} count={2} />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-heading font-extrabold text-mosai-red uppercase tracking-widest text-sm">Little learners, big dreams</p>
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl mt-2 ${INK}`}>
              Our{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>Classes</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {classes.map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={c.name}
                  className="flex items-start gap-5 bg-white rounded-[2rem] p-7 shadow-sm border-2 border-dashed hover:-translate-y-1 transition-transform duration-200"
                  style={{ borderColor: c.color, transform: `rotate(${i % 2 ? 0.8 : -0.8}deg)` }}
                >
                  <div className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: c.color }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className={`font-heading font-extrabold text-2xl ${INK}`}>{c.name}</h3>
                      <span className="font-heading font-bold text-sm px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: c.color }}>{c.age}</span>
                    </div>
                    <p className="flex items-center gap-1.5 font-body text-xs text-gray-400 mt-1"><Clock className="w-3.5 h-3.5" /> {c.time}</p>
                    <p className={`font-body text-sm mt-2 ${INK2}`}>{c.note}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Activities — playful chip groups */}
      <section className="relative bg-white py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`font-heading font-extrabold text-4xl sm:text-5xl ${INK}`}>
              Beyond the{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#5FBB6E' }}>Classroom</span>
            </h2>
            <p className={`font-body mt-3 ${INK2}`}>Every child plays, creates, explores and grows.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ACTIVITY_GROUPS.map((g) => {
              const Icon = g.icon
              return (
                <div key={g.title} className="bg-cream rounded-[2rem] p-7 border-2 border-dashed" style={{ borderColor: g.color }}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: g.color }}>
                      <Icon className="w-6 h-6 text-white" />
                    </span>
                    <h3 className={`font-heading font-extrabold text-xl ${INK}`}>{g.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="font-body text-sm font-semibold px-4 py-1.5 rounded-full bg-white shadow-sm" style={{ color: g.color }}>{it}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pt-20 pb-16" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #E14B4B 30%, #B71C1C 100%)' }}>
        <WaveDivider variant="scallop" color="#FFFFFF" flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['star', 'flower']} count={2} />
        <div className="relative z-[3] max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading font-extrabold text-4xl text-white mb-4">Find Your Child's Class</h2>
          <p className="font-body text-white/90 mb-7">Not sure where your little one fits? Our team is happy to help.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/admissions" className="inline-flex items-center gap-2 bg-cream text-mosai-red-dark font-heading font-extrabold px-8 py-4 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-white/80 text-white font-heading font-extrabold px-8 py-4 rounded-full hover:bg-white/15 transition-all">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
