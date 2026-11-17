import { ArrowRight, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCampus } from '../context/CampusContext'
import { feeRange, FEES } from '../lib/fees'
import { NAL } from '../assets/nalugala-campus'

// Nalugala photos. The nursery cards use photographs from school celebrations,
// so their alt text describes the celebration rather than a lesson.
// There is no photo of the Toddler Class yet, so it takes the picture of the
// youngest learners, and Baby Class takes the graduation photo.
import imgToddler from '../assets/TON_8742.webp' // little ones on stage, dressed up
import imgBaby   from '../assets/IMG_8738.webp'  // little ones dancing
import imgMiddle from '../assets/IMG_8754.webp'  // nursery cultural dance
import imgTop    from '../assets/TON_8855.webp'  // Top Class graduation (sashes read Top Class)

const languages = ['English', 'Swahili', 'French', 'Chinese']

export default function Programs() {
  const { campusInfo } = useCampus()
  const p = campusInfo.profile

  const programs = [
    {
      image:       imgToddler,
      imageAlt:    'Young MOSAI nursery learners dressed up on stage at a school celebration',
      name:        'Toddler Class (Day Care)',
      ages:        'Ages 1 to 2',
      description: 'Loving day care for our very youngest, with a calm routine of play, songs, naps and meals. Small groups and attentive carers help toddlers settle, talk and grow in confidence.',
      dayFee:      FEES.toddler.day,
      boardFee:    FEES.toddler.boarding,
      color:       '#9B7EDE',
    },
    {
      image:       imgBaby,
      imageAlt:    'Young MOSAI nursery learners dancing together at a school celebration',
      name:        'Baby Class',
      ages:        'Ages 2 to 3',
      description: 'A gentle, nurturing introduction to school life through play, music and sensory exploration. Children develop social skills, emotional awareness and early language in a warm, loving environment.',
      dayFee:      FEES.nursery.day,
      boardFee:    FEES.nursery.boarding,
      color:       '#FF8A6B',
    },
    {
      image:       imgMiddle,
      imageAlt:    'MOSAI nursery learners in traditional dress performing a cultural dance',
      name:        'Middle Class',
      ages:        'Ages 3 to 4',
      description: 'Building early literacy, numeracy and social skills through structured play and creative activities. Learners grow in confidence as they explore science, arts and language.',
      dayFee:      FEES.nursery.day,
      boardFee:    FEES.nursery.boarding,
      color:       '#FFC93C',
    },
    {
      image:       imgTop,
      imageAlt:    'MOSAI Top Class graduates in caps and gowns celebrating on graduation day',
      name:        'Top Class',
      ages:        'Ages 5 to 6',
      description: 'Preparing children fully for Primary 1 with focused reading, writing, mathematics and critical thinking. Every learner transitions to primary school ready and confident.',
      dayFee:      FEES.nursery.day,
      boardFee:    FEES.nursery.boarding,
      color:       '#6EC6F2',
    },
    {
      image:       NAL.classVeranda.img,
      imageAlt:    NAL.classVeranda.alt,
      name:        'Primary Section',
      ages:        p.primaryRange,
      description: 'A rigorous yet joyful primary education built on Uganda\'s NCDC curriculum, with Primary Four as the bridge into learning by subject. Adding one class per year through to P.7.',
      dayFee:      FEES.primary.day,
      boardFee:    FEES.primary.boarding,
      color:       '#5FBB6E',
    },
  ]

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
            Age appropriate programs that nurture every stage of early childhood and primary development, taught in four languages.
          </p>
        </div>

        {/* Program cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.name}
              className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
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
                <div className="mb-4 py-2.5 px-3 rounded-2xl space-y-1.5" style={{ backgroundColor: prog.color + '1F' }}>
                  <p className="font-body text-[11px] text-gray-500 uppercase tracking-wide">Per term · UGX</p>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-body text-xs text-gray-500">Day</span>
                    <span className="font-heading font-bold text-sm text-mosai-blue-dark whitespace-nowrap">{feeRange(prog.dayFee)}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-body text-xs text-gray-500">Boarding</span>
                    <span className="font-heading font-bold text-sm text-mosai-blue-dark whitespace-nowrap">{prog.boardFee ? feeRange(prog.boardFee) : 'Day only'}</span>
                  </div>
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
              <p className="font-body text-xs text-blue-300 mt-0.5">Built on the NCDC Uganda curriculum, enriched with inquiry based learning</p>
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
