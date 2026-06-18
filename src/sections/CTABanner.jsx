import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    <section className="relative bg-gradient-to-r from-mosai-red-dark via-mosai-red to-red-500 py-20 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full" aria-hidden="true" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/5 rounded-full" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/10 rounded-full" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span className="font-body text-sm font-semibold uppercase tracking-widest text-red-200 mb-4 block">
          Enroll Today
        </span>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl mb-4 leading-tight">
          Ready to Give Your Child the Best Start?
        </h2>
        <p className="font-body text-lg text-red-100 mb-8 max-w-xl mx-auto">
          Join the MOSAI Schools family at Nalugala and Bunono Campuses.
          Spaces are limited. Secure your child's place today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/admissions"
            className="font-heading font-bold text-base bg-white text-mosai-red hover:bg-gray-100 px-10 py-4 rounded-full transition-colors duration-200 shadow-lg"
          >
            Apply Now
          </Link>
          <Link
            to="/contact"
            className="font-heading font-bold text-base border-2 border-white text-white hover:bg-white hover:text-mosai-red px-10 py-4 rounded-full transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
