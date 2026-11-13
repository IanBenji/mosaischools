import { CreditCard, AlertCircle, CheckCircle, Clock, Copy } from 'lucide-react'
import { mockPayments, mockChild } from './mockData'
import { useState } from 'react'

function formatUGX(n) {
  return 'UGX ' + n.toLocaleString()
}

export default function Payments() {
  const [copied, setCopied] = useState(false)

  function copyCode() {
    navigator.clipboard.writeText(mockPayments.schoolPayCode).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800">Payments</h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">{mockChild.name} · {mockChild.type} · {mockChild.section} Section</p>
      </div>

      {/* Outstanding balance */}
      <div className="bg-mosai-red text-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-body text-xs text-red-200 uppercase tracking-wide">Outstanding Balance</p>
          <p className="font-heading font-extrabold text-3xl text-white">{formatUGX(mockPayments.outstanding.amount)}</p>
          <p className="font-body text-sm text-red-200 mt-1">{mockPayments.outstanding.term} · Due {mockPayments.outstanding.due}</p>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-center">
          <p className="font-body text-xs text-red-200">Fee type</p>
          <p className="font-heading font-bold text-sm text-white">{mockPayments.type}</p>
        </div>
      </div>

      {/* School Pay code */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-slate-800 mb-4">Your School Pay Code</h3>
        <div className="flex items-center gap-3 bg-mosai-blue-light rounded-xl p-4">
          <div className="flex-1">
            <p className="font-body text-xs text-mosai-blue mb-1">Unique payment code for {mockChild.name}</p>
            <p className="font-heading font-extrabold text-2xl text-mosai-blue-dark tracking-widest">{mockPayments.schoolPayCode}</p>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark transition-colors"
          >
            {copied ? <><CheckCircle className="w-4 h-4 text-green-600" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
          </button>
        </div>

        {/* School Pay instructions */}
        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-heading font-bold text-sm text-amber-700">All payments via School Pay System ONLY</p>
              <p className="font-body text-xs text-amber-600 mt-0.5">
                Do NOT pay cash to any staff member. Cash is not accepted at school.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-heading font-bold text-sm text-slate-700 mb-3">How to Pay via School Pay</p>
            <ol className="space-y-2">
              {[
                'Open School Pay on your mobile money or bank app',
                'Select "Pay School Fees"',
                `Enter your child's unique code: ${mockPayments.schoolPayCode}`,
                `Enter the amount: ${formatUGX(mockPayments.outstanding.amount)}`,
                'Confirm and save your receipt',
                'Your payment will be reflected within 24 hours',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-mosai-blue text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <span className="font-body text-sm text-slate-600">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Fee structure reminder */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-slate-800 mb-4">Fee Structure Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left font-heading font-bold text-xs text-slate-500 uppercase tracking-wide pb-3">Section</th>
                <th className="text-right font-heading font-bold text-xs text-slate-500 uppercase tracking-wide pb-3">Day Scholar</th>
                <th className="text-right font-heading font-bold text-xs text-slate-500 uppercase tracking-wide pb-3">Boarding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { section: 'Nursery (Baby, Middle, Top Class)', day: 500000, board: 700000 },
                { section: 'Primary (P.1 – P.4)',               day: 500000, board: 700000 },
              ].map(row => (
                <tr key={row.section} className={row.section.includes(mockChild.section.split(' ')[0]) ? 'bg-mosai-blue-light' : ''}>
                  <td className="py-3 font-body text-sm text-slate-700 pr-4">{row.section}</td>
                  <td className="py-3 text-right font-heading font-bold text-slate-800">{formatUGX(row.day)}</td>
                  <td className="py-3 text-right font-heading font-bold text-slate-800">{formatUGX(row.board)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-xs text-slate-400 mt-3">Fees per term · All amounts in Uganda Shillings (UGX)</p>
      </div>

      {/* Payment history */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-slate-800 mb-4">Payment History</h3>
        <div className="space-y-3">
          {mockPayments.history.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-slate-700">{p.term}</p>
                  <p className="font-body text-xs text-slate-400">{p.date} · Ref: {p.ref}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-sm text-slate-800">{formatUGX(p.amount)}</p>
                <span className="font-body text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{p.status}</span>
              </div>
            </div>
          ))}

          {/* Outstanding row */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <Clock className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-slate-700">{mockPayments.outstanding.term}</p>
                <p className="font-body text-xs text-slate-400">Due {mockPayments.outstanding.due}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-heading font-bold text-sm text-slate-800">{formatUGX(mockPayments.outstanding.amount)}</p>
              <span className="font-body text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
