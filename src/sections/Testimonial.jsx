import { useState } from 'react'
import { Quote } from 'lucide-react'

const parentTestimonials = [
  {
    quote:
      'Enrolling our daughter at MOSAI Schools was the best decision we made. She went from being shy and reserved to a confident, curious little girl who cannot wait to go to school every morning. The teachers are incredibly attentive and the environment feels genuinely like a second home.',
    name: 'Nankunda Sarah',
    role: 'Parent, Top Class',
    initials: 'NS',
  },
  {
    quote:
      'The care and attention our son receives at MOSAI Schools is exceptional. He has grown so much in confidence and social skills. The teachers know every child by name and truly invest in their development. We could not have chosen a better school.',
    name: 'Ssemakula David',
    role: 'Parent, Middle Class',
    initials: 'SD',
  },
  {
    quote:
      'What sets MOSAI apart is how they treat every learner as an individual. My twins have very different personalities and yet both are thriving. The school has a beautiful way of drawing out the best in each child.',
    name: 'Akello Grace',
    role: 'Parent, Baby Class',
    initials: 'AG',
  },
]

export default function Testimonial() {
  const [active, setActive] = useState(0)
  const t = parentTestimonials[active]

  return (
    <section className="bg-mosai-blue-light py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Director statement */}
        <div className="bg-mosai-blue rounded-2xl p-8 sm:p-12 mb-14 relative overflow-hidden">
          <div className="absolute top-4 right-6 opacity-10">
            <Quote className="w-28 h-28 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <p className="font-heading font-bold text-white text-lg sm:text-xl leading-relaxed mb-6">
              "At MOSAI Schools, we believe that every child is unique and capable of achieving greatness when nurtured with care, vision, and purpose. Our core message is <span className="text-mosai-red-light">Self agency</span>, the belief that the capacity for growth and transformation is largely internal."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-mosai-red flex items-center justify-center">
                <span className="font-heading font-bold text-white text-sm">D</span>
              </div>
              <div>
                <p className="font-heading font-bold text-white">Director, MOSAI Schools</p>
                <p className="font-body text-xs text-blue-200">Garuga Road, Katabi, Wakiso District</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parent testimonials */}
        <div className="text-center mb-10">
          <span className="font-heading text-sm font-extrabold text-mosai-red uppercase tracking-widest">Parent Voices</span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-mosai-blue-dark mt-2">
            What{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>Parents Say</span>
          </h2>
        </div>

        <div className="relative bg-white rounded-3xl shadow-lg px-8 sm:px-14 py-12">
          {/* Quotation mark */}
          <span className="absolute top-6 left-8 font-heading font-black text-8xl leading-none text-mosai-red/20 select-none" aria-hidden="true">
            &ldquo;
          </span>
          <span className="absolute bottom-2 right-8 font-heading font-black text-8xl leading-none text-mosai-red/20 select-none" aria-hidden="true">
            &rdquo;
          </span>

          <blockquote className="relative z-10" key={active}>
            <p className="font-body text-lg sm:text-xl text-gray-700 leading-relaxed italic">
              {t.quote}
            </p>
            <footer className="mt-8">
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-full flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                  {t.initials}
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-mosai-blue-dark">{t.name}</p>
                  <p className="font-body text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              {/* Stars */}
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Selector */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 sm:gap-3">
          {parentTestimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold font-body transition-all duration-200 ${
                i === active
                  ? 'bg-mosai-blue-dark text-white shadow-md'
                  : 'bg-white text-gray-500 hover:text-mosai-blue border border-gray-200'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i === active ? 'bg-mosai-red text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {item.initials[0]}
              </div>
              {item.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
