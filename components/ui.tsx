'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'section-title',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl',
        className,
      )}
    >
      {eyebrow ? (
        <div className={cn('mb-4', align === 'center' ? 'flex justify-center' : 'flex justify-start')}>
          <h5 className="relative inline-block text-sm sm:text-base font-weight-semi-bold uppercase tracking-[0.18em] text-primary pr-0">
            {eyebrow}
          </h5>
        </div>
      ) : null}
      <h2 id={id} className="text-2xl sm:text-3xl lg:text-4xl text-dark">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-dark/70">{description}</p>
      ) : null}
    </div>
  )
}

export function Pill({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode
  tone?: 'light' | 'primary' | 'secondary' | 'outline'
  className?: string
}) {
  const tones = {
    light: 'bg-light text-dark',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    outline: 'border border-dark/10 text-dark/70',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Toggle({
  id,
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  id: string
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  description?: string
  disabled?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <label htmlFor={id} className="block font-display font-semibold text-dark text-sm sm:text-base">
          {label}
        </label>
        {description ? <p className="mt-1 text-xs sm:text-sm text-dark/60">{description}</p> : null}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative shrink-0 inline-flex h-8 w-14 items-center rounded-full transition-colors min-h-[44px] min-w-[44px] justify-center',
          checked ? 'bg-primary' : 'bg-dark/15',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
        )}
      >
        <span
          className={cn(
            'absolute h-6 w-6 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-3' : '-translate-x-3',
          )}
        />
        <span className="sr-only">{checked ? 'On' : 'Off'}</span>
      </button>
    </div>
  )
}

export function Spinner({ label = 'Working' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  )
}
