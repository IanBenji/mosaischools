// Campus registry + per-campus content + persisted visitor choice.
// This is the single source of truth for anything that differs between
// campuses. Wire a component to a campus by reading it from useCampus().

// ── Nalugala imagery ──────────────────────────────────────────────
import nalBg1     from '../assets/TON_8735.webp'   // on stage
import nalBg2     from '../assets/IMG_8818.webp'   // talent show
import nalBg3     from '../assets/IMG_8829.webp'   // a learner's speech
import nalGrad    from '../assets/TON_8807.webp'   // graduation
import nalPerform from '../assets/IMG_8592.webp'   // performance / march
import nalDrama   from '../assets/TON_8713.webp'   // drama on stage

// ── Bunono imagery (real Bunono campus photos only) ───────────────
import bunBg1     from '../assets/bunono/bunono-33.webp'   // pool splash
import bunBg2     from '../assets/bunono/bunono-09.webp'   // poolside group
import bunBg3     from '../assets/bunono/bunono-02.webp'   // assembly
import bunGrad     from '../assets/bunono/bunono-06.webp'   // assembly
import bunPerform  from '../assets/bunono/bunono-13.webp'   // pool play
import bunActivity from '../assets/bunono/bunono-47.webp'   // playground

// ── Hero slideshow photos ─────────────────────────────────────────
import { NAL } from '../assets/nalugala-campus'
import { BUN } from '../assets/bunono'

const STORAGE_KEY = 'mosai.campus'
const CHOICE_KEY  = 'mosai.campus.chosen'   // records that the visitor made an explicit choice

export const DEFAULT_CAMPUS = 'nalugala'

export const CAMPUSES = {
  nalugala: {
    name: 'Nalugala',
    tagline: 'Flagship Campus · Est. 2025',
    blurb: 'Our main campus on Garuga Road, with a swimming pool, boarding and modern classrooms.',
    location: 'Garuga Road, off Kampala to Entebbe Rd',
    district: 'Katabi, Wakiso District',
    accent: 'blue',
    overlayRgb: '21, 55, 100',          // mosai-blue-dark, for hero wash
    phone: '0745431412',                // official school line (shared by both campuses)
    altPhone: '0783926840',
    whatsapp: '+256 745 431 412',   // same line as phone, in international form for wa.me
    email: 'mosaischools@gmail.com',
    hero: {
      eyebrow: 'Flagship Campus · Garuga Road',
      headline: 'Where Every',
      accentWord: 'Child Shines.',
      tagline:
        'Our flagship home along scenic Garuga Road, with modern classrooms, a swimming pool and boarding facilities, nurturing critical thinkers from Toddler Class (Day Care) through to Primary Five.',
      backgrounds: [nalBg1, nalBg2, nalBg3],
      // Full-width homepage slideshow, in order. `pos` is the CSS object-position.
      slides: [
        { img: nalGrad,              cap: 'Graduation day',           pos: 'center 30%', alt: 'MOSAI nursery graduates in caps and gowns celebrating on graduation day' },
        { img: NAL.classMotto.img,   cap: 'Our classrooms',           pos: 'center 45%', alt: NAL.classMotto.alt },
        { img: nalPerform,           cap: 'Performance day',          pos: 'center 35%', alt: 'MOSAI learners in white tops and trainers performing a dance routine' },
        { img: NAL.gardenLesson.img, cap: 'Learning in the garden',   pos: 'center 55%', alt: NAL.gardenLesson.alt },
        { img: BUN.front.img,        cap: 'Our Bunono Campus',        pos: 'center 45%', alt: 'MOSAI Schools Bunono Campus: the front entrance' },
      ],
      collage: [
        { img: nalGrad,    title: 'Graduation Day', subtitle: 'Celebrating every milestone' },
        { img: nalPerform, title: 'Performance Day', subtitle: 'Confidence on stage' },
        { img: nalDrama,   title: 'Drama & Play',   subtitle: 'Storytelling brought to life' },
      ],
    },
    // Campus-specific profile — surfaced on the About page.
    profile: {
      status:      'Flagship Campus',
      director:    'IRUMBA Amos',
      headteacher: null,                 // shared leadership shown for the flagship
      opened:      'January 2025',
      openedShort: '2025',
      enrolment:   null,
      classes:     'Toddler Class (Day Care) to Primary Five (P.5)',
      classesShort:'Toddler to P.5',
      primaryRange:'P.1 to P.5',
      primaryTop:  5,                    // highest Primary class currently offered
      growth:      'Adding one class each year until Primary Seven (P.7)',
      address:     'Garuga Road, off the Kampala to Entebbe Road',
      area:        'Nalugala, Katabi Town Council, Wakiso District',
      welcome:     null,               // flagship uses the Director's message
      staff:       null,
    },
    mapQuery: 'Garuga Road, Katabi, Wakiso District, Uganda',
    // Visual personality — Nalugala reads calm "lake & sky".
    theme: {
      heroGradient: 'linear-gradient(158deg, #153764 0%, #2E6BB8 52%, #6EC6F2 100%)',
      heroWash: 'linear-gradient(158deg, rgba(21,55,100,0.90) 0%, rgba(46,107,184,0.74) 52%, rgba(110,198,242,0.60) 100%)',
      divider:  'wave',                    // smooth water curve
      doodles:  ['sun', 'cloud', 'wave', 'kite'],
      crayon:   '#FFC93C',                 // sunshine yellow underline
      soft:     'crayon-sky',              // secondary accent family
      softHex:  '#6EC6F2',
    },
  },
  bunono: {
    name: 'Bunono',
    tagline: 'New Campus · Opened 2026',
    blurb: 'Our newest campus in Bunono Village, the same MOSAI care, closer to home.',
    location: 'Bunono Village, Kabaale Ward, Katabi',
    district: 'Katabi Town Council, Wakiso District',
    accent: 'red',
    overlayRgb: '135, 20, 20',          // mosai-red-dark, for hero wash
    phone: '0745431412',
    altPhone: '0783926840',
    whatsapp: '+256 745 431 412',   // same line as phone, in international form for wa.me
    email: 'mosaischools@gmail.com',
    hero: {
      eyebrow: 'New Campus · Opened February 2026',
      headline: 'A New Home',
      accentWord: 'To Shine.',
      tagline:
        'Opened February 2026 in Bunono Village, Katabi, offering quality, affordable and holistic education in a safe, caring and learner friendly environment, from Toddler Class (Day Care) through Primary Five.',
      backgrounds: [bunBg1, bunBg2, bunBg3],
      slides: [
        { img: BUN.exercise.img, cap: 'Morning exercise',            pos: 'center 35%', alt: BUN.exercise.alt },
        { img: bunBg1,           cap: 'Splash time',                 pos: 'center 40%', alt: 'MOSAI Bunono learners splashing and laughing in the school swimming pool' },
        { img: BUN.houses.img,   cap: 'Proud in our house colours',  pos: 'center 50%', alt: BUN.houses.alt },
        { img: BUN.front.img,    cap: 'Our Bunono campus',           pos: 'center 45%', alt: BUN.front.alt },
        { img: bunBg3,           cap: 'Morning assembly',            pos: 'center 40%', alt: 'MOSAI Bunono learners in uniform at morning assembly' },
      ],
      collage: [
        { img: bunGrad,     title: 'Graduation Day',   subtitle: 'Celebrating every milestone' },
        { img: bunPerform,  title: 'Talent & Stage',   subtitle: 'Confidence on show' },
        { img: bunActivity, title: 'School Life',      subtitle: 'A safe, joyful environment' },
      ],
    },
    // Campus-specific profile — surfaced on the About page.
    profile: {
      status:      'New Campus · 2026',
      director:    'IRUMBA Amos',
      headteacher: 'UWINTIJE Jean Paul',
      opened:      '10 February 2026',
      openedShort: '2026',
      enrolment:   '100 learners',
      classes:     'Toddler Class (Day Care) to Primary Five (P.5)',
      classesShort:'Toddler to P.5',
      primaryRange:'P.1 to P.5',
      primaryTop:  5,
      growth:      'Introducing one additional class each year until Primary Seven (P.7)',
      address:     'Bunono Village, Kabaale Ward, Katabi Town Council',
      area:        'Katabi, Wakiso District',
      welcome:
        'Welcome to MOSAI Schools. We are committed to providing quality education in a safe, caring and supportive environment where every learner is nurtured to discover their potential and achieve excellence. Through teamwork, discipline and partnership with parents, we continue to build the MOSAI family and prepare our children for a bright and successful future. Welcome to MOSAI Schools!',
      staff:
        'Our school is run by a competent and qualified team that nurtures learners in both academic and moral affairs to bring up a holistic person. Led by an experienced headteacher, our teaching staff are fully qualified to Ministry of Education and Sports standards, from Grade III to graduate level, with many pursuing further upgrading courses at university. Our support staff are well trained in their areas of speciality and committed to the warm customer care that families know us for.',
    },
    mapQuery: 'Katabi Town Council, Wakiso District, Uganda',
    // Visual personality — Bunono reads fresh "garden & growing".
    theme: {
      heroGradient: 'linear-gradient(158deg, #7A1414 0%, #E14B4B 52%, #FF8A6B 100%)',
      heroWash: 'linear-gradient(158deg, rgba(122,20,20,0.90) 0%, rgba(225,75,75,0.72) 52%, rgba(255,138,107,0.58) 100%)',
      divider:  'scallop',                 // rounded hills / clouds
      doodles:  ['star', 'flower', 'leaf', 'balloon'],
      crayon:   '#5FBB6E',                 // grass-green underline
      soft:     'crayon-coral',            // secondary accent family
      softHex:  '#FF8A6B',
    },
  },
}

// Shared across every MOSAI campus — vision, mission and the four core values.
export const MOSAI_ETHOS = {
  vision:  'To become a model centre of excellence in Mathematics, Science, Technology and Innovation.',
  mission: 'To provide a conducive environment where learners can acquire knowledge, grow and develop to their full potential for self reliance.',
  values:  ['God fearing', 'Love', 'Humility', 'Excellence'],
}

// Tailwind-safe accent class sets (literal strings so they survive purge)
export const ACCENT = {
  blue: {
    text:     'text-mosai-blue',
    textSoft: 'text-red-300',
    bar:      'bg-mosai-blue',
    chipBg:   'bg-mosai-blue-light',
    chipText: 'text-mosai-blue',
  },
  red: {
    text:     'text-mosai-red',
    textSoft: 'text-red-300',
    bar:      'bg-mosai-red',
    chipBg:   'bg-mosai-red-light',
    chipText: 'text-mosai-red',
  },
}

export function saveCampus(slug) {
  try { localStorage.setItem(STORAGE_KEY, slug) } catch { /* private mode */ }
}

export function getSavedCampus() {
  try {
    const slug = localStorage.getItem(STORAGE_KEY)
    return CAMPUSES[slug] ? slug : null
  } catch {
    return null
  }
}

/* Whether the visitor has explicitly picked a campus (via the picker popup or
 * the navbar switcher). Distinct from getSavedCampus so a first time visitor
 * still defaults to the flagship *without* counting as having chosen — which is
 * what keeps the popup from ever reappearing once they do choose. */
export function markCampusChosen() {
  try { localStorage.setItem(CHOICE_KEY, '1') } catch { /* private mode */ }
}

export function hasChosenCampus() {
  try { return localStorage.getItem(CHOICE_KEY) === '1' } catch { return false }
}
