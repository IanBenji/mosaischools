import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, UserCheck, ClipboardList,
  CreditCard, BarChart3, Megaphone, Settings,
  LogOut, Menu, X, ChevronRight, Shield,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import mosaiLogo from '../../assets/mosailogo-removebg-preview.png'

const navItems = [
  { to:'/admin',              icon:LayoutDashboard, label:'Dashboard',       end:true },
  { to:'/admin/students',     icon:Users,           label:'Students'               },
  { to:'/admin/teachers',     icon:UserCheck,       label:'Teachers'               },
  { to:'/admin/admissions',   icon:ClipboardList,   label:'Admissions',    badge:3  },
  { to:'/admin/payments',     icon:CreditCard,      label:'Payments'               },
  { to:'/admin/reports',      icon:BarChart3,       label:'Reports'                },
  { to:'/admin/announcements',icon:Megaphone,       label:'Announcements'          },
  { to:'/admin/settings',     icon:Settings,        label:'Settings'               },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() { logout(); navigate('/login') }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`flex flex-col h-full bg-zinc-900 text-white ${mobile ? 'w-72' : 'w-64'}`}>

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shrink-0 p-1">
          <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="font-heading font-extrabold text-sm leading-tight text-white">MOSAI Schools</p>
          <p className="font-body text-xs text-zinc-400">Admin Panel</p>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role badge */}
      <div className="mx-3 mt-4 bg-mosai-red/15 border border-mosai-red/25 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <Shield className="w-4 h-4 text-mosai-red shrink-0" />
        <div>
          <p className="font-heading font-bold text-xs text-white">Administrator</p>
          <p className="font-body text-[10px] text-zinc-500">Full access · Both campuses</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, badge, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-mosai-red text-white shadow-lg shadow-red-900/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                <span className="flex-1">{label}</span>
                {badge && !isActive && (
                  <span className="w-5 h-5 bg-mosai-red rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3 h-3 text-red-300" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + logout */}
      <div className="border-t border-white/8 px-3 py-4 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 bg-mosai-red rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-sm text-white truncate">{user?.name}</p>
            <p className="font-body text-xs text-zinc-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold text-zinc-400 hover:text-white hover:bg-red-500/15 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-zinc-100 overflow-hidden">
      <div className="hidden lg:flex flex-col shrink-0"><Sidebar /></div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10"><Sidebar mobile /></div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden flex items-center gap-3 bg-zinc-900 px-4 py-3 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-zinc-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-white flex items-center justify-center shrink-0 p-0.5">
              <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
            </span>
            <span className="font-heading font-bold text-sm text-white">MOSAI Admin</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  )
}
