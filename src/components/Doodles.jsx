/* Decorative kindergarten doodles.
 *
 * Purely ornamental (aria-hidden) SVG shapes — suns, clouds, stars, flowers —
 * that float gently behind hero/section content to signal "children's school".
 * Each campus picks its own set via its theme (see lib/campus.js), so the two
 * campuses feel visibly different, not just recoloured.
 *
 * Usage: place inside a `relative overflow-hidden` parent.
 *   <Doodles names={campusInfo.theme.doodles} />
 */

const SHAPES = {
  sun: (
    <g>
      <circle cx="24" cy="24" r="11" fill="#FFC93C" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        const x1 = 24 + Math.cos(a) * 15, y1 = 24 + Math.sin(a) * 15
        const x2 = 24 + Math.cos(a) * 21, y2 = 24 + Math.sin(a) * 21
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFC93C" strokeWidth="3" strokeLinecap="round" />
      })}
    </g>
  ),
  cloud: (
    <g fill="#FFFFFF">
      <circle cx="16" cy="28" r="10" />
      <circle cx="28" cy="24" r="13" />
      <circle cx="40" cy="29" r="9" />
      <rect x="15" y="30" width="27" height="10" rx="5" />
    </g>
  ),
  wave: (
    <path d="M2 20 Q10 10 18 20 T34 20 T50 20" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
  ),
  kite: (
    <g>
      <path d="M24 6 L38 22 L24 42 L10 22 Z" fill="#6EC6F2" />
      <path d="M24 6 L24 42 M10 22 L38 22" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M24 42 q4 6 -2 10 q-4 4 2 8" fill="none" stroke="#FFC93C" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
  star: (
    <path
      d="M24 4 L29.5 18 L44 19 L33 29 L36.5 43 L24 35 L11.5 43 L15 29 L4 19 L18.5 18 Z"
      fill="#FFC93C" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round"
    />
  ),
  flower: (
    <g>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * Math.PI) / 3
        return <ellipse key={i} cx={24 + Math.cos(a) * 11} cy={24 + Math.sin(a) * 11} rx="7" ry="10" fill="#FF8A6B" transform={`rotate(${(i * 60)} ${24 + Math.cos(a) * 11} ${24 + Math.sin(a) * 11})`} />
      })}
      <circle cx="24" cy="24" r="7" fill="#FFC93C" />
    </g>
  ),
  leaf: (
    <g>
      <path d="M10 38 Q24 4 40 12 Q34 40 10 38 Z" fill="#5FBB6E" />
      <path d="M14 34 Q26 20 36 16" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  balloon: (
    <g>
      <ellipse cx="24" cy="20" rx="14" ry="17" fill="#FF8A6B" />
      <path d="M24 37 l-3 5 h6 z" fill="#FF8A6B" />
      <path d="M24 42 q4 6 -2 10" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="19" cy="14" rx="4" ry="6" fill="#FFFFFF" opacity="0.4" />
    </g>
  ),
}

// Round shapes get a slow spin on top of their float; others wiggle/bob.
const SPINNERS = new Set(['sun', 'flower', 'star'])

// Preset scatter positions + motion. Bigger and busier for a playful feel;
// names are cycled so a 4-doodle campus set fills all spots.
const SPOTS = [
  { style: { top: '12%',   left: '5%'   }, size: 78, rot: -8,  anim: 'animate-doodle-float',  delay: '0s'   },
  { style: { top: '18%',   right: '6%'  }, size: 66, rot: 10,  anim: 'animate-doodle-wiggle', delay: '1.2s' },
  { style: { bottom: '22%', left: '9%'  }, size: 58, rot: 6,   anim: 'animate-doodle-float',  delay: '0.6s' },
  { style: { top: '48%',   right: '11%' }, size: 88, rot: -6,  anim: 'animate-doodle-float',  delay: '1.8s' },
  { style: { top: '58%',   left: '3%'   }, size: 50, rot: 12,  anim: 'animate-doodle-wiggle', delay: '0.9s' },
  { style: { bottom: '12%', right: '20%'}, size: 62, rot: -12, anim: 'animate-pop-bounce',    delay: '2.1s' },
]

export default function Doodles({ names = [], count = SPOTS.length, className = '' }) {
  if (!names.length) return null
  return (
    <div className={`pointer-events-none absolute inset-0 z-[2] ${className}`} aria-hidden="true">
      {SPOTS.slice(0, count).map((spot, i) => {
        const name  = names[i % names.length]
        const shape = SHAPES[name]
        if (!shape) return null
        return (
          <div
            key={name + i}
            className={`absolute ${spot.anim}`}
            style={{ ...spot.style, width: spot.size, height: spot.size, '--doodle-rot': `${spot.rot}deg`, animationDelay: spot.delay }}
          >
            <svg
              viewBox="0 0 48 48" width="100%" height="100%"
              className={SPINNERS.has(name) ? 'animate-doodle-spin' : ''}
              style={{ filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.15))' }}
            >
              {shape}
            </svg>
          </div>
        )
      })}
    </div>
  )
}
