/* Playful section divider.
 *
 * A curved SVG edge between sections — the recurring "children's book" signature.
 * The curve shape changes per campus so the two campuses feel different:
 *   - variant "wave"    → smooth water curve (Nalugala, lake & sky)
 *   - variant "scallop" → rounded hills / cloud bumps (Bunono, garden)
 *
 * Place at the bottom of a section (color = the NEXT section's background) or,
 * with `flip`, at the top. `color` is any CSS color for the fill.
 */

function wavePath() {
  // Gentle sine-like curve across a 1440×120 viewBox.
  return 'M0,64 C240,120 480,8 720,48 C960,88 1200,120 1440,56 L1440,120 L0,120 Z'
}

function scallopPath() {
  // Repeated rounded bumps (semi-circles) — a scalloped hemline.
  const bumps = 12
  const w = 1440 / bumps
  let d = `M0,60 `
  for (let i = 0; i < bumps; i++) {
    const x = i * w
    d += `Q${x + w / 4},110 ${x + w / 2},60 T${x + w},60 `
  }
  d += 'L1440,120 L0,120 Z'
  return d
}

// The page surface colours are CSS variables (see index.css) so the edges
// follow the light or dark theme. Any other colour is used as given.
const SURFACES = {
  '#FFFFFF': 'rgb(var(--rgb-surface))',
  '#FFF':    'rgb(var(--rgb-surface))',
  '#FFF8EE': 'rgb(var(--rgb-cream))',
  '#F3F6FA': 'rgb(var(--rgb-mist))',
  '#EBF0F6': 'rgb(var(--rgb-mist-deep))',
}

export default function WaveDivider({ variant = 'wave', color = '#FFFFFF', flip = false, className = '' }) {
  const d = variant === 'scallop' ? scallopPath() : wavePath()
  const fill = SURFACES[String(color).toUpperCase()] || color
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-[0] ${className}`}
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[60px] sm:h-[90px]"
      >
        <path d={d} style={{ fill }} />
      </svg>
    </div>
  )
}
