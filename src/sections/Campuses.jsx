import { MapPin, CalendarDays, ArrowRight } from 'lucide-react'

const campuses = [
  {
    name: 'Nalugala Campus',
    opened: 'Opened January 2025',
    location: 'Garuga Road, off Kampala-Entebbe Road',
    district: 'Katabi, Wakiso District',
    description:
      'Our flagship campus, set along the scenic Garuga Road off the Kampala-Entebbe Highway. Nalugala Campus offers modern classrooms, a swimming pool, boarding facilities, and expansive grounds for outdoor learning and play.',
    tags: ['Day & Boarding', 'Swimming Pool', 'Digital Classrooms', 'Transport Available'],
    accent: 'blue',
    badge: 'Flagship Campus',
  },
  {
    name: 'Bunono Campus',
    opened: 'Opened 2026',
    location: 'Katabi, Wakiso District',
    district: 'Off Kampala-Entebbe Road',
    description:
      'Our newest campus in Katabi brings the MOSAI Schools experience to more families in the greater Entebbe area. Bunono Campus features the same high standards of care, safety, and academic excellence as our flagship.',
    tags: ['Day & Boarding', 'Modern Facilities', 'Qualified Staff', 'Safe Environment'],
    accent: 'red',
    badge: 'New in 2026',
  },
]

export default function Campuses() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-body text-sm font-semibold text-mosai-red uppercase tracking-widest">Where We Are</span>
          <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Our Campuses</h2>
          <p className="font-body text-gray-500 mt-3 max-w-xl mx-auto">
            Two campuses along the Kampala-Entebbe corridor, offering families in Wakiso District world-class early education close to home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campuses.map((campus, i) => {
            const isBlue = campus.accent === 'blue'
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  {/* Badge + Name */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className={`font-body text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        isBlue ? 'bg-mosai-blue-light text-mosai-blue' : 'bg-mosai-red-light text-mosai-red'
                      }`}>
                        {campus.badge}
                      </span>
                      <h3 className="font-heading font-extrabold text-2xl text-mosai-blue-dark mt-3">{campus.name}</h3>
                    </div>
                    <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${
                      isBlue ? 'bg-mosai-blue-light' : 'bg-mosai-red-light'
                    }`}>
                      <MapPin className={`w-7 h-7 ${isBlue ? 'text-mosai-blue' : 'text-mosai-red'}`} />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-1 text-gray-500">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="font-body text-sm">{campus.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1 text-gray-400 pl-6">
                    <span className="font-body text-sm">{campus.district}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-5 text-gray-400">
                    <CalendarDays className="w-4 h-4 shrink-0" />
                    <span className="font-body text-sm font-semibold">{campus.opened}</span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-gray-500 leading-relaxed mb-6">{campus.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {campus.tags.map((tag) => (
                      <span key={tag} className="font-body text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className={`inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${
                    isBlue ? 'text-mosai-blue' : 'text-mosai-red'
                  }`}>
                    Get Directions <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Map note */}
        <p className="text-center font-body text-sm text-gray-400 mt-8">
          Both campuses are located along the <span className="font-semibold text-gray-500">Kampala-Entebbe Road</span> in <span className="font-semibold text-gray-500">Wakiso District, Uganda</span>.
          Licensed by the Ministry of Education and Sports, Uganda.
        </p>
      </div>
    </section>
  )
}
