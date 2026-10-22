'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertCircle, Camera, CheckCircle2, Loader2, Save, X } from 'lucide-react'
import { MOODS, TAGS } from '@/lib/constants'
import { todayISO } from '@/lib/utils'
import type { MoodValue } from '@/lib/types'
import { executeRecaptcha } from '@/lib/recaptcha-client'
import { CaptchaV2, useCaptcha } from './CaptchaField'

export function JournalForm() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const captcha = useCaptcha('journal')

  const [date, setDate] = useState(todayISO())
  const [mood, setMood] = useState<MoodValue | null>(null)
  const [energy, setEnergy] = useState(5)
  const [text, setText] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement | null>(null)

  const toggleTag = (tag: string) => {
    setTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    )
  }

  const onPhoto = async (file: File | undefined) => {
    if (!file) return
    setUploadError(null)
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const token = await executeRecaptcha('upload')
      if (token) form.append('captchaToken', token)
      const response = await fetch('/api/upload', { method: 'POST', body: form })
      const data = (await response.json()) as { ok?: boolean; url?: string; error?: string }
      if (!response.ok || !data.ok || !data.url) {
        setUploadError(data.error ?? 'That photo did not upload. You can still save the entry.')
        return
      }
      setPhotoUrl(data.url)
    } catch {
      setUploadError('That photo did not upload. You can still save the entry.')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!mood) {
      setError('Choose the face that is closest to how you feel today.')
      return
    }
    if (text.trim().length < 3) {
      setError('Write at least a few words. A single sentence is enough.')
      return
    }

    setPending(true)
    const captchaPayload = await captcha.prepare()
    const response = await fetch('/api/journal/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        mood,
        energy,
        text,
        tags,
        photoUrl: photoUrl ?? undefined,
        ...captchaPayload,
      }),
    })
    const data = (await response.json()) as {
      ok?: boolean
      error?: string
      needsV2?: boolean
      message?: string
    }
    setPending(false)

    if (!response.ok || !data.ok) {
      if (data.needsV2) captcha.setNeedsV2(true)
      setError(data.error ?? 'We could not save that entry. Please try again.')
      return
    }

    setSuccess(data.message ?? 'Saved. Thank you for showing up for yourself today.')
    setMood(null)
    setEnergy(5)
    setText('')
    setTags([])
    setPhotoUrl(null)
    setDate(todayISO())
    captcha.reset()
    router.refresh()
  }

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <form onSubmit={onSubmit} className="card-soft p-5 sm:p-7" noValidate>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: reduceMotion ? 0 : 0.14 } } }}
        className="space-y-6"
      >
        <motion.div variants={item} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-dark">Today&apos;s entry</h2>
          <p className="mt-1 text-sm text-dark/60">
            Nothing here is graded. Write as little or as much as you want.
          </p>
        </motion.div>

        <motion.div variants={item} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <label htmlFor="entry-date" className="field-label">
            Date
          </label>
          <input
            id="entry-date"
            type="date"
            value={date}
            max={todayISO()}
            onChange={(event) => setDate(event.target.value)}
            className="field max-w-xs"
            required
          />
        </motion.div>

        <motion.fieldset variants={item} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <legend className="field-label">How are you feeling?</legend>
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
        </motion.fieldset>

        <motion.div variants={item} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <label htmlFor="entry-energy" className="field-label flex items-center justify-between gap-3">
            <span>Energy level</span>
            <span className="font-display text-sm text-primary">{energy} / 10</span>
          </label>
          <input
            id="entry-energy"
            type="range"
            min={1}
            max={10}
            step={1}
            value={energy}
            onChange={(event) => setEnergy(Number(event.target.value))}
            className="w-full accent-[var(--primary)] h-11"
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={energy}
            aria-valuetext={`${energy} out of 10`}
          />
          <div className="flex justify-between text-[11px] text-dark/40">
            <span>Running on empty</span>
            <span>Fully charged</span>
          </div>
        </motion.div>

        <motion.div variants={item} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <label htmlFor="entry-text" className="field-label">
            What is on your mind?
          </label>
          <textarea
            id="entry-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="field min-h-[160px] sm:min-h-[200px] w-full resize-y leading-relaxed"
            placeholder="Start anywhere. The matatu this morning, a message you have not replied to, something good that happened."
            maxLength={6000}
          />
          <p className="mt-1 text-right text-xs text-dark/40">{text.length} / 6000</p>
        </motion.div>

        <motion.fieldset variants={item} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <legend className="field-label">Tags (optional)</legend>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => {
              const active = tags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center justify-center min-h-[44px] rounded-full px-4 text-sm font-medium transition-colors ${
                    active ? 'bg-primary text-white' : 'bg-light text-dark/70 hover:bg-primary/10'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </motion.fieldset>

        <motion.div variants={item} transition={{ duration: 0.7, ease: 'easeOut' }}>
          <span className="field-label">Photo (optional)</span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-dark/15 px-4 text-sm font-semibold text-dark hover:border-primary hover:text-primary"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              {uploading ? 'Uploading' : photoUrl ? 'Replace photo' : 'Add a photo'}
            </button>
            {photoUrl ? (
              <button
                type="button"
                onClick={() => setPhotoUrl(null)}
                className="inline-flex items-center justify-center gap-1 min-h-[44px] rounded-xl px-3 text-sm text-dark/60 hover:text-secondary"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Remove
              </button>
            ) : null}
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              className="sr-only"
              onChange={(event) => onPhoto(event.target.files?.[0])}
            />
          </div>
          <p className="mt-1 text-xs text-dark/50">
            Stored privately against your account. JPG, PNG, or WEBP, up to 4MB.
          </p>
          {uploadError ? <p className="mt-2 text-xs text-secondary">{uploadError}</p> : null}
          {photoUrl ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-dark/10 max-w-xs">
              <Image src={photoUrl} alt="Attached journal photo" width={400} height={300} className="h-auto w-full object-cover" />
            </div>
          ) : null}
        </motion.div>

        {captcha.needsV2 ? (
          <motion.div variants={item}>
            <CaptchaV2
              onToken={(token) => {
                captcha.setV2Token(token)
                setError(null)
              }}
            />
          </motion.div>
        ) : null}

        <motion.div variants={item} transition={{ duration: 0.7, ease: 'easeOut' }} className="space-y-3">
          <AnimatePresence>
            {error ? (
              <motion.p
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-secondary/10 p-3 text-sm text-dark"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                {error}
              </motion.p>
            ) : null}
            {success ? (
              <motion.p
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                className="flex items-start gap-2 rounded-xl bg-primary/10 p-3 text-sm text-dark"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {success}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 min-h-[48px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary disabled:opacity-70 sm:w-auto"
          >
            {pending ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
            {pending ? 'Saving your entry' : 'Save entry'}
          </button>
          <p className="text-xs text-dark/50">
            Only you can read this. It is never shared with peer groups or used for advertising.
          </p>
        </motion.div>
      </motion.div>
    </form>
  )
}
