import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of use',
  description:
    'The terms that govern your use of Hosea Minds, including the crisis disclaimer and community agreements.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="1 October 2026"
      intro="These terms explain the agreement between you and Hosea Minds. They are short, and they exist mostly to protect the safety of the people using this platform. By creating an account you accept them."
      sections={[
        {
          id: 'what-we-are',
          title: 'What Hosea Minds is, and is not',
          body: (
            <>
              <p>
                Hosea Minds is a self help platform offering a private journal, a mood and anxiety tracker,
                self help resources, and facilitated peer support groups.
              </p>
              <p>
                We are not a hospital, clinic, counselling practice, or emergency service. We do not diagnose
                conditions, prescribe treatment, or provide therapy. Nothing on this platform creates a clinical
                relationship between you and Hosea Minds or its facilitators.
              </p>
            </>
          ),
        },
        {
          id: 'crisis',
          title: 'Crisis disclaimer',
          body: (
            <>
              <p>
                Hosea Minds is not a crisis intervention service. Our journal, tracker, and groups are not
                monitored around the clock, and a message posted in a group may not be seen for hours.
              </p>
              <p>
                If you are in immediate danger, call 999 now. For emotional support at any hour, call Befrienders
                Kenya on 0800 723 253 or Mathare Hospital on 020 2052148. Kenya Red Cross can be reached on 1199.
              </p>
              <p>
                The{' '}
                <Link href="/crisis" className="link-underline font-semibold text-secondary">
                  crisis support page
                </Link>{' '}
                is always public, always free, and never asks you to sign in.
              </p>
            </>
          ),
        },
        {
          id: 'your-account',
          title: 'Your account',
          body: (
            <>
              <p>
                You must be at least sixteen years old to create an account. You are responsible for keeping your
                password safe, and for the activity that happens under your account.
              </p>
              <p>
                Provide accurate information when you register. You may use an anonymous display name, and we
                encourage you to do so if that helps you feel safe.
              </p>
            </>
          ),
        },
        {
          id: 'community',
          title: 'Community agreements',
          body: (
            <>
              <p>Peer groups only work if they are safe. When you take part, you agree to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>keep what is shared in a group confidential and never repost it elsewhere;</li>
                <li>avoid giving medical advice, diagnoses, or instructions about medication;</li>
                <li>never harass, shame, or pressure another member, including to share more than they wish;</li>
                <li>avoid promoting products, services, or political campaigns in group rooms;</li>
                <li>respect a facilitator&apos;s request to pause a topic or close a session.</li>
              </ul>
              <p>
                We may remove messages or restrict accounts that break these agreements. Where there is a risk to
                someone&apos;s safety, we may contact emergency services.
              </p>
            </>
          ),
        },
        {
          id: 'acceptable-use',
          title: 'Acceptable use',
          body: (
            <>
              <p>
                Do not attempt to access another member&apos;s data, probe or bypass our security, scrape the
                platform, upload malware, or use the service to harm anyone. Do not upload photographs of other
                people without their consent.
              </p>
              <p>
                Automated abuse protections, including reCAPTCHA, may be applied to forms. Repeated automated
                submissions may be blocked.
              </p>
            </>
          ),
        },
        {
          id: 'your-content',
          title: 'Your content',
          body: (
            <>
              <p>
                Everything you write in your journal remains yours. You grant us only the limited permission
                needed to store and display it back to you, and to display group messages to members of that
                group.
              </p>
              <p>
                You can delete your account and all of your content at any time. See the{' '}
                <Link href="/legal/privacy-policy" className="link-underline font-semibold text-primary">
                  privacy policy
                </Link>{' '}
                for exactly what deletion removes.
              </p>
            </>
          ),
        },
        {
          id: 'availability',
          title: 'Availability and changes',
          body: (
            <>
              <p>
                Hosea Minds is free to use. We aim to keep it available at all times, but we cannot promise
                uninterrupted service. We may change or withdraw features, and will give reasonable notice of any
                change that affects your data.
              </p>
              <p>
                We may update these terms. The date at the top of this page always shows the current version, and
                material changes will be highlighted when you next sign in.
              </p>
            </>
          ),
        },
        {
          id: 'liability',
          title: 'Limitation of liability',
          body: (
            <>
              <p>
                To the extent permitted by Kenyan law, Hosea Minds is not liable for indirect or consequential
                loss arising from your use of the platform, including reliance on general wellbeing information.
                Nothing in these terms limits liability that cannot lawfully be limited.
              </p>
              <p>
                These terms are governed by the laws of Kenya. Questions can be sent to hello@hoseaminds.co.ke.
              </p>
            </>
          ),
        },
      ]}
    />
  )
}
