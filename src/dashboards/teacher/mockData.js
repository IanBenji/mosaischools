// Teacher mock data — reflects real MOSAI Schools structure

export const mockTeacher = {
  name: 'Ms. Nakato Grace',
  role: 'Class Teacher',
  class: 'Top Class',
  section: 'Nursery',
  campus: 'Bunono Campus',
  subjects: ['Reading Readiness', 'Number Work', 'Creativity', 'Social Skills', 'Behaviour & Conduct'],
  email: 'nakato.grace@mosaischools.ug',
  staffId: 'MST-2025-007',
}

export const mockStudents = [
  { id: 1,  name: 'Aisha Nankunda',     age: 5, gender: 'F', type: 'Day Scholar', parentName: 'Sarah Nankunda',      parentPhone: '+256 772 100 001', admNo: 'MOS-2025-042' },
  { id: 2,  name: 'Brian Ssemakula',    age: 6, gender: 'M', type: 'Boarding',    parentName: 'David Ssemakula',     parentPhone: '+256 772 100 002', admNo: 'MOS-2025-043' },
  { id: 3,  name: 'Christine Akello',   age: 5, gender: 'F', type: 'Day Scholar', parentName: 'Grace Akello',        parentPhone: '+256 772 100 003', admNo: 'MOS-2025-044' },
  { id: 4,  name: 'Daniel Mugisha',     age: 6, gender: 'M', type: 'Boarding',    parentName: 'Robert Mugisha',      parentPhone: '+256 772 100 004', admNo: 'MOS-2025-045' },
  { id: 5,  name: 'Esther Nalubega',    age: 5, gender: 'F', type: 'Day Scholar', parentName: 'Joan Nalubega',       parentPhone: '+256 772 100 005', admNo: 'MOS-2025-046' },
  { id: 6,  name: 'Frank Okello',       age: 6, gender: 'M', type: 'Day Scholar', parentName: 'Patrick Okello',     parentPhone: '+256 772 100 006', admNo: 'MOS-2025-047' },
  { id: 7,  name: 'Gloria Namukasa',    age: 5, gender: 'F', type: 'Boarding',    parentName: 'Joseph Namukasa',     parentPhone: '+256 772 100 007', admNo: 'MOS-2025-048' },
  { id: 8,  name: 'Henry Bwire',        age: 6, gender: 'M', type: 'Day Scholar', parentName: 'Agnes Bwire',         parentPhone: '+256 772 100 008', admNo: 'MOS-2025-049' },
  { id: 9,  name: 'Irene Namutebi',     age: 5, gender: 'F', type: 'Boarding',    parentName: 'Charles Namutebi',   parentPhone: '+256 772 100 009', admNo: 'MOS-2025-050' },
  { id: 10, name: 'James Kato',         age: 6, gender: 'M', type: 'Day Scholar', parentName: 'Mary Kato',           parentPhone: '+256 772 100 010', admNo: 'MOS-2025-051' },
  { id: 11, name: 'Keza Uwimana',       age: 5, gender: 'F', type: 'Day Scholar', parentName: 'Eric Uwimana',        parentPhone: '+256 772 100 011', admNo: 'MOS-2025-052' },
  { id: 12, name: 'Lawrence Opio',      age: 6, gender: 'M', type: 'Boarding',    parentName: 'Florence Opio',       parentPhone: '+256 772 100 012', admNo: 'MOS-2025-053' },
]

// Pre-seeded attendance for today — most present, 2 absent
export const todayAttendanceDefaults = Object.fromEntries(
  mockStudents.map(s => [s.id, s.id !== 4 && s.id !== 9]) // Daniel & Irene absent
)

export const mockSchedule = [
  { time: '7:30 – 8:00',   subject: 'Morning Assembly & Devotion',  type: 'assembly' },
  { time: '8:00 – 9:00',   subject: 'Reading Readiness',            type: 'lesson'   },
  { time: '9:00 – 10:00',  subject: 'Number Work',                  type: 'lesson'   },
  { time: '10:00 – 10:30', subject: 'Break Time',                   type: 'break'    },
  { time: '10:30 – 11:30', subject: 'Creativity — Art & Craft',     type: 'lesson'   },
  { time: '11:30 – 12:00', subject: 'Social Skills Activities',      type: 'lesson'   },
  { time: '12:00 – 1:00',  subject: 'Lunch Break',                  type: 'break'    },
  { time: '1:00 – 2:00',   subject: 'Physical Education',            type: 'lesson'   },
  { time: '2:00 – 2:30',   subject: 'Story Time & Wind-Down',       type: 'lesson'   },
  { time: '2:30 – 3:00',   subject: 'Home Time Preparation',        type: 'admin'    },
]

export const NURSERY_SUBJECTS = [
  'Reading Readiness',
  'Number Work',
  'Creativity',
  'Social Skills',
  'Behaviour & Conduct',
  'Physical Education',
  'Language (English)',
  'Language (Swahili)',
]

export const PRIMARY_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Science',
  'Social Studies',
  'Swahili',
  'French',
  'Chinese',
  'Physical Education',
  'Creative Arts',
]

export const mockMessages = [
  {
    id: 1,
    studentId: 1,
    parentName: 'Sarah Nankunda',
    student: 'Aisha Nankunda',
    thread: [
      { from: 'teacher', text: 'Good morning! Aisha had a wonderful day today. She led the morning circle time and all the children loved it.', time: 'Today, 10:15 AM' },
      { from: 'parent',  text: 'That is wonderful to hear! She was very excited about it. Thank you so much!', time: 'Today, 11:02 AM' },
      { from: 'teacher', text: 'She is really coming out of her shell. Her Swahili has also improved a lot this week.', time: 'Today, 11:30 AM' },
    ],
    unread: 1,
  },
  {
    id: 2,
    studentId: 4,
    parentName: 'Robert Mugisha',
    student: 'Daniel Mugisha',
    thread: [
      { from: 'teacher', text: 'Good afternoon Mr. Robert. I wanted to let you know that Daniel was absent today. Please let us know if he is okay.', time: 'Today, 1:30 PM' },
      { from: 'parent',  text: 'He has a slight fever. He will be back tomorrow. Thank you for checking.', time: 'Today, 2:00 PM' },
    ],
    unread: 0,
  },
  {
    id: 3,
    studentId: 7,
    parentName: 'Joseph Namukasa',
    student: 'Gloria Namukasa',
    thread: [
      { from: 'parent',  text: 'Good morning teacher. Will Gloria be able to join the art competition next week?', time: 'Yesterday, 8:15 AM' },
      { from: 'teacher', text: 'Absolutely! Gloria has shown exceptional creativity this term. She is one of our top picks for the competition.', time: 'Yesterday, 9:00 AM' },
    ],
    unread: 0,
  },
]

export const TERMS = ['Term I 2026', 'Term II 2026', 'Term III 2026', 'Term I 2025', 'Term II 2025']

// Seed some existing results
export const mockExistingResults = {
  'Term I 2026': Object.fromEntries(
    mockStudents.map(s => [
      s.id,
      {
        'Reading Readiness':  Math.floor(70 + Math.random() * 28),
        'Number Work':        Math.floor(68 + Math.random() * 28),
        'Creativity':         Math.floor(75 + Math.random() * 23),
        'Social Skills':      Math.floor(72 + Math.random() * 25),
        'Behaviour & Conduct':Math.floor(78 + Math.random() * 20),
        'Physical Education': Math.floor(80 + Math.random() * 18),
        'Language (English)': Math.floor(70 + Math.random() * 28),
        'Language (Swahili)': Math.floor(65 + Math.random() * 30),
        comment: '',
      }
    ])
  )
}
