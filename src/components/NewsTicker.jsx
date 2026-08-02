import { Megaphone } from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import useSheetData from '../hooks/useSheetData'
import { tickerLines } from '../lib/schoolData'

/* The scrolling headline strip.
 *
 * Lines now come from the school's announcements sheet (the short `ticker`
 * column, or the headline if that is blank), followed by the standing facts in
 * EVERGREEN_TICKER. Before this, adding "Term II begins 25 May" meant editing
 * this file and redeploying. See src/lib/schoolData.js.
 */

// Cheerful crayon colours for the bullet between items
const DOTS = ['#FFC93C', '#FF8A6B', '#5FBB6E', '#6EC6F2', '#9B7EDE']

export default function NewsTicker() {
  const { campus } = useCampus()
  const { rows } = useSheetData('announcements')

  const items = tickerLines(rows, campus)
  if (!items.length) return null

  // Duplicated so the CSS marquee loops without a visible gap.
  const repeated = [...items, ...items]

  return (
    <div className="bg-mosai-blue-dark overflow-hidden py-3 flex items-center">
      {/* Label */}
      <div className="shrink-0 bg-mosai-red pl-4 pr-5 py-1.5 flex items-center gap-2 z-10 shadow-md rounded-r-full">
        <Megaphone className="w-4 h-4 text-white" />
        <span className="font-heading font-extrabold text-white text-sm uppercase tracking-widest whitespace-nowrap">
          Latest News
        </span>
      </div>

      {/* Scrolling track */}
      <div className="overflow-hidden flex-1 relative">
        <div className="flex whitespace-nowrap ticker-track">
          {repeated.map((item, i) => (
            <span
              key={i}
              className="font-body text-sm text-blue-100 inline-flex items-center gap-2 px-6"
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOTS[i % DOTS.length] }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
