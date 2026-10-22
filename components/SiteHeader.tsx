'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { HeartPulse, LogOut, Menu, Phone, X } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_LINK } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const { status } = useSession()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden lg:block bg-light border-b border-dark/5">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            <p className="py-2 text-xs sm:text-sm text-dark/70 inline-flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-primary" aria-hidden="true" />
              A safe space to track how you feel, any day of the week.
            </p>
            <div className="top-shape relative bg-primary text-white px-5 flex items-center gap-5">
              <a
                href={`tel:${'0800723253'}`}
                className="py-2 text-xs sm:text-sm inline-flex items-center gap-2 min-h-[44px]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Befrienders Kenya 0800 723 253
              </a>
              <span className="h-6 w-px bg-white/40" aria-hidden="true" />
              <Link href="/crisis" className="py-2 text-xs sm:text-sm font-semibold underline underline-offset-4">
                Crisis support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white/95 backdrop-blur border-b border-dark/5 shadow-sm" aria-label="Main">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-3">
            <Link href="/" className="flex items-center gap-2 min-h-[44px]" onClick={closeMenu}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-light text-primary">
                <HeartPulse className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg sm:text-2xl font-bold text-primary">Hosea Minds</span>
                <span className="mt-1 hidden sm:block text-[10px] sm:text-xs uppercase tracking-[0.16em] text-dark/50">
                  You are not alone
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden md:flex items-center">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'px-3 py-2 font-display text-[15px] lg:text-[17px] rounded-lg transition-colors min-h-[44px] inline-flex items-center',
                      isActive(link.href) ? 'text-primary' : 'text-dark hover:text-primary',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/crisis"
                aria-current={isActive('/crisis') ? 'page' : undefined}
                className="inline-flex md:hidden items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 rounded-xl border border-secondary text-secondary font-display font-semibold text-sm"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Crisis
              </Link>

              <Link
                href="/crisis"
                aria-current={isActive('/crisis') ? 'page' : undefined}
                className={cn(
                  'hidden md:inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl border font-display font-semibold text-sm transition-colors',
                  isActive('/crisis')
                    ? 'bg-secondary text-white border-secondary'
                    : 'border-secondary text-secondary hover:bg-secondary hover:text-white',
                )}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Crisis support
              </Link>

              {status === 'authenticated' ? (
                <>
                  <Link
                    href="/journal"
                    className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-5 rounded-xl bg-primary text-white font-display font-semibold text-sm transition-colors btn-primary"
                  >
                    My journal
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="hidden lg:inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 rounded-xl text-dark/60 hover:text-dark"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-4 rounded-xl text-dark font-display font-semibold text-sm hover:text-primary"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="hidden md:inline-flex items-center justify-center min-h-[44px] px-5 rounded-xl bg-primary text-white font-display font-semibold text-sm transition-colors btn-primary"
                  >
                    Create account
                  </Link>
                </>
              )}

              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl text-dark hover:bg-light"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {open ? (
            <div id="mobile-navigation" className="md:hidden pb-4 border-t border-dark/5 pt-2">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      'min-h-[44px] flex items-center px-2 py-3 font-display text-base border-b border-dark/5',
                      isActive(link.href) ? 'text-primary' : 'text-dark',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/check-in"
                  onClick={closeMenu}
                  className="min-h-[44px] flex items-center px-2 py-3 font-display text-base border-b border-dark/5 text-dark"
                >
                  Quick check in
                </Link>
                <Link
                  href="/crisis"
                  onClick={closeMenu}
                  className="min-h-[44px] flex items-center px-2 py-3 font-display text-base text-secondary font-semibold"
                >
                  Crisis support
                </Link>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {status === 'authenticated' ? (
                  <>
                    <Link
                      href="/journal"
                      onClick={closeMenu}
                      className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-white font-display font-semibold"
                    >
                      My journal
                    </Link>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-dark/10 px-5 py-3 font-display font-semibold text-dark"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/register"
                      onClick={closeMenu}
                      className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-white font-display font-semibold"
                    >
                      Create a free account
                    </Link>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-dark/10 px-5 py-3 font-display font-semibold text-dark"
                    >
                      Sign in
                    </Link>
                  </>
                )}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-light px-5 py-3 font-display font-semibold text-primary"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
