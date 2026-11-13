import { useEffect, useState } from 'react'

/* Index of the current slide for a hero slideshow.
 * Advances every `ms`; picking a slide restarts the timer. Does not auto-advance
 * for visitors who ask for reduced motion (they can still use the dots). */
export default function useSlideshow(count, ms = 6000) {
  const [index, setIndex] = useState(0)
  const [tick, setTick] = useState(0)   // bumps when the visitor picks a slide

  useEffect(() => {
    if (count < 2) return
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), ms)
    return () => clearInterval(t)
  }, [count, ms, tick])

  const go = (i) => { setIndex(((i % count) + count) % count); setTick((n) => n + 1) }
  return [index % Math.max(count, 1), go]
}
