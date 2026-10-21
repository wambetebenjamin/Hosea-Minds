import type { JournalEntry } from './types'
import { fromISODate, longWeekday } from './utils'

export function uniqueDates(entries: { date: string }[]): string[] {
  return Array.from(new Set(entries.map((entry) => entry.date))).sort((a, b) => b.localeCompare(a))
}

export function computeStreak(entries: { date: string }[]): number {
  if (entries.length === 0) return 0
  const dates = new Set(entries.map((entry) => entry.date))
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cursor = new Date(today)
  if (!dates.has(toKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
    if (!dates.has(toKey(cursor))) return 0
  }

  let streak = 0
  while (dates.has(toKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

function toKey(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function averageMood(entries: { mood: number }[]): number {
  if (entries.length === 0) return 0
  const total = entries.reduce((sum, entry) => sum + entry.mood, 0)
  return Math.round((total / entries.length) * 10) / 10
}

export function filterByDays(entries: JournalEntry[], days: number): JournalEntry[] {
  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  cutoff.setDate(cutoff.getDate() - (days - 1))
  return entries.filter((entry) => fromISODate(entry.date) >= cutoff)
}

/**
 * Plain language observations, computed only from the entries the person
 * wrote. No inference about diagnosis, causes, or feelings that were not
 * recorded.
 */
export function buildInsights(entries: JournalEntry[], days: number): string[] {
  if (entries.length === 0) {
    return ['Add a few entries and your observations will appear here, written from your own words.']
  }

  const insights: string[] = []
  const windowLabel = days === 7 ? 'the last 7 days' : `the last ${days} days`

  const byWeekday = new Map<string, number[]>()
  for (const entry of entries) {
    const key = longWeekday(entry.date)
    const list = byWeekday.get(key) ?? []
    list.push(entry.mood)
    byWeekday.set(key, list)
  }
  if (byWeekday.size >= 3) {
    const ranked = Array.from(byWeekday.entries())
      .map(([day, moods]) => ({
        day,
        avg: moods.reduce((sum, mood) => sum + mood, 0) / moods.length,
        count: moods.length,
      }))
      .sort((a, b) => b.avg - a.avg)
    const best = ranked[0]
    const lowest = ranked[ranked.length - 1]
    if (best) {
      insights.push(`Your mood was highest on ${best.day}s over ${windowLabel}, averaging ${best.avg.toFixed(1)} out of 5.`)
    }
    if (lowest && lowest.day !== best?.day && lowest.avg < best.avg) {
      insights.push(`${lowest.day}s carried the lowest average mood in that window, at ${lowest.avg.toFixed(1)} out of 5.`)
    }
  }

  if (entries.length >= 4) {
    const ordered = [...entries].sort((a, b) => a.date.localeCompare(b.date))
    const half = Math.floor(ordered.length / 2)
    const earlier = averageMood(ordered.slice(0, half))
    const later = averageMood(ordered.slice(half))
    if (Math.abs(later - earlier) >= 0.2) {
      const direction = later > earlier ? 'up' : 'down'
      insights.push(
        `Your average mood moved ${direction} from ${earlier.toFixed(1)} to ${later.toFixed(1)} across ${windowLabel}.`,
      )
    }
  }

  const tagCounts = new Map<string, number>()
  for (const entry of entries) {
    for (const tag of entry.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }
  if (tagCounts.size > 0) {
    const [topTag, count] = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1])[0] ?? ['', 0]
    if (topTag) {
      insights.push(
        `"${topTag}" appeared in ${count} of your ${entries.length} entries, the most frequent tag you used.`,
      )
    }
  }

  const energyAvg =
    entries.reduce((sum, entry) => sum + entry.energy, 0) / Math.max(entries.length, 1)
  if (entries.length >= 3) {
    insights.push(
      `Your recorded energy averaged ${energyAvg.toFixed(1)} out of 10 across ${entries.length} entries.`,
    )
  }

  return insights.slice(0, 4)
}

export function tagFrequency(entries: JournalEntry[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const entry of entries) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}
