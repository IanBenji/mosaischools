import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, Users, BookOpen, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'

const ROLES = [
  { key: 'parent',  label: 'Parent',  icon: Users,       desc: 'Track your child\'s progress' },
  { key: 'teacher', label: 'Teacher', icon: BookOpen,     desc: 'For teachers and staff' },
  { key: 'admin',   label: 'Admin',   icon: ShieldCheck,  desc: 'School administration' },
]

// Master test account — same credentials for all roles
const MASTER = { email: 'demo@mosaischools.ug', password: 'mosai2026' }

function mockAuthenticate(email, role) {
  const names = { parent: 'Demo Parent', teacher: 'Ms. Nakato Grace', admin: 'Admin User' }
  return { email, name: names[role] || 'User', role, campus: 'Nalugala' }
}

export default function Login() {
  const { login } = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()
  const from       = location.state?.from?.pathname || '/'

  const [role,     setRole]     = useState('parent')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [form,     setForm]     = useState({ email: '', password: '', remember: false })
  const [errs,     setErrs]     = useState({})
  const [authErr,  setAuthErr]  = useState('')

  function change(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (errs[name]) setErrs(er => ({ ...er, [name]: '' }))
    setAuthErr('')
  }

  function validate() {
    const e = {}
    if (!form.email.trim())   e.email    = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email    = 'Enter a valid email address'
    if (!form.password)       e.password = 'Password is required'
    else if (form.password.length < 6)
                              e.password = 'Password must be at least 6 characters'
    // Master account always passes
    if (form.email === MASTER.email && form.password === MASTER.password) return {}
    return e
  }

  function submit(e) {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setLoading(true)
    setTimeout(() => {
      const userData = mockAuthenticate(form.email, role)
      login(userData)
      setLoading(false)
      navigate(from, { replace: true })
    }, 900)
  }

  const inp = (label, name, type, placeholder) => (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}<span className="text-mosai-red ml-0.5">*</span>
      </label>
      <div className="relative">
        <input
          type={name === 'password' ? (showPw ? 'text' : 'password') : type}
          name={name}
          value={form[name]}
          onChange={change}
          placeholder={placeholder}
          autoComplete={name === 'password' ? 'current-password' : 'email'}
          className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 ${
            errs[name]
              ? 'border-red-300 focus:ring-red-100'
              : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
          } ${name === 'password' ? 'pr-11' : ''}`}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-mosai-blue-dark via-mosai-blue to-blue-700 flex items-center justify-center px-4 py-16">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 bg-white group-hover:bg-gray-50 rounded-2xl flex items-center justify-center transition-colors duration-200 border border-white/20 p-1.5">
              <img src={mosaiLogo} alt="Mosai Schools" className="w-full h-full object-contain" />
            </div>
            <div className="text-center">
              <p className="font-heading font-extrabold text-2xl text-white leading-none">Mosai Schools</p>
              <p className="font-body text-xs text-blue-200 mt-1">Portal Login</p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">

          {/* Role selector */}
          <div className="mb-7">
            <p className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sign in as</p>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map(r => {
                const Icon = r.icon
                const active = role === r.key
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => { setRole(r.key); setAuthErr('') }}
                    className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border-2 text-center transition-all duration-200 ${
                      active
                        ? 'border-mosai-blue bg-mosai-blue-light'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-mosai-blue' : 'text-gray-400'}`} />
                    <span className={`font-heading font-bold text-xs ${active ? 'text-mosai-blue' : 'text-gray-500'}`}>
                      {r.label}
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="font-body text-xs text-gray-400 mt-2 text-center">
              {ROLES.find(r => r.key === role)?.desc}
            </p>
          </div>

          {/* Auth error */}
          {authErr && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="font-body text-sm text-red-600">{authErr}</p>
            </div>
          )}

          <form onSubmit={submit} noValidate className="space-y-4">
            {inp('Email Address', 'email', 'email', 'you@example.com')}
            {inp('Password', 'password', 'password', '••••••••')}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={change}
                  className="w-4 h-4 rounded border-gray-300 text-mosai-blue focus:ring-mosai-blue/30"
                />
                <span className="font-body text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="font-body text-sm text-mosai-blue hover:text-mosai-blue-dark hover:underline transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-mosai-blue-dark hover:bg-mosai-blue text-white font-heading font-bold text-base py-3.5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="text-center font-body text-sm text-gray-400 mt-6">
            Accounts are created by the school administration.<br />
            Contact us at{' '}
            <a href="mailto:mosaischools@gmail.com" className="text-mosai-blue hover:underline">
              mosaischools@gmail.com
            </a>
          </p>
        </div>

        {/* Master test credentials */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-5 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            <p className="font-heading font-bold text-xs text-white/70 uppercase tracking-widest">Test Account</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-body text-xs text-white/50">Email</span>
              <button
                onClick={() => setForm(f => ({ ...f, email: MASTER.email }))}
                className="font-body text-xs font-semibold text-yellow-300 hover:text-yellow-100 transition-colors font-mono"
              >
                {MASTER.email}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-xs text-white/50">Password</span>
              <button
                onClick={() => setForm(f => ({ ...f, password: MASTER.password }))}
                className="font-body text-xs font-semibold text-yellow-300 hover:text-yellow-100 transition-colors font-mono"
              >
                {MASTER.password}
              </button>
            </div>
          </div>
          <p className="font-body text-[10px] text-white/40 mt-3 leading-relaxed">
            Click the values above to auto-fill. Select a role to access the corresponding dashboard.
          </p>
        </div>

        {/* Back to site */}
        <p className="text-center mt-4">
          <Link to="/" className="font-body text-sm text-white/60 hover:text-white transition-colors">
            ← Back to Mosai Schools website
          </Link>
        </p>
      </div>
    </div>
  )
}
