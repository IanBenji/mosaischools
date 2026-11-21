import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Clock, Send, ArrowRight,
  Building2, CheckCircle, AlertCircle, Calendar,
  GraduationCap, CreditCard, BookOpen, MessageCircle,
} from 'lucide-react'
import { sendForm } from '../lib/sendForm'
import SimpleCaptcha from '../components/SimpleCaptcha'
import { checkRateLimit, sanitize } from '../lib/formSecurity'
import { useCampus } from '../context/CampusContext'
import { CAMPUSES } from '../lib/campus'
import PageHeader from '../components/PageHeader'
import ContactBunono from './ContactBunono'

import { NAL } from '../assets/nalugala-campus'

const headerImg = NAL.office.img   // the Nalugala front office, where visiting families are received

const SUBJECTS = [
  'General Inquiry',
  'Admissions',
  'Scholarship Application',
  'Donations / Giving',
  'Book a School Visit',
  'Fee Payment Support',
  'Feedback / Suggestions',
  'Partnership / Collaboration',
  'Other',
]

/* `defaultSubject` pre-selects the dropdown so a form embedded on, say, the
 * Scholarships page arrives in the inbox already labelled. */
export function ContactForm({ defaultSubject = '' }) {
  const blank = { name: '', email: '', phone: '', subject: defaultSubject, message: '', website: '' }
  const [form, setForm]       = useState(blank)
  const [errs, setErrs]       = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [captchaOk, setCaptchaOk]     = useState(false)
  const [captchaSeed, setCaptchaSeed] = useState(0)

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
    if (!captchaOk)           e.captcha = 'Please answer the sum to confirm you are human'
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
      await sendForm({
          from_name: sanitize(form.name),
          from_email: sanitize(form.email),
          phone:      sanitize(form.phone),
          subject:    sanitize(form.subject),
          message:    sanitize(form.message, 2000),
        })
      setSent(true)
    } catch {
      setErrs({ captcha: 'Failed to send message. Please try again or email us directly.' })
      setCaptchaOk(false)
      setCaptchaSeed(s => s + 1)
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
        We will reply to <span className="font-semibold text-mosai-blue">{form.email}</span>
      </p>
      <button
        onClick={() => { setForm(blank); setSent(false); setErrs({}); setCaptchaOk(false); setCaptchaSeed(s => s + 1) }}
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

      <SimpleCaptcha onChange={setCaptchaOk} error={errs.captcha} seed={captchaSeed} />

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
  const { campus, campusInfo } = useCampus()
  if (campus === 'bunono') return <ContactBunono />
  const isBunono = campus === 'bunono'
  const p        = campusInfo.profile
  const tel      = campusInfo.phone.replace(/\s+/g, '')
  const altTel   = campusInfo.altPhone ? campusInfo.altPhone.replace(/\s+/g, '') : null
  const wa       = campusInfo.whatsapp.replace(/[^\d]/g, '')
  const mapSrc   = `https://maps.google.com/maps?q=${encodeURIComponent(campusInfo.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`
  const campusHero = campusInfo.hero.backgrounds[0]

  return (
    <main className="bg-mist">

      {/* â”€â”€ 1. Page Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <PageHeader
        crumb="Contact"
        title="Contact"
        accentWord="Us"
        subtitle={`We'd love to hear from you. Reach out to our ${campusInfo.name} Campus with any questions about admissions, programs, or school life, and our team responds within one working day.`}
        image={headerImg}
        nextBg="#F3F6FA"
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${tel}`}
            className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-6 py-3 rounded-full transition-colors duration-200 shadow-lg"
          >
            <Phone className="w-4 h-4" /> Call Us Now
          </a>
          <a
            href={`mailto:${campusInfo.email}`}
            className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 text-white font-heading font-bold text-sm px-6 py-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
          >
            <Mail className="w-4 h-4" /> Send an Email
          </a>
        </div>
      </PageHeader>

      {/* â”€â”€ 2. Contact Info Cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-mist pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-12 relative z-10">

            {/* Location — active campus */}
            <div key={campus} className="fade-in-up bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group sm:col-span-2 lg:col-span-1">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200 ${isBunono ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                <MapPin className={`w-5 h-5 ${isBunono ? 'text-mosai-red' : 'text-mosai-blue'}`} />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">{campusInfo.name} Campus</p>
              <p className="font-heading font-bold text-sm text-mosai-blue-dark leading-snug">
                {p.address}<br />
                {p.area}<br />
                Wakiso District, Uganda
              </p>
            </div>

            {/* Campuses — active one highlighted */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-11 h-11 bg-mosai-blue-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-5 h-5 text-mosai-blue" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-2">Our Campuses</p>
              {Object.entries(CAMPUSES).map(([slug, c]) => {
                const active = slug === campus
                return (
                  <div key={slug} className={`mb-2 last:mb-0 rounded-lg px-2 py-1.5 -mx-2 ${active ? (slug === 'bunono' ? 'bg-mosai-red-light' : 'bg-mosai-blue-light') : ''}`}>
                    <p className="font-heading font-bold text-sm text-mosai-blue-dark flex items-center gap-1.5">
                      {c.name} Campus
                      {active && <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${slug === 'bunono' ? 'bg-mosai-red text-white' : 'bg-mosai-blue text-white'}`}>You're here</span>}
                    </p>
                    <p className="font-body text-xs text-gray-500">{c.location} · Est. {c.profile.openedShort}</p>
                  </div>
                )
              })}
            </div>

            {/* Phone & Email — active campus */}
            <div key={`contact-${campus}`} className="fade-in-up bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-11 h-11 bg-mosai-red-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <Phone className="w-5 h-5 text-mosai-red" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Phone · School Office</p>
              <a href={`tel:${tel}`} className="font-heading font-extrabold text-base text-mosai-blue-dark hover:text-mosai-blue transition-colors block">
                {campusInfo.phone}
              </a>
              {altTel && (
                <>
                  <p className="font-body text-[11px] text-gray-400 uppercase tracking-wide mt-2">Also</p>
                  <a href={`tel:${altTel}`} className="font-heading font-bold text-sm text-mosai-blue-dark hover:text-mosai-blue transition-colors block">
                    {campusInfo.altPhone}
                  </a>
                </>
              )}
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-mosai-red hover:text-mosai-red-dark transition-colors mt-1.5 mb-4">
                <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
              </a>
              <div className="w-11 h-11 bg-mosai-blue-light rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <Mail className="w-5 h-5 text-mosai-blue" />
              </div>
              <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Email</p>
              <a href={`mailto:${campusInfo.email}`} className="font-heading font-bold text-sm text-mosai-blue-dark hover:text-mosai-blue transition-colors break-all">
                {campusInfo.email}
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
                  { day: 'Mon to Fri', hours: '8:00 AM to 4:00 PM', open: true },
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
      <section className="py-16 bg-mist-deep">
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

              {/* Google Map embed — active campus */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: '280px' }}>
                <iframe
                  key={campus}
                  title={`MOSAI Schools ${campusInfo.name} Campus, ${campusInfo.mapQuery}`}
                  src={mapSrc}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map note — active campus */}
              <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 ${isBunono ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isBunono ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                <p className="font-body text-xs text-mosai-blue-dark leading-relaxed">
                  <span className="font-semibold">{campusInfo.name} Campus</span>, {p.address}, {p.area}, Wakiso District, Uganda.
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
                  ].map((link) => {
                    const Icon = link.icon
                    return (
                    <Link
                      key={link.label}
                      to={link.to}
                      className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0 group text-white/80 hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-mosai-red-light shrink-0" />
                        <span className="font-body text-sm font-semibold">{link.label}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                    )
                  })}
                </div>
              </div>

              {/* Campus image — active campus */}
              <div className="relative rounded-2xl overflow-hidden group shadow-md">
                <img
                  key={campus}
                  src={campusHero}
                  alt={`${campusInfo.name} Campus`}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mosai-blue-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-heading font-bold text-sm">{campusInfo.name} Campus</p>
                  <p className="font-body text-xs text-blue-200">{campusInfo.location} · Est. {p.openedShort}</p>
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
                  Schedule a Visit to {campusInfo.name} Campus
                </h2>
                <p className="font-body text-blue-200 text-sm mt-1">
                  Come and see our {campusInfo.name} Campus in person. Our team is available Mon to Fri, 8:00 AM to 4:00 PM.
                  <span className="text-mosai-red-light"> Offices also open during holidays for admissions.</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href={`tel:${tel}`}
                className="font-heading font-bold text-sm bg-mosai-red hover:bg-mosai-red-dark text-white px-6 py-3 rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Call to Book
              </a>
              <a
                href={`mailto:${campusInfo.email}`}
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
