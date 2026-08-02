import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, CalendarCheck, FileBarChart,
  MessageSquare, Megaphone, LogOut,
  Menu, X, ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { mockTeacher } from './mockData'
import mosaiLogo from '../../assets/mosailogo-removebg-preview.png'

const navItems = [
  { to: '/teacher',              icon: LayoutDashboard, label: 'Dashboard',          end: true },
  { to: '/teacher/students',     icon: Users,           label: 'My Students'                   },
  { to: '/teacher/attendance',   icon: CalendarCheck,   label: 'Mark Attendance'               },
  { to: '/teacher/results',      icon: FileBarChart,    label: 'Upload Results'                },
  { to: '/teacher/messages',     icon: MessageSquare,   label: 'Messages',           badge: 1  },
  { to: '/teacher/announce',     icon: Megaphone,       label: 'Post Announcement'             },
]

export default function TeacherLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`flex flex-col h-full bg-mosai-blue-dark text-white ${mobile ? 'w-72' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shrink-0 p-1">
          <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="font-heading font-extrabold text-sm leading-tight">MOSAI Schools</p>
          <p className="font-body text-xs text-blue-300">Teacher Portal</p>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-blue-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Class badge */}
      <div className="mx-3 mt-3 mb-1 bg-white/10 rounded-xl px-4 py-3 border border-white/10">
        <p className="font-body text-xs text-blue-300 uppercase tracking-wide mb-0.5">Assigned Class</p>
        <p className="font-heading font-bold text-sm text-white">{mockTeacher.class}</p>
        <p className="font-body text-xs text-blue-300">{mockTeacher.campus}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, badge, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-white text-mosai-blue-dark shadow-md'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-mosai-blue' : 'text-blue-300 group-hover:text-white'}`} />
                <span className="flex-1">{label}</span>
                {badge && !isActive && (
                  <span className="w-5 h-5 bg-mosai-red rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3 h-3 text-mosai-blue/50" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="border-t border-white/10 px-3 py-4 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-sm text-white truncate">{user?.name}</p>
            <p className="font-body text-xs text-blue-300 capitalize">{user?.role} · {mockTeacher.section}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold text-blue-300 hover:text-white hover:bg-red-500/20 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10"><Sidebar mobile /></div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 bg-mosai-blue-dark border-b border-white/10 px-4 py-3 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-blue-300 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-white flex items-center justify-center shrink-0 p-0.5">
              <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
            </span>
            <span className="font-heading font-bold text-sm text-white">MOSAI Teacher Portal</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
