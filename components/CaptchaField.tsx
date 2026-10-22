'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { captchaConfigured, executeRecaptcha, loadV2Script, } from '@/lib/recaptcha-client'
import { ShieldCheck } from 'lucide-react'

export function useCaptcha(action: string) {
  const [needsV2, setNeedsV2] = useState(false)
  const [v2Token, setV2Token] = useState<string | null>(null)

  const prepare = useCallback(async (): Promise<Record<string, string>> => {
    if (needsV2) {
      return v2Token ? { captchaV2Token: v2Token } : {}
    }
    const token = await executeRecaptcha(action)
    return token ? { captchaToken: token } : {}
  }, [action, needsV2, v2Token])

  return {
    prepare,
    needsV2,
    v2Token,
    setNeedsV2,
    setV2Token,
    reset: () => {
      setNeedsV2(false)
      setV2Token(null)
    },
  }
}

export function CaptchaV2({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement | null>(null)
  const rendered = useRef(false)

  useEffect(() => {
    if (!captchaConfigured()) return
    let cancelled = false
    const mount = async () => {
      await loadV2Script()
      if (cancelled || rendered.current || !container.current) return
      const grecaptcha = window.grecaptcha
      if (!grecaptcha?.render) return
      rendered.current = true
      grecaptcha.render(container.current, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        callback: (token: string) => onToken(token),
        theme: 'light',
      })
    }
    mount().catch(() => {})
    return () => {
      cancelled = true
    }
  }, [onToken])

  return (
    <div className="rounded-xl border border-primary/30 bg-light p-4">
      <p className="flex items-center gap-2 text-sm text-dark mb-3">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
        One quick check before we save this.
      </p>
      <div ref={container} />
      {!captchaConfigured() ? (
        <p className="text-xs text-dark/60">Verification is not configured in this preview.</p>
      ) : null}
    </div>
  )
}
