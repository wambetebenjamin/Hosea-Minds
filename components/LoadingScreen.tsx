'use client'

import { useEffect, useState } from 'react'
import { HeartPulse } from 'lucide-react'

/**
 * The preloader from the uploaded template, reproduced: three growing dots in
 * the template colours on a white field, with role="status". It clears itself
 * quickly so nobody is ever held up, and it never traps focus. Motion is
 * handled entirely in CSS so reduced motion visitors get plain text.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const quick = window.setTimeout(() => setVisible(false), 500)
      return () => window.clearTimeout(quick)
    }
    const timer = window.setTimeout(() => setVisible(false), 1100)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div
      id="spinner"
      className={`${visible ? 'show' : ''} bg-white position-fixed fixed inset-0 z-[99999] flex items-center justify-center`}
      role="status"
      aria-live="polite"
      aria-hidden={visible ? undefined : 'true'}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-2">
          <div className="spinner-grow h-3 w-3 animate-pulse rounded-full bg-primary motion-reduce:hidden" />
          <div className="spinner-grow h-3 w-3 animate-pulse rounded-full bg-dark [animation-delay:150ms] motion-reduce:hidden" />
          <div className="spinner-grow h-3 w-3 animate-pulse rounded-full bg-secondary [animation-delay:300ms] motion-reduce:hidden" />
          <span className="hidden font-display text-lg font-semibold text-primary motion-reduce:inline">
            Hosea Minds is loading
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <HeartPulse className="h-5 w-5" aria-hidden="true" />
          <span className="font-display text-sm uppercase tracking-[0.2em]">Hosea Minds</span>
        </div>
        <span className="sr-only">Loading, please wait.</span>
      </div>
    </div>
  )
}
