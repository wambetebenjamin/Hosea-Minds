export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function todayISO(): string {
  const now = new Date()
  return toISODate(now)
}

export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromISODate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, (month ?? 1) - 1, day ?? 1)
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function formatDate(value: string): string {
  const date = fromISODate(value.slice(0, 10))
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(value: string): string {
  const date = new Date(value)
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function daysBetween(start: Date, end: Date): number {
  const ms = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0)
  return Math.round(ms / 86400000)
}

export function shortWeekday(value: string): string {
  return fromISODate(value.slice(0, 10)).toLocaleDateString('en-GB', {
    weekday: 'short',
  })
}

export function longWeekday(value: string): string {
  return fromISODate(value.slice(0, 10)).toLocaleDateString('en-GB', {
    weekday: 'long',
  })
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function excerpt(text: string, length = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= length) return clean
  return `${clean.slice(0, length).trimEnd()}…`
}

export function nextSessionLabel(weekday: number, time: string): string {
  const today = new Date()
  const diff = (weekday - today.getDay() + 7) % 7
  const next = addDays(today, diff === 0 ? 7 : diff)
  return `${next.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })}, ${time}`
}

export function initialsFrom(name: string | null | undefined): string {
  if (!name) return 'HM'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
