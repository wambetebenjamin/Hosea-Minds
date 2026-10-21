import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, HeartPulse } from 'lucide-react'
import { RegisterForm } from '@/components/RegisterForm'

export const metadata: Metadata = {
  title: 'Create your account',
  description: 'Create a free, private Hosea Minds account. Your display name can stay anonymous.',
}

const promises = [
  'Your journal and mood entries stay tied to your account only.',
  'You can stay completely anonymous in peer groups.',
  'Export your tracker as a PDF, or delete everything, whenever you want.',
  'No advertising scripts. No data sold. Ever.',
]

export default function RegisterPage() {
  return (
    <section className="bg-light">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <HeartPulse className="h-4 w-4" aria-hidden="true" />
              A gentle beginning
            </p>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-dark">
              You do not have to explain yourself to start
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-dark/70">
              Making an account takes about a minute. You can keep your name to yourself, skip every optional
              field, and write your first entry only when you feel like it.
            </p>

            <ul className="mt-8 space-y-3">
              {promises.map((promise) => (
                <li key={promise} className="flex items-start gap-3 rounded-xl bg-white p-4 border border-dark/5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-dark/70">{promise}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-dark/60">
              Already have an account?{' '}
              <Link href="/login" className="link-underline font-semibold text-primary">
                Sign in here
              </Link>
              .
            </p>
          </div>

          <div className="card-soft p-6 sm:p-8 w-full max-w-md mx-auto lg:mx-0">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark">Create your space</h2>
            <p className="mt-1 text-sm text-dark/60">Everything here is optional except your email.</p>
            <div className="mt-6">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
