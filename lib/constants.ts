import type { MoodValue } from './types'

export const SITE = {
  name: 'Hosea Minds',
  tagline: 'Your feelings are valid. Your journey is yours.',
  description:
    'A safe, private space for Kenyans to track mood and anxiety, keep a personal journal, and find gentle peer support.',
  whatsapp: '254112272061',
  email: 'hello@hoseaminds.co.ke',
} as const

export const WHATSAPP_LINK =
  'https://wa.me/254112272061?text=Hi%20Hosea%20Minds%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20platform'

export const CRISIS_WHATSAPP_LINK =
  'https://wa.me/254112272061?text=I%20need%20someone%20to%20talk%20to'

export interface Helpline {
  name: string
  number: string
  tel: string
  note: string
}

export const HELPLINES: Helpline[] = [
  {
    name: 'Befrienders Kenya',
    number: '0800 723 253',
    tel: '0800723253',
    note: 'Free, confidential emotional support, every day of the week.',
  },
  {
    name: 'Mathare Hospital',
    number: '020 2052148',
    tel: '0202052148',
    note: 'Mental health support and referrals in Nairobi.',
  },
  {
    name: "St. John's Ambulance Kenya",
    number: '0800 723 253',
    tel: '0800723253',
    note: 'Toll free emergency support line.',
  },
  {
    name: 'Kenya Red Cross',
    number: '1199',
    tel: '1199',
    note: 'Toll free emergency response, available all day.',
  },
]

export const EMERGENCY_NUMBER = {
  label: 'Emergency services',
  number: '999',
  tel: '999',
}

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/resources', label: 'Resources' },
  { href: '/groups', label: 'Groups' },
  { href: '/tracker', label: 'Tracker' },
  { href: '/about', label: 'About' },
]

export const MOODS: { value: MoodValue; emoji: string; label: string }[] = [
  { value: 1, emoji: '\u{1F622}', label: 'Very sad' },
  { value: 2, emoji: '\u{1F641}', label: 'Sad' },
  { value: 3, emoji: '\u{1F610}', label: 'Neutral' },
  { value: 4, emoji: '\u{1F642}', label: 'Okay' },
  { value: 5, emoji: '\u{1F60A}', label: 'Great' },
]

export const TAGS = ['work', 'family', 'sleep', 'anxiety', 'gratitude'] as const

export const RESOURCE_CATEGORIES = [
  'Anxiety',
  'Depression',
  'Grief',
  'Relationships',
  'Work Stress',
  'Sleep',
  'Self-Esteem',
] as const

export type ResourceType = 'Article' | 'Audio Guide' | 'Exercise' | 'Worksheet'

export interface Resource {
  slug: string
  title: string
  category: (typeof RESOURCE_CATEGORIES)[number]
  type: ResourceType
  readTime: string
  description: string
  body: string[]
  steps?: string[]
}

export const RESOURCES: Resource[] = [
  {
    slug: 'naming-anxiety',
    title: 'Naming what anxiety feels like',
    category: 'Anxiety',
    type: 'Article',
    readTime: '4 min read',
    description:
      'Anxiety in Nairobi traffic, in a lecture hall, in a job interview. Learn to notice it early and describe it in plain words.',
    body: [
      'Anxiety is the body preparing for something it thinks is about to happen. Your heart speeds up, your shoulders lift, your breathing gets shallow. Nothing is wrong with you. Your body is trying to keep you safe.',
      'The first helpful step is naming it out loud, even quietly. "I am feeling anxious right now." Naming moves the feeling from something that is happening to you into something you can observe. Kenyans often grow up hearing that fear should be swallowed. You are allowed to say it instead.',
      'Notice where it lives in your body. A tight chest before a matatu ride. A clenched jaw when a message from family arrives. A hollow stomach on Sunday evening. Write down the place and the moment. Patterns become visible quickly.',
      'Then choose one small, kind action. Step outside for two minutes. Put your feet flat on the floor and breathe out for longer than you breathe in. Message a friend who does not ask you to explain yourself. Anxiety settles faster when it is met with care rather than argument.',
    ],
    steps: [
      'Name the feeling in plain words.',
      'Find where it sits in your body.',
      'Breathe out for four counts, in for four counts, five times.',
      'Choose one small action you can take in the next ten minutes.',
    ],
  },
  {
    slug: 'low-mood-days',
    title: 'When the low days come',
    category: 'Depression',
    type: 'Article',
    readTime: '5 min read',
    description:
      'Low mood is not laziness and it is not a lack of faith. A gentle guide to getting through the flat, heavy days.',
    body: [
      'Some days arrive with a weight in them. Getting out of bed takes an hour. Food tastes like nothing. The things you usually enjoy feel far away. This is a common human experience, and it is also something a professional can help with.',
      'Start smaller than feels reasonable. Not "clean the house" but "open the curtains". Not "call everyone" but "reply to one message". Small actions rebuild a sense of movement, and movement is medicine on flat days.',
      "Keep the day's demands short and written down. A list of three things, one of them kind to yourself, is enough. Tick them off without commentary.",
      'Reach out to one person, even with a single sentence: "Today is heavy, I just wanted to say hello." If low mood lasts more than two weeks, or you stop eating or sleeping, please speak to a health worker. Hosea Minds is a companion, not a replacement for care.',
    ],
    steps: [
      'Open the curtains and drink a glass of water.',
      'Write three things for today, one of them kind.',
      'Send one honest message to one person.',
      'If it lasts two weeks or more, speak to a health worker.',
    ],
  },
  {
    slug: 'grief-companion',
    title: 'A companion for the first year of grief',
    category: 'Grief',
    type: 'Audio Guide',
    readTime: '8 min listen',
    description:
      'For the loss of a parent, a sibling, a friend, an unborn child. No stages, no timetable, only company.',
    body: [
      'Grief in Kenya is often carried publicly. There are funeral committees, fundraising messages, church announcements, and many people in the house. Then everyone goes home, and the quiet arrives.',
      'There is no correct order to grief. You may laugh at a memory and then feel guilty. You may feel nothing for weeks and then cry in a supermarket. This is not a failure to mourn properly.',
      'Find a way to keep speaking to the person you lost. Some people write letters in their journal. Some cook their favourite meal on the anniversary. Some say their name out loud. None of this is strange.',
      'Tell people what you need, because most will guess badly. "I would like company but not conversation" is a complete sentence. So is "I cannot talk about it today".',
    ],
  },
  {
    slug: 'repairing-relationships',
    title: 'Saying the hard thing kindly',
    category: 'Relationships',
    type: 'Worksheet',
    readTime: '10 min exercise',
    description:
      'A simple structure for a difficult conversation with a partner, parent, sibling, or friend, without blame.',
    body: [
      'Most arguments repeat because both people are defending something real. Before you speak, decide what you want the conversation to protect: respect, safety, closeness, or clarity.',
      'Use three short sentences. First, what happened, with no interpretation. Second, how it landed for you. Third, what you are asking for.',
      'For example: "When plans change an hour before we meet, I feel like my time does not matter. Could we agree to tell each other the same day at least?" There is no blame in that sentence, and nothing to argue with.',
      'Then stop talking. Let silence do its work. If the temperature rises, ask for a pause and name when you will return to it. Repair is a habit, not a single conversation.',
    ],
    steps: [
      'What happened, in facts only.',
      'How it landed for you.',
      'What you are asking for.',
      'When you will return to it if it becomes too much.',
    ],
  },
  {
    slug: 'work-burnout',
    title: 'Burnout is not a personality flaw',
    category: 'Work Stress',
    type: 'Article',
    readTime: '4 min read',
    description:
      'For hustle culture, long commutes, and jobs that never quite switch off. Signs to take seriously.',
    body: [
      'Burnout shows up as exhaustion that sleep does not fix, a growing cynicism about work you used to care about, and a feeling that you are less capable than before. It is a response to prolonged pressure, not a weakness of character.',
      'Look at your week honestly. How many hours are you reachable? How many are you actually resting? Rest that involves scrolling is not the same as rest, even when it feels like the only option you have.',
      'Protect one boundary this week and hold it. A lunch break away from the desk. A phone on silent after 9pm. A Sunday where you answer nothing. Small boundaries held consistently do more than grand plans abandoned by Wednesday.',
      'Nairobi is expensive, and you may not be able to change your hours. If that is true, change what surrounds them. Talk to a colleague you trust. Speak to your supervisor using facts about workload rather than feelings about it. And book a real break, even a single day.',
    ],
  },
  {
    slug: 'sleep-wind-down',
    title: 'A wind down for restless nights',
    category: 'Sleep',
    type: 'Audio Guide',
    readTime: '6 min listen',
    description:
      'A slow, practical routine for the nights when your mind starts working at 11pm.',
    body: [
      'Sleep is not something you can force. It arrives when the body feels safe enough to let go. The work is in the hour before, not in the bed.',
      'Dim the room. Put the phone face down in another room if you can, or at least out of reach. Write down tomorrow in three lines so your mind does not have to hold it.',
      'Lie on your back, let your hands rest, and breathe out slowly for six counts, in for four. Do it ten times. If sleep does not come after twenty minutes, get up, sit somewhere dim, and return when you feel heavy again.',
      'If you are waking at 3am with your heart racing most nights, that is worth mentioning to a health worker. Sleep and mood move together, and both respond to support.',
    ],
  },
  {
    slug: 'quiet-confidence',
    title: 'Building quiet confidence',
    category: 'Self-Esteem',
    type: 'Exercise',
    readTime: '8 min exercise',
    description:
      'Confidence is not loud. It is the habit of keeping small promises to yourself.',
    body: [
      'Many of us were raised on correction. Do better, be serious, do not embarrass the family. That voice can become the only one we hear. Confidence is built by adding a second voice, not by silencing the first.',
      'Write down three things you did today, however small. You got through a difficult meeting. You drank water. You apologised first. These are evidence, and evidence changes belief slowly.',
      'Then keep one promise to yourself today. Something entirely within your control: ten minutes of walking, a glass of water before tea, a message you have been avoiding. The size does not matter. The keeping does.',
      'Finally, practise receiving a compliment with only the words "thank you". No deflection, no explanation. Notice how uncomfortable it is. That discomfort is the old voice, and it will soften with repetition.',
    ],
    steps: [
      'List three small things you did today.',
      'Choose one promise you can keep today.',
      'Receive one compliment with "thank you".',
      'Repeat this exercise twice this week.',
    ],
  },
  {
    slug: 'five-four-three-two-one',
    title: 'The 5 4 3 2 1 grounding exercise',
    category: 'Anxiety',
    type: 'Exercise',
    readTime: '5 min exercise',
    description:
      'A short exercise that brings you back into the room when your thoughts are racing.',
    body: [
      'Grounding is the practice of returning attention to the present moment through your senses. It works because your body cannot fully panic while you are deliberately noticing the physical world. You can do this anywhere: in a matatu, at a desk, in a queue, in a hospital corridor.',
      'You do not need a quiet room, a candle, or an app. You need your attention and a few slow breaths. Say each item quietly in your mind or write it in your journal afterwards.',
    ],
    steps: [
      'Name five things you can see. Look slowly, one at a time.',
      'Name four things you can feel. Your feet, your clothes, the chair, the air.',
      'Name three things you can hear, near and far.',
      'Name two things you can smell, or two smells you love.',
      'Name one thing you can taste, or one kind thing you can say to yourself.',
      'Breathe out slowly, then open your eyes and look around the room once more.',
    ],
  },
  {
    slug: 'sleep-shift-worker',
    title: 'Sleep when your hours are not yours',
    category: 'Sleep',
    type: 'Worksheet',
    readTime: '7 min exercise',
    description:
      'A realistic plan for shift work, night shifts, and shared rooms.',
    body: [
      'Shift work asks your body to do something it was not designed for. This is not a reason to give up on rest. It is a reason to be deliberate about it.',
      'Pick an anchor sleep window that stays the same on your days off. Even five hours at the same time teaches the body when rest is available.',
      'Write down three protections you can realistically keep: a dark curtain, a phone that stays outside the room, an agreement with the people you live with about quiet hours. Choose one for this week.',
      'If you often sleep fewer than five hours across four days in a row, speak to a health worker about it. Chronic sleep pressure makes everything else harder to carry.',
    ],
    steps: [
      'Choose your anchor sleep window.',
      'Name one change to your sleep environment.',
      'Ask the people you live with for one specific quiet hour.',
      'Track four nights this week in the journal, without judging them.',
    ],
  },
  {
    slug: 'saying-no',
    title: 'Saying no without guilt',
    category: 'Self-Esteem',
    type: 'Article',
    readTime: '4 min read',
    description:
      'For anyone who was taught that good people are always available.',
    body: [
      'In many Kenyan families, being dependable is a form of love. It is also how people end up saying yes to everything and resenting everyone quietly.',
      'A no does not need an essay behind it. "I cannot this week" is complete. You do not owe anyone an explanation of your finances, your energy, or your diary.',
      'Practise the shorter version of your answer until it fits in your mouth. Write it in your journal. Say it out loud once. The first time will feel rude. The tenth time will feel ordinary.',
      'Notice what happens after you decline something. Usually nothing. The relationship survives, and you have protected the energy that the people closest to you actually need from you.',
    ],
  },
  {
    slug: 'grief-and-family',
    title: 'Grief in a family that grieves differently',
    category: 'Grief',
    type: 'Worksheet',
    readTime: '9 min exercise',
    description:
      'When your way of mourning does not match your family’s way, and both are real.',
    body: [
      'In the same house, one person may want to talk all night and another may want to be quiet. Neither is wrong, and both can feel like rejection to the other.',
      'Explain your way of grieving in one sentence to one family member this week. "I am quiet because I am remembering. It does not mean I do not care."',
      'Agree on a small ritual you can share, such as a meal on a date that matters, or a photo you keep somewhere visible. Shared ritual gives people different ways to be together.',
      'If you are carrying a loss that nobody in the family knows about, a journal, a peer group, or a counsellor can hold it. Grief does not need permission, but it does need somewhere to go.',
    ],
    steps: [
      'Describe your grieving style in one sentence.',
      'Share that sentence with one family member.',
      'Choose one small shared ritual.',
      'Give yourself one hour this week with no obligation.',
    ],
  },
  {
    slug: 'rest-without-guilt',
    title: 'Resting without earning it first',
    category: 'Work Stress',
    type: 'Audio Guide',
    readTime: '5 min listen',
    description: 'A quiet case for rest as a right, not a reward.',
    body: [
      'There is a voice that says rest must be paid for, that you should finish everything before you are allowed to stop. That voice is very convincing and it is not a good manager.',
      'Rest is not the absence of work. It is what makes work possible. Your body does not ask whether the list is empty before it needs to lie down.',
      'Choose a rest that has no output. Not a podcast that teaches you something, not a gym session that is tracked. Sit on a chair. Look at a tree. Let your mind wander without directing it.',
      'If guilt arrives during rest, greet it plainly: "This is guilt, not an emergency." Let it sit next to you without obeying it.',
    ],
  },
]

export const PARTNERS = ['Befrienders Kenya', 'Mathare Mental Health Hospital']

export const TESTIMONIALS = [
  {
    quote:
      'I started writing here on a Sunday night when I could not speak to anyone. Twelve weeks later I can see that the difficult days come in a pattern, and patterns can be planned for. Nobody asked me to explain myself.',
    name: 'User from Nairobi',
    detail: 'Journaling since March',
    initials: 'N',
  },
  {
    quote:
      'The check in takes under a minute. On the days I want to disappear from everyone, it is the one thing I still do. Small, but it is mine.',
    name: 'Member from Kisumu',
    detail: 'Weekly check in',
    initials: 'K',
  },
  {
    quote:
      'I joined the men and mental health group expecting arguments. I found people my age saying things I had only ever thought quietly. That changed how I speak to my brother.',
    name: 'Member from Mombasa',
    detail: 'Peer support group member',
    initials: 'M',
  },
]

export interface GroupInfo {
  slug: string
  name: string
  topic: string
  members: number
  day: string
  time: string
  weekday: number
  timeLabel: string
  description: string
  facilitator: string
  resources: { title: string; note: string }[]
}

export const GROUPS: GroupInfo[] = [
  {
    slug: 'anxiety-support',
    name: 'Anxiety Support',
    topic: 'Living with worry, panic, and a racing mind',
    members: 148,
    day: 'Tuesday',
    time: '7:00 pm',
    weekday: 2,
    timeLabel: '7:00 pm EAT',
    description:
      'A slow, facilitated space for people who live with constant worry or panic. No advice is forced on anyone, and silence counts as participation.',
    facilitator: 'Facilitator, Hosea Minds',
    resources: [
      {
        title: 'The 5 4 3 2 1 grounding exercise',
        note: 'Use this when your thoughts start racing. It works in a matatu too.',
      },
      {
        title: 'Breathing script for panic',
        note: 'Read out loud, slowly. Four out, four in. Repeat ten times.',
      },
    ],
  },
  {
    slug: 'grief-and-loss',
    name: 'Grief and Loss',
    topic: 'Carrying a loss at your own pace',
    members: 96,
    day: 'Wednesday',
    time: '7:30 pm',
    weekday: 3,
    timeLabel: '7:30 pm EAT',
    description:
      'For anyone who has lost someone, recently or years ago. You are welcome to say the name of the person you are missing, or to simply sit with us.',
    facilitator: 'Facilitator, Hosea Minds',
    resources: [
      {
        title: 'A companion for the first year of grief',
        note: 'Read slowly. There is no timetable for any of it.',
      },
      {
        title: 'Writing a letter to the person you lost',
        note: 'A one page exercise you can do in your journal.',
      },
    ],
  },
  {
    slug: 'student-wellbeing',
    name: 'Student Wellbeing',
    topic: 'Exams, pressure, money, and family expectations',
    members: 212,
    day: 'Thursday',
    time: '6:30 pm',
    weekday: 4,
    timeLabel: '6:30 pm EAT',
    description:
      'For students in universities, colleges, and TVETs. Talk about the pressure of being the one everyone expects to succeed.',
    facilitator: 'Facilitator, Hosea Minds',
    resources: [
      {
        title: 'Exam season survival plan',
        note: 'A one page plan covering sleep, food, and study blocks.',
      },
      {
        title: 'Talking to family about a failed unit',
        note: 'Three sentences you can borrow when the conversation feels impossible.',
      },
    ],
  },
  {
    slug: 'men-and-mental-health',
    name: 'Men and Mental Health',
    topic: 'An open room for men to speak without performance',
    members: 134,
    day: 'Monday',
    time: '8:00 pm',
    weekday: 1,
    timeLabel: '8:00 pm EAT',
    description:
      'A space where men can say the things they were told to swallow. Confidential, gently facilitated, and never a place to compare struggles.',
    facilitator: 'Facilitator, Hosea Minds',
    resources: [
      {
        title: 'What to say when you do not know what to say',
        note: 'A short list of sentences that keep a conversation open.',
      },
      {
        title: 'Sleep and shift work',
        note: 'For those whose days begin when everyone else is sleeping.',
      },
    ],
  },
  {
    slug: 'parenting-stress',
    name: 'Parenting Stress',
    topic: 'Raising children while keeping yourself whole',
    members: 87,
    day: 'Saturday',
    time: '10:00 am',
    weekday: 6,
    timeLabel: '10:00 am EAT',
    description:
      'For parents and caregivers carrying school fees, safety worries, and their own histories. You are allowed to find this hard.',
    facilitator: 'Facilitator, Hosea Minds',
    resources: [
      {
        title: 'Repair after shouting',
        note: 'What to say to a child after a hard moment. Short and practical.',
      },
      {
        title: 'Rest for caregivers',
        note: 'Three ways to find ten minutes in a day that is already full.',
      },
    ],
  },
  {
    slug: 'work-burnout',
    name: 'Work Burnout',
    topic: 'Jobs that never switch off',
    members: 173,
    day: 'Sunday',
    time: '5:00 pm',
    weekday: 0,
    timeLabel: '5:00 pm EAT',
    description:
      'For people running on empty across offices, salons, hospitals, and side hustles. Bring one boundary you want to hold this week.',
    facilitator: 'Facilitator, Hosea Minds',
    resources: [
      {
        title: 'Burnout is not a personality flaw',
        note: 'Understand what prolonged pressure does to the body.',
      },
      {
        title: 'One boundary for one week',
        note: 'A short worksheet to pick something you can actually hold.',
      },
    ],
  },
  {
    slug: 'general-wellness',
    name: 'General Wellness',
    topic: 'An open group for anything on your mind',
    members: 259,
    day: 'Friday',
    time: '7:00 pm',
    weekday: 5,
    timeLabel: '7:00 pm EAT',
    description:
      'No fixed topic. A warm weekly room for anyone who wants company, needs to speak, or simply wants to read what others are carrying.',
    facilitator: 'Facilitator, Hosea Minds',
    resources: [
      {
        title: 'Quick daily check in',
        note: 'One minute, one sentence, one mood. That is enough.',
      },
      {
        title: 'Building quiet confidence',
        note: 'Confidence is the habit of keeping small promises to yourself.',
      },
    ],
  },
]

export const FEATURES = [
  {
    title: 'Mood Journal',
    icon: 'book',
    href: '/journal',
    description:
      'A private page for your day. Write freely, tag what is present, and keep the words only you get to read.',
  },
  {
    title: 'Anxiety Tracker',
    icon: 'activity',
    href: '/tracker',
    description:
      'See how your mood and energy move across weeks, so patterns stop arriving as surprises.',
  },
  {
    title: 'Weekly Insights',
    icon: 'sparkles',
    href: '/tracker',
    description:
      'Plain language observations from your own entries, with no assumptions and no scoring of your life.',
  },
  {
    title: 'Peer Support Groups',
    icon: 'users',
    href: '/groups',
    description:
      'Seven small groups, gently facilitated. Anxiety, grief, students, men, parents, burnout, and everything else.',
  },
  {
    title: 'Self-Help Resources',
    icon: 'leaf',
    href: '/resources',
    description:
      'Short articles, audio guides, worksheets, and exercises written for Kenyan life. Open to everyone, no account needed.',
  },
  {
    title: 'Emergency Contacts',
    icon: 'lifebuoy',
    href: '/crisis',
    description:
      'Helplines that answer, one tap away, at any hour. No forms, no login, no explanations required.',
  },
] as const

export const PRIVACY_PROMISES = [
  'Your journal entries are tied to your account and never shown to other members.',
  'No advertising pixels. No Facebook Pixel, no TikTok Pixel, no data brokers.',
  'You can export your tracker as a PDF, and delete everything in one action.',
  'Group messages show only the display name you choose, or "Anonymous".',
]
