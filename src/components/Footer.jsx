import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react'

const socialIcons = [
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'X (Twitter)',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'YouTube',
    path: 'M19.59 6.69a4.83 4.83 0 01-3.77-2.75 12.27 12.27 0 00-8.45 0 4.83 4.83 0 01-3.77 2.75A5 5 0 002 11.5v1A5 5 0 004.41 17.31a4.83 4.83 0 013.77 2.75 12.27 12.27 0 008.45 0 4.83 4.83 0 013.77-2.75A5 5 0 0022 12.5v-1a5 5 0 00-2.41-4.81zM10 15V9l5 3-5 3z',
  },
]

const quickLinks = [
  { label: 'Home',       to: '/' },
  { label: 'About Us',   to: '/about' },
  { label: 'Programs',   to: '/programs' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Gallery',    to: '/gallery' },
  { label: 'Contact',    to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-mosai-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg leading-tight">
                MOSAI Schools
              </span>
            </div>
            <p className="font-body text-sm text-blue-100 leading-relaxed mb-2">
              We believe in creating a lasting change in every child that goes through our hands.
            </p>
            <p className="font-body text-xs text-blue-300 italic mb-4">
              God-fearing &bull; Hope and Love &bull; Humility &bull; Excellence
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-mosai-red flex items-center justify-center transition-colors duration-200"
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
            <h3 className="font-heading font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-blue-100 hover:text-white transition-colors duration-150 flex items-center gap-1"
                  >
                    <span className="text-mosai-red">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-blue-100">
                <MapPin className="w-4 h-4 mt-0.5 text-mosai-red shrink-0" />
                <span>Garuga Road, off Kampala-Entebbe Road,<br />Katabi, Wakiso District, Uganda</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-blue-100">
                <Phone className="w-4 h-4 text-mosai-red shrink-0" />
                <a href="tel:+256700123456" className="hover:text-white transition-colors">+256 700 123 456</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-blue-100">
                <Mail className="w-4 h-4 text-mosai-red shrink-0" />
                <a href="mailto:info@mosaischools.ug" className="hover:text-white transition-colors">info@mosaischools.ug</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-base mb-4">Stay Updated</h3>
            <p className="font-body text-sm text-blue-100 mb-3">
              For the latest MOSAI Schools news and announcements, email us to be added to our mailing list or follow us on social media.
            </p>

            {/* ───── Newsletter signup — DISABLED (requires a backend) ─────
              A live signup needs a mailing-list service. Restore once available:
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="font-body text-sm px-3 py-2.5 rounded-md bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="font-heading font-bold text-sm bg-mosai-red hover:bg-mosai-red-dark px-4 py-2.5 rounded-md transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            ──────────────────────────────────────────────────────────────── */}

            <a
              href="mailto:info@mosaischools.ug?subject=Newsletter%20Sign-up"
              className="inline-flex items-center justify-center gap-2 font-heading font-bold text-sm bg-mosai-red hover:bg-mosai-red-dark px-4 py-2.5 rounded-md transition-colors duration-200"
            >
              <Mail className="w-4 h-4" /> Email to Subscribe
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-blue-200 text-center sm:text-left">
            &copy; 2026 MOSAI Schools. Licensed by the Ministry of Education and Sports, Uganda.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="font-body text-xs text-blue-200 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="font-body text-xs text-blue-200 hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span className="font-body text-xs text-blue-300 hidden sm:inline">
              Payments via School Pay System only
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
