import { CheckCircle } from 'lucide-react'

// Each photo directly illustrates the pillar it supports
import imgClassroom from '../assets/IMG_8674.webp' // Digital boards = quality learning
import imgOutdoor   from '../assets/TON_8779.webp' // Obstacle course = active, safe environment
import imgSports    from '../assets/TON_8742.webp' // Relay races = beyond the classroom

const pillars = [
  {
    image:    imgClassroom,
    imageAlt: 'Modern classroom with digital boards at MOSAI Schools',
    title:    'Excellence in Learning',
    intro:    'A rich blended curriculum taught by qualified teachers in modern, well-equipped learning spaces.',
    points: [
      'Qualified and continuously trained class teachers',
      'Digital interactive boards and computer labs',
      'Blended NCDC, Cambridge, IB and British/IPC curriculum',
      'Instruction in four languages: English, Swahili, French, Chinese',
    ],
    accent: 'blue',
  },
  {
    image:    imgOutdoor,
    imageAlt: 'Children on outdoor obstacle course at MOSAI Schools',
    title:    'Safe and Nurturing',
    intro:    'Every child deserves to feel completely safe. MOSAI Schools is built around security, care and pastoral support.',
    points: [
      '24/7 security guards and CCTV cameras on campus',
      'Comfortable boarding with supervised pastoral care',
      'Nutritious, freshly prepared meals every school day',
      'School transport covering the Entebbe corridor',
    ],
    accent: 'red',
  },
  {
    image:    imgSports,
    imageAlt: 'Learners competing in relay races at MOSAI Schools',
    title:    'Beyond the Classroom',
    intro:    'Education at MOSAI goes further than textbooks — we nurture the whole child through sport, creativity and life skills.',
    points: [
      'On-site swimming pool with trained instructors',
      'Sports programme: soccer, netball, athletics, basketball',
      'Creative arts, music, drama and craft activities',
      'Practical skills: cooking, baking and urban farming',
    ],
    accent: 'blue',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-body text-sm font-semibold text-mosai-red uppercase tracking-widest">Our Difference</span>
          <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Why MOSAI Schools?</h2>
          <p className="font-body text-gray-500 mt-3 max-w-xl mx-auto">
            Three commitments that define everything we do — for every child, every day, across both campuses.
          </p>
        </div>

        {/* Three pillars — alternating image + text layout */}
        <div className="space-y-16">
          {pillars.map((p, i) => {
            const isBlue   = p.accent === 'blue'
            const imageLeft = i % 2 === 0

            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${!imageLeft ? 'lg:[direction:rtl]' : ''}`}
              >
                {/* Photo */}
                <div className={imageLeft ? '' : 'lg:[direction:ltr]'}>
                  <div className="relative rounded-3xl overflow-hidden shadow-lg bg-zinc-200" style={{ height: 360 }}>
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={imageLeft ? '' : 'lg:[direction:ltr]'}>
                  <span className={`font-body text-xs font-bold uppercase tracking-widest ${isBlue ? 'text-mosai-blue' : 'text-mosai-red'}`}>
                    Pillar {i + 1}
                  </span>
                  <h3 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mt-2 mb-4">{p.title}</h3>
                  <p className="font-body text-gray-500 leading-relaxed mb-7">{p.intro}</p>

                  <ul className="space-y-3">
                    {p.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${isBlue ? 'text-mosai-blue' : 'text-mosai-red'}`} />
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
