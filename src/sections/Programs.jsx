import { ArrowRight, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { feeRange } from '../lib/fees'

// Real classroom photos — each matches the actual class level
import imgBaby    from '../assets/TON_8855.webp'  // Baby Class circle time
import imgMiddle  from '../assets/IMG_8791.webp'  // Middle Class phonics
import imgTop     from '../assets/IMG_8754.webp'  // Top Class mathematics
import imgPrimary from '../assets/IMG_8818.webp'  // Primary computer class

const programs = [
  {
    image:       imgBaby,
    imageAlt:    'Baby Class learners at morning circle time',
    name:        'Baby Class',
    ages:        'Ages 3 to 4',
    description: 'A gentle, nurturing introduction to school life through play, music and sensory exploration. Children develop social skills, emotional awareness and early language in a warm, loving environment.',
    feeBase:     450000,
    color:       '#FF8A6B',
  },
  {
    image:       imgMiddle,
    imageAlt:    'Middle Class learners during phonics lesson',
    name:        'Middle Class',
    ages:        'Ages 4 to 5',
    description: 'Building early literacy, numeracy and social skills through structured play and creative activities. Learners grow in confidence as they explore science, arts and language.',
    feeBase:     450000,
    color:       '#FFC93C',
  },
  {
    image:       imgTop,
    imageAlt:    'Top Class learners during mathematics session',
    name:        'Top Class',
    ages:        'Ages 5 to 6',
    description: 'Preparing children fully for Primary 1 with focused reading, writing, mathematics and critical thinking. Every learner transitions to primary school ready and confident.',
    feeBase:     450000,
    color:       '#6EC6F2',
  },
  {
    image:       imgPrimary,
    imageAlt:    'Primary section learners during computer class',
    name:        'Primary Section',
    ages:        'P.1, P.2 and P.3',
    description: 'A rigorous yet joyful primary education blending Uganda\'s NCDC curriculum with Cambridge, IB and British/IPC frameworks. Adding one class per year through to P.7.',
    feeBase:     500000,
    color:       '#5FBB6E',
  },
]

const languages = ['English', 'Swahili', 'French', 'Chinese']

export default function Programs() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-heading text-sm font-extrabold text-mosai-red uppercase tracking-widest">What We Offer</span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-mosai-blue-dark mt-2">
            Our{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>Programs</span>
          </h2>
          <p className="font-body text-gray-500 mt-4 max-w-xl mx-auto">
            Age-appropriate programs that nurture every stage of early childhood and primary development, taught in four languages.
          </p>
        </div>

        {/* Program cards with real classroom photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, i) => (
            <div
              key={i}
              className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Real classroom photo */}
              <div className="relative h-44 overflow-hidden bg-zinc-200">
                <img
                  src={prog.image}
                  alt={prog.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {/* Age pill over photo */}
                <span className="absolute top-3 right-3 font-heading text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-sm" style={{ backgroundColor: prog.color }}>
                  {prog.ages}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-extrabold text-lg text-mosai-blue-dark mb-2">{prog.name}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed mb-4 flex-1">{prog.description}</p>

                {/* Fee */}
                <div className="mb-4 py-2.5 px-3 rounded-2xl" style={{ backgroundColor: prog.color + '1F' }}>
                  <span className="font-body text-xs text-gray-500">Day Scholar · per term</span>
                  <p className="font-heading font-bold text-sm text-mosai-blue-dark">UGX {feeRange(prog.feeBase)}</p>
                </div>

                <Link
                  to="/programs"
                  className="inline-flex items-center gap-1.5 text-sm font-bold font-heading group-hover:gap-2.5 transition-all"
                  style={{ color: prog.color }}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Languages + curriculum note */}
        <div className="mt-10 bg-mosai-blue-dark rounded-3xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-crayon-sky/30 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-crayon-sky" />
            </span>
            <div>
              <p className="font-heading font-bold text-sm text-white">Languages of Instruction</p>
              <p className="font-body text-xs text-blue-300 mt-0.5">NCDC Uganda · Cambridge · IB · British/IPC curriculum blend</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map(lang => (
              <span key={lang} className="font-heading font-bold text-xs px-4 py-1.5 bg-white/10 text-white rounded-full border border-white/15">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
