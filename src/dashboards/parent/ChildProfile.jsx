import { GraduationCap, MapPin, User, Languages, BookOpen, Home } from 'lucide-react'
import { mockChild } from './mockData'

const langColors = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-purple-100 text-purple-700', 'bg-orange-100 text-orange-700']

export default function ChildProfile() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800">My Child</h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">Profile and enrollment details for {mockChild.name}.</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-mosai-blue-dark to-mosai-blue" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-2xl border-4 border-white flex items-center justify-center text-white font-heading font-extrabold text-3xl shadow-md shrink-0">
              {mockChild.name[0]}
            </div>
            <div className="pb-1">
              <h2 className="font-heading font-extrabold text-2xl text-slate-800">{mockChild.name}</h2>
              <p className="font-body text-sm text-slate-500">Age {mockChild.age} · {mockChild.section} Section</p>
            </div>
            <div className="sm:ml-auto">
              <span className={`font-body text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                mockChild.todayStatus === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {mockChild.todayStatus} Today
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: GraduationCap, label: 'Class',           value: mockChild.class,        accent: 'blue' },
              { icon: MapPin,        label: 'Campus',          value: mockChild.campus,        accent: 'red'  },
              { icon: Home,          label: 'Enrolment Type',  value: mockChild.type,          accent: 'blue' },
              { icon: User,          label: 'Class Teacher',   value: mockChild.teacher,       accent: 'red'  },
              { icon: BookOpen,      label: 'Admission No.',   value: mockChild.admissionNo,   accent: 'blue' },
              { icon: GraduationCap, label: 'Section',         value: mockChild.section,       accent: 'red'  },
            ].map(({ icon: Icon, label, value, accent }, i) => {
              const isBlue = accent === 'blue'
              return (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isBlue ? 'bg-mosai-blue-light' : 'bg-mosai-red-light'}`}>
                    <Icon className={`w-4 h-4 ${isBlue ? 'text-mosai-blue' : 'text-mosai-red'}`} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-slate-400 uppercase tracking-wide">{label}</p>
                    <p className="font-heading font-bold text-sm text-slate-700 mt-0.5">{value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <Languages className="w-5 h-5 text-mosai-blue" />
          <h3 className="font-heading font-bold text-base text-slate-800">Languages of Instruction</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {mockChild.languages.map((lang, i) => (
            <div key={lang} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-sm ${langColors[i]}`}>
              <span className="text-lg">
                {lang === 'English' ? '🇬🇧' : lang === 'Swahili' ? '🇰🇪' : lang === 'French' ? '🇫🇷' : '🇨🇳'}
              </span>
              {lang}
            </div>
          ))}
        </div>
        <p className="font-body text-xs text-slate-400 mt-4">
          MOSAI Schools teaches all four languages as part of its blended international curriculum.
        </p>
      </div>

      {/* Curriculum note */}
      <div className="bg-mosai-blue-dark text-white rounded-2xl p-6">
        <h3 className="font-heading font-bold text-base mb-2">Curriculum — {mockChild.class}</h3>
        <p className="font-body text-sm text-blue-200 leading-relaxed">
          {mockChild.name.split(' ')[0]} is enrolled in our <strong className="text-white">{mockChild.section} Section</strong> blended curriculum —
          built on Uganda's NCDC framework and enriched with IB concepts and British/IPC elements. The programme
          emphasises play-based learning, critical thinking, and multilingual development.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['NCDC Uganda', 'IB Concepts', 'British/IPC'].map(c => (
            <span key={c} className="font-body text-xs font-semibold px-3 py-1 bg-white/10 text-white rounded-full">{c}</span>
          ))}
        </div>
      </div>

    </div>
  )
}
