import { MapPin, CalendarDays, ArrowRight } from 'lucide-react'
import { CAMPUSES } from '../lib/campus'
import { NAL } from '../assets/nalugala-campus'
import { BUN } from '../assets/bunono'

const directions = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

// Nalugala first, then Bunono, the order the school asked for everywhere.
const campuses = [
  {
    name: 'Nalugala Campus',
    opened: 'Opened January 2025',
    location: 'Garuga Road, off Kampala to Entebbe Road',
    district: 'Katabi, Wakiso District',
    description:
      'Our flagship campus, set along the scenic Garuga Road off the Kampala to Entebbe Highway. Nalugala Campus offers modern classrooms, a swimming pool, boarding facilities for Primary learners, and expansive grounds for outdoor learning and play.',
    tags: ['Day & Primary Boarding', 'Swimming Pool', 'Digital Classrooms', 'Transport Available'],
    accent: 'blue',
    badge: 'Flagship Campus',
    photo: NAL.compound.img,
    photoAlt: 'MOSAI Schools Nalugala Campus: the open school compound',
    map: CAMPUSES.nalugala.mapQuery,
  },
  {
    name: 'Bunono Campus',
    opened: 'Opened 2026',
    location: 'Katabi, Wakiso District',
    district: 'Off Kampala to Entebbe Road',
    description:
      'Our newest campus in Katabi brings the MOSAI Schools experience to more families in the greater Entebbe area. Bunono Campus features the same high standards of care, safety, and academic excellence as our flagship.',
    tags: ['Day & Primary Boarding', 'Modern Facilities', 'Qualified Staff', 'Safe Environment'],
    accent: 'red',
    badge: 'New in 2026',
    photo: BUN.front.img,
    photoAlt: 'MOSAI Schools Bunono Campus: the front entrance',
    map: CAMPUSES.bunono.mapQuery,
  },
]

export default function Campuses() {
  return (
    <section className="py-20 bg-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-heading text-sm font-extrabold text-mosai-red uppercase tracking-widest">Where We Are</span>
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-mosai-blue-dark mt-2">
            Our Two{' '}
            <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>Campuses</span>
          </h2>
          <p className="font-body text-gray-500 mt-3 max-w-xl mx-auto">
            Two campuses along the Kampala to Entebbe corridor, offering families in Wakiso District world class early education close to home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campuses.map((campus) => {
            const isBlue = campus.accent === 'blue'
            return (
              <div
                key={campus.name}
                className="group bg-cream rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Campus photo */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={campus.photo}
                    alt={campus.photoAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 font-heading text-xs font-extrabold text-mosai-blue-dark shadow-sm">
                    {campus.name}
                  </span>
                </div>

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

                  <a
                    href={directions(campus.map)}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${
                      isBlue ? 'text-mosai-blue' : 'text-mosai-red'
                    }`}
                  >
                    Get Directions <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Map note */}
        <p className="text-center font-body text-sm text-gray-400 mt-8">
          Both campuses are located along the <span className="font-semibold text-gray-500">Kampala to Entebbe Road</span> in <span className="font-semibold text-gray-500">Wakiso District, Uganda</span>.
          Licensed by the Ministry of Education and Sports, Uganda.
        </p>
      </div>
    </section>
  )
}
