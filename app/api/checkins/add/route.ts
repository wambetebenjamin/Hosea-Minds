import { guardCaptcha, isResponse, json, requireUserId, zodMessage } from '@/lib/api'
import { addCheckIn } from '@/lib/store'
import { checkInSchema } from '@/lib/validation'

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = checkInSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: zodMessage(parsed.error) }, 400)
  }

  const captcha = await guardCaptcha(parsed.data)
  if (captcha) return captcha

  const checkIn = await addCheckIn({
    userId,
    date: parsed.data.date,
    mood: parsed.data.mood,
    note: parsed.data.note,
  })

  return json({
    ok: true,
    checkIn,
    message: 'Thank you for checking in. You showed up for yourself today.',
  })
}
