'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Cookie, X } from 'lucide-react'
import { Toggle } from './ui'

const STORAGE_KEY = 'hosea-minds-cookie-consent'

interface ConsentState {
  necessary: true
  functional: boolean
  analytics: boolean
  marketing: boolean
  version: number
  savedAt: string
}

const defaultState: ConsentState = {
  necessary: true,
  functional: true,
  analytics: false,
  marketing: false,
  version: 1,
  savedAt: '',
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState<ConsentState>(defaultState)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ConsentState
        // Reading persisted consent on mount is the point of this effect.
        setPrefs({ ...defaultState, ...parsed })
        return
      } catch {
        // ignore malformed values and ask again
      }
    }
    const timer = window.setTimeout(() => setVisible(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('consent-open', visible)
    return () => document.documentElement.classList.remove('consent-open')
  }, [visible])

  const save = (next: ConsentState) => {
    const record = { ...next, necessary: true as const, savedAt: new Date().toISOString() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
    setPrefs(record)
    setVisible(false)
    setShowModal(false)
  }

  const acceptAll = () =>
    save({ ...prefs, necessary: true, functional: true, analytics: true, marketing: false })

  if (!visible) return null

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[9999] bg-white border-t border-dark/10 shadow-[0_-12px_40px_-24px_rgba(9,30,62,.45)] pb-safe"
        role="region"
        aria-label="Cookie consent"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-light text-primary">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display font-semibold text-dark text-sm sm:text-base">
                  A note on cookies, and on your privacy
                </p>
                <p className="mt-1 text-xs sm:text-sm text-dark/70 leading-relaxed max-w-2xl">
                  We use necessary cookies to keep you signed in, and optional ones to understand which pages
                  help people most. Your journal entries and mood data are never used for advertising, and we
                  load no advertising or social media pixels. Read the{' '}
                  <Link href="/legal/cookie-policy" className="link-underline text-primary">
                    cookie policy
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center min-h-[44px] rounded-xl border border-dark/15 px-4 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
              >
                Manage preferences
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center min-h-[44px] rounded-xl bg-primary px-5 text-sm font-semibold text-white btn-primary"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center bg-dark/40 p-0 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 p-5 border-b border-dark/5">
              <div>
                <h2 id="cookie-modal-title" className="font-display text-lg sm:text-xl font-semibold text-dark">
                  Your cookie choices
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-dark/60">
                  You are in control. Necessary cookies cannot be switched off because the site cannot keep you
                  signed in without them.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close cookie preferences"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-dark/60 hover:bg-light"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-dark/5 px-5">
              <Toggle
                id="cookie-necessary"
                checked
                disabled
                onChange={() => {}}
                label="Necessary (always on)"
                description="Session cookies that keep you signed in and protect your forms from abuse."
              />
              <Toggle
                id="cookie-functional"
                checked={prefs.functional}
                onChange={(value) => setPrefs((current) => ({ ...current, functional: value }))}
                label="Functional"
                description="Remembers small preferences, such as whether you have already heard the voice tour."
              />
              <Toggle
                id="cookie-analytics"
                checked={prefs.analytics}
                onChange={(value) => setPrefs((current) => ({ ...current, analytics: value }))}
                label="Analytics"
                description="Aggregate page views through Vercel Analytics. No journal text, mood values, or group messages are ever collected."
              />
              <Toggle
                id="cookie-marketing"
                checked={prefs.marketing}
                onChange={(value) => setPrefs((current) => ({ ...current, marketing: value }))}
                label="Marketing (not used)"
                description="Hosea Minds runs no advertising scripts, no Facebook Pixel and no TikTok Pixel, so there is nothing to switch on here."
              />
            </div>

            <div className="p-5 border-t border-dark/5">
              <p className="text-xs text-dark/60 mb-4">
                Mental health journal data is never used for advertising, profiling, or resale, whatever you
                choose here.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => save({ ...prefs, necessary: true })}
                  className="inline-flex items-center justify-center min-h-[44px] flex-1 rounded-xl border border-primary px-4 text-sm font-semibold text-primary hover:bg-light"
                >
                  Save my choices
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center min-h-[44px] flex-1 rounded-xl bg-primary px-4 text-sm font-semibold text-white btn-primary"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
