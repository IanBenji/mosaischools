import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import PageHeader  from '../components/PageHeader'
import PhotoBand   from '../components/PhotoBand'
import Doodles     from '../components/Doodles'
import WaveDivider from '../components/WaveDivider'
import { ContactForm } from './Contact'
import { bunonoPhotos } from '../assets/bunono'

import imgHeader from '../assets/bunono/bunono-45.webp'  // Bunono classroom block

/* Bunono CONTACT — storybook design, reuses the shared ContactForm logic. */

const CREAM = '#FFF8EE'
const INK  = 'text-[#43261A]'
const INK2 = 'text-[#7A5C4A]'

export default function ContactBunono() {
  const { campusInfo } = useCampus()
  const p   = campusInfo.profile
  const tel = campusInfo.phone.replace(/\s+/g, '')
  const wa  = campusInfo.whatsapp.replace(/[^\d]/g, '')
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(campusInfo.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`

  const bubbles = [
    { icon: Phone,         label: 'Call us',      value: campusInfo.phone,    href: `tel:${tel}`,                 color: '#FF8A6B' },
    { icon: MessageCircle, label: 'WhatsApp',     value: 'Chat with us',      href: `https://wa.me/${wa}`,        color: '#5FBB6E' },
    { icon: Mail,          label: 'Email',        value: campusInfo.email,    href: `mailto:${campusInfo.email}`, color: '#6EC6F2' },
    { icon: MapPin,        label: 'Visit',        value: p.area,              href: null,                         color: '#FFC93C' },
  ]

  return (
    <main className="bg-cream overflow-hidden">
      <PageHeader
        crumb="Contact"
        title="Say"
        accentWord="Hello!"
        subtitle="We'd love to hear from you. Call, message or pop in, and our Bunono team replies within one working day."
        image={imgHeader}
        nextBg={CREAM}
      />

      {/* Contact bubbles */}
      <section className="relative py-16">
        <Doodles names={['balloon', 'star']} count={2} />
        <div className="relative z-[3] max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bubbles.map((b, i) => {
              const Icon = b.icon
              const inner = (
                <>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md mx-auto" style={{ backgroundColor: b.color }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-body text-[11px] font-bold uppercase tracking-widest text-gray-400">{b.label}</p>
                  <p className={`font-heading font-bold mt-1 break-words ${INK}`}>{b.value}</p>
                </>
              )
              const cls = 'block text-center bg-white rounded-[2rem] p-7 shadow-sm border-2 border-dashed hover:-translate-y-1.5 transition-transform duration-200'
              return b.href ? (
                <a key={b.label} href={b.href} target={b.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={cls} style={{ borderColor: b.color, transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>{inner}</a>
              ) : (
                <div key={b.label} className={cls} style={{ borderColor: b.color, transform: `rotate(${i % 2 ? 1 : -1}deg)` }}>{inner}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[39]} cap="Our campus" bg="bg-cream" />

      {/* Form + map */}
      <section className="relative bg-white py-16">
        <WaveDivider variant="scallop" color={CREAM} flip className="absolute top-0 left-0 right-0" />
        <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3 bg-cream rounded-[2rem] p-7 sm:p-10 border-2 border-dashed border-crayon-coral">
              <h2 className={`font-heading font-extrabold text-3xl ${INK}`}>
                Send us a{' '}
                <span className="crayon-underline" style={{ '--crayon-color': '#FFC93C' }}>message</span>
              </h2>
              <p className={`font-body text-sm mt-2 mb-7 ${INK2}`}>Fill this in and we'll get back to you within one working day.</p>
              <ContactForm />
            </div>

            <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-28">
              <div className="rounded-[2rem] overflow-hidden shadow-md ring-8 ring-cream" style={{ height: 280 }}>
                <iframe title={`Bunono Campus, ${campusInfo.mapQuery}`} src={mapSrc} width="100%" height="280" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="bg-mosai-red text-white rounded-[2rem] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <p className="font-heading font-bold">Office Hours</p>
                </div>
                <p className="font-body text-sm text-white/90">Monday to Friday · 8:00 AM to 4:00 PM</p>
                <p className="font-body text-xs text-white/70 mt-1">Also open during holidays for admissions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* scattered photo */}
      <PhotoBand img={bunonoPhotos[44]} cap="Our classrooms" bg="bg-white" />
    </main>
  )
}
