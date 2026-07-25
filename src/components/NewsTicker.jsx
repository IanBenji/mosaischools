import { Megaphone } from 'lucide-react'

const tickerItems = [
  'Term II 2026 begins 25 May. All learners to report by 7:30 AM',
  'Admissions open for 2026: Baby Class, Middle Class, Top Class and Primary',
  'School fees payable via School Pay System only. No cash accepted',
  'Four languages offered: English, Swahili, French and Chinese',
  'Nalugala Campus (2025) and Bunono Campus (2026), both now open',
  'Day and Boarding available for Nursery and Primary learners',
  'Modern classrooms with digital interactive boards and computers',
  'Swimming pool on-site with trained instructors',
  'Safe school transport covering key routes along Kampala-Entebbe Road',
]

// Cheerful crayon colours for the bullet between items
const DOTS = ['#FFC93C', '#FF8A6B', '#5FBB6E', '#6EC6F2', '#9B7EDE']

export default function NewsTicker() {
  const repeated = [...tickerItems, ...tickerItems]

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
