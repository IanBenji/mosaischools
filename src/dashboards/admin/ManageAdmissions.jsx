import { useState } from 'react'
import { CheckCircle, XCircle, Clock, Eye, X, FileText } from 'lucide-react'
import { mockAdmissions } from './mockData'

const statusStyle = {
  Pending:  { badge:'bg-amber-100 text-amber-700', icon:Clock,       dot:'bg-amber-400' },
  Approved: { badge:'bg-green-100 text-green-700', icon:CheckCircle, dot:'bg-green-500' },
  Rejected: { badge:'bg-red-100 text-red-600',     icon:XCircle,     dot:'bg-red-500'   },
}

export default function ManageAdmissions() {
  const [admissions, setAdmissions] = useState(mockAdmissions)
  const [filter, setFilter] = useState('All')
  const [detail, setDetail] = useState(null)

  function decide(id, status) {
    setAdmissions(a => a.map(x => x.id === id ? { ...x, status } : x))
    if (detail?.id === id) setDetail(d => ({ ...d, status }))
  }

  const tabs = ['All', 'Pending', 'Approved', 'Rejected']
  const visible = filter === 'All' ? admissions : admissions.filter(a => a.status === filter)
  const counts = Object.fromEntries(tabs.map(t => [t, t === 'All' ? admissions.length : admissions.filter(a => a.status === t).length]))

  const tabColor = { All:'bg-zinc-800 text-white', Pending:'bg-amber-100 text-amber-700', Approved:'bg-green-100 text-green-700', Rejected:'bg-red-100 text-red-600' }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-5">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Manage Admissions</h1>
        <p className="font-body text-sm text-zinc-500 mt-0.5">Review and process student applications for both campuses.</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-bold transition-all ${filter === t ? tabColor[t] : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
            {t}
            <span className={`text-xs font-normal px-1.5 py-0.5 rounded-full ${filter === t ? 'bg-white/20' : 'bg-white text-zinc-500'}`}>{counts[t]}</span>
          </button>
        ))}
      </div>

      {/* Applications list */}
      <div className="space-y-3">
        {visible.map(a => {
          const s = statusStyle[a.status]
          const Icon = s.icon
          return (
            <div key={a.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading font-bold text-base text-zinc-800">{a.childName}</h3>
                    <span className={`font-body text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${s.badge}`}>
                      <Icon className="w-3 h-3" />{a.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="font-body text-xs text-zinc-500">Age {a.childAge} · <strong>{a.classApplied}</strong></span>
                    <span className="font-body text-xs text-zinc-500">{a.campus}</span>
                    <span className="font-body text-xs text-zinc-500">{a.type}</span>
                    <span className="font-body text-xs text-zinc-500">Applied: {a.appliedDate}</span>
                  </div>
                  <p className="font-body text-xs text-zinc-400 mt-1">Parent: {a.parentName} · {a.parentPhone}</p>
                </div>

                {/* Documents */}
                <div className="flex flex-wrap gap-1.5">
                  {a.documents.map(doc => (
                    <span key={doc} className="font-body text-[10px] font-semibold px-2 py-1 bg-zinc-100 text-zinc-600 rounded-lg flex items-center gap-1">
                      <FileText className="w-3 h-3" />{doc}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setDetail(a)}
                    className="flex items-center gap-1.5 font-heading font-bold text-xs bg-zinc-100 hover:bg-mosai-blue-light text-zinc-600 hover:text-mosai-blue px-3 py-2 rounded-lg transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  {a.status === 'Pending' && (
                    <>
                      <button onClick={() => decide(a.id, 'Approved')}
                        className="flex items-center gap-1.5 font-heading font-bold text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg transition-colors">
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => decide(a.id, 'Rejected')}
                        className="flex items-center gap-1.5 font-heading font-bold text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg transition-colors">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {visible.length === 0 && (
          <div className="text-center py-16 text-zinc-400">
            <CheckCircle className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="font-body text-sm">No {filter.toLowerCase()} applications found.</p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-100">
              <h2 className="font-heading font-extrabold text-lg text-zinc-800">Application — {detail.childName}</h2>
              <button onClick={() => setDetail(null)} className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-800"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-7 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[['Child Name',detail.childName],['Age',detail.childAge],['Class Applied',detail.classApplied],['Campus',detail.campus],['Enrolment Type',detail.type],['Applied On',detail.appliedDate]].map(([l,v]) => (
                  <div key={l} className="bg-zinc-50 rounded-xl px-4 py-3">
                    <p className="font-body text-xs text-zinc-400">{l}</p>
                    <p className="font-heading font-bold text-sm text-zinc-700 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-50 rounded-xl px-4 py-3">
                <p className="font-body text-xs text-zinc-400 mb-2">Parent / Guardian</p>
                <p className="font-heading font-bold text-sm text-zinc-700">{detail.parentName}</p>
                <p className="font-body text-xs text-zinc-500 mt-0.5">{detail.parentPhone} · {detail.email}</p>
              </div>
              <div>
                <p className="font-body text-xs text-zinc-400 mb-2">Documents Submitted</p>
                <div className="flex flex-wrap gap-2">
                  {detail.documents.map(d => (
                    <span key={d} className="font-body text-xs font-semibold px-3 py-1.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />{d}
                    </span>
                  ))}
                </div>
              </div>
              {detail.status === 'Pending' && (
                <div className="flex gap-3 pt-2">
                  <button onClick={() => decide(detail.id, 'Approved')}
                    className="flex-1 flex items-center justify-center gap-2 font-heading font-bold text-sm bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl transition-colors">
                    <CheckCircle className="w-4 h-4" /> Approve Application
                  </button>
                  <button onClick={() => decide(detail.id, 'Rejected')}
                    className="flex-1 flex items-center justify-center gap-2 font-heading font-bold text-sm bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition-colors">
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
              {detail.status !== 'Pending' && (
                <div className={`text-center py-3 rounded-2xl font-heading font-bold text-sm ${detail.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  Application {detail.status}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
