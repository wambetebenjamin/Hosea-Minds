import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description:
    'The cookies Hosea Minds uses, what each one does, and why mental health journal data is never used for advertising.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie policy"
      updated="1 October 2026"
      intro="Cookies are small pieces of information stored by your browser. We use as few as possible, and we never use them to follow you around the internet. This page lists every cookie category we operate and how to change your choices."
      sections={[
        {
          id: 'choices',
          title: 'Your choices',
          body: (
            <>
              <p>
                When you first visit, a banner at the bottom of the page offers Accept all or Manage preferences.
                Your choice is stored in your browser under the local storage key{' '}
                <code className="rounded bg-light px-1.5 py-0.5 text-xs">hosea-minds-cookie-consent</code>, so you
                are not asked again on this device.
              </p>
              <p>
                Necessary cookies are always on, because signing in does not work without them. Everything else is
                optional, and switching categories off never limits access to your journal, resources, or the
                crisis page.
              </p>
            </>
          ),
        },
        {
          id: 'necessary',
          title: 'Necessary cookies',
          body: (
            <>
              <p>
                These keep you signed in and protect forms from automated abuse. They include the NextAuth session
                cookie, which holds a signed token rather than your journal content, and the CSRF token cookie used
                to validate form submissions.
              </p>
              <p>
                Necessary cookies cannot be disabled through the banner. Clearing them in your browser will sign
                you out.
              </p>
            </>
          ),
        },
        {
          id: 'functional',
          title: 'Functional preferences',
          body: (
            <>
              <p>
                Functional storage remembers small choices, such as whether you have heard the voice tour in this
                session, and your cookie preferences themselves. These are stored in your browser, not on our
                servers.
              </p>
            </>
          ),
        },
        {
          id: 'analytics',
          title: 'Analytics',
          body: (
            <>
              <p>
                We use Vercel Analytics and Vercel Speed Insights to understand which pages are visited and how
                quickly they load. These tools provide aggregate information such as page views and Core Web
                Vitals. They are designed to be cookieless and do not receive journal text, mood values, group
                messages, or anything that could identify what you wrote.
              </p>
              <p>
                You can refuse analytics in the consent banner. Refusing does not affect any part of the product.
              </p>
            </>
          ),
        },
        {
          id: 'marketing',
          title: 'Marketing: none',
          body: (
            <>
              <p>
                Hosea Minds does not run advertising, so there are no advertising cookies to consent to. There is
                no Facebook Pixel, no TikTok Pixel, no Google Ads tag, no LinkedIn Insight tag, and no marketing tag
                manager on this site.
              </p>
              <p>
                <strong>Mental health journal data is never used for advertising.</strong> Your entries, moods, tags,
                and check ins are not shared with advertising networks, not used to build audiences, and not used to
                train marketing models. This is a product decision, not a setting you need to find.
              </p>
            </>
          ),
        },
        {
          id: 'third-party',
          title: 'Third party services',
          body: (
            <>
              <p>
                Google reCAPTCHA may set cookies when it verifies a form submission. It receives a risk score and
                technical signals, never the content of your journal entry. It is not used on the crisis page,
                which has no forms at all.
              </p>
              <p>
                Fonts are loaded from Google Fonts. Vercel hosts the application. Neither service receives your
                journal content.
              </p>
            </>
          ),
        },
        {
          id: 'control',
          title: 'Controlling cookies in your browser',
          body: (
            <>
              <p>
                Every major browser lets you view, block, and delete cookies. Blocking necessary cookies will sign
                you out and prevent forms from working, but the rest of the site, including the crisis page, will
                still load.
              </p>
              <p>
                Questions about cookies or privacy can be sent to hello@hoseaminds.co.ke. For the full picture of how
                we handle sensitive data, read the{' '}
                <Link href="/legal/privacy-policy" className="link-underline font-semibold text-primary">
                  privacy policy
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
