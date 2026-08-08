import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users, UserCheck, ClipboardList, TrendingUp,
  CheckCircle, XCircle, Clock, ArrowRight,
  Building2, GraduationCap,
} from 'lucide-react'
import {
  mockStudents, mockTeachers, mockAdmissions, mockPayments,
  totalCollected, collectionPct,
  campusBreakdown, classDistribution, CURRENT_TERM,
} from './mockData'

function fmt(n) { return 'UGX ' + n.toLocaleString() }

const recentPayments = [...mockPayments]
  .sort((a, b) => (b.paidDate ?? '').localeCompare(a.paidDate ?? ''))
  .filter(p => p.status === 'Paid')
  .slice(0, 6)

export default function AdminDashboard() {
  const [admissions, setAdmissions] = useState(mockAdmissions)

  function decide(id, status) {
    setAdmissions(a => a.map(x => x.id === id ? { ...x, status } : x))
  }

  const pending = admissions.filter(a => a.status === 'Pending')

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Admin Dashboard</h1>
          <p className="font-body text-sm text-zinc-500 mt-0.5">{CURRENT_TERM} · Nalugala & Bunono Campuses</p>
        </div>
        <div className="flex items-center gap-2 bg-mosai-blue-dark text-white rounded-xl px-4 py-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="font-body text-sm font-semibold">Live Data</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon:Users,       label:'Total Students',    value:mockStudents.length,    sub:'Across both campuses',           color:'text-mosai-blue',   bg:'bg-mosai-blue-light',  to:'/admin/students'   },
          { icon:UserCheck,   label:'Teachers & Staff',  value:mockTeachers.length,    sub:'Active staff members',           color:'text-purple-600',   bg:'bg-purple-50',          to:'/admin/teachers'   },
          { icon:ClipboardList,label:'Pending Admissions',value:pending.length,         sub:'Awaiting decision',              color:'text-amber-600',    bg:'bg-amber-50',           to:'/admin/admissions' },
          { icon:TrendingUp,  label:'Fee Collection',    value:`${collectionPct}%`,    sub:fmt(totalCollected) + ' received', color:'text-green-600',   bg:'bg-green-50',           to:'/admin/payments'   },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <Link key={i} to={s.to} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 hover:shadow-md transition-shadow group">
              <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="font-heading font-extrabold text-2xl text-zinc-800">{s.value}</p>
              <p className="font-body text-xs font-semibold text-zinc-500 mt-0.5">{s.label}</p>
              <p className="font-body text-xs text-zinc-400 mt-0.5">{s.sub}</p>
            </Link>
          )
        })}
      </div>

      {/* Campus + Class breakdown row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Campus breakdown */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
          <h3 className="font-heading font-bold text-base text-zinc-800 flex items-center gap-2 mb-5">
            <Building2 className="w-4 h-4 text-mosai-blue" /> Students by Campus
          </h3>
          {campusBreakdown.map((c, i) => {
            const pct = Math.round((c.total / mockStudents.length) * 100)
            const isFirst = i === 0
            return (
              <div key={c.campus} className="mb-5 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${isFirst ? 'bg-mosai-blue' : 'bg-mosai-red'}`} />
                    <span className="font-body text-sm font-semibold text-zinc-700">{c.campus}</span>
                  </div>
                  <span className="font-heading font-bold text-sm text-zinc-800">{c.total} <span className="font-body font-normal text-zinc-400 text-xs">({pct}%)</span></span>
                </div>
                <div className="h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isFirst ? 'bg-mosai-blue' : 'bg-mosai-red'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex gap-4 mt-1.5">
                  <span className="font-body text-xs text-zinc-400">Nursery: <strong className="text-zinc-600">{c.nursery}</strong></span>
                  <span className="font-body text-xs text-zinc-400">Primary: <strong className="text-zinc-600">{c.primary}</strong></span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Class distribution */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
          <h3 className="font-heading font-bold text-base text-zinc-800 flex items-center gap-2 mb-5">
            <GraduationCap className="w-4 h-4 text-mosai-blue" /> Class Distribution
          </h3>
          <div className="space-y-3">
            {classDistribution.map(cl => {
              const max = Math.max(...classDistribution.map(c => c.total))
              const pct = Math.round((cl.total / max) * 100)
              const isNursery = ['Baby Class','Middle Class','Top Class'].includes(cl.class)
              return (
                <div key={cl.class} className="flex items-center gap-3">
                  <span className="font-body text-xs font-semibold text-zinc-600 w-24 shrink-0">{cl.class}</span>
                  <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isNursery ? 'bg-mosai-blue' : 'bg-mosai-red'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-heading font-bold text-sm text-zinc-700 w-6 text-right">{cl.total}</span>
                </div>
              )
            })}
          </div>
          <div className="flex gap-4 mt-4 pt-3 border-t border-zinc-100">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-mosai-blue rounded-sm" /><span className="font-body text-xs text-zinc-500">Nursery</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-mosai-red rounded-sm" /><span className="font-body text-xs text-zinc-500">Primary</span></div>
          </div>
        </div>
      </div>

      {/* Payments + Pending admissions row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Recent payments */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
            <h3 className="font-heading font-bold text-base text-zinc-800">Recent Payments</h3>
            <Link to="/admin/payments" className="font-body text-xs font-semibold text-mosai-blue hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {recentPayments.map(p => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-3.5">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-zinc-700 truncate">{p.studentName}</p>
                  <p className="font-body text-xs text-zinc-400">{p.class} · {p.campus.split(' ')[0]} · {p.ref}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading font-bold text-sm text-zinc-800">{fmt(p.amountPaid)}</p>
                  <span className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending admissions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
            <h3 className="font-heading font-bold text-base text-zinc-800">Pending Admissions</h3>
            <span className="font-body text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">{pending.length} new</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
            {pending.map(a => (
              <div key={a.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-heading font-bold text-sm text-zinc-800">{a.childName}</p>
                    <p className="font-body text-xs text-zinc-400">{a.classApplied} · {a.campus.split(' ')[0]} · {a.type}</p>
                  </div>
                  <span className="font-body text-[10px] text-zinc-400 whitespace-nowrap">{a.appliedDate}</span>
                </div>
                <p className="font-body text-xs text-zinc-500 mb-3">Parent: {a.parentName}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => decide(a.id, 'Approved')}
                    className="flex items-center gap-1 font-heading font-bold text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => decide(a.id, 'Rejected')}
                    className="flex items-center gap-1 font-heading font-bold text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
            {pending.length === 0 && (
              <div className="text-center py-10 text-zinc-400">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="font-body text-sm">All admissions processed</p>
              </div>
            )}
          </div>
          <div className="border-t border-zinc-100 px-5 py-3">
            <Link to="/admin/admissions" className="font-body text-xs font-semibold text-mosai-blue hover:underline flex items-center gap-1">
              Manage all admissions <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
