import Link from 'next/link'
import { HeartPulse, Home, LifeBuoy } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="bg-light">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
            <HeartPulse className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="mt-6 font-display text-sm uppercase tracking-[0.2em] text-primary">Page not found</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-dark">
            This page has wandered off
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/70">
            Nothing is wrong with you, and nothing is broken. The link may be old, or the page may have moved. Take
            a breath, then choose where to go next.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <Link
              href="/crisis"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[48px] rounded-xl border border-secondary px-6 font-display font-semibold text-secondary hover:bg-secondary hover:text-white"
            >
              <LifeBuoy className="h-4 w-4" aria-hidden="true" />
              Crisis support
            </Link>
          </div>

          <p className="mt-8 text-sm text-dark/60">
            If you need to talk to someone now, call Befrienders Kenya on{' '}
            <a href="tel:0800723253" className="font-semibold text-dark underline">
              0800 723 253
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
