import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MapPin, ChevronDown, Check, Heart } from 'lucide-react'
import { CAMPUSES } from '../lib/campus'
import { useCampus } from '../context/CampusContext'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'

/* Portal Login UI is DISABLED (requires a backend). See the commented block
 * near the end of this file to restore it once authentication exists.
 * import { useNavigate } from 'react-router-dom'
 * import { ChevronDown, Users, BookOpen, LogOut, User } from 'lucide-react'
 * import avatarPlaceholder from '../assets/avatar-placeholder.svg'
 * import LoginModal from './LoginModal'
 * import { useAuth } from '../context/AuthContext'
 */

/* The top row stays short on purpose. Everything a current parent needs week to
 * week lives under "For Parents" so the bar does not overflow at laptop widths. */
const navLinksBefore = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Programs',   to: '/programs' },
  { label: 'Admissions', to: '/admissions' },
]

const navLinksAfter = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

const parentLinks = [
  { label: 'News & Announcements', to: '/news',         desc: 'Notices, updates and reminders' },
  { label: 'Term Dates & Events',  to: '/calendar',     desc: 'When term opens, closes and everything between' },
  { label: 'Forms & Downloads',    to: '/downloads',    desc: 'Fee structure, requirements and school forms' },
  { label: 'Scholarships',         to: '/scholarships', desc: 'Support for able children who need it' },
]

// Routes that should light up the "For Parents" tab when active.
const parentPaths = parentLinks.map(l => l.to)

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

  // Active campus + switcher dropdown
  const { campus, campusInfo, setCampus } = useCampus()
  const isBunono = campus === 'bunono'
  const [campusOpen, setCampusOpen] = useState(false)
  const campusRef = useRef(null)

  // "For Parents" dropdown
  const [parentsOpen, setParentsOpen] = useState(false)
  const parentsRef = useRef(null)
  const inParentSection = parentPaths.includes(location.pathname)

  useEffect(() => {
    function onDocClick(e) {
      if (campusRef.current  && !campusRef.current.contains(e.target))  setCampusOpen(false)
      if (parentsRef.current && !parentsRef.current.contains(e.target)) setParentsOpen(false)
    }
    function onEscape(e) {
      if (e.key === 'Escape') { setCampusOpen(false); setParentsOpen(false) }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  function pickCampus(slug) {
    setCampus(slug)
    setCampusOpen(false)
    setMenuOpen(false)
  }

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

            {/* Logo + campus switcher */}
            <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center p-1 transition-colors duration-200 ${
                isTransparent
                  ? 'bg-white/90 group-hover:bg-white'
                  : 'bg-white group-hover:bg-gray-50'
              }`}>
                <img src={mosaiLogo} alt="MOSAI Schools" className="w-full h-full object-contain" />
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

            <div className="relative block" ref={campusRef}>
              <button
                type="button"
                onClick={() => setCampusOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={campusOpen}
                title="Switch campus"
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-body text-xs font-semibold transition-colors duration-200 sm:px-3 ${
                  isTransparent
                    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                    : isBunono
                      ? 'border-mosai-red-light bg-mosai-red-light/60 text-mosai-red hover:bg-mosai-red-light'
                      : 'border-mosai-blue-light bg-mosai-blue-light/60 text-mosai-blue hover:bg-mosai-blue-light'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 shrink-0 ${isTransparent ? 'text-white' : isBunono ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                <span className={`hidden text-[9px] font-bold uppercase tracking-wider sm:inline ${isTransparent ? 'text-white/60' : 'opacity-60'}`}>
                  Campus:
                </span>
                <span className="font-bold">{campusInfo.name}</span>
                <span className={`hidden font-semibold md:inline ${isTransparent ? 'text-white/60' : 'opacity-60'}`}>· Switch</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${campusOpen ? 'rotate-180' : ''}`} />
              </button>

              {campusOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl z-50" role="listbox">
                  {Object.entries(CAMPUSES).map(([slug, c]) => {
                    const isActive = slug === campus
                    return (
                      <button
                        key={slug}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => pickCampus(slug)}
                        className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          isActive ? (slug === 'bunono' ? 'bg-mosai-red-light' : 'bg-mosai-blue-light') : 'hover:bg-gray-50'
                        }`}
                      >
                        <MapPin className={`mt-0.5 w-4 h-4 shrink-0 ${slug === 'bunono' ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center gap-2 font-heading font-bold text-sm text-mosai-blue-dark">
                            {c.name} Campus
                            {isActive && <Check className={`w-3.5 h-3.5 ${slug === 'bunono' ? 'text-mosai-red' : 'text-mosai-blue'}`} />}
                          </span>
                          <span className="block font-body text-xs text-gray-500">{c.tagline}</span>
                          <span className="block font-body text-xs text-gray-400">{c.location}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            </div>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0">
              {navLinksBefore.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `group relative font-body font-semibold text-sm px-3 py-2 transition-colors duration-150 ${
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

              {/* For Parents */}
              <div className="relative" ref={parentsRef}>
                <button
                  type="button"
                  onClick={() => setParentsOpen(o => !o)}
                  aria-haspopup="true"
                  aria-expanded={parentsOpen}
                  className={`group relative flex items-center gap-1 font-body font-semibold text-sm px-3 py-2 transition-colors duration-150 ${
                    inParentSection
                      ? 'text-mosai-red'
                      : isTransparent
                        ? 'text-white/90 hover:text-white'
                        : 'text-gray-700 hover:text-mosai-blue'
                  }`}
                >
                  For Parents
                  <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${parentsOpen ? 'rotate-180' : ''}`} />
                  <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full transform transition-transform duration-200 origin-left ${
                    inParentSection
                      ? 'bg-mosai-red scale-x-100'
                      : isTransparent
                        ? 'bg-white scale-x-0 group-hover:scale-x-100'
                        : 'bg-mosai-blue scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>

                {parentsOpen && (
                  <div className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl z-50">
                    {parentLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setParentsOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-xl px-3 py-2.5 transition-colors ${isActive ? 'bg-mosai-blue-light' : 'hover:bg-gray-50'}`
                        }
                      >
                        <span className="block font-heading font-bold text-sm text-mosai-blue-dark">{link.label}</span>
                        <span className="block font-body text-xs text-gray-500">{link.desc}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              {navLinksAfter.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative font-body font-semibold text-sm px-3 py-2 transition-colors duration-150 ${
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

            {/* Donate — deliberately set apart from the nav links */}
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `hidden lg:inline-flex items-center gap-1.5 font-heading font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 ${
                  isActive
                    ? 'bg-mosai-red-dark text-white shadow-md'
                    : isTransparent
                      ? 'bg-white text-mosai-red hover:bg-white/90 shadow-lg'
                      : 'bg-mosai-red text-white hover:bg-mosai-red-dark shadow-sm'
                }`
              }
            >
              <Heart className="w-4 h-4" /> Donate
            </NavLink>

            {/* ───── Portal Login (desktop) — DISABLED (requires a backend) ─────
              <div className="hidden lg:block relative" ref={dropdownRef}>
                ... Portal Login dropdown / logged-in chip + Sign Out ...
              </div>
            ──────────────────────────────────────────────────────────────────── */}

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-mosai-blue-dark'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className={`lg:hidden mt-3 pb-4 border-t pt-3 ${
              isTransparent ? 'border-white/20 bg-mosai-blue-dark/95 rounded-xl px-2' : 'border-gray-100'
            }`}>
              <div className="flex flex-col gap-1">
                {navLinksBefore.map((link) => (
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

                {/* For Parents (mobile) — a labelled group rather than a dropdown,
                    so nothing is hidden behind an extra tap on a phone. */}
                <p className={`mt-2 px-3 pb-1 font-body text-[10px] font-bold uppercase tracking-widest ${
                  isTransparent ? 'text-white/40' : 'text-gray-400'
                }`}>
                  For Parents
                </p>
                {parentLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
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

                <div className={`my-2 border-t ${isTransparent ? 'border-white/10' : 'border-gray-100'}`} />

                {navLinksAfter.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
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

                {/* Donate (mobile) */}
                <NavLink
                  to="/donate"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-mosai-red px-4 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-mosai-red-dark"
                >
                  <Heart className="w-4 h-4" /> Donate
                </NavLink>

                {/* Campus switcher (mobile) */}
                <div className={`mt-2 border-t pt-2 ${isTransparent ? 'border-white/10' : 'border-gray-100'}`}>
                  <p className={`px-3 pb-1 font-body text-[10px] font-bold uppercase tracking-widest ${
                    isTransparent ? 'text-white/40' : 'text-gray-400'
                  }`}>
                    Campus
                  </p>
                  {Object.entries(CAMPUSES).map(([slug, c]) => {
                    const isActive = slug === campus
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => pickCampus(slug)}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 font-body text-sm font-semibold transition-colors ${
                          isActive
                            ? isTransparent ? 'bg-white/15 text-white' : 'bg-mosai-blue-light text-mosai-blue'
                            : isTransparent ? 'text-white/70 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <MapPin className={`w-4 h-4 ${slug === 'bunono' ? 'text-red-300' : isTransparent ? 'text-white/60' : 'text-mosai-blue'}`} />
                        {c.name} Campus
                        {isActive && <Check className="ml-auto w-4 h-4" />}
                      </button>
                    )
                  })}
                </div>

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
