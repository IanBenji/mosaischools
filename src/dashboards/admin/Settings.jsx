import { useState } from 'react'
import { Save, CheckCircle, Building2, GraduationCap, CreditCard, CalendarDays, Settings as SettingsIcon } from 'lucide-react'

const INITIAL = {
  school: {
    name:       'Mosai Schools',
    type:       'Private Day and Boarding Nursery & Primary School',
    location:   'Garuga Road, off Kampala-Entebbe Road, Katabi, Wakiso District, Uganda',
    phone:      '+256 700 123 456',
    email:      'info@mosaischools.ug',
    website:    'www.mosaischools.ug',
    licensed:   'Ministry of Education and Sports, Uganda',
  },
  academic: {
    year:       '2026',
    currentTerm:'Term II',
    termIIStart:'2026-05-25',
    termIIEnd:  '2026-08-15',
    midTermBreak:'2026-07-04',
  },
  fees: {
    nurseryDay:     500000,
    nurseryBoarding:700000,
    primaryDay:     500000,
    primaryBoarding:700000,
    admissionFee:   30000,
  },
  campuses: [
    { id:1, name:'Nalugala Campus', location:'Garuga Road, Katabi', opened:'January 2025', status:'Active' },
    { id:2, name:'Bunono Campus',   location:'Katabi, Wakiso District', opened:'2026', status:'Active' },
  ],
  classes: [
    { id:1, name:'Baby Class',   section:'Nursery', ageRange:'3-4', active:true },
    { id:2, name:'Middle Class', section:'Nursery', ageRange:'4-5', active:true },
    { id:3, name:'Top Class',    section:'Nursery', ageRange:'5-6', active:true },
    { id:4, name:'P.1',          section:'Primary', ageRange:'6+',  active:true },
    { id:5, name:'P.2',          section:'Primary', ageRange:'7+',  active:true },
    { id:6, name:'P.3',          section:'Primary', ageRange:'8+',  active:true },
    { id:7, name:'P.4',          section:'Primary', ageRange:'9+',  active:false, note:'Opening 2027' },
    { id:8, name:'P.5',          section:'Primary', ageRange:'10+', active:false, note:'Future'       },
    { id:9, name:'P.6',          section:'Primary', ageRange:'11+', active:false, note:'Future'       },
    { id:10,name:'P.7',          section:'Primary', ageRange:'12+', active:false, note:'Future'       },
  ],
}

function SaveBar({ onSave, saved }) {
  return (
    <div className="flex justify-end mt-4">
      <button onClick={onSave}
        className={`flex items-center gap-2 font-heading font-bold text-sm px-6 py-2.5 rounded-xl shadow transition-all ${saved ? 'bg-green-500 text-white' : 'bg-mosai-blue-dark hover:bg-mosai-blue text-white'}`}>
        {saved ? <><CheckCircle className="w-4 h-4"/>Saved!</> : <><Save className="w-4 h-4"/>Save Changes</>}
      </button>
    </div>
  )
}

export default function Settings() {
  const [data, setData] = useState(INITIAL)
  const [saved, setSaved] = useState({})
  const [tab, setTab] = useState('school')

  function save(section) {
    setSaved(s => ({ ...s, [section]: true }))
    setTimeout(() => setSaved(s => ({ ...s, [section]: false })), 2000)
  }

  function setField(section, key, val) {
    setData(d => ({ ...d, [section]: { ...d[section], [key]: val } }))
  }

  const tabs = [
    { id:'school',   icon:SettingsIcon, label:'School Info'     },
    { id:'academic', icon:CalendarDays, label:'Academic Year'   },
    { id:'fees',     icon:CreditCard,   label:'Fee Structure'   },
    { id:'campuses', icon:Building2,    label:'Campuses'        },
    { id:'classes',  icon:GraduationCap,label:'Classes'         },
  ]

  const inp = (section, key, label, type='text') => (
    <div>
      <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{label}</label>
      <input type={type} value={data[section][key]??''} onChange={e=>setField(section,key,e.target.value)}
        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue" />
    </div>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-zinc-800">Settings</h1>
        <p className="font-body text-sm text-zinc-500 mt-0.5">Manage school configuration, campuses and academic structure.</p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-0">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-heading font-bold border-b-2 -mb-px transition-all ${tab === t.id ? 'border-mosai-blue text-mosai-blue' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}>
              <Icon className="w-4 h-4" />{t.label}
            </button>
          )
        })}
      </div>

      {/* School Info */}
      {tab === 'school' && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-4">
          <h2 className="font-heading font-bold text-base text-zinc-800 mb-4">School Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inp('school','name','School Name')}
            {inp('school','type','School Type')}
            {inp('school','phone','Phone Number','tel')}
            {inp('school','email','Email Address','email')}
            {inp('school','website','Website')}
            {inp('school','licensed','Licensed By')}
          </div>
          <div>{inp('school','location','Full Address')}</div>
          <SaveBar onSave={() => save('school')} saved={saved.school} />
        </div>
      )}

      {/* Academic Year */}
      {tab === 'academic' && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-4">
          <h2 className="font-heading font-bold text-base text-zinc-800 mb-4">Academic Year & Terms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inp('academic','year','Academic Year')}
            {inp('academic','currentTerm','Current Term')}
            {inp('academic','termIIStart','Term II Start Date','date')}
            {inp('academic','termIIEnd','Term II End Date','date')}
            {inp('academic','midTermBreak','Mid-Term Holiday','date')}
          </div>
          <SaveBar onSave={() => save('academic')} saved={saved.academic} />
        </div>
      )}

      {/* Fee Structure */}
      {tab === 'fees' && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 space-y-4">
          <h2 className="font-heading font-bold text-base text-zinc-800 mb-2">Fee Structure (UGX per term)</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 font-body mb-4">
            Changes here are for display only. Contact the system administrator to update live fee records.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[['nurseryDay','Nursery — Day Scholar'],['nurseryBoarding','Nursery — Boarding'],['primaryDay','Primary — Day Scholar'],['primaryBoarding','Primary — Boarding'],['admissionFee','Admission Fee (one-time)']].map(([key,lbl]) => (
              <div key={key}>
                <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{lbl}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-zinc-400">UGX</span>
                  <input type="number" value={data.fees[key]} onChange={e=>setField('fees',key,Number(e.target.value))}
                    className="w-full font-body text-sm pl-12 pr-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue" />
                </div>
              </div>
            ))}
          </div>
          <SaveBar onSave={() => save('fees')} saved={saved.fees} />
        </div>
      )}

      {/* Campuses */}
      {tab === 'campuses' && (
        <div className="space-y-4">
          {data.campuses.map((c, i) => (
            <div key={c.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-mosai-blue" />
                <h3 className="font-heading font-bold text-base text-zinc-800">{c.name}</h3>
                <span className="font-body text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 ml-auto">{c.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[['name','Campus Name'],['location','Location'],['opened','Opened']].map(([key,lbl]) => (
                  <div key={key}>
                    <label className="block font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">{lbl}</label>
                    <input type="text" value={c[key]} onChange={e => setData(d => ({ ...d, campuses: d.campuses.map((x,j)=>j===i?{...x,[key]:e.target.value}:x) }))}
                      className="w-full font-body text-sm px-4 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <SaveBar onSave={() => save('campuses')} saved={saved.campuses} />
        </div>
      )}

      {/* Classes */}
      {tab === 'classes' && (
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <h2 className="font-heading font-bold text-base text-zinc-800">Class Management</h2>
            <p className="font-body text-xs text-zinc-400 mt-0.5">Mosai Schools adds one class per year, expanding to P.7 over time.</p>
          </div>
          <div className="divide-y divide-zinc-100">
            {data.classes.map((c, i) => (
              <div key={c.id} className={`flex items-center gap-4 px-6 py-4 ${!c.active ? 'opacity-50' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-heading font-bold text-xs ${c.active ? (c.section==='Nursery'?'bg-mosai-blue-light text-mosai-blue':'bg-mosai-red-light text-mosai-red') : 'bg-zinc-100 text-zinc-400'}`}>
                  {c.name.split(' ')[0][0]}{c.name.includes('.')?c.name.split('.')[1]??'':''}
                </div>
                <div className="flex-1">
                  <p className="font-heading font-bold text-sm text-zinc-700">{c.name}</p>
                  <p className="font-body text-xs text-zinc-400">{c.section} · Ages {c.ageRange} · {c.note ?? (c.active ? 'Active' : 'Not yet open')}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={c.active} onChange={e => setData(d => ({ ...d, classes: d.classes.map((x,j)=>j===i?{...x,active:e.target.checked}:x) }))} className="sr-only peer" />
                  <div className="w-10 h-5 bg-zinc-200 peer-checked:bg-mosai-blue rounded-full transition-colors duration-200" />
                  <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform duration-200 shadow" />
                </label>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-zinc-100">
            <SaveBar onSave={() => save('classes')} saved={saved.classes} />
          </div>
        </div>
      )}
    </div>
  )
}
