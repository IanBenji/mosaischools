import { CAMPUSES } from '../lib/campus'
import { useCampus } from '../context/CampusContext'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'

/* Full-screen curtain that wipes across when the visitor switches campus.
 * Coloured in the incoming campus's identity so the change reads instantly.
 * Sits above the page but below the custom cursor. */
export default function CampusTransition() {
  const { switching } = useCampus()
  if (!switching) return null

  const next  = CAMPUSES[switching]
  const color = next.accent === 'red' ? '#B71C1C' : '#153764'

  return (
    <div className="campus-wipe pointer-events-none fixed inset-0 z-[9000] flex items-center justify-center" style={{ backgroundColor: color }}>
      <div className="campus-wipe__label flex flex-col items-center gap-3 text-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-1.5">
          <img src={mosaiLogo} alt="MOSAI Schools" className="h-full w-full object-contain" />
        </div>
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.35em] text-white/60">
          Switching to
        </p>
        <p className="font-heading text-4xl font-extrabold sm:text-5xl">{next.name} Campus</p>
      </div>
    </div>
  )
}
