import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, HeartHandshake, ShieldCheck } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Helplines } from '@/components/Helplines'
import { ResourcesBrowser } from '@/components/ResourcesBrowser'

export const metadata: Metadata = {
  title: 'Self help resources',
  description:
    'Free, Kenyan-made self help resources for anxiety, depression, grief, relationships, work stress, sleep, and self esteem. No account needed.',
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Open to everyone"
        title="Self help resources, written for Kenyan life"
        intro="Short reads, audio guides, worksheets, and exercises you can do in a matatu, a hostel room, or on a lunch break. No account, no sign in, no cost. Take what helps and leave the rest."
      >
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            No account required
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
            12 resources, seven categories
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-dark/70 border border-dark/5">
            <HeartHandshake className="h-4 w-4 text-secondary" aria-hidden="true" />
            Written with Kenyan counsellors
          </span>
        </div>
      </PageHero>

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResourcesBrowser />

          <div className="mt-12">
            <Helplines />
          </div>

          <div className="mt-8 rounded-2xl bg-light p-5 sm:p-8 text-center">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark">
              Want to keep a record of how you are doing?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-dark/70">
              Resources are here whenever you need them. If you would like somewhere to write, a free account
              takes about a minute and you can stay anonymous.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/register"
                className="inline-flex w-full sm:w-auto items-center justify-center min-h-[44px] rounded-xl bg-primary px-6 text-sm font-semibold text-white btn-primary"
              >
                Create a free account
              </Link>
              <Link
                href="/crisis"
                className="inline-flex w-full sm:w-auto items-center justify-center min-h-[44px] rounded-xl border border-dark/15 px-6 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
              >
                Open crisis support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
