import { Bell, Calendar, AlertCircle, Globe, BookOpen } from 'lucide-react'

const announcements = [
  {
    date: '25 May 2026',
    category: 'Academic Calendar',
    icon: Calendar,
    title: 'Term II 2026 Begins — 25 May 2026',
    body: 'We warmly welcome all learners back for Term II, 2026. Please ensure school fees are settled via the School Pay System before the first day. Learners should report by 7:30 AM in full school uniform.',
    accent: 'red',
    priority: true,
  },
  {
    date: '20 May 2026',
    category: 'Fees & Payments',
    icon: AlertCircle,
    title: 'Term II Fees Due by 30 May 2026',
    body: 'A reminder that Term II fees are due by 30 May 2026. All payments must be made via the School Pay System using your child\'s unique code. No cash is accepted at school. Contact the office if you need assistance.',
    accent: 'blue',
    priority: true,
  },
  {
    date: '15 May 2026',
    category: 'Events',
    icon: Bell,
    title: 'Sports Day — 7 June 2026 (Nalugala Campus)',
    body: 'Our annual Sports Day will be held on Saturday, 7 June 2026 at the Nalugala Campus. Parents and guardians are warmly invited to cheer on our learners. Gates open at 8:30 AM.',
    accent: 'red',
    priority: false,
  },
  {
    date: '10 May 2026',
    category: 'Languages',
    icon: Globe,
    title: 'Chinese Language Programme Update',
    body: 'We are pleased to announce that our Chinese language programme has expanded. All classes from Baby Class to P.3 now have dedicated weekly Chinese lessons as part of our four-language curriculum.',
    accent: 'blue',
    priority: false,
  },
  {
    date: '5 May 2026',
    category: 'Academic',
    icon: BookOpen,
    title: 'Term I 2026 Report Cards Ready',
    body: 'Term I 2026 report cards are now available in the Reports section of this portal. Please review your child\'s performance and teacher comments. Contact your child\'s class teacher if you have any questions.',
    accent: 'red',
    priority: false,
  },
]

const accentMap = {
  red:  { badge: 'bg-mosai-red-light text-mosai-red', border: 'border-l-mosai-red', icon: 'text-mosai-red bg-mosai-red-light' },
  blue: { badge: 'bg-mosai-blue-light text-mosai-blue', border: 'border-l-mosai-blue', icon: 'text-mosai-blue bg-mosai-blue-light' },
}

export default function Announcements() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800">Announcements</h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">School news and notices from MOSAI Schools administration.</p>
      </div>

      <div className="space-y-4">
        {announcements.map((ann, i) => {
          const Icon = ann.icon
          const style = accentMap[ann.accent]
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${style.border} shadow-sm p-5`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`font-body text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${style.badge}`}>
                      {ann.category}
                    </span>
                    {ann.priority && (
                      <span className="font-body text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                        Important
                      </span>
                    )}
                    <span className="font-body text-xs text-slate-400 ml-auto">{ann.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-800 mb-2">{ann.title}</h3>
                  <p className="font-body text-sm text-slate-600 leading-relaxed">{ann.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
