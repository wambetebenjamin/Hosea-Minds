'use client'

interface GrecaptchaV3 {
  ready: (callback: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaV3 & {
      render?: (element: HTMLElement, options: Record<string, unknown>) => number
      reset?: (id?: number) => void
    }
  }
}

const V3_SCRIPT_ID = 'recaptcha-v3-script'

export function captchaConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
}

function loadV3(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve()
    if (window.grecaptcha?.execute) return resolve()
    const existing = document.getElementById(V3_SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('reCAPTCHA failed to load')))
      return
    }
    const script = document.createElement('script')
    script.id = V3_SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'))
    document.head.appendChild(script)
  })
}

/**
 * Invisible v3 token. Returns null when no site key is configured so the app
 * stays usable in preview, where the server side check is also skipped.
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (!captchaConfigured()) return null
  try {
    await loadV3()
    const grecaptcha = window.grecaptcha
    if (!grecaptcha?.execute) return null
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
    const token = await new Promise<string>((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(siteKey, { action }).then(resolve).catch(reject)
      })
    })
    return token
  } catch {
    return null
  }
}

/** Loads the visible v2 widget only after a low v3 score. */
export async function loadV2Script(): Promise<void> {
  const id = 'recaptcha-v2-script'
  if (document.getElementById(id)) return
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.id = id
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'))
    document.head.appendChild(script)
  })
}
