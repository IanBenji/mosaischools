import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'

const CLASSES  = ['Baby Class', 'Middle Class', 'Top Class', 'P.1', 'P.2', 'P.3']
const CAMPUSES = ['Nalugala Campus', 'Bunono Campus']

export default function Register() {
  const { login } = useAuth()
  const navigate  = useNavigate()

  const blank = {
    fullName: '', email: '', phone: '', password: '', confirm: '',
    childName: '', childClass: '', campus: '', terms: false,
  }
  const [form,    setForm]    = useState(blank)
  const [errs,    setErrs]    = useState({})
  const [showPw,  setShowPw]  = useState(false)
  const [showCf,  setShowCf]  = useState(false)
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  function change(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (errs[name]) setErrs(er => ({ ...er, [name]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim())    e.fullName  = 'Full name is required'
    if (!form.email.trim())       e.email     = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                  e.email     = 'Enter a valid email address'
    if (!form.phone.trim())       e.phone     = 'Phone number is required'
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone))
                                  e.phone     = 'Enter a valid phone number'
    if (!form.password)           e.password  = 'Password is required'
    else if (form.password.length < 8)
                                  e.password  = 'Password must be at least 8 characters'
    if (!form.confirm)            e.confirm   = 'Please confirm your password'
    else if (form.confirm !== form.password)
                                  e.confirm   = 'Passwords do not match'
    if (!form.childName.trim())   e.childName = "Child's name is required"
    if (!form.childClass)         e.childClass= 'Please select a class'
    if (!form.campus)             e.campus    = 'Please select a campus'
    if (!form.terms)              e.terms     = 'You must accept the terms to continue'
    return e
  }

  function submit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setLoading(true)
    setTimeout(() => {
      login({ email: form.email, name: form.fullName, role: 'parent', campus: form.campus })
      setLoading(false)
      setDone(true)
      setTimeout(() => navigate('/'), 2000)
    }, 1200)
  }

  const inp = (label, name, type = 'text', placeholder = '', showToggle = false, showState = false, toggleFn = null) => (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}<span className="text-mosai-red ml-0.5">*</span>
      </label>
      <div className="relative">
        <input
          type={showToggle ? (showState ? 'text' : 'password') : type}
          name={name}
          value={form[name]}
          onChange={change}
          placeholder={placeholder}
          className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 ${
            errs[name]
              ? 'border-red-300 focus:ring-red-100'
              : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
          } ${showToggle ? 'pr-11' : ''}`}
        />
        {showToggle && (
          <button type="button" onClick={toggleFn}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            {showState ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {errs[name] && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1 font-body">
          <AlertCircle className="w-3 h-3" />{errs[name]}
        </p>
      )}
    </div>
  )

  const sel = (label, name, options) => (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}<span className="text-mosai-red ml-0.5">*</span>
      </label>
      <select name={name} value={form[name]} onChange={change}
        className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 ${
          errs[name]
            ? 'border-red-300 focus:ring-red-100'
            : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
        }`}>
        <option value="">Select…</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {errs[name] && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1 font-body">
          <AlertCircle className="w-3 h-3" />{errs[name]}
        </p>
      )}
    </div>
  )

  if (done) return (
    <div className="min-h-screen bg-gradient-to-br from-mosai-blue-dark via-mosai-blue to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="font-heading font-extrabold text-2xl text-mosai-blue-dark mb-2">Welcome to MOSAI!</h3>
        <p className="font-body text-sm text-gray-500">
          Your account has been created. Redirecting you now…
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-mosai-blue-dark via-mosai-blue to-blue-700 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 bg-white group-hover:bg-gray-50 rounded-2xl flex items-center justify-center transition-colors duration-200 border border-white/20 p-1.5">
              <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-xl text-white leading-none">MOSAI Schools</p>
              <p className="font-body text-xs text-blue-200 mt-0.5">Parent Registration</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="font-heading font-extrabold text-2xl text-mosai-blue-dark mb-1">Create Your Account</h2>
          <p className="font-body text-sm text-gray-500 mb-7">
            Register to access the MOSAI Schools parent portal and track your child's progress.
          </p>

          <form onSubmit={submit} noValidate className="space-y-5">

            {/* Parent details */}
            <div>
              <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-3 pb-2 border-b border-gray-100">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-mosai-blue text-white text-xs mr-2">1</span>
                Parent / Guardian Details
              </p>
              <div className="space-y-4">
                {inp('Full Name', 'fullName', 'text', 'e.g. Sarah Nankunda')}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inp('Email Address', 'email', 'email', 'you@example.com')}
                  {inp('Phone Number', 'phone', 'tel', '+256 700 000 000')}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inp('Password', 'password', 'password', '••••••••', true, showPw, () => setShowPw(v => !v))}
                  {inp('Confirm Password', 'confirm', 'password', '••••••••', true, showCf, () => setShowCf(v => !v))}
                </div>
              </div>
            </div>

            {/* Child details */}
            <div>
              <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-3 pb-2 border-b border-gray-100">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-mosai-red text-white text-xs mr-2">2</span>
                Child's Details
              </p>
              <div className="space-y-4">
                {inp("Child's Full Name", 'childName', 'text', "e.g. Aisha Nankunda")}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sel("Class Applying For", 'childClass', CLASSES)}
                  {sel('Campus Preference', 'campus', CAMPUSES)}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className={`flex items-start gap-3 cursor-pointer rounded-xl border p-4 transition-colors ${
                errs.terms ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-mosai-blue-light hover:border-mosai-blue'
              }`}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={change}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-mosai-blue focus:ring-mosai-blue/30 shrink-0"
                />
                <span className="font-body text-sm text-gray-600 leading-relaxed">
                  I agree to MOSAI Schools'{' '}
                  <a href="#" className="text-mosai-blue hover:underline font-semibold">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-mosai-blue hover:underline font-semibold">Privacy Policy</a>.
                  I confirm all information provided is accurate.
                </span>
              </label>
              {errs.terms && (
                <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5 font-body">
                  <AlertCircle className="w-3 h-3" />{errs.terms}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-base py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
                  </svg>
                  Creating account…
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center font-body text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-mosai-blue hover:underline">Sign in</Link>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="font-body text-sm text-white/60 hover:text-white transition-colors">
            ← Back to MOSAI Schools website
          </Link>
        </p>
      </div>
    </div>
  )
}
