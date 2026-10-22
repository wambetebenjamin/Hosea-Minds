import { guardCaptcha, isResponse, json, requireUserId, zodMessage } from '@/lib/api'
import { GROUPS } from '@/lib/constants'
import { addGroupMessage, getUserById } from '@/lib/store'
import { groupMessageSchema } from '@/lib/validation'

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = groupMessageSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: zodMessage(parsed.error) }, 400)
  }

  if (!GROUPS.some((group) => group.slug === parsed.data.groupSlug)) {
    return json({ ok: false, error: 'That group does not exist.' }, 404)
  }

  const captcha = await guardCaptcha(parsed.data)
  if (captcha) return captcha

  const user = await getUserById(userId)
  const message = await addGroupMessage({
    groupSlug: parsed.data.groupSlug,
    userId,
    displayName: user?.displayName ?? 'Anonymous',
    body: parsed.data.body,
    role: 'member',
  })

  return json({ ok: true, message, posted: message })
}
