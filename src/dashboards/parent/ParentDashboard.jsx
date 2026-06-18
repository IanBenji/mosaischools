import { Link } from 'react-router-dom'
import {
  CalendarDays, MessageSquare, CreditCard, TrendingUp,
  CheckCircle, Clock, ArrowRight, Bell, GraduationCap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockChild, mockAttendance, mockPayments, mockMessages, mockEvents, todayFeed } from './mockData'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const attendancePct = Math.round((mockAttendance.termPresent / mockAttendance.termTotal) * 100)

const eventColors = {
  academic: 'bg-mosai-blue-light text-mosai-blue',
  sports:   'bg-green-50 text-green-700',
  parents:  'bg-purple-50 text-purple-700',
  holiday:  'bg-orange-50 text-orange-700',
}

export default function ParentDashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'Parent'
  const unread = mockMessages.filter(m => !m.read).length

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-800">
            {greeting()}, {firstName}! 👋
          </h1>
          <p className="font-body text-sm text-slate-500 mt-0.5">
            Here's what's happening with {mockChild.name} today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="font-body text-sm font-semibold text-green-700">
            {mockChild.name.split(' ')[0]} is <strong>Present</strong> today
          </span>
        </div>
      </div>

      {/* Child card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-mosai-blue to-mosai-blue-dark rounded-2xl flex items-center justify-center text-white font-heading font-extrabold text-2xl shrink-0">
            {mockChild.name[0]}
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-extrabold text-xl text-slate-800">{mockChild.name}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="font-body text-xs font-semibold px-3 py-1 bg-mosai-blue-light text-mosai-blue rounded-full">{mockChild.class}</span>
              <span className="font-body text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{mockChild.campus}</span>
              <span className="font-body text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{mockChild.type}</span>
              <span className="font-body text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">Adm: {mockChild.admissionNo}</span>
            </div>
          </div>
          <Link to="/parent/child" className="flex items-center gap-1.5 font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark transition-colors shrink-0">
            View Profile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: CalendarDays,
            label: 'Term Attendance',
            value: `${attendancePct}%`,
            sub: `${mockAttendance.termPresent}/${mockAttendance.termTotal} days`,
            color: attendancePct >= 90 ? 'text-green-600' : 'text-orange-500',
            bg: attendancePct >= 90 ? 'bg-green-50' : 'bg-orange-50',
            to: '/parent/attendance',
          },
          {
            icon: TrendingUp,
            label: 'Latest Result',
            value: '84%',
            sub: 'Term I 2026 average',
            color: 'text-mosai-blue',
            bg: 'bg-mosai-blue-light',
            to: '/parent/reports',
          },
          {
            icon: CreditCard,
            label: 'Fee Balance',
            value: 'UGX 450k',
            sub: `${mockPayments.outstanding.term} due`,
            color: 'text-mosai-red',
            bg: 'bg-mosai-red-light',
            to: '/parent/payments',
          },
          {
            icon: MessageSquare,
            label: 'Messages',
            value: unread > 0 ? `${unread} new` : 'All read',
            sub: `${mockMessages.length} total messages`,
            color: unread > 0 ? 'text-purple-600' : 'text-slate-500',
            bg: unread > 0 ? 'bg-purple-50' : 'bg-slate-100',
            to: '/parent/messages',
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <Link key={i} to={stat.to}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200 group"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="font-heading font-extrabold text-xl text-slate-800">{stat.value}</p>
              <p className="font-body text-xs font-semibold text-slate-500 mt-0.5">{stat.label}</p>
              <p className="font-body text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </Link>
          )
        })}
      </div>

      {/* Today at school + Messages row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Today's feed */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-base text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-mosai-blue" />
              Today at School
            </h3>
            <span className="font-body text-xs text-slate-400">{new Date().toDateString()}</span>
          </div>
          <div className="space-y-3">
            {todayFeed.map((item, i) => {
              const now = new Date()
              const [hm, period] = item.time.split(' ')
              const [h, m] = hm.split(':').map(Number)
              const hour = period === 'PM' && h !== 12 ? h + 12 : h
              const past = now.getHours() > hour || (now.getHours() === hour && now.getMinutes() >= m)
              return (
                <div key={i} className={`flex items-start gap-3 ${past ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${past ? 'bg-mosai-blue' : 'bg-slate-300'}`} />
                  <div className="flex-1 flex items-baseline justify-between gap-2">
                    <p className="font-body text-sm text-slate-700">{item.event}</p>
                    <span className="font-body text-xs text-slate-400 shrink-0">{item.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent messages */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-base text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-mosai-blue" />
              Messages
            </h3>
            <Link to="/parent/messages" className="font-body text-xs font-semibold text-mosai-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3 flex-1">
            {mockMessages.slice(0, 3).map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 p-3 rounded-xl ${!msg.read ? 'bg-mosai-blue-light' : 'bg-gray-50'}`}>
                <div className="w-8 h-8 bg-mosai-blue rounded-full flex items-center justify-center text-white font-heading font-bold text-xs shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="font-heading font-bold text-xs text-slate-700 truncate">{msg.from}</p>
                    {!msg.read && <span className="w-2 h-2 bg-mosai-blue rounded-full shrink-0" />}
                  </div>
                  <p className="font-body text-xs text-slate-500 mt-0.5 line-clamp-2">{msg.preview}</p>
                  <p className="font-body text-[10px] text-slate-400 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/parent/messages"
            className="mt-4 flex items-center justify-center gap-1.5 font-body text-sm font-semibold text-mosai-blue hover:text-mosai-blue-dark transition-colors">
            Open Messages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Upcoming events */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-heading font-bold text-base text-slate-800 flex items-center gap-2 mb-5">
          <Bell className="w-4 h-4 text-mosai-blue" />
          Upcoming Events
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mockEvents.map((ev, i) => (
            <div key={i} className="text-center">
              <div className={`rounded-xl px-3 py-3 ${eventColors[ev.type]}`}>
                <p className="font-heading font-extrabold text-sm">{ev.date}</p>
                <p className="font-body text-xs mt-1 leading-snug">{ev.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
