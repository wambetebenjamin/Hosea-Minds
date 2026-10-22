import Link from 'next/link'
import { Phone } from 'lucide-react'
import { CRISIS_WHATSAPP_LINK, EMERGENCY_NUMBER, HELPLINES } from '@/lib/constants'
import { WhatsAppIcon } from './icons'

/**
 * Helpline block used on the homepage, on every legal page and at the foot of
 * the resources page. Numbers are never smaller than text-2xl so they stay
 * readable at 375px.
 */
export function Helplines({ tone = 'light' }: { tone?: 'light' | 'white' }) {
  return (
    <section
      aria-labelledby="helpline-heading"
      className={
        tone === 'light'
          ? 'rounded-2xl bg-light p-5 sm:p-8 border border-primary/10'
          : 'rounded-2xl bg-white p-5 sm:p-8 border border-dark/10'
      }
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="helpline-heading" className="font-display text-lg sm:text-xl font-semibold text-dark">
            Free helplines, available now
          </h2>
          <p className="mt-1 text-sm text-dark/70">
            You do not need an account to call. You do not need to explain anything first.
          </p>
        </div>
        <Link
          href="/crisis"
          className="inline-flex items-center justify-center min-h-[44px] rounded-xl bg-secondary px-5 text-sm font-semibold text-white btn-secondary shrink-0"
        >
          Open crisis support
        </Link>
      </div>

      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {HELPLINES.map((line) => (
          <li key={line.name} className="rounded-xl bg-white/80 p-4 border border-dark/5">
            <p className="text-xs uppercase tracking-[0.14em] text-dark/50">{line.name}</p>
            <a
              href={`tel:${line.tel}`}
              className="mt-1 inline-flex items-center gap-2 min-h-[44px] font-display text-2xl sm:text-3xl font-bold text-dark hover:text-primary"
            >
              <Phone className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
              {line.number}
            </a>
            <p className="text-xs sm:text-sm text-dark/60">{line.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white/80 p-4 border border-secondary/30">
        <p className="text-sm text-dark/80">
          <span className="font-semibold text-secondary">In immediate danger?</span> Call{' '}
          <a href={`tel:${EMERGENCY_NUMBER.tel}`} className="font-display text-2xl font-bold text-dark">
            {EMERGENCY_NUMBER.number}
          </a>{' '}
          right now.
        </p>
        <a
          href={CRISIS_WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-primary px-5 text-sm font-semibold text-white btn-primary shrink-0"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp someone now
        </a>
      </div>
    </section>
  )
}

export function HelplineStrip() {
  return (
    <section aria-label="Emergency helplines" className="bg-secondary/10 border-y border-secondary/20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.18em] text-secondary font-semibold">Always open</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-dark">
              If today is too heavy to carry alone
            </h2>
            <p className="mt-2 text-sm sm:text-base text-dark/70">
              Call a free helpline. No forms, no sign in, no explanation required.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
            {HELPLINES.slice(0, 2).map((line) => (
              <div key={line.name}>
                <p className="text-xs uppercase tracking-[0.14em] text-dark/50">{line.name}</p>
                <a
                  href={`tel:${line.tel}`}
                  className="mt-1 inline-flex min-h-[44px] items-center font-display text-2xl sm:text-3xl font-bold text-dark hover:text-secondary"
                >
                  {line.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
