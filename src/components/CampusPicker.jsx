import { useState, useEffect } from 'react'
import { MapPin, GraduationCap, ArrowRight, X, Check } from 'lucide-react'
import { CAMPUSES } from '../lib/campus'
import { useCampus } from '../context/CampusContext'

/* First-visit campus picker.
 *
 * A friendly "which campus is your child at?" popup. It appears only for a
 * visitor who has not yet chosen a campus, and only once they have *started
 * browsing* — after they scroll past the hero or a few seconds pass, whichever
 * comes first. Picking a campus persists the choice (see CampusContext), so the
 * popup never returns on future visits. Closing without choosing simply hides it
 * for the current session (a returning session may still offer it, since no
 * choice was recorded).
 */
const DISMISS_KEY = 'mosai.campus.picker.dismissed'
const SCROLL_TRIGGER = 480   // px scrolled before we consider them "browsing"
const TIME_TRIGGER   = 7000  // ms fallback if they don't scroll

export default function CampusPicker() {
  const { campus, chosen, chooseCampus } = useCampus()
  const [open, setOpen]       = useState(false)
  const [closing, setClosing] = useState(false)

  // Decide whether/when to reveal the popup.
  useEffect(() => {
    if (chosen) return
    let dismissed = false
    try { dismissed = sessionStorage.getItem(DISMISS_KEY) === '1' } catch { /* ignore */ }
    if (dismissed) return

    let done = false
    const reveal = () => {
      if (done) return
      done = true
      setOpen(true)
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
    const onScroll = () => { if (window.scrollY > SCROLL_TRIGGER) reveal() }
    const timer = setTimeout(reveal, TIME_TRIGGER)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [chosen])

  // Lock body scroll while the modal is up.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  function close() {
    setClosing(true)
    try { sessionStorage.setItem(DISMISS_KEY, '1') } catch { /* ignore */ }
    setTimeout(() => { setOpen(false); setClosing(false) }, 220)
  }

  function pick(slug) {
    chooseCampus(slug)          // persists choice + plays the curtain wipe
    setClosing(true)
    setTimeout(() => { setOpen(false); setClosing(false) }, 220)
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-[8000] flex items-center justify-center p-4 ${closing ? 'campus-picker-backdrop--out' : 'campus-picker-backdrop'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-picker-title"
      onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div className={`relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden ${closing ? 'campus-picker-card--out' : 'campus-picker-card'}`}>
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Maybe later"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-mosai-blue-dark px-7 pt-9 pb-8 text-center text-white sm:px-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <GraduationCap className="h-7 w-7" />
          </div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Welcome to MOSAI Schools</p>
          <h2 id="campus-picker-title" className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">
            Which campus is your child at?
          </h2>
          <p className="mx-auto mt-2 max-w-md font-body text-sm text-blue-100/80">
            Choose a campus to see the right information for your family. You can switch anytime from the menu at the top.
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-8">
          {Object.entries(CAMPUSES).map(([slug, c]) => {
            const isRed     = c.accent === 'red'
            const isCurrent = slug === campus
            return (
              <button
                key={slug}
                type="button"
                onClick={() => pick(slug)}
                className={`group flex flex-col rounded-2xl border-2 p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isRed
                    ? 'border-mosai-red-light hover:border-mosai-red'
                    : 'border-mosai-blue-light hover:border-mosai-blue'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${isRed ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                    <MapPin className={`h-6 w-6 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                  </span>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-gray-500">
                      <Check className="h-3 w-3" /> Viewing
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-xl font-extrabold text-mosai-blue-dark">{c.name} Campus</h3>
                <p className={`mt-0.5 font-body text-xs font-bold uppercase tracking-wide ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`}>
                  {c.tagline}
                </p>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-gray-500">{c.blurb}</p>
                <span className={`mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-bold group-hover:gap-2.5 transition-all ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`}>
                  Choose this campus <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={close}
          className="mb-6 block w-full text-center font-body text-sm font-semibold text-gray-400 transition-colors hover:text-gray-600"
        >
          Not sure yet — keep looking around
        </button>
      </div>
    </div>
  )
}
