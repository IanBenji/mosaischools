import { useState } from 'react'
import { Megaphone, Plus, Trash2, X, CheckCircle, AlertCircle, Bell } from 'lucide-react'
import { mockAnnouncements } from './mockData'
import { useAuth } from '../../context/AuthContext'

const TARGETS = ['All','Nalugala Campus','Bunono Campus','Toddler Class','Baby Class','Middle Class','Top Class','P.1','P.2','P.3','P.4','P.5','Nursery Section','Primary Section']
const CATEGORIES = ['Academic Calendar','Events','Parents','Fees & Payments','Health & Safety','General']

const categoryStyle = {
  'Academic Calendar': 'bg-mosai-blue-light text-mosai-blue',
  'Events':            'bg-purple-100 text-purple-700',
  'Parents':           'bg-green-100 text-green-700',
  'Fees & Payments':   'bg-amber-100 text-amber-700',
  'Health & Safety':   'bg-red-100 text-red-600',
  'General':           'bg-zinc-100 text-zinc-600',
}

export default function Announcements() {
  const { user } = useAuth()
  const blank = { title:'', body:'', target:'All', category:'General' }
  const [announcements, setAnnouncements] = useState(mockAnnouncements)
  const [showForm, setShowForm] = useState(false)
  const [form,     setForm]     = useState(blank)
  const [errs,     setErrs]     = useState({})
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)

  function validate() {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.body.trim())  e.body  = 'Content is required'
    return e
  }

  function submit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setLoading(true)
    setTimeout(() => {
      setAnnouncements(prev => [{
        id:       Date.now(),
        title:    form.title,
        body:     form.body,
        target:   form.target,
        category: form.category,
        date:     new Date().toISOString().slice(0,10),
        author:   user?.name ?? 'Administration',
      }, ...prev])
      setForm(blank)
      setErrs({})
      setLoading(false)
      setSuccess(true)
      setTimeout(() => { setSuccess(false); setShowForm(false) }, 1500)
    }, 800)
  }

  function remove(id) {
    if (!window.confirm('Delete this announcement?')) return
    setAnnouncements(a => a.filter(x => x.id !== id))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Announcements</h1>
          <p className="font-body text-sm text-zinc-500 mt-0.5">Post and manage school-wide notices for parents and staff.</p>
        </div>
        <button onClick={() => { setShowForm(v => !v); setSuccess(false) }}
          className="flex items-center gap-2 font-heading font-bold text-sm bg-mosai-blue-dark hover:bg-mosai-blue text-white px-5 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {/* Post form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-mosai-blue" />
              <h2 className="font-heading font-bold text-base text-zinc-800">Create Announcement</h2>
            </div>
            <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-700"><X className="w-4 h-4" /></button>
          </div>
          <form onSubmit={submit} noValidate className="p-6 space-y-4">
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Title<span className="text-mosai-red ml-0.5">*</span></label>
              <input type="text" value={form.title} onChange={e=>{setForm(f=>({...f,title:e.target.value}));setErrs(er=>({...er,title:''}))}}
                placeholder="e.g. Term II 2026 Begins 25 May"
                className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 ${errs.title?'border-red-300 focus:ring-red-100':'border-zinc-200 focus:border-mosai-blue focus:ring-mosai-blue/15'}`} />
              {errs.title && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3"/>{errs.title}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['Notify','target',TARGETS],['Category','category',CATEGORIES]].map(([lbl,key,opts])=>(
                <div key={key}>
                  <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{lbl}</label>
                  <select value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                    className="w-full font-body text-sm px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/15 focus:border-mosai-blue">
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">Content<span className="text-mosai-red ml-0.5">*</span></label>
              <textarea value={form.body} onChange={e=>{setForm(f=>({...f,body:e.target.value}));setErrs(er=>({...er,body:''}))}} rows={4}
                placeholder="Write your announcement here…"
                className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 resize-none ${errs.body?'border-red-300 focus:ring-red-100':'border-zinc-200 focus:border-mosai-blue focus:ring-mosai-blue/15'}`} />
              {errs.body && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3"/>{errs.body}</p>}
            </div>
            <button type="submit" disabled={loading}
              className={`w-full flex items-center justify-center gap-2 font-heading font-bold text-base py-3.5 rounded-2xl transition-all ${success?'bg-green-500 text-white':loading?'bg-zinc-300 text-zinc-500':'bg-mosai-blue-dark hover:bg-mosai-blue text-white'}`}>
              {loading?<><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z"/></svg>Posting…</>:success?<><CheckCircle className="w-4 h-4"/>Posted!</>:<><Megaphone className="w-4 h-4"/>Post Announcement</>}
            </button>
          </form>
        </div>
      )}

      {/* Announcements list */}
      <div className="space-y-4">
        {announcements.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-mosai-blue-light rounded-xl flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-mosai-blue" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`font-body text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${categoryStyle[a.category] ?? categoryStyle.General}`}>
                    {a.category}
                  </span>
                  <span className="font-body text-xs text-zinc-400">Sent to: <strong className="text-zinc-600">{a.target}</strong></span>
                  <span className="font-body text-xs text-zinc-400 ml-auto">{a.date}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-zinc-800 mb-1">{a.title}</h3>
                <p className="font-body text-sm text-zinc-500 leading-relaxed">{a.body}</p>
                <p className="font-body text-xs text-zinc-400 mt-2">Posted by: {a.author}</p>
              </div>
              <button onClick={() => remove(a.id)}
                className="w-7 h-7 bg-zinc-100 hover:bg-red-100 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-600 transition-colors shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
