import Link from 'next/link'
import { Facebook, HeartPulse, Instagram, Mail, Phone, Twitter } from 'lucide-react'
import { HELPLINES, SITE, WHATSAPP_LINK } from '@/lib/constants'
import { WhatsAppIcon } from './icons'

const explore = [
  { href: '/', label: 'Home' },
  { href: '/resources', label: 'Self help resources' },
  { href: '/groups', label: 'Peer support groups' },
  { href: '/tracker', label: 'Mood tracker' },
  { href: '/check-in', label: 'Quick check in' },
  { href: '/about', label: 'About Hosea Minds' },
]

const account = [
  { href: '/journal', label: 'Journal' },
  { href: '/profile', label: 'Your profile' },
  { href: '/login', label: 'Sign in' },
  { href: '/register', label: 'Create account' },
  { href: '/crisis', label: 'Crisis support' },
]

const legal = [
  { href: '/legal/privacy-policy', label: 'Privacy policy' },
  { href: '/legal/terms', label: 'Terms of use' },
  { href: '/legal/cookie-policy', label: 'Cookie policy' },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-dark/5 bg-[#F6FBFE]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 min-h-[44px]">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                <HeartPulse className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-bold text-primary">Hosea Minds</span>
            </Link>
            <p className="mt-4 text-sm text-dark/70 leading-relaxed">{SITE.tagline}</p>
            <p className="mt-3 text-sm text-dark/60 leading-relaxed">
              A community mental health tracker and journal, made for Kenya.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-2 min-h-[44px] rounded-xl bg-white px-4 text-sm font-semibold text-primary shadow-sm border border-dark/5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat with us on WhatsApp
            </a>
            <div className="mt-4 flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Hosea Minds on Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-dark/70 hover:text-primary border border-dark/5"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Hosea Minds on Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-dark/70 hover:text-primary border border-dark/5"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Hosea Minds on X"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-dark/70 hover:text-primary border border-dark/5"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email Hosea Minds"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-dark/70 hover:text-primary border border-dark/5"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Explore Hosea Minds">
            <h3 className="font-display text-sm uppercase tracking-[0.16em] text-dark/50">Explore</h3>
            <ul className="mt-4 space-y-1">
              {explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center min-h-[44px] text-sm text-dark/70 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Your account">
            <h3 className="font-display text-sm uppercase tracking-[0.16em] text-dark/50">Your space</h3>
            <ul className="mt-4 space-y-1">
              {account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center min-h-[44px] text-sm text-dark/70 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-display text-sm uppercase tracking-[0.16em] text-dark/50">Legal</h3>
            <ul className="mt-4 space-y-1">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center min-h-[44px] text-sm text-dark/70 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-2xl bg-white p-5 border border-secondary/30 shadow-sm">
            <h3 className="font-display text-base font-semibold text-secondary">Need someone now?</h3>
            <p className="mt-2 text-sm text-dark/70">
              If you are in immediate danger, call 999 now. These lines are free and confidential.
            </p>
            <ul className="mt-3 space-y-2">
              {HELPLINES.slice(0, 2).map((line) => (
                <li key={line.name}>
                  <p className="text-xs uppercase tracking-wide text-dark/50">{line.name}</p>
                  <a
                    href={`tel:${line.tel}`}
                    className="inline-flex items-center gap-2 min-h-[44px] font-display text-lg font-bold text-dark hover:text-secondary"
                  >
                    <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
                    {line.number}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/crisis"
              className="mt-3 inline-flex w-full items-center justify-center min-h-[44px] rounded-xl bg-secondary px-4 text-sm font-semibold text-white btn-secondary"
            >
              Open crisis support
            </Link>
            <p className="mt-3 text-xs text-dark/50">
              Crisis support is always free, always public, and never asks you to sign in.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-dark/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-dark/50">
            © {new Date().getFullYear()} Hosea Minds. Made in Nairobi for Kenyans.
          </p>
          <p className="text-xs text-dark/50 max-w-xl">
            Hosea Minds is a self help tool, not a substitute for professional care. If life feels unsafe,
            please contact a helpline above or a health worker near you.
          </p>
        </div>
      </div>
    </footer>
  )
}
