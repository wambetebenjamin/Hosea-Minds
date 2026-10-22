'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { MOODS } from '@/lib/constants'
import { todayISO } from '@/lib/utils'
import type { MoodValue } from '@/lib/types'
import { CaptchaV2, useCaptcha } from './CaptchaField'

export function CheckInForm({ lastCheckIn }: { lastCheckIn: string | null }) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const captcha = useCaptcha('check-in')

  const [mood, setMood] = useState<MoodValue | null>(null)
  const [note, setNote] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!mood) {
      setError('Choose the face that fits today. That is the only thing we need.')
      return
    }

    setPending(true)
    const captchaPayload = await captcha.prepare()
    const response = await fetch('/api/checkins/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: todayISO(), mood, note, ...captchaPayload }),
    })
    const data = (await response.json()) as { ok?: boolean; error?: string; needsV2?: boolean }
    setPending(false)

    if (!response.ok || !data.ok) {
      if (data.needsV2) captcha.setNeedsV2(true)
      setError(data.error ?? 'That did not save. Please try again.')
      return
    }

    setDone(true)
    captcha.reset()
    router.refresh()
  }

  if (done) {
    return (
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        className="card-soft p-8 text-center"
        role="status"
      >
        <span className="icon-tile mx-auto">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-xl sm:text-2xl font-semibold text-dark">
          Thank you for checking in. You showed up for yourself today.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-dark/70">
          That was enough. You can close this page, or stay a moment longer if you would like.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false)
            setMood(null)
            setNote('')
          }}
          className="mt-6 inline-flex items-center justify-center min-h-[44px] rounded-xl border border-dark/15 px-5 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
        >
          Check in again
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card-soft p-5 sm:p-8" noValidate>
      <div className="space-y-7">
        <div>
          <h2 className="field-label">How are you today?</h2>
          <div className="grid grid-cols-5 gap-1 sm:gap-2" role="radiogroup" aria-label="Mood">
            {MOODS.map((option) => {
              const selected = mood === option.value
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={option.label}
                  onClick={() => setMood(option.value)}
                  whileHover={reduceMotion ? undefined : { scale: 1.08, y: -3 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className={`flex min-w-[44px] min-h-[44px] flex-col items-center justify-center rounded-xl border px-1 py-2 text-xl sm:text-2xl transition-colors ${
                    selected
                      ? 'border-primary bg-light text-primary ring-2 ring-primary/30'
                      : 'border-dark/10 bg-white hover:border-primary/40'
                  }`}
                >
                  <span aria-hidden="true">{option.emoji}</span>
                  <span className="mt-1 text-[10px] sm:text-xs font-medium text-dark/60">{option.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>

        <div>
          <label htmlFor="checkin-note" className="field-label">
            What is one thing on your mind today?
          </label>
          <input
            id="checkin-note"
            type="text"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="field"
            placeholder="One sentence is plenty."
            maxLength={400}
          />
        </div>

        {lastCheckIn ? (
          <p className="rounded-xl bg-light p-3 text-xs text-dark/60">
            Your last check in was on {lastCheckIn}. There is no penalty for missing a day.
          </p>
        ) : null}

        {captcha.needsV2 ? (
          <CaptchaV2
            onToken={(token) => {
              captcha.setV2Token(token)
              setError(null)
            }}
          />
        ) : null}

        {error ? (
          <p role="alert" className="flex items-start gap-2 rounded-xl bg-secondary/10 p-3 text-sm text-dark">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 min-h-[48px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary disabled:opacity-70"
        >
          {pending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Saving your check in' : 'Save check in'}
        </button>
        <p className="text-center text-xs text-dark/50">
          This takes less than a minute. That is the whole point.
        </p>
      </div>
    </form>
  )
}
