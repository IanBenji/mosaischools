import { Download, Star } from 'lucide-react'
import { mockReports, mockChild } from './mockData'

function gradeColor(g) {
  if (g.startsWith('A')) return 'text-green-600 bg-green-50'
  if (g.startsWith('B')) return 'text-blue-600 bg-blue-50'
  if (g.startsWith('C')) return 'text-orange-500 bg-orange-50'
  return 'text-red-500 bg-red-50'
}

function ScoreBar({ score }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${score >= 80 ? 'bg-green-500' : score >= 65 ? 'bg-blue-500' : 'bg-orange-400'}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="font-body text-xs font-semibold text-slate-600 w-8 text-right">{score}%</span>
    </div>
  )
}

export default function Reports() {
  const report = mockReports[0]
  const avg = Math.round(report.subjects.reduce((s, sub) => s + sub.score, 0) / report.subjects.length)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-800">Reports</h1>
          <p className="font-body text-sm text-slate-500 mt-0.5">{mockChild.name} · {report.term}</p>
        </div>
        <button
          onClick={() => alert('PDF download would be triggered here')}
          className="flex items-center gap-2 font-heading font-bold text-sm bg-mosai-blue-dark hover:bg-mosai-blue text-white px-4 py-2.5 rounded-xl transition-colors duration-200 shadow-sm"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* Average card */}
      <div className="bg-mosai-blue-dark text-white rounded-2xl p-6 flex items-center gap-6">
        <div className="w-20 h-20 bg-white/10 rounded-2xl flex flex-col items-center justify-center shrink-0">
          <span className="font-heading font-extrabold text-3xl">{avg}%</span>
          <span className="font-body text-xs text-blue-200 mt-0.5">Average</span>
        </div>
        <div>
          <p className="font-heading font-extrabold text-xl">{mockChild.name}</p>
          <p className="font-body text-sm text-blue-200 mt-1">{report.term} · {mockChild.class} · {mockChild.campus}</p>
          <p className="font-body text-sm text-blue-200">Issued: {report.issued}</p>
        </div>
        <div className="ml-auto flex">
          {[1, 2, 3, 4, 5].map(s => (
            <Star key={s} className={`w-5 h-5 ${avg >= s * 20 ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
          ))}
        </div>
      </div>

      {/* Subject table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-heading font-bold text-base text-slate-800">Subject Results</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {report.subjects.map((sub, i) => (
            <div key={i} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-heading font-bold text-sm text-slate-700">{sub.name}</p>
                  <p className="font-body text-xs text-slate-400 mt-0.5">{sub.comment}</p>
                </div>
                <span className={`font-heading font-extrabold text-sm px-3 py-1 rounded-full shrink-0 ${gradeColor(sub.grade)}`}>
                  {sub.grade}
                </span>
              </div>
              <ScoreBar score={sub.score} />
            </div>
          ))}
        </div>
      </div>

      {/* Teacher comment */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-slate-800 mb-4">Class Teacher's Comment</h3>
        <blockquote className="border-l-4 border-mosai-blue pl-4">
          <p className="font-body text-sm text-slate-600 leading-relaxed italic">"{report.teacherComment}"</p>
          <footer className="mt-3">
            <p className="font-heading font-bold text-sm text-slate-700">{report.classTeacher}</p>
            <p className="font-body text-xs text-slate-400">Class Teacher · {mockChild.class}</p>
          </footer>
        </blockquote>
      </div>

      {/* Past reports list */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
        <h3 className="font-heading font-bold text-sm text-slate-700 mb-3">All Report Cards</h3>
        {mockReports.map((r, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-200 last:border-0">
            <div>
              <p className="font-body text-sm font-semibold text-slate-700">{r.term}</p>
              <p className="font-body text-xs text-slate-400">Issued {r.issued}</p>
            </div>
            <button
              onClick={() => alert('PDF download')}
              className="flex items-center gap-1.5 font-body text-xs font-semibold text-mosai-blue hover:underline"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
