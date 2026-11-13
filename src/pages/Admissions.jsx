import { useState } from 'react'
import {
  CheckCircle, FileText, Heart, Download, Phone, Mail,
  Clock, ArrowRight, AlertCircle, MapPin, Mail as MailIcon,
  BookOpen, Users, Baby, CreditCard, ShieldAlert,
  Shirt, GraduationCap, Home,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCampus } from '../context/CampusContext'
import { CAMPUSES } from '../lib/campus'
import useSheetData from '../hooks/useSheetData'
import { formDocuments } from '../lib/schoolData'
import { trackEvent } from '../lib/analytics'
import PageHeader from '../components/PageHeader'
import { LoadingRows, EmptyState, StaleNotice } from '../components/DataState'
import AdmissionsBunono from './AdmissionsBunono'
import SimpleCaptcha from '../components/SimpleCaptcha'
import { feeRange, FEES } from '../lib/fees'
import headerImg  from '../assets/IMG_8754.webp'
import photoA     from '../assets/TON_8855.webp'
import photoB     from '../assets/IMG_8791.webp'
import photoC     from '../assets/IMG_8682.webp'

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const classes = [
  {
    name: 'Baby Class',
    icon: Baby,
    age: '2 to 3 yrs',
    color: 'red',
    image: photoA,
    tagline: 'First steps into learning',
    docs: [
      'Certified birth certificate copy',
      'Passport size photo (×2)',
      'Current immunisation card',
      'Parent or guardian ID copy',
    ],
    health: [
      'Standard vaccinations up to date',
      'Medical fitness certificate',
      'Written record of any known allergies',
    ],
    note: 'Child must turn 2 before or during the term of entry.',
  },
  {
    name: 'Middle Class',
    icon: BookOpen,
    age: '3 to 4 yrs',
    color: 'blue',
    image: photoB,
    tagline: 'Building curiosity and confidence',
    docs: [
      'Certified birth certificate copy',
      'Passport size photo (×2)',
      'Baby Class leaving certificate (if any)',
      'Current immunisation card',
      'Parent or guardian ID copy',
    ],
    health: [
      'Standard vaccinations up to date',
      'Medical fitness certificate',
      'Any conditions or allergies documented',
    ],
    note: 'Transfer learners must include a letter from the previous school.',
  },
  {
    name: 'Top Class',
    icon: Users,
    age: '5 to 6 yrs',
    color: 'red',
    image: photoC,
    tagline: 'Ready for Primary 1',
    docs: [
      'Certified birth certificate copy',
      'Passport size photo (×2)',
      'Previous class report or leaving certificate',
      'Current immunisation card',
      'Parent or guardian ID copy',
    ],
    health: [
      'Standard vaccinations up to date',
      'Medical fitness certificate',
      'Dental check confirmation',
      'Vision screening result',
    ],
    note: 'A short, child friendly assessment may be conducted for Top Class applicants.',
  },
]


const steps = [
  { n: '01', title: 'Apply Online',       desc: 'Fill in the application form below or collect a paper copy from our office.',             color: 'bg-mosai-blue'     },
  { n: '02', title: 'Submit Documents',   desc: 'Bring certified copies of all required documents to the admissions office.',              color: 'bg-mosai-red'      },
  { n: '03', title: 'Assessment Day',     desc: 'A brief, child friendly session helps us understand your child\'s needs and readiness.',  color: 'bg-mosai-blue'     },
  { n: '04', title: 'Offer Letter',       desc: 'Receive a written decision within five working days of the assessment.',                  color: 'bg-mosai-red'      },
  { n: '05', title: 'Pay and Enroll',     desc: 'Confirm your place by paying the registration fee and receive the welcome pack.',         color: 'bg-mosai-blue'     },
]

/* The four cards under "Downloadable Forms" used to be written out here, with
 * href="#" on every one, so nothing was ever downloaded. They now come from the
 * Forms category of the school's documents sheet, which means the office adds a
 * form the same way it posts a notice and no developer is involved.
 *
 * A sheet cannot carry an icon, so one is chosen from the file type instead. */
const ICON_FOR_TYPE = { PDF: FileText, DOC: FileText, DOCX: FileText, LINK: ArrowRight, PAGE: ArrowRight }

// File types the browser opens rather than saves, so we do not force a download.
const VIEWABLE = ['LINK', 'PAGE']


/* â”€â”€â”€ Application form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
// Build a ready to send email (Gmail compose + a mailto fallback) from the form.
function buildMailUrls(to, form) {
  const subject = `Admission Application: ${form.childFirst} ${form.childLast}${form.classFor ? ` (${form.classFor})` : ''}`
  const lines = [
    'NEW ADMISSION APPLICATION',
    '',
    'CHILD',
    `Full name: ${form.childFirst} ${form.childLast}`,
    `Date of birth: ${form.dob}`,
    `Gender: ${form.gender}`,
    `Preferred campus: ${form.campus}`,
    `Applying for: ${form.classFor}`,
    form.startTerm && `Start term: ${form.startTerm}`,
    '',
    'PARENT / GUARDIAN',
    `Name: ${form.parentName}`,
    form.relation && `Relationship: ${form.relation}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    `Home address: ${form.address}${form.city ? `, ${form.city}` : ''}`,
    form.source && `Heard about us via: ${form.source}`,
    '',
    'NOTES',
    form.notes || '(none)',
  ].filter(Boolean)
  const su = encodeURIComponent(subject)
  const body = encodeURIComponent(lines.join('\n'))
  const t = encodeURIComponent(to)
  return {
    gmail:  `https://mail.google.com/mail/?view=cm&fs=1&to=${t}&su=${su}&body=${body}`,
    mailto: `mailto:${to}?subject=${su}&body=${body}`,
  }
}

export function AppForm() {
  const { campusInfo } = useCampus()
  const campusNames = Object.values(CAMPUSES).map(c => `${c.name} Campus`)
  const blank = {
    childFirst:'', childLast:'', dob:'', gender:'',
    campus: `${campusInfo.name} Campus`, classFor:'', startTerm:'',
    parentName:'', relation:'', phone:'', email:'',
    address:'', city:'', source:'', notes:'',
  }
  const [form, setForm]   = useState(blank)
  const [errs, setErrs]   = useState({})
  const [done, setDone]   = useState(false)
  const [captchaOk, setCaptchaOk]     = useState(false)
  const [captchaSeed, setCaptchaSeed] = useState(0)
  const [sentUrls, setSentUrls]       = useState(null)

  function validate() {
    const e = {}
    if (!form.childFirst.trim()) e.childFirst = 'Required'
    if (!form.childLast.trim())  e.childLast  = 'Required'
    if (!form.dob)               e.dob        = 'Required'
    if (!form.gender)            e.gender     = 'Required'
    if (!form.classFor)          e.classFor   = 'Required'
    if (!form.parentName.trim()) e.parentName = 'Required'
    if (!form.phone.trim())      e.phone      = 'Required'
    if (!form.email.trim())      e.email      = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.address.trim())    e.address    = 'Required'
    if (!captchaOk)              e.captcha    = 'Please answer the sum to confirm you are human'
    return e
  }

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errs[name]) setErrs(er => ({ ...er, [name]: '' }))
  }

  function reset() {
    setForm(blank); setErrs({}); setDone(false)
    setCaptchaOk(false); setCaptchaSeed(s => s + 1); setSentUrls(null)
  }

  function submit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    const urls = buildMailUrls(campusInfo.email, form)
    setSentUrls(urls)
    window.open(urls.gmail, '_blank', 'noopener,noreferrer')
    setDone(true)
  }

  if (done) return (
    <div className="text-center py-14 px-4">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <MailIcon className="w-10 h-10 text-green-500" />
      </div>
      <h3 className="font-heading font-extrabold text-2xl text-mosai-blue-dark mb-2">Almost done, just press Send!</h3>
      <p className="font-body text-gray-500 max-w-md mx-auto mb-5">
        We've opened a ready to send email to <span className="font-semibold text-mosai-blue">{campusInfo.email}</span> in a new tab, with your application filled in. Please review it and hit <strong>Send</strong> to complete.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <a href={sentUrls?.gmail} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-6 py-3 rounded-full transition-colors">
          <MailIcon className="w-4 h-4" /> Reopen the email
        </a>
        <a href={sentUrls?.mailto}
          className="inline-flex items-center gap-2 border-2 border-gray-200 hover:border-mosai-blue text-gray-600 font-heading font-bold text-sm px-6 py-3 rounded-full transition-colors">
          Use my own email app
        </a>
      </div>
      <button onClick={reset} className="font-body text-sm font-semibold text-mosai-blue hover:underline">
        Start a new application
      </button>
    </div>
  )

  const inp = (label, name, type = 'text', placeholder = '', opt = false) => (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        {label}{!opt && <span className="text-mosai-red ml-0.5">*</span>}
      </label>
      <input type={type} name={name} value={form[name]} onChange={change}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 ${
          errs[name] ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
        }`} />
      {errs[name] && <p className="text-xs text-red-500 mt-1 font-body">{errs[name]}</p>}
    </div>
  )

  const sel = (label, name, options, opt = false) => (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        {label}{!opt && <span className="text-mosai-red ml-0.5">*</span>}
      </label>
      <select name={name} value={form[name]} onChange={change}
        className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 ${
          errs[name] ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
        }`}>
        <option value="">Select…</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {errs[name] && <p className="text-xs text-red-500 mt-1 font-body">{errs[name]}</p>}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="space-y-10">

      {/* Child */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-mosai-blue text-white flex items-center justify-center font-heading font-bold text-sm">1</span>
          <h3 className="font-heading font-bold text-lg text-mosai-blue-dark">Child's Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inp('First Name', 'childFirst', 'text', 'e.g. Aisha')}
          {inp('Last Name', 'childLast', 'text', 'e.g. Nakato')}
          {inp('Date of Birth', 'dob', 'date')}
          {sel('Gender', 'gender', ['Female','Male','Prefer not to say'])}
          {sel('Preferred Campus', 'campus', campusNames)}
          {sel('Applying For', 'classFor', ['Baby Class (Age 2 to 3)','Middle Class (Age 3 to 4)','Top Class (Age 5 to 6)','Primary One (P.1)','Primary Two (P.2)','Primary Three (P.3)','Primary Four (P.4)'])}
          {sel('Start Term', 'startTerm', ['2027 Term 1','2027 Term 2','2027 Term 3'], true)}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Parent */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-mosai-red text-white flex items-center justify-center font-heading font-bold text-sm">2</span>
          <h3 className="font-heading font-bold text-lg text-mosai-blue-dark">Parent or Guardian Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inp('Full Name', 'parentName', 'text', 'e.g. Sarah Nankunda')}
          {sel('Relationship', 'relation', ['Mother','Father','Legal Guardian','Other'])}
          {inp('Phone Number', 'phone', 'tel', '+256 700 000 000')}
          {inp('Email Address', 'email', 'email', 'you@example.com')}
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inp('Home Address', 'address', 'text', 'Street, suburb')}
            {inp('City or Town', 'city', 'text', 'e.g. Kampala', true)}
          </div>
          {sel('How did you hear about us?', 'source',
            ['Friend or family referral','Social media','Google search','School event','Signboard','Other'], true)}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Notes */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-8 rounded-full bg-mosai-blue text-white flex items-center justify-center font-heading font-bold text-sm">3</span>
          <h3 className="font-heading font-bold text-lg text-mosai-blue-dark">Additional Notes</h3>
        </div>
        <label className="block font-body text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
          Special needs, medical conditions or any other information <span className="text-gray-300 normal-case font-normal">(optional)</span>
        </label>
        <textarea name="notes" value={form.notes} onChange={change} rows={4}
          placeholder="e.g. dietary restrictions, medical conditions, preferred language…"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-body bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-mosai-blue focus:ring-mosai-blue/15 transition-all resize-none" />
      </div>

      {/* Consent */}
      <div className="bg-gray-50 rounded-2xl px-5 py-4 flex gap-3 items-start">
        <AlertCircle className="w-4 h-4 text-mosai-blue mt-0.5 shrink-0" />
        <p className="font-body text-sm text-gray-500">
          By submitting you confirm all information is accurate and consent to Mosai Schools processing this data for admission purposes.
        </p>
      </div>

      <SimpleCaptcha onChange={setCaptchaOk} error={errs.captcha} seed={captchaSeed} />

      {/* How submission works */}
      <div className="bg-mosai-blue-light rounded-2xl px-5 py-4 flex gap-3 items-start">
        <MailIcon className="w-4 h-4 text-mosai-blue mt-0.5 shrink-0" />
        <p className="font-body text-sm text-gray-600">
          When you press the button, we'll open a ready made email to <span className="font-semibold text-mosai-blue-dark">{campusInfo.email}</span> with your application filled in, so just review it and hit <strong>Send</strong>.
        </p>
      </div>

      <button type="submit"
        className="w-full flex items-center justify-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-base py-4 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]">
        <MailIcon className="w-5 h-5" /> Review &amp; Send Application
      </button>
    </form>
  )
}

/* â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Admissions() {
  const { campus } = useCampus()
  if (campus === 'bunono') return <AdmissionsBunono />
  return <AdmissionsNalugala />
}

function AdmissionsNalugala() {
  const [activeClass, setActiveClass] = useState(0)
  const cls = classes[activeClass]
  const isRed = cls.color === 'red'
  const { campus, campusInfo } = useCampus()
  const isBunono = campus === 'bunono'
  const p        = campusInfo.profile
  const tel      = campusInfo.phone.replace(/\s+/g, '')
  const documents = useSheetData('documents')
  const forms     = formDocuments(documents.rows, campus)

  return (
    <main className="bg-mist">

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <PageHeader
        crumb="Admissions"
        kicker="Now accepting applications for 2026"
        title="Join the"
        accentWord="Mosai Family"
        subtitle="Spaces are limited. Secure your child's place in a school where every learner is known, valued and inspired to grow."
        image={headerImg}
        nextBg="#153764"
      >
        <div className="flex flex-wrap gap-3">
          <a href="#apply" className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all duration-200">
            Apply Now <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#fees" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white font-heading font-bold text-sm px-6 py-3 rounded-full transition-all duration-200">
            View Fees
          </a>
        </div>
      </PageHeader>

      {/* â”€â”€ Key numbers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-mosai-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { v: '3',    l: 'Class Levels'       },
              { v: '3',    l: 'Terms per Year'      },
              { v: '5',    l: 'Steps to Enroll'     },
              { v: 'Open', l: 'Applications 2026'   },
            ].map((s, i) => (
              <div key={i} className="text-center text-white py-7 px-4">
                <p className="font-heading font-extrabold text-3xl">{s.v}</p>
                <p className="font-body text-xs text-blue-300 uppercase tracking-widest mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Requirements — image + card tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Before You Apply</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Admission Requirements</h2>
          </div>

          {/* Class selector tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {classes.map((c, i) => {
              const Icon = c.icon
              return (
                <button
                  key={i}
                  onClick={() => setActiveClass(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-bold transition-all duration-200 ${
                    activeClass === i
                      ? c.color === 'red'
                        ? 'bg-mosai-red text-white shadow-md shadow-red-200'
                        : 'bg-mosai-blue text-white shadow-md shadow-blue-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {c.name}
                  <span className={`text-xs font-normal ml-0.5 ${activeClass === i ? 'text-white/70' : 'text-gray-400'}`}>
                    {c.age}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Content card — image + details side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
            {/* Left: photo */}
            <div className="relative h-64 lg:h-auto min-h-72">
              <img
                key={activeClass}
                src={cls.image}
                alt={cls.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-body text-sm text-white/70 mb-1">{cls.tagline}</p>
                <h3 className="font-heading font-extrabold text-3xl">{cls.name}</h3>
                <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full ${
                  isRed ? 'bg-mosai-red text-white' : 'bg-mosai-blue text-white'
                }`}>Ages {cls.age}</span>
              </div>
            </div>

            {/* Right: docs + health */}
            <div className="bg-white p-8 flex flex-col gap-7">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className={`w-4 h-4 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                  <span className="font-heading font-bold text-sm text-mosai-blue-dark uppercase tracking-wide">Required Documents</span>
                </div>
                <ul className="space-y-2.5">
                  {cls.docs.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                      <span className="font-body text-sm text-gray-600">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-mosai-red" />
                  <span className="font-heading font-bold text-sm text-mosai-blue-dark uppercase tracking-wide">Health Requirements</span>
                </div>
                <ul className="space-y-2.5">
                  {cls.health.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-green-500" />
                      <span className="font-body text-sm text-gray-600">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`flex gap-2.5 rounded-xl px-4 py-3 ${isRed ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                <AlertCircle className={`w-4 h-4 mt-0.5 shrink-0 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                <p className="font-body text-xs text-gray-600 leading-relaxed">{cls.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Fee Structure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="fees" className="py-20 bg-mist-deep">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">School Fees</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Term Fee Structure</h2>
            <p className="font-body text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              Fees are charged per term and cover quality education, learning materials, and access to all school facilities.
              All amounts are in Uganda Shillings (UGX).
            </p>
          </div>

          {/* Admission fee banner */}
          <div className="flex items-start gap-4 bg-mosai-blue-dark text-white rounded-2xl px-6 py-5 mb-6">
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-heading font-bold text-base">Admission Fee</p>
              <p className="font-body text-sm text-blue-200 mt-0.5">
                A one time admission fee of <span className="font-bold text-white">UGX 30,000/=</span> is charged when a child is enrolled.
                Paid via the School Pay System using your child's unique code.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-heading font-extrabold text-2xl">UGX 30,000</p>
              <p className="font-body text-xs text-blue-300">one time only</p>
            </div>
          </div>

          {/* Two section cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

            {/* Nursery */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-mosai-blue px-6 py-5">
                <p className="font-body text-xs text-blue-200 uppercase tracking-widest mb-1">Nursery Section</p>
                <h3 className="font-heading font-extrabold text-xl text-white">Baby, Middle &amp; Top Class</h3>
                <p className="font-body text-sm text-blue-200 mt-1">Ages 2 to 6 years</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-mosai-blue-light rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-mosai-blue" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-mosai-blue-dark">Day Scholar</p>
                      <p className="font-body text-xs text-gray-400">Returns home daily</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-extrabold text-lg text-mosai-blue-dark">UGX {feeRange(FEES.nursery.day)}</p>
                    <p className="font-body text-xs text-gray-400">per term</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-mosai-blue-light rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-mosai-blue" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-mosai-blue-dark">Boarding</p>
                      <p className="font-body text-xs text-gray-400">Stays at school</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-extrabold text-lg text-mosai-blue-dark">UGX {feeRange(FEES.nursery.boarding)}</p>
                    <p className="font-body text-xs text-gray-400">per term</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-mosai-red px-6 py-5">
                <p className="font-body text-xs text-red-200 uppercase tracking-widest mb-1">Primary Section · {campusInfo.name}</p>
                <h3 className="font-heading font-extrabold text-xl text-white">{p.primaryRange}</h3>
                <p className="font-body text-sm text-red-200 mt-1">Adding one class each year to P.7</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-mosai-red-light rounded-lg flex items-center justify-center">
                      <Home className="w-4 h-4 text-mosai-red" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-mosai-blue-dark">Day Scholar</p>
                      <p className="font-body text-xs text-gray-400">Returns home daily</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-extrabold text-lg text-mosai-blue-dark">UGX {feeRange(FEES.primary.day)}</p>
                    <p className="font-body text-xs text-gray-400">per term</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-mosai-red-light rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-mosai-red" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-mosai-blue-dark">Boarding</p>
                      <p className="font-body text-xs text-gray-400">Stays at school</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-extrabold text-lg text-mosai-blue-dark">UGX {feeRange(FEES.primary.boarding)}</p>
                    <p className="font-body text-xs text-gray-400">per term</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's included */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
            <h3 className="font-heading font-bold text-base text-mosai-blue-dark mb-4">What the Term Fee Covers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: BookOpen,      text: 'Quality education built on the NCDC curriculum, enriched with IB concepts and IPC' },
                { icon: CheckCircle,   text: 'All learning materials and printed books (provided by school)' },
                { icon: GraduationCap, text: isBunono ? 'Access to playground and all campus facilities' : 'Access to playground, swimming pool and all school facilities' },
                { icon: Users,         text: 'All extracurricular and sports activities' },
                { icon: Home,          text: 'Boarding only: accommodation, meals and pastoral supervision' },
                { icon: Shirt,         text: 'School uniform is mandatory and available for purchase at school' },
              ].map(({ text }, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-mosai-blue" />
                  <span className="font-body text-sm text-gray-600">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment rules */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <h3 className="font-heading font-bold text-base text-amber-800">Important Payment Information</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'All payments are made via the School Pay System ONLY',
                'Each child is issued a unique School Pay payment code at enrolment',
                'No cash is accepted at school under any circumstances',
                'Do not pay cash to any staff member',
                'Children should not bring their own textbooks, as the school provides printed books',
                'Uniforms are mandatory and available for purchase at school',
              ].map((note, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                  <span className="font-body text-sm text-amber-800">{note}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-amber-200 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="font-body text-sm font-semibold text-amber-800">
                Fees are payable at the start of each term. Contact the school office if you need assistance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* â”€â”€ Process — horizontal card strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-mist overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Simple and Clear</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">How to Apply</h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-mosai-blue via-mosai-red to-mosai-blue" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className={`relative z-10 w-20 h-20 rounded-2xl ${step.color} flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-200 mb-4`}>
                    <span className="font-heading font-extrabold text-2xl leading-none">{step.n}</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-mosai-blue-dark mb-1.5">{step.title}</h3>
                  <p className="font-body text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Image break with quote â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative h-72 overflow-hidden">
        <img src={photoB} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-mosai-blue-dark/75" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-snug mb-3">
              "Every great journey begins with a single step.<br />
              <span className="text-mosai-red">Let yours begin at Mosai Schools."</span>
            </p>
            <a href="#apply" className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-6 py-2.5 rounded-full transition-colors duration-200">
              Start Your Application <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€ Application form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="apply" className="py-24 bg-mist-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Left sidebar info */}
            <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-28">
              <div>
                <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Apply Online</span>
                <h2 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mt-2 leading-snug">
                  Application<br />Form
                </h2>
                <p className="font-body text-sm text-gray-500 mt-3 leading-relaxed">
                  Complete all three sections and we will be in touch within five working days.
                </p>
              </div>

              {/* Photo card */}
              <div className="rounded-2xl overflow-hidden relative h-48">
                <img src={photoC} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-mosai-blue-dark/60" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-heading font-bold text-sm">Questions?</p>
                  <a href={`tel:${tel}`} className="font-body text-xs text-blue-200 hover:text-white transition-colors">
                    {campusInfo.phone}
                  </a>
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-4">What happens next?</p>
                {steps.slice(1).map((s, i) => (
                  <div key={i} className="flex gap-3 mb-3 last:mb-0">
                    <span className={`w-6 h-6 rounded-full ${s.color} text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 mt-0.5`}>
                      {i + 2}
                    </span>
                    <p className="font-body text-xs text-gray-500 leading-relaxed">{s.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-7 sm:p-10">
              <AppForm />
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Downloads â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Offline Option</span>
              <h2 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mt-1">Downloadable Forms</h2>
            </div>
            <p className="font-body text-sm text-gray-400">Print, complete and bring to the office</p>
          </div>

          {documents.loading ? (
            <LoadingRows count={4} />
          ) : forms.length === 0 ? (
            <EmptyState icon={FileText} title="Forms are being prepared">
              <p>
                We are putting our application forms online. Nothing is available to download here
                just yet, but the form above sends everything the office needs.
              </p>
              <p className="mt-3">
                To collect a printed copy, call{' '}
                <a href={`tel:${tel}`} className="font-semibold text-mosai-blue hover:underline">{campusInfo.phone}</a>{' '}
                or come by the office during working hours.
              </p>
            </EmptyState>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {forms.map((doc) => {
                const Icon = ICON_FOR_TYPE[doc.fileType] || FileText
                const opensInBrowser = VIEWABLE.includes(doc.fileType)
                const isInternal = doc.url?.startsWith('/')
                const Wrapper = isInternal ? Link : 'a'
                const linkProps = isInternal
                  ? { to: doc.url }
                  : { href: doc.url, target: '_blank', rel: 'noreferrer', download: opensInBrowser ? undefined : '' }

                return (
                  <Wrapper
                    key={doc.id}
                    {...linkProps}
                    onClick={() => trackEvent('document_open', { title: doc.title, campus })}
                    className="group flex flex-col gap-4 bg-gray-50 hover:bg-white border border-gray-100 hover:border-mosai-blue hover:shadow-lg rounded-2xl p-6 transition-all duration-200"
                  >
                    <div className="w-11 h-11 bg-mosai-blue-light group-hover:bg-mosai-blue rounded-xl flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-5 h-5 text-mosai-blue group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-sm text-mosai-blue-dark mb-1">{doc.title}</h3>
                      {doc.summary && (
                        <p className="font-body text-xs text-gray-400 leading-relaxed">{doc.summary}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs text-gray-300">
                        {[doc.fileType, doc.size].filter(Boolean).join(' · ')}
                      </span>
                      <span className="inline-flex items-center gap-1 font-body text-xs font-semibold text-mosai-blue">
                        <Download className="w-3.5 h-3.5" /> {opensInBrowser ? 'Open' : 'Download'}
                      </span>
                    </div>
                  </Wrapper>
                )
              })}
            </div>
          )}

          {documents.error && <StaleNotice />}
        </div>
      </section>

      {/* â”€â”€ Contact inquiries â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 bg-mosai-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-body text-xs font-bold text-blue-300 uppercase tracking-widest">We Are Here to Help</span>
              <h2 className="font-heading font-extrabold text-3xl text-white mt-2 mb-4">Admissions Inquiries</h2>
              <p className="font-body text-blue-100 text-sm leading-relaxed mb-7">
                Our admissions team at <span className="font-semibold text-white">{campusInfo.name} Campus</span> is happy to answer any questions and guide your family through every step. Reach out any time during office hours.
              </p>
              <div key={campus} className="fade-in-up grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Phone,  label: 'Call the Head Mistress', value: campusInfo.phone,            href: `tel:${tel}`                 },
                  { icon: Mail,   label: 'Email',            value: campusInfo.email,             href: `mailto:${campusInfo.email}` },
                  { icon: MapPin, label: 'Visit Us',         value: `${p.address}, ${p.area}`,    href: null                         },
                  { icon: Clock,  label: 'Office Hours',     value: 'Mon to Fri · 7:30 AM to 5:30 PM', href: null                      },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-start gap-3 bg-white/5 rounded-2xl px-4 py-4">
                      <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-mosai-red" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-blue-300 uppercase tracking-wide">{item.label}</p>
                        {item.href
                          ? <a href={item.href} className="font-heading font-bold text-sm text-white hover:text-blue-200 transition-colors">{item.value}</a>
                          : <p className="font-heading font-bold text-sm text-white">{item.value}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tour card with image */}
            <div className="relative rounded-3xl overflow-hidden">
              <img src={photoA} alt="School tour" className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading font-bold text-xl text-white mb-2">Book a School Tour</h3>
                <p className="font-body text-sm text-white/70 mb-4">
                  Visit every Tuesday and Thursday morning. Meet the team and see our classrooms and play areas first hand.
                </p>
                <a href={`tel:${tel}`}
                  className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-5 py-2.5 rounded-full transition-colors duration-200">
                  <Phone className="w-4 h-4" /> Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
