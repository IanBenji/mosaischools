import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, User, CalendarDays, FileText,
  MessageSquare, CreditCard, Bell, LogOut,
  Menu, X, ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import mosaiLogo from '../../assets/mosailogo-removebg-preview.png'

const navItems = [
  { to: '/parent',             icon: LayoutDashboard, label: 'Dashboard',     end: true },
  { to: '/parent/child',       icon: User,            label: 'My Child'              },
  { to: '/parent/attendance',  icon: CalendarDays,    label: 'Attendance'            },
  { to: '/parent/reports',     icon: FileText,        label: 'Reports'               },
  { to: '/parent/messages',    icon: MessageSquare,   label: 'Messages',    badge: 1  },
  { to: '/parent/payments',    icon: CreditCard,      label: 'Payments'              },
  { to: '/parent/announcements',icon: Bell,           label: 'Announcements'         },
]

export default function ParentLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`flex flex-col h-full bg-slate-900 text-white ${mobile ? 'w-72' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shrink-0 p-1">
          <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="font-heading font-extrabold text-sm leading-tight">MOSAI Schools</p>
          <p className="font-body text-xs text-slate-400">Parent Portal</p>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, badge, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-mosai-blue text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="flex-1">{label}</span>
                {badge && !isActive && (
                  <span className="w-5 h-5 bg-mosai-red rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3 h-3 text-white/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User profile + logout */}
      <div className="border-t border-white/10 px-3 py-4 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 bg-mosai-blue rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-sm text-white truncate">{user?.name}</p>
            <p className="font-body text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold text-slate-400 hover:text-white hover:bg-red-500/15 transition-all duration-150"
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

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-600 hover:text-slate-900">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center shrink-0 p-0.5">
              <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
            </span>
            <span className="font-heading font-bold text-sm text-slate-800">MOSAI Parent Portal</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
