'use client'

import { useEffect } from 'react'

/**
 * Lenis smooth scroll. Slow and deliberate, and switched off entirely for
 * visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let lenis: { destroy: () => void } | null = null
    let cancelled = false

    const setup = async () => {
      const { default: Lenis } = await import('lenis')
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
        autoRaf: true,
      })
    }

    setup().catch(() => {
      // Smooth scroll is a progressive enhancement.
    })

    return () => {
      cancelled = true
      lenis?.destroy()
    }
  }, [])

  return null
}
