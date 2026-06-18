import { useState } from 'react'
import { CheckCircle, XCircle, Save, Users } from 'lucide-react'
import { mockStudents, todayAttendanceDefaults, mockTeacher } from './mockData'

export default function MarkAttendance() {
  const today = new Date().toISOString().slice(0, 10)
  const [date,       setDate]       = useState(today)
  const [attendance, setAttendance] = useState({ ...todayAttendanceDefaults })
  const [saved,      setSaved]      = useState(false)

  const presentCount = Object.values(attendance).filter(Boolean).length
  const absentCount  = mockStudents.length - presentCount

  function toggle(id) {
    setSaved(false)
    setAttendance(a => ({ ...a, [id]: !a[id] }))
  }

  function markAll(val) {
    setSaved(false)
    const all = {}
    mockStudents.forEach(s => { all[s.id] = val })
    setAttendance(all)
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800">Mark Attendance</h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">{mockTeacher.class} · {mockTeacher.campus}</p>
      </div>

      {/* Date + summary row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 px-4 py-2.5 flex items-center gap-3">
          <label className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => { setDate(e.target.value); setSaved(false) }}
            max={today}
            className="flex-1 font-body text-sm text-slate-700 focus:outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-2.5 text-center">
            <p className="font-heading font-extrabold text-xl text-green-700">{presentCount}</p>
            <p className="font-body text-xs text-green-600">Present</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-2.5 text-center">
            <p className="font-heading font-extrabold text-xl text-red-600">{absentCount}</p>
            <p className="font-body text-xs text-red-500">Absent</p>
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      <div className="flex items-center gap-3">
        <span className="font-body text-xs font-semibold text-slate-500 uppercase tracking-wide">Bulk:</span>
        <button onClick={() => markAll(true)}
          className="flex items-center gap-1.5 font-heading font-bold text-xs bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg transition-colors">
          <CheckCircle className="w-3.5 h-3.5" /> Mark All Present
        </button>
        <button onClick={() => markAll(false)}
          className="flex items-center gap-1.5 font-heading font-bold text-xs bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors">
          <XCircle className="w-3.5 h-3.5" /> Mark All Absent
        </button>
      </div>

      {/* Student list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-mosai-blue" />
          <span className="font-heading font-bold text-sm text-slate-700">{mockStudents.length} Students</span>
        </div>
        <div className="divide-y divide-gray-100">
          {mockStudents.map((s, i) => {
            const present = attendance[s.id]
            return (
              <div key={s.id} className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${present ? 'bg-white' : 'bg-red-50/40'}`}>
                <span className="font-body text-xs text-slate-400 w-5 shrink-0">{i + 1}</span>
                <div className="w-9 h-9 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-xl flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">
                  {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-slate-700">{s.name}</p>
                  <p className="font-body text-xs text-slate-400">{s.type} · {s.admNo}</p>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => toggle(s.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-bold text-xs transition-all duration-150 ${
                    present
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  {present
                    ? <><CheckCircle className="w-4 h-4" /> Present</>
                    : <><XCircle    className="w-4 h-4" /> Absent</>
                  }
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-body text-xs text-slate-400">
          {presentCount} present · {absentCount} absent · {mockStudents.length} total
        </p>
        <button
          onClick={save}
          className={`flex items-center gap-2 font-heading font-bold text-sm px-7 py-3 rounded-xl shadow transition-all duration-200 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-mosai-blue-dark hover:bg-mosai-blue text-white'
          }`}
        >
          {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Attendance</>}
        </button>
      </div>
    </div>
  )
}
