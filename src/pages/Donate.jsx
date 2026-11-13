import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap, Utensils, BookOpen, Building2, Shirt, Trophy,
  Gift, CalendarHeart, HeartHandshake, Package, Briefcase, Clock,
  ShieldCheck, ReceiptText, Target, Eye,
  Heart, Phone, MessageCircle, Mail, Send, CheckCircle, AlertCircle, ArrowRight,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import SimpleCaptcha from '../components/SimpleCaptcha'
import { checkRateLimit, sanitize } from '../lib/formSecurity'
import { trackEvent } from '../lib/analytics'
import { useCampus } from '../context/CampusContext'
import { DONATE, DONATION_PURPOSES, DONATION_FREQUENCIES, DONATION_AMOUNTS } from '../lib/giving'
import PageHeader from '../components/PageHeader'
import DonateBunono from './DonateBunono'

import headerImg from '../assets/IMG_8592.webp'   // performance / march
import storyImg  from '../assets/TON_8735.webp'   // on stage

const ICONS = {
  GraduationCap, Utensils, BookOpen, Building2, Shirt, Trophy,
  Gift, CalendarHeart, HeartHandshake, Package, Briefcase, Clock,
  ShieldCheck, ReceiptText, Target, Eye,
}

const CREAM = '#FFF8EE'

/* ── Donation enquiry form ────────────────────────────────────────────────
 * The school takes no payment through this website. This form starts the
 * conversation: the office replies with official payment instructions and
 * issues a receipt. Exported so the Bunono page reuses the exact same logic.
 * `theme` switches the visual skin without duplicating any of the behaviour. */
export function DonationForm({ theme = 'nalugala' }) {
  const blank = {
    name: '', email: '', phone: '', organisation: '',
    purpose: DONATION_PURPOSES[0], frequency: DONATION_FREQUENCIES[0], amount: '',
    message: '', website: '',
  }
  const [form, setForm]       = useState(blank)
  const [errs, setErrs]       = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [captchaOk, setCaptchaOk]     = useState(false)
  const [captchaSeed, setCaptchaSeed] = useState(0)

  const bunono = theme === 'bunono'
  const field = `w-full font-body text-sm px-4 py-3 rounded-xl border ${bunono ? 'bg-white' : 'bg-gray-50'} focus:bg-white transition-all duration-150 focus:outline-none focus:ring-2`
  const ok    = bunono
    ? 'border-gray-200 focus:border-mosai-red focus:ring-mosai-red/15'
    : 'border-gray-200 focus:border-mosai-blue focus:ring-mosai-blue/15'
  const bad   = 'border-red-300 focus:ring-red-100'
  const labelCls = 'block font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'

  function validate() {
    const e = {}
    if (!form.name.trim())  e.name  = 'Please enter your name'
    if (!form.email.trim()) e.email = 'Please enter your email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address'
    if (form.phone.trim() && !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Please enter a valid phone number'
    if (!form.purpose)   e.purpose   = 'Please choose what you would like to support'
    if (!form.frequency) e.frequency = 'Please choose how often you would like to give'
    if (!captchaOk)      e.captcha   = 'Please answer the sum to confirm you are human'
    return e
  }

  function change(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errs[name]) setErrs(er => ({ ...er, [name]: '' }))
  }

  async function submit(e) {
    e.preventDefault()
    if (form.website) return             // honeypot
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
          from_name:  sanitize(form.name),
          from_email: sanitize(form.email),
          phone:      sanitize(form.phone),
          subject:    'Donation Enquiry',
          message: [
            `DONATION ENQUIRY`,
            `Organisation: ${sanitize(form.organisation) || 'Not given'}`,
            `Supporting:   ${sanitize(form.purpose)}`,
            `How often:    ${sanitize(form.frequency)}`,
            `Amount:       ${sanitize(form.amount) || 'Not stated'}`,
            ``,
            sanitize(form.message, 2000) || '(no additional message)',
          ].join('\n'),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      trackEvent('donation_enquiry', { purpose: form.purpose, frequency: form.frequency })
      setSent(true)
    } catch {
      setErrs({ captcha: 'Failed to send. Please try again, or email us directly.' })
      setCaptchaOk(false)
      setCaptchaSeed(s => s + 1)
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>
      <h3 className="mb-2 font-heading text-2xl font-extrabold text-mosai-blue-dark">Thank you</h3>
      <p className="mb-2 max-w-sm font-body text-sm text-gray-500">
        Your message has reached the school office. We will reply within one working day with the school’s official
        payment instructions and answer any questions you have.
      </p>
      <p className="mb-8 font-body text-xs text-gray-400">
        We will write to <span className="font-semibold text-mosai-blue">{form.email}</span>
      </p>
      <button
        onClick={() => { setForm(blank); setSent(false); setErrs({}); setCaptchaOk(false); setCaptchaSeed(s => s + 1) }}
        className="font-body text-sm text-mosai-blue hover:underline"
      >
        Send another message
      </button>
    </div>
  )

  const err = (name) => errs[name] && (
    <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
      <AlertCircle className="h-3 w-3" />{errs[name]}
    </p>
  )

  const input = (label, name, type = 'text', placeholder = '', required = true) => (
    <div>
      <label className={labelCls}>{label}{required && <span className="ml-0.5 text-mosai-red">*</span>}</label>
      <input
        type={type} name={name} value={form[name]} onChange={change} placeholder={placeholder}
        className={`${field} ${errs[name] ? bad : ok}`}
      />
      {err(name)}
    </div>
  )

  const select = (label, name, options, required = true) => (
    <div>
      <label className={labelCls}>{label}{required && <span className="ml-0.5 text-mosai-red">*</span>}</label>
      <select name={name} value={form[name]} onChange={change} className={`${field} ${errs[name] ? bad : ok}`}>
        {!required && <option value="">Prefer not to say</option>}
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {err(name)}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {/* Honeypot */}
      <input
        type="text" name="website" value={form.website} onChange={change}
        tabIndex={-1} aria-hidden="true" autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {input('Your Name', 'name', 'text', 'e.g. Sarah Nankunda')}
        {input('Email Address', 'email', 'email', 'you@example.com')}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {input('Phone / WhatsApp', 'phone', 'tel', '+256 700 000 000', false)}
        {input('Organisation', 'organisation', 'text', 'Company, church or group (optional)', false)}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {select('What would you like to support?', 'purpose', DONATION_PURPOSES)}
        {select('How often?', 'frequency', DONATION_FREQUENCIES)}
      </div>

      {select('Amount you have in mind', 'amount', DONATION_AMOUNTS, false)}

      <div>
        <label className={labelCls}>Anything else we should know?</label>
        <textarea
          name="message" value={form.message} onChange={change} rows={4}
          placeholder="Tell us a little about why you would like to give, or ask us anything…"
          className={`${field} resize-none ${errs.message ? bad : ok}`}
        />
      </div>

      <div className={`flex items-start gap-2.5 rounded-xl px-4 py-3 ${bunono ? 'bg-crayon-sun/20' : 'bg-mosai-blue-light'}`}>
        <ShieldCheck className={`mt-0.5 h-4 w-4 shrink-0 ${bunono ? 'text-mosai-red' : 'text-mosai-blue'}`} />
        <p className="font-body text-xs leading-relaxed text-gray-600">
          This form takes <strong>no payment</strong> and never asks for card, bank or mobile money details. The school
          office will reply with official payment instructions, which you are welcome to verify by phoning us.
        </p>
      </div>

      <SimpleCaptcha onChange={setCaptchaOk} error={errs.captcha} seed={captchaSeed} />

      <button
        type="submit"
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-heading text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] ${
          bunono ? 'bg-mosai-red hover:bg-mosai-red-dark' : 'bg-mosai-red hover:bg-mosai-red-dark'
        } ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <><Send className="h-4 w-4" /> Send My Donation Enquiry</>
        )}
      </button>
    </form>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function Donate() {
  const { campus, campusInfo } = useCampus()
  if (campus === 'bunono') return <DonateBunono />

  const tel = campusInfo.phone.replace(/\s+/g, '')
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')
  const crayon = { '--crayon-color': campusInfo.theme.crayon }

  return (
    <main className="bg-mist">

      {/* ── 1. Header ──────────────────────────────────────────────────── */}
      <PageHeader
        crumb="Donate"
        title="Help a Child"
        accentWord="Go to School"
        kicker="Support Our Learners"
        subtitle="Affordable fees only work because friends of the school help carry the cost. Your gift buys books, meals, uniforms and school places for children who would otherwise go without."
        image={headerImg}
        nextBg="#F3F6FA"
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#give"
            className="inline-flex items-center gap-2 rounded-full bg-mosai-red px-6 py-3 font-heading text-sm font-bold text-white shadow-lg transition-colors duration-200 hover:bg-mosai-red-dark"
          >
            <Heart className="h-4 w-4" /> I Would Like to Give
          </a>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-heading text-sm font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" /> Talk to Us First
          </a>
        </div>
      </PageHeader>

      {/* ── 2. Why it matters ──────────────────────────────────────────── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <img
                src={storyImg}
                alt="Mosai Schools learners on stage"
                className="h-80 w-full rounded-3xl object-cover shadow-xl sm:h-96"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -right-4 -bottom-6 hidden rounded-2xl bg-mosai-blue-dark px-6 py-5 text-white shadow-xl sm:block">
                <p className="font-heading text-3xl font-extrabold">100%</p>
                <p className="font-body text-xs text-blue-200">goes to the children</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Why give</span>
              <h2 className="mt-2 mb-5 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
                Fees alone don’t{' '}
                <span className="crayon-underline" style={crayon}>fill a classroom</span>
              </h2>
              {DONATE.intro.map((para) => (
                <p key={para.slice(0, 24)} className="mb-4 font-body leading-relaxed text-gray-600">{para}</p>
              ))}
              <Link
                to="/scholarships"
                className="group mt-2 inline-flex items-center gap-2 font-heading text-sm font-bold text-mosai-red transition-colors hover:text-mosai-red-dark"
              >
                Read about our scholarship programme
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. What a gift does ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Your impact</span>
            <h2 className="mt-2 mb-3 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
              What a gift{' '}
              <span className="crayon-underline" style={crayon}>actually does</span>
            </h2>
            <p className="mx-auto max-w-2xl font-body text-gray-600">
              Give any amount you like, and these are simply the figures behind the things we buy most often.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DONATE.tiers.map((tier) => (
              <div
                key={tier.label}
                className={`flex flex-col rounded-3xl p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg ${
                  tier.featured ? 'bg-mosai-blue-dark text-white ring-4 ring-mosai-red' : 'bg-white'
                }`}
              >
                {tier.featured && (
                  <span className="mb-3 self-start rounded-full bg-mosai-red px-3 py-1 font-heading text-[10px] font-extrabold tracking-wider text-white uppercase">
                    Most needed
                  </span>
                )}
                <p className={`font-heading text-2xl font-extrabold ${tier.featured ? 'text-white' : 'text-mosai-blue-dark'}`}>
                  {tier.label}
                </p>
                <p className={`mt-0.5 font-body text-xs ${tier.featured ? 'text-blue-200' : 'text-gray-400'}`}>{tier.approx}</p>
                <h3 className={`mt-4 mb-2 font-heading text-lg font-extrabold ${tier.featured ? 'text-white' : 'text-mosai-blue-dark'}`}>
                  {tier.title}
                </h3>
                <p className={`flex-1 font-body text-sm leading-relaxed ${tier.featured ? 'text-blue-200' : 'text-gray-500'}`}>
                  {tier.text}
                </p>
                <a
                  href="#give"
                  className={`mt-6 inline-flex items-center justify-center gap-2 self-stretch rounded-full py-3 font-heading text-sm font-bold transition-colors duration-200 ${
                    tier.featured
                      ? 'bg-mosai-red text-white hover:bg-mosai-red-dark'
                      : 'bg-mosai-blue-light text-mosai-blue hover:bg-mosai-blue hover:text-white'
                  }`}
                >
                  Give {tier.label.replace('UGX ', '')}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center font-body text-xs text-gray-400">
            Foreign currency equivalents are approximate and move with the exchange rate.
          </p>
        </div>
      </section>

      {/* ── 4. Where donations go ──────────────────────────────────────── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Where it goes</span>
            <h2 className="mt-2 mb-4 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
              What your giving{' '}
              <span className="crayon-underline" style={crayon}>supports</span>
            </h2>
            <p className="font-body leading-relaxed text-gray-600">
              You can direct your gift to any of these, or leave it to us to apply where the need is greatest that term.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DONATE.areas.map((area) => {
              const Icon = ICONS[area.icon]
              return (
                <div key={area.title} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${area.color}22` }}>
                    <Icon className="h-6 w-6" style={{ color: area.color }} />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-extrabold text-mosai-blue-dark">{area.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-gray-500">{area.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Ways to give ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Ways to help</span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
              More than one way to{' '}
              <span className="crayon-underline" style={crayon}>give</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DONATE.ways.map((way) => {
              const Icon = ICONS[way.icon]
              return (
                <div key={way.title} className="flex gap-4 rounded-3xl bg-white p-7 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mosai-red-light">
                    <Icon className="h-5 w-5 text-mosai-red" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-heading text-base font-extrabold text-mosai-blue-dark">{way.title}</h3>
                    <p className="font-body text-sm leading-relaxed text-gray-500">{way.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. How giving works ────────────────────────────────────────── */}
      <section className="bg-mosai-blue-dark py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red-light uppercase">The process</span>
            <h2 className="mt-2 mb-3 font-heading text-3xl font-extrabold text-white sm:text-4xl">How giving works</h2>
            <p className="mx-auto max-w-2xl font-body leading-relaxed text-blue-200">
              Mosai Schools does not collect payments through this website. Instead you tell us what you would like to
              do, and the school office sends you its official instructions directly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DONATE.howItWorks.map((step, i) => (
              <div key={step.title} className="rounded-3xl bg-white/5 p-7">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-mosai-red font-heading text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-heading text-base font-extrabold text-white">{step.title}</h3>
                <p className="font-body text-sm leading-relaxed text-blue-200">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Trust & accountability ──────────────────────────────────── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Your gift is safe</span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-mosai-blue-dark sm:text-4xl">
              How we look after{' '}
              <span className="crayon-underline" style={crayon}>what you give</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DONATE.assurances.map((a) => {
              const Icon = ICONS[a.icon]
              return (
                <div key={a.title} className="flex gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-7">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon className="h-5 w-5 text-mosai-blue" />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-heading text-base font-extrabold text-mosai-blue-dark">{a.title}</h3>
                    <p className="font-body text-sm leading-relaxed text-gray-500">{a.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 8. The form ────────────────────────────────────────────────── */}
      <section id="give" className="scroll-mt-24 bg-mist-deep py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5">

            <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-10 lg:col-span-3">
              <span className="font-body text-xs font-bold tracking-widest text-mosai-red uppercase">Start giving</span>
              <h2 className="mt-1 mb-2 font-heading text-3xl font-extrabold text-mosai-blue-dark">I would like to give</h2>
              <p className="mb-7 font-body text-sm leading-relaxed text-gray-500">
                Tell us what you have in mind and the school office will reply within one working day with the official
                payment details. Nothing is charged here, and you can change your mind at any point.
              </p>
              <DonationForm />
            </div>

            <div className="space-y-5 lg:sticky lg:top-28 lg:col-span-2">
              <div className="rounded-3xl bg-mosai-blue-dark p-7 text-white">
                <h3 className="mb-2 font-heading text-lg font-extrabold">Prefer to speak to someone?</h3>
                <p className="mb-5 font-body text-sm leading-relaxed text-blue-200">
                  The {campusInfo.name} Campus office is happy to talk through anything before you commit,
                  Monday to Friday, 8:00 AM to 4:00 PM.
                </p>
                <div className="space-y-2.5">
                  <a href={`tel:${tel}`} className="flex items-center gap-2.5 rounded-full bg-mosai-red px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-mosai-red-dark">
                    <Phone className="h-4 w-4" /> {campusInfo.phone}
                  </a>
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-full border border-white/30 px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10">
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <a href={`mailto:${campusInfo.email}?subject=Donation%20Enquiry`} className="flex items-center gap-2.5 rounded-full border border-white/30 px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10">
                    <Mail className="h-4 w-4" /> Email the office
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-mosai-blue-light">
                  <GraduationCap className="h-6 w-6 text-mosai-blue" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-extrabold text-mosai-blue-dark">Who your gift reaches</h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-gray-500">
                  Scholarship places go to vulnerable and disadvantaged, yet able and gifted children, chosen against
                  criteria approved by school management.
                </p>
                <Link to="/scholarships" className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-mosai-red transition-colors hover:text-mosai-red-dark">
                  See how children are chosen
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
