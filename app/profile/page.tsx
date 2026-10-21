import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, Lock } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { ProfileForm } from '@/components/ProfileForm'
import { requireSession } from '@/lib/session'

export const metadata: Metadata = {
  title: 'Your profile',
  description: 'Manage your display name, notification preferences, and your data.',
  robots: { index: false, follow: false },
}

export default async function ProfilePage() {
  const { user } = await requireSession('/profile')

  return (
    <>
      <PageHero
        eyebrow="Your account"
        title="Your space, your rules"
        intro="You decide how much of yourself to share here. Nothing on this page is public."
      />

      <section className="py-10 sm:py-14">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ProfileForm displayName={user.displayName} email={user.email} prefs={user.prefs} />

          <div className="card-soft p-5 sm:p-7">
            <h2 className="font-display text-lg sm:text-xl font-semibold text-dark">Your data, your rights</h2>
            <p className="mt-2 text-sm text-dark/70">
              Under the Kenya Data Protection Act 2019 you can access, export, correct, or erase your personal
              data at any time. Your journal and mood data are sensitive personal data, and we treat them that
              way.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/tracker"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-light px-4 text-sm font-semibold text-primary"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Export your tracker as a PDF
              </Link>
              <Link
                href="/legal/privacy-policy"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-dark/15 px-4 text-sm font-semibold text-dark"
              >
                <Lock className="h-4 w-4" aria-hidden="true" />
                Read the privacy policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
