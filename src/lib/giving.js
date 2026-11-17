// Scholarships + giving — the single source of truth for the /scholarships and
// /donate pages. Both campus designs (Nalugala calm / Bunono storybook) render
// the SAME words from here, so copy is edited in one place only.
//
// Icons are referenced by name and resolved in the pages, keeping this file free
// of JSX so it can be imported anywhere.

export const SCHOLARSHIPS = {
  // The school's own wording — quoted verbatim on both pages.
  statement:
    'MOSAI Schools provides a limited number of scholarships to vulnerable and disadvantaged, yet able and gifted children. Scholarships are awarded based on assessment criteria established and approved by the school management.',

  purpose: [
    'Talent is spread evenly across every village; opportunity is not. Some of the brightest children in Katabi are held back by circumstances entirely outside their control: the loss of a parent, a household income that cannot stretch to school fees, or a disability that made earlier schooling difficult.',
    'Our scholarship programme exists to remove that barrier for a small number of those children each year. It is not a discount scheme and it is not first come first served: it is a deliberate investment in able, gifted learners who would otherwise never sit in a classroom like ours.',
    'A scholarship learner joins the MOSAI family on exactly the same footing as every other child, with the same classes, the same uniform, the same teachers and the same expectations. No child is ever singled out or labelled for the support they receive.',
  ],

  // What the programme is intended to achieve.
  aims: [
    { icon: 'GraduationCap', title: 'Keep gifted children learning', text: 'Ensure that ability, not the family bank balance, decides how far a child goes in school.' },
    { icon: 'HeartHandshake', title: 'Support the most vulnerable', text: 'Prioritise orphans, children of single guardians, and families facing genuine hardship.' },
    { icon: 'Sparkles',       title: 'Grow the whole child',        text: 'Academics, character, faith and confidence, the same holistic education every MOSAI learner receives.' },
    { icon: 'Users',          title: 'Strengthen the community',    text: 'Every child educated here returns skill, self reliance and hope to Katabi and Wakiso District.' },
  ],

  // Eligibility — what management looks for.
  eligibility: [
    {
      icon: 'BookOpen',
      title: 'Demonstrated ability or gift',
      text: 'Evidence of academic promise, or a clear gift in areas such as mathematics, science, music, sport or leadership.',
    },
    {
      icon: 'Home',
      title: 'Genuine financial need',
      text: 'The family is unable to meet school fees in full. Orphaned children, children of single parents or guardians, and households with very low or irregular income are given priority.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Vulnerable circumstances',
      text: 'Children living with a disability, children in the care of elderly guardians, and children at real risk of dropping out are especially encouraged to apply.',
    },
    {
      icon: 'Smile',
      title: 'Good conduct and attitude',
      text: 'A willingness to learn, respect for others, and conduct in keeping with our values of God fearing, Love, Humility and Excellence.',
    },
    {
      icon: 'CalendarCheck',
      title: 'Correct age and class',
      text: 'The child must be of the right age for an available class, from Toddler Class (day care) through the primary classes offered at the chosen campus.',
    },
    {
      icon: 'Handshake',
      title: 'Family partnership',
      text: 'A parent or guardian must commit to supporting attendance, homework, school meetings and the child’s general welfare at home.',
    },
  ],

  // How applications are assessed and selected.
  process: [
    {
      title: 'Express interest',
      text: 'A parent or guardian contacts the school through the form on this page, by phone, on WhatsApp, or by visiting the office, and tells us about the child.',
    },
    {
      title: 'Submit documents',
      text: 'We ask for the child’s birth certificate, the most recent school report where one exists, and evidence of the family’s circumstances (for example a death certificate, medical report, or a letter from the LC1 chairperson).',
    },
    {
      title: 'Needs verification',
      text: 'A member of staff verifies the household situation, usually through a short home visit or a conversation with the local council, so that support reaches the families who genuinely need it.',
    },
    {
      title: 'Assessment of the child',
      text: 'The child sits an age appropriate assessment in literacy and numeracy, and meets a teacher for a friendly interview. Younger applicants are assessed through play based activities rather than a written paper.',
    },
    {
      title: 'Management review',
      text: 'A panel drawn from school management reviews every application against the approved criteria and the number of places available, then makes the final award decision.',
    },
    {
      title: 'Award and agreement',
      text: 'Successful families are informed in writing. Parent or guardian and school sign a short agreement covering attendance, conduct and what the award does and does not cover.',
    },
    {
      title: 'Termly review',
      text: 'Each award is reviewed every term. Scholarships continue where attendance, effort and conduct are maintained, so that the place keeps doing the good it was intended to do.',
    },
  ],

  // Honest expectation-setting.
  goodToKnow: [
    'Places are strictly limited and are reviewed against the number of scholarships the school can fund in a given year.',
    'Applying does not guarantee an award, and unsuccessful applications may be reconsidered in a later intake.',
    'Awards may be full or partial, and a partial award reduces fees rather than removing them entirely.',
    'A scholarship is awarded to a named child and cannot be transferred to a sibling or another family.',
    'Awards are renewed termly, subject to attendance, effort and conduct.',
    'There is no fee to apply. MOSAI Schools never charges for a scholarship application, and no member of staff is permitted to request payment in exchange for an award.',
  ],
}

export const DONATE = {
  intro: [
    'School fees at MOSAI Schools are kept deliberately affordable so that ordinary families in Katabi can send their children to a good school. That affordability is only possible because friends of the school help carry part of the cost.',
    'Every shilling given goes towards the things that change a child’s day: a place for a scholarship learner, a hot lunch, exercise books and pens, a safe classroom, clean water and somewhere to play.',
  ],

  // Where donations go.
  areas: [
    {
      icon: 'GraduationCap',
      title: 'The Scholarship Fund',
      text: 'Funds places for vulnerable and disadvantaged, yet able and gifted children who could not otherwise attend school.',
      color: '#FF8A6B',
    },
    {
      icon: 'Utensils',
      title: 'Meals and nutrition',
      text: 'A child who has eaten can learn. Gifts here keep the daily porridge and lunch programme running.',
      color: '#FFC93C',
    },
    {
      icon: 'BookOpen',
      title: 'Books and learning materials',
      text: 'Exercise books, pens, textbooks, charts and reading corners for every classroom.',
      color: '#6EC6F2',
    },
    {
      icon: 'Building2',
      title: 'Classrooms and facilities',
      text: 'Desks, chairs, safe classrooms, sanitation, clean drinking water and playground equipment.',
      color: '#5FBB6E',
    },
    {
      icon: 'Shirt',
      title: 'Uniforms and essentials',
      text: 'Uniforms, shoes and basic personal items for children whose families cannot provide them.',
      color: '#9B7EDE',
    },
    {
      icon: 'Trophy',
      title: 'Sport, music and talent',
      text: 'Sports kit, instruments and the trips and competitions where children discover what they are good at.',
      color: '#FF8A6B',
    },
  ],

  // Suggested amounts — deliberately concrete so donors know what a gift does.
  // `ugx` is the number; `label` is the pre-formatted display string.
  tiers: [
    {
      label: 'UGX 50,000',
      approx: 'about £10 / €12 / $13',
      title: 'Books and pens for a term',
      text: 'A full set of exercise books, pens and pencils to see one learner through a whole term.',
    },
    {
      label: 'UGX 150,000',
      approx: 'about £30 / €35 / $40',
      title: 'A uniform and shoes',
      text: 'A complete school uniform and a pair of shoes, so a child walks in looking like everybody else.',
    },
    {
      label: 'UGX 400,000',
      approx: 'about £80 / €95 / $105',
      title: 'A term of daily meals',
      text: 'Porridge and a hot lunch every school day for one learner, for an entire term.',
    },
    {
      label: 'UGX 750,000',
      approx: 'about £150 / €175 / $195',
      title: 'A term of school',
      text: 'A full term of tuition for one scholarship child, the single most direct way to change a life here.',
      featured: true,
    },
  ],

  // Ways to give.
  ways: [
    {
      icon: 'Gift',
      title: 'A single gift',
      text: 'Give once, at any amount you choose. We will send you payment instructions and an official receipt.',
    },
    {
      icon: 'CalendarHeart',
      title: 'Monthly giving',
      text: 'A smaller amount each month is the most valuable gift of all, because it lets us commit to a child for the whole year, not just one term.',
    },
    {
      icon: 'HeartHandshake',
      title: 'Sponsor a child',
      text: 'Cover one scholarship learner’s fees for a term or a year. Sponsors receive an update on their child’s progress each term.',
    },
    {
      icon: 'Package',
      title: 'Give goods, not money',
      text: 'Books, stationery, uniforms, desks, sports equipment, computers and building materials are all gratefully received.',
    },
    {
      icon: 'Briefcase',
      title: 'Company or church partnership',
      text: 'Organisations can fund a classroom, a meal programme or a group of scholarship places. We will prepare a short proposal for your board.',
    },
    {
      icon: 'Clock',
      title: 'Give your time',
      text: 'Teachers, coaches, tradespeople and other volunteers are welcome. Talk to us about how your skills could help.',
    },
  ],

  // How giving actually works — contact-first, because we take no payment online.
  howItWorks: [
    {
      title: 'Tell us what you would like to give',
      text: 'Use the form on this page, or call, WhatsApp or email the school office. Let us know the amount, whether it is a single gift or monthly, and what you would like it to support.',
    },
    {
      title: 'We send you the details',
      text: 'Within one working day the office replies with the school’s official payment instructions for bank transfer or mobile money, issued directly by MOSAI Schools.',
    },
    {
      title: 'You give, we receipt it',
      text: 'Every gift is recorded and an official receipt is issued in the donor’s name. Nothing is collected in cash by individual members of staff.',
    },
    {
      title: 'You see what it did',
      text: 'Donors receive an update on how their gift was used. Sponsors of a scholarship learner receive a termly report on that child’s progress.',
    },
  ],

  // Trust and accountability — matters more than design on a donation page.
  assurances: [
    {
      icon: 'ShieldCheck',
      title: 'No payments are taken on this website',
      text: 'This site never asks for card details, bank details or a mobile money PIN. Payment instructions come only from the school office, and you are welcome to confirm them by phoning us.',
    },
    {
      icon: 'ReceiptText',
      title: 'A receipt for every gift',
      text: 'Every donation is entered in the school’s books and receipted in the donor’s name. No cash is handled informally by staff.',
    },
    {
      icon: 'Target',
      title: 'Given where you asked',
      text: 'If you designate a gift for scholarships, meals or books, it is applied to that purpose. Undesignated gifts go to the area of greatest need.',
    },
    {
      icon: 'Eye',
      title: 'Open to questions',
      text: 'Donors may ask at any time how funds were used, and are welcome to visit the campus and see the work for themselves.',
    },
  ],
}

// Options offered in the donation enquiry form.
export const DONATION_PURPOSES = [
  'Wherever the need is greatest',
  'The Scholarship Fund',
  'Sponsor a scholarship child',
  'Meals and nutrition',
  'Books and learning materials',
  'Classrooms and facilities',
  'Uniforms and essentials',
  'Sport, music and talent',
  'Goods rather than money (in kind)',
  'Company or church partnership',
  'Volunteering my time',
]

// Step 1 of the donation form: how often.
export const DONATION_TYPES = [
  { id: 'one-time', label: 'One time' },
  { id: 'monthly',  label: 'Monthly'  },
  { id: 'termly',   label: 'Every term' },
  { id: 'annual',   label: 'Annual'   },
]

// Step 2: preset amounts, each tied to what it buys (from DONATE.tiers).
export const DONATION_PRESETS = [
  { ugx: 50000,  what: 'Books and pens for a term' },
  { ugx: 150000, what: 'A uniform and shoes' },
  { ugx: 400000, what: 'A term of daily meals' },
  { ugx: 750000, what: 'A term of school', featured: true },
]

export const MIN_CUSTOM_GIFT = 5000

// Step 5: how the donor would like to pay. Nothing is paid on this website;
// the office replies with the school's official details for the chosen method.
export const DONATION_METHODS = [
  { id: 'mtn',    label: 'MTN Mobile Money', short: 'MTN MoMo',  mobile: true,  color: '#FFCB05' },
  { id: 'airtel', label: 'Airtel Money',     short: 'Airtel',    mobile: true,  color: '#E40000' },
  { id: 'bank',   label: 'Bank transfer',    short: 'Bank',      mobile: false, color: '#1E4D8C' },
]

export const formatUGX = (n) => `UGX ${Number(n).toLocaleString('en-US')}`

// Questions donors ask, answered from the school's own giving policy above.
// `contact: true` marks the answer that lists the office's phone and email.
export const DONATE_FAQ = [
  {
    q: 'Why should I give to MOSAI Schools?',
    a: DONATE.intro,
  },
  {
    q: 'What does my gift pay for?',
    a: [
      'You can choose: the Scholarship Fund, meals and nutrition, books and learning materials, classrooms and facilities, uniforms and essentials, or sport, music and talent.',
      DONATE.assurances[2].text,
    ],
  },
  {
    q: 'How do I actually pay?',
    a: [
      'This website does not take payments. When you send your pledge, the school office replies within one working day with the school’s official payment instructions for MTN Mobile Money, Airtel Money or bank transfer, issued directly by MOSAI Schools.',
      DONATE.howItWorks[2].text,
    ],
  },
  {
    q: 'Is it safe? What details will you ask for?',
    a: [
      DONATE.assurances[0].text,
      'Never share a mobile money PIN or card number with anyone, including anyone who says they are calling from the school.',
    ],
  },
  {
    q: 'Will I receive a receipt?',
    a: [DONATE.assurances[1].text],
  },
  {
    q: 'Can I give every month or every term, or sponsor a child?',
    a: [
      DONATE.ways[1].text,
      DONATE.ways[2].text,
      'Because nothing is charged through this website, you can change or stop a regular gift at any time by telling the school office.',
    ],
  },
  {
    q: 'Can I give goods, time or a partnership instead of money?',
    a: [DONATE.ways[3].text, DONATE.ways[5].text, DONATE.ways[4].text],
  },
  {
    q: 'Can I see how my gift was used?',
    a: [DONATE.howItWorks[3].text, DONATE.assurances[3].text],
  },
  {
    q: 'I have a question about giving. Who should I contact?',
    a: ['The school office is happy to help, Monday to Friday, 8:00 AM to 4:00 PM.'],
    contact: true,
  },
]
