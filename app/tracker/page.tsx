import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { TrackerView } from '@/components/TrackerView'
import { requireSession } from '@/lib/session'
import { listJournal } from '@/lib/store'

export const metadata: Metadata = {
  title: 'Mood and anxiety tracker',
  description: 'See how your mood and energy move over time, from your own entries.',
  robots: { index: false, follow: false },
}

export default async function TrackerPage() {
  const { userId, user } = await requireSession('/tracker')
  const entries = await listJournal(userId)

  return (
    <>
      <PageHero
        eyebrow="Your tracker"
        title="Patterns, seen gently"
        intro="These charts are built only from what you wrote. They cannot tell you who you are, and they are not a diagnosis. They simply help you notice what your days have been doing."
      />
      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrackerView entries={entries} displayName={user.displayName} />
        </div>
      </section>
    </>
  )
}
