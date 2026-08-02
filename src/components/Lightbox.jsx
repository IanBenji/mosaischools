import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/* Reusable image lightbox. Parent owns the open index:
 *   const [idx, setIdx] = useState(null)
 *   <img onClick={() => setIdx(i)} />
 *   <Lightbox photos={PHOTOS} index={idx} setIndex={setIdx} />
 * Each photo may use { img | src } and { cap | caption }.
 */
export default function Lightbox({ photos, index, setIndex }) {
  const open = index !== null && index !== undefined
  const len = photos.length

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape')     setIndex(null)
      if (e.key === 'ArrowLeft')  setIndex((i) => (i - 1 + len) % len)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % len)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, len, setIndex])

  if (!open) return null
  const photo = photos[index]
  const src = photo.img || photo.src
  const cap = photo.cap || photo.caption

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
      onClick={() => setIndex(null)}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={() => setIndex(null)}
        aria-label="Close"
        className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {len > 1 && (
        <span className="absolute top-5 left-1/2 -translate-x-1/2 font-body text-xs text-white/50">
          {index + 1} / {len}
        </span>
      )}

      {len > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + len) % len) }}
          aria-label="Previous"
          className="absolute left-3 sm:left-5 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <figure className="max-w-5xl w-full mx-14 sm:mx-20 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={index}
          src={src}
          alt={cap || ''}
          className="max-h-[80vh] w-full object-contain rounded-2xl shadow-2xl"
          loading="eager"
          decoding="async"
        />
        {cap && <figcaption className="mt-4 font-heading font-bold text-white text-base text-center">{cap}</figcaption>}
      </figure>

      {len > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % len) }}
          aria-label="Next"
          className="absolute right-3 sm:right-5 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
