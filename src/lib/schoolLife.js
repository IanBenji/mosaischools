// Copy for the About page's "life at Mosai" sections: Nutrition, Day and
// Boarding, and Games and Sports. Shared by both campuses; each About page
// lays it out in its own design and with its own campus photos.
//
// Keep this to what the school has already established elsewhere on the site
// (meals freshly prepared every school day, learners reporting by 7:30 AM,
// boarding fees covering accommodation, meals and pastoral supervision, the
// urban farming and sports programmes) plus general, well founded reasons why
// each matters. Do not add menus, timetables, facilities or policies here
// unless the school has confirmed them.

import {
  Sprout, Brain, Smile, Salad,
  Sun, Users, House, Handshake,
  CalendarClock, BookOpenCheck, Utensils, ShieldCheck,
  HeartPulse, Trophy, Scale,
} from 'lucide-react'

export const NUTRITION = {
  kicker: 'Healthy Bodies, Bright Minds',
  title: 'Nutrition',
  intro:
    'Children learn best when they are well fed. A balanced meal gives growing bodies the energy, protein and vitamins they need, and steadies the concentration a full school day asks of them. At Mosai, nutritious, freshly prepared meals are part of every school day, and good eating habits are something we teach as well as serve.',
  points: [
    { icon: Sprout, title: 'Growth and development',
      text: 'Balanced meals provide the energy, protein, vitamins and minerals children need to grow strong and stay healthy.' },
    { icon: Brain,  title: 'Ready to learn',
      text: 'A well fed child is more alert, more settled and better able to concentrate, from the first lesson of the day to the last.' },
    { icon: Smile,  title: 'Healthy habits for life',
      text: 'We encourage children to try a variety of foods, drink plenty of clean water and enjoy mealtimes together, habits that stay with them.' },
    { icon: Salad,  title: 'Knowing where food comes from',
      text: 'Through urban farming, learners grow vegetables themselves and discover how fresh, wholesome food makes its way to the table.' },
  ],
  closing:
    'Good nutrition supports everything else we do: steady energy for lessons, strength for play and sport, and the wellbeing every child needs to flourish.',
}

export const DAY_BOARDING = {
  kicker: 'Two Ways to Belong',
  title: 'Day and Boarding',
  intro:
    'Mosai is a day and boarding school, so every family can choose the arrangement that suits their child and their home. Whichever you choose, your child learns in the same classes, follows the same curriculum and belongs to the same Mosai family.',
  day: {
    title: 'Day School',
    tag: 'Home every evening',
    text:
      'Day scholars arrive each morning ready for a full day of lessons, play and activities, then go home each afternoon to share their day with the family. Evenings at home keep parents closely involved in reading, homework and everyday progress, while the school day gives children structure, friendships and rich learning.',
    points: [
      { icon: Sun,       text: 'Learners report by 7:30 AM for a full school day' },
      { icon: Users,     text: 'Full part in every lesson, activity and sport' },
      { icon: House,     text: 'Home each evening with their family' },
      { icon: Handshake, text: 'A close, everyday partnership between home and school' },
    ],
  },
  boarding: {
    title: 'Boarding',
    tag: 'A home away from home',
    text:
      'For boarders, Mosai becomes a home away from home. A structured daily routine of lessons, meals, supervised study, rest and play gives children security and rhythm. Living and learning alongside their friends, boarders grow in independence, responsibility and the confidence to look after themselves and one another, with caring adults looking after them throughout.',
    points: [
      { icon: CalendarClock, text: 'A structured routine that balances learning, rest and play' },
      { icon: BookOpenCheck, text: 'Supervised study time and pastoral care' },
      { icon: Utensils,      text: 'Accommodation and meals included in the boarding fee' },
      { icon: ShieldCheck,   text: 'Independence, responsibility and lasting friendships' },
    ],
  },
}

export const GAMES_SPORTS = {
  kicker: 'Play With Purpose',
  title: 'Games and Sports',
  intro:
    'Games and sport are part of a Mosai education, not an extra. Time to run, play and compete helps children grow strong and healthy, and teaches lessons no textbook can: how to work as a team, how to win and lose graciously, and how to keep going when something is hard.',
  benefits: [
    { icon: HeartPulse, title: 'Physical development',
      text: 'Running, jumping, swimming and ball games build strength, coordination, balance and healthy growth.' },
    { icon: Users,      title: 'Teamwork and cooperation',
      text: 'Playing on a team teaches children to communicate, share and pull together towards a common goal.' },
    { icon: ShieldCheck, title: 'Discipline and responsibility',
      text: 'Following the rules, practising skills and showing up for teammates build self discipline and responsibility.' },
    { icon: Trophy,     title: 'Confidence and friendship',
      text: 'Every small success builds self belief, and play brings children together across classes and ages.' },
    { icon: Smile,      title: 'Recreation and joy',
      text: 'Play is how children relax, refresh and simply enjoy being children.' },
    { icon: Scale,      title: 'A healthy balance',
      text: 'Time to move between lessons helps children return to the classroom refreshed, focused and ready to learn.' },
  ],
}
