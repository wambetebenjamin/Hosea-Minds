import { isResponse, json, requireUserId, zodMessage } from '@/lib/api'
import { getUserById, eraseUserData } from '@/lib/store'
import { deleteAccountSchema } from '@/lib/validation'
import { deleteJournalPhotos } from '@/lib/blob'

/**
 * Irreversible erasure. Removes journal entries, check ins, group messages,
 * uploaded Blob photos, and the user record itself, then confirms what was
 * deleted in the response.
 */
export async function DELETE(request: Request) {
  const userId = await requireUserId()
  if (isResponse(userId)) return userId

  let body: unknown = { confirmation: 'DELETE' }
  try {
    const text = await request.text()
    if (text) body = JSON.parse(text)
  } catch {
    return json({ ok: false, error: 'We could not read that request.' }, 400)
  }

  const parsed = deleteAccountSchema.safeParse(body)
  if (!parsed.success) {
    return json({ ok: false, error: zodMessage(parsed.error) }, 400)
  }

  const user = await getUserById(userId)
  if (!user) {
    return json({ ok: false, error: 'We could not find your account.' }, 404)
  }

  const result = await eraseUserData(userId, user.email)
  const photos = await deleteJournalPhotos(result.photoUrls)

  return json({
    ok: true,
    confirmed: true,
    deleted: {
      journalEntries: result.journalEntries,
      checkIns: 'all quick check ins removed',
      groupMessages: 'your messages were removed from every peer group',
      photos,
      account: user.email,
    },
    message:
      'Everything is gone. Your journal entries, check ins, group messages, uploads and account have been permanently deleted. We are sorry to see you go, and the helplines on our crisis page remain open to you.',
  })
}
