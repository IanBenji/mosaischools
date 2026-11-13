import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'

export default function CTABanner() {
  return (
    <section className="relative bg-gradient-to-br from-mosai-red-dark via-mosai-red to-crayon-coral py-24 overflow-hidden">
      {/* Scalloped top flowing from the testimonial section */}
      <WaveDivider variant="scallop" color="#E8EEF6" flip className="absolute top-0 left-0 right-0 z-[1]" />

      {/* Playful floating doodles */}
      <Doodles names={['star', 'balloon', 'sun']} count={4} />

      <div className="relative z-[3] max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 font-heading font-extrabold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-5">
          <Sparkles className="w-4 h-4 text-crayon-sun" /> Enroll Today
        </span>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl mb-4 leading-tight">
          Ready to Give Your Child the Best Start?
        </h2>
        <p className="font-body text-lg text-red-50 mb-9 max-w-xl mx-auto">
          Join the Mosai Schools family at Nalugala and Bunono. Spaces are limited, so secure your child's place today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 font-heading font-extrabold text-base bg-white text-mosai-red hover:-translate-y-0.5 px-9 py-4 rounded-full transition-all duration-200 shadow-xl"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-heading font-extrabold text-base border-2 border-white text-white hover:bg-white hover:text-mosai-red px-9 py-4 rounded-full transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
