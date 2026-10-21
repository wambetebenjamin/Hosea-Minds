import { guardCaptcha, isResponse, json, requireUserId } from '@/lib/api'
import { uploadJournalPhoto } from '@/lib/blob'

const MAX_BYTES = 4 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']

export async function POST(request: Request) {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return json(
      {
        ok: false,
        error:
          'Photo uploads are not connected in this preview. Your written entry can still be saved without a photo.',
      },
      503,
    )
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return json({ ok: false, error: 'We could not read that photo.' }, 400)
  }

  const captcha = await guardCaptcha({
    captchaToken: typeof form.get('captchaToken') === 'string' ? String(form.get('captchaToken')) : undefined,
    captchaV2Token:
      typeof form.get('captchaV2Token') === 'string' ? String(form.get('captchaV2Token')) : undefined,
  })
  if (captcha) return captcha

  const file = form.get('file')
  if (!(file instanceof File)) {
    return json({ ok: false, error: 'Choose a photo first.' }, 400)
  }
  if (file.size > MAX_BYTES) {
    return json({ ok: false, error: 'Please choose a photo smaller than 4MB.' }, 413)
  }
  if (!ALLOWED.includes(file.type)) {
    return json({ ok: false, error: 'Please choose a JPG, PNG, WEBP, or HEIC photo.' }, 415)
  }

  const url = await uploadJournalPhoto(file, userId)
  if (!url) {
    return json({ ok: false, error: 'That upload did not complete. Please try again.' }, 502)
  }
  return json({ ok: true, url })
}
