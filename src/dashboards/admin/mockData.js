// ── Comprehensive mock data — both campuses ──────────────────────

export const CAMPUSES  = ['Nalugala Campus', 'Bunono Campus']
export const CLASSES   = ['Baby Class', 'Middle Class', 'Top Class', 'P.1', 'P.2', 'P.3']
export const SECTIONS  = ['Nursery', 'Primary']
export const TYPES     = ['Day Scholar', 'Boarding']

export const FEE_STRUCTURE = {
  Nursery: { 'Day Scholar': 450000, Boarding: 600000 },
  Primary: { 'Day Scholar': 500000, Boarding: 700000 },
}

export const CURRENT_TERM = 'Term II 2026'

// ── Students (40 across both campuses) ───────────────────────────
export const mockStudents = [
  // Nalugala — Baby Class
  { id:1,  name:'Aisha Nankunda',     age:4, gender:'F', class:'Baby Class',   section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-001', parentName:'Sarah Nankunda',     parentPhone:'+256 772 100 001', feeStatus:'Paid',    admDate:'2025-01-15' },
  { id:2,  name:'Brian Mukasa',       age:3, gender:'M', class:'Baby Class',   section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-002', parentName:'James Mukasa',        parentPhone:'+256 772 100 002', feeStatus:'Paid',    admDate:'2025-01-16' },
  { id:3,  name:'Christine Akello',   age:4, gender:'F', class:'Baby Class',   section:'Nursery', campus:'Nalugala Campus', type:'Boarding',    admNo:'MOS-N-003', parentName:'Grace Akello',        parentPhone:'+256 772 100 003', feeStatus:'Pending', admDate:'2025-01-17' },
  { id:4,  name:'Daniel Ochieng',     age:3, gender:'M', class:'Baby Class',   section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-004', parentName:'Robert Ochieng',      parentPhone:'+256 772 100 004', feeStatus:'Paid',    admDate:'2025-01-18' },
  { id:5,  name:'Esther Namukasa',    age:4, gender:'F', class:'Baby Class',   section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-005', parentName:'Joan Namukasa',       parentPhone:'+256 772 100 005', feeStatus:'Paid',    admDate:'2025-01-19' },
  // Nalugala — Middle Class
  { id:6,  name:'Frank Ssemakula',    age:5, gender:'M', class:'Middle Class', section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-006', parentName:'David Ssemakula',     parentPhone:'+256 772 100 006', feeStatus:'Paid',    admDate:'2025-01-20' },
  { id:7,  name:'Gloria Nabirye',     age:4, gender:'F', class:'Middle Class', section:'Nursery', campus:'Nalugala Campus', type:'Boarding',    admNo:'MOS-N-007', parentName:'Peter Nabirye',       parentPhone:'+256 772 100 007', feeStatus:'Paid',    admDate:'2025-01-21' },
  { id:8,  name:'Henry Kato',         age:5, gender:'M', class:'Middle Class', section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-008', parentName:'Agnes Kato',          parentPhone:'+256 772 100 008', feeStatus:'Pending', admDate:'2025-01-22' },
  { id:9,  name:'Irene Nansubuga',    age:4, gender:'F', class:'Middle Class', section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-009', parentName:'Charles Nansubuga',   parentPhone:'+256 772 100 009', feeStatus:'Paid',    admDate:'2025-01-23' },
  { id:10, name:'James Waiswa',       age:5, gender:'M', class:'Middle Class', section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-010', parentName:'Mary Waiswa',         parentPhone:'+256 772 100 010', feeStatus:'Paid',    admDate:'2025-01-24' },
  // Nalugala — Top Class
  { id:11, name:'Keza Uwimana',       age:5, gender:'F', class:'Top Class',    section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-011', parentName:'Eric Uwimana',        parentPhone:'+256 772 100 011', feeStatus:'Paid',    admDate:'2025-01-25' },
  { id:12, name:'Lawrence Opio',      age:6, gender:'M', class:'Top Class',    section:'Nursery', campus:'Nalugala Campus', type:'Boarding',    admNo:'MOS-N-012', parentName:'Florence Opio',       parentPhone:'+256 772 100 012', feeStatus:'Paid',    admDate:'2025-01-26' },
  { id:13, name:'Miriam Aheebwa',     age:5, gender:'F', class:'Top Class',    section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-013', parentName:'Patrick Aheebwa',     parentPhone:'+256 772 100 013', feeStatus:'Paid',    admDate:'2025-01-27' },
  { id:14, name:'Nathan Byaruhanga',  age:6, gender:'M', class:'Top Class',    section:'Nursery', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-014', parentName:'Ruth Byaruhanga',     parentPhone:'+256 772 100 014', feeStatus:'Pending', admDate:'2025-01-28' },
  // Nalugala — P.1
  { id:15, name:'Olivia Nakigozi',    age:6, gender:'F', class:'P.1',          section:'Primary', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-015', parentName:'Samuel Nakigozi',     parentPhone:'+256 772 100 015', feeStatus:'Paid',    admDate:'2025-01-29' },
  { id:16, name:'Paul Mugabi',        age:7, gender:'M', class:'P.1',          section:'Primary', campus:'Nalugala Campus', type:'Boarding',    admNo:'MOS-N-016', parentName:'Esther Mugabi',       parentPhone:'+256 772 100 016', feeStatus:'Paid',    admDate:'2025-01-30' },
  { id:17, name:'Queen Nakabugo',     age:6, gender:'F', class:'P.1',          section:'Primary', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-017', parentName:'Isaac Nakabugo',      parentPhone:'+256 772 100 017', feeStatus:'Paid',    admDate:'2025-01-31' },
  { id:18, name:'Richard Sserunjogi', age:7, gender:'M', class:'P.1',          section:'Primary', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-018', parentName:'Lydia Sserunjogi',    parentPhone:'+256 772 100 018', feeStatus:'Paid',    admDate:'2025-02-01' },
  // Nalugala — P.2
  { id:19, name:'Sandra Namulindwa',  age:7, gender:'F', class:'P.2',          section:'Primary', campus:'Nalugala Campus', type:'Boarding',    admNo:'MOS-N-019', parentName:'Joseph Namulindwa',   parentPhone:'+256 772 100 019', feeStatus:'Paid',    admDate:'2025-02-02' },
  { id:20, name:'Timothy Okello',     age:8, gender:'M', class:'P.2',          section:'Primary', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-020', parentName:'Joyce Okello',        parentPhone:'+256 772 100 020', feeStatus:'Pending', admDate:'2025-02-03' },
  // Nalugala — P.3
  { id:21, name:'Uretha Nakato',      age:8, gender:'F', class:'P.3',          section:'Primary', campus:'Nalugala Campus', type:'Day Scholar', admNo:'MOS-N-021', parentName:'Benjamin Nakato',     parentPhone:'+256 772 100 021', feeStatus:'Paid',    admDate:'2025-02-04' },
  { id:22, name:'Vincent Ssebaggala', age:9, gender:'M', class:'P.3',          section:'Primary', campus:'Nalugala Campus', type:'Boarding',    admNo:'MOS-N-022', parentName:'Catherine Ssebaggala',parentPhone:'+256 772 100 022', feeStatus:'Paid',    admDate:'2025-02-05' },

  // Bunono Campus — Baby Class
  { id:23, name:'Winnie Achieng',     age:3, gender:'F', class:'Baby Class',   section:'Nursery', campus:'Bunono Campus',  type:'Day Scholar', admNo:'MOS-B-001', parentName:'Dennis Achieng',      parentPhone:'+256 772 200 001', feeStatus:'Paid',    admDate:'2026-01-10' },
  { id:24, name:'Xavier Mugisha',     age:4, gender:'M', class:'Baby Class',   section:'Nursery', campus:'Bunono Campus',  type:'Day Scholar', admNo:'MOS-B-002', parentName:'Harriet Mugisha',     parentPhone:'+256 772 200 002', feeStatus:'Paid',    admDate:'2026-01-11' },
  { id:25, name:'Yvonne Nalubwama',   age:3, gender:'F', class:'Baby Class',   section:'Nursery', campus:'Bunono Campus',  type:'Boarding',    admNo:'MOS-B-003', parentName:'Michael Nalubwama',   parentPhone:'+256 772 200 003', feeStatus:'Pending', admDate:'2026-01-12' },
  // Bunono — Middle Class
  { id:26, name:'Zara Namusoke',      age:4, gender:'F', class:'Middle Class', section:'Nursery', campus:'Bunono Campus',  type:'Day Scholar', admNo:'MOS-B-004', parentName:'Andrew Namusoke',     parentPhone:'+256 772 200 004', feeStatus:'Paid',    admDate:'2026-01-13' },
  { id:27, name:'Aaron Bbosa',        age:5, gender:'M', class:'Middle Class', section:'Nursery', campus:'Bunono Campus',  type:'Day Scholar', admNo:'MOS-B-005', parentName:'Penelope Bbosa',      parentPhone:'+256 772 200 005', feeStatus:'Paid',    admDate:'2026-01-14' },
  // Bunono — Top Class
  { id:28, name:'Beatrice Nanyanzi',  age:5, gender:'F', class:'Top Class',    section:'Nursery', campus:'Bunono Campus',  type:'Day Scholar', admNo:'MOS-B-006', parentName:'George Nanyanzi',     parentPhone:'+256 772 200 006', feeStatus:'Paid',    admDate:'2026-01-15' },
  { id:29, name:'Calvin Ssendagire',  age:6, gender:'M', class:'Top Class',    section:'Nursery', campus:'Bunono Campus',  type:'Boarding',    admNo:'MOS-B-007', parentName:'Helen Ssendagire',    parentPhone:'+256 772 200 007', feeStatus:'Paid',    admDate:'2026-01-16' },
  // Bunono — P.1
  { id:30, name:'Diana Nabatanzi',    age:6, gender:'F', class:'P.1',          section:'Primary', campus:'Bunono Campus',  type:'Day Scholar', admNo:'MOS-B-008', parentName:'Francis Nabatanzi',   parentPhone:'+256 772 200 008', feeStatus:'Paid',    admDate:'2026-01-17' },
  { id:31, name:'Edward Ssentamu',    age:7, gender:'M', class:'P.1',          section:'Primary', campus:'Bunono Campus',  type:'Day Scholar', admNo:'MOS-B-009', parentName:'Irene Ssentamu',      parentPhone:'+256 772 200 009', feeStatus:'Pending', admDate:'2026-01-18' },
]

// ── Teachers ─────────────────────────────────────────────────────
export const mockTeachers = [
  { id:1, name:'Ms. Nakato Grace',      role:'Class Teacher',    class:'Top Class',    section:'Nursery', campus:'Nalugala Campus', staffId:'MST-N-001', phone:'+256 772 300 001', email:'nakato.grace@mosaischools.ug',      qualification:'Diploma ECD' },
  { id:2, name:'Mr. Kizito Brian',      role:'Class Teacher',    class:'Baby Class',   section:'Nursery', campus:'Nalugala Campus', staffId:'MST-N-002', phone:'+256 772 300 002', email:'kizito.brian@mosaischools.ug',      qualification:'Certificate ECD' },
  { id:3, name:'Ms. Aceng Florence',    role:'Class Teacher',    class:'Middle Class', section:'Nursery', campus:'Nalugala Campus', staffId:'MST-N-003', phone:'+256 772 300 003', email:'aceng.florence@mosaischools.ug',    qualification:'Diploma ECD' },
  { id:4, name:'Mr. Ssemakula Paul',    role:'Class Teacher',    class:'P.1',          section:'Primary', campus:'Nalugala Campus', staffId:'MST-N-004', phone:'+256 772 300 004', email:'ssemakula.paul@mosaischools.ug',    qualification:'B.Ed Primary' },
  { id:5, name:'Ms. Birungi Rita',      role:'Class Teacher',    class:'P.2',          section:'Primary', campus:'Nalugala Campus', staffId:'MST-N-005', phone:'+256 772 300 005', email:'birungi.rita@mosaischools.ug',      qualification:'B.Ed Primary' },
  { id:6, name:'Mr. Tumwine Isaac',     role:'Class Teacher',    class:'P.3',          section:'Primary', campus:'Nalugala Campus', staffId:'MST-N-006', phone:'+256 772 300 006', email:'tumwine.isaac@mosaischools.ug',     qualification:'B.Ed Primary' },
  { id:7, name:'Ms. Namuli Doreen',     role:'PE Teacher',       class:'All Classes',  section:'Both',    campus:'Nalugala Campus', staffId:'MST-N-007', phone:'+256 772 300 007', email:'namuli.doreen@mosaischools.ug',     qualification:'B.Sc Sports Sci.' },
  { id:8, name:'Mrs. Tendo Aisha',      role:'Head Teacher',     class:'Administration', section:'Both',  campus:'Nalugala Campus', staffId:'MST-N-008', phone:'+256 772 300 008', email:'tendo.aisha@mosaischools.ug',       qualification:'M.Ed Administration' },
  { id:9, name:'Ms. Akello Sharon',     role:'Class Teacher',    class:'Baby Class',   section:'Nursery', campus:'Bunono Campus',   staffId:'MST-B-001', phone:'+256 772 300 009', email:'akello.sharon@mosaischools.ug',     qualification:'Diploma ECD' },
  { id:10,name:'Mr. Opio Gerald',       role:'Class Teacher',    class:'Middle Class', section:'Nursery', campus:'Bunono Campus',   staffId:'MST-B-002', phone:'+256 772 300 010', email:'opio.gerald@mosaischools.ug',       qualification:'Diploma ECD' },
  { id:11,name:'Ms. Nassuna Juliet',    role:'Class Teacher',    class:'Top Class',    section:'Nursery', campus:'Bunono Campus',   staffId:'MST-B-003', phone:'+256 772 300 011', email:'nassuna.juliet@mosaischools.ug',    qualification:'B.Ed ECD' },
  { id:12,name:'Mr. Byamugisha Dan',    role:'Class Teacher',    class:'P.1',          section:'Primary', campus:'Bunono Campus',   staffId:'MST-B-004', phone:'+256 772 300 012', email:'byamugisha.dan@mosaischools.ug',    qualification:'B.Ed Primary' },
  { id:13,name:'Ms. Nakaweesa Betty',   role:'Head Teacher',     class:'Administration', section:'Both',  campus:'Bunono Campus',   staffId:'MST-B-005', phone:'+256 772 300 013', email:'nakaweesa.betty@mosaischools.ug',   qualification:'M.Ed Administration' },
]

// ── Admissions (pending applications) ────────────────────────────
export const mockAdmissions = [
  { id:1, childName:'Moses Katende',    childAge:3, classApplied:'Baby Class',   campus:'Nalugala Campus', type:'Day Scholar', parentName:'Robert Katende',    parentPhone:'+256 772 400 001', email:'katende.r@gmail.com',  appliedDate:'2026-04-28', status:'Pending',  documents:['Birth Certificate','Photos','Immunization Card'] },
  { id:2, childName:'Fatuma Nalule',    childAge:5, classApplied:'Top Class',    campus:'Nalugala Campus', type:'Boarding',    parentName:'Amina Nalule',       parentPhone:'+256 772 400 002', email:'nalule.a@gmail.com',   appliedDate:'2026-04-27', status:'Pending',  documents:['Birth Certificate','Photos'] },
  { id:3, childName:'Joseph Mugisha',   childAge:6, classApplied:'P.1',          campus:'Bunono Campus',   type:'Day Scholar', parentName:'Alice Mugisha',      parentPhone:'+256 772 400 003', email:'mugisha.a@gmail.com',  appliedDate:'2026-04-26', status:'Pending',  documents:['Birth Certificate','Photos','Immunization Card','Previous Report'] },
  { id:4, childName:'Rehema Nambi',     childAge:4, classApplied:'Middle Class', campus:'Bunono Campus',   type:'Day Scholar', parentName:'Hassan Nambi',       parentPhone:'+256 772 400 004', email:'nambi.h@gmail.com',    appliedDate:'2026-04-25', status:'Approved', documents:['Birth Certificate','Photos','Immunization Card'] },
  { id:5, childName:'Caleb Ssebuuma',   childAge:7, classApplied:'P.1',          campus:'Nalugala Campus', type:'Boarding',    parentName:'Lydia Ssebuuma',     parentPhone:'+256 772 400 005', email:'ssebuuma.l@gmail.com', appliedDate:'2026-04-24', status:'Approved', documents:['Birth Certificate','Photos','Immunization Card','Previous Report'] },
  { id:6, childName:'Ruth Apolot',      childAge:3, classApplied:'Baby Class',   campus:'Bunono Campus',   type:'Day Scholar', parentName:'Simon Apolot',       parentPhone:'+256 772 400 006', email:'apolot.s@gmail.com',   appliedDate:'2026-04-23', status:'Rejected', documents:['Photos'] },
  { id:7, childName:'Marcus Byekwaso',  childAge:5, classApplied:'Top Class',    campus:'Nalugala Campus', type:'Day Scholar', parentName:'Dora Byekwaso',      parentPhone:'+256 772 400 007', email:'byekwaso.d@gmail.com', appliedDate:'2026-05-01', status:'Pending',  documents:['Birth Certificate','Photos','Immunization Card'] },
  { id:8, childName:'Priya Nantume',    childAge:4, classApplied:'Middle Class', campus:'Nalugala Campus', type:'Day Scholar', parentName:'Raj Nantume',        parentPhone:'+256 772 400 008', email:'nantume.r@gmail.com',  appliedDate:'2026-05-02', status:'Pending',  documents:['Birth Certificate','Photos'] },
]

// ── Payments ─────────────────────────────────────────────────────
export const mockPayments = mockStudents.map(s => {
  const fee = FEE_STRUCTURE[s.section][s.type]
  const paid = s.feeStatus === 'Paid'
  return {
    id:         s.id,
    studentId:  s.id,
    studentName:s.name,
    class:      s.class,
    section:    s.section,
    campus:     s.campus,
    type:       s.type,
    term:       CURRENT_TERM,
    amountDue:  fee,
    amountPaid: paid ? fee : 0,
    balance:    paid ? 0 : fee,
    status:     s.feeStatus,
    paidDate:   paid ? '2026-05-' + String(s.id).padStart(2,'0') : null,
    ref:        paid ? 'SPY-' + String(800000 + s.id) : null,
  }
})

// ── Computed totals ───────────────────────────────────────────────
export const totalExpected = mockPayments.reduce((s, p) => s + p.amountDue, 0)
export const totalCollected = mockPayments.reduce((s, p) => s + p.amountPaid, 0)
export const collectionPct = Math.round((totalCollected / totalExpected) * 100)

// Campus breakdown
export const campusBreakdown = CAMPUSES.map(c => ({
  campus: c,
  total:  mockStudents.filter(s => s.campus === c).length,
  nursery:mockStudents.filter(s => s.campus === c && s.section === 'Nursery').length,
  primary:mockStudents.filter(s => s.campus === c && s.section === 'Primary').length,
}))

// Class distribution
export const classDistribution = CLASSES.map(cl => ({
  class:  cl,
  total:  mockStudents.filter(s => s.class === cl).length,
  nalugala: mockStudents.filter(s => s.class === cl && s.campus === 'Nalugala Campus').length,
  bunono:   mockStudents.filter(s => s.class === cl && s.campus === 'Bunono Campus').length,
}))

// Announcements (seeded)
export const mockAnnouncements = [
  { id:1, title:'Term II 2026 Begins 25 May',         target:'All',               category:'Academic Calendar', date:'2026-05-10', author:'Administration', body:'All learners to report by 7:30 AM on Monday 25 May 2026. Fees must be cleared via School Pay before the first day of term.' },
  { id:2, title:'Sports Day — 7 June 2026',           target:'Nalugala Campus',   category:'Events',            date:'2026-05-08', author:'Ms. Namuli Doreen', body:'Our annual Sports Day will be held on Saturday 7 June 2026 at Nalugala Campus. Parents are warmly invited. Gates open at 8:30 AM.' },
  { id:3, title:'Parents Meeting — 14 June 2026',     target:'All',               category:'Parents',           date:'2026-05-05', author:'Mrs. Tendo Aisha', body:'A mandatory parents meeting will be held on 14 June 2026 at both campuses. Please confirm attendance with the class teacher.' },
]
