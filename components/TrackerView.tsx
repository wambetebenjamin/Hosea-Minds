'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Download, Flame, Loader2, Lock, Sparkles } from 'lucide-react'
import { buildInsights, computeStreak, filterByDays, tagFrequency, uniqueDates } from '@/lib/insights'
import { exportTrackerPdf } from '@/lib/pdf'
import { MOODS } from '@/lib/constants'
import { formatDate, shortWeekday } from '@/lib/utils'
import type { JournalEntry } from '@/lib/types'
import { StreakCounter } from './StreakCounter'

const RANGES = [
  { days: 7, label: 'Last 7 days' },
  { days: 30, label: 'Last 30 days' },
  { days: 90, label: 'Last 90 days' },
]

const AXIS_TICK = { fontSize: 12, fill: '#4A5B71' } as const

export function TrackerView({
  entries,
  displayName,
}: {
  entries: JournalEntry[]
  displayName: string | null
}) {
  const [days, setDays] = useState(30)
  const [exporting, setExporting] = useState(false)
  const chartRef = useRef<HTMLDivElement | null>(null)

  const windowed = useMemo(() => filterByDays(entries, days), [entries, days])
  const streak = useMemo(() => computeStreak(entries), [entries])
  const insights = useMemo(() => buildInsights(windowed, days), [windowed, days])
  const tags = useMemo(() => tagFrequency(windowed), [windowed])

  const moodSeries = useMemo(() => {
    const ordered = [...windowed].sort((a, b) => a.date.localeCompare(b.date))
    return ordered.map((entry) => ({
      date: formatDate(entry.date),
      short: shortWeekday(entry.date),
      mood: entry.mood,
      energy: entry.energy,
    }))
  }, [windowed])

  const onExport = async () => {
    setExporting(true)
    try {
      await exportTrackerPdf({ displayName, entries: windowed, days })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="inline-flex flex-wrap gap-2 rounded-xl bg-light p-1.5"
          role="group"
          aria-label="Date range"
        >
          {RANGES.map((range) => (
            <button
              key={range.days}
              type="button"
              onClick={() => setDays(range.days)}
              aria-pressed={days === range.days}
              className={`inline-flex items-center justify-center min-h-[44px] rounded-lg px-4 text-sm font-semibold transition-colors ${
                days === range.days ? 'bg-white text-primary shadow-sm' : 'text-dark/60 hover:text-dark'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onExport}
          disabled={exporting || windowed.length === 0}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[44px] rounded-xl bg-primary px-5 font-display font-semibold text-white btn-primary disabled:opacity-60"
        >
          {exporting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Download className="h-4 w-4" aria-hidden="true" />
          )}
          {exporting ? 'Preparing PDF' : 'Export to PDF'}
        </button>
      </div>

      {windowed.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-dark/15 bg-white p-10 text-center">
          <h2 className="font-display text-xl font-semibold text-dark">Nothing to chart yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-dark/60">
            Add your first journal entry and your mood and energy lines will appear here within moments.
          </p>
          <Link
            href="/journal"
            className="mt-5 inline-flex items-center justify-center min-h-[44px] rounded-xl bg-primary px-5 text-sm font-semibold text-white btn-primary"
          >
            Write an entry
          </Link>
        </div>
      ) : (
        <div ref={chartRef} className="space-y-6">
          <section className="card-soft p-5 sm:p-6" aria-labelledby="mood-chart-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="mood-chart-heading" className="font-display text-lg sm:text-xl font-semibold text-dark">
                Daily mood score
              </h2>
              <p className="text-xs text-dark/50">1 is very sad, 5 is great</p>
            </div>
            <div className="mt-4 w-full h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodSeries} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke="rgba(9,30,62,0.08)" />
                  <XAxis dataKey="short" tick={AXIS_TICK} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={AXIS_TICK} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid rgba(9,30,62,0.1)', fontSize: 12 }}
                    labelStyle={{ color: '#091E3E', fontWeight: 600 }}
                    formatter={(value: number) => [`${value} / 5`, 'Mood']}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#4A5B71' }} />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    name="Mood"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'var(--primary)', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                    isAnimationActive={true}
                    animationDuration={1200}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="card-soft p-5 sm:p-6" aria-labelledby="energy-chart-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="energy-chart-heading" className="font-display text-lg sm:text-xl font-semibold text-dark">
                Energy level
              </h2>
              <p className="text-xs text-dark/50">Recorded 1 to 10</p>
            </div>
            <div className="mt-4 w-full h-48 sm:h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodSeries} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="energyFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke="rgba(9,30,62,0.08)" />
                  <XAxis dataKey="short" tick={AXIS_TICK} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                  <YAxis domain={[0, 10]} tick={AXIS_TICK} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid rgba(9,30,62,0.1)', fontSize: 12 }}
                    labelStyle={{ color: '#091E3E', fontWeight: 600 }}
                    formatter={(value: number) => [`${value} / 10`, 'Energy']}
                    labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#4A5B71' }} />
                  <Area
                    type="monotone"
                    dataKey="energy"
                    name="Energy"
                    stroke="var(--secondary)"
                    strokeWidth={2.5}
                    fill="url(#energyFill)"
                    isAnimationActive={true}
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="card-soft p-5 sm:p-6" aria-labelledby="tag-chart-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="tag-chart-heading" className="font-display text-lg sm:text-xl font-semibold text-dark">
                Tags you used most
              </h2>
              <p className="text-xs text-dark/50">Across the selected period</p>
            </div>
            {tags.length === 0 ? (
              <p className="mt-4 rounded-xl bg-light p-4 text-sm text-dark/60">
                No tags in this period. Tags are optional, and you can add them to your next entry.
              </p>
            ) : (
              <div className="mt-4 w-full h-48 sm:h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tags} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 6" stroke="rgba(9,30,62,0.08)" vertical={false} />
                    <XAxis dataKey="tag" tick={AXIS_TICK} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tick={AXIS_TICK} tickLine={false} axisLine={false} width={40} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid rgba(9,30,62,0.1)', fontSize: 12 }}
                      formatter={(value: number) => [`${value} entries`, 'Tag']}
                    />
                    <Legend wrapperStyle={{ fontSize: 12, color: '#4A5B71' }} />
                    <Bar dataKey="count" name="Entries" radius={[6, 6, 0, 0]} isAnimationActive={true} animationDuration={1100}>
                      {tags.map((entry, index) => (
                        <Cell
                          key={entry.tag}
                          fill={index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <section className="rounded-2xl bg-light p-5 sm:p-6" aria-labelledby="insight-heading">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 id="insight-heading" className="font-display text-lg sm:text-xl font-semibold text-dark">
              What your entries show
            </h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm sm:text-base text-dark/75">
            {insights.map((insight) => (
              <li key={insight} className="rounded-xl bg-white p-3 border border-dark/5">
                {insight}
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-start gap-2 text-xs text-dark/50">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            These observations are calculated from your own entries only. They are simple counts and averages,
            not a diagnosis or a clinical assessment.
          </p>
        </section>

        <section className="card-soft p-5 sm:p-6 flex flex-col justify-between" aria-labelledby="streak-heading">
          <div>
            <div className="flex items-center gap-2">
              <span className="icon-tile">
                <Flame className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 id="streak-heading" className="font-display text-lg sm:text-xl font-semibold text-dark">
                Your streak
              </h2>
            </div>
            <p className="mt-4 font-display text-4xl sm:text-5xl font-bold text-primary">
              <StreakCounter value={streak} />
            </p>
            <p className="mt-2 text-sm sm:text-base text-dark/70">
              You have journaled {streak} day{streak === 1 ? '' : 's'} in a row. Keep going.
            </p>
            <p className="mt-1 text-xs text-dark/50">
              {uniqueDates(entries).length} day{uniqueDates(entries).length === 1 ? '' : 's'} recorded in total.
              Missing a day does not erase anything.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {MOODS.map((mood) => (
              <span
                key={mood.value}
                className="inline-flex items-center gap-1 rounded-full bg-light px-2.5 py-1 text-[11px] text-dark/60"
              >
                <span aria-hidden="true">{mood.emoji}</span>
                {mood.label}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
