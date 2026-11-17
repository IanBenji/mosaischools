import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MapPin, ChevronDown, Check, Heart } from 'lucide-react'
import { CAMPUSES } from '../lib/campus'
import { useCampus } from '../context/CampusContext'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'
// Dark theme is switched off for now. To restore it, uncomment this import, the
// two <ThemeToggle /> lines below, ThemeProvider in App.jsx and the theme
// script in index.html.
// import ThemeToggle from './ThemeToggle'

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
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const location    = useLocation()
  const closeTimer  = useRef(null)

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

  /* The mobile drawer slides out rather than vanishing, so closing runs through
   * here: flag it closing, then unmount once the animation has played. */
  function closeMenu() {
    setMenuClosing(true)
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
    }, 200)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  function pickCampus(slug) {
    setCampus(slug)
    setCampusOpen(false)
    if (menuOpen) closeMenu()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Everything the header has to forget when the route changes: the new page
   * opens at the top, and a drawer left standing would sit over it.
   *
   * Done while rendering rather than in an effect. Resetting state in an effect
   * means React has already painted the old value — the condensed header, the
   * open drawer — before the correction lands, so the drawer is briefly visible
   * on top of the page just navigated to. Comparing against the path we last
   * rendered lets React finish this render with the right values instead, which
   * is its documented way to reset state when a value changes.
   *
   * scrolled goes to false rather than re-reading window.scrollY because
   * ScrollRestoration puts every new route back at the top; reading the scroll
   * position here would only race it, and would make rendering impure. */
  const [renderedPath, setRenderedPath] = useState(location.pathname)
  if (renderedPath !== location.pathname) {
    setRenderedPath(location.pathname)
    setScrolled(false)
    setMenuOpen(false)
    setMenuClosing(false)
  }

  /* The half finished slide out is dropped separately, because a ref may not be
   * touched while rendering. Left running, its callback would land up to 200ms
   * into the new page and shut a drawer the visitor had just reopened. */
  useEffect(() => { clearTimeout(closeTimer.current) }, [location.pathname])

  // Hold the page still behind the open drawer.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  // Escape dismisses the drawer.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

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
            <div className="flex items-center gap-2 sm:gap-3">
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
                MOSAI
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
                className={`flex items-center gap-1 rounded-full border px-2 py-1 font-body text-[11px] font-semibold transition-colors duration-200 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs ${
                  isTransparent
                    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                    : isBunono
                      ? 'border-mosai-red-light bg-mosai-red-light/60 text-mosai-red hover:bg-mosai-red-light'
                      : 'border-mosai-blue-light bg-mosai-blue-light/60 text-mosai-blue hover:bg-mosai-blue-light'
                }`}
              >
                <MapPin className={`w-3 h-3 shrink-0 sm:w-3.5 sm:h-3.5 ${isTransparent ? 'text-white' : isBunono ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                <span className={`hidden text-[9px] font-bold uppercase tracking-wider sm:inline ${isTransparent ? 'text-white/60' : 'opacity-60'}`}>
                  Campus:
                </span>
                <span className="font-bold">{campusInfo.name}</span>
                <span className={`hidden font-semibold md:inline ${isTransparent ? 'text-white/60' : 'opacity-60'}`}>· Switch</span>
                <ChevronDown className={`w-3 h-3 opacity-70 transition-transform duration-200 sm:w-3.5 sm:h-3.5 ${campusOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* On a phone the panel is centred under the chip so it cannot run
                  off the edge of a narrow screen. */}
              {campusOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(18rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl sm:left-0 sm:w-72 sm:translate-x-0" role="listbox">
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

            {/* Light / dark theme (switched off for now)
            <ThemeToggle onDark={isTransparent} className="hidden lg:flex" /> */}

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
              className={`lg:hidden -mr-2 p-2 transition-colors ${isTransparent ? 'text-white' : 'text-mosai-blue-dark'}`}
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile menu drawer ──────────────────────────────────────────────
          A panel that slides in over the page rather than pushing the bar
          open. It always sits on white, so the links stay readable whatever
          the hero behind it looks like. */}
      {menuOpen && (
        <div className="fixed inset-0 z-[8500] overflow-hidden lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <div
            className={`absolute inset-0 ${menuClosing ? 'nav-drawer-backdrop--out' : 'nav-drawer-backdrop'}`}
            onClick={closeMenu}
          />

          <div className={`absolute right-0 top-0 flex h-full w-[86vw] max-w-sm flex-col bg-white shadow-2xl ${
            menuClosing ? 'nav-drawer--out' : 'nav-drawer'
          }`}>

            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white p-1 ring-1 ring-gray-100">
                  <img src={mosaiLogo} alt="" className="h-full w-full object-contain" />
                </div>
                <span className="font-heading text-base font-extrabold leading-none text-mosai-blue-dark">
                  MOSAI <span className="text-mosai-red">Schools</span>
                </span>
              </Link>
              {/* <ThemeToggle className="ml-auto mr-1" />  dark theme switched off for now */}
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Campus switcher — two plain cards, no extra tap to reveal them */}
            <div className="border-b border-gray-100 bg-gray-50/70 px-4 py-4">
              <p className="px-1 pb-2 font-body text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Viewing campus
              </p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(CAMPUSES).map(([slug, c]) => {
                  const isActive = slug === campus
                  const isRed    = c.accent === 'red'
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => pickCampus(slug)}
                      aria-pressed={isActive}
                      className={`rounded-xl border-2 bg-white px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? isRed ? 'border-mosai-red bg-mosai-red-light/50' : 'border-mosai-blue bg-mosai-blue-light/50'
                          : 'border-gray-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin className={`h-3.5 w-3.5 shrink-0 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                        <span className="font-heading text-sm font-bold text-mosai-blue-dark">{c.name}</span>
                        {isActive && <Check className={`ml-auto h-3.5 w-3.5 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />}
                      </span>
                      <span className="mt-0.5 block font-body text-[11px] text-gray-500">
                        {c.tagline.split('·')[0].trim()}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {navLinksBefore.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-3 font-body text-[15px] font-semibold transition-colors ${
                      isActive ? 'bg-red-50 text-mosai-red' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* For Parents — a labelled group rather than a dropdown, so
                  nothing is hidden behind an extra tap on a phone. */}
              <p className="mt-4 px-3 pb-1 font-body text-[10px] font-bold uppercase tracking-widest text-gray-400">
                For Parents
              </p>
              {parentLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-3 font-body text-[15px] font-semibold transition-colors ${
                      isActive ? 'bg-red-50 text-mosai-red' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="my-3 border-t border-gray-100" />

              {navLinksAfter.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-3 font-body text-[15px] font-semibold transition-colors ${
                      isActive ? 'bg-red-50 text-mosai-red' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Donate stays in reach at the bottom of the panel */}
            <div className="border-t border-gray-100 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <NavLink
                to="/donate"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-full bg-mosai-red px-4 py-3.5 font-heading text-sm font-bold text-white transition-colors hover:bg-mosai-red-dark"
              >
                <Heart className="h-4 w-4" /> Donate
              </NavLink>
            </div>

            {/* ───── Portal Login (mobile) — DISABLED (requires a backend) ─────
              <div className="border-t border-gray-100 p-4 space-y-2">
                ... logged-in chip + Sign Out / Parent + Staff portal buttons ...
              </div>
            ──────────────────────────────────────────────────────────────── */}
          </div>
        </div>
      )}

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
