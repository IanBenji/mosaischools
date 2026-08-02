import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import Lightbox from './Lightbox'

/* A single photo dropped between sections so images are scattered through a
 * page (not grouped). Tap to expand. Give it `bg` matching the section directly
 * above so the scalloped dividers stay seamless. */
export default function PhotoBand({ img, cap, bg = 'bg-cream', height = 'h-64 sm:h-80', maxW = 'max-w-4xl' }) {
  const [idx, setIdx] = useState(null)
  return (
    <section className={`${bg} pb-14`}>
      <div className={`${maxW} mx-auto px-4 sm:px-6`}>
        <figure
          onClick={() => setIdx(0)}
          className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] shadow-xl bg-zinc-200 ${height}`}
        >
          <img src={img} alt={cap || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-6 h-6 text-white" />
            </span>
          </div>
          {cap && (
            <figcaption className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 font-heading font-bold text-white text-sm">
              {cap}
            </figcaption>
          )}
        </figure>
      </div>
      <Lightbox photos={[{ img, cap }]} index={idx} setIndex={setIdx} />
    </section>
  )
}
