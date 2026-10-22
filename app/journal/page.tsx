import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Flame, Sparkles } from 'lucide-react'
import { JournalForm } from '@/components/JournalForm'
import { JournalEntries } from '@/components/JournalEntries'
import { PageHero } from '@/components/PageHero'
import { requireSession } from '@/lib/session'
import { listJournal } from '@/lib/store'
import { averageMood, computeStreak } from '@/lib/insights'

export const metadata: Metadata = {
  title: 'Your journal',
  description: 'A private journal for your days, written only for you.',
  robots: { index: false, follow: false },
}

export default async function JournalPage() {
  const { userId, user } = await requireSession('/journal')
  const entries = await listJournal(userId)
  const streak = computeStreak(entries)
  const mood = averageMood(entries)

  return (
    <>
      <PageHero
        eyebrow="Private journal"
        title={`Karibu tena${user.displayName ? `, ${user.displayName}` : ''}`}
        intro="This page is yours. There is no streak to protect here and nothing to prove. Write what is true today, and leave the rest for later."
      >
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <Flame className="h-4 w-4 text-secondary" aria-hidden="true" />
            {streak} day{streak === 1 ? '' : 's'} in a row
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            {entries.length} entr{entries.length === 1 ? 'y' : 'ies'} saved
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            {mood ? `Average mood ${mood.toFixed(1)} / 5` : 'No average yet'}
          </span>
        </div>
      </PageHero>

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7 xl:col-span-7">
              <JournalForm />
            </div>

            <aside className="lg:col-span-5 xl:col-span-5 space-y-4">
              <div className="rounded-2xl bg-light p-5 sm:p-6">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-dark">Gentle reminders</h2>
                <ul className="mt-3 space-y-3 text-sm text-dark/70">
                  <li>One honest sentence is a complete entry.</li>
                  <li>You can come back and add to today&apos;s entry later.</li>
                  <li>If today is heavier than words, the crisis page is always open.</li>
                </ul>
                <Link
                  href="/crisis"
                  className="mt-4 inline-flex items-center gap-2 min-h-[44px] rounded-xl bg-secondary px-4 text-sm font-semibold text-white btn-secondary"
                >
                  Open crisis support
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-5 sm:p-6 border border-dark/5">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-dark">See your patterns</h2>
                <p className="mt-2 text-sm text-dark/70">
                  After a few entries, the tracker shows how your mood and energy move over time, in plain
                  language, with no guessing.
                </p>
                <Link
                  href="/tracker"
                  className="mt-4 inline-flex items-center gap-2 min-h-[44px] font-display text-sm font-semibold text-primary hover:text-secondary"
                >
                  Open your tracker
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20" aria-labelledby="past-entries">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="past-entries" className="font-display text-2xl sm:text-3xl text-dark">
                Past entries
              </h2>
              <p className="mt-1 text-sm text-dark/60">Newest first. Only you can read these.</p>
            </div>
          </div>
          <div className="mt-6">
            <JournalEntries entries={entries} />
          </div>
        </div>
      </section>
    </>
  )
}
