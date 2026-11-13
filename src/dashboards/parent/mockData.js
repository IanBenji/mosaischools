// Mock data reflecting real Mosai Schools structure
export const mockChild = {
  name: 'Aisha Nankunda',
  age: 5,
  class: 'Top Class',
  section: 'Nursery',
  campus: 'Nalugala Campus',
  type: 'Day Scholar',
  teacher: 'Ms. Nakato Grace',
  admissionNo: 'MOS-2025-042',
  languages: ['English', 'Swahili', 'French', 'Chinese'],
  todayStatus: 'Present',
  photo: null,
}

export const mockAttendance = {
  termTotal: 60,
  termPresent: 55,
  month: 'May 2026',
  days: [
    // 0=no school, 1=present, 2=absent
    { date: '2026-05-01', status: 1 },
    { date: '2026-05-02', status: 0 }, // weekend
    { date: '2026-05-03', status: 0 }, // weekend
    { date: '2026-05-04', status: 1 },
    { date: '2026-05-05', status: 1 },
    { date: '2026-05-06', status: 1 },
    { date: '2026-05-07', status: 2 },
    { date: '2026-05-08', status: 1 },
    { date: '2026-05-09', status: 0 },
    { date: '2026-05-10', status: 0 },
    { date: '2026-05-11', status: 1 },
    { date: '2026-05-12', status: 1 },
    { date: '2026-05-13', status: 1 },
    { date: '2026-05-14', status: 1 },
    { date: '2026-05-15', status: 1 },
    { date: '2026-05-16', status: 0 },
    { date: '2026-05-17', status: 0 },
    { date: '2026-05-18', status: 1 },
    { date: '2026-05-19', status: 1 },
    { date: '2026-05-20', status: 2 },
    { date: '2026-05-21', status: 1 },
    { date: '2026-05-22', status: 1 },
    { date: '2026-05-23', status: 0 },
    { date: '2026-05-24', status: 0 },
    { date: '2026-05-25', status: 1 }, // Term II begins
    { date: '2026-05-26', status: 1 },
    { date: '2026-05-27', status: 1 },
    { date: '2026-05-28', status: 1 },
    { date: '2026-05-29', status: 1 },
    { date: '2026-05-30', status: 0 },
    { date: '2026-05-31', status: 0 },
  ],
}

export const mockReports = [
  {
    term: 'Term I 2026',
    issued: 'April 2026',
    subjects: [
      { name: 'English Language',     score: 88, grade: 'A',  comment: 'Excellent reading and comprehension skills.' },
      { name: 'Mathematics',          score: 82, grade: 'B+', comment: 'Strong number sense. Needs more practice with addition.' },
      { name: 'Environmental Studies',score: 91, grade: 'A',  comment: 'Curious and engaged learner.' },
      { name: 'Swahili',              score: 75, grade: 'B',  comment: 'Good progress in vocabulary building.' },
      { name: 'French',               score: 70, grade: 'B-', comment: 'Developing confidence in oral practice.' },
      { name: 'Chinese',              score: 68, grade: 'C+', comment: 'Improving steadily. Keep practising at home.' },
      { name: 'Creative Arts',        score: 95, grade: 'A+', comment: 'Outstanding creativity and enthusiasm.' },
      { name: 'Physical Education',   score: 90, grade: 'A',  comment: 'Excellent participation in all activities.' },
    ],
    teacherComment: 'Aisha has had a wonderful Term I. She is enthusiastic, kind to her peers, and shows a genuine love of learning. We are very proud of her progress.',
    classTeacher: 'Ms. Nakato Grace',
  },
]

export const mockMessages = [
  {
    id: 1,
    from: 'Ms. Nakato Grace',
    role: 'Class Teacher',
    avatar: 'NG',
    time: 'Today, 10:15 AM',
    preview: 'Aisha had a wonderful day today! She led the morning circle time and all the children loved it.',
    read: false,
  },
  {
    id: 2,
    from: 'Mosai Schools Office',
    role: 'Administration',
    avatar: 'MS',
    time: 'Yesterday, 2:30 PM',
    preview: 'Reminder: Term II fees are due by 30 May 2026. Please pay via the School Pay System using your child\'s unique code.',
    read: true,
  },
  {
    id: 3,
    from: 'Ms. Nakato Grace',
    role: 'Class Teacher',
    avatar: 'NG',
    time: '20 May 2026',
    preview: 'Please bring a small plant in a pot for our science lesson on Friday. Thank you!',
    read: true,
  },
]

export const mockPayments = {
  schoolPayCode: 'MOS-042-2026',
  termFee: 450000,
  type: 'Day Scholar',
  section: 'Nursery',
  history: [
    { term: 'Term I 2026',  amount: 450000, date: 'Jan 8, 2026',  status: 'Paid',    ref: 'SPY-881234' },
    { term: 'Term III 2025',amount: 450000, date: 'Sep 5, 2025',  status: 'Paid',    ref: 'SPY-774451' },
    { term: 'Term II 2025', amount: 450000, date: 'May 2, 2025',  status: 'Paid',    ref: 'SPY-663019' },
  ],
  outstanding: { term: 'Term II 2026', amount: 450000, due: 'May 30, 2026' },
}

export const mockEvents = [
  { date: 'May 25',  title: 'Term II Begins',            type: 'academic' },
  { date: 'June 7',  title: 'Sports Day — Nalugala',     type: 'sports'   },
  { date: 'June 14', title: 'Parents Meeting',           type: 'parents'  },
  { date: 'June 21', title: 'Science Fair',              type: 'academic' },
  { date: 'July 4',  title: 'Mid-Term Holiday',          type: 'holiday'  },
  { date: 'July 12', title: 'Term II Resumes',           type: 'academic' },
]

export const todayFeed = [
  { time: '7:45 AM',  event: 'Arrived at school — marked present' },
  { time: '8:00 AM',  event: 'Morning assembly and devotion' },
  { time: '8:30 AM',  event: 'English Language lesson' },
  { time: '10:00 AM', event: 'Break time — outdoor play' },
  { time: '10:30 AM', event: 'Mathematics — number work' },
  { time: '12:00 PM', event: 'Lunch' },
  { time: '1:00 PM',  event: 'Creative Arts — painting' },
  { time: '2:00 PM',  event: 'Physical Education' },
  { time: '3:00 PM',  event: 'Home time' },
]
