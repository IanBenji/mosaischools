import { Check, BookOpen, Shield, Sparkles } from 'lucide-react'

import { NAL } from '../assets/nalugala-campus'

// Each photo directly illustrates the pillar it supports (Nalugala campus).
const pillars = [
  {
    image:    NAL.classMotto.img,
    imageAlt: NAL.classMotto.alt,
    icon:     BookOpen,
    color:    '#6EC6F2',
    title:    'Excellence in Learning',
    intro:    'A rich blended curriculum taught by qualified teachers in modern, well equipped learning spaces.',
    points: [
      'Qualified and continuously trained class teachers',
      'Digital interactive boards and computer labs',
      'Built on the NCDC curriculum, enriched with IB concepts and IPC',
      'Instruction in four languages: English, Swahili, French, Chinese',
    ],
  },
  {
    image:    NAL.gate.img,
    imageAlt: NAL.gate.alt,
    icon:     Shield,
    color:    '#FF8A6B',
    title:    'Safe and Nurturing',
    intro:    'Every child deserves to feel completely safe. MOSAI Schools is built around security, care and pastoral support.',
    points: [
      '24/7 security guards and CCTV cameras on campus',
      'Comfortable Primary boarding with supervised pastoral care',
      'Nutritious, freshly prepared meals every school day',
      'School transport covering the Entebbe corridor',
    ],
  },
  {
    image:    NAL.playground.img,
    imageAlt: NAL.playground.alt,
    icon:     Sparkles,
    color:    '#5FBB6E',
    title:    'Beyond the Classroom',
    intro:    'Education at MOSAI goes further than textbooks, as we nurture the whole child through sport, creativity and life skills.',
    points: [
      'On site swimming pool with trained instructors',
      'Sports programme: soccer, netball, athletics, basketball',
      'Creative arts, music, drama and craft activities',
      'Practical skills: cooking, baking and urban farming',
    ],
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-heading text-sm font-extrabold text-mosai-red uppercase tracking-widest">Our Difference</span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-mosai-blue-dark mt-2">
            Why{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>MOSAI Schools?</span>
          </h2>
          <p className="font-body text-gray-500 mt-4 max-w-xl mx-auto">
            Three big promises we keep for every child, every day, across both campuses.
          </p>
        </div>

        {/* Three pillars — alternating image + text layout */}
        <div className="space-y-16">
          {pillars.map((p, i) => {
            const Icon = p.icon
            const imageLeft = i % 2 === 0

            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!imageLeft ? 'lg:[direction:rtl]' : ''}`}
              >
                {/* Photo — blob frame with a floating icon badge */}
                <div className={`relative ${imageLeft ? '' : 'lg:[direction:ltr]'}`}>
                  <div
                    className="relative overflow-hidden shadow-xl ring-8 ring-cream bg-zinc-200"
                    style={{ height: 360, borderRadius: i % 2 ? '58% 42% 55% 45% / 45% 55% 45% 55%' : '46% 54% 42% 58% / 55% 42% 58% 45%' }}
                  >
                    <img src={p.image} alt={p.imageAlt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="absolute -top-4 left-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg rotate-3" style={{ backgroundColor: p.color }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className={imageLeft ? '' : 'lg:[direction:ltr]'}>
                  <span className="inline-block font-heading text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: p.color + '22', color: p.color }}>
                    Promise {i + 1}
                  </span>
                  <h3 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mt-3 mb-4">{p.title}</h3>
                  <p className="font-body text-gray-500 leading-relaxed mb-7">{p.intro}</p>

                  <ul className="space-y-3">
                    {p.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-5 h-5 mt-0.5 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: p.color }}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="font-body text-sm text-gray-600 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
