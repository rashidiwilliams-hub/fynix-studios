// ==========================================================================
// Flowspace — shared demo data
// Every page (index/analytics/teams/documents/settings) reads from this file.
// All figures are fictional, for portfolio-demo purposes only.
// ==========================================================================

const TEAM = [
  {
    id: 'daniel-cross',
    name: 'Daniel Cross',
    role: 'Creative Director',
    project: 'Nimbus Rebrand',
    avatar: 'assets/images/team-daniel-cross.jpg',
    hours: 34,
    status: 'Active',
    email: 'daniel.cross@flowspace.app',
    initials: 'DC'
  },
  {
    id: 'marisol-vega',
    name: 'Marisol Vega',
    role: 'Senior Copywriter',
    project: 'Cascade Onboarding',
    avatar: 'assets/images/team-marisol-vega.jpg',
    hours: 29,
    status: 'Active',
    email: 'marisol.vega@flowspace.app',
    initials: 'MV'
  },
  {
    id: 'mei-lin',
    name: 'Mei Lin',
    role: 'Product Designer',
    project: 'Fintrack Mobile App',
    avatar: 'assets/images/team-mei-lin.jpg',
    hours: 37,
    status: 'Active',
    email: 'mei.lin@flowspace.app',
    initials: 'ML'
  },
  {
    id: 'camila-rios',
    name: 'Camila Rios',
    role: 'Account Manager',
    project: 'Harbor Retail Site',
    avatar: 'assets/images/team-camila-rios.jpg',
    hours: 22,
    status: 'Away',
    email: 'camila.rios@flowspace.app',
    initials: 'CR'
  },
  {
    id: 'andres-solano',
    name: 'Andrés Solano',
    role: 'Backend Engineer',
    project: 'Fintrack Mobile App',
    avatar: 'assets/images/team-andres-solano.jpg',
    hours: 41,
    status: 'Active',
    email: 'andres.solano@flowspace.app',
    initials: 'AS'
  },
  {
    id: 'layla-haddad',
    name: 'Layla Haddad',
    role: 'Marketing Strategist',
    project: 'Cascade Onboarding',
    avatar: 'assets/images/team-layla-haddad.jpg',
    hours: 26,
    status: 'Active',
    email: 'layla.haddad@flowspace.app',
    initials: 'LH'
  },
  {
    id: 'priya-anand',
    name: 'Priya Anand',
    role: 'QA Engineer',
    project: 'Nimbus Rebrand',
    avatar: 'assets/images/team-priya-anand.jpg',
    hours: 31,
    status: 'Active',
    email: 'priya.anand@flowspace.app',
    initials: 'PA'
  },
  {
    id: 'marco-diaz',
    name: 'Marco Díaz',
    role: 'Frontend Engineer',
    project: 'Harbor Retail Site',
    avatar: 'assets/images/team-marco-diaz.jpg',
    hours: 33,
    status: 'Away',
    email: 'marco.diaz@flowspace.app',
    initials: 'MD'
  }
];

// Demo signed-in user
const CURRENT_USER = {
  name: 'Victoria Bryant',
  role: 'Operations Administrator',
  email: 'victoria.bryant@flowspace.app',
  initials: 'VB',
  avatar: 'assets/images/user-avatar.jpg'
};

// TASKS: `when` groups the four "My Tasks" tabs on the dashboard.
// Seed tasks use fixed ids; tasks added via the "+ Add Task" form get new ids at runtime.
const TASKS = [
  // ---- Today ----
  {
    id: 't-101',
    project: 'Nimbus Rebrand',
    title: 'Finalize brand color palette',
    description: "Lock the primary and secondary palette before tomorrow's client review.",
    team: ['daniel-cross', 'priya-anand', 'mei-lin'],
    progress: 70,
    when: 'today'
  },
  {
    id: 't-102',
    project: 'Fintrack Mobile App',
    title: 'Fix onboarding crash on Android',
    description: 'Reproduce and patch the crash reported on Pixel devices running Android 14.',
    team: ['andres-solano', 'mei-lin'],
    progress: 45,
    when: 'today'
  },
  {
    id: 't-103',
    project: 'Cascade Onboarding',
    title: 'Draft welcome email sequence',
    description: 'Three-email sequence for new workspace sign-ups, tone-matched to the brand voice doc.',
    team: ['marisol-vega', 'layla-haddad'],
    progress: 30,
    when: 'today'
  },
  {
    id: 't-104',
    project: 'Harbor Retail Site',
    title: 'QA checkout flow',
    description: 'Full pass on cart, discount codes and payment failure states.',
    team: ['priya-anand', 'marco-diaz'],
    progress: 85,
    when: 'today'
  },
  {
    id: 't-105',
    project: 'Solstice Marketing Site',
    title: 'Approve homepage wireframes',
    description: 'Sign off on the homepage and pricing page wireframes before development starts.',
    team: ['camila-rios', 'layla-haddad'],
    progress: 20,
    when: 'today'
  },

  // ---- Upcoming ----
  {
    id: 't-201',
    project: 'Nimbus Rebrand',
    title: 'Present final brand guidelines',
    description: 'Walk the client through the finished guidelines deck and usage rules.',
    team: ['daniel-cross', 'camila-rios'],
    progress: 15,
    when: 'upcoming'
  },
  {
    id: 't-202',
    project: 'Fintrack Mobile App',
    title: 'Kick off App Store submission',
    description: 'Prepare screenshots, metadata and privacy answers for review.',
    team: ['andres-solano', 'mei-lin'],
    progress: 5,
    when: 'upcoming'
  },
  {
    id: 't-203',
    project: 'Solstice Marketing Site',
    title: 'Kickoff call with Solstice team',
    description: 'Discovery call to confirm scope, timeline and success metrics.',
    team: ['camila-rios', 'layla-haddad'],
    progress: 0,
    when: 'upcoming'
  },
  {
    id: 't-204',
    project: 'Cascade Onboarding',
    title: 'Finalize pricing tier copy',
    description: 'Lock the final wording for each pricing tier ahead of the site relaunch.',
    team: ['marisol-vega'],
    progress: 10,
    when: 'upcoming'
  },
  {
    id: 't-205',
    project: 'Harbor Retail Site',
    title: 'Schedule post-launch retro',
    description: 'Coordinate calendars for a retro with the client and internal team after launch.',
    team: ['camila-rios', 'marco-diaz'],
    progress: 0,
    when: 'upcoming'
  },

  // ---- This Week ----
  {
    id: 't-301',
    project: 'Cascade Onboarding',
    title: 'User test onboarding flow',
    description: 'Run five moderated sessions on the new signup-to-activation path.',
    team: ['marisol-vega', 'mei-lin', 'layla-haddad'],
    progress: 40,
    when: 'this-week'
  },
  {
    id: 't-302',
    project: 'Harbor Retail Site',
    title: 'Ship staging build to client',
    description: 'Deploy latest build to staging and share the walkthrough notes.',
    team: ['marco-diaz', 'camila-rios'],
    progress: 60,
    when: 'this-week'
  },
  {
    id: 't-303',
    project: 'Nimbus Rebrand',
    title: 'Deliver social templates pack',
    description: 'Twelve templates across three platforms in the new visual system.',
    team: ['daniel-cross', 'priya-anand'],
    progress: 50,
    when: 'this-week'
  },
  {
    id: 't-304',
    project: 'Fintrack Mobile App',
    title: 'Optimize app startup time',
    description: 'Profile cold start performance and trim the initial bundle size.',
    team: ['andres-solano', 'mei-lin'],
    progress: 35,
    when: 'this-week'
  },
  {
    id: 't-305',
    project: 'Solstice Marketing Site',
    title: 'Build out blog template',
    description: 'Design and implement the reusable blog post template in the new CMS.',
    team: ['layla-haddad', 'daniel-cross'],
    progress: 55,
    when: 'this-week'
  },

  // ---- Prior Week ----
  {
    id: 't-401',
    project: 'Fintrack Mobile App',
    title: 'Wireframe settings screen',
    description: 'Low-fidelity wireframes for account, notifications and billing settings.',
    team: ['mei-lin'],
    progress: 100,
    when: 'prior-week'
  },
  {
    id: 't-402',
    project: 'Cascade Onboarding',
    title: 'Content audit for legacy docs',
    description: 'Catalogue outdated help-center articles ahead of the rewrite.',
    team: ['marisol-vega'],
    progress: 100,
    when: 'prior-week'
  },
  {
    id: 't-403',
    project: 'Harbor Retail Site',
    title: 'Vendor contract signed',
    description: 'Final signatures collected from Harbor Retail and the fulfilment vendor.',
    team: ['camila-rios'],
    progress: 100,
    when: 'prior-week'
  },
  {
    id: 't-404',
    project: 'Nimbus Rebrand',
    title: 'Competitor visual audit',
    description: 'Landscape review of six competitor identities to inform direction.',
    team: ['priya-anand', 'daniel-cross'],
    progress: 90,
    when: 'prior-week'
  },
  {
    id: 't-405',
    project: 'Solstice Marketing Site',
    title: 'Sign discovery scope document',
    description: 'Client signed off on the discovery findings and locked the project scope.',
    team: ['camila-rios'],
    progress: 100,
    when: 'prior-week'
  }
];

// EVENTS: `dayOffset` is relative to "today" (0 = today, 1 = tomorrow, -1 = yesterday).
// The dashboard calendar strip resolves these to real calendar dates at render time.
const EVENTS = [
  {
    id: 'e-1',
    dayOffset: -1,
    time: '9:00 AM',
    title: 'Harbor Retail Staging Review',
    description: 'Walk through the staging build with the Harbor Retail stakeholders.',
    team: ['marco-diaz', 'priya-anand'],
    completed: true
  },
  {
    id: 'e-2',
    dayOffset: 0,
    time: '11:00 AM',
    title: 'Client Sync — Nimbus Rebrand',
    description: 'Review palette and typography direction with the Nimbus marketing team.',
    team: ['daniel-cross', 'mei-lin', 'priya-anand'],
    completed: false
  },
  {
    id: 'e-3',
    dayOffset: 0,
    time: '2:30 PM',
    title: 'Weekly Design Crit',
    description: 'Internal design review across all active projects.',
    team: ['mei-lin', 'marco-diaz'],
    completed: false
  },
  {
    id: 'e-4',
    dayOffset: 1,
    time: '10:00 AM',
    title: 'Fintrack Sprint Planning',
    description: 'Plan the next two-week sprint for the Fintrack mobile app team.',
    team: ['andres-solano', 'mei-lin'],
    completed: false
  },
  {
    id: 'e-5',
    dayOffset: 2,
    time: '3:00 PM',
    title: 'Solstice Kickoff Call',
    description: 'Discovery call to confirm scope and timeline for the Solstice project.',
    team: ['camila-rios', 'layla-haddad'],
    completed: false
  },
  {
    id: 'e-6',
    dayOffset: 3,
    time: '1:00 PM',
    title: 'Cascade Onboarding User Testing',
    description: 'Moderated usability sessions on the new activation flow.',
    team: ['marisol-vega', 'layla-haddad'],
    completed: false
  }
];

// DOCUMENTS: file manager entries shown on documents.html
const DOCUMENTS = [
  { id: 'd-1', name: 'Invoice #1042 — Nimbus Rebrand.pdf', type: 'invoice', project: 'Nimbus Rebrand', uploadedBy: 'Daniel Cross', date: '2026-09-02', size: '214 KB' },
  { id: 'd-2', name: 'Receipt — Adobe Creative Cloud.pdf', type: 'receipt', project: 'Studio Ops', uploadedBy: 'Victoria Bryant', date: '2026-08-28', size: '88 KB' },
  { id: 'd-3', name: 'Contract — Harbor Retail Site MSA.pdf', type: 'bill', project: 'Harbor Retail Site', uploadedBy: 'Camila Rios', date: '2026-08-15', size: '1.2 MB' },
  { id: 'd-4', name: 'Design Handoff — Fintrack.fig', type: 'design', project: 'Fintrack Mobile App', uploadedBy: 'Mei Lin', date: '2026-09-05', size: '6.4 MB' },
  { id: 'd-5', name: 'Content Strategy.docx', type: 'report', project: 'Cascade Onboarding', uploadedBy: 'Marisol Vega', date: '2026-08-30', size: '340 KB' },
  { id: 'd-6', name: 'Invoice #1041 — Cascade Onboarding.pdf', type: 'invoice', project: 'Cascade Onboarding', uploadedBy: 'Victoria Bryant', date: '2026-08-20', size: '198 KB' },
  { id: 'd-7', name: 'Receipt — Figma Team Plan.pdf', type: 'receipt', project: 'Studio Ops', uploadedBy: 'Victoria Bryant', date: '2026-08-01', size: '76 KB' },
  { id: 'd-8', name: 'Proposal — Solstice Marketing Site.pdf', type: 'bill', project: 'Solstice Marketing Site', uploadedBy: 'Camila Rios', date: '2026-09-08', size: '512 KB' },
  { id: 'd-9', name: 'Brand Guidelines Draft.pdf', type: 'report', project: 'Nimbus Rebrand', uploadedBy: 'Daniel Cross', date: '2026-09-09', size: '2.1 MB' },
  { id: 'd-10', name: 'Invoice #1043 — Harbor Retail Site.pdf', type: 'invoice', project: 'Harbor Retail Site', uploadedBy: 'Victoria Bryant', date: '2026-09-10', size: '226 KB' }
];

// Weekly hours logged per project — used on analytics.html for the bar chart
const WEEKLY_HOURS = [
  { label: 'Mon', hours: 28 },
  { label: 'Tue', hours: 34 },
  { label: 'Wed', hours: 31 },
  { label: 'Thu', hours: 39 },
  { label: 'Fri', hours: 27 },
  { label: 'Sat', hours: 9 },
  { label: 'Sun', hours: 4 }
];

const MONTHLY_REVENUE = [
  { label: 'Apr', value: 18400 },
  { label: 'May', value: 21200 },
  { label: 'Jun', value: 19800 },
  { label: 'Jul', value: 24600 },
  { label: 'Aug', value: 27300 },
  { label: 'Sep', value: 25950 }
];

const PROJECT_EXPENDITURE = [
  { project: 'Nimbus Rebrand', spent: 12496.05, budget: 18000 },
  { project: 'Fintrack Mobile App', spent: 24310.4, budget: 32000 },
  { project: 'Harbor Retail Site', spent: 8720.0, budget: 15000 },
  { project: 'Cascade Onboarding', spent: 6180.5, budget: 10000 }
];

// Tasks completed per week across the whole studio — used for the analytics.html
// team velocity line chart.
const VELOCITY_WEEKS = [
  { label: 'Wk 1', tasks: 14 },
  { label: 'Wk 2', tasks: 18 },
  { label: 'Wk 3', tasks: 16 },
  { label: 'Wk 4', tasks: 21 },
  { label: 'Wk 5', tasks: 19 },
  { label: 'Wk 6', tasks: 24 },
  { label: 'Wk 7', tasks: 22 },
  { label: 'Wk 8', tasks: 27 }
];

// ACTIVITY_FEED: recent studio activity shown in the dashboard rail's
// "Recent Activity" card.
const ACTIVITY_FEED = [
  { id: 'a-1', member: 'priya-anand', verb: 'completed', target: 'QA checkout flow', time: '32m ago' },
  { id: 'a-2', member: 'daniel-cross', verb: 'uploaded', target: 'Brand Guidelines Draft.pdf', time: '1h ago' },
  { id: 'a-3', member: 'mei-lin', verb: 'commented on', target: 'Fix onboarding crash on Android', time: '2h ago' },
  { id: 'a-4', member: 'marisol-vega', verb: 'completed', target: 'Content audit for legacy docs', time: 'Yesterday' },
  { id: 'a-5', member: 'marco-diaz', verb: 'shipped the staging build for', target: 'Harbor Retail Site', time: 'Yesterday' }
];

// NOTIFICATIONS / MESSAGES: content for the topbar bell + mail dropdown panels.
const NOTIFICATIONS = [
  { id: 'n-1', title: 'Weekly Design Crit starts in 30 minutes', time: 'Today, 2:00 PM', read: false },
  { id: 'n-2', title: 'Priya Anand marked "QA checkout flow" complete', time: '32m ago', read: false },
  { id: 'n-3', title: 'Fintrack Mobile App budget just crossed 75%', time: '3h ago', read: false },
  { id: 'n-4', title: 'Solstice Marketing Site kickoff confirmed for Friday', time: 'Yesterday', read: true }
];

const MESSAGES = [
  { id: 'm-1', member: 'daniel-cross', preview: 'Sent over the final palette — take a look before the client call.', time: '12m ago', unread: true },
  { id: 'm-2', member: 'mei-lin', preview: 'Can you review the settings wireframes when you get a sec?', time: '48m ago', unread: true },
  { id: 'm-3', member: 'camila-rios', preview: 'Harbor Retail signed off on the staging build 🎉', time: '2h ago', unread: false }
];

function teamMemberById(id) {
  return TEAM.find((m) => m.id === id);
}

// Every distinct project name referenced anywhere in the demo data —
// used to populate project filter dropdowns on teams.html / documents.html.
function allProjectNames() {
  const set = new Set();
  TEAM.forEach((m) => set.add(m.project));
  TASKS.forEach((t) => set.add(t.project));
  DOCUMENTS.forEach((d) => set.add(d.project));
  return Array.from(set).sort();
}
