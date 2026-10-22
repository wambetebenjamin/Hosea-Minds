import { isResponse, json, requireUserId, zodMessage } from '@/lib/api'
import { updateUser } from '@/lib/store'
import { profileUpdateSchema } from '@/lib/validation'

export async function PUT(request: Request) {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = profileUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: zodMessage(parsed.error) }, 400)
  }

  const prefs = parsed.data.prefs
    ? {
        dailyReminder: parsed.data.prefs.dailyReminder,
        weeklyDigest: parsed.data.prefs.weeklyDigest,
      }
    : undefined

  const updated = await updateUser(userId, {
    displayName:
      parsed.data.displayName === undefined ? undefined : parsed.data.displayName.trim() || null,
    prefs,
  })

  if (!updated) {
    return json({ ok: false, error: 'We could not find your account.' }, 404)
  }

  return json({
    ok: true,
    message: 'Your preferences are saved.',
    profile: {
      displayName: updated.displayName,
      email: updated.email,
      prefs: updated.prefs,
    },
  })
}
