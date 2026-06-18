// Rate limiting: max 3 submissions per hour per browser
const RATE_KEY = 'mosai_submissions'
const MAX_PER_HOUR = 3
const WINDOW_MS = 60 * 60 * 1000

export function checkRateLimit() {
  try {
    const stored = localStorage.getItem(RATE_KEY)
    const timestamps = stored ? JSON.parse(stored) : []
    const now = Date.now()
    const recent = timestamps.filter(t => now - t < WINDOW_MS)
    if (recent.length >= MAX_PER_HOUR) return false
    localStorage.setItem(RATE_KEY, JSON.stringify([...recent, now]))
    return true
  } catch {
    return true
  }
}

// Strip HTML tags and cap length to prevent injection / oversized payloads
export function sanitize(value, maxLen = 1000) {
  return String(value ?? '').replace(/<[^>]*>/g, '').trim().slice(0, maxLen)
}
