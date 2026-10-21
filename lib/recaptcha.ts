export interface CaptchaResult {
  ok: boolean
  score: number | null
  /** true when the score sat below 0.5 and the visitor must pass a visible v2 check */
  needsV2: boolean
  reason?: string
}

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const THRESHOLD = 0.5

/**
 * Server side reCAPTCHA verification. The secret key never reaches the client.
 *
 * When RECAPTCHA_SECRET_KEY is not configured the check is skipped so that a
 * preview deployment without keys is still usable. As soon as the key exists
 * every POST route below verifies a token.
 */
export async function verifyRecaptcha(input: {
  token?: string
  v2Token?: string
}): Promise<CaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    return { ok: true, score: null, needsV2: false, reason: 'captcha-not-configured' }
  }

  // A visitor who already failed the v3 score check supplies a visible v2 token.
  if (input.v2Token) {
    const passed = await verifyToken(secret, input.v2Token)
    return { ok: passed !== null, score: null, needsV2: false }
  }

  if (!input.token) {
    return { ok: false, score: null, needsV2: true, reason: 'missing-token' }
  }

  const response = await verifyToken(secret, input.token, true)
  if (!response || response.success !== true) {
    return { ok: false, score: null, needsV2: false, reason: 'verification-failed' }
  }

  const score = typeof response.score === 'number' ? response.score : null
  if (score !== null && score < THRESHOLD) {
    return { ok: false, score, needsV2: true }
  }

  return { ok: true, score, needsV2: false }
}

interface GoogleResponse {
  success?: boolean
  score?: number
  'error-codes'?: string[]
}

async function verifyToken(
  secret: string,
  token: string,
  withScore = false,
): Promise<GoogleResponse | null> {
  try {
    const body = new URLSearchParams({ secret, response: token })
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    })
    if (!response.ok) return null
    const data = (await response.json()) as GoogleResponse
    if (!data.success) return null
    return withScore ? data : { success: true }
  } catch {
    return null
  }
}
