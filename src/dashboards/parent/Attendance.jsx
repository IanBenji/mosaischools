import { CheckCircle, XCircle, Minus } from 'lucide-react'
import { mockAttendance, mockChild } from './mockData'

const STATUS = { 0: 'weekend', 1: 'present', 2: 'absent' }
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function calendarStart(days) {
  const firstDate = new Date(days[0].date)
  return firstDate.getDay()
}

const pct = Math.round((mockAttendance.termPresent / mockAttendance.termTotal) * 100)

export default function Attendance() {
  const startPad = calendarStart(mockAttendance.days)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800">Attendance</h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">{mockChild.name} · {mockAttendance.month}</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Days Present', value: mockAttendance.termPresent, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
          { label: 'Days Absent',  value: mockAttendance.termTotal - mockAttendance.termPresent, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
          { label: 'Attendance %', value: `${pct}%`, color: pct >= 90 ? 'text-green-600' : 'text-orange-500', bg: pct >= 90 ? 'bg-green-50' : 'bg-orange-50', border: pct >= 90 ? 'border-green-200' : 'border-orange-200' },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl border ${s.border} shadow-sm p-5 text-center`}>
            <p className={`font-heading font-extrabold text-3xl ${s.color}`}>{s.value}</p>
            <p className="font-body text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Attendance bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex justify-between mb-2">
          <p className="font-body text-xs font-semibold text-slate-600">Term Attendance Progress</p>
          <p className="font-body text-xs font-semibold text-slate-600">{pct}%</p>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${pct >= 90 ? 'bg-green-500' : pct >= 75 ? 'bg-orange-400' : 'bg-red-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="font-body text-xs text-slate-400 mt-2">
          {pct >= 90 ? '✓ Excellent attendance — keep it up!' : pct >= 75 ? '⚠ Below recommended 90% threshold.' : '✗ Attendance needs improvement.'}
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-slate-800 mb-4">{mockAttendance.month} Calendar</h3>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_LABELS.map(d => (
            <div key={d} className="text-center font-body text-xs font-semibold text-slate-400 py-1">{d}</div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 gap-1">
          {/* Leading empty cells */}
          {Array.from({ length: startPad }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {mockAttendance.days.map((day) => {
            const d = new Date(day.date).getDate()
            const status = STATUS[day.status]
            return (
              <div
                key={day.date}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-heading font-bold transition-colors ${
                  status === 'present' ? 'bg-green-100 text-green-700' :
                  status === 'absent'  ? 'bg-red-100 text-red-600'    :
                                         'bg-gray-50 text-slate-300'
                }`}
              >
                <span>{d}</span>
                {status === 'present' && <CheckCircle className="w-3 h-3 mt-0.5" />}
                {status === 'absent'  && <XCircle     className="w-3 h-3 mt-0.5" />}
                {status === 'weekend' && <Minus        className="w-3 h-3 mt-0.5 opacity-30" />}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-5 pt-4 border-t border-gray-100">
          {[
            { color: 'bg-green-100', label: 'Present' },
            { color: 'bg-red-100',   label: 'Absent' },
            { color: 'bg-gray-100',  label: 'Weekend / No school' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-md ${l.color}`} />
              <span className="font-body text-xs text-slate-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Term summary */}
      <div className="bg-mosai-blue-dark text-white rounded-2xl p-6">
        <h3 className="font-heading font-bold text-base mb-3">Term Attendance Summary</h3>
        <div className="grid grid-cols-2 gap-4 font-body text-sm">
          <div><span className="text-blue-300">Term:</span> <span className="font-semibold text-white">Term I 2026</span></div>
          <div><span className="text-blue-300">School Days:</span> <span className="font-semibold text-white">{mockAttendance.termTotal}</span></div>
          <div><span className="text-blue-300">Days Present:</span> <span className="font-semibold text-green-300">{mockAttendance.termPresent}</span></div>
          <div><span className="text-blue-300">Days Absent:</span> <span className="font-semibold text-red-300">{mockAttendance.termTotal - mockAttendance.termPresent}</span></div>
        </div>
      </div>
    </div>
  )
}
