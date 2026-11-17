import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCampus } from '../context/CampusContext'
import PageHeader from '../components/PageHeader'
import ProgramsBunono from './ProgramsBunono'
import PrimaryJourney from '../components/PrimaryJourney'
import { feeRange, FEES } from '../lib/fees'
import { NAL } from '../assets/nalugala-campus'
import {
  Baby, BookOpen, GraduationCap, CheckCircle, ArrowRight,
  Clock, CreditCard, Globe, FlaskConical, Monitor, Waves,
  Dumbbell, Music, Palette, Utensils, Users, Sprout,
  Rabbit, Target, Volleyball, Cone, CircleDot, Trophy,
  BookOpenCheck, Cpu, Mic, Star, Award, Plane,
} from 'lucide-react'

import imgHeader  from '../assets/IMG_8647.webp'
import imgBaby    from '../assets/IMG_8738.webp'   // little ones dancing
import imgMid     from '../assets/IMG_8754.webp'   // nursery cultural dance
import imgTop     from '../assets/TON_8855.webp'   // Top Class graduation (sashes read Top Class)
import imgToddler from '../assets/TON_8742.webp'   // youngest learners dressed up on stage

// â”€â”€ Nursery programs data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const nurseryPrograms = [
  {
    icon: Sprout,
    id: 'toddler-class',
    name: 'Toddler Class (Day Care)',
    age: 'Ages 1 to 2',
    image: imgToddler,
    imageAlt: 'Young MOSAI nursery learners dressed up on stage at a school celebration',
    accent: 'blue',
    time: '7:30 AM to 5:00 PM',
    tagline: 'Safe, loving day care for our very youngest',
    description:
      'Toddler Class is day care with a purpose. In a bright, safe room with attentive carers, our youngest children follow a calm daily rhythm of play, songs, stories, meals and naps. Parents can drop off early and collect late, and every day ends with a short note on how their child ate, slept and played.',
    activities: [
      'Free play with blocks, soft toys and push along toys',
      'Nursery rhymes, action songs and simple dances',
      'Picture books and short stories',
      'Water, sand and sensory play',
      'Outdoor play on the playground',
      'Toilet training and simple self care routines',
    ],
    subjects: ['Play & Discovery', 'Songs & Rhymes', 'First Words', 'Sensory Play', 'Self Care', 'Rest & Meals'],
    outcomes: [
      'Settles happily away from home',
      'Begins to use first words and simple sentences',
      'Builds early motor skills: walking, climbing, holding',
      'Learns to share, take turns and follow a routine',
    ],
    dayFee: FEES.toddler.day,
    boardFee: FEES.toddler.boarding,
  },
  {
    icon: Baby,
    name: 'Baby Class',
    age: 'Ages 2 to 3',
    image: imgBaby,
    imageAlt: 'Young MOSAI nursery learners dancing together at a school celebration',
    accent: 'red',
    time: '7:30 AM to 2:00 PM',
    tagline: 'A warm, gentle introduction to school life',
    description:
      'Baby Class is where school proper begins. In a calm, homely setting, our young learners explore through sensory play, music, storytelling and creative art. Every activity is designed to build confidence, language and motor skills at each child\'s own pace.',
    activities: [
      'Animal walks such as bear crawls, frog hops and crab walks',
      'Target games, tossing bean bags into buckets',
      'Balloon volleyball and soft touch ball games',
      'Music and dance for rhythm, singing and movement',
      'Sensory exploration and creative art',
      'Story time and early language activities',
    ],
    subjects: ['Phonics & Language', 'Number Play', 'Creative Art', 'Music & Movement', 'Sensory Exploration', 'Story Time'],
    outcomes: [
      'Develops basic communication and listening skills',
      'Builds fine and gross motor coordination',
      'Introduces numbers, shapes and colours through play',
      'Fosters independence and social interaction',
    ],
    dayFee: FEES.nursery.day,
    boardFee: FEES.nursery.boarding,
  },
  {
    icon: BookOpen,
    name: 'Middle Class',
    age: 'Ages 3 to 4',
    image: imgMid,
    imageAlt: 'MOSAI nursery learners in traditional dress performing a cultural dance',
    accent: 'blue',
    time: '7:30 AM to 2:30 PM',
    tagline: 'Building curiosity, confidence and early skills',
    description:
      'Middle Class builds on Baby Class with more structured learning. Learners begin formal phonics, early writing and early numeracy while continuing to grow through play, discovery and creative expression. Social skills and emotional intelligence are central to everything we do.',
    activities: [
      'Obstacle courses with cones, tunnels, mats and hula hoops',
      'Ball skills, mini soccer, throwing and catching',
      'Reading readiness and phonics games',
      'Art and craft: painting, drawing and collage',
      'Number work and counting activities',
      'Group games and cooperative play',
    ],
    subjects: ['Phonics & Reading Readiness', 'Early Writing Skills', 'Early Mathematics', 'Science Discovery', 'Art & Craft', 'Physical Education'],
    outcomes: [
      'Begins formal phonics and early reading skills',
      'Develops early writing and pencil control',
      'Strengthens counting and early number sense',
      'Grows in emotional regulation and empathy',
    ],
    dayFee: FEES.nursery.day,
    boardFee: FEES.nursery.boarding,
  },
  {
    icon: Star,
    name: 'Top Class',
    age: 'Ages 5 to 6',
    image: imgTop,
    imageAlt: 'MOSAI Top Class graduates in caps and gowns celebrating on graduation day',
    accent: 'red',
    time: '7:30 AM to 3:00 PM',
    tagline: 'Fully prepared and ready for Primary 1',
    description:
      'Top Class is our most advanced nursery programme, intentionally designed to prepare learners for the transition to Primary 1. Learners develop strong reading and writing skills, mathematical reasoning and the study habits that will carry them through school.',
    activities: [
      'Relay races, egg and spoon races and sack races',
      'Basic reading and writing exercises',
      'Number work with simple addition and subtraction',
      'Science exploration and observation tasks',
      'Computer basics and keyboard familiarity',
      'Debates, show and tell and public speaking',
    ],
    subjects: ['English Reading & Writing', 'Mathematics', 'Environmental Studies', 'Computer Basics', 'Physical Education', 'Performing Arts'],
    outcomes: [
      'Reads and writes simple sentences independently',
      'Performs basic addition and subtraction',
      'Demonstrates strong listening and comprehension',
      'Transitions confidently to Primary 1',
    ],
    dayFee: FEES.nursery.day,
    boardFee: FEES.nursery.boarding,
  },
]

// â”€â”€ Activities & Sports data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const activityCategories = [
  {
    label: 'Sports',
    icon: Dumbbell,
    accent: 'blue',
    items: ['Swimming', 'Soccer', 'Netball', 'Athletics', 'Skating', 'Aerobics', 'Basketball', 'Gymnastics'],
  },
  {
    label: 'Academics',
    icon: BookOpenCheck,
    accent: 'red',
    items: ['Science Experiments', 'Computer Classes', 'Debates', 'Quizzes', 'Spelling Bees', 'Reading Challenges'],
  },
  {
    label: 'Creative Arts',
    icon: Palette,
    accent: 'blue',
    items: ['Painting', 'Drawing', 'Music Lessons', 'Dance', 'Craft Projects'],
  },
  {
    label: 'Practical Skills',
    icon: Utensils,
    accent: 'red',
    items: ['Baking', 'Cooking', 'Urban Farming'],
  },
  {
    label: 'Social & Leadership',
    icon: Users,
    accent: 'blue',
    items: ['Leadership Programs', 'School Assemblies', 'Scouting', 'Field Trips'],
  },
]

// â”€â”€ Nursery games data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const nurseryGames = [
  {
    icon: Rabbit,
    title: 'Animal Walks',
    desc: 'Bear crawls, frog hops and crab walks develop gross motor strength, coordination and body awareness in a fun, imaginative way.',
    accent: 'red',
  },
  {
    icon: Target,
    title: 'Target Games',
    desc: 'Tossing bean bags into buckets and hoops sharpens hand and eye coordination and introduces spatial reasoning through active play.',
    accent: 'blue',
  },
  {
    icon: Volleyball,
    title: 'Balloon Volleyball',
    desc: 'Lightweight balloon games build reaction time, teamwork and early striking skills in a relaxed and enjoyable environment.',
    accent: 'red',
  },
  {
    icon: Cone,
    title: 'Obstacle Courses',
    desc: 'Courses using cones, tunnels, mats and hula hoops challenge learners to think, move and persevere through physical challenges.',
    accent: 'blue',
  },
  {
    icon: CircleDot,
    title: 'Ball Skills',
    desc: 'Mini soccer, throwing and catching games lay the foundation for sports participation and develop fine and gross motor skills.',
    accent: 'red',
  },
  {
    icon: Trophy,
    title: 'Relay Races',
    desc: 'Egg and spoon and sack races develop balance, speed and the joy of friendly competition as part of a cheering team.',
    accent: 'blue',
  },
]

const languages = ['English', 'Swahili', 'French', 'Chinese']

const curricula = [
  { icon: BookOpen,    name: 'NCDC Uganda',           desc: 'National curriculum grounding in Ugandan identity and academic essentials.' },
  { icon: FlaskConical,  name: 'IB Concepts',            desc: 'Inquiry based learning that promotes curiosity and critical thinking.' },
  { icon: Globe,         name: 'British / IPC',           desc: 'Thematic cross curricular learning enriched with local values.' },
]

// â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function Programs() {
  const { campus } = useCampus()
  if (campus === 'bunono') return <ProgramsBunono />
  return <ProgramsNalugala />
}

function ProgramsNalugala() {
  const [activeTab, setActiveTab] = useState(0)
  const { campus, campusInfo } = useCampus()
  const p = campusInfo.profile

  return (
    <main className="bg-mist">

      {/* â”€â”€ 1. Page Header (campus-specific design) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <PageHeader
        crumb="Programs"
        title="Our"
        accentWord="Programs"
        subtitle={`Age appropriate learning at our ${campusInfo.name} Campus, from ${p.classes}, nurturing every learner's unique potential at every stage.`}
        image={imgHeader}
        nextBg="#153764"
      />

      {/* â”€â”€ Sticky nav â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav className="bg-mosai-blue-dark sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {['Toddler Class', 'Baby Class', 'Middle Class', 'Top Class', 'Primary', 'Activities', 'Games'].map((label, i) => (
              <a
                key={i}
                href={`#${label.toLowerCase().replace(' ', '-')}`}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-heading font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* â”€â”€ 2. Curriculum Overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-16 bg-mosai-blue-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">How We Teach</span>
            <h2 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mt-2">Our Blended Curriculum</h2>
            <p className="font-body text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              We build on Uganda's national curriculum and enrich it with inquiry based and thematic approaches, so learning is curious and connected while staying rooted in Ugandan values and culture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            {curricula.map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${i % 2 === 0 ? 'bg-mosai-blue-light' : 'bg-mosai-red-light'}`}>
                    <Icon className={`w-5 h-5 ${i % 2 === 0 ? 'text-mosai-blue' : 'text-mosai-red'}`} />
                  </div>
                  <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-1">{c.name}</p>
                  <p className="font-body text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Languages */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-mosai-blue-dark">
              <Globe className="w-4 h-4 text-mosai-blue" />
              <span className="font-body text-sm font-semibold">Languages of Instruction:</span>
            </div>
            {languages.map((lang) => (
              <span key={lang} className="font-heading font-bold text-sm px-4 py-1.5 bg-mosai-blue text-white rounded-full">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ 3. Nursery Programs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="py-4 bg-mist text-center">
        <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Nursery Section</span>
        <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-1">Toddler Class to Top Class</h2>
      </div>

      {nurseryPrograms.map((prog, i) => {
        const Icon = prog.icon
        const isRed = prog.accent === 'red'
        const isEven = i % 2 === 0

        return (
          <section
            key={i}
            id={prog.id || prog.name.toLowerCase().replace(' ', '-')}
            className={`py-20 ${isEven ? 'bg-mist' : 'bg-mist-deep'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-start ${!isEven ? 'lg:[direction:rtl]' : ''}`}>

                {/* Image */}
                <div className={isEven ? '' : 'lg:[direction:ltr]'}>
                  <div className="relative rounded-3xl overflow-hidden shadow-xl group">
                    <img
                      src={prog.image}
                      alt={prog.imageAlt}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-2 ${isRed ? 'bg-mosai-red' : 'bg-mosai-blue'}`}>
                        <Icon className="w-3.5 h-3.5" /> {prog.age}
                      </span>
                      <p className="font-heading font-extrabold text-2xl">{prog.name}</p>
                      <div className="flex items-center gap-1.5 mt-1 text-white/70">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-body text-xs">{prog.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fee card */}
                  <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Day Scholar</p>
                      <p className="font-heading font-extrabold text-lg text-mosai-blue-dark">UGX {feeRange(prog.dayFee)}</p>
                      <p className="font-body text-xs text-gray-400">per term</p>
                    </div>
                    <div className="text-center border-l border-gray-100">
                      <p className="font-body text-xs text-gray-400 uppercase tracking-wide mb-1">Boarding</p>
                      {prog.boardFee ? (
                        <>
                          <p className="font-heading font-extrabold text-lg text-mosai-red">UGX {feeRange(prog.boardFee)}</p>
                          <p className="font-body text-xs text-gray-400">per term</p>
                        </>
                      ) : (
                        <>
                          <p className="font-heading font-extrabold text-lg text-mosai-red">Not offered</p>
                          <p className="font-body text-xs text-gray-400">boarding is for Primary only</p>
                        </>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-2 justify-center pt-1 border-t border-gray-100">
                      <CreditCard className="w-3.5 h-3.5 text-mosai-blue" />
                      <p className="font-body text-xs text-gray-500">Paid via School Pay System only. No cash accepted</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={isEven ? '' : 'lg:[direction:ltr]'}>
                  <span className={`font-body text-xs font-bold uppercase tracking-widest ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`}>
                    {prog.name} &bull; {prog.age}
                  </span>
                  <h2 className="font-heading font-extrabold text-3xl text-mosai-blue-dark mt-1 mb-3">{prog.tagline}</h2>
                  <p className="font-body text-sm text-gray-500 leading-relaxed mb-6">{prog.description}</p>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {prog.subjects.map((s) => (
                      <span key={s} className={`font-body text-xs font-semibold px-3 py-1.5 rounded-full ${
                        isRed ? 'bg-mosai-red-light text-mosai-red' : 'bg-mosai-blue-light text-mosai-blue'
                      }`}>{s}</span>
                    ))}
                  </div>

                  {/* Activities */}
                  <div className="mb-6">
                    <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-3">Key Activities</p>
                    <div className="space-y-2">
                      {prog.activities.map((a) => (
                        <div key={a} className="flex items-start gap-2.5">
                          <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                          <span className="font-body text-sm text-gray-600">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className={`rounded-2xl p-5 mb-6 ${isRed ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                    <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-3">Learning Outcomes</p>
                    <div className="space-y-2">
                      {prog.outcomes.map((o) => (
                        <div key={o} className="flex items-start gap-2">
                          <span className={`text-xs mt-0.5 shrink-0 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`}>✦</span>
                          <span className="font-body text-sm text-gray-600">{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/admissions"
                    className={`inline-flex items-center gap-2 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-full transition-colors duration-200 shadow-md ${
                      isRed ? 'bg-mosai-red hover:bg-mosai-red-dark' : 'bg-mosai-blue hover:bg-mosai-blue-dark'
                    }`}
                  >
                    Apply for {prog.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* â”€â”€ 4. Primary Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="primary" className="py-20 bg-mosai-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* Content */}
            <div>
              <span className="font-body text-xs font-bold text-mosai-red-light uppercase tracking-widest">Primary Section · {campusInfo.name} Campus</span>
              <h2 key={campus} className="fade-in-up font-heading font-extrabold text-4xl mt-1 mb-3">
                {p.primaryRange}: <span className="text-mosai-red-light">Growing Every Year</span>
              </h2>
              <p className="font-body text-blue-100 text-sm leading-relaxed mb-6">
                Our primary section provides a rigorous yet joyful education built on Uganda's NCDC curriculum and enriched with inquiry based, thematic learning. At our {campusInfo.name} Campus we currently offer {p.primaryRange}, adding one class each year until we reach P.7, ensuring learners benefit from continuity of care and curriculum as they grow.
              </p>

              {/* Academic activities */}
              <div className="mb-6">
                <p className="font-heading font-bold text-sm text-white mb-3">Academic Activities</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Science experiments', 'Computer classes', 'Debates and public speaking', 'Quizzes and competitions', 'Spelling bees', 'Reading challenges'].map((a) => (
                    <div key={a} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-mosai-red-light" />
                      <span className="font-body text-sm text-blue-100">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sports */}
              <div className="mb-6">
                <p className="font-heading font-bold text-sm text-white mb-3">Sports Programme</p>
                <div className="flex flex-wrap gap-2">
                  {['Swimming', 'Soccer', 'Netball', 'Athletics', 'Basketball'].map((sport) => (
                    <span key={sport} className="font-body text-xs font-semibold px-3 py-1.5 bg-white/10 text-white rounded-full border border-white/20">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 mb-7">
                <p className="font-heading font-bold text-sm text-white mb-3">What Learners Develop</p>
                <div className="space-y-2">
                  {[
                    'Strong literacy and numeracy foundations',
                    'Scientific inquiry and critical thinking skills',
                    'Digital literacy and computer confidence',
                    'Leadership, communication and teamwork',
                    'Multilingual ability across four languages',
                  ].map((o) => (
                    <div key={o} className="flex items-start gap-2">
                      <span className="text-mosai-red-light text-xs mt-0.5 shrink-0">✦</span>
                      <span className="font-body text-sm text-blue-100">{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth note */}
              <div className="flex items-center gap-3 mb-7 bg-mosai-red/20 border border-mosai-red/30 rounded-xl px-5 py-3">
                <Sprout className="w-5 h-5 text-mosai-red-light shrink-0" />
                <p className="font-body text-sm text-blue-100">
                  <span className="font-semibold text-white">Currently: {p.primaryRange}.</span> One new class added each year, growing alongside our learners all the way to P.7.
                </p>
              </div>

              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-7 py-3.5 rounded-full transition-colors duration-200 shadow-lg"
              >
                Apply for Primary <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Image + fee card */}
            <div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl group mb-4">
                <img
                  src={NAL.classVeranda.img}
                  alt={NAL.classVeranda.alt}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-2 bg-mosai-blue">
                    <GraduationCap className="w-3.5 h-3.5" /> {p.primaryRange}
                  </span>
                  <p className="font-heading font-extrabold text-2xl">Primary Section</p>
                  <p className="font-body text-xs text-white/70 mt-1">More classes added each year to P.7</p>
                </div>
              </div>

              {/* Fee card — white on dark bg */}
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="font-body text-xs text-blue-300 uppercase tracking-wide mb-1">Day Scholar</p>
                  <p className="font-heading font-extrabold text-lg text-white">UGX {feeRange(FEES.primary.day)}</p>
                  <p className="font-body text-xs text-blue-300">per term</p>
                </div>
                <div className="text-center border-l border-white/15">
                  <p className="font-body text-xs text-blue-300 uppercase tracking-wide mb-1">Boarding</p>
                  <p className="font-heading font-extrabold text-lg text-mosai-red-light">UGX {feeRange(FEES.primary.boarding)}</p>
                  <p className="font-body text-xs text-blue-300">per term</p>
                </div>
                <div className="col-span-2 flex items-center gap-2 justify-center pt-1 border-t border-white/10">
                  <CreditCard className="w-3.5 h-3.5 text-blue-300" />
                  <p className="font-body text-xs text-blue-300">School Pay System only. No cash accepted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Class by class — P.1 to P.7 */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
              <div>
                <span className="font-body text-xs font-bold text-mosai-red-light uppercase tracking-widest">The Primary Journey</span>
                <h3 className="font-heading font-extrabold text-3xl mt-1">Class by Class</h3>
              </div>
              <p className="font-body text-sm text-blue-200 max-w-md sm:text-right">
                Lower primary builds strong foundations; Primary Four is the bridge into learning by subject.
              </p>
            </div>
            <PrimaryJourney top={p.primaryTop} variant="dark" />
          </div>
        </div>
      </section>

      {/* â”€â”€ 5. Activities & Sports â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="activities" className="py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Beyond the Classroom</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Activities &amp; Sports</h2>
            <p className="font-body text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every learner participates in a rich programme of sports, academics, arts, practical skills and social activities that develop the whole child.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {activityCategories.map((cat, i) => {
              const Icon = cat.icon
              const isActive = activeTab === i
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-heading font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-mosai-blue-dark text-white shadow-md'
                      : 'bg-gray-100 text-gray-500 hover:bg-mosai-blue-light hover:text-mosai-blue'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Active category */}
          {activityCategories.map((cat, i) => {
            const isRed = cat.accent === 'red'
            if (activeTab !== i) return null
            return (
              <div key={i} className="flex flex-wrap gap-3 justify-center">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className={`font-body text-sm font-semibold px-5 py-2.5 rounded-full border ${
                      isRed
                        ? 'bg-mosai-red-light text-mosai-red border-mosai-red/20'
                        : 'bg-mosai-blue-light text-mosai-blue border-mosai-blue/20'
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )
          })}

          {/* All categories summary grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {activityCategories.map((cat, i) => {
              const Icon = cat.icon
              const isRed = cat.accent === 'red'
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-5 border cursor-pointer hover:shadow-md transition-shadow duration-200 ${
                    activeTab === i
                      ? isRed ? 'border-mosai-red bg-mosai-red-light' : 'border-mosai-blue bg-mosai-blue-light'
                      : 'border-gray-100 bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(i)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isRed ? 'bg-mosai-red' : 'bg-mosai-blue'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-heading font-bold text-sm text-mosai-blue-dark mb-2">{cat.label}</p>
                  <p className="font-body text-xs text-gray-500">{cat.items.length} activities</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€ 6. Nursery Games â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section id="games" className="py-20 bg-mist-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Play Based Learning</span>
            <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2">Nursery Games</h2>
            <p className="font-body text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Our nursery games are rooted in movement science, and each activity builds motor skills, coordination and social confidence through structured, joyful play.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nurseryGames.map((game, i) => {
              const Icon = game.icon
              const isRed = game.accent === 'red'
              return (
                <div
                  key={i}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Illustration. There are no photos of these games yet, and the
                      school asked that no unrelated photo stand in for an activity.
                      Swap in a real photo (an `image` field) once one is taken. */}
                  <div className={`h-44 relative flex items-center justify-center overflow-hidden ${isRed ? 'bg-mosai-red-light' : 'bg-mosai-blue-light'}`}>
                    {game.image ? (
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        <Icon aria-hidden="true" className={`absolute -right-6 -bottom-6 w-40 h-40 opacity-10 ${isRed ? 'text-mosai-red' : 'text-mosai-blue'}`} />
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 ${isRed ? 'bg-mosai-red' : 'bg-mosai-blue'}`}>
                          <Icon aria-hidden="true" className="w-10 h-10 text-white" />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading font-extrabold text-lg text-mosai-blue-dark mb-2">{game.title}</h3>
                    <p className="font-body text-sm text-gray-500 leading-relaxed">{game.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* â”€â”€ 7. CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-16 bg-mist text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="font-body text-xs font-bold text-mosai-red uppercase tracking-widest">Enroll Today</span>
          <h2 className="font-heading font-extrabold text-4xl text-mosai-blue-dark mt-2 mb-3">
            Find the Right Program for Your Child
          </h2>
          <p className="font-body text-gray-500 text-sm mb-7 leading-relaxed">
            Not sure which class is the right fit? Our admissions team at {campusInfo.name} Campus is happy to guide you. Applications are open now and spaces are limited.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 bg-mosai-red hover:bg-mosai-red-dark text-white font-heading font-bold text-sm px-8 py-3.5 rounded-full transition-colors duration-200 shadow-md"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-mosai-blue text-mosai-blue hover:bg-mosai-blue hover:text-white font-heading font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
