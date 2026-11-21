/*
 * MOSAI Schools Worker.
 *
 * Serves the built site from ./dist (see wrangler.jsonc) and handles one API
 * route of its own:
 *
 *   POST /api/contact  { from_name, from_email, phone, subject, message, website }
 *
 * The message is emailed to the inbox in the MAIL_TO secret (via the `MAIL`
 * send_email binding; it must be a verified Email Routing address) with the
 * visitor's address as Reply-To, so the office can reply straight from Gmail.
 * Needs Cloudflare Email Routing enabled on mosaischools.com.
 */
import { EmailMessage } from 'cloudflare:email'

const FROM_ADDR = 'website@mosaischools.com'
const FROM_NAME = 'MOSAI Schools'
const ALLOWED_ORIGINS = [
  'https://mosaischools.com',
  'https://www.mosaischools.com',
  'https://mosaischools.benjaminsian132.workers.dev',
]
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

/* Strip anything that could break out of a mail header, then trim to length. */
const clean = (v, max = 200) =>
  String(v ?? '').replace(/[\r\n\0]+/g, ' ').trim().slice(0, max)

const cleanBody = (v, max = 5000) =>
  String(v ?? '').replace(/\0/g, '').replace(/\r\n?/g, '\n').trim().slice(0, max)

/* UTF-8 safe base64 */
const b64 = (s) => {
  const bytes = new TextEncoder().encode(s)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

/* RFC 2047 encoded-word, so names and subjects with accents survive. */
const encWord = (s) => (/^[\x20-\x7E]*$/.test(s) ? s.replace(/"/g, "'") : `=?UTF-8?B?${b64(s)}?=`)

function buildMime({ to, replyName, replyEmail, subject, text }) {
  const body = b64(text).replace(/.{1,76}/g, '$&\r\n')
  return [
    `From: "${FROM_NAME}" <${FROM_ADDR}>`,
    `To: <${to}>`,
    `Reply-To: "${encWord(replyName)}" <${replyEmail}>`,
    `Subject: ${encWord(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@mosaischools.com>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n')
}

async function handleContact(request, env) {
  const origin = request.headers.get('Origin')
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return json(403, { ok: false, error: 'origin' })
  if (Number(request.headers.get('Content-Length') || 0) > 20000) return json(413, { ok: false, error: 'too_large' })

  let data
  try { data = await request.json() } catch { return json(400, { ok: false, error: 'bad_json' }) }

  // Honeypot: real visitors leave this hidden field empty. Pretend success.
  if (data.website) return json(200, { ok: true })

  const name    = clean(data.from_name, 100)
  const email   = clean(data.from_email, 200)
  const phone   = clean(data.phone, 40)
  const subject = clean(data.subject, 120) || 'Website message'
  const message = cleanBody(data.message)

  if (!name || !message || !EMAIL_RE.test(email)) return json(400, { ok: false, error: 'invalid' })

  const text = [
    `New message from the MOSAI Schools website`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || 'Not given'}`,
    `Subject: ${subject}`,
    ``,
    message,
    ``,
    `--`,
    `Press Reply to answer ${name} directly.`,
  ].join('\n')

  const to = env.MAIL_TO
  const raw = buildMime({ to, replyName: name, replyEmail: email, subject: `[Website] ${subject}`, text })

  try {
    await env.MAIL.send(new EmailMessage(FROM_ADDR, to, raw))
  } catch (err) {
    console.error('send_email failed:', err?.message || err)
    return json(502, { ok: false, error: 'send_failed' })
  }
  return json(200, { ok: true })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return json(405, { ok: false, error: 'method' })
      return handleContact(request, env)
    }
    if (url.pathname.startsWith('/api/')) return json(404, { ok: false, error: 'not_found' })
    return env.ASSETS.fetch(request)
  },
}
