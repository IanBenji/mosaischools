import { useState } from 'react'
import { Send, AlertCircle } from 'lucide-react'
import { mockMessages, mockChild } from './mockData'
import { useAuth } from '../../context/AuthContext'

const mockThread = [
  { from: 'teacher', text: 'Good morning! Aisha had a wonderful day today. She led the morning circle time and all the children loved it.', time: 'Today, 10:15 AM' },
  { from: 'parent',  text: 'That is wonderful to hear! She was very excited about it this morning. Thank you for letting me know.', time: 'Today, 11:02 AM' },
  { from: 'teacher', text: 'She is really coming out of her shell. Her confidence in the Swahili lessons has also improved a lot this week.', time: 'Today, 11:30 AM' },
]

export default function Messages() {
  const { user } = useAuth()
  const [selected, setSelected] = useState(mockMessages[0])
  const [thread,   setThread]   = useState(mockThread)
  const [draft,    setDraft]    = useState('')
  const [sending,  setSending]  = useState(false)

  function sendMessage(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setSending(true)
    setTimeout(() => {
      setThread(t => [...t, { from: 'parent', text: draft.trim(), time: 'Just now' }])
      setDraft('')
      setSending(false)
    }, 600)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">

      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800">Messages</h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">Communication between you and {mockChild.name}'s teachers.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="font-body text-xs text-amber-700 leading-relaxed">
          For urgent matters please call the school directly on <a href="tel:+256700123456" className="font-semibold underline">+256 700 123 456</a>. Office hours: Monday – Friday, 8:00 AM – 4:00 PM.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: 520 }}>
        <div className="flex h-full">

          {/* Inbox list */}
          <div className="w-72 border-r border-gray-100 flex flex-col shrink-0">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-heading font-bold text-sm text-slate-700">Inbox</p>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {mockMessages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                    selected?.id === msg.id ? 'bg-mosai-blue-light' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-mosai-blue rounded-full flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-heading font-bold text-xs text-slate-700 truncate">{msg.from}</p>
                        {!msg.read && <span className="w-2 h-2 bg-mosai-blue rounded-full shrink-0" />}
                      </div>
                      <p className="font-body text-xs text-slate-500 truncate mt-0.5">{msg.preview}</p>
                      <p className="font-body text-[10px] text-slate-400 mt-1">{msg.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="flex-1 flex flex-col min-w-0">
            {selected ? (
              <>
                {/* Thread header */}
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-mosai-blue rounded-full flex items-center justify-center text-white font-heading font-bold text-xs">
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-slate-700">{selected.from}</p>
                    <p className="font-body text-xs text-slate-400">{selected.role}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {thread.map((msg, i) => {
                    const isParent = msg.from === 'parent'
                    return (
                      <div key={i} className={`flex ${isParent ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl ${
                          isParent
                            ? 'bg-mosai-blue text-white rounded-br-sm'
                            : 'bg-gray-100 text-slate-700 rounded-bl-sm'
                        }`}>
                          <p className="font-body text-sm leading-relaxed">{msg.text}</p>
                          <p className={`font-body text-[10px] mt-1.5 ${isParent ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Compose */}
                <form onSubmit={sendMessage} className="px-4 py-3 border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-1 font-body text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-mosai-blue focus:ring-mosai-blue/15 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim() || sending}
                    className="flex items-center gap-1.5 font-heading font-bold text-sm bg-mosai-blue hover:bg-mosai-blue-dark disabled:opacity-50 text-white px-4 py-2.5 rounded-xl transition-colors duration-150"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? '…' : 'Send'}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <p className="font-body text-sm">Select a conversation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
