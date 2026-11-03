import type { IconName } from './components/Icon'

export const headlines = ['Live Support', 'Call Center', 'Client Care', 'Phone Coverage']

export const statements = [
  {
    title: 'Malate Call Center',
    body: 'John Wilson Malate Jr. leads live phone support for businesses that need a person on the line.',
  },
  {
    title: 'Inbound and outbound',
    body: 'We answer customer calls and place calls from the list you provide.',
  },
  {
    title: 'A written summary',
    body: 'After each call you receive a clear note: who called, what they needed, and the next step.',
  },
]

export const teamMarks = ['M', 'A', 'L', 'A', 'T', 'E']

export const statementMark = 'real person'
export const statementSentence =
  'Customers reach a real person, and every call comes back to you in plain words.'

export const points = [
  { title: 'A person answers.', body: 'Your customer talks to someone. Not a recording.' },
  { title: 'We use your words.', body: 'The team says the greeting and the answers you approve.' },
  { title: 'You get the note.', body: 'After the call, you see what was said and what to do next.' },
]

export type Project = {
  id: number
  title: string
  tags: string[]
  caption: string
  name: string
  note: string
  bubble: string
  role: string
  line: string
  tiles: { title: string; body: string; icon: IconName }[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Inbound calls. We answer when your customers phone you.',
    tags: ['Inbound'],
    caption: 'Customer calling in',
    name: 'A person picks up',
    note: 'During your hours',
    bubble: 'We answer in your company name, ask why they called, and write down what they need.',
    role: 'For your customers',
    line: 'They reach a person. You get the message.',
    tiles: [
      { title: 'Greeting.', body: 'We say the words you approve.', icon: 'call' },
      { title: 'The reason.', body: 'We ask why they called.', icon: 'chat' },
      { title: 'The note.', body: 'You see it the same day.', icon: 'fileCheck' },
      { title: 'Handoff.', body: 'Urgent calls come straight to you.', icon: 'swap' },
    ],
  },
  {
    id: 2,
    title: 'Outbound calls. We phone the list you give us.',
    tags: ['Outbound'],
    caption: 'Calling your list',
    name: 'We place the call',
    note: 'Only your list',
    bubble: 'Give us the names and the reason for the call. We phone them, speak clearly, and mark who answered.',
    role: 'For your list',
    line: 'We call the people you name. We stop when you say stop.',
    tiles: [
      { title: 'Your list.', body: 'We call only those names.', icon: 'book' },
      { title: 'One ask.', body: 'Each call has one clear reason.', icon: 'target' },
      { title: 'The result.', body: 'Answered, no answer, or call back.', icon: 'fileCheck' },
      { title: 'A stop.', body: 'We do not keep calling past it.', icon: 'shield' },
    ],
  },
  {
    id: 3,
    title: 'Customer care. We stay on the line when the call is hard.',
    tags: ['Care'],
    caption: 'A question or a problem',
    name: 'We stay with them',
    note: 'Until it is clear',
    bubble: 'When someone is upset or confused, we listen, repeat the facts, and tell you what they want next.',
    role: 'For the hard calls',
    line: 'A calm voice and a short note. We do not promise what you cannot do.',
    tiles: [
      { title: 'Listen.', body: 'We let them finish.', icon: 'user' },
      { title: 'Repeat.', body: 'We say the problem back.', icon: 'repeat' },
      { title: 'Next step.', body: 'One action, in plain words.', icon: 'arrowRight' },
      { title: 'You decide.', body: 'We pass the choice to you.', icon: 'shield' },
    ],
  },
  {
    id: 4,
    title: 'After hours. Someone still answers when your office is closed.',
    tags: ['Inbound', 'Care'],
    caption: 'Office is closed',
    name: 'Someone still answers',
    note: 'Nights and weekends',
    bubble: 'When you are closed, we pick up, take the message, and mark anything that cannot wait until morning.',
    role: 'For the closed hours',
    line: 'The phone does not go to a recording.',
    tiles: [
      { title: 'Pickup.', body: 'A person, not a machine.', icon: 'phone' },
      { title: 'Message.', body: 'Name, number, and what they need.', icon: 'pencil' },
      { title: 'Urgent.', body: 'We mark calls that cannot wait.', icon: 'pulse' },
      { title: 'Morning.', body: 'You start the day with the list.', icon: 'calendar' },
    ],
  },
]

export const filters = ['Show all', 'Inbound', 'Outbound', 'Care'] as const
export type Filter = (typeof filters)[number]

export const filterMap: Record<Filter, number[]> = {
  'Show all': [1, 2, 3, 4],
  Inbound: [1, 4],
  Outbound: [2],
  Care: [3, 4],
}

export const aboutText =
  'John Wilson Malate Jr. directs Malate Call Center. The team answers calls, records the request, and reports the outcome.'

export const aboutClose = 'A person answers. You get the note.'

export const timeline = [
  { years: 'Weekdays.', line: 'The phones are open through the business day.' },
  { years: 'After hours.', line: 'Someone still picks up when you are closed.' },
  { years: 'Your words.', line: 'The team says the greeting and the answers you approve.' },
  { years: 'The note.', line: 'You hear who called and what they needed.' },
]

export const navItems: { id: string; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'work', label: 'Services', icon: 'briefcase' },
  { id: 'about', label: 'About', icon: 'user' },
]

/** Page sections in scroll order, used for the ruler and active nav state. */
export const sectionIds = ['home', 'teams', 'statement', 'work', 'about', 'contact']
