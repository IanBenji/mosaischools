import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { trackEvent } from '../lib/analytics'

/* Floating "chat to the school" button — the parent-communication channel.
 *
 * WhatsApp rather than a live-chat widget or a chatbot: it is the messaging app
 * Ugandan families already have open, it costs the school nothing, it needs no
 * new account or staff training, it works on cheap phones and weak connections,
 * and a parent's message waits in a normal WhatsApp inbox instead of vanishing
 * when nobody happens to be sitting at a computer.
 *
 * The number and the pre-filled greeting follow the active campus, so the office
 * can see at a glance which campus the enquiry is about.
 */

const DISMISS_KEY = 'mosai.whatsapp.bubble.dismissed'

export default function WhatsAppButton() {
  const { campus, campusInfo } = useCampus()
  const [showBubble, setShowBubble] = useState(false)

  const number = campusInfo.whatsapp.replace(/[^\d]/g, '')
  const message = encodeURIComponent(
    `Hello Mosai Schools, I am writing about the ${campusInfo.name} Campus. I would like to ask about `,
  )
  const href = `https://wa.me/${number}?text=${message}`

  // A single nudge a few seconds in, so parents notice the button exists; it
  // retires on its own if ignored, and for the whole session once dismissed.
  useEffect(() => {
    let dismissed = false
    try { dismissed = sessionStorage.getItem(DISMISS_KEY) === '1' } catch { /* private mode */ }
    if (dismissed) return
    const show = setTimeout(() => setShowBubble(true), 6000)
    const hide = setTimeout(() => setShowBubble(false), 22000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  function dismiss() {
    setShowBubble(false)
    try { sessionStorage.setItem(DISMISS_KEY, '1') } catch { /* private mode */ }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3 print:hidden">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={() => { dismiss(); trackEvent('whatsapp_click', { campus }) }}
        aria-label={`Chat with Mosai Schools ${campusInfo.name} Campus on WhatsApp`}
        className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 active:scale-95"
      >
        {/* Gentle attention ring — motion-safe only */}
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-25" aria-hidden="true" />
        <svg viewBox="0 0 32 32" className="relative h-8 w-8 fill-current" aria-hidden="true">
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.41L3.2 28.8l6.56-1.71a12.74 12.74 0 0 0 6.24 1.62h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.71-12.8-12.71zm0 23.06h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.03 1.05 1.08-3.93-.25-.4a10.55 10.55 0 0 1-1.62-5.64c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.62-10.64 10.62zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.14-.29-.21-.61-.37z" />
        </svg>
      </a>

      {showBubble && (
        <div className="animate-fade-in-up relative mb-1 max-w-[15rem] rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-4 py-3 shadow-xl sm:max-w-xs">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close message"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <p className="font-heading text-sm font-bold text-mosai-blue-dark">Questions about {campusInfo.name}?</p>
          <p className="mt-0.5 font-body text-xs leading-relaxed text-gray-500">
            Message the school office on WhatsApp and we reply within one working day.
          </p>
        </div>
      )}
    </div>
  )
}
