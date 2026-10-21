import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How Hosea Minds handles sensitive mental health data under the Kenya Data Protection Act 2019, including consent, erasure, and portability.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="1 October 2026"
      intro="Hosea Minds handles some of the most sensitive personal data a person can share: how you feel, what keeps you awake, and what you are carrying. This policy explains what we collect, why, where it lives, and how you can take it back or remove it entirely. It is written to meet the Kenya Data Protection Act 2019 (KDPA)."
      sections={[
        {
          id: 'who-we-are',
          title: 'Who we are',
          body: (
            <>
              <p>
                Hosea Minds is a community mental health tracker and journal operated from Nairobi, Kenya. For
                the purposes of the KDPA, Hosea Minds is the data controller for the personal data described
                here.
              </p>
              <p>
                You can reach us at hello@hoseaminds.co.ke for any privacy question, request, or complaint. If
                you are not satisfied with our response, you may complain to the Office of the Data Protection
                Commissioner (ODPC) in Kenya.
              </p>
            </>
          ),
        },
        {
          id: 'sensitive-data',
          title: 'Sensitive personal health data',
          body: (
            <>
              <p>
                Journal entries, mood scores, energy levels, tags, quick check ins, and group messages are
                treated as sensitive personal data relating to health. We collect them only because you choose
                to create them, and we process them only to provide the features you are using.
              </p>
              <p>
                We do not use this data to build advertising profiles, to train marketing models, or to infer
                diagnoses. We do not sell it, rent it, or share it with data brokers under any circumstances.
              </p>
            </>
          ),
        },
        {
          id: 'what-we-collect',
          title: 'What we collect',
          body: (
            <>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Account data:</strong> your email address, a securely hashed password, an optional
                  display name, and notification preferences.
                </li>
                <li>
                  <strong>Journal data:</strong> entries you write, the date, mood, energy level, tags, and any
                  optional photo you upload.
                </li>
                <li>
                  <strong>Check in data:</strong> your mood and the one sentence you choose to add.
                </li>
                <li>
                  <strong>Group data:</strong> messages you post in peer support groups, with your display name
                  or the label Anonymous.
                </li>
                <li>
                  <strong>Technical data:</strong> aggregated page views collected by Vercel Analytics and
                  performance timings collected by Vercel Speed Insights. These do not include journal content,
                  mood values, or group messages.
                </li>
              </ul>
              <p>
                We do not collect your location, contacts, camera, or microphone. Our site headers disable
                camera, microphone, and geolocation permissions.
              </p>
            </>
          ),
        },
        {
          id: 'consent',
          title: 'Explicit consent',
          body: (
            <>
              <p>
                We ask for your explicit consent when you register, before any journal or mood data is stored.
                You are shown, in plain language, that journal entries are sensitive personal data and that you
                may withdraw consent at any time by deleting your account.
              </p>
              <p>
                Optional processing, such as analytics cookies and notification emails, has separate controls in
                the cookie banner and on your profile page. Withdrawing consent for analytics does not affect your
                ability to use the journal.
              </p>
            </>
          ),
        },
        {
          id: 'storage',
          title: 'Where your data is stored',
          body: (
            <>
              <p>
                Application data is stored in Vercel KV. Optional photo uploads are stored in Vercel Blob. Both
                services are hosted by Vercel Inc. under their data processing terms. Data may be processed
                outside Kenya, and we rely on your consent together with contractual safeguards for that transfer.
              </p>
              <p>
                Every record is keyed to your user identifier. Journal entries and check ins are never visible to
                other members, and never surfaced in peer groups. Group messages are visible only to members of
                that group.
              </p>
            </>
          ),
        },
        {
          id: 'rights',
          title: 'Your rights under the KDPA 2019',
          body: (
            <>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Right to be informed:</strong> this policy, the cookie policy, and the consent
                  notice at registration.
                </li>
                <li>
                  <strong>Right of access:</strong> every entry you have written is visible in your journal, and
                  your profile page summarises your account data.
                </li>
                <li>
                  <strong>Right to portability:</strong> you can export a summary of your tracker data as a PDF
                  from the tracker page. This export is generated in your browser and is never uploaded to us.
                </li>
                <li>
                  <strong>Right to erasure:</strong> you can delete your account and all associated data at any
                  time from the danger zone on your profile page. See below for exactly what happens.
                </li>
                <li>
                  <strong>Right to rectification:</strong> you can change your display name and preferences at
                  any time. Contact us if you need to correct your email address.
                </li>
                <li>
                  <strong>Right to object and restrict:</strong> you can turn off optional analytics and
                  notification emails without losing access to the platform.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'erasure',
          title: 'Right to erasure: what deletion does',
          body: (
            <>
              <p>
                When you confirm deletion on your profile page, our server irreversibly removes:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>every journal entry you have written, including attached photos in Vercel Blob;</li>
                <li>every quick check in;</li>
                <li>every group message you posted, from every group;</li>
                <li>your group memberships, notification preferences, and account row, including your email.</li>
              </ul>
              <p>
                Deletion is immediate and cannot be undone. We cannot recover deleted data for you. The response
                to the deletion request confirms what was removed.
              </p>
            </>
          ),
        },
        {
          id: 'advertising',
          title: 'No advertising, no tracking pixels',
          body: (
            <>
              <p>
                Hosea Minds runs no third party advertising scripts. There is no Facebook Pixel, no TikTok Pixel,
                no Google Ads remarketing tag, and no marketing tag manager anywhere on this site.
              </p>
              <p>
                Vercel Analytics and Speed Insights are used to understand which pages are slow or confusing so we
                can improve them. They are disclosed in the cookie policy and can be refused in the consent
                banner. They never receive journal content.
              </p>
            </>
          ),
        },
        {
          id: 'security',
          title: 'Security and retention',
          body: (
            <>
              <p>
                Passwords are stored as salted scrypt hashes, never in plain text. Sessions are signed and
                transmitted over HTTPS. Access to production data is limited to two engineers and requires
                multi factor authentication.
              </p>
              <p>
                We keep your data for as long as your account exists. If you delete your account, the data
                described above is removed immediately. Aggregate, non identifying analytics may be retained for
                up to twelve months.
              </p>
            </>
          ),
        },
        {
          id: 'children',
          title: 'Young people',
          body: (
            <>
              <p>
                Hosea Minds is intended for people aged sixteen and above. If you are younger and need support,
                please speak to a trusted adult or call Befrienders Kenya on 0800 723 253. We do not knowingly
                create accounts for children under sixteen.
              </p>
            </>
          ),
        },
        {
          id: 'changes',
          title: 'Changes and contact',
          body: (
            <>
              <p>
                If we make a material change to this policy we will tell you on your next visit and update the
                date at the top of this page. You can always ask us what data we hold about you by emailing
                hello@hoseaminds.co.ke.
              </p>
              <p>
                For urgent mental health support, please do not wait for an email reply. Call 999, or{' '}
                <Link href="/crisis" className="link-underline font-semibold text-secondary">
                  open the crisis support page
                </Link>
                .
              </p>
            </>
          ),
        },
      ]}
    />
  )
}
