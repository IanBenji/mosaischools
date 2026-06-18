// Photos chosen to show WHAT ACTUALLY HAPPENS at MOSAI Schools each day
import imgScience   from '../assets/TON_8794.webp'  // Science experiments = academic curiosity
import imgActive    from '../assets/IMG_8738.webp'  // Animal walks = active nursery learning
import imgBee       from '../assets/IMG_8829.webp'  // Spelling bee = academic events
import imgCelebrate from '../assets/IMG_8647.webp'  // End of term = community celebration
import imgSports    from '../assets/TON_8742.webp'  // Relay races = sports programme
import imgSoccer    from '../assets/IMG_8677.webp'  // Mini soccer = outdoor activities

const moments = [
  {
    image:   imgScience,
    label:   'Science Exploration',
    caption: 'Hands-on science experiments build curiosity and critical thinking from an early age.',
    size:    'tall', // spans 2 rows
  },
  {
    image:   imgActive,
    label:   'Active Learning',
    caption: 'Movement-based nursery games develop coordination, confidence and social skills.',
    size:    'normal',
  },
  {
    image:   imgBee,
    label:   'Academic Events',
    caption: 'Spelling bees, quizzes and reading challenges celebrate each learner\'s achievements.',
    size:    'normal',
  },
  {
    image:   imgCelebrate,
    label:   'School Community',
    caption: 'End of term celebrations bring together learners, teachers and families in joy.',
    size:    'wide', // spans 2 cols
  },
  {
    image:   imgSports,
    label:   'Sports Day',
    caption: 'Relay races, athletics and team games build resilience, teamwork and healthy habits.',
    size:    'normal',
  },
  {
    image:   imgSoccer,
    label:   'Outdoor Activities',
    caption: 'Mini soccer and ball skills develop coordination and a love of physical activity.',
    size:    'normal',
  },
]

export default function SchoolLife() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-body text-sm font-semibold text-mosai-red uppercase tracking-widest">Every Day Matters</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Life at MOSAI Schools</h2>
            <p className="font-body text-gray-500 mt-3 max-w-lg text-sm leading-relaxed">
              From morning assembly to afternoon sports, every moment at MOSAI Schools is an opportunity to learn, grow and belong.
            </p>
          </div>
        </div>

        {/* Photo grid — purposeful placement, each image earns its place */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">

          {/* Science — tall (spans 2 rows) = most important, academic identity */}
          <div className="relative rounded-2xl overflow-hidden group row-span-2 bg-zinc-200">
            <img
              src={imgScience}
              alt="Science experiments at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mosai-blue-dark/85 via-mosai-blue-dark/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-mosai-red-light block mb-1">Science Exploration</span>
              <p className="font-heading font-bold text-base leading-snug">Hands-on science experiments build curiosity and critical thinking from an early age.</p>
            </div>
          </div>

          {/* Active learning */}
          <div className="relative rounded-2xl overflow-hidden group bg-zinc-200">
            <img
              src={imgActive}
              alt="Active learning at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-0.5">Active Learning</span>
              <p className="font-heading font-bold text-sm leading-snug">Movement-based games develop coordination and confidence.</p>
            </div>
          </div>

          {/* Soccer */}
          <div className="relative rounded-2xl overflow-hidden group bg-zinc-200">
            <img
              src={imgSoccer}
              alt="Mini soccer at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-0.5">Outdoor Activities</span>
              <p className="font-heading font-bold text-sm leading-snug">Mini soccer and ball skills build coordination and teamwork.</p>
            </div>
          </div>

          {/* Spelling bee */}
          <div className="relative rounded-2xl overflow-hidden group bg-zinc-200">
            <img
              src={imgBee}
              alt="Spelling bee competition at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-0.5">Academic Events</span>
              <p className="font-heading font-bold text-sm leading-snug">Spelling bees and reading challenges celebrate each learner.</p>
            </div>
          </div>

          {/* Celebrations — wide (spans 2 cols) = community feel */}
          <div className="relative rounded-2xl overflow-hidden group md:col-span-2 bg-zinc-200">
            <img
              src={imgCelebrate}
              alt="End of term celebrations at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-mosai-red-light block mb-1">School Community</span>
              <p className="font-heading font-bold text-lg leading-snug max-w-lg">End of term celebrations bring together learners, teachers and families in joy and gratitude.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
