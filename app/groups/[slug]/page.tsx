import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Pin, Users } from 'lucide-react'
import { GroupThread } from '@/components/GroupThread'
import { PageHero } from '@/components/PageHero'
import { GROUPS } from '@/lib/constants'
import { requireSession } from '@/lib/session'
import { listGroupMessages } from '@/lib/store'
import { nextSessionLabel } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const group = GROUPS.find((item) => item.slug === slug)
  return {
    title: group ? group.name : 'Peer support group',
    robots: { index: false, follow: false },
  }
}

export default async function GroupDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const group = GROUPS.find((item) => item.slug === slug)
  if (!group) notFound()

  const { user } = await requireSession(`/groups/${slug}`)
  const messages = await listGroupMessages(slug)
  const displayName = user.displayName ?? 'Anonymous'

  return (
    <>
      <PageHero
        eyebrow="Peer support"
        title={group.name}
        intro={group.description}
      >
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <Users className="h-4 w-4 text-primary" aria-hidden="true" />
            {group.members} members
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            {group.day}s at {group.timeLabel}
          </span>
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary border border-primary/20 min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All groups
          </Link>
        </div>
      </PageHero>

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              <GroupThread groupSlug={slug} initialMessages={messages} currentUserName={displayName} />
            </div>

            <aside className="lg:col-span-4 space-y-5">
              <div className="rounded-2xl bg-light p-5">
                <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-dark">
                  <Pin className="h-4 w-4 text-primary" aria-hidden="true" />
                  Pinned resources
                </h2>
                <ul className="mt-3 space-y-3">
                  {group.resources.map((resource) => (
                    <li key={resource.title} className="rounded-xl bg-white p-4 border border-dark/5">
                      <p className="font-display text-sm font-semibold text-dark">{resource.title}</p>
                      <p className="mt-1 text-xs text-dark/60">{resource.note}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/resources"
                  className="mt-3 inline-flex min-h-[44px] items-center font-display text-sm font-semibold text-primary hover:text-secondary"
                >
                  Browse all self help resources
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-dark/5">
                <h2 className="font-display text-lg font-semibold text-dark">Upcoming sessions</h2>
                <ul className="mt-3 space-y-3 text-sm text-dark/70">
                  {[0, 1, 2].map((offset) => {
                    const date = new Date()
                    const diff = (group.weekday - date.getDay() + 7) % 7
                    date.setDate(date.getDate() + (diff === 0 && offset === 0 ? 0 : diff) + offset * 7)
                    return (
                      <li key={offset} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-light text-xs font-bold text-primary">
                          {date.getDate()}
                        </span>
                        <div>
                          <p className="font-display font-semibold text-dark">
                            {date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
                          </p>
                          <p className="text-xs text-dark/50">{group.timeLabel} · online, audio only</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-3 rounded-xl bg-light p-3 text-xs text-dark/60">
                  Next session: {nextSessionLabel(group.weekday, group.time)}. Join five minutes early if you
                  would like a quiet moment first.
                </p>
              </div>

              <div className="rounded-2xl bg-secondary/10 p-5 border border-secondary/20">
                <h2 className="font-display text-lg font-semibold text-dark">If it becomes urgent</h2>
                <p className="mt-2 text-sm text-dark/70">
                  Groups are peer support, not crisis care. If you feel unsafe, call 999 or Befrienders Kenya on
                  0800 723 253.
                </p>
                <Link
                  href="/crisis"
                  className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-secondary px-4 text-sm font-semibold text-white btn-secondary"
                >
                  Open crisis support
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
