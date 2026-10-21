import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckInForm } from '@/components/CheckInForm'
import { PageHero } from '@/components/PageHero'
import { requireSession } from '@/lib/session'
import { listCheckIns } from '@/lib/store'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Quick daily check in',
  description: 'One mood, one sentence. A check in that takes less than a minute.',
  robots: { index: false, follow: false },
}

export default async function CheckInPage() {
  const { userId } = await requireSession('/check-in')
  const checkIns = await listCheckIns(userId)
  const last = checkIns[0]

  return (
    <>
      <PageHero
        eyebrow="Quick check in"
        title="One minute, just for you"
        intro="Some days there is no time or words for a full entry. This is the smallest version: a mood, and one thing on your mind."
      />

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckInForm lastCheckIn={last ? formatDate(last.date) : null} />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/journal"
              className="rounded-2xl bg-light p-5 min-h-[44px] hover:bg-primary/10"
            >
              <p className="font-display font-semibold text-dark">Want to write more?</p>
              <p className="mt-1 text-sm text-dark/60">Open the full journal and take your time.</p>
            </Link>
            <Link
              href="/crisis"
              className="rounded-2xl bg-secondary/10 p-5 min-h-[44px] hover:bg-secondary/15"
            >
              <p className="font-display font-semibold text-dark">Need to talk now?</p>
              <p className="mt-1 text-sm text-dark/60">Free helplines, no sign in, no forms.</p>
            </Link>
          </div>

          {checkIns.length > 0 ? (
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-dark">Recent check ins</h2>
              <ul className="mt-3 space-y-2">
                {checkIns.slice(0, 5).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 border border-dark/5 text-sm"
                  >
                    <span className="text-dark/60">{formatDate(item.date)}</span>
                    <span className="text-dark/75 truncate">{item.note || 'No note added'}</span>
                    <span className="text-lg" aria-label={`Mood ${item.mood} of 5`}>
                      {['😢', '🙁', '😐', '🙂', '😊'][item.mood - 1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
