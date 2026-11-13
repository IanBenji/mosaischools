import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { MOSAI_ETHOS } from '../lib/campus'
import mosaiLogo from '../assets/mosailogo-removebg-preview.png'

const socialIcons = [
  { label: 'Facebook',    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'X (Twitter)', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'Instagram',   path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'YouTube',     path: 'M19.59 6.69a4.83 4.83 0 01-3.77-2.75 12.27 12.27 0 00-8.45 0 4.83 4.83 0 01-3.77 2.75A5 5 0 002 11.5v1A5 5 0 004.41 17.31a4.83 4.83 0 013.77 2.75 12.27 12.27 0 008.45 0 4.83 4.83 0 013.77-2.75A5 5 0 0022 12.5v-1a5 5 0 00-2.41-4.81zM10 15V9l5 3-5 3z' },
]

const quickLinks = [
  { label: 'Home',         to: '/' },
  { label: 'About Us',     to: '/about' },
  { label: 'Programs',     to: '/programs' },
  { label: 'Admissions',   to: '/admissions' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'Donate',       to: '/donate' },
  { label: 'Gallery',      to: '/gallery' },
  { label: 'Contact',      to: '/contact' },
]

const parentQuickLinks = [
  { label: 'School News',   to: '/news' },
  { label: 'Term Dates',    to: '/calendar' },
  { label: 'Downloads',     to: '/downloads' },
]

const CRAYONS = ['#FF8A6B', '#FFC93C', '#5FBB6E', '#6EC6F2', '#9B7EDE']

export default function Footer() {
  const { campus, campusInfo } = useCampus()
  const isBunono = campus === 'bunono'
  const p   = campusInfo.profile
  const tel = campusInfo.phone.replace(/\s+/g, '')
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')

  const bg     = isBunono ? 'bg-mosai-red-dark' : 'bg-mosai-blue-dark'
  const muted  = isBunono ? 'text-red-100'  : 'text-blue-100'
  const muted2 = isBunono ? 'text-red-200'  : 'text-blue-200'
  const accent = isBunono ? '#FFC93C' : '#FF8A6B'

  return (
    <footer className={`${bg} text-white`}>
      {/* Cheerful crayon stripe */}
      <div className="flex h-2">
        {CRAYONS.map((c) => <div key={c} className="flex-1" style={{ backgroundColor: c }} />)}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center p-1">
                <img src={mosaiLogo} alt="Mosai Schools" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-extrabold text-lg leading-tight">
                Mosai Schools
                <span className={`block text-xs font-bold ${muted2}`}>{campusInfo.name} Campus</span>
              </span>
            </div>
            <p className={`font-body text-sm leading-relaxed mb-3 ${muted}`}>
              We believe in creating a lasting change in every child that passes through our hands.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {MOSAI_ETHOS.values.map((v) => (
                <span key={v} className="font-heading text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10">{v}</span>
              ))}
            </div>
            <div className="flex gap-3">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-extrabold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`font-body text-sm ${muted} hover:text-white transition-colors duration-150 flex items-center gap-2 group`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-150 transition-transform" style={{ backgroundColor: accent }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-heading font-extrabold text-base mt-7 mb-4">For Parents</h3>
            <ul className="space-y-2.5">
              {parentQuickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`font-body text-sm ${muted} hover:text-white transition-colors duration-150 flex items-center gap-2 group`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-150 transition-transform" style={{ backgroundColor: accent }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — campus specific */}
          <div>
            <h3 className="font-heading font-extrabold text-base mb-4">{campusInfo.name} Campus</h3>
            <ul className="space-y-3">
              <li className={`flex items-start gap-2 text-sm ${muted}`}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} />
                <span>{p.address},<br />{p.area}, Wakiso District, Uganda</span>
              </li>
              <li className={`flex items-center gap-2 text-sm ${muted}`}>
                <Phone className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <a href={`tel:${tel}`} className="hover:text-white transition-colors">{campusInfo.phone}</a>
              </li>
              <li className={`flex items-center gap-2 text-sm ${muted}`}>
                <MessageCircle className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Chat on WhatsApp</a>
              </li>
              <li className={`flex items-center gap-2 text-sm ${muted}`}>
                <Mail className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <a href={`mailto:${campusInfo.email}`} className="hover:text-white transition-colors break-all">{campusInfo.email}</a>
              </li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="font-heading font-extrabold text-base mb-4">Stay Updated</h3>
            <p className={`font-body text-sm mb-4 ${muted}`}>
              For the latest Mosai Schools news, email us to join our mailing list or follow us on social media.
            </p>
            <a
              href={`mailto:${campusInfo.email}?subject=Newsletter%20Sign-up`}
              className="inline-flex items-center justify-center gap-2 font-heading font-bold text-sm bg-white text-mosai-blue-dark hover:-translate-y-0.5 px-5 py-3 rounded-full transition-all duration-200 shadow-md"
            >
              <Mail className="w-4 h-4" /> Email to Subscribe
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`font-body text-xs text-center sm:text-left ${muted2}`}>
            &copy; 2026 Mosai Schools. Licensed by the Ministry of Education and Sports, Uganda.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className={`font-body text-xs ${muted2} hover:text-white transition-colors`}>Privacy Policy</Link>
            <Link to="/terms" className={`font-body text-xs ${muted2} hover:text-white transition-colors`}>Terms of Use</Link>
            <span className={`font-body text-xs hidden sm:inline ${muted2}`}>Payments via School Pay only</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
