import { useState } from 'react'
import { Search, Phone, Users, Home, GraduationCap } from 'lucide-react'
import { mockStudents, mockTeacher } from './mockData'

export default function MyStudents() {
  const [query,  setQuery]  = useState('')
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'Day Scholar', 'Boarding']

  const visible = mockStudents.filter(s => {
    const matchQ = s.name.toLowerCase().includes(query.toLowerCase()) ||
                   s.parentName.toLowerCase().includes(query.toLowerCase()) ||
                   s.admNo.toLowerCase().includes(query.toLowerCase())
    const matchF = filter === 'All' || s.type === filter
    return matchQ && matchF
  })

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-800">My Students</h1>
          <p className="font-body text-sm text-slate-500 mt-0.5">
            {mockTeacher.class} · {mockTeacher.campus} · {mockStudents.length} learners enrolled
          </p>
        </div>
        <div className="flex items-center gap-2 bg-mosai-blue-light rounded-xl px-4 py-2">
          <Users className="w-4 h-4 text-mosai-blue" />
          <span className="font-heading font-bold text-sm text-mosai-blue-dark">{mockStudents.length} Total</span>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, parent, or admission number…"
            className="w-full pl-9 pr-4 py-2.5 font-body text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue"
          />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-heading font-bold transition-all duration-150 ${
                filter === f ? 'bg-mosai-blue-dark text-white shadow' : 'bg-white border border-gray-200 text-slate-500 hover:border-mosai-blue hover:text-mosai-blue'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Student cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-xl flex items-center justify-center text-white font-heading font-extrabold text-lg shrink-0">
                {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm text-slate-800 truncate">{s.name}</p>
                <p className="font-body text-xs text-slate-400">Age {s.age} · {s.gender === 'F' ? 'Girl' : 'Boy'}</p>
                <p className="font-body text-xs text-slate-400 mt-0.5">{s.admNo}</p>
              </div>
              <span className={`font-body text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shrink-0 ${
                s.type === 'Boarding' ? 'bg-mosai-blue-light text-mosai-blue' : 'bg-green-100 text-green-700'
              }`}>
                {s.type === 'Boarding' ? <GraduationCap className="w-3 h-3 inline mr-0.5" /> : <Home className="w-3 h-3 inline mr-0.5" />}
                {s.type}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="font-body text-xs text-slate-400 mb-1">Parent / Guardian</p>
              <p className="font-heading font-bold text-sm text-slate-700">{s.parentName}</p>
              <a href={`tel:${s.parentPhone}`} className="flex items-center gap-1.5 mt-1 font-body text-xs text-mosai-blue hover:underline">
                <Phone className="w-3 h-3" />{s.parentPhone}
              </a>
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="font-body text-sm">No students match your search.</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Enrolled', value: mockStudents.length },
          { label: 'Day Scholars',   value: mockStudents.filter(s => s.type === 'Day Scholar').length },
          { label: 'Boarders',       value: mockStudents.filter(s => s.type === 'Boarding').length },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
            <p className="font-heading font-extrabold text-2xl text-mosai-blue-dark">{s.value}</p>
            <p className="font-body text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
