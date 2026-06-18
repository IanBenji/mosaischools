import { Link } from 'react-router-dom'
import {
  Users, CalendarCheck, FileBarChart, MessageSquare,
  CheckCircle, XCircle, Clock, ArrowRight, Megaphone,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockTeacher, mockStudents, todayAttendanceDefaults, mockSchedule } from './mockData'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const presentToday  = Object.values(todayAttendanceDefaults).filter(Boolean).length
const absentToday   = mockStudents.length - presentToday

const scheduleTypeStyle = {
  assembly: 'bg-purple-100 text-purple-700',
  lesson:   'bg-mosai-blue-light text-mosai-blue',
  break:    'bg-green-100 text-green-700',
  admin:    'bg-gray-100 text-gray-500',
}

export default function TeacherDashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'Teacher'
  const now = new Date()
  const todayStr = now.toLocaleDateString('en-UG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-800">
            {greeting()}, {firstName}!
          </h1>
          <p className="font-body text-sm text-slate-500 mt-0.5">{todayStr}</p>
        </div>
        <div className="flex items-center gap-2 bg-mosai-blue-light border border-mosai-blue/20 rounded-xl px-4 py-2.5">
          <div className="w-2 h-2 bg-mosai-blue rounded-full animate-pulse" />
          <span className="font-body text-sm font-semibold text-mosai-blue-dark">
            {mockTeacher.class} · {mockTeacher.campus}
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users,         label: 'Students',       value: mockStudents.length, sub: 'in your class',       color: 'text-mosai-blue',  bg: 'bg-mosai-blue-light', to: '/teacher/students'   },
          { icon: CheckCircle,   label: 'Present Today',  value: presentToday,        sub: 'marked present',      color: 'text-green-600',   bg: 'bg-green-50',          to: '/teacher/attendance' },
          { icon: XCircle,       label: 'Absent Today',   value: absentToday,         sub: 'not in school',       color: 'text-mosai-red',   bg: 'bg-mosai-red-light',   to: '/teacher/attendance' },
          { icon: FileBarChart,  label: 'Pending Reports',value: 1,                   sub: 'term results due',    color: 'text-orange-500',  bg: 'bg-orange-50',         to: '/teacher/results'    },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <Link key={i} to={s.to} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200 group">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="font-heading font-extrabold text-2xl text-slate-800">{s.value}</p>
              <p className="font-body text-xs font-semibold text-slate-500 mt-0.5">{s.label}</p>
              <p className="font-body text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </Link>
          )
        })}
      </div>

      {/* Attendance snapshot + schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* Today's attendance grid */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-bold text-base text-slate-800 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-mosai-blue" />
              Today's Attendance
            </h3>
            <Link to="/teacher/attendance" className="font-body text-xs font-semibold text-mosai-blue hover:underline flex items-center gap-1">
              Update <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {mockStudents.map(s => {
              const present = todayAttendanceDefaults[s.id]
              return (
                <div key={s.id} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl ${
                  present ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                    present ? 'bg-green-500' : 'bg-red-400'
                  }`}>
                    {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-xs font-semibold text-slate-700 truncate">{s.name.split(' ')[0]}</p>
                    <p className={`font-body text-[10px] ${present ? 'text-green-600' : 'text-red-500'}`}>
                      {present ? 'Present' : 'Absent'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Today's schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <h3 className="font-heading font-bold text-base text-slate-800 flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-mosai-blue" />
            Today's Schedule
          </h3>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {mockSchedule.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="font-body text-[10px] text-slate-400 w-24 shrink-0 pt-0.5 leading-tight">{item.time}</span>
                <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-lg leading-snug ${scheduleTypeStyle[item.type]}`}>
                  {item.subject}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="font-heading font-bold text-sm text-slate-600 uppercase tracking-wide mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: CalendarCheck, label: 'Mark Attendance',   to: '/teacher/attendance', bg: 'bg-mosai-blue',  text: 'text-white' },
            { icon: FileBarChart,  label: 'Upload Results',    to: '/teacher/results',    bg: 'bg-mosai-red',   text: 'text-white' },
            { icon: MessageSquare, label: 'Message a Parent',  to: '/teacher/messages',   bg: 'bg-slate-700',   text: 'text-white' },
            { icon: Megaphone,     label: 'Post Announcement', to: '/teacher/announce',   bg: 'bg-purple-600',  text: 'text-white' },
          ].map(({ icon: Icon, label, to, bg, text }) => (
            <Link key={to} to={to}
              className={`flex flex-col items-center gap-2 ${bg} ${text} rounded-2xl px-4 py-5 hover:opacity-90 transition-opacity duration-150 shadow-sm text-center`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-heading font-bold text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
