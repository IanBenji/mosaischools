import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck, ReceiptText, Target, Eye, Heart, Phone, MessageCircle, Mail, Send,
  CheckCircle, AlertCircle, ArrowRight, ChevronDown, Info,
} from 'lucide-react'
import { sendForm } from '../lib/sendForm'
import SimpleCaptcha from '../components/SimpleCaptcha'
import { checkRateLimit, sanitize } from '../lib/formSecurity'
import { trackEvent } from '../lib/analytics'
import { useCampus } from '../context/CampusContext'
import {
  DONATE, DONATION_PURPOSES, DONATION_TYPES, DONATION_PRESETS, DONATION_METHODS,
  DONATE_FAQ, MIN_CUSTOM_GIFT, formatUGX,
} from '../lib/giving'
import PageHeader from '../components/PageHeader'
import Doodles from '../components/Doodles'
import DonateBunono from './DonateBunono'
import { NAL } from '../assets/nalugala-campus'
import { BUN, bunonoPhotos } from '../assets/bunono'

import headerImg  from '../assets/IMG_8592.webp'   // performance / march
import nalGrad    from '../assets/TON_8807.webp'   // graduation
import nalStage   from '../assets/TON_8735.webp'   // on stage
import bunHeader  from '../assets/bunono/bunono-13.webp'   // pool play
// Official logos (Wikimedia Commons): MTN 2022, Airtel Africa, Visa (2021).
import logoMtn    from '../assets/payments/mtn.svg'
import logoAirtel from '../assets/payments/airtel.svg'
import logoVisa   from '../assets/payments/visa.svg'

const METHOD_LOGOS = { mtn: logoMtn, airtel: logoAirtel, bank: logoVisa }

/* DONATE — structured like a modern one-page donation flow:
 *   header → photo strip → one card with numbered steps
 *   (gift type → amount → cause → your details → payment method → send)
 *   → reassurance strip → FAQ → contact.
 * MOSAI takes NO payment on this website: "Send my pledge" emails the office,
 * which replies with the school's official payment details and a receipt.
 * Both campuses share this page and form; `variant` only switches the skin. */

const SKINS = {
  nalugala: {
    main:      'bg-mist',
    band:      'bg-mist-deep',
    card:      'rounded-3xl border border-gray-100 bg-white shadow-sm',
    soft:      'rounded-2xl bg-mosai-blue-light',
    ink:       'text-mosai-blue-dark',
    muted:     'text-gray-500',
    body:      'text-gray-600',
    step:      'bg-mosai-blue-dark text-white',
    chipOn:    'border-mosai-blue-dark bg-mosai-blue-dark text-white shadow-md',
    chipOff:   'border-gray-200 bg-white text-mosai-blue-dark hover:border-mosai-blue',
    focus:     'focus:border-mosai-blue focus:ring-mosai-blue/15',
    field:     'bg-gray-50 focus:bg-white',
    icon:      'text-mosai-blue',
    iconBg:    'bg-mosai-blue-light',
    rule:      'border-gray-100',
    contact:   'rounded-3xl bg-mosai-blue-dark text-white',
    contactMuted: 'text-blue-200',
  },
  bunono: {
    main:      'bg-cream overflow-hidden',
    band:      'bg-white',
    card:      'rounded-[2rem] border-2 border-dashed border-crayon-coral bg-white',
    soft:      'rounded-2xl bg-crayon-sun/20',
    ink:       'text-[#43261A]',
    muted:     'text-[#7A5C4A]',
    body:      'text-[#7A5C4A]',
    step:      'bg-crayon-sun text-mosai-red-dark',
    chipOn:    'border-mosai-red bg-mosai-red text-white shadow-md',
    chipOff:   'border-crayon-sun bg-cream text-[#43261A] hover:border-mosai-red',
    focus:     'focus:border-mosai-red focus:ring-mosai-red/15',
    field:     'bg-white',
    icon:      'text-mosai-red',
    iconBg:    'bg-crayon-sun/25',
    rule:      'border-crayon-sun/40',
    contact:   'rounded-[2rem] bg-mosai-red text-white',
    contactMuted: 'text-white/85',
  },
}

const ASSURANCE_ICONS = [ShieldCheck, ReceiptText, Target, Eye]

function Step({ n, title, hint, s, children }) {
  return (
    <fieldset className={`border-t pt-7 first:border-t-0 first:pt-0 ${s.rule}`}>
      <legend className="mb-4 flex w-full items-center gap-3">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-heading text-sm font-extrabold ${s.step}`}>{n}</span>
        <span className={`font-heading text-lg font-extrabold ${s.ink}`}>{title}</span>
        {hint && <span className={`ml-auto hidden font-body text-xs sm:inline ${s.muted}`}>{hint}</span>}
      </legend>
      {children}
    </fieldset>
  )
}

/* ── Donation form ────────────────────────────────────────────────────────
 * Exported so both campus pages reuse the exact same behaviour. */
export function DonationForm({ theme = 'nalugala' }) {
  const s = SKINS[theme] || SKINS.nalugala
  const blank = {
    type: DONATION_TYPES[0].id, preset: DONATION_PRESETS[1].ugx, custom: '',
    purpose: DONATION_PURPOSES[0],
    name: '', email: '', phone: '', organisation: '',
    method: DONATION_METHODS[0].id, momo: '',
    message: '', website: '',
  }
  const [form, setForm]       = useState(blank)
  const [errs, setErrs]       = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [captchaOk, setCaptchaOk]     = useState(false)
  const [captchaSeed, setCaptchaSeed] = useState(0)

  const method = DONATION_METHODS.find(m => m.id === form.method)
  const type   = DONATION_TYPES.find(t => t.id === form.type)
  const amount = form.custom ? Number(form.custom) : form.preset

  const field = `w-full font-body text-sm px-4 py-3 rounded-xl border transition-all duration-150 focus:outline-none focus:ring-2 ${s.field}`
  const ok    = `border-gray-200 ${s.focus}`
  const bad   = 'border-red-300 focus:ring-red-100'
  const labelCls = `block font-body text-xs font-semibold uppercase tracking-wider mb-1.5 ${s.muted}`
  const chip = (on) => `rounded-2xl border-2 px-4 py-3 font-heading text-sm font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-mosai-red/40 ${on ? s.chipOn : s.chipOff}`

  function set(name, value) {
    setForm(f => ({ ...f, [name]: value }))
    if (errs[name]) setErrs(er => ({ ...er, [name]: '' }))
  }
  const change = (e) => set(e.target.name, e.target.value)

  function validate() {
    const e = {}
    if (!amount || Number.isNaN(amount)) e.custom = 'Please choose or enter an amount'
    else if (form.custom && amount < MIN_CUSTOM_GIFT) e.custom = `The smallest amount we can process is ${formatUGX(MIN_CUSTOM_GIFT)}`
    if (!form.name.trim())  e.name  = 'Please enter your name'
    if (!form.email.trim()) e.email = 'Please enter your email address, so we can send your receipt'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address'
    if (form.phone.trim() && !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Please enter a valid phone number'
    if (method?.mobile) {
      if (!form.momo.trim()) e.momo = `Please enter the ${method.label} number you will pay from`
      else if (!/^\+?[\d\s\-()]{9,}$/.test(form.momo)) e.momo = 'Please enter a valid mobile money number'
    }
    if (!captchaOk) e.captcha = 'Please answer the sum to confirm you are human'
    return e
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
      await sendForm({
          from_name:  sanitize(form.name),
          from_email: sanitize(form.email),
          phone:      sanitize(form.phone),
          subject:    'Donation Pledge',
          message: [
            `DONATION PLEDGE`,
            `Gift type:    ${type.label}`,
            `Amount:       ${formatUGX(amount)}`,
            `Supporting:   ${sanitize(form.purpose)}`,
            `Pay by:       ${method.label}${method.mobile ? ` (from ${sanitize(form.momo)})` : ''}`,
            `Organisation: ${sanitize(form.organisation) || 'Not given'}`,
            ``,
            sanitize(form.message, 2000) || '(no additional message)',
          ].join('\n'),
        })
      trackEvent('donation_pledge', { type: form.type, method: form.method, purpose: form.purpose })
      setSent(true)
    } catch {
      setErrs({ captcha: 'Failed to send. Please try again, or email us directly.' })
      setCaptchaOk(false)
      setCaptchaSeed(n => n + 1)
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <div className="flex flex-col items-center justify-center py-14 text-center" role="status">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>
      <h3 className={`mb-2 font-heading text-2xl font-extrabold ${s.ink}`}>Thank you for your pledge</h3>
      <p className={`mb-2 max-w-md font-body text-sm ${s.body}`}>
        Your {type.label.toLowerCase()} gift of <strong>{formatUGX(amount)}</strong> by {method.label} has reached the
        school office. We will reply within one working day with the school’s official payment details.
      </p>
      <p className={`mb-8 font-body text-xs ${s.muted}`}>
        We will write to <span className={`font-semibold ${s.icon}`}>{form.email}</span>
      </p>
      <button
        type="button"
        onClick={() => { setForm(blank); setSent(false); setErrs({}); setCaptchaOk(false); setCaptchaSeed(n => n + 1) }}
        className={`font-body text-sm hover:underline ${s.icon}`}
      >
        Make another pledge
      </button>
    </div>
  )

  const err = (name) => errs[name] && (
    <p className="mt-1.5 flex items-center gap-1 font-body text-xs text-red-500" role="alert">
      <AlertCircle className="h-3 w-3" />{errs[name]}
    </p>
  )

  const input = (label, name, type = 'text', placeholder = '', required = true, extra = {}) => (
    <div>
      <label htmlFor={`don-${name}`} className={labelCls}>
        {label}{required ? <span className="ml-0.5 text-mosai-red">*</span> : <span className="ml-1 normal-case tracking-normal">(optional)</span>}
      </label>
      <input
        id={`don-${name}`} type={type} name={name} value={form[name]} onChange={change} placeholder={placeholder}
        className={`${field} ${errs[name] ? bad : ok}`} {...extra}
      />
      {err(name)}
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="space-y-7">
      {/* Honeypot */}
      <input
        type="text" name="website" value={form.website} onChange={change}
        tabIndex={-1} aria-hidden="true" autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      {/* 1. Gift type */}
      <Step n={1} title="Select donation type" s={s}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Donation type">
          {DONATION_TYPES.map(t => (
            <button
              key={t.id} type="button" role="radio" aria-checked={form.type === t.id}
              onClick={() => set('type', t.id)} className={chip(form.type === t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Step>

      {/* 2. Amount */}
      <Step n={2} title="Select an amount" hint="All amounts in Uganda Shillings" s={s}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Amount">
          {DONATION_PRESETS.map(p => {
            const on = !form.custom && form.preset === p.ugx
            return (
              <button
                key={p.ugx} type="button" role="radio" aria-checked={on}
                onClick={() => { setForm(f => ({ ...f, preset: p.ugx, custom: '' })); setErrs(er => ({ ...er, custom: '' })) }}
                className={`${chip(on)} flex items-center justify-between gap-3 text-left`}
              >
                <span>
                  <span className="block text-base font-extrabold">{formatUGX(p.ugx)}</span>
                  <span className={`block font-body text-xs font-normal ${on ? 'text-white/80' : s.muted}`}>{p.what}</span>
                </span>
                {p.featured && (
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${on ? 'bg-white/20 text-white' : 'bg-mosai-red text-white'}`}>
                    Most needed
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <div className="mt-4">
          <label htmlFor="don-custom" className={labelCls}>Or enter a custom amount (UGX)</label>
          <div className="relative">
            <span className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-heading text-sm font-bold ${s.muted}`}>UGX</span>
            <input
              id="don-custom" name="custom" inputMode="numeric" placeholder="e.g. 100,000"
              value={form.custom ? Number(form.custom).toLocaleString('en-US') : ''}
              onChange={(e) => set('custom', e.target.value.replace(/[^\d]/g, '').slice(0, 10))}
              className={`${field} pl-14 ${errs.custom ? bad : ok}`}
            />
          </div>
          {err('custom')}
        </div>
      </Step>

      {/* 3. Cause */}
      <Step n={3} title="Choose what to support" s={s}>
        <label htmlFor="don-purpose" className="sr-only">What would you like to support?</label>
        <select id="don-purpose" name="purpose" value={form.purpose} onChange={change} className={`${field} ${ok}`}>
          {DONATION_PURPOSES.map(o => <option key={o}>{o}</option>)}
        </select>
      </Step>

      {/* 4. Details */}
      <Step n={4} title="Your details" hint="For your receipt" s={s}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {input('Full name', 'name', 'text', 'e.g. Sarah Nankunda', true, { autoComplete: 'name' })}
          {input('Email (for your receipt)', 'email', 'email', 'you@example.com', true, { autoComplete: 'email' })}
          {input('Phone / WhatsApp', 'phone', 'tel', '+256 700 000 000', false, { autoComplete: 'tel' })}
          {input('Organisation', 'organisation', 'text', 'Company, church or group', false)}
        </div>
      </Step>

      {/* 5. Payment method */}
      <Step n={5} title="Select payment method" s={s}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment method">
          {DONATION_METHODS.map(m => {
            const on = form.method === m.id
            return (
              <button
                key={m.id} type="button" role="radio" aria-checked={on}
                onClick={() => set('method', m.id)}
                className={`${chip(on)} flex items-center gap-3 text-left`}
              >
                {/* Official logos on a white tile (MTN on its own yellow), so they keep their true colours
                    whichever chip state or theme is showing. */}
                <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 ring-1 ring-black/5" style={m.id === 'mtn' ? { backgroundColor: m.color } : undefined}>
                  <img src={METHOD_LOGOS[m.id]} alt="" className="max-h-full max-w-full object-contain" />
                </span>
                {m.label}
              </button>
            )
          })}
        </div>

        {method.mobile && (
          <div className="mt-4">
            {input(`${method.label} number`, 'momo', 'tel', '07XX XXX XXX', true, { autoComplete: 'tel' })}
          </div>
        )}

        <div className={`mt-4 flex items-start gap-2.5 px-4 py-3 ${s.soft}`}>
          <ShieldCheck className={`mt-0.5 h-4 w-4 shrink-0 ${s.icon}`} />
          <p className={`font-body text-xs leading-relaxed ${s.body}`}>
            Nothing is charged here. The school office replies with official {method.mobile ? `${method.label} payment details` : 'bank details'} and
            issues a receipt in your name. We will <strong>never</strong> ask for your PIN or card number.
          </p>
        </div>
      </Step>

      {/* Optional note */}
      <details className="group">
        <summary className={`cursor-pointer list-none font-heading text-sm font-bold ${s.icon}`}>
          <span className="inline-flex items-center gap-1.5">
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /> Add a note to the school
          </span>
        </summary>
        <textarea
          name="message" value={form.message} onChange={change} rows={3} aria-label="Note to the school"
          placeholder="Tell us why you would like to give, or ask us anything…"
          className={`${field} mt-3 resize-none ${ok}`}
        />
      </details>

      {/* Summary + send */}
      <div className={`border-t pt-6 ${s.rule}`}>
        <p className={`mb-4 font-body text-sm ${s.body}`} aria-live="polite">
          {amount ? (
            <>You are pledging <strong className={s.ink}>{formatUGX(amount)}</strong> {type.id === 'one-time' ? 'once' : type.label.toLowerCase()} to <strong className={s.ink}>{form.purpose.toLowerCase()}</strong>, paid by {method.label}.</>
          ) : 'Choose an amount to see your pledge.'}
        </p>

        <SimpleCaptcha onChange={setCaptchaOk} error={errs.captcha} seed={captchaSeed} />

        <button
          type="submit"
          disabled={loading}
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-mosai-red py-4 font-heading text-base font-bold text-white shadow-sm transition-all duration-200 hover:bg-mosai-red-dark hover:shadow-md active:scale-[0.98] ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
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
            <><Send className="h-4 w-4" /> Send my pledge</>
          )}
        </button>
      </div>
    </form>
  )
}

// ── Page (shared by both campuses) ───────────────────────────────────────
const STRIPS = {
  nalugala: [
    { img: nalGrad,               alt: 'MOSAI nursery graduates celebrating on graduation day' },
    { img: NAL.gardenLesson.img,  alt: NAL.gardenLesson.alt },
    { img: NAL.classMotto.img,    alt: NAL.classMotto.alt },
    { img: headerImg,             alt: 'MOSAI learners performing a dance routine' },
    { img: NAL.playground.img,    alt: NAL.playground.alt },
    { img: nalStage,              alt: 'MOSAI learners on stage at a school celebration' },
  ],
  bunono: [
    { img: BUN.exercise.img, alt: BUN.exercise.alt },
    { img: BUN.houses.img,   alt: BUN.houses.alt },
    { img: BUN.front.img,    alt: BUN.front.alt },
    { img: bunonoPhotos[32], alt: 'MOSAI learners splashing in the Bunono Campus pool' },
    { img: BUN.climbing.img, alt: BUN.climbing.alt },
    { img: BUN.group.img,    alt: BUN.group.alt },
  ],
}

export function DonatePage({ variant = 'nalugala' }) {
  const { campusInfo } = useCampus()
  const s = SKINS[variant] || SKINS.nalugala
  const bunono = variant === 'bunono'
  const tel = campusInfo.phone.replace(/\s+/g, '')
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')

  return (
    <main className={s.main}>
      <PageHeader
        crumb="Donate"
        kicker={bunono ? 'Support Bunono' : 'Support Our Learners'}
        title="Donate to"
        accentWord="MOSAI Schools"
        subtitle="Your gift helps a child go to school: books, meals, uniforms and scholarship places for children who would otherwise go without."
        image={bunono ? bunHeader : headerImg}
        nextBg={bunono ? '#FFF8EE' : '#F3F6FA'}
      >
        <a
          href="#give"
          className="inline-flex items-center gap-2 rounded-full bg-mosai-red px-6 py-3 font-heading text-sm font-bold text-white shadow-lg transition-colors duration-200 hover:bg-mosai-red-dark"
        >
          <Heart className="h-4 w-4" /> Donate now
        </a>
      </PageHeader>

      {/* ── Photo strip ────────────────────────────────────────────────── */}
      <section className="pt-12" aria-label="Life at MOSAI Schools">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-6 sm:overflow-visible sm:px-0">
            {STRIPS[variant].map((p, i) => (
              <img
                key={i} src={p.img} alt={p.alt} loading="lazy" decoding="async"
                className={`h-28 w-40 shrink-0 snap-start rounded-2xl object-cover shadow-sm sm:h-32 sm:w-full ${bunono ? (i % 2 ? 'rotate-1' : '-rotate-1') : ''}`}
              />
            ))}
          </div>
          <p className={`mx-auto mt-8 max-w-2xl text-center font-body text-base leading-relaxed sm:text-lg ${s.body}`}>
            {DONATE.intro[1]}
          </p>
        </div>
      </section>

      {/* ── The donation card ──────────────────────────────────────────── */}
      <section id="give" className="relative scroll-mt-24 py-12 sm:py-16">
        {bunono && <Doodles names={['star', 'balloon']} count={2} />}
        <div className="relative z-[3] mx-auto max-w-3xl px-4 sm:px-6">
          <div className={`p-6 sm:p-10 ${s.card}`}>
            <h2 className={`mb-1 font-heading text-3xl font-extrabold ${s.ink}`}>Make a donation</h2>
            <p className={`mb-8 flex items-start gap-2 font-body text-sm ${s.muted}`}>
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Five quick steps. Nothing is charged on this website: the school office confirms your pledge and sends official payment details.
            </p>
            <DonationForm theme={variant} />
          </div>
        </div>
      </section>

      {/* ── Reassurance strip ──────────────────────────────────────────── */}
      <section className={`py-12 ${s.band}`}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {DONATE.assurances.map((a, i) => {
            const Icon = ASSURANCE_ICONS[i]
            return (
              <div key={a.title} className="flex gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${s.iconBg}`}>
                  <Icon className={`h-5 w-5 ${s.icon}`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className={`font-heading text-sm font-extrabold ${s.ink}`}>{a.title}</h3>
                  <p className={`mt-0.5 font-body text-xs leading-relaxed ${s.muted}`}>{a.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className={`mb-8 text-center font-heading text-3xl font-extrabold sm:text-4xl ${s.ink}`}>
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {DONATE_FAQ.map((f) => (
              <details key={f.q} className={`group px-5 py-1 sm:px-6 ${s.card}`}>
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading text-base font-bold ${s.ink}`}>
                  {f.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180 ${s.icon}`} aria-hidden="true" />
                </summary>
                <div className={`space-y-3 pb-5 font-body text-sm leading-relaxed ${s.body}`}>
                  {f.a.map(p => <p key={p.slice(0, 32)}>{p}</p>)}
                  {f.contact && (
                    <p>
                      Call <a href={`tel:${tel}`} className={`font-semibold hover:underline ${s.icon}`}>{campusInfo.phone}</a>,
                      WhatsApp the same number, or email{' '}
                      <a href={`mailto:${campusInfo.email}?subject=Donation%20question`} className={`font-semibold hover:underline ${s.icon}`}>{campusInfo.email}</a>.
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>

          <Link
            to="/scholarships"
            className="group mt-8 flex items-center justify-center gap-2 font-heading text-sm font-bold text-mosai-red transition-colors hover:text-mosai-red-dark"
          >
            Read how scholarship children are chosen
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className={`flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${s.contact}`}>
            <div>
              <h3 className="font-heading text-lg font-extrabold">Prefer to talk first?</h3>
              <p className={`mt-1 font-body text-sm ${s.contactMuted}`}>
                The {campusInfo.name} Campus office, Monday to Friday, 8:00 AM to 4:00 PM.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a href={`tel:${tel}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-heading text-sm font-bold text-mosai-blue-dark transition-colors hover:bg-white/90">
                <Phone className="h-4 w-4" /> {campusInfo.phone}
              </a>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`mailto:${campusInfo.email}?subject=Donation%20Enquiry`} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white/10">
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function Donate() {
  const { campus } = useCampus()
  if (campus === 'bunono') return <DonateBunono />
  return <DonatePage variant="nalugala" />
}
