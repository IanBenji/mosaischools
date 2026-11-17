import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Camera, ZoomIn } from 'lucide-react'
import PageHeader  from '../components/PageHeader'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import Lightbox    from '../components/Lightbox'

import imgHeader from '../assets/bunono/bunono-15.webp'
import { bunonoPhotos, BUN_GALLERY } from '../assets/bunono'

/* Bunono GALLERY — a joyful tilted "scrapbook" wall of real Bunono photos.
 * Captions follow the actual content of each photo (assembly / pool / campus). */

const CREAM = 'rgb(var(--rgb-cream))'   // #FFF8EE, follows the theme
const INK = 'text-[#43261A]'

const ROTS = ['-3deg', '2deg', '-2deg', '3deg', '-4deg', '2deg', '-2deg', '3deg']
const POOL = ['Swimming lessons', 'Splash time', 'Pool fun', 'Making a splash']

// n is the 1-based photo number (bunono-NN); mapped to real content categories.
function captionFor(n, i) {
  if (n <= 7)             return n % 2 ? 'Morning assembly' : 'At the playground'
  if (n === 28 || n === 29) return 'By the pool'
  if (n === 30)           return 'One of our learners'
  if (n <= 38)            return POOL[i % POOL.length]
  if (n === 47)           return 'Our playground'
  return 'Our campus'     // 39–46 — the Bunono campus buildings
}

// The November 2026 campus photos lead, then the original numbered set.
const PHOTOS = [
  ...BUN_GALLERY.map(({ img, cap, alt }) => ({ img, cap, alt })),
  ...bunonoPhotos.map((img, i) => ({ img, cap: captionFor(i + 1, i) })),
].map((ph, i) => ({ ...ph, rot: ROTS[i % ROTS.length] }))

export default function GalleryBunono() {
  const [idx, setIdx] = useState(null)

  return (
    <main className="bg-cream overflow-hidden">
      <PageHeader
        crumb="Gallery"
        title="Our"
        accentWord="Scrapbook"
        kicker="Bunono Campus Gallery"
        subtitle="Snapshots of the joy, play and learning that fill every day at Bunono Campus. Tap any photo to take a closer look."
        image={imgHeader}
        nextBg={CREAM}
      />

      {/* Scrapbook wall — tilted polaroids, tap to expand */}
      <section className="relative py-16">
        <Doodles names={['star', 'balloon']} count={2} />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {PHOTOS.map((ph, i) => (
              <figure
                key={i}
                onClick={() => setIdx(i)}
                className="group cursor-pointer bg-white p-3 pb-5 rounded-lg shadow-xl w-60 hover:-translate-y-2 hover:rotate-0 transition-transform duration-200"
                style={{ transform: `rotate(${ph.rot})` }}
              >
                <div className="relative w-full h-48 rounded-md overflow-hidden bg-zinc-200">
                  <img src={ph.img} alt={ph.alt || ph.cap} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </span>
                  </div>
                </div>
                <figcaption className={`font-heading font-bold text-center mt-3 ${INK}`}>{ph.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pt-20 pb-16" style={{ background: 'linear-gradient(180deg, #E14B4B 0%, #B71C1C 100%)' }}>
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['flower', 'star']} count={2} />
        <div className="relative z-[3] max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center mb-5 shadow-lg">
            <Camera className="w-8 h-8 text-mosai-red" />
          </div>
          <h2 className="font-heading font-extrabold text-4xl text-white mb-4">See It in Person</h2>
          <p className="font-body text-white/90 mb-7">Photos are only the beginning, so come and visit our Bunono Campus and feel the warmth for yourself.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-cream text-mosai-red-dark font-heading font-extrabold px-8 py-4 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
              Book a Visit <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/admissions" className="inline-flex items-center gap-2 border-2 border-white/80 text-white font-heading font-extrabold px-8 py-4 rounded-full hover:bg-white/15 transition-all">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <Lightbox photos={PHOTOS} index={idx} setIndex={setIdx} />
    </main>
  )
}
