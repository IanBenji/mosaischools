import { useState } from 'react'
import { Send, AlertCircle, Phone } from 'lucide-react'
import { mockMessages, mockStudents } from './mockData'

export default function TeacherMessages() {
  const [conversations, setConversations] = useState(mockMessages)
  const [selected,  setSelected]  = useState(conversations[0])
  const [draft,     setDraft]     = useState('')
  const [sending,   setSending]   = useState(false)
  const [newTarget, setNewTarget] = useState('')

  const current = conversations.find(c => c.id === selected?.id)

  function sendMessage(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setSending(true)
    setTimeout(() => {
      const msg = { from: 'teacher', text: draft.trim(), time: 'Just now' }
      setConversations(cs =>
        cs.map(c => c.id === selected.id ? { ...c, thread: [...c.thread, msg], unread: 0 } : c)
      )
      setSelected(s => ({ ...s, thread: [...(s?.thread ?? []), msg] }))
      setDraft('')
      setSending(false)
    }, 600)
  }

  function startNew() {
    if (!newTarget) return
    const student = mockStudents.find(s => s.id === Number(newTarget))
    if (!student) return
    const exists = conversations.find(c => c.studentId === student.id)
    if (exists) { setSelected(exists); setNewTarget(''); return }
    const newConvo = {
      id: Date.now(),
      studentId: student.id,
      parentName: student.parentName,
      student: student.name,
      thread: [],
      unread: 0,
    }
    setConversations(cs => [newConvo, ...cs])
    setSelected(newConvo)
    setNewTarget('')
  }

  const totalUnread = conversations.reduce((a, c) => a + c.unread, 0)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-800 flex items-center gap-3">
          Messages
          {totalUnread > 0 && (
            <span className="font-body text-sm bg-mosai-red text-white px-2.5 py-0.5 rounded-full">{totalUnread} new</span>
          )}
        </h1>
        <p className="font-body text-sm text-slate-500 mt-0.5">Direct messages with parents of your students.</p>
      </div>

      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="font-body text-xs text-amber-700">
          For urgent matters, please also call the parent directly. Office escalations go through the Head Teacher.
        </p>
      </div>

      {/* New message */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
        <select
          value={newTarget}
          onChange={e => setNewTarget(e.target.value)}
          className="flex-1 font-body text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-mosai-blue/20 focus:border-mosai-blue"
        >
          <option value="">Select a student to message their parent…</option>
          {mockStudents.map(s => (
            <option key={s.id} value={s.id}>{s.name} → {s.parentName}</option>
          ))}
        </select>
        <button onClick={startNew} disabled={!newTarget}
          className="font-heading font-bold text-sm bg-mosai-blue-dark hover:bg-mosai-blue disabled:opacity-40 text-white px-4 py-2 rounded-lg transition-colors">
          Open
        </button>
      </div>

      {/* Conversations */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: 480 }}>
        <div className="flex h-full">

          {/* List */}
          <div className="w-64 border-r border-gray-100 flex flex-col shrink-0">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-heading font-bold text-sm text-slate-700">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {conversations.map(c => (
                <button key={c.id} onClick={() => setSelected(c)}
                  className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors ${selected?.id === c.id ? 'bg-mosai-blue-light' : ''}`}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 bg-mosai-blue rounded-full flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">
                      {c.parentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-heading font-bold text-xs text-slate-700 truncate">{c.parentName}</p>
                        {c.unread > 0 && <span className="w-2 h-2 bg-mosai-red rounded-full shrink-0" />}
                      </div>
                      <p className="font-body text-[10px] text-slate-400 truncate">{c.student}</p>
                      <p className="font-body text-[10px] text-slate-400 truncate mt-0.5">
                        {c.thread[c.thread.length - 1]?.text ?? 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="flex-1 flex flex-col min-w-0">
            {current ? (
              <>
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-mosai-blue rounded-full flex items-center justify-center text-white font-heading font-bold text-xs">
                      {current.parentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-slate-700">{current.parentName}</p>
                      <p className="font-body text-xs text-slate-400">Parent of {current.student}</p>
                    </div>
                  </div>
                  <a href={`tel:${mockStudents.find(s => s.id === current.studentId)?.parentPhone}`}
                    className="flex items-center gap-1.5 font-body text-xs font-semibold text-mosai-blue hover:text-mosai-blue-dark">
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  {current.thread.length === 0 && (
                    <p className="text-center font-body text-xs text-slate-400 mt-8">No messages yet. Start the conversation below.</p>
                  )}
                  {current.thread.map((msg, i) => {
                    const isTeacher = msg.from === 'teacher'
                    return (
                      <div key={i} className={`flex ${isTeacher ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2.5 rounded-2xl ${
                          isTeacher
                            ? 'bg-mosai-blue text-white rounded-br-sm'
                            : 'bg-gray-100 text-slate-700 rounded-bl-sm'
                        }`}>
                          <p className="font-body text-sm leading-relaxed">{msg.text}</p>
                          <p className={`font-body text-[10px] mt-1.5 ${isTeacher ? 'text-blue-200 text-right' : 'text-slate-400'}`}>{msg.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <form onSubmit={sendMessage} className="px-4 py-3 border-t border-gray-100 flex gap-2">
                  <input type="text" value={draft} onChange={e => setDraft(e.target.value)}
                    placeholder={`Message ${current.parentName}…`}
                    className="flex-1 font-body text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-mosai-blue focus:ring-mosai-blue/15 transition-all"
                  />
                  <button type="submit" disabled={!draft.trim() || sending}
                    className="flex items-center gap-1.5 font-heading font-bold text-sm bg-mosai-blue-dark hover:bg-mosai-blue disabled:opacity-50 text-white px-4 py-2.5 rounded-xl transition-colors">
                    <Send className="w-4 h-4" />{sending ? '…' : 'Send'}
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
