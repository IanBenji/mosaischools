import { NAL } from '../assets/nalugala-campus'

// Every caption below describes what is actually in its photograph.
import imgGraduation from '../assets/TON_8855.webp'  // nursery graduates celebrating
import imgDance      from '../assets/TON_8779.webp'  // cultural dance troupe on stage
import imgSpeech     from '../assets/IMG_8682.webp'  // a learner speaking in the garden
import imgGarden     from '../assets/IMG_8647.webp'  // learners presenting the school garden

const tiles = [
  {
    img: imgGraduation, span: 'row-span-2', big: true,
    alt: 'MOSAI nursery graduates in caps and gowns celebrating with a cake on graduation day',
    kicker: 'Celebrating Success',
    text: 'We celebrate every learner\'s milestones together on our big days.',
  },
  {
    img: imgDance,
    alt: 'MOSAI learners in traditional costume performing a cultural dance on stage',
    kicker: 'Song & Dance',
    text: 'Music, movement and dance build confidence and coordination.',
  },
  {
    img: NAL.dormBunks.img,
    alt: NAL.dormBunks.alt,
    kicker: 'Boarding',
    text: 'A clean, cared for home away from home for our Primary boarders.',
  },
  {
    img: imgSpeech,
    alt: 'A MOSAI learner speaking confidently into a microphone in the school garden',
    kicker: 'Public Speaking',
    text: 'Children grow in confidence speaking in front of an audience.',
  },
  {
    img: NAL.compound.img,
    alt: NAL.compound.alt,
    kicker: 'Our Campus',
    text: 'Bright classrooms around an open, safe compound.',
  },
  {
    img: imgGarden, span: 'col-span-2 md:col-span-3', big: true,
    alt: 'MOSAI learners presenting the school vegetable garden to visiting parents and guests',
    kicker: 'Learning by Doing',
    text: 'From urban farming to hands on projects, learning comes alive beyond the classroom.',
  },
]

export default function SchoolLife() {
  return (
    <section className="py-20 bg-mist">
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
              From morning assembly to the school garden, every moment is a chance to learn, grow and belong.
            </p>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {tiles.map((t) => (
            <figure key={t.kicker} className={`relative rounded-3xl overflow-hidden group bg-zinc-200 ${t.span || ''}`}>
              <img
                src={t.img}
                alt={t.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${t.big ? 'from-mosai-blue-dark/85 via-mosai-blue-dark/20' : 'from-black/75 via-black/10'} to-transparent`} />
              <figcaption className={`absolute text-white ${t.big ? 'bottom-5 left-5 right-5' : 'bottom-4 left-4 right-4'}`}>
                <span className={`font-body font-bold uppercase tracking-widest block mb-0.5 ${t.big ? 'text-xs text-mosai-red-light' : 'text-[10px] text-white/70'}`}>{t.kicker}</span>
                <span className={`font-heading font-bold leading-snug block ${t.big ? 'text-base sm:text-lg max-w-lg' : 'text-xs sm:text-sm'}`}>{t.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
