'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, NotebookPen } from 'lucide-react'
import { MOODS } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import type { JournalEntry } from '@/lib/types'

export function JournalEntries({ entries }: { entries: JournalEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-dark/15 bg-white p-8 text-center">
        <span className="icon-tile mx-auto">
          <NotebookPen className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold text-dark">Your journal starts here</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-dark/60">
          The first entry is the hardest, and it can be one sentence long. There is no wrong way to start.
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {entries.map((entry) => {
        const mood = MOODS.find((option) => option.value === entry.mood) ?? MOODS[2]
        const open = expanded === entry.id
        const long = entry.text.length > 220

        return (
          <li key={entry.id} className="card-soft p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-light text-2xl"
                  aria-hidden="true"
                >
                  {mood.emoji}
                </span>
                <div>
                  <p className="font-display text-base sm:text-lg font-semibold text-dark">
                    {formatDate(entry.date)}
                  </p>
                  <p className="text-xs text-dark/50">
                    {mood.label} · energy {entry.energy}/10
                  </p>
                </div>
              </div>
              {entry.tags.length > 0 ? (
                <ul className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-light px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-dark/60"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/75 whitespace-pre-line">
              {open || !long ? entry.text : `${entry.text.slice(0, 220).trimEnd()}…`}
            </p>

            {entry.photoUrl ? (
              <div className="mt-4 overflow-hidden rounded-xl border border-dark/10 max-w-sm">
                <Image
                  src={entry.photoUrl}
                  alt={`Photo attached to the entry from ${formatDate(entry.date)}`}
                  width={640}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : null}

            {long ? (
              <button
                type="button"
                onClick={() => setExpanded(open ? null : entry.id)}
                aria-expanded={open}
                className="mt-3 inline-flex items-center gap-1.5 min-h-[44px] text-sm font-semibold text-primary hover:text-secondary"
              >
                {open ? 'Show less' : 'Read more'}
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
