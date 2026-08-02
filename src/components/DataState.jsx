import { AlertCircle } from 'lucide-react'

/* Loading / empty / error furniture for the school-maintained pages.
 *
 * Shared because the *states* are identical across campuses even though the
 * pages are not; the `bunono` flag swaps the skin (dashed crayon borders and
 * warm ink) for the storybook design without forking the logic.
 */

export function LoadingRows({ count = 3, bunono = false }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the latest from the school…</span>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse ${
            bunono
              ? 'rounded-[2rem] border-2 border-dashed border-[#E7D8C6] bg-white/70 p-7'
              : 'rounded-3xl border border-gray-100 bg-white p-7'
          }`}
        >
          <div className={`h-3 w-24 rounded-full ${bunono ? 'bg-[#EFE2D2]' : 'bg-gray-100'}`} />
          <div className={`mt-4 h-4 w-2/3 rounded-full ${bunono ? 'bg-[#EFE2D2]' : 'bg-gray-100'}`} />
          <div className={`mt-3 h-3 w-full rounded-full ${bunono ? 'bg-[#F5EADE]' : 'bg-gray-50'}`} />
          <div className={`mt-2 h-3 w-4/5 rounded-full ${bunono ? 'bg-[#F5EADE]' : 'bg-gray-50'}`} />
        </div>
      ))}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, children, bunono = false, accent = '#FF8A6B' }) {
  return (
    <div
      className={`text-center ${
        bunono
          ? 'rounded-[2.5rem] border-4 border-dashed bg-white px-6 py-14 sm:px-12'
          : 'rounded-3xl border border-gray-100 bg-white px-6 py-14 shadow-sm sm:px-12'
      }`}
      style={bunono ? { borderColor: accent } : undefined}
    >
      {Icon && (
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: bunono ? accent : `${accent}22` }}
        >
          <Icon className="h-8 w-8" style={{ color: bunono ? '#FFFFFF' : accent }} />
        </div>
      )}
      <h3 className={`font-heading text-xl font-extrabold ${bunono ? 'text-[#43261A]' : 'text-mosai-blue-dark'}`}>
        {title}
      </h3>
      <div className={`mx-auto mt-3 max-w-md font-body text-sm leading-relaxed ${bunono ? 'text-[#7A5C4A]' : 'text-gray-500'}`}>
        {children}
      </div>
    </div>
  )
}

/* Shown only when the school's sheet could not be reached. Deliberately quiet:
 * whatever was cached or bundled is still on screen above it, so this is a
 * footnote rather than an error page. */
export function StaleNotice({ bunono = false }) {
  return (
    <p className={`mt-6 flex items-center justify-center gap-2 font-body text-xs ${bunono ? 'text-[#A98B77]' : 'text-gray-400'}`}>
      <AlertCircle className="h-3.5 w-3.5" />
      We could not check for updates just now, so this may not be the very latest.
    </p>
  )
}
