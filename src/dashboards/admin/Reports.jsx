import { useState } from 'react'
import { BarChart3, Download, FileText, Users, CreditCard, CalendarDays, TrendingUp, CheckCircle } from 'lucide-react'
import { mockStudents, mockPayments, totalExpected, totalCollected, collectionPct, CURRENT_TERM } from './mockData'

const REPORT_TYPES = [
  { id:'enrollment', icon:Users,       label:'Student Enrollment Report',  desc:'Total students by campus, class, section and type',            color:'text-mosai-blue',  bg:'bg-mosai-blue-light' },
  { id:'attendance', icon:CalendarDays,label:'Attendance Summary Report',  desc:'Monthly attendance rates by class and campus',                  color:'text-purple-600',  bg:'bg-purple-50'        },
  { id:'fees',       icon:CreditCard,  label:'Fee Collection Report',      desc:'Collected vs outstanding fees per campus and class',            color:'text-green-600',   bg:'bg-green-50'         },
  { id:'performance',icon:TrendingUp,  label:'Academic Performance Report',desc:'Term results summary by class and subject area',               color:'text-amber-600',   bg:'bg-amber-50'         },
]

function EnrollmentPreview() {
  const byClass = ['Baby Class','Middle Class','Top Class','P.1','P.2','P.3'].map(cl => ({
    class: cl,
    nalugala: mockStudents.filter(s=>s.class===cl && s.campus==='Nalugala Campus').length,
    bunono:   mockStudents.filter(s=>s.class===cl && s.campus==='Bunono Campus').length,
    total:    mockStudents.filter(s=>s.class===cl).length,
  }))
  const maxTotal = Math.max(...byClass.map(c=>c.total))
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[['Total Students',mockStudents.length],['Nalugala Campus',mockStudents.filter(s=>s.campus==='Nalugala Campus').length],['Bunono Campus',mockStudents.filter(s=>s.campus==='Bunono Campus').length]].map(([l,v])=>(
          <div key={l} className="bg-zinc-50 rounded-xl p-3 text-center">
            <p className="font-heading font-extrabold text-xl text-zinc-800">{v}</p>
            <p className="font-body text-xs text-zinc-500">{l}</p>
          </div>
        ))}
      </div>
      {byClass.map(c=>(
        <div key={c.class} className="flex items-center gap-3">
          <span className="font-body text-xs font-semibold text-zinc-600 w-24 shrink-0">{c.class}</span>
          <div className="flex-1 h-5 bg-zinc-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-mosai-blue rounded-l-full" style={{width:`${(c.nalugala/maxTotal)*100}%`}} />
            <div className="h-full bg-mosai-red" style={{width:`${(c.bunono/maxTotal)*100}%`}} />
          </div>
          <span className="font-heading font-bold text-sm text-zinc-700 w-6 text-right">{c.total}</span>
        </div>
      ))}
      <div className="flex gap-4 pt-2">
        <span className="flex items-center gap-1.5 font-body text-xs text-zinc-400"><span className="w-3 h-3 rounded bg-mosai-blue inline-block" />Nalugala</span>
        <span className="flex items-center gap-1.5 font-body text-xs text-zinc-400"><span className="w-3 h-3 rounded bg-mosai-red inline-block" />Bunono</span>
      </div>
    </div>
  )
}

function FeesPreview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[['Expected','UGX '+totalExpected.toLocaleString(),'text-zinc-700'],['Collected','UGX '+totalCollected.toLocaleString(),'text-green-700'],['Outstanding','UGX '+(totalExpected-totalCollected).toLocaleString(),'text-red-600']].map(([l,v,c])=>(
          <div key={l} className="bg-zinc-50 rounded-xl p-3 text-center">
            <p className={`font-heading font-bold text-base ${c}`}>{v}</p>
            <p className="font-body text-xs text-zinc-400">{l}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between mb-1.5">
          <span className="font-body text-xs text-zinc-500">Collection rate</span>
          <span className="font-heading font-bold text-sm text-green-600">{collectionPct}%</span>
        </div>
        <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{width:`${collectionPct}%`}} />
        </div>
      </div>
      <p className="font-body text-xs text-zinc-400">{CURRENT_TERM} · {mockPayments.filter(p=>p.status==='Paid').length}/{mockPayments.length} students have paid</p>
    </div>
  )
}

export default function Reports() {
  const [selected, setSelected] = useState(null)
  const [generated, setGenerated] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [dateFrom,  setDateFrom]  = useState('2026-05-25')
  const [dateTo,    setDateTo]    = useState('2026-08-15')

  function generate() {
    if (!selected) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setGenerated(true) }, 1200)
  }

  function downloadReport(format) {
    alert(`Downloading ${selected} report as ${format}. In production this would generate a real file.`)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Reports</h1>
        <p className="font-body text-sm text-zinc-500 mt-0.5">Generate and download school reports for {CURRENT_TERM}.</p>
      </div>

      {/* Report type selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REPORT_TYPES.map(r => {
          const Icon = r.icon
          const isSelected = selected === r.id
          return (
            <button key={r.id} onClick={() => { setSelected(r.id); setGenerated(false) }}
              className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${isSelected ? 'border-mosai-blue bg-mosai-blue-light shadow-md' : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm'}`}>
              <div className={`w-11 h-11 ${r.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${r.color}`} />
              </div>
              <div>
                <p className={`font-heading font-bold text-sm ${isSelected ? 'text-mosai-blue-dark' : 'text-zinc-800'}`}>{r.label}</p>
                <p className="font-body text-xs text-zinc-500 mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
              {isSelected && <CheckCircle className="w-4 h-4 text-mosai-blue ml-auto shrink-0" />}
            </button>
          )
        })}
      </div>

      {/* Date range (for attendance) */}
      {selected === 'attendance' && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">From</label>
            <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}
              className="font-body text-sm px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mosai-blue/20" />
          </div>
          <div>
            <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">To</label>
            <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}
              className="font-body text-sm px-4 py-2.5 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mosai-blue/20" />
          </div>
        </div>
      )}

      {/* Generate button */}
      <button onClick={generate} disabled={!selected || loading}
        className={`flex items-center gap-2 font-heading font-bold text-base px-8 py-3.5 rounded-2xl shadow transition-all disabled:opacity-40 ${loading ? 'bg-zinc-300 text-zinc-600' : 'bg-mosai-blue-dark hover:bg-mosai-blue text-white'}`}>
        {loading ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z"/></svg>Generating…</> : <><BarChart3 className="w-5 h-5" />Generate Report</>}
      </button>

      {/* Report preview */}
      {generated && selected && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-mosai-blue" />
              <h3 className="font-heading font-bold text-base text-zinc-800">{REPORT_TYPES.find(r=>r.id===selected)?.label}</h3>
              <span className="font-body text-xs text-zinc-400">Generated {new Date().toLocaleString('en-UG')}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => downloadReport('PDF')} className="flex items-center gap-1.5 font-heading font-bold text-xs bg-mosai-red text-white px-3 py-2 rounded-lg hover:bg-mosai-red-dark transition-colors">
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
              <button onClick={() => downloadReport('Excel')} className="flex items-center gap-1.5 font-heading font-bold text-xs bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> Excel
              </button>
            </div>
          </div>
          <div className="p-6">
            {selected === 'enrollment'  && <EnrollmentPreview />}
            {selected === 'fees'        && <FeesPreview />}
            {(selected === 'attendance' || selected === 'performance') && (
              <p className="font-body text-sm text-zinc-500 text-center py-8">
                Full {REPORT_TYPES.find(r=>r.id===selected)?.label} would be generated here in production with real data from the database.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
