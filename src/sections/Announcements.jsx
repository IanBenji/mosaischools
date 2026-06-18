import { Calendar, ArrowRight, Bell, BookOpen, Globe } from 'lucide-react'

const announcements = [
  {
    date: '25 May 2026',
    icon: Calendar,
    category: 'Academic Calendar',
    title: 'Term II 2026 Begins: 25 May 2026',
    preview:
      'We warmly welcome all learners back for Term II, 2026. Please ensure school fees are settled via the School Pay System and uniforms are ready before the first day of term.',
    accent: 'red',
  },
  {
    date: 'Ongoing',
    icon: Bell,
    category: 'Admissions',
    title: 'Admissions Open for the 2026 Intake',
    preview:
      'MOSAI Schools is accepting applications for Baby Class, Middle Class, Top Class, and Primary (P.1 to P.3). Spaces are limited. Visit either campus or contact us to begin the enrollment process.',
    accent: 'blue',
  },
  {
    date: 'All Year',
    icon: Globe,
    category: 'Languages',
    title: 'Four Languages: English, Swahili, French and Chinese',
    preview:
      'MOSAI Schools offers instruction in four languages: English, Swahili, French, and Chinese, giving every learner a multilingual foundation for a globalised future.',
    accent: 'red',
  },
]

export default function Announcements() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-body text-sm font-semibold text-mosai-red uppercase tracking-widest">Stay Informed</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Latest Announcements</h2>
          </div>
          <a href="#" className="font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark inline-flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item, i) => {
            const Icon = item.icon
            const isRed = item.accent === 'red'
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 font-body text-xs font-semibold px-3 py-1 rounded-full ${
                      isRed ? 'bg-mosai-red-light text-mosai-red' : 'bg-mosai-blue-light text-mosai-blue'
                    }`}>
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
                    className={`mt-1 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all ${
                      isRed ? 'text-mosai-red' : 'text-mosai-blue'
                    }`}
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
