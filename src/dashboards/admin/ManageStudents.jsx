import { useState } from 'react'
import { Search, Plus, Pencil, Trash2, Download, X, CheckCircle } from 'lucide-react'
import { mockStudents, CAMPUSES, CLASSES, TYPES, SECTIONS } from './mockData'

function fmtStatus(s) {
  return s === 'Paid'
    ? <span className="font-body text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Paid</span>
    : <span className="font-body text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">Pending</span>
}

function exportCSV(students) {
  const headers = ['Adm No','Name','Age','Gender','Class','Section','Campus','Type','Parent','Phone','Fee Status']
  const rows = students.map(s => [s.admNo,s.name,s.age,s.gender,s.class,s.section,s.campus,s.type,s.parentName,s.parentPhone,s.feeStatus])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type:'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = 'mosai_students.csv'; a.click()
  URL.revokeObjectURL(url)
}

const blankForm = { name:'', age:'', gender:'', class:'Baby Class', section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', parentName:'', parentPhone:'' }

/* Kept out of ManageStudents so it stays one component type between renders.
 *
 * Built inside the page it would be redefined on every keystroke in the search
 * box, and React would replace all four dropdowns rather than update them. A
 * remounted <select> loses focus, which is why an open list used to shut itself
 * the moment anything else on the page changed. */
function SelectFilter({ label, value, opts, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="font-body text-sm px-3 py-2 border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20">
      <option value="All">{label}: All</option>
      {opts.map(o => <option key={o}>{o}</option>)}
    </select>
  )
}

export default function ManageStudents() {
  const [students, setStudents] = useState(mockStudents)
  const [query,    setQuery]    = useState('')
  const [filters,  setFilters]  = useState({ campus:'All', section:'All', class:'All', type:'All' })
  const [modal,    setModal]    = useState(null) // null | 'add' | { student }
  const [form,     setForm]     = useState(blankForm)
  const [saved,    setSaved]    = useState(false)

  function setFilter(k, v) { setFilters(f => ({ ...f, [k]: v })) }

  const visible = students.filter(s => {
    const q = query.toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.admNo.toLowerCase().includes(q) || s.parentName.toLowerCase().includes(q)
    const matchC = filters.campus  === 'All' || s.campus  === filters.campus
    const matchS = filters.section === 'All' || s.section === filters.section
    const matchCl= filters.class   === 'All' || s.class   === filters.class
    const matchT = filters.type    === 'All' || s.type    === filters.type
    return matchQ && matchC && matchS && matchCl && matchT
  })

  function openAdd()  { setForm(blankForm); setSaved(false); setModal('add') }
  function openEdit(s){ setForm({ ...s }); setSaved(false); setModal(s) }
  function closeModal(){ setModal(null); setSaved(false) }

  function deleteStudent(id) {
    if (!window.confirm('Delete this student record?')) return
    setStudents(ss => ss.filter(s => s.id !== id))
  }

  function saveStudent(e) {
    e.preventDefault()
    if (modal === 'add') {
      const newId = Math.max(...students.map(s => s.id)) + 1
      setStudents(ss => [...ss, { ...form, id: newId, admNo: `MOS-NEW-${newId}`, feeStatus:'Pending', admDate: new Date().toISOString().slice(0,10) }])
    } else {
      setStudents(ss => ss.map(s => s.id === modal.id ? { ...s, ...form } : s))
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); closeModal() }, 1000)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Manage Students</h1>
          <p className="font-body text-sm text-zinc-500 mt-0.5">{visible.length} of {students.length} students shown</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(visible)}
            className="flex items-center gap-2 font-heading font-bold text-sm border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 px-4 py-2.5 rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={openAdd}
            className="flex items-center gap-2 font-heading font-bold text-sm bg-mosai-blue-dark hover:bg-mosai-blue text-white px-4 py-2.5 rounded-xl transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, admission no., parent…"
            className="pl-9 pr-4 py-2 font-body text-sm border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 w-72" />
        </div>
        <SelectFilter label="Campus"  value={filters.campus}  opts={CAMPUSES} onChange={v => setFilter('campus',  v)} />
        <SelectFilter label="Section" value={filters.section} opts={SECTIONS} onChange={v => setFilter('section', v)} />
        <SelectFilter label="Class"   value={filters.class}   opts={CLASSES}  onChange={v => setFilter('class',   v)} />
        <SelectFilter label="Type"    value={filters.type}    opts={TYPES}    onChange={v => setFilter('type',    v)} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                {['Adm No','Name','Class','Campus','Type','Parent Contact','Fees','Actions'].map(h => (
                  <th key={h} className="text-left font-heading font-bold text-xs text-zinc-500 uppercase tracking-wide px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {visible.map(s => (
                <tr key={s.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3.5 font-body text-xs text-zinc-400 font-mono">{s.admNo}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-lg flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">
                        {s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <p className="font-heading font-bold text-sm text-zinc-700">{s.name}</p>
                        <p className="font-body text-xs text-zinc-400">Age {s.age} · {s.gender === 'F' ? 'Girl' : 'Boy'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${s.section === 'Nursery' ? 'bg-mosai-blue-light text-mosai-blue' : 'bg-mosai-red-light text-mosai-red'}`}>
                      {s.class}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-body text-xs text-zinc-600">{s.campus.split(' ')[0]}</td>
                  <td className="px-5 py-3.5 font-body text-xs text-zinc-600">{s.type}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-body text-xs text-zinc-600">{s.parentName}</p>
                    <a href={`tel:${s.parentPhone}`} className="font-body text-xs text-mosai-blue hover:underline">{s.parentPhone}</a>
                  </td>
                  <td className="px-5 py-3.5">{fmtStatus(s.feeStatus)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)}
                        className="w-7 h-7 bg-zinc-100 hover:bg-mosai-blue-light rounded-lg flex items-center justify-center text-zinc-500 hover:text-mosai-blue transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteStudent(s.id)}
                        className="w-7 h-7 bg-zinc-100 hover:bg-red-100 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-600 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 font-body text-sm text-zinc-400">No students match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-100">
              <h2 className="font-heading font-extrabold text-lg text-zinc-800">{modal === 'add' ? 'Add New Student' : 'Edit Student'}</h2>
              <button onClick={closeModal} className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-800"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={saveStudent} className="px-7 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {[['Full Name','name','text'],['Age','age','number'],["Parent's Name",'parentName','text'],['Parent Phone','parentPhone','tel']].map(([lbl,name,type]) => (
                  <div key={name}>
                    <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">{lbl}</label>
                    <input type={type} value={form[name] ?? ''} onChange={e => setForm(f=>({...f,[name]:e.target.value}))} required
                      className="w-full font-body text-sm px-3 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue" />
                  </div>
                ))}
                {[['Gender','gender',['M','F']],['Class','class',['Toddler Class','Baby Class','Middle Class','Top Class','P.1','P.2','P.3','P.4','P.5']],['Section','section',['Nursery','Primary']],['Campus','campus',['Nalugala Campus','Bunono Campus']],['Type','type',['Day Scholar','Boarding']]].map(([lbl,name,opts]) => (
                  <div key={name}>
                    <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">{lbl}</label>
                    <select value={form[name] ?? ''} onChange={e => setForm(f=>({...f,[name]:e.target.value}))}
                      className="w-full font-body text-sm px-3 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue">
                      {opts.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button type="submit" className={`w-full flex items-center justify-center gap-2 font-heading font-bold text-sm py-3.5 rounded-2xl transition-all ${saved ? 'bg-green-500 text-white' : 'bg-mosai-blue-dark hover:bg-mosai-blue text-white'}`}>
                {saved ? <><CheckCircle className="w-4 h-4" />Saved!</> : (modal === 'add' ? 'Add Student' : 'Save Changes')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
