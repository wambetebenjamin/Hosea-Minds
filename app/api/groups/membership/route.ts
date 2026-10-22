import { guardCaptcha, isResponse, json, requireUserId } from '@/lib/api'
import { GROUPS } from '@/lib/constants'
import { listMemberships, setMemberships } from '@/lib/store'
import { z } from 'zod'

const schema = z.object({
  groupSlug: z.string().min(2).max(60),
  action: z.enum(['join', 'leave']),
  captchaToken: z.string().optional(),
  captchaV2Token: z.string().optional(),
})

export async function GET() {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId
  const slugs = await listMemberships(userId)
  return json({ ok: true, slugs })
}

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: 'Choose a group first.' }, 400)
  }
  if (!GROUPS.some((group) => group.slug === parsed.data.groupSlug)) {
    return json({ ok: false, error: 'That group does not exist.' }, 404)
  }

  const captcha = await guardCaptcha(parsed.data)
  if (captcha) return captcha

  const current = await listMemberships(userId)
  const next =
    parsed.data.action === 'join'
      ? [...current, parsed.data.groupSlug]
      : current.filter((slug) => slug !== parsed.data.groupSlug)
  const saved = await setMemberships(userId, next)

  return json({
    ok: true,
    slugs: saved,
    message:
      parsed.data.action === 'join'
        ? 'You are in. Read quietly for as long as you need.'
        : 'You have left the group. You are welcome back at any time.',
  })
}
