import { Link } from 'react-router-dom'
import { ArrowRight, Camera } from 'lucide-react'
import PageHeader  from '../components/PageHeader'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'

import imgHeader from '../assets/IMG_8647.webp'
import p1 from '../assets/TON_8855.webp'
import p2 from '../assets/IMG_8791.webp'
import p3 from '../assets/IMG_8682.webp'
import p4 from '../assets/TON_8742.webp'
import p5 from '../assets/IMG_8563.webp'
import p6 from '../assets/TON_8713.webp'
import p7 from '../assets/IMG_8829.webp'
import p8 from '../assets/IMG_8674.webp'
import p9 from '../assets/IMG_8754.webp'

/* Bunono GALLERY — a joyful tilted "scrapbook" wall. */

const CREAM = '#FFF8EE'
const INK = 'text-[#43261A]'

const PHOTOS = [
  { img: p1, cap: 'Big graduation day', rot: '-3deg' },
  { img: p2, cap: 'Show & tell',        rot: '2deg'  },
  { img: p3, cap: 'Splash time',        rot: '-2deg' },
  { img: p4, cap: 'Sports day fun',     rot: '3deg'  },
  { img: p5, cap: 'Art & craft',        rot: '-4deg' },
  { img: p6, cap: 'Morning assembly',   rot: '2deg'  },
  { img: p7, cap: 'Playtime friends',   rot: '-2deg' },
  { img: p8, cap: 'Our classrooms',     rot: '3deg'  },
  { img: p9, cap: 'Learning together',  rot: '-3deg' },
]

export default function GalleryBunono() {
  return (
    <main className="bg-cream overflow-hidden">
      <PageHeader
        crumb="Gallery"
        title="Our"
        accentWord="Scrapbook"
        subtitle="Snapshots of the joy, play and learning that fill every day at Bunono Campus."
        image={imgHeader}
        nextBg={CREAM}
      />

      {/* Scrapbook wall — tilted polaroids */}
      <section className="relative py-16">
        <Doodles names={['star', 'balloon']} count={2} />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {PHOTOS.map((ph, i) => (
              <figure
                key={i}
                className="bg-white p-3 pb-5 rounded-lg shadow-xl w-60 hover:-translate-y-2 hover:rotate-0 transition-transform duration-200"
                style={{ transform: `rotate(${ph.rot})` }}
              >
                <div className="w-full h-48 rounded-md overflow-hidden bg-zinc-200">
                  <img src={ph.img} alt={ph.cap} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <figcaption className={`font-heading font-bold text-center mt-3 ${INK}`}>{ph.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pt-20 pb-16" style={{ background: 'linear-gradient(180deg, #FFF8EE 0%, #E14B4B 30%, #B71C1C 100%)' }}>
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <Doodles names={['flower', 'star']} count={2} />
        <div className="relative z-[3] max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center mb-5 shadow-lg">
            <Camera className="w-8 h-8 text-mosai-red" />
          </div>
          <h2 className="font-heading font-extrabold text-4xl text-white mb-4">See It in Person</h2>
          <p className="font-body text-white/90 mb-7">Photos are only the beginning — come visit our Bunono Campus and feel the warmth for yourself.</p>
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
    </main>
  )
}
