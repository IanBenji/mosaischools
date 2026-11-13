import { useEffect, useRef } from 'react'

const INTERACTIVE =
  'a, button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], select, label'
const TEXT_FIELDS =
  'input:not([type="submit"]):not([type="button"]):not([type="reset"]), textarea'

/* Brand cursor: a red dot at the exact pointer position and a blend-mode ring
 * that glides after it. The ring opens over interactive elements and snaps
 * tight on press. No React state — everything is written straight to the DOM
 * from one rAF loop, so it never re-renders. Touch devices never mount it. */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    /* Claims the rule in index.css that hides the native cursor, so hiding it is
     * tied to this component being on screen rather than asserted globally. A
     * page that renders no cursor of its own therefore keeps the real one. */
    const root = document.documentElement
    root.classList.add('mosai-cursor-active')

    const dot  = dotRef.current
    const ring = ringRef.current
    let targetX = -100, targetY = -100
    let ringX   = -100, ringY   = -100
    let shown   = false
    let rafId

    function loop() {
      ringX += (targetX - ringX) * 0.2
      ringY += (targetY - ringY) * 0.2
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    function onMove(e) {
      targetX = e.clientX
      targetY = e.clientY
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`

      if (!shown) {
        shown = true
        ringX = targetX
        ringY = targetY
        dot.classList.remove('is-hidden')
        ring.classList.remove('is-hidden')
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }

      const el = document.elementFromPoint(targetX, targetY)
      const overText        = !!el?.closest(TEXT_FIELDS)
      const overInteractive = !overText && !!el?.closest(INTERACTIVE)

      dot.classList.toggle('is-hidden', overText)
      ring.classList.toggle('is-hidden', overText)
      dot.classList.toggle('is-interactive', overInteractive)
      ring.classList.toggle('is-interactive', overInteractive)
    }

    function onDown()  { ring.classList.add('is-down') }
    function onUp()    { ring.classList.remove('is-down') }
    function onLeave(e) {
      // Pointer left the window entirely
      if (!e.relatedTarget) {
        shown = false
        dot.style.opacity = '0'
        ring.style.opacity = '0'
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseout', onLeave)

    return () => {
      root.classList.remove('mosai-cursor-active')
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="mosai-cursor mosai-cursor--ring" aria-hidden="true" />
      <div ref={dotRef}  className="mosai-cursor mosai-cursor--dot"  aria-hidden="true" />
    </>
  )
}
