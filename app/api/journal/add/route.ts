import { guardCaptcha, isResponse, json, requireUserId, zodMessage } from '@/lib/api'
import { addJournalEntry } from '@/lib/store'
import { journalSchema } from '@/lib/validation'

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = journalSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: zodMessage(parsed.error) }, 400)
  }

  const captcha = await guardCaptcha(parsed.data)
  if (captcha) return captcha

  const entry = await addJournalEntry({
    userId,
    date: parsed.data.date,
    mood: parsed.data.mood,
    energy: parsed.data.energy,
    text: parsed.data.text,
    tags: parsed.data.tags,
    photoUrl: parsed.data.photoUrl ?? null,
  })

  return json({ ok: true, entry, message: 'Saved. Thank you for showing up for yourself today.' })
}
