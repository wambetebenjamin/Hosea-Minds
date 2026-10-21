import { guardCaptcha, json, zodMessage } from '@/lib/api'
import { hashPassword } from '@/lib/passwords'
import { createUser, getUserByEmail } from '@/lib/store'
import { registerSchema } from '@/lib/validation'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = registerSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: zodMessage(parsed.error) }, 400)
  }

  const captcha = await guardCaptcha(parsed.data)
  if (captcha) return captcha

  const existing = await getUserByEmail(parsed.data.email)
  if (existing) {
    return json({ ok: false, error: 'An account with this email already exists. Try signing in.' }, 409)
  }

  const passwordHash = await hashPassword(parsed.data.password)
  const user = await createUser({
    email: parsed.data.email,
    displayName: parsed.data.displayName || null,
    passwordHash,
    provider: 'credentials',
  })

  return json({
    ok: true,
    message: 'Your account is ready. Welcome to Hosea Minds.',
    user: { id: user.id, email: user.email, displayName: user.displayName },
  })
}
