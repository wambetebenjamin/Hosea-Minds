import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { CookieConsent } from '@/components/CookieConsent'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { VoiceTour } from '@/components/VoiceTour'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SmoothScroll } from '@/components/SmoothScroll'
import { SITE } from '@/lib/constants'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hoseaminds.co.ke'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hosea Minds | Your mental health journey starts here',
    template: '%s | Hosea Minds',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'mental health Kenya',
    'mood tracker',
    'journal Kenya',
    'peer support',
    'anxiety support Nairobi',
  ],
  openGraph: {
    title: 'Hosea Minds',
    description: SITE.tagline,
    url: siteUrl,
    siteName: SITE.name,
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hosea Minds',
    description: SITE.tagline,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#EEF9FF',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts inherited exactly from the uploaded template */}
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only-focusable fixed left-4 top-4 z-[10001] rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
        >
          Skip to content
        </a>
        <LoadingScreen />
        <Providers>
          <SmoothScroll />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <WhatsAppButton />
          <VoiceTour />
          <CookieConsent />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
