/*
 * Sends a Contact / Donate form to the school's inbox through our own
 * Cloudflare Worker (worker/index.js, POST /api/contact). Throws on failure so
 * the form can show its error message.
 */
export async function sendForm(fields) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  })
  let data = null
  try { data = await res.json() } catch { /* non-JSON reply = failure */ }
  if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`)
}
