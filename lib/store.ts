import {
  checkinsKey,
  emailKey,
  groupMessagesKey,
  groupSeedKey,
  journalKey,
  membershipsKey,
  newId,
  readJson,
  removeKey,
  userKey,
  writeJson,
} from './kv'
import { GROUPS } from './constants'
import type {
  CheckIn,
  GroupMessage,
  JournalEntry,
  MoodValue,
  UserRecord,
} from './types'

/* ------------------------------- users --------------------------------- */

export async function getUserByEmail(email: string): Promise<UserRecord | null> {
  const id = await readJson<string | null>(emailKey(email), null)
  if (!id) return null
  return getUserById(id)
}

export async function getUserById(id: string): Promise<UserRecord | null> {
  const user = await readJson<UserRecord | null>(userKey(id), null)
  return user
}

export async function createUser(input: {
  email: string
  displayName?: string | null
  passwordHash?: string | null
  provider: 'credentials' | 'google'
}): Promise<UserRecord> {
  const email = input.email.trim().toLowerCase()
  const existing = await getUserByEmail(email)
  if (existing) return existing

  const user: UserRecord = {
    id: newId('user'),
    email,
    displayName: input.displayName?.trim() || null,
    passwordHash: input.passwordHash ?? null,
    provider: input.provider,
    prefs: { dailyReminder: true, weeklyDigest: true },
    createdAt: new Date().toISOString(),
  }

  await writeJson(userKey(user.id), user)
  await writeJson(emailKey(email), user.id)
  return user
}

export async function updateUser(
  id: string,
  patch: {
    displayName?: string | null
    prefs?: { dailyReminder?: boolean; weeklyDigest?: boolean }
  },
): Promise<UserRecord | null> {
  const user = await getUserById(id)
  if (!user) return null
  const nextPrefs = {
    dailyReminder: patch.prefs?.dailyReminder ?? user.prefs.dailyReminder,
    weeklyDigest: patch.prefs?.weeklyDigest ?? user.prefs.weeklyDigest,
  }
  const next: UserRecord = {
    ...user,
    displayName: patch.displayName === undefined ? user.displayName : patch.displayName,
    prefs: nextPrefs,
  }
  await writeJson(userKey(id), next)
  return next
}

/* ------------------------------ journal -------------------------------- */

export async function listJournal(userId: string): Promise<JournalEntry[]> {
  const entries = await readJson<JournalEntry[]>(journalKey(userId), [])
  return entries.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
}

export async function addJournalEntry(
  entry: Omit<JournalEntry, 'id' | 'createdAt'>,
): Promise<JournalEntry> {
  const entries = await listJournal(entry.userId)
  const record: JournalEntry = {
    ...entry,
    id: newId('entry'),
    createdAt: new Date().toISOString(),
  }
  await writeJson(journalKey(entry.userId), [record, ...entries])
  return record
}

/* ------------------------------ check ins ------------------------------ */

export async function listCheckIns(userId: string): Promise<CheckIn[]> {
  const entries = await readJson<CheckIn[]>(checkinsKey(userId), [])
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function addCheckIn(input: {
  userId: string
  date: string
  mood: MoodValue
  note: string
}): Promise<CheckIn> {
  const existing = await listCheckIns(input.userId)
  const record: CheckIn = {
    ...input,
    id: newId('checkin'),
    createdAt: new Date().toISOString(),
  }
  await writeJson(checkinsKey(input.userId), [record, ...existing])
  return record
}

/* ------------------------------ memberships ---------------------------- */

export async function listMemberships(userId: string): Promise<string[]> {
  return readJson<string[]>(membershipsKey(userId), [])
}

export async function setMemberships(userId: string, slugs: string[]): Promise<string[]> {
  const allowed = slugs.filter((slug) => GROUPS.some((group) => group.slug === slug))
  const unique = Array.from(new Set(allowed))
  await writeJson(membershipsKey(userId), unique)
  return unique
}

/* ------------------------------ group chat ----------------------------- */

function welcomeMessages(slug: string): GroupMessage[] {
  const group = GROUPS.find((item) => item.slug === slug)
  if (!group) return []
  const base = new Date(Date.now() - 86400000 * 2).toISOString()
  return [
    {
      id: `seed_${slug}_1`,
      groupSlug: slug,
      userId: 'facilitator',
      displayName: 'Facilitator',
      body: `Karibu to ${group.name}. This is a confidential room. What is shared here stays here. You can read quietly for as long as you need, and you never have to explain yourself.`,
      role: 'facilitator',
      createdAt: base,
    },
    {
      id: `seed_${slug}_2`,
      groupSlug: slug,
      userId: 'facilitator',
      displayName: 'Facilitator',
      body: `Our next session is ${group.day} at ${group.time}. We open with a short grounding exercise, then go around the room for whoever wants to speak. No camera, no pressure.`,
      role: 'facilitator',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]
}

export async function listGroupMessages(slug: string): Promise<GroupMessage[]> {
  const seeded = await readJson<boolean>(groupSeedKey(slug), false)
  const existing = await readJson<GroupMessage[]>(groupMessagesKey(slug), [])
  if (!seeded) {
    // Only seed an untouched room, so a member's first message is never lost.
    if (existing.length === 0) {
      await writeJson(groupMessagesKey(slug), welcomeMessages(slug))
    }
    await writeJson(groupSeedKey(slug), true)
  }
  const messages = await readJson<GroupMessage[]>(groupMessagesKey(slug), [])
  return messages.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

export async function addGroupMessage(message: Omit<GroupMessage, 'id' | 'createdAt'>) {
  await listGroupMessages(message.groupSlug)
  const messages = await readJson<GroupMessage[]>(groupMessagesKey(message.groupSlug), [])
  const record: GroupMessage = {
    ...message,
    id: newId('msg'),
    createdAt: new Date().toISOString(),
  }
  await writeJson(groupMessagesKey(message.groupSlug), [...messages, record])
  return record
}

/* -------------------------------- erasure ------------------------------ */

export async function eraseUserData(userId: string, email: string) {
  const journalSlugs: string[] = []

  const entries = await listJournal(userId)
  for (const entry of entries) {
    if (entry.photoUrl) journalSlugs.push(entry.photoUrl)
  }

  const groups = await Promise.all(GROUPS.map((group) => readJson<GroupMessage[]>(groupMessagesKey(group.slug), [])))
  for (const [index, messages] of groups.entries()) {
    const slug = GROUPS[index]?.slug
    if (!slug) continue
    const remaining = messages.filter((message) => message.userId !== userId)
    if (remaining.length !== messages.length) {
      await writeJson(groupMessagesKey(slug), remaining)
    }
  }

  await removeKey(journalKey(userId))
  await removeKey(checkinsKey(userId))
  await removeKey(membershipsKey(userId))
  await removeKey(userKey(userId))
  await removeKey(emailKey(email))

  return { photoUrls: journalSlugs, journalEntries: entries.length }
}
