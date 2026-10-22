'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { CaptchaV2, useCaptcha } from './CaptchaField'

const topics = [
  { value: 'partnership', label: 'Partnership or funding' },
  { value: 'press', label: 'Press or media' },
  { value: 'support', label: 'Support with the platform' },
  { value: 'other', label: 'Something else' },
]

export function EnquiryForm() {
  const captcha = useCaptcha('send-enquiry')
  const [form, setForm] = useState({
    name: '',
    email: '',
    organisation: '',
    topic: 'partnership',
    message: '',
  })
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const update = (key: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setPending(true)
    const captchaPayload = await captcha.prepare()
    try {
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...captchaPayload }),
      })
      const data = (await response.json()) as {
        ok?: boolean
        error?: string
        message?: string
        needsV2?: boolean
      }
      if (!response.ok || !data.ok) {
        if (data.needsV2) captcha.setNeedsV2(true)
        setError(data.error ?? 'That did not send. Please email hello@hoseaminds.co.ke instead.')
        return
      }
      setSuccess(data.message ?? 'Thank you. We will reply within two working days.')
      setForm({ name: '', email: '', organisation: '', topic: 'partnership', message: '' })
      captcha.reset()
    } catch {
      setError('That did not send. Please email hello@hoseaminds.co.ke instead.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-soft p-5 sm:p-7 text-left" noValidate>
      <h3 className="font-display text-xl font-semibold text-dark">Send us a note</h3>
      <p className="mt-1 text-sm text-dark/60">
        Partnerships, press, or a quiet question. We read every message ourselves.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-name" className="field-label">
            Your name
          </label>
          <input id="enquiry-name" className="field" value={form.name} onChange={update('name')} required />
        </div>
        <div>
          <label htmlFor="enquiry-email" className="field-label">
            Email address
          </label>
          <input
            id="enquiry-email"
            type="email"
            className="field"
            value={form.email}
            onChange={update('email')}
            required
          />
        </div>
        <div>
          <label htmlFor="enquiry-org" className="field-label">
            Organisation (optional)
          </label>
          <input id="enquiry-org" className="field" value={form.organisation} onChange={update('organisation')} />
        </div>
        <div>
          <label htmlFor="enquiry-topic" className="field-label">
            What is this about?
          </label>
          <select id="enquiry-topic" className="field" value={form.topic} onChange={update('topic')}>
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="enquiry-message" className="field-label">
          Your message
        </label>
        <textarea
          id="enquiry-message"
          className="field min-h-[140px] w-full resize-y"
          value={form.message}
          onChange={update('message')}
          required
          maxLength={3000}
        />
      </div>

      {captcha.needsV2 ? (
        <div className="mt-4">
          <CaptchaV2
            onToken={(token) => {
              captcha.setV2Token(token)
              setError(null)
            }}
          />
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-secondary/10 p-3 text-sm text-dark">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      {success ? (
        <p role="status" className="mt-4 flex items-start gap-2 rounded-xl bg-primary/10 p-3 text-sm text-dark">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-[44px] rounded-xl bg-primary px-6 font-display font-semibold text-white btn-primary disabled:opacity-70"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {pending ? 'Sending' : 'Send enquiry'}
      </button>
      <p className="mt-3 text-xs text-dark/50">
        This form is not monitored around the clock. If you need support now, please call a helpline.
      </p>
    </form>
  )
}
