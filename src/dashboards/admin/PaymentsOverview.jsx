import { useState } from 'react'
import { Download, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { mockPayments, totalExpected, totalCollected, collectionPct, CAMPUSES, CLASSES, FEE_STRUCTURE, CURRENT_TERM } from './mockData'

function fmt(n) { return 'UGX ' + n.toLocaleString() }

export default function PaymentsOverview() {
  const [campusF, setCampusF] = useState('All')
  const [classF,  setClassF]  = useState('All')
  const [statusF, setStatusF] = useState('All')

  const visible = mockPayments.filter(p => {
    const matchC = campusF === 'All' || p.campus === campusF
    const matchCl= classF  === 'All' || p.class  === classF
    const matchS = statusF === 'All' || p.status  === statusF
    return matchC && matchCl && matchS
  })

  const visibleCollected = visible.reduce((s,p) => s + p.amountPaid, 0)

  function exportCSV() {
    const rows = [['Student','Class','Campus','Type','Amount Due','Amount Paid','Balance','Status','Ref','Date']]
    visible.forEach(p => rows.push([p.studentName,p.class,p.campus.split(' ')[0],p.type,p.amountDue,p.amountPaid,p.balance,p.status,p.ref??'',p.paidDate??'']))
    const csv = rows.map(r=>r.join(',')).join('\n')
    const blob = new Blob([csv],{type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download='mosai_payments.csv'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Payments Overview</h1>
          <p className="font-body text-sm text-zinc-500 mt-0.5">{CURRENT_TERM} · Fee collection dashboard</p>
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-2 font-heading font-bold text-sm border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 px-5 py-2.5 rounded-xl transition-colors self-start">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Expected (Term)',  value:fmt(totalExpected),   sub:`${mockPayments.length} students`,     color:'text-zinc-800',   bg:'bg-zinc-50'    },
          { label:'Collected',        value:fmt(totalCollected),  sub:`${collectionPct}% collection rate`,   color:'text-green-700',  bg:'bg-green-50'   },
          { label:'Outstanding',      value:fmt(totalExpected - totalCollected), sub:`${mockPayments.filter(p=>p.status==='Pending').length} students pending`, color:'text-red-600', bg:'bg-red-50' },
          { label:'Collection Rate',  value:`${collectionPct}%`, sub:'Term II 2026',                         color:'text-mosai-blue', bg:'bg-mosai-blue-light' },
        ].map((s,i) => (
          <div key={i} className={`${s.bg} rounded-2xl border border-zinc-100 shadow-sm p-5`}>
            <p className={`font-heading font-extrabold text-xl ${s.color}`}>{s.value}</p>
            <p className="font-body text-xs font-semibold text-zinc-500 mt-1">{s.label}</p>
            <p className="font-body text-xs text-zinc-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Collection bar */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-mosai-blue" />
            <span className="font-heading font-bold text-sm text-zinc-700">Overall Collection Progress</span>
          </div>
          <span className="font-heading font-extrabold text-lg text-mosai-blue">{collectionPct}%</span>
        </div>
        <div className="h-4 bg-zinc-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-mosai-blue to-green-500 rounded-full transition-all duration-700" style={{width:`${collectionPct}%`}} />
        </div>
        <div className="flex justify-between font-body text-xs text-zinc-400 mt-2">
          <span>0%</span>
          <span>Target: 100% by {new Date().toLocaleDateString('en-UG',{month:'long',year:'numeric'})}</span>
          <span>100%</span>
        </div>
      </div>

      {/* Fee structure reference */}
      <div className="bg-mosai-blue-dark text-white rounded-2xl p-6">
        <h3 className="font-heading font-bold text-base mb-4">Fee Structure Reference — {CURRENT_TERM}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'Nursery Day Scholar',  amount: FEE_STRUCTURE.Nursery['Day Scholar'] },
            { label:'Nursery Boarding',     amount: FEE_STRUCTURE.Nursery.Boarding       },
            { label:'Primary Day Scholar',  amount: FEE_STRUCTURE.Primary['Day Scholar'] },
            { label:'Primary Boarding',     amount: FEE_STRUCTURE.Primary.Boarding       },
          ].map(f => (
            <div key={f.label} className="bg-white/10 rounded-xl p-4 text-center">
              <p className="font-heading font-extrabold text-xl">{fmt(f.amount)}</p>
              <p className="font-body text-xs text-blue-200 mt-1">{f.label}</p>
            </div>
          ))}
        </div>
        <p className="font-body text-xs text-blue-300 mt-3 text-center">All payments via School Pay System only · No cash accepted</p>
      </div>

      {/* Filters + table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex flex-wrap gap-3">
          {[
            { label:'Campus',  v:campusF, set:setCampusF, opts:['All',...CAMPUSES.map(c=>c)] },
            { label:'Class',   v:classF,  set:setClassF,  opts:['All',...CLASSES] },
            { label:'Status',  v:statusF, set:setStatusF, opts:['All','Paid','Pending'] },
          ].map(({label,v,set,opts}) => (
            <select key={label} value={v} onChange={e=>set(e.target.value)}
              className="font-body text-sm px-3 py-2 border border-zinc-200 rounded-xl bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-mosai-blue/20">
              {opts.map(o=><option key={o}>{o}</option>)}
            </select>
          ))}
          <span className="ml-auto font-body text-xs text-zinc-400 self-center">{visible.length} records · {fmt(visibleCollected)} collected</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                {['Student','Class','Campus','Type','Amount Due','Amount Paid','Balance','Status'].map(h=>(
                  <th key={h} className="text-left font-heading font-bold text-xs text-zinc-500 uppercase tracking-wide px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {visible.map(p => (
                <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3.5 font-heading font-bold text-sm text-zinc-700">{p.studentName}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-zinc-600">{p.class}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-zinc-600">{p.campus.split(' ')[0]}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-zinc-600">{p.type}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-zinc-700">{fmt(p.amountDue)}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-green-700 font-semibold">{fmt(p.amountPaid)}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-red-600 font-semibold">{p.balance > 0 ? fmt(p.balance) : '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-body text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ${p.status==='Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.status==='Paid' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}{p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
