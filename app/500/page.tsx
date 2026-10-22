import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, MessageCircle } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Something went wrong',
  description: 'A gentle page for when something breaks at Hosea Minds. Your entries are safe.',
  robots: { index: false, follow: false },
}

export default function ServerErrorPage() {
  return (
    <section className="bg-light">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-primary">Error 500</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-dark">
            We hit a snag. Your entries are safe.
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/70">
            Something on our side did not load properly. Nothing you wrote has been lost, and there is nothing you
            need to fix. You can go home, or message a real person on WhatsApp.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <a
              href="https://wa.me/254112272061?text=Hi%20Hosea%20Minds%2C%20I%20hit%20an%20error%20on%20the%20site"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl bg-[#25D366] px-6 font-display font-semibold text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp us
            </a>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 border border-dark/5">
            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-dark">
              <MessageCircle className="h-4 w-4 text-secondary" aria-hidden="true" />
              WhatsApp +254 112 272 061
            </p>
            <p className="mt-2 text-xs text-dark/50">
              If you are in danger, please call 999. For emotional support, call Befrienders Kenya on
              0800 723 253. Both lines are free and open now.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
