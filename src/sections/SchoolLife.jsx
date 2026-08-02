// Photos chosen to show WHAT ACTUALLY HAPPENS at MOSAI Schools each day
import imgScience   from '../assets/TON_8794.webp'  // Science experiments = academic curiosity
import imgActive    from '../assets/IMG_8738.webp'  // Animal walks = active nursery learning
import imgBee       from '../assets/IMG_8829.webp'  // Spelling bee = academic events
import imgCelebrate from '../assets/IMG_8647.webp'  // End of term = community celebration
import imgSoccer    from '../assets/IMG_8677.webp'  // Mini soccer = outdoor activities

export default function SchoolLife() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-heading text-sm font-extrabold text-mosai-red uppercase tracking-widest">Every Day Matters</span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-mosai-blue-dark mt-2">
              Life at{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#6EC6F2' }}>MOSAI Schools</span>
            </h2>
            <p className="font-body text-gray-500 mt-4 max-w-lg text-sm leading-relaxed">
              From morning assembly to afternoon sports, every moment is a chance to learn, grow and belong.
            </p>
          </div>
        </div>

        {/* Photo grid — purposeful placement, each image earns its place */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">

          {/* Science — tall (spans 2 rows) = most important, academic identity */}
          <div className="relative rounded-3xl overflow-hidden group row-span-2 bg-zinc-200">
            <img
              src={imgScience}
              alt="Prize giving at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mosai-blue-dark/85 via-mosai-blue-dark/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-mosai-red-light block mb-1">Celebrating Success</span>
              <p className="font-heading font-bold text-base leading-snug">We celebrate every learner's milestones together on our big days.</p>
            </div>
          </div>

          {/* Active learning */}
          <div className="relative rounded-3xl overflow-hidden group bg-zinc-200">
            <img
              src={imgActive}
              alt="Children dancing at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-0.5">Song &amp; Dance</span>
              <p className="font-heading font-bold text-sm leading-snug">Music, movement and dance build confidence and coordination.</p>
            </div>
          </div>

          {/* Soccer */}
          <div className="relative rounded-3xl overflow-hidden group bg-zinc-200">
            <img
              src={imgSoccer}
              alt="Urban farming at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-0.5">Urban Farming</span>
              <p className="font-heading font-bold text-sm leading-snug">Learners grow vegetables and learn to care for the environment.</p>
            </div>
          </div>

          {/* Spelling bee */}
          <div className="relative rounded-3xl overflow-hidden group bg-zinc-200">
            <img
              src={imgBee}
              alt="A learner giving a speech at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="font-body text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-0.5">Public Speaking</span>
              <p className="font-heading font-bold text-sm leading-snug">Children grow in confidence speaking in front of an audience.</p>
            </div>
          </div>

          {/* Celebrations — wide (spans 2 cols) = community feel */}
          <div className="relative rounded-3xl overflow-hidden group md:col-span-2 bg-zinc-200">
            <img
              src={imgCelebrate}
              alt="Learners in the school garden at MOSAI Schools"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-mosai-red-light block mb-1">Learning by Doing</span>
              <p className="font-heading font-bold text-lg leading-snug max-w-lg">From urban farming to hands on projects, learning comes alive beyond the classroom.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
