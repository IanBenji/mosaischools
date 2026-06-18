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

export default function NewsTicker() {
  const repeated = [...tickerItems, ...tickerItems]

  return (
    <div className="bg-mosai-blue-dark overflow-hidden py-3 flex items-center">
      {/* Label */}
      <div className="shrink-0 bg-mosai-red px-5 py-1 flex items-center gap-2 z-10 shadow-md">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="font-heading font-bold text-white text-sm uppercase tracking-widest whitespace-nowrap">
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
              <span className="text-mosai-red font-bold">&#9679;</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
