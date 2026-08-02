import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Eye, EyeOff, Users, BookOpen, Lock, Mail } from 'lucide-react'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'

const config = {
  parent: {
    icon: Users,
    title: 'Parent Portal',
    subtitle: 'Sign in to track your child\'s progress',
    accent: 'mosai-blue',
    accentDark: 'mosai-blue-dark',
    accentLight: 'mosai-blue-light',
    switchLabel: 'Are you a staff member?',
    switchTarget: 'staff',
    switchLink: 'Sign in to Staff Portal',
  },
  staff: {
    icon: BookOpen,
    title: 'Staff Portal',
    subtitle: 'Sign in to access your teaching dashboard',
    accent: 'mosai-red',
    accentDark: 'mosai-red-dark',
    accentLight: 'mosai-red-light',
    switchLabel: 'Are you a parent?',
    switchTarget: 'parent',
    switchLink: 'Sign in to Parent Portal',
  },
}

export default function LoginModal({ type, onClose, onSwitch }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass]  = useState(false)
  const [remember, setRemember]  = useState(false)
  const [loading, setLoading]    = useState(false)
  const [error, setError]        = useState('')

  const cfg   = config[type]
  const Icon  = cfg.icon
  const isRed = type === 'staff'

  // Close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    // Simulate async auth — replace with real call
    setTimeout(() => {
      setLoading(false)
      setError('Invalid email or password. Please try again.')
    }, 1400)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Backdrop — click anywhere outside the card to close */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">

        {/* Top accent bar */}
        <div className={`h-1.5 ${isRed ? 'bg-mosai-red' : 'bg-mosai-blue'}`} />

        {/* Header */}
        <div className={`px-8 pt-7 pb-5 ${isRed ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center transition-colors duration-150"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isRed ? 'bg-mosai-red text-white' : 'bg-mosai-blue text-white'}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <img src={mosaiLogo} alt="MOSAI Schools" className="w-4 h-4 object-contain" />
                <span className="font-body text-xs text-gray-400 font-medium">Mosai Schools</span>
              </div>
              <h2 className="font-heading font-extrabold text-xl text-mosai-blue-dark">{cfg.title}</h2>
            </div>
          </div>
          <p className="font-body text-sm text-gray-500 mt-2">{cfg.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mosai-red rounded-full shrink-0" />
              <p className="font-body text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block font-body text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl font-body text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-150 ${
                  isRed
                    ? 'border-gray-200 focus:border-mosai-red focus:ring-mosai-red/20'
                    : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/20'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Password
              </label>
              <a href="#" className={`font-body text-xs font-semibold ${isRed ? 'text-mosai-red' : 'text-mosai-blue'} hover:underline`}>
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-3 border rounded-xl font-body text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-150 ${
                  isRed
                    ? 'border-gray-200 focus:border-mosai-red focus:ring-mosai-red/20'
                    : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2.5 select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className={`w-4 h-4 rounded border-gray-300 ${isRed ? 'accent-mosai-red' : 'accent-mosai-blue'}`}
            />
            <span className="font-body text-sm text-gray-600">Keep me signed in</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-heading font-bold text-sm text-white py-3.5 rounded-xl transition-all duration-200 ${
              loading ? 'opacity-70 cursor-wait' : 'hover:opacity-90 active:scale-[0.98]'
            } ${isRed ? 'bg-mosai-red' : 'bg-mosai-blue-dark'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
                </svg>
                Signing in…
              </>
            ) : (
              `Sign In to ${cfg.title}`
            )}
          </button>

          {/* Switch portal */}
          <p className="font-body text-sm text-gray-400 text-center pt-1">
            {cfg.switchLabel}{' '}
            <button
              type="button"
              onClick={() => onSwitch(cfg.switchTarget)}
              className={`font-semibold ${isRed ? 'text-mosai-red' : 'text-mosai-blue'} hover:underline`}
            >
              {cfg.switchLink}
            </button>
          </p>
        </form>
      </div>
    </div>,
    document.body
  )
}
