import { Link } from 'react-router-dom'
import { useCampus } from '../context/CampusContext'
import Doodles     from './Doodles'
import WaveDivider from './WaveDivider'

/* Inner-page hero header — rendered in TWO structurally different designs so the
 * campuses don't look alike:
 *
 *   Nalugala → immersive & calm: a full-bleed photo behind a blue wash, content
 *              left-aligned at the bottom, a smooth WAVE edge.
 *   Bunono   → storybook & playful: a warm coral→cream band with the photo in a
 *              tilted blob frame, a "New Campus" sticker, denser doodles, a
 *              SCALLOP edge.
 *
 * Pages pass the same content (crumb/title/accentWord/subtitle/image); the layout
 * is chosen by the active campus. `children` holds page-specific extras (buttons).
 */
export default function PageHeader({ crumb, title, accentWord, subtitle, image, kicker, children, nextBg = '#FFFFFF' }) {
  const { campus, campusInfo } = useCampus()
  const theme = campusInfo.theme
  const crayon = { '--crayon-color': theme.crayon }

  const breadcrumb = (light) => (
    <nav className={`flex items-center gap-2 font-body text-sm mb-4 ${light ? 'text-white/60' : 'text-gray-400'}`}>
      <Link to="/" className={light ? 'hover:text-white transition-colors' : 'hover:text-mosai-red transition-colors'}>Home</Link>
      <span>/</span>
      <span className={light ? 'text-white' : 'text-mosai-blue-dark'}>{crumb}</span>
    </nav>
  )

  // ─────────────────────────────────────────────── BUNONO — storybook/playful
  if (campus === 'bunono') {
    return (
      <section
        className="relative overflow-hidden pt-32 pb-24 sm:pb-28"
        style={{ background: 'linear-gradient(180deg, #7A1414 0%, #C0392B 55%, #E14B4B 100%)' }}
      >
        <Doodles names={theme.doodles} count={5} />

        <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              {breadcrumb(true)}
              <span className="inline-flex items-center gap-1.5 -rotate-2 bg-crayon-sun text-mosai-red-dark font-heading font-extrabold text-xs uppercase tracking-wide px-3.5 py-1.5 rounded-full shadow-md mb-4">
                ✦ {kicker || 'New Campus · 2026'}
              </span>
              <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-white leading-[1.05] mb-4 drop-shadow-sm">
                {title}{' '}
                <span className="crayon-underline text-white" style={crayon}>{accentWord}</span>
              </h1>
              {subtitle && <p className="font-body text-white/90 text-lg max-w-lg leading-relaxed">{subtitle}</p>}
              {children && <div className="mt-7">{children}</div>}
            </div>

            {/* Tilted blob-framed photo */}
            {image && (
              <div className="relative hidden lg:block">
                <div className="absolute -top-6 -right-4 z-20 w-16 h-16 animate-pop-bounce" style={{ '--doodle-rot': '8deg' }}>
                  <svg viewBox="0 0 48 48" width="100%" height="100%" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
                    <path d="M24 4 L29.5 18 L44 19 L33 29 L36.5 43 L24 35 L11.5 43 L15 29 L4 19 L18.5 18 Z" fill="#FFC93C" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <div
                  className="rotate-3 overflow-hidden ring-8 ring-white shadow-2xl bg-white"
                  style={{ borderRadius: '46% 54% 42% 58% / 55% 42% 58% 45%' }}
                >
                  <img src={image} alt={`${campusInfo.name} Campus`} className="w-full h-80 object-cover" loading="eager" decoding="async" />
                </div>
              </div>
            )}
          </div>
        </div>

        <WaveDivider variant="scallop" color={nextBg} className="absolute bottom-0 left-0 right-0 z-[2]" />
      </section>
    )
  }

  // ─────────────────────────────────────────────── NALUGALA — immersive/calm
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      {image && (
        <img src={image} alt={`${campusInfo.name} Campus`} className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" decoding="async" />
      )}
      <div className="absolute inset-0" style={{ background: theme.heroWash }} />
      <Doodles names={theme.doodles} count={3} />

      <div className="relative z-[3] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40">
        {breadcrumb(true)}
        {kicker && (
          <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white font-body font-bold text-xs uppercase tracking-wide px-3.5 py-1.5 rounded-full mb-4">
            {kicker}
          </span>
        )}
        <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-white leading-tight mb-4">
          {title}{' '}
          <span className="crayon-underline text-white" style={crayon}>{accentWord}</span>
        </h1>
        {subtitle && <p className="font-body text-white/80 text-lg max-w-xl leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-7">{children}</div>}
      </div>

      <WaveDivider variant="wave" color={nextBg} className="absolute bottom-0 left-0 right-0 z-[2]" />
    </section>
  )
}
