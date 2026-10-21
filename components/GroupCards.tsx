'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, CalendarDays, Check, Loader2, Users } from 'lucide-react'
import { GROUPS } from '@/lib/constants'
import { nextSessionLabel } from '@/lib/utils'
import { useCaptcha } from './CaptchaField'

export function GroupCards({ initialMemberships }: { initialMemberships: string[] }) {
  const router = useRouter()
  const captcha = useCaptcha('group-membership')
  const [memberships, setMemberships] = useState<string[]>(initialMemberships)
  const [pending, setPending] = useState<string | null>(null)
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)

  const toggle = async (slug: string) => {
    const joined = memberships.includes(slug)
    setPending(slug)
    setNotice(null)
    try {
      const captchaPayload = await captcha.prepare()
      const response = await fetch('/api/groups/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupSlug: slug,
          action: joined ? 'leave' : 'join',
          ...captchaPayload,
        }),
      })
      const data = (await response.json()) as { ok?: boolean; slugs?: string[]; message?: string; error?: string }
      if (!response.ok || !data.ok || !data.slugs) {
        setNotice({ tone: 'error', text: data.error ?? 'That did not work. Please try again.' })
        return
      }
      setMemberships(data.slugs)
      setNotice({ tone: 'ok', text: data.message ?? 'Updated.' })
      router.refresh()
    } catch {
      setNotice({ tone: 'error', text: 'That did not work. Please try again.' })
    } finally {
      setPending(null)
    }
  }

  return (
    <div>
      {notice ? (
        <p
          role="status"
          className={`mb-5 rounded-xl p-3 text-sm ${
            notice.tone === 'ok' ? 'bg-primary/10 text-dark' : 'bg-secondary/10 text-dark'
          }`}
        >
          {notice.text}
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {GROUPS.map((group) => {
          const joined = memberships.includes(group.slug)
          const busy = pending === group.slug
          return (
            <article key={group.slug} className="card-soft p-5 sm:p-6 flex flex-col h-full">
              <div className="flex items-start justify-between gap-3">
                <span className="icon-tile">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </span>
                {joined ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                    <Check className="h-3 w-3" aria-hidden="true" />
                    Joined
                  </span>
                ) : null}
              </div>

              <h2 className="mt-4 font-display text-lg sm:text-xl font-semibold text-dark">{group.name}</h2>
              <p className="mt-1 text-sm text-dark/70 flex-1">{group.topic}</p>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-dark/60">
                  <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                  <dt className="sr-only">Members</dt>
                  <dd>{group.members} members</dd>
                </div>
                <div className="flex items-center gap-2 text-dark/60">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                  <dt className="sr-only">Next session</dt>
                  <dd>Next session: {nextSessionLabel(group.weekday, group.time)}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => toggle(group.slug)}
                  disabled={busy}
                  className={`inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 rounded-xl px-4 text-sm font-semibold transition-colors ${
                    joined
                      ? 'border border-dark/15 text-dark hover:border-secondary hover:text-secondary'
                      : 'bg-primary text-white btn-primary'
                  }`}
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                  {busy ? 'Saving' : joined ? 'Leave group' : 'Join group'}
                </button>
                <Link
                  href={`/groups/${group.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl bg-light px-4 text-sm font-semibold text-primary hover:bg-primary/10"
                >
                  Open
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
