import { Link } from 'react-router-dom'
import {
  Heart, Star, Shield, Lightbulb,
  MapPin, Globe, ArrowRight,
  BookOpen, FlaskConical, GraduationCap,
  CalendarDays, Users, UserCog, School,
} from 'lucide-react'
import { useCampus } from '../context/CampusContext'
import { MOSAI_ETHOS } from '../lib/campus'
import PageHeader from '../components/PageHeader'
import AboutBunono from './AboutBunono'

import imgHeader   from '../assets/TON_8855.webp'
import imgStory1   from '../assets/IMG_8682.webp'
import imgStory2   from '../assets/TON_8713.webp'
import imgStory3   from '../assets/IMG_8563.webp'
import imgDirector from '../assets/Director.webp'
import imgNalugala from '../assets/TON_8735.webp'
import imgBunono   from '../assets/IMG_8592.webp'
import imgFac1     from '../assets/IMG_8754.webp'
import imgFac2     from '../assets/TON_8742.webp'
import imgFac3     from '../assets/IMG_8674.webp'
import imgFac4     from '../assets/TON_8779.webp'
import imgFac5     from '../assets/IMG_8677.webp'
import imgFac6     from '../assets/TON_8794.webp'
import imgFac7     from '../assets/IMG_8738.webp'
import imgFac8     from '../assets/TON_8786.webp'
import imgCta      from '../assets/TON_8807.webp'

const coreValues = [
  {
    icon: Shield,
    title: 'God fearing',
    desc: 'Building a strong spiritual foundation and moral character so that every learner grows with integrity and purpose.',
    color: 'red',
  },
  {
    icon: Heart,
    title: 'Hope and Love',
    desc: 'Nurturing positive attitudes and caring relationships. Every child deserves to feel loved, valued, and full of hope.',
    color: 'blue',
  },
  {
    icon: Star,
    title: 'Humility',
    desc: 'Teaching respect, gratitude, and service to others so learners grow into kind and grounded human beings.',
    color: 'red',
  },
  {
    icon: Lightbulb,
    title: 'Excellence',
    desc: 'Striving for the highest standards in everything we do, in learning, in character, and in our service to families.',
    color: 'blue',
  },
]

const campuses = [
  {
    name: 'Nalugala Campus',
    status: 'Flagship Campus',
    since: 'Opened January 2025',
    location: 'Garuga Road, off Kampala to Entebbe Road',
    district: 'Katabi, Wakiso District',
    image: imgNalugala,
    color: 'blue',
    tags: ['Day and Boarding', 'Swimming Pool', 'Digital Classrooms'],
    description:
      'Our flagship campus sits on Garuga Road in a serene, green setting. A full day and boarding facility with modern digital classrooms, an on site swimming pool, spacious outdoor grounds, and 24/7 security.',
  },
  {
    name: 'Bunono Campus',
    status: 'Second Campus',
    since: 'Opened 2026',
    location: 'Katabi, Wakiso District',
    district: 'Off Kampala to Entebbe Road',
    image: imgBunono,
    color: 'red',
    tags: ['Day and Boarding', 'Modern Facilities', 'Qualified Staff'],
    description:
      'Opened in 2026, our Bunono Campus extends the MOSAI vision to more families along the Entebbe corridor. Same high standards, same warm community, and the same commitment to every child\'s potential.',
  },
]

const curricula = [
  {
    icon: BookOpen,
    name: 'NCDC Uganda',
    desc: 'Uganda National Curriculum Development Centre, our foundation in Ugandan identity and academic grounding.',
    color: 'blue',
  },
  {
    icon: GraduationCap,
    name: 'Cambridge International',
    desc: 'Internationally recognised standards that develop independent thinking and prepare learners for a globalised world.',
    color: 'red',
  },
  {
    icon: FlaskConical,
    name: 'IB Concepts',
    desc: 'Inquiry based International Baccalaureate concepts that promote curiosity, critical thinking, and intercultural understanding.',
    color: 'blue',
  },
  {
    icon: Globe,
    name: 'British and IPC',
    desc: 'International Primary Curriculum elements that deliver thematic, cross curricular learning rooted in local values.',
    color: 'red',
  },
]

const facilities = [
  { label: '24/7 Security',      sub: 'Guards and CCTV cameras',   image: imgFac1 },
  { label: 'Digital Classrooms', sub: 'Interactive smart boards',   image: imgFac2 },
  { label: 'Swimming Pool',      sub: 'Trained instructors',        image: imgFac3 },
  { label: 'Outdoor Playground', sub: 'Onsite and offsite',         image: imgFac4 },
  { label: 'School Transport',   sub: 'Key route coverage',         image: imgFac5 },
  { label: 'Boarding House',     sub: 'Nursery and Primary',        image: imgFac6 },
  { label: 'Nutritious Meals',   sub: 'Freshly prepared daily',     image: imgFac7 },
  { label: 'Clean Environment',  sub: 'Safe and well maintained',   image: imgFac8 },
]

const languages = ['English', 'Swahili', 'French', 'Chinese']

export default function About() {
  const { campus, campusInfo } = useCampus()
  if (campus === 'bunono') return <AboutBunono />
  const isBunono = campus === 'bunono'
  const p = campusInfo.profile

  const quickFacts = isBunono
    ? [
        { value: '2026',         label: 'Opened February'    },
        { value: '100 Learners', label: 'And growing'        },
        { value: 'Baby to P.4',  label: 'Growing to P.7'     },
        { value: 'Day & Board',  label: 'Boys and Girls'     },
      ]
    : [
        { value: '2025',         label: 'Year Founded'       },
        { value: '2 Campuses',   label: 'Katabi, Wakiso'     },
        { value: '4 Languages',  label: 'of Instruction'     },
        { value: 'Baby to P.3',  label: 'Growing Each Year'  },
      ]

  return (
    <main className="bg-white">

      {/* 1 — Hero (campus-specific design) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <PageHeader
        crumb="About"
        title="About"
        accentWord="MOSAI Schools"
        subtitle="A private day and boarding nursery and primary school dedicated to unlocking the greatness in every child, in Katabi, Wakiso District, Uganda."
        image={imgHeader}
        nextBg="#153764"
      />

      {/* 2 — Quick facts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="bg-mosai-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {quickFacts.map((item, i) => (
              <div
                key={item.value}
                className={`py-8 px-6 text-center ${i < 3 ? 'border-r border-white/10' : ''} ${i >= 2 ? 'border-t border-white/10 sm:border-t-0' : ''}`}
              >
                <p className="font-heading font-extrabold text-2xl text-white">{item.value}</p>
                <p className="font-body text-xs text-blue-300 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2b — Campus profile (campus-aware) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div key={campus} className="fade-in-up">
            <div className="text-center mb-12">
              <span className={`inline-flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isBunono ? 'bg-mosai-red-light text-mosai-red' : 'bg-mosai-blue-light text-mosai-blue'
              }`}>
                <MapPin className="w-3.5 h-3.5" /> {p.status}
              </span>
              <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-4">
                {campusInfo.name} Campus
              </h2>
              <p className="font-body text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                {isBunono
                  ? 'A private nursery and primary day and boarding school in Bunono Village, Katabi, providing quality, affordable and holistic education in a safe, caring and learner friendly environment.'
                  : 'Our flagship campus on Garuga Road, the birthplace of MOSAI Schools and home to our boarding facilities, swimming pool and modern digital classrooms.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: CalendarDays, label: 'Opened',            value: p.opened },
                { icon: School,       label: 'Classes Offered',   value: p.classes },
                { icon: MapPin,       label: 'Location',          value: p.address, sub: p.area },
                { icon: UserCog,      label: 'Director',          value: p.director },
                p.headteacher && { icon: Users, label: 'Headteacher', value: p.headteacher },
                p.enrolment   && { icon: GraduationCap, label: 'Current Enrolment', value: p.enrolment },
              ].filter(Boolean).map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${isBunono ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                      <Icon className={`w-5 h-5 ${isBunono ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                    </div>
                    <p className="font-body text-[11px] font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                    <p className="font-heading font-bold text-mosai-blue-dark mt-1 leading-snug">{item.value}</p>
                    {item.sub && <p className="font-body text-sm text-gray-400 mt-0.5">{item.sub}</p>}
                  </div>
                )
              })}
            </div>

            <div className={`mt-5 rounded-2xl p-6 text-center ${isBunono ? 'bg-mosai-red-light/50' : 'bg-mosai-blue-light/50'}`}>
              <p className="font-body text-sm text-gray-600">
                <span className="font-bold text-mosai-blue-dark">Growing with your child.</span> {p.growth}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2c — Headteacher's welcome (campus-aware, shown when present) â”€â”€ */}
      {p.welcome && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div key={campus} className="fade-in-up grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Identity card */}
              <div className="lg:col-span-4">
                <div className={`rounded-3xl p-8 text-center ${isBunono ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                  <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 ${isBunono ? 'bg-mosai-red' : 'bg-mosai-blue'}`}>
                    <span className="font-heading font-extrabold text-3xl text-white">
                      {p.headteacher.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <p className="font-heading font-extrabold text-lg text-mosai-blue-dark">{p.headteacher}</p>
                  <p className={`font-body text-sm font-semibold ${isBunono ? 'text-mosai-red' : 'text-mosai-blue'}`}>Headteacher</p>
                  <p className="font-body text-xs text-gray-500 mt-1">{campusInfo.name} Campus</p>
                </div>
              </div>

              {/* Welcome + staff */}
              <div className="lg:col-span-8">
                <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">A Warm Welcome</span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-mosai-blue-dark mt-2 mb-6">
                  From Our Headteacher
                </h2>
                <span className="block font-heading font-black text-[7rem] leading-[0.5] text-mosai-red/10 select-none" aria-hidden>&ldquo;</span>
                <p className="font-body text-gray-600 text-base leading-relaxed -mt-6">{p.welcome}</p>

                {p.staff && (
                  <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${isBunono ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                      <Users className={`w-5 h-5 ${isBunono ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-1">Our Staff</p>
                      <p className="font-body text-sm text-gray-500 leading-relaxed">{p.staff}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3 — Our Story â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo collage */}
            <div className="grid grid-cols-2 gap-3 h-[480px]">
              <div className="rounded-3xl overflow-hidden row-span-2 bg-zinc-200 shadow-lg">
                <img src={imgStory1} alt="Learners at MOSAI Schools" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-3xl overflow-hidden bg-zinc-200 shadow-lg">
                <img src={imgStory2} alt="Morning assembly at MOSAI Schools" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-3xl overflow-hidden relative bg-zinc-200 shadow-lg">
                <img src={imgStory3} alt="MOSAI Schools campus life" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-mosai-blue-dark/65 flex flex-col items-center justify-center text-white text-center p-4">
                  <p className="font-heading font-extrabold text-4xl">2025</p>
                  <p className="font-body text-xs text-blue-200 mt-1">Founded, Nalugala Campus</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Our Story</span>
              <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3 mb-8 leading-tight">
                Where It All Began
              </h2>
              <div className="space-y-5 font-body text-gray-600 text-sm leading-relaxed">
                <p>
                  MOSAI Schools was founded in <strong className="text-mosai-blue-dark">January 2025</strong> with the opening of our Nalugala Campus along Garuga Road in Katabi, Wakiso District. Licensed by the <strong className="text-mosai-blue-dark">Ministry of Education and Sports, Uganda</strong>, we set out with a clear mission: to create a model centre of excellence where every child discovers and develops their unique potential.
                </p>
                <p>
                  We started with Baby Class through to Primary 3 and we grow intentionally, adding one class each year until we reach P.7. In <strong className="text-mosai-blue-dark">2026</strong> we opened our second campus at Bunono, also in Katabi, bringing our vision of joyful, rigorous education to even more families along the Entebbe corridor.
                </p>
                <p>
                  We have combined the best of Uganda's national curriculum with Cambridge, IB, and British/IPC frameworks, taught in <strong className="text-mosai-blue-dark">four languages</strong>: English, Swahili, French and Chinese, ensuring our learners are prepared not just for Uganda, but for the world.
                </p>
                <p>
                  We are a <strong className="text-mosai-blue-dark">private day and boarding school</strong>, and we are proud to offer a home away from home for every learner who stays with us.
                </p>
              </div>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 mt-8 bg-mosai-blue-dark hover:bg-mosai-blue text-white font-heading font-bold text-sm px-7 py-3.5 rounded-full transition-colors shadow-md"
              >
                Enrol Your Child <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Director's Message â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">A Word From Leadership</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3">Director's Message</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Photo */}
            <div className="lg:col-span-4">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] bg-zinc-200">
                  <img
                    src={imgDirector}
                    alt="Director, MOSAI Schools"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute -bottom-5 left-6 right-6 bg-mosai-blue-dark text-white rounded-2xl px-6 py-4 shadow-xl">
                  <p className="font-heading font-bold text-base">Director</p>
                  <p className="font-body text-xs text-blue-300 mt-0.5">MOSAI Schools, Uganda</p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="lg:col-span-8 lg:pt-2">
              <span className="block font-heading font-black text-[9rem] leading-none text-mosai-red/10 select-none -mb-6" aria-hidden>
                &ldquo;
              </span>
              <div className="space-y-5 font-body text-gray-600 text-sm leading-relaxed">
                <p>
                  It is my honour to welcome you to our school, a learning community committed to excellence, integrity, and holistic education. At MOSAI Schools, we believe that every child is unique and capable of achieving greatness when nurtured with care, vision, and purpose.
                </p>
                <p>
                  The message is <strong className="text-mosai-blue-dark">Self agency</strong>. The core belief that the capacity for growth, transformation, and self improvement is largely internal. We believe and teach our learners that real change starts by looking inward. The main mandate of our school is identifying the unique potential of each child and creating a belief of self confidence and self belief.
                </p>
                <p>
                  All our programs are thoughtfully designed to build scholarly strength, emotional resilience, creativity, and a strong sense of social responsibility. We strive to create an environment where learning is joyful, curiosity is encouraged, and values are deeply rooted.
                </p>
              </div>
              <blockquote className="mt-7 pl-5 border-l-4 border-mosai-red">
                <p className="font-heading font-bold text-mosai-blue-dark text-base leading-relaxed">
                  We believe in nurturing critical thinkers, visionary leaders who are catalysts of change in our communities and globally.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Vision and Mission â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">What Drives Us</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3">Vision and Mission</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-mosai-blue-dark rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/5 rounded-full" />
              <div className="relative z-10">
                <p className="font-body text-xs text-blue-300 uppercase tracking-widest font-semibold mb-5">Our Vision</p>
                <p className="font-heading font-bold text-2xl leading-relaxed">
                  {MOSAI_ETHOS.vision}
                </p>
              </div>
            </div>
            <div className="bg-mosai-red rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/5 rounded-full" />
              <div className="relative z-10">
                <p className="font-body text-xs text-red-200 uppercase tracking-widest font-semibold mb-5">Our Mission</p>
                <p className="font-heading font-bold text-2xl leading-relaxed">
                  {MOSAI_ETHOS.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Core Values â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">What We Stand For</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3">Our Core Values</h2>
            <p className="font-body text-gray-500 mt-3 max-w-md mx-auto text-sm">
              Four pillars that shape every learner, every teacher, and every decision at MOSAI Schools.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => {
              const Icon = v.icon
              const isRed = v.color === 'red'
              return (
                <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                  <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-6 ${isRed ? 'bg-red-50' : 'bg-blue-50'}`}>
                    <Icon className={`w-7 h-7 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-mosai-blue-dark mb-3">{v.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7 — Our Campuses â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Where We Are</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3">Our Two Campuses</h2>
            <p className="font-body text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              Both campuses sit along the Kampala to Entebbe corridor and are licensed by the Ministry of Education and Sports, Uganda.
            </p>
          </div>

          <div className="space-y-8">
            {campuses.map((c, i) => {
              const isBlue = c.color === 'blue'
              const imgRight = i % 2 !== 0
              return (
                <div key={c.name} className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-md">
                  <div className={`relative h-72 lg:h-auto bg-zinc-200 ${imgRight ? 'lg:order-2' : ''}`}>
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-mosai-blue-dark/25" />
                  </div>
                  <div className={`bg-white p-10 lg:p-12 flex flex-col justify-center ${imgRight ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`font-body text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isBlue ? 'bg-mosai-blue-light text-mosai-blue' : 'bg-mosai-red-light text-mosai-red'}`}>
                        {c.status}
                      </span>
                      <span className="font-body text-xs text-gray-400">{c.since}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mb-4">{c.name}</h3>
                    <p className="font-body text-sm text-gray-500 leading-relaxed mb-6">{c.description}</p>
                    <div className="flex items-start gap-2 text-gray-500 mb-5">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-mosai-red" />
                      <div>
                        <p className="font-body text-sm">{c.location}</p>
                        <p className="font-body text-sm text-gray-400">{c.district}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map(tag => (
                        <span key={tag} className="font-body text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 8 — Curriculum â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-mosai-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red-light uppercase tracking-widest">How We Teach</span>
            <h2 className="font-heading font-extrabold text-4xl mt-3">Our Blended Curriculum</h2>
            <p className="font-body text-blue-200 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              A learner centred, inquiry based approach that combines the best of Uganda and the world, preparing every child for global citizenship while staying rooted in local values.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {curricula.map((c, i) => {
              const Icon = c.icon
              const isBlue = c.color === 'blue'
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${isBlue ? 'bg-mosai-blue' : 'bg-mosai-red'}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white mb-2">{c.name}</h3>
                  <p className="font-body text-sm text-blue-200 leading-relaxed">{c.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-blue-300 mr-2">
              <Globe className="w-4 h-4" />
              <span className="font-body text-sm font-semibold">Languages of Instruction</span>
            </div>
            {languages.map(lang => (
              <span key={lang} className="font-heading font-bold text-sm px-4 py-1.5 bg-mosai-red rounded-full text-white">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Facilities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">What We Provide</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-3">Our Facilities</h2>
            <p className="font-body text-gray-500 mt-3 max-w-md mx-auto text-sm">
              Every space at MOSAI Schools is designed to keep children safe, inspired, and thriving.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {facilities.map((fac, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-square bg-zinc-200 shadow-sm">
                <img
                  src={fac.image}
                  alt={fac.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mosai-blue-dark/85 via-mosai-blue-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-heading font-bold text-white text-sm leading-tight">{fac.label}</p>
                  <p className="font-body text-xs text-blue-200 mt-0.5">{fac.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative h-80 overflow-hidden">
        <img
          src={imgCta}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-mosai-blue-dark/78" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-xl">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
              Become Part of the MOSAI Family
            </h2>
            <p className="font-body text-white/70 text-sm mb-6">
              Applications for 2026 are open now. Spaces at both campuses are limited. Secure your child's place today.
            </p>
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-8 py-3.5 rounded-full transition-colors shadow-lg"
            >
              Apply for Admission <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
