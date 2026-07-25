import { Calendar, ArrowRight, Bell, Globe } from 'lucide-react'

const announcements = [
  {
    date: '25 May 2026',
    icon: Calendar,
    category: 'Academic Calendar',
    title: 'Term II 2026 Begins: 25 May 2026',
    preview:
      'We warmly welcome all learners back for Term II, 2026. Please ensure school fees are settled via the School Pay System and uniforms are ready before the first day of term.',
    color: '#FF8A6B',
  },
  {
    date: 'Ongoing',
    icon: Bell,
    category: 'Admissions',
    title: 'Admissions Open for the 2026 Intake',
    preview:
      'MOSAI Schools is accepting applications for Baby Class, Middle Class, Top Class, and Primary (P.1 to P.3). Spaces are limited. Visit either campus or contact us to begin the enrollment process.',
    color: '#6EC6F2',
  },
  {
    date: 'All Year',
    icon: Globe,
    category: 'Languages',
    title: 'Four Languages: English, Swahili, French and Chinese',
    preview:
      'MOSAI Schools offers instruction in four languages: English, Swahili, French, and Chinese, giving every learner a multilingual foundation for a globalised future.',
    color: '#5FBB6E',
  },
]

export default function Announcements() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-heading text-sm font-extrabold text-mosai-red uppercase tracking-widest">Stay Informed</span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-mosai-blue-dark mt-2">
              Latest{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>News</span>
            </h2>
          </div>
          <a href="#" className="font-heading text-sm font-bold text-mosai-blue hover:text-mosai-blue-dark inline-flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: item.color }} />
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 font-heading text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: item.color }}>
                      <Icon className="w-3.5 h-3.5" />
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-body text-xs">{item.date}</span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-base text-mosai-blue-dark leading-snug">{item.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{item.preview}</p>
                  <a
                    href="#"
                    className="mt-1 text-sm font-bold font-heading inline-flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: item.color }}
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
