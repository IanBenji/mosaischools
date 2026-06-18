import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Clock, Send, ArrowRight,
  Building2, CheckCircle, AlertCircle, Calendar,
  GraduationCap, CreditCard, BookOpen,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { checkRateLimit, sanitize } from '../lib/formSecurity'

import headerImg from '../assets/IMG_8829.webp'
import campusImg from '../assets/TON_8735.webp'

const SUBJECTS = [
  'General Inquiry',
  'Admissions',
  'Fee Payment Support',
  'Feedback / Suggestions',
  'Partnership / Collaboration',
  'Other',
]

function ContactForm() {
  const blank = { name: '', email: '', phone: '', subject: '', message: '', website: '' }
  const [form, setForm]       = useState(blank)
  const [errs, setErrs]       = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const captchaRef            = useRef(null)
  const [captchaToken, setCaptchaToken] = useState('')

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Please enter your full name'
    if (!form.email.trim())   e.email   = 'Please enter your email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Please enter a valid email address'
    if (form.phone.trim() && !/^\+?[\d\s\-()]{7,}$/.test(form.phone))
                              e.phone   = 'Please enter a valid phone number'
    if (!form.subject)        e.subject = 'Please select a subject'
    if (!form.message.trim()) e.message = 'Please enter your message'
    else if (form.message.trim().length < 10)
                              e.message = 'Message must be at least 10 characters'
    if (!captchaToken)        e.captcha = 'Please complete the CAPTCHA'
    return e
  }

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errs[name]) setErrs(er => ({ ...er, [name]: '' }))
  }

  async function submit(e) {
    e.preventDefault()
    // Honeypot: bots fill the hidden field, humans leave it blank
    if (form.website) return
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    if (!checkRateLimit()) {
      setErrs({ captcha: 'Too many submissions. Please wait an hour before trying again.' })
      return
    }
    setLoading(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
        {
          from_name: sanitize(form.name),
          from_email: sanitize(form.email),
          phone:      sanitize(form.phone),
          subject:    sanitize(form.subject),
          message:    sanitize(form.message, 2000),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSent(true)
    } catch {
      setErrs({ captcha: 'Failed to send message. Please try again or email us directly.' })
      captchaRef.current?.resetCaptcha()
      setCaptchaToken('')
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h3 className="font-heading font-extrabold text-2xl text-mosai-blue-dark mb-2">Message Sent!</h3>
      <p className="font-body text-sm text-gray-500 max-w-xs mb-2">
        Thank you for reaching out to MOSAI Schools. We will respond within one working day.
      </p>
      <p className="font-body text-xs text-gray-400 mb-8">
        Confirmation sent to <span className="font-semibold text-mosai-blue">{form.email}</span>
      </p>
      <button
        onClick={() => { setForm(blank); setSent(false); setErrs({}) }}
        className="font-body text-sm text-mosai-blue hover:underline"
      >
        Send another message
      </button>
    </div>
  )

  const inp = (label, name, type = 'text', placeholder = '', required = true) => (
    <div>
      <label className="block font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-mosai-red ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={change}
        placeholder={placeholder}
        className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 ${
          errs[name]
            ? 'border-red-300 focus:ring-red-100'
            : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
        }`}
      />
      {errs[name] && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1 font-body">
          <AlertCircle className="w-3 h-3" />{errs[name]}
        </p>
      )}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, bots fill it in */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={change}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {inp('Full Name', 'name', 'text', 'e.g. Sarah Nankunda')}
        {inp('Email Address', 'email', 'email', 'you@example.com')}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {inp('Phone Number', 'phone', 'tel', '+256 700 000 000', false)}
        <div>
          <label className="block font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Subject<span className="text-mosai-red ml-0.5">*</span>
          </label>
          <select
            name="subject"
            value={form.subject}
            onChange={change}
            className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 ${
              errs.subject
                ? 'border-red-300 focus:ring-red-100'
                : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
            }`}
          >
            <option value="">Select a subject…</option>
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
          {errs.subject && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1 font-body">
              <AlertCircle className="w-3 h-3" />{errs.subject}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Your Message<span className="text-mosai-red ml-0.5">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={change}
          rows={5}
          placeholder="How can we help you? Tell us about your inquiry…"
          className={`w-full font-body text-sm px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2 resize-none ${
            errs.message
              ? 'border-red-300 focus:ring-red-100'
              : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
          }`}
        />
        {errs.message && (
          <p className="flex items-center gap-1 text-xs text-red-500 mt-1 font-body">
            <AlertCircle className="w-3 h-3" />{errs.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5 bg-mosai-blue-light rounded-xl px-4 py-3">
        <AlertCircle className="w-4 h-4 text-mosai-blue mt-0.5 shrink-0" />
        <p className="font-body text-xs text-gray-600 leading-relaxed">
          By submitting this form you consent to MOSAI Schools processing your data to respond to your inquiry. We will not share your information with third parties.
        </p>
      </div>

      <HCaptcha
        sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
        onVerify={token => { setCaptchaToken(token); setErrs(e => ({ ...e, captcha: '' })) }}
        onExpire={() => setCaptchaToken('')}
        ref={captchaRef}
      />
      {errs.captcha && (
        <p className="flex items-center gap-1 text-xs text-red-500 font-body">
          <AlertCircle className="w-3 h-3" />{errs.captcha}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-base py-4 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </button>
    </form>
  )
}

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Contact() {
  return (
    <main className="bg-white">

      {/* â”€â”€ 1. Page Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <img
          src={headerImg}
          alt="MOSAI Schools"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-mosai-blue-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-mosai-blue-dark/45 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-36">
          <nav className="flex items-center gap-2 font-body text-sm text-white/50 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </nav>
          <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-white leading-tight mb-4">
            Contact <span className="text-mosai-red">Us</span>
          </h1>
          <p className="font-body text-white/75 text-lg max-w-xl leading-relaxed mb-7">
            We'd love to hear from you. Reach out with any questions about admissions, programs, or school life — our team responds within one working day.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+256700123456"
              className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-6 py-3 rounded-full transition-colors duration-200 shadow-lg"
            >
              <Phone className="w-4 h-4" /> Call Us Now
            </a>
            <a
              href="mailto:info@mosaischools.ug"
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-heading font-bold text-sm px-6 py-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
            >
              <Mail className="w-4 h-4" /> Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* â”€â”€ 2. Contact Info Cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-white pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-12 relative z-10">

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group sm:col-span-2 lg:col-span-1">
              <div className="w-11 h-11 bg-mosai-red-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <MapPin className="w-5 h-5 text-mosai-red" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Our Location</p>
              <p className="font-heading font-bold text-sm text-mosai-blue-dark leading-snug">
                Off Stabex Fuel Station — Garuga Road<br />
                Along Kampala-Entebbe Road<br />
                Katabi, Wakiso District, Uganda
              </p>
            </div>

            {/* Campuses */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-11 h-11 bg-mosai-blue-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-5 h-5 text-mosai-blue" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Campuses</p>
              <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-1">Nalugala Campus</p>
              <p className="font-body text-xs text-gray-500 mb-3">Garuga Road · Est. Jan 2025</p>
              <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-1">Bunono Campus</p>
              <p className="font-body text-xs text-gray-500">Katabi · Est. 2026</p>
            </div>

            {/* Phone & Email */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-11 h-11 bg-mosai-red-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <Phone className="w-5 h-5 text-mosai-red" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Phone</p>
              <a href="tel:+256700123456" className="font-heading font-bold text-sm text-mosai-blue-dark hover:text-mosai-blue transition-colors block mb-4">
                +256 700 123 456
              </a>
              <div className="w-11 h-11 bg-mosai-blue-light rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <Mail className="w-5 h-5 text-mosai-blue" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Email</p>
              <a href="mailto:info@mosaischools.ug" className="font-heading font-bold text-sm text-mosai-blue-dark hover:text-mosai-blue transition-colors">
                info@mosaischools.ug
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-11 h-11 bg-mosai-blue-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <Clock className="w-5 h-5 text-mosai-blue" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-3">Office Hours</p>
              <ul className="space-y-2">
                {[
                  { day: 'Mon – Fri', hours: '8:00 AM – 4:00 PM', open: true },
                  { day: 'Saturday',  hours: 'Closed',             open: false },
                  { day: 'Sunday',    hours: 'Closed',             open: false },
                ].map(row => (
                  <li key={row.day} className="flex justify-between items-center font-body text-xs">
                    <span className="text-gray-500">{row.day}</span>
                    <span className={`font-semibold ${row.open ? 'text-mosai-blue-dark' : 'text-gray-400'}`}>{row.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs text-mosai-red mt-3 leading-snug">
                Offices open during holidays for admissions inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ 3 + 4. Form & Map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-7 sm:p-10">
              <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Send Us a Message</span>
              <h2 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mt-1 mb-2">Get in Touch</h2>
              <p className="font-body text-sm text-gray-500 mb-7 leading-relaxed">
                Fill in the form below and a member of our team will respond within one working day, Monday to Friday.
              </p>
              <ContactForm />
            </div>

            {/* Right panel */}
            <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-28">

              {/* Google Map embed */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: '280px' }}>
                <iframe
                  title="MOSAI Schools location — Garuga Road, Katabi, Wakiso District"
                  src="https://maps.google.com/maps?q=Garuga+Road,+Katabi,+Wakiso+District,+Uganda&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map note */}
              <div className="flex items-start gap-2.5 bg-mosai-blue-light rounded-xl px-4 py-3">
                <MapPin className="w-4 h-4 text-mosai-blue mt-0.5 shrink-0" />
                <p className="font-body text-xs text-mosai-blue-dark leading-relaxed">
                  <span className="font-semibold">Off Stabex Fuel Station</span> — Garuga Road, along Kampala-Entebbe Road, Katabi, Wakiso District, Uganda.
                </p>
              </div>

              {/* Quick Links */}
              <div className="bg-mosai-blue-dark rounded-2xl p-6 text-white">
                <h3 className="font-heading font-bold text-base text-white mb-4">Quick Links</h3>
                <div className="space-y-1">
                  {[
                    { label: 'Apply Now',      to: '/admissions',       icon: GraduationCap },
                    { label: 'Programs',       to: '/programs',          icon: BookOpen      },
                    { label: 'Fee Structure',  to: '/admissions',        icon: CreditCard    },
                    { label: 'School Gallery', to: '/gallery',           icon: Building2     },
                  ].map(({ label, to, icon: Icon }) => (
                    <Link
                      key={label}
                      to={to}
                      className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0 group text-white/80 hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-mosai-red-light shrink-0" />
                        <span className="font-body text-sm font-semibold">{label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Campus image */}
              <div className="relative rounded-2xl overflow-hidden group shadow-md">
                <img
                  src={campusImg}
                  alt="Nalugala Campus"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mosai-blue-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-heading font-bold text-sm">Nalugala Campus</p>
                  <p className="font-body text-xs text-blue-200">Garuga Road, Katabi · Est. 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ 5. Schedule a Visit banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-12 bg-mosai-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-mosai-red rounded-xl flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-heading font-extrabold text-xl text-white">
                  Schedule a Campus Visit
                </h2>
                <p className="font-body text-blue-200 text-sm mt-1">
                  Come and see MOSAI Schools in person. Our team is available Mon – Fri, 8:00 AM – 4:00 PM.
                  <span className="text-mosai-red-light"> Offices also open during holidays for admissions.</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:+256700123456"
                className="font-heading font-bold text-sm bg-mosai-red hover:bg-mosai-red-dark text-white px-6 py-3 rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Call to Book
              </a>
              <a
                href="mailto:info@mosaischools.ug"
                className="font-heading font-bold text-sm border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
