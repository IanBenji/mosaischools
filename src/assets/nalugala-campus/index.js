// Nalugala campus photos (optimized .webp) — facilities, boarding, garden and
// grounds, photographed November 2026. Mainly for the Nalugala site; Bunono
// may borrow them for things it has no photo of yet (boarding, the garden).
// Originals live in src/assets/nalugala/ (git-ignored, source only).
//
// Each entry carries the alt text and a short caption written from what is
// actually in the photograph, so every page describes an image the same way.

import farmSign     from './mosai-nalugala-urban-farming-demonstration-farm.webp'
import gardenHoe    from './mosai-nalugala-learners-hoeing-vegetable-garden.webp'
import gardenWater  from './mosai-nalugala-learners-watering-garden.webp'
import gardenOnion  from './mosai-nalugala-learners-weeding-onion-beds.webp'
import gardenLesson from './mosai-nalugala-garden-lesson-with-teacher.webp'
import gardenSacks  from './mosai-nalugala-learners-planting-sack-gardens.webp'
import gardenBeds   from './mosai-nalugala-vegetable-garden-sack-beds.webp'
import dormBunks    from './mosai-nalugala-dormitory-bunk-beds.webp'
import dormBlue     from './mosai-nalugala-dormitory-blue-bunks.webp'
import dormGirls    from './mosai-nalugala-girls-dormitory.webp'
import dormTrunks   from './mosai-nalugala-dormitory-learners-trunks.webp'
import dormRoom     from './mosai-nalugala-dormitory-room.webp'
import gate         from './mosai-nalugala-school-gate.webp'
import compound     from './mosai-nalugala-school-compound.webp'
import classMotto   from './mosai-nalugala-classroom-block-motto.webp'
import classVeranda from './mosai-nalugala-classroom-verandas.webp'
import playground   from './mosai-nalugala-playground.webp'
import office       from './mosai-nalugala-school-office.webp'

const p = (img, alt, cap) => ({ img, alt, cap })

export const NAL = {
  farmSign:     p(farmSign,     'The Mosai urban farming demonstration farm at Nalugala, with vegetables growing in raised sack gardens beside the classrooms', 'Our urban farming demonstration farm'),
  gardenHoe:    p(gardenHoe,    'Two Mosai learners in pink checked uniforms hoeing between rows of vegetables in the school garden', 'Preparing the vegetable beds'),
  gardenWater:  p(gardenWater,  'Mosai learners watering and tending vegetables in the school garden, with sack gardens on a raised stand behind them', 'Watering time in the school garden'),
  gardenOnion:  p(gardenOnion,  'A group of Mosai learners weeding onion beds and spraying plants in the school garden', 'Caring for the onion beds'),
  gardenLesson: p(gardenLesson, 'A Mosai teacher guiding learners as they water vegetables in the school garden', 'A garden lesson with our teacher'),
  gardenSacks:  p(gardenSacks,  'Mosai learners planting seedlings in sack gardens on a wooden stand', 'Planting up the sack gardens'),
  gardenBeds:   p(gardenBeds,   'Healthy vegetables growing in sack beds and garden rows at Mosai Nalugala', 'Vegetables growing on campus'),
  dormBunks:    p(dormBunks,    'Neatly made bunk beds with pink bedding and mosquito nets in the Mosai Nalugala boarding section', 'Bunk beds made up for the night'),
  dormBlue:     p(dormBlue,     'Rows of blue bunk beds with fresh bedding in the Mosai Nalugala dormitory', 'Our boarding dormitory'),
  dormGirls:    p(dormGirls,    'A bright dormitory room at Mosai Nalugala with tidy bunk beds and mosquito nets', 'A tidy, well kept dormitory'),
  dormTrunks:   p(dormTrunks,   'Bunk beds in the Mosai Nalugala dormitory, with each learner\'s metal trunk stored on the top frame', 'Each learner keeps their own trunk'),
  dormRoom:     p(dormRoom,     'A spacious dormitory room at Mosai Nalugala with bunk beds, learners\' trunks and suitcases', 'Room to settle in'),
  gate:         p(gate,         'The colourful main gate and perimeter wall of Mosai Nalugala Campus', 'Our gated campus'),
  compound:     p(compound,     'The open paved compound at Mosai Nalugala, surrounded by brightly painted classroom blocks', 'Our open school compound'),
  classMotto:   p(classMotto,   'A colourful classroom block at Mosai Nalugala displaying the school motto, Brains of Character', 'Our motto: Brains of Character'),
  classVeranda: p(classVeranda, 'Classroom verandas at Mosai Nalugala painted in bright colours, with potted plants along the walkway', 'Our classroom verandas'),
  playground:   p(playground,   'The fenced children\'s playground at Mosai Nalugala with slides, climbing frames and swings', 'Our children\'s playground'),
  office:       p(office,       'The front office at Mosai Nalugala, with a reception desk and noticeboard', 'Our school office'),
}

/* Gallery categories for the new campus photos, in display order. */
export const NAL_GALLERY = [
  { ...NAL.compound,     cat: 'Our Campus' },
  { ...NAL.classMotto,   cat: 'Our Campus' },
  { ...NAL.classVeranda, cat: 'Our Campus' },
  { ...NAL.gate,         cat: 'Our Campus' },
  { ...NAL.playground,   cat: 'Our Campus' },
  { ...NAL.dormBlue,     cat: 'Boarding'   },
  { ...NAL.dormBunks,    cat: 'Boarding'   },
  { ...NAL.dormGirls,    cat: 'Boarding'   },
  { ...NAL.dormTrunks,   cat: 'Boarding'   },
  { ...NAL.dormRoom,     cat: 'Boarding'   },
  { ...NAL.farmSign,     cat: 'Our Garden' },
  { ...NAL.gardenLesson, cat: 'Our Garden' },
  { ...NAL.gardenOnion,  cat: 'Our Garden' },
  { ...NAL.gardenHoe,    cat: 'Our Garden' },
  { ...NAL.gardenWater,  cat: 'Our Garden' },
  { ...NAL.gardenSacks,  cat: 'Our Garden' },
  { ...NAL.gardenBeds,   cat: 'Our Garden' },
]
