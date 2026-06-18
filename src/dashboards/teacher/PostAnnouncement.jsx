import { useState } from 'react'
import { Megaphone, CheckCircle, ImagePlus, X, AlertCircle } from 'lucide-react'
import { mockTeacher } from './mockData'

const TARGETS = ['All Parents', 'Top Class Only', 'Nursery Section', 'Bunono Campus', 'Nalugala Campus']
const CATEGORIES = ['General', 'Academic', 'Events & Activities', 'Fees Reminder', 'Health & Safety', 'Schedule Change']

const past = [
  { id: 1, title: 'Art Competition Next Friday', target: 'Top Class Only', date: 'Today, 9:00 AM',   category: 'Events & Activities' },
  { id: 2, title: 'Science Fair Preparations',   target: 'Nursery Section',date: '2 May 2026',       category: 'Academic' },
  { id: 3, title: 'Mid-term Holiday Notice',     target: 'All Parents',    date: '28 April 2026',    category: 'Schedule Change' },
]

export default function PostAnnouncement() {
  const blank = { title: '', content: '', target: '', category: '', image: null }
  const [form,      setForm]      = useState(blank)
  const [errs,      setErrs]      = useState({})
  const [preview,   setPreview]   = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [history,   setHistory]   = useState(past)

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errs[name]) setErrs(er => ({ ...er, [name]: '' }))
  }

  function handleImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setForm(f => ({ ...f, image: file }))
    setPreview(URL.createObjectURL(file))
  }

  function clearImage() {
    setForm(f => ({ ...f, image: null }))
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  function validate() {
    const e = {}
    if (!form.title.trim())   e.title   = 'Title is required'
    if (!form.content.trim()) e.content = 'Content is required'
    if (!form.target)         e.target  = 'Please select who to notify'
    if (!form.category)       e.category= 'Please select a category'
    return e
  }

  function submit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setLoading(true)
    setTimeout(() => {
      setHistory(h => [{
        id: Date.now(), title: form.title, target: form.target,
        date: 'Just now', category: form.category,
      }, ...h])
      setForm(blank)
      setPreview(null)
      setLoading(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 900)
  }

  const inp = (label, name, placeholder) => (
    <div>
      <label className="block font-body text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}<span className="text-mosai-red ml-0.5">*</span>
      </label>
      <input type="text" name={name} value={form[name]} onChange={change} placeholder={placeholder}
        className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all focus:outline-none focus:ring-2 ${
          errs[name] ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
        }`}
      />
      {errs[name] && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errs[name]}</p>}
    </div>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800">Post Announcement</h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">Send a notice to parents from {mockTeacher.class}, {mockTeacher.campus}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Form */}
        <form onSubmit={submit} noValidate className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Megaphone className="w-5 h-5 text-mosai-blue" />
            <h2 className="font-heading font-bold text-base text-slate-800">New Announcement</h2>
          </div>

          {inp('Title', 'title', 'e.g. Sports Day on 7 June 2026')}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Notify<span className="text-mosai-red ml-0.5">*</span>
              </label>
              <select name="target" value={form.target} onChange={change}
                className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all focus:outline-none focus:ring-2 ${
                  errs.target ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
                }`}>
                <option value="">Select audience…</option>
                {TARGETS.map(t => <option key={t}>{t}</option>)}
              </select>
              {errs.target && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errs.target}</p>}
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Category<span className="text-mosai-red ml-0.5">*</span>
              </label>
              <select name="category" value={form.category} onChange={change}
                className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all focus:outline-none focus:ring-2 ${
                  errs.category ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
                }`}>
                <option value="">Select category…</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              {errs.category && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errs.category}</p>}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Content<span className="text-mosai-red ml-0.5">*</span>
            </label>
            <textarea name="content" value={form.content} onChange={change} rows={5} placeholder="Write your announcement here…"
              className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all focus:outline-none focus:ring-2 resize-none ${
                errs.content ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
              }`}
            />
            {errs.content && <p className="flex items-center gap-1 text-xs text-red-500 mt-1"><AlertCircle className="w-3 h-3" />{errs.content}</p>}
          </div>

          {/* Image attach */}
          <div>
            <label className="block font-body text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Attach Image (optional)</label>
            {preview ? (
              <div className="relative rounded-xl overflow-hidden h-36">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                <button type="button" onClick={clearImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl h-28 cursor-pointer hover:border-mosai-blue hover:bg-mosai-blue-light transition-colors">
                <ImagePlus className="w-6 h-6 text-gray-400 mb-1" />
                <span className="font-body text-xs text-gray-400">Click to attach a photo</span>
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            )}
          </div>

          <button type="submit" disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-heading font-bold text-base py-3.5 rounded-2xl shadow transition-all duration-200 active:scale-[0.98] ${
              submitted ? 'bg-green-500 text-white' : 'bg-mosai-blue-dark hover:bg-mosai-blue text-white'
            } ${loading ? 'opacity-70' : ''}`}>
            {loading  ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z"/></svg>Posting…</>
              : submitted ? <><CheckCircle className="w-4 h-4" /> Posted Successfully!</>
              : <><Megaphone className="w-4 h-4" /> Post Announcement</>}
          </button>
        </form>

        {/* Recent posts */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-800">Recent Posts</h3>
          {history.map(a => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-2 mb-2">
                <span className="font-body text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-mosai-blue-light text-mosai-blue">
                  {a.category}
                </span>
                <span className="font-body text-[10px] text-slate-400 ml-auto">{a.date}</span>
              </div>
              <p className="font-heading font-bold text-sm text-slate-700">{a.title}</p>
              <p className="font-body text-xs text-slate-400 mt-1">Sent to: {a.target}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
