import { Link } from 'react-router-dom'
import { Home, ArrowRight, Compass } from 'lucide-react'

const helpfulLinks = [
  { label: 'About Us',   to: '/about' },
  { label: 'Programs',   to: '/programs' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Gallery',    to: '/gallery' },
  { label: 'Contact',    to: '/contact' },
]

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-mosai-blue-dark via-mosai-blue to-blue-700 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg text-center">

        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-2xl mb-8 backdrop-blur-sm border border-white/20">
          <Compass className="w-8 h-8 text-white" />
        </div>

        <p className="font-heading font-extrabold text-7xl sm:text-8xl text-white leading-none mb-3">404</p>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3">
          Page Not Found
        </h1>
        <p className="font-body text-blue-100 text-base leading-relaxed mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-base px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] mb-10"
        >
          <Home className="w-5 h-5" /> Back to Home
        </Link>

        <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-6">
          <p className="font-heading font-bold text-xs text-white/60 uppercase tracking-widest mb-4">
            Or try one of these
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {helpfulLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex items-center gap-1 font-body font-semibold text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors duration-150 group"
              >
                {link.label}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
