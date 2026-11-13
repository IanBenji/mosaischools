// All Bunono campus photos (optimized .webp). Auto-collected so new
// bunono-NN.webp files are picked up without editing this list.
// Mainly for the Bunono site. The school's rule: where one campus has no photo
// of something the other campus has (e.g. the swimming pool), the other
// campus's photo may be used. Never use one to stand in for a different thing.
const modules = import.meta.glob('./bunono-*.webp', { eager: true })

export const bunonoPhotos = Object.keys(modules)
  .sort()
  .map((k) => modules[k].default)

/* Named campus photos added November 2026. Deliberately prefixed mosai-bunono-
 * so the glob above does not pick them up: pages address bunonoPhotos by index,
 * and new files sorting into that list would silently change those pictures. */
import exercise   from './mosai-bunono-learners-morning-exercise.webp'
import stretching from './mosai-bunono-learners-stretching-in-house-colours.webp'
import houses     from './mosai-bunono-learners-in-house-colours.webp'
import group      from './mosai-bunono-learners-group-photo.webp'
import gate       from './mosai-bunono-school-gate.webp'
import climbing   from './mosai-bunono-playground-climbing-frame.webp'
import slides     from './mosai-bunono-playground-slides.webp'
import crest      from './mosai-bunono-school-building-crest.webp'
import front      from './mosai-bunono-school-front-entrance.webp'
import verandas   from './mosai-bunono-classroom-verandas.webp'

const p = (img, alt, cap) => ({ img, alt, cap })

export const BUN = {
  exercise:   p(exercise,   'Mosai Bunono learners in house colour sports wear doing morning exercises with arms raised in the school compound', 'Morning exercise'),
  stretching: p(stretching, 'Mosai Bunono learners stretching with arms outstretched during a physical education session', 'Stretch and warm up'),
  houses:     p(houses,     'A cheerful group of Mosai Bunono learners in red, green, blue and white house colours posing in the compound', 'Proud in our house colours'),
  group:      p(group,      'Mosai Bunono learners gathered for a group photo in their sports wear in front of the school building', 'Together as one school'),
  gate:       p(gate,       'The Mosai Schools gate and boundary wall at Bunono Campus', 'The Mosai Schools gate'),
  climbing:   p(climbing,   'Colourful climbing frames, swings and potted flowers in the Bunono playground, with painted murals behind', 'Our colourful playground'),
  slides:     p(slides,     'Slides and a climbing tower in the Mosai Bunono playground', 'Slides and climbing tower'),
  crest:      p(crest,      'The Mosai Bunono school building with the school crest and the Uganda coat of arms on its walls', 'Our school building'),
  front:      p(front,      'The front of the Mosai Bunono school building behind the Mosai Schools gate, painted with murals', 'Welcome to Bunono'),
  verandas:   p(verandas,   'Brightly painted classroom verandas with potted plants at Mosai Bunono', 'Our classroom verandas'),
}

/* For the scrapbook gallery, in display order. */
export const BUN_GALLERY = [
  BUN.front, BUN.exercise, BUN.houses, BUN.verandas, BUN.climbing,
  BUN.stretching, BUN.crest, BUN.slides, BUN.group, BUN.gate,
]
