'use client'

import { useEffect, useRef } from 'react'

/**
 * Slow, satisfying count up with GSAP. If the visitor prefers reduced motion
 * the final number is simply shown.
 */
export function StreakCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      node.textContent = String(value)
      return
    }

    let killed = false
    const run = async () => {
      const { gsap } = await import('gsap')
      if (killed) return
      const counter = { current: 0 }
      node.textContent = '0'
      gsap.to(counter, {
        current: value,
        duration: Math.min(2.4, 1.2 + value * 0.04),
        ease: 'power3.out',
        onUpdate: () => {
          node.textContent = String(Math.round(counter.current))
        },
        onComplete: () => {
          node.textContent = String(value)
        },
      })
    }
    run().catch(() => {
      node.textContent = String(value)
    })

    return () => {
      killed = true
    }
  }, [value])

  return (
    <span ref={ref} aria-live="polite" aria-label={`${value} day streak`}>
      {value}
    </span>
  )
}
