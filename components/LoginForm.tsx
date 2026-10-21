'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'

export function LoginForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') ?? '/journal'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setPending(true)
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setPending(false)
    if (result?.error) {
      setError('That email and password did not match. Take a breath and try again.')
      return
    }
    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <div className="space-y-5">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="login-email" className="field-label">
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="field-label">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field pr-14"
              placeholder="Your password"
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
          {pending ? 'Signing you in' : 'Sign in'}
          {!pending ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
        </button>
      </form>

      {googleEnabled ? (
        <>
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-dark/40">
            <span className="h-px flex-1 bg-dark/10" />
            or
            <span className="h-px flex-1 bg-dark/10" />
          </div>
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl })}
            className="inline-flex w-full items-center justify-center gap-3 min-h-[48px] rounded-xl border border-dark/15 bg-white px-6 font-display font-semibold text-dark hover:border-primary hover:text-primary"
          >
            Continue with Google
          </button>
        </>
      ) : null}

      <p className="text-center text-sm text-dark/60">
        New here?{' '}
        <Link href="/register" className="link-underline font-semibold text-primary">
          Create a free account
        </Link>
      </p>
    </div>
  )
}
