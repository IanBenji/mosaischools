import { BadgeCheck, MapPin, BookOpen, Globe, Home } from 'lucide-react'

// Bright "quick facts" row — cheerful bubbles parents can scan at a glance.
export default function StatsBar() {
  const facts = [
    { icon: BadgeCheck, label: 'Licensed by', value: 'Ministry of Education & Sports', color: '#5FBB6E' },
    { icon: MapPin,     label: 'Campuses',    value: 'Nalugala 2025 · Bunono 2026',   color: '#FF8A6B' },
    { icon: BookOpen,   label: 'Programs',    value: 'Baby Class to Primary',          color: '#FFC93C' },
    { icon: Globe,      label: 'Languages',   value: 'English · Swahili · French · Chinese', color: '#6EC6F2' },
    { icon: Home,       label: 'Enrolment',   value: 'Day & Boarding available',       color: '#9B7EDE' },
  ]

  return (
    <section className="bg-cream py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {facts.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.label}
                className="flex flex-col items-center text-center bg-white rounded-3xl px-4 py-6 shadow-sm hover:-translate-y-1 transition-transform duration-200"
              >
                <span className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm" style={{ backgroundColor: f.color }}>
                  <Icon className="w-6 h-6 text-white" />
                </span>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{f.label}</p>
                <p className="font-heading font-bold text-sm text-mosai-blue-dark leading-snug">{f.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
