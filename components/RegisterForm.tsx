'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import { CaptchaV2, useCaptcha } from './CaptchaField'

export function RegisterForm() {
  const router = useRouter()
  const captcha = useCaptcha('register')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [consent, setConsent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!consent) {
      setError('Please agree to the privacy notice so we can store your entries.')
      return
    }

    setPending(true)
    const captchaPayload = await captcha.prepare()
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        displayName: displayName || undefined,
        consent: true,
        ...captchaPayload,
      }),
    })
    const data = (await response.json()) as { ok?: boolean; error?: string; needsV2?: boolean }
    if (!response.ok || !data.ok) {
      setPending(false)
      if (data.needsV2) {
        captcha.setNeedsV2(true)
        setError('One quick check before we continue.')
        return
      }
      setError(data.error ?? 'Something went wrong. Please try again.')
      return
    }

    const signInResult = await signIn('credentials', { email, password, redirect: false })
    setPending(false)
    if (signInResult?.error) {
      router.push('/login')
      return
    }
    router.push('/journal?welcome=1')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="register-email" className="field-label">
          Email address
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field"
          placeholder="you@example.com"
        />
        <p className="mt-1 text-xs text-dark/50">Only used to sign you in and to send the reminders you choose.</p>
      </div>

      <div>
        <label htmlFor="register-display" className="field-label">
          Display name <span className="font-normal text-dark/50">(optional)</span>
        </label>
        <input
          id="register-display"
          type="text"
          autoComplete="nickname"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          className="field"
          placeholder="Leave blank to stay anonymous in groups"
          maxLength={60}
        />
      </div>

      <div>
        <label htmlFor="register-password" className="field-label">
          Password
        </label>
        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="field pr-14"
            placeholder="At least 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-dark/50 hover:text-dark"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-xl bg-light p-4 text-sm text-dark/75">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 rounded border-dark/30 text-primary focus:ring-primary"
          required
        />
        <span>
          I agree to the{' '}
          <Link href="/legal/privacy-policy" className="link-underline font-semibold text-primary">
            privacy notice
          </Link>{' '}
          and understand that my journal entries are sensitive personal data stored under the Kenya Data
          Protection Act 2019. I can export or delete everything at any time.
        </span>
      </label>

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
        {pending ? 'Creating your space' : 'Create my account'}
        {!pending ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
      </button>

      <p className="text-center text-xs text-dark/50">
        No card, no trial, no advertising. Just a private space that is yours.
      </p>
    </form>
  )
}
