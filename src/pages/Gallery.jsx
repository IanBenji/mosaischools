import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin, ArrowRight, Images } from 'lucide-react'

// â”€â”€ Static imports give Vite-hashed URLs — no download until <img src> is set â”€â”€
import imgCls1 from '../assets/TON_8855.webp'
import imgCls2 from '../assets/IMG_8791.webp'
import imgCls3 from '../assets/IMG_8754.webp'
import imgCls4 from '../assets/IMG_8818.webp'
import imgSpt1 from '../assets/IMG_8682.webp'
import imgSpt2 from '../assets/TON_8742.webp'
import imgSpt3 from '../assets/IMG_8677.webp'
import imgSpt4 from '../assets/TON_8779.webp'
import imgSpt5 from '../assets/IMG_8738.webp'
import imgEvt1 from '../assets/IMG_8647.webp'
import imgEvt2 from '../assets/TON_8713.webp'
import imgEvt3 from '../assets/IMG_8563.webp'
import imgEvt4 from '../assets/TON_8794.webp'
import imgEvt5 from '../assets/IMG_8829.webp'
import imgCmp1 from '../assets/TON_8735.webp'
import imgCmp2 from '../assets/IMG_8592.webp'
import imgCmp3 from '../assets/TON_8667.webp'
import imgFac1 from '../assets/IMG_8674.webp'
import imgFac2 from '../assets/TON_8786.webp'
import imgFac3 from '../assets/TON_8807.webp'

// â”€â”€ Photo catalogue â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const photos = [
  { src: imgCls1, cat: 'Classrooms',          caption: 'Baby Class morning circle time',                    span: 'lg:col-span-2 lg:row-span-2' },
  { src: imgCls2, cat: 'Classrooms',          caption: 'Middle Class phonics lesson',                       span: '' },
  { src: imgCls3, cat: 'Classrooms',          caption: 'Top Class mathematics session',                     span: '' },
  { src: imgCls4, cat: 'Classrooms',          caption: 'Primary section, computer class',                   span: '' },
  { src: imgSpt1, cat: 'Sports & Games',      caption: 'Swimming lessons at the pool',                      span: 'lg:col-span-2' },
  { src: imgSpt2, cat: 'Sports & Games',      caption: 'Relay races on the field',                          span: '' },
  { src: imgSpt3, cat: 'Sports & Games',      caption: 'Mini soccer and ball skills',                       span: '' },
  { src: imgSpt4, cat: 'Sports & Games',      caption: 'Obstacle course challenge',                         span: '' },
  { src: imgSpt5, cat: 'Sports & Games',      caption: 'Animal walks, bear crawls and frog hops',           span: '' },
  { src: imgEvt1, cat: 'Events & Activities', caption: 'End of term celebrations',                          span: 'lg:col-span-2 lg:row-span-2' },
  { src: imgEvt2, cat: 'Events & Activities', caption: 'Morning school assembly',                           span: '' },
  { src: imgEvt3, cat: 'Events & Activities', caption: 'Art and craft afternoon',                           span: '' },
  { src: imgEvt4, cat: 'Events & Activities', caption: 'Science experiments session',                       span: '' },
  { src: imgEvt5, cat: 'Events & Activities', caption: 'Spelling bee competition',                          span: '' },
  { src: imgCmp1, cat: 'Campuses',            caption: 'Nalugala Campus, Garuga Road, Katabi',              span: 'lg:col-span-2' },
  { src: imgCmp2, cat: 'Campuses',            caption: 'Bunono Campus, opened 2026',                        span: '' },
  { src: imgCmp3, cat: 'Campuses',            caption: 'Outdoor grounds and play areas',                    span: '' },
  { src: imgFac1, cat: 'Facilities',          caption: 'Modern classrooms with digital interactive boards', span: 'lg:col-span-2' },
  { src: imgFac2, cat: 'Facilities',          caption: 'Clean and safe school environment',                 span: '' },
  { src: imgFac3, cat: 'Facilities',          caption: 'School facilities, MOSAI Schools',                  span: '' },
]

const CATEGORIES = ['All', 'Classrooms', 'Sports & Games', 'Events & Activities', 'Campuses', 'Facilities']
const PAGE_SIZE   = 12

const countFor = (cat) =>
  cat === 'All' ? photos.length : photos.filter(p => p.cat === cat).length

const campusTours = [
  {
    name: 'Nalugala Campus',
    badge: 'Flagship, opened January 2025',
    location: 'Garuga Road, off Kampala-Entebbe Road, Katabi',
    accent: 'blue',
    hero: imgCmp1,
    thumbs: [imgCls1, imgSpt1, imgFac1],
  },
  {
    name: 'Bunono Campus',
    badge: 'New Campus, opened 2026',
    location: 'Katabi, Wakiso District',
    accent: 'red',
    hero: imgCmp2,
    thumbs: [imgCls2, imgSpt2, imgFac2],
  },
]

// â”€â”€ LazyImg — withholds src until cell is near the viewport â”€â”€â”€â”€â”€â”€â”€â”€
// This prevents ANY network request for off-screen images.
function LazyImg({ src, alt, className, onVisible }) {
  const wrapRef  = useRef(null)
  const [show,   setShow]   = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    // Start loading 400 px before the cell enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          observer.disconnect()
          onVisible?.()
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [src])

  return (
    <div ref={wrapRef} className="absolute inset-0 bg-zinc-200">
      {show && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

// â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Gallery() {
  const [active,      setActive]   = useState('All')
  const [visibleCount,setVisible]  = useState(PAGE_SIZE)
  const [lightboxIdx, setLightbox] = useState(null)

  const filtered = active === 'All' ? photos : photos.filter(p => p.cat === active)
  // Only the paginated slice is rendered
  const visible  = filtered.slice(0, visibleCount)
  const photo    = lightboxIdx !== null ? filtered[lightboxIdx] : null
  const hasMore  = visibleCount < filtered.length

  // Reset pagination when filter changes
  function changeFilter(cat) {
    setActive(cat)
    setVisible(PAGE_SIZE)
    setLightbox(null)
  }

  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIdx])

  useEffect(() => {
    if (lightboxIdx === null) return
    const len = filtered.length
    const onKey = (e) => {
      if (e.key === 'Escape')     setLightbox(null)
      if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + len) % len)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % len)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, filtered.length])

  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const next = () => setLightbox(i => (i + 1) % filtered.length)

  return (
    <main className="bg-white">

      {/* â”€â”€ Page Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        {/* Only the hero image loads eagerly — it's above the fold */}
        <img
          src={imgEvt1}
          alt="Life at MOSAI Schools"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-mosai-blue-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-mosai-blue-dark/45 via-transparent to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-36">
          <nav className="flex items-center gap-2 font-body text-sm text-white/50 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-white leading-tight mb-4">
            Photo <span className="text-mosai-red">Gallery</span>
          </h1>
          <p className="font-body text-white/75 text-lg max-w-xl leading-relaxed">
            Life at MOSAI Schools. A glimpse into the daily joy, creativity and learning across our Nalugala and Bunono campuses.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <span className="font-body text-sm font-semibold text-white/60">{photos.length} photos</span>
            <span className="w-1 h-1 bg-white/40 rounded-full" />
            <span className="font-body text-sm font-semibold text-white/60">{CATEGORIES.length - 1} categories</span>
            <span className="w-1 h-1 bg-white/40 rounded-full" />
            <span className="font-body text-sm font-semibold text-white/60">2 campuses</span>
          </div>
        </div>
      </section>

      {/* â”€â”€ Filter Tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => changeFilter(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-heading font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  active === cat
                    ? 'bg-mosai-blue-dark text-white shadow-md'
                    : 'bg-gray-100 text-gray-500 hover:bg-mosai-blue-light hover:text-mosai-blue'
                }`}
              >
                {cat}
                <span className={`text-xs font-normal px-1.5 py-0.5 rounded-full ${
                  active === cat ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {countFor(cat)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ Photo Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <Images className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-heading font-bold text-xl">No photos in this category yet</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
                {visible.map((p, i) => (
                  <div
                    key={`${active}-${i}`}
                    className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                      active === 'All' ? p.span : ''
                    }`}
                    onClick={() => setLightbox(i)}
                  >
                    {/* LazyImg — src only injected when near viewport */}
                    <LazyImg
                      src={p.src}
                      alt={p.caption}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-mosai-blue-dark/0 group-hover:bg-mosai-blue-dark/50 transition-colors duration-200 z-10" />

                    {/* Zoom icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-20">
                      <div className="m-2 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2.5">
                        <p className="font-body text-xs text-white leading-snug">{p.caption}</p>
                        <span className="font-body text-[10px] text-white/55 mt-0.5 block">{p.cat}</span>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="font-body text-[10px] font-bold uppercase tracking-wide px-2 py-1 bg-black/40 backdrop-blur-sm text-white rounded-full">
                        {p.cat}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Count + Load More */}
              <div className="text-center mt-8 space-y-4">
                <p className="font-body text-xs text-gray-400">
                  Showing <span className="font-semibold text-mosai-blue">{visible.length}</span> of{' '}
                  <span className="font-semibold text-mosai-blue">{filtered.length}</span> photos
                  {active !== 'All' && <> in <span className="font-semibold">{active}</span></>}
                </p>
                {hasMore && (
                  <button
                    onClick={() => setVisible(v => v + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 font-heading font-bold text-sm bg-mosai-blue-dark hover:bg-mosai-blue text-white px-8 py-3 rounded-full transition-colors duration-200 shadow-sm"
                  >
                    Load More Photos
                    <span className="font-body font-normal text-xs text-blue-300">
                      ({filtered.length - visible.length} remaining)
                    </span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* â”€â”€ Campus Tours â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Visit Us</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Campus Tours</h2>
            <p className="font-body text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              A closer look at both of our campuses along the Kampala-Entebbe Road in Wakiso District.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {campusTours.map((campus, ci) => {
              const isBlue = campus.accent === 'blue'
              return (
                <div key={ci} className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100">

                  {/* Hero — lazy */}
                  <div className="relative h-56 overflow-hidden bg-zinc-200">
                    <LazyImg
                      src={campus.hero}
                      alt={campus.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-mosai-blue-dark/75 to-transparent" />
                    <div className="absolute bottom-4 left-5 text-white z-10">
                      <span className={`font-body text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block ${isBlue ? 'bg-mosai-blue' : 'bg-mosai-red'}`}>
                        {campus.badge}
                      </span>
                      <h3 className="font-heading font-extrabold text-xl">{campus.name}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-2 mb-5 text-gray-500">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="font-body text-sm">{campus.location}</span>
                    </div>

                    {/* Thumbnails — lazy */}
                    <div className="grid grid-cols-3 gap-2">
                      {campus.thumbs.map((thumb, ti) => (
                        <div
                          key={ti}
                          className="relative rounded-xl overflow-hidden aspect-video cursor-pointer bg-zinc-200"
                          onClick={() => {
                            changeFilter('All')
                            const idx = photos.findIndex(p => p.src === thumb)
                            if (idx !== -1) setLightbox(Math.min(idx, PAGE_SIZE - 1))
                          }}
                        >
                          <LazyImg
                            src={thumb}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-200 flex items-center justify-center z-10">
                            <ZoomIn className="w-4 h-4 text-white opacity-0 hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-14 bg-mosai-blue-light text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mb-3">Come See It in Person</h2>
          <p className="font-body text-sm text-gray-500 mb-7 leading-relaxed">
            Photos are only the beginning. Book a visit to either our Nalugala or Bunono campus and experience the warmth of MOSAI Schools first hand.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-8 py-3.5 rounded-full transition-colors duration-200 shadow-md">
              Book a School Tour <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/admissions" className="inline-flex items-center gap-2 border-2 border-mosai-blue text-mosai-blue hover:bg-mosai-blue hover:text-white font-heading font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* â”€â”€ Lightbox â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {photo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 font-body text-xs text-white/50">
            {lightboxIdx + 1} / {filtered.length}
          </div>

          <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous"
            className="absolute left-3 sm:left-5 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full mx-16 sm:mx-20 flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img
              key={lightboxIdx}
              src={photo.src}
              alt={photo.caption}
              className="max-h-[78vh] w-full object-contain rounded-2xl shadow-2xl"
              loading="eager"
              decoding="async"
            />
            <div className="mt-4 text-center">
              <p className="font-heading font-bold text-white text-base">{photo.caption}</p>
              <span className={`inline-block mt-1.5 font-body text-xs px-3 py-1 rounded-full ${
                photo.cat === 'Sports & Games'      ? 'bg-mosai-blue/80 text-white' :
                photo.cat === 'Classrooms'          ? 'bg-mosai-red/80 text-white'  :
                photo.cat === 'Events & Activities' ? 'bg-purple-600/80 text-white' :
                photo.cat === 'Campuses'            ? 'bg-green-600/80 text-white'  :
                                                     'bg-white/20 text-white'
              }`}>
                {photo.cat}
              </span>
            </div>
          </div>

          <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next"
            className="absolute right-3 sm:right-5 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <ChevronRight className="w-6 h-6" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-[10px] text-white/30">
            Arrow keys to navigate · Esc to close
          </p>
        </div>
      )}

    </main>
  )
}
