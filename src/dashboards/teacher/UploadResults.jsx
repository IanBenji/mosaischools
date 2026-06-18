import { useState } from 'react'
import { Save, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { mockStudents, mockTeacher, NURSERY_SUBJECTS, TERMS, mockExistingResults } from './mockData'

function letterGrade(score) {
  if (score >= 90) return 'A+'
  if (score >= 85) return 'A'
  if (score >= 80) return 'A-'
  if (score >= 75) return 'B+'
  if (score >= 70) return 'B'
  if (score >= 65) return 'B-'
  if (score >= 60) return 'C+'
  if (score >= 55) return 'C'
  return 'D'
}

function gradeColor(g) {
  if (g.startsWith('A')) return 'text-green-600'
  if (g.startsWith('B')) return 'text-blue-600'
  if (g.startsWith('C')) return 'text-orange-500'
  return 'text-red-500'
}

export default function UploadResults() {
  const subjects = NURSERY_SUBJECTS
  const [term,     setTerm]     = useState(TERMS[0])
  const [saved,    setSaved]    = useState(false)
  const [expanded, setExpanded] = useState(null)

  // Scores keyed by studentId → subject → score
  const [scores, setScores] = useState(() => {
    const existing = mockExistingResults[TERMS[0]] ?? {}
    return Object.fromEntries(
      mockStudents.map(s => [
        s.id,
        {
          ...(existing[s.id] ?? Object.fromEntries(subjects.map(sub => [sub, '']))),
          comment: existing[s.id]?.comment ?? '',
        }
      ])
    )
  })

  function handleScore(studentId, subject, val) {
    const num = Math.min(100, Math.max(0, Number(val.replace(/\D/g, ''))))
    setSaved(false)
    setScores(sc => ({
      ...sc,
      [studentId]: { ...sc[studentId], [subject]: val === '' ? '' : num }
    }))
  }

  function handleComment(studentId, val) {
    setSaved(false)
    setScores(sc => ({ ...sc, [studentId]: { ...sc[studentId], comment: val } }))
  }

  function handleTermChange(t) {
    setTerm(t)
    setSaved(false)
    const existing = mockExistingResults[t] ?? {}
    setScores(Object.fromEntries(
      mockStudents.map(s => [
        s.id,
        {
          ...(existing[s.id] ?? Object.fromEntries(subjects.map(sub => [sub, '']))),
          comment: existing[s.id]?.comment ?? '',
        }
      ])
    ))
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-800">Upload Results</h1>
          <p className="font-body text-sm text-slate-500 mt-0.5">{mockTeacher.class} · {mockTeacher.campus}</p>
        </div>
        {/* Term selector */}
        <select
          value={term}
          onChange={e => handleTermChange(e.target.value)}
          className="font-heading font-bold text-sm px-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue"
        >
          {TERMS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Subjects legend */}
      <div className="flex flex-wrap gap-2">
        {subjects.map(sub => (
          <span key={sub} className="font-body text-xs px-3 py-1 bg-mosai-blue-light text-mosai-blue rounded-full">{sub}</span>
        ))}
      </div>

      {/* Student results — accordion */}
      <div className="space-y-3">
        {mockStudents.map(s => {
          const studentScores = scores[s.id] ?? {}
          const filled = subjects.filter(sub => studentScores[sub] !== '' && studentScores[sub] !== undefined).length
          const avg = filled > 0
            ? Math.round(subjects.reduce((acc, sub) => acc + (Number(studentScores[sub]) || 0), 0) / subjects.length)
            : null
          const isOpen = expanded === s.id

          return (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Accordion header */}
              <button
                onClick={() => setExpanded(isOpen ? null : s.id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-xl flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
                  {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-slate-800">{s.name}</p>
                  <p className="font-body text-xs text-slate-400">{filled}/{subjects.length} subjects entered</p>
                </div>
                {avg !== null && (
                  <div className="text-right mr-2">
                    <p className={`font-heading font-extrabold text-lg ${gradeColor(letterGrade(avg))}`}>{avg}%</p>
                    <p className={`font-body text-xs ${gradeColor(letterGrade(avg))}`}>{letterGrade(avg)}</p>
                  </div>
                )}
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              {/* Expanded inputs */}
              {isOpen && (
                <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {subjects.map(sub => {
                      const val = studentScores[sub] ?? ''
                      const grade = val !== '' ? letterGrade(Number(val)) : null
                      return (
                        <div key={sub}>
                          <label className="block font-body text-xs font-semibold text-slate-500 mb-1 truncate" title={sub}>{sub}</label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={val}
                              onChange={e => handleScore(s.id, sub, e.target.value)}
                              placeholder="0–100"
                              className="w-full font-body text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue pr-10"
                            />
                            {grade && (
                              <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 font-heading font-bold text-xs ${gradeColor(grade)}`}>
                                {grade}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-slate-500 mb-1">Teacher's Comment</label>
                    <textarea
                      rows={2}
                      value={studentScores.comment ?? ''}
                      onChange={e => handleComment(s.id, e.target.value)}
                      placeholder="e.g. Excellent effort this term. Shows strong creativity and curiosity."
                      className="w-full font-body text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Save */}
      <div className="flex items-center justify-between pt-2">
        <p className="font-body text-xs text-slate-400">
          {term} results for {mockTeacher.class}
        </p>
        <button
          onClick={save}
          className={`flex items-center gap-2 font-heading font-bold text-sm px-8 py-3.5 rounded-xl shadow transition-all duration-200 ${
            saved ? 'bg-green-500 text-white' : 'bg-mosai-blue-dark hover:bg-mosai-blue text-white'
          }`}
        >
          {saved ? <><CheckCircle className="w-4 h-4" /> Results Saved!</> : <><Save className="w-4 h-4" /> Save &amp; Submit</>}
        </button>
      </div>
    </div>
  )
}
