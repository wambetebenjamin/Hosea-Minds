import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { HeartPulse, Lock, ShieldCheck } from 'lucide-react'
import { LoginForm } from '@/components/LoginForm'
import { HELPLINES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your private Hosea Minds journal, tracker, and peer groups.',
}

export default function LoginPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  return (
    <section className="bg-light">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <HeartPulse className="h-4 w-4" aria-hidden="true" />
              Welcome back
            </p>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-dark">
              Welcome back. We are glad you are here.
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/70">
              Your journal is exactly as you left it, still private, still yours. Whether it has been two days
              or two months, there is nothing to catch up on. Just begin where you are.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-dark/5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm text-dark/70">
                  We never sell your data, and we run no advertising pixels. Your entries are visible only to
                  you.
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-white p-4 border border-dark/5">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm text-dark/70">
                  Not feeling like an account today? You can still read every self help resource, and call any
                  helpline, without signing in.
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-dark/60">
              Need to talk to someone right now? Call{' '}
              <a href={`tel:${HELPLINES[0].tel}`} className="font-semibold text-dark underline">
                {HELPLINES[0].number}
              </a>{' '}
              or{' '}
              <Link href="/crisis" className="font-semibold text-secondary underline">
                open crisis support
              </Link>
              .
            </p>
          </div>

          <div className="card-soft p-6 sm:p-8 w-full max-w-md mx-auto lg:mx-0">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark">Sign in to your space</h2>
            <p className="mt-1 text-sm text-dark/60">No rush. Take your time.</p>
            <div className="mt-6">
              <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-light" />}>
                <LoginForm googleEnabled={googleEnabled} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
