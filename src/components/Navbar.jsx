import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'

/* Portal Login UI is DISABLED (requires a backend). See the commented block
 * near the end of this file to restore it once authentication exists.
 * import { useNavigate } from 'react-router-dom'
 * import { ChevronDown, Users, BookOpen, LogOut, User } from 'lucide-react'
 * import avatarPlaceholder from '../assets/avatar-placeholder.svg'
 * import LoginModal from './LoginModal'
 * import { useAuth } from '../context/AuthContext'
 */

const navLinks = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Programs',   to: '/programs' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Gallery',    to: '/gallery' },
  { label: 'Contact',    to: '/contact' },
]

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const location    = useLocation()

  /* Portal auth — DISABLED (requires a backend)
   * const [loginOpen, setLoginOpen] = useState(false)
   * const [modal,     setModal]     = useState(null) // null | 'parent' | 'staff'
   * const dropdownRef = useRef(null)
   * const navigate    = useNavigate()
   * const { isAuthenticated, user, logout } = useAuth()
   *
   * function handleLogout() {
   *   logout()
   *   setLoginOpen(false)
   *   setMenuOpen(false)
   *   navigate('/')
   * }
   *
   * function openModal(type) {
   *   setLoginOpen(false)
   *   setMenuOpen(false)
   *   setModal(type)
   * }
   *
   * const portalItems = [
   *   { key: 'parent', label: 'Parent Portal', icon: Users,    desc: "Track your child's progress" },
   *   { key: 'staff',  label: 'Staff Portal',  icon: BookOpen, desc: 'For teachers and school staff' },
   * ]
   */

  // ALL pages: transparent until scrolled
  const isTransparent = !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reset scroll state on route change (new page always starts at top)
  useEffect(() => {
    setScrolled(window.scrollY > 60)
  }, [location.pathname])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent ? 'bg-transparent py-4' : 'bg-white shadow-md py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                isTransparent
                  ? 'bg-white/20 group-hover:bg-white/30'
                  : 'bg-mosai-blue group-hover:bg-mosai-blue-dark'
              }`}>
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className={`font-heading font-extrabold text-xl leading-tight transition-colors duration-200 ${
                isTransparent ? 'text-white' : 'text-mosai-blue-dark'
              }`}>
                Mosai
                <br />
                <span className={`text-sm font-bold ${isTransparent ? 'text-red-300' : 'text-mosai-red'}`}>
                  Schools
                </span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `group relative font-body font-semibold text-sm px-4 py-2 transition-colors duration-150 ${
                      isActive
                        ? 'text-mosai-red'
                        : isTransparent
                          ? 'text-white/90 hover:text-white'
                          : 'text-gray-700 hover:text-mosai-blue'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full transform transition-transform duration-200 origin-left ${
                        isActive
                          ? 'bg-mosai-red scale-x-100'
                          : isTransparent
                            ? 'bg-white scale-x-0 group-hover:scale-x-100'
                            : 'bg-mosai-blue scale-x-0 group-hover:scale-x-100'
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* ───── Portal Login (desktop) — DISABLED (requires a backend) ─────
              <div className="hidden md:block relative" ref={dropdownRef}>
                ... Portal Login dropdown / logged-in chip + Sign Out ...
              </div>
            ──────────────────────────────────────────────────────────────────── */}

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-mosai-blue-dark'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className={`md:hidden mt-3 pb-4 border-t pt-3 ${
              isTransparent ? 'border-white/20 bg-mosai-blue-dark/95 rounded-xl px-2' : 'border-gray-100'
            }`}>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `font-body font-semibold px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'text-mosai-red bg-red-50'
                          : isTransparent
                            ? 'text-white hover:bg-white/10'
                            : 'text-gray-700 hover:text-mosai-blue hover:bg-mosai-blue-light'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* ───── Portal Login (mobile) — DISABLED (requires a backend) ─────
                  <div className="mt-3 border-t border-white/10 pt-3 space-y-2">
                    ... logged-in chip + Sign Out / Parent + Staff portal buttons ...
                  </div>
                ──────────────────────────────────────────────────────────────── */}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ───── Login modals — DISABLED (requires a backend) ─────
        {modal && (
          <LoginModal
            type={modal}
            onClose={() => setModal(null)}
            onSwitch={(t) => setModal(t)}
          />
        )}
      ──────────────────────────────────────────────────────── */}
    </>
  )
}
