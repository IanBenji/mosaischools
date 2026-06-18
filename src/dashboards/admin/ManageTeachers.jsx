import { useState } from 'react'
import { Search, Plus, Pencil, Trash2, X, CheckCircle, Phone, Mail } from 'lucide-react'
import { mockTeachers, CAMPUSES, CLASSES } from './mockData'

const ROLES = ['Class Teacher','PE Teacher','Head Teacher','Deputy Head','Music Teacher','Computer Teacher']

const blankForm = { name:'', role:'Class Teacher', class:'Baby Class', section:'Nursery', campus:'Nalugala Campus', phone:'', email:'', qualification:'' }

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState(mockTeachers)
  const [query,    setQuery]    = useState('')
  const [modal,    setModal]    = useState(null)
  const [form,     setForm]     = useState(blankForm)
  const [saved,    setSaved]    = useState(false)
  const [campusF,  setCampusF]  = useState('All')

  const visible = teachers.filter(t => {
    const q = t.name.toLowerCase().includes(query.toLowerCase()) || t.staffId.toLowerCase().includes(query.toLowerCase())
    const c = campusF === 'All' || t.campus === campusF
    return q && c
  })

  function openAdd()  { setForm(blankForm); setSaved(false); setModal('add') }
  function openEdit(t){ setForm({ ...t }); setSaved(false); setModal(t) }

  function remove(id) {
    if (!window.confirm('Remove this staff member?')) return
    setTeachers(ts => ts.filter(t => t.id !== id))
  }

  function save(e) {
    e.preventDefault()
    if (modal === 'add') {
      const newId = Math.max(...teachers.map(t => t.id)) + 1
      setTeachers(ts => [...ts, { ...form, id: newId, staffId: `MST-NEW-${newId}` }])
    } else {
      setTeachers(ts => ts.map(t => t.id === modal.id ? { ...t, ...form } : t))
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); setModal(null) }, 1000)
  }

  const campusCounts = CAMPUSES.map(c => ({ campus: c, count: teachers.filter(t => t.campus === c).length }))

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Manage Teachers</h1>
          <p className="font-body text-sm text-zinc-500 mt-0.5">{teachers.length} staff members across both campuses</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 font-heading font-bold text-sm bg-mosai-blue-dark hover:bg-mosai-blue text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm self-start">
          <Plus className="w-4 h-4" /> Add Staff Member
        </button>
      </div>

      {/* Campus summary */}
      <div className="grid grid-cols-2 gap-4">
        {campusCounts.map((c, i) => (
          <div key={c.campus} className={`rounded-2xl p-5 border ${i === 0 ? 'bg-mosai-blue-dark border-mosai-blue text-white' : 'bg-white border-zinc-100'}`}>
            <p className={`font-heading font-extrabold text-3xl ${i === 0 ? 'text-white' : 'text-zinc-800'}`}>{c.count}</p>
            <p className={`font-body text-sm mt-1 ${i === 0 ? 'text-blue-200' : 'text-zinc-500'}`}>{c.campus}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or staff ID…"
            className="w-full pl-9 pr-4 py-2.5 font-body text-sm border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20" />
        </div>
        <select value={campusF} onChange={e => setCampusF(e.target.value)}
          className="font-body text-sm px-4 py-2.5 border border-zinc-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20">
          <option value="All">All Campuses</option>
          {CAMPUSES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Teacher cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-xl flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
                {t.name.split(' ').filter(Boolean).map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm text-zinc-800 truncate">{t.name}</p>
                <span className="font-body text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-mosai-blue-light text-mosai-blue">
                  {t.role}
                </span>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => openEdit(t)} className="w-7 h-7 bg-zinc-100 hover:bg-mosai-blue-light rounded-lg flex items-center justify-center text-zinc-500 hover:text-mosai-blue transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(t.id)} className="w-7 h-7 bg-zinc-100 hover:bg-red-100 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-600 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Assigned</span>
                <span className="font-semibold text-zinc-600">{t.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Campus</span>
                <span className="font-semibold text-zinc-600">{t.campus.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Qualification</span>
                <span className="font-semibold text-zinc-600">{t.qualification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Staff ID</span>
                <span className="font-mono text-zinc-500">{t.staffId}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-100">
              <a href={`tel:${t.phone}`} className="flex items-center gap-1.5 font-body text-xs text-mosai-blue hover:underline"><Phone className="w-3 h-3" />{t.phone}</a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 border-b border-zinc-100">
              <h2 className="font-heading font-extrabold text-lg text-zinc-800">{modal === 'add' ? 'Add Staff Member' : 'Edit Staff Member'}</h2>
              <button onClick={() => setModal(null)} className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-800"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={save} className="px-7 py-5 space-y-4">
              {[['Full Name','name','text'],['Phone','phone','tel'],['Email','email','email'],['Qualification','qualification','text']].map(([lbl,key,type]) => (
                <div key={key}>
                  <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">{lbl}</label>
                  <input type={type} value={form[key]??''} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} required={key!=='email'}
                    className="w-full font-body text-sm px-3 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue" />
                </div>
              ))}
              {[['Role','role',ROLES],['Assigned Class','class',[...CLASSES,'All Classes','Administration']],['Campus','campus',CAMPUSES]].map(([lbl,key,opts]) => (
                <div key={key}>
                  <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">{lbl}</label>
                  <select value={form[key]??''} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                    className="w-full font-body text-sm px-3 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20">
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button type="submit" className={`w-full flex items-center justify-center gap-2 font-heading font-bold text-sm py-3.5 rounded-2xl transition-all ${saved ? 'bg-green-500 text-white' : 'bg-mosai-blue-dark hover:bg-mosai-blue text-white'}`}>
                {saved ? <><CheckCircle className="w-4 h-4" />Saved!</> : (modal === 'add' ? 'Add Staff Member' : 'Save Changes')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
