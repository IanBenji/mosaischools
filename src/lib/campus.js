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
    phone: '+256 759 742 146',          // central MOSAI contacts (shared by both campuses)
    altPhone: '+256 783 926 840',
    whatsapp: '+256 759 742 146',
    email: 'mosaischools@gmail.com',
    hero: {
      eyebrow: 'Flagship Campus · Garuga Road',
      headline: 'Where Every',
      accentWord: 'Child Shines.',
      tagline:
        'Our flagship home along scenic Garuga Road, with modern classrooms, a swimming pool and boarding facilities, nurturing critical thinkers from Baby Class through to Primary.',
      backgrounds: [nalBg1, nalBg2, nalBg3],
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
      classes:     'Baby Class to Primary Three (P.3)',
      classesShort:'Baby Class to P.3',
      primaryRange:'P.1, P.2 & P.3',
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
    phone: '+256 759 742 146',
    altPhone: '+256 783 926 840',
    whatsapp: '+256 759 742 146',
    email: 'mosaischools@gmail.com',
    hero: {
      eyebrow: 'New Campus · Opened February 2026',
      headline: 'A New Home',
      accentWord: 'To Shine.',
      tagline:
        'Opened February 2026 in Bunono Village, Katabi, offering quality, affordable and holistic education in a safe, caring and learner friendly environment, from Baby Class through Primary.',
      backgrounds: [bunBg1, bunBg2, bunBg3],
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
      classes:     'Baby Class to Primary Four (P.4)',
      classesShort:'Baby Class to P.4',
      primaryRange:'P.1, P.2, P.3 & P.4',
      growth:      'Introducing one additional class each year until Primary Seven (P.7)',
      address:     'Bunono Village, Kabaale Ward, Katabi Town Council',
      area:        'Katabi, Wakiso District',
      welcome:
        'Welcome to Mosai Schools. We are committed to providing quality education in a safe, caring and supportive environment where every learner is nurtured to discover their potential and achieve excellence. Through teamwork, discipline and partnership with parents, we continue to build the Mosai family and prepare our children for a bright and successful future. Welcome to Mosai Schools!',
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
