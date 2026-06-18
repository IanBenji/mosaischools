import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [dot, setDot]         = useState({ x: -200, y: -200 })
  const [ring, setRing]       = useState({ x: -200, y: -200 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  const target = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const rafId   = useRef(null)

  useEffect(() => {
    // One persistent loop — no new loop spawned per mousemove
    function loop() {
      const lerpFactor = 0.28
      ringPos.current.x += (target.current.x - ringPos.current.x) * lerpFactor
      ringPos.current.y += (target.current.y - ringPos.current.y) * lerpFactor
      setRing({ x: ringPos.current.x, y: ringPos.current.y })
      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    function onMove(e) {
      target.current = { x: e.clientX, y: e.clientY }
      setDot({ x: e.clientX, y: e.clientY })

      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(!!el?.closest('a, button, [role="button"], input, textarea, select, label'))
    }

    function onDown() { setClicking(true) }
    function onUp()   { setClicking(false) }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  // When hovering a link/button, hide custom cursor → native pointer finger shows
  if (hovering) return null

  return (
    <>
      {/* Dot — exact pointer position, no lag (z above modal at 10000) */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[10002]"
        style={{ transform: `translate(${dot.x - 5}px, ${dot.y - 5}px)` }}
      >
        <div
          className={`rounded-full transition-[width,height,background-color] duration-100 ${
            clicking ? 'w-2 h-2 bg-white' : 'w-2.5 h-2.5 bg-mosai-red'
          }`}
        />
      </div>

      {/* Ring — smooth lerp follow */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[10001]"
        style={{ transform: `translate(${ring.x - 18}px, ${ring.y - 18}px)` }}
      >
        <div
          className={`rounded-full border-2 transition-[width,height,border-color,transform] duration-100 ${
            clicking
              ? 'w-7 h-7 border-mosai-red scale-75'
              : 'w-9 h-9 border-mosai-blue/50'
          }`}
        />
      </div>
    </>
  )
}
