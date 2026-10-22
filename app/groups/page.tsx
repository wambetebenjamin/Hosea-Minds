import type { Metadata } from 'next'
import Link from 'next/link'
import { HeartHandshake, ShieldCheck } from 'lucide-react'
import { GroupCards } from '@/components/GroupCards'
import { PageHero } from '@/components/PageHero'
import { requireSession } from '@/lib/session'
import { listMemberships } from '@/lib/store'
import { GROUPS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Peer support groups',
  description: 'Small, gently facilitated peer support groups for anxiety, grief, students, men, parents, and burnout.',
  robots: { index: false, follow: false },
}

export default async function GroupsPage() {
  const { userId } = await requireSession('/groups')
  const memberships = await listMemberships(userId)

  return (
    <>
      <PageHero
        eyebrow="Peer support"
        title="People who understand, in their own words"
        intro="Seven small rooms, each with a facilitator and a simple agreement: what is shared here stays here. You can read quietly for as long as you like before you say anything."
      >
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            Confidential by design
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <HeartHandshake className="h-4 w-4 text-secondary" aria-hidden="true" />
            {GROUPS.length} groups open now
          </span>
        </div>
      </PageHero>

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GroupCards initialMemberships={memberships} />

          <div className="mt-10 rounded-2xl bg-light p-5 sm:p-8">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark">How a session works</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-dark/70">
              <p className="rounded-xl bg-white p-4">
                <span className="block font-display font-semibold text-dark">1. A short grounding</span>
                Two minutes of breathing or the 5 4 3 2 1 exercise, so everyone arrives properly.
              </p>
              <p className="rounded-xl bg-white p-4">
                <span className="block font-display font-semibold text-dark">2. A round of voices</span>
                Whoever wants to speak takes a turn. Passing is normal and respected.
              </p>
              <p className="rounded-xl bg-white p-4">
                <span className="block font-display font-semibold text-dark">3. A soft close</span>
                One thing you are taking with you. No homework, no tasks, no pressure.
              </p>
            </div>
            <p className="mt-4 text-sm text-dark/60">
              Groups are not a crisis service. If you need someone immediately, please{' '}
              <Link href="/crisis" className="link-underline font-semibold text-secondary">
                open crisis support
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
