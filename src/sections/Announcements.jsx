import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Megaphone } from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import useSheetData from '../hooks/useSheetData'
import { visibleAnnouncements, colourFor } from '../lib/schoolData'

/* Home-page "Latest News" strip — the three most recent notices.
 *
 * Content comes from the school's announcements sheet (see src/lib/schoolData.js)
 * rather than being hardcoded here, so the office can post without a developer.
 * The full list lives at /news.
 */
export default function Announcements() {
  const { campus } = useCampus()
  const { rows, loading } = useSheetData('announcements')
  const items = visibleAnnouncements(rows, campus).slice(0, 3)

  // Nothing to show and nothing on the way — drop the section entirely rather
  // than leave an empty heading on the home page.
  if (!loading && items.length === 0) return null

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-heading text-sm font-extrabold text-mosai-red uppercase tracking-widest">Stay Informed</span>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-mosai-blue-dark mt-2">
              Latest{' '}
              <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>News</span>
            </h2>
          </div>
          <Link
            to="/news"
            className="font-heading text-sm font-bold text-mosai-blue hover:text-mosai-blue-dark inline-flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => (
              <div key={i} className="animate-pulse rounded-3xl bg-white p-6 shadow-sm">
                <div className="h-5 w-28 rounded-full bg-gray-100" />
                <div className="mt-4 h-4 w-3/4 rounded-full bg-gray-100" />
                <div className="mt-3 h-3 w-full rounded-full bg-gray-50" />
                <div className="mt-2 h-3 w-5/6 rounded-full bg-gray-50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => {
              const colour = colourFor(item.category, i)
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center gap-1.5 font-heading text-xs font-bold px-3 py-1.5 rounded-full text-white"
                        style={{ backgroundColor: colour }}
                      >
                        <Megaphone className="w-3.5 h-3.5" />
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-body text-xs">{item.dateText || 'Ongoing'}</span>
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-base text-mosai-blue-dark leading-snug">{item.title}</h3>
                    <p className="font-body text-sm text-gray-500 leading-relaxed line-clamp-4">{item.body}</p>
                    <Link
                      to="/news"
                      className="mt-1 text-sm font-bold font-heading inline-flex items-center gap-1 hover:gap-2 transition-all"
                      style={{ color: colour }}
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
