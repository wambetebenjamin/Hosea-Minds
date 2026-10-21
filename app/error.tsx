'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { HeartPulse, Home, MessageCircle } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the digest for support without logging any personal content.
    if (error.digest) console.warn('Hosea Minds error digest', error.digest)
  }, [error.digest])

  return (
    <section className="bg-light">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
            <HeartPulse className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="mt-6 font-display text-sm uppercase tracking-[0.2em] text-primary">Something went wrong</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-dark">
            We hit a snag. Your entries are safe.
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/70">
            This was our mistake, not yours. Nothing you wrote has been lost. You can try again, or message us on
            WhatsApp and a real person will help.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex w-full sm:w-auto items-center justify-center min-h-[48px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl border border-dark/15 px-6 font-display font-semibold text-dark hover:border-primary hover:text-primary"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 border border-dark/5">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-dark">
              <MessageCircle className="h-4 w-4 text-secondary" aria-hidden="true" />
              Talk to a person
            </p>
            <a
              href="https://wa.me/254112272061?text=Hi%20Hosea%20Minds%2C%20I%20hit%20an%20error%20on%20the%20site"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#25D366] px-5 text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp +254 112 272 061
            </a>
            <p className="mt-3 text-xs text-dark/50">
              If you are in danger, please call 999 or Befrienders Kenya on 0800 723 253.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
