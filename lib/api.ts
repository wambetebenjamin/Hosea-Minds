import { NextResponse } from 'next/server'
import type { ZodError } from 'zod'
import { auth } from './auth'
import { verifyRecaptcha } from './recaptcha'

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

export function zodMessage(error: ZodError): string {
  return error.issues[0]?.message ?? 'Please check the details you entered.'
}

export async function currentUserId(): Promise<string | null> {
  const session = await auth()
  return session?.user?.id ?? null
}

export async function requireUserId(): Promise<string | NextResponse> {
  const id = await currentUserId()
  if (!id) {
    return json({ ok: false, error: 'Please sign in to continue.' }, 401)
  }
  return id
}

export function isResponse(value: unknown): value is NextResponse {
  return value instanceof NextResponse
}

export async function guardCaptcha(payload: {
  captchaToken?: string
  captchaV2Token?: string
}): Promise<NextResponse | null> {
  const result = await verifyRecaptcha({
    token: payload.captchaToken,
    v2Token: payload.captchaV2Token,
  })
  if (result.ok) return null
  return json(
    {
      ok: false,
      needsV2: result.needsV2,
      error: result.needsV2
        ? 'Please complete the quick check to continue.'
        : 'We could not verify this request. Please try again.',
      score: result.score,
    },
    400,
  )
}
