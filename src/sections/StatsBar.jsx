// School info strip — quick facts parents want at a glance
export default function StatsBar() {
  const facts = [
    { label: 'Licensed by', value: 'Ministry of Education and Sports, Uganda' },
    { label: 'Campuses',    value: 'Nalugala (2025) and Bunono (2026)'         },
    { label: 'Programs',    value: 'Baby Class · Middle · Top Class · P.1–P.3' },
    { label: 'Languages',   value: 'English · Swahili · French · Chinese'      },
    { label: 'Enrolment',   value: 'Day Scholar and Boarding available'         },
  ]

  return (
    <div className="bg-mosai-blue-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {facts.map((f, i) => (
            <div key={i} className="flex items-start gap-3 py-4 px-0 sm:px-6 first:pl-0 last:pr-0 w-full sm:w-auto sm:flex-1">
              <div>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-0.5">{f.label}</p>
                <p className="font-body text-xs text-white/80 leading-snug">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
