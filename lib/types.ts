export type MoodValue = 1 | 2 | 3 | 4 | 5

export interface JournalEntry {
  id: string
  userId: string
  date: string
  mood: MoodValue
  energy: number
  text: string
  tags: string[]
  photoUrl?: string | null
  createdAt: string
}

export interface CheckIn {
  id: string
  userId: string
  date: string
  mood: MoodValue
  note: string
  createdAt: string
}

export interface UserRecord {
  id: string
  email: string
  displayName: string | null
  passwordHash: string | null
  provider: 'credentials' | 'google'
  prefs: {
    dailyReminder: boolean
    weeklyDigest: boolean
  }
  createdAt: string
}

export interface GroupMessage {
  id: string
  groupSlug: string
  userId: string
  displayName: string
  body: string
  role: 'member' | 'facilitator'
  createdAt: string
}

export interface SessionUser {
  id: string
  email?: string | null
  name?: string | null
}
