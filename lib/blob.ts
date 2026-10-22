/**
 * Vercel Blob helpers. Every call is wrapped so the app still works when
 * BLOB_READ_WRITE_TOKEN has not been configured yet.
 */

export async function uploadJournalPhoto(file: File, userId: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  try {
    const { put } = await import('@vercel/blob')
    const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const safeExtension = ['jpg', 'jpeg', 'png', 'webp', 'heic'].includes(extension) ? extension : 'jpg'
    const blob = await put(`hosea-minds/journal/${userId}/${Date.now()}.${safeExtension}`, file, {
      access: 'public',
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return blob.url
  } catch {
    return null
  }
}

export async function deleteJournalPhotos(urls: string[]): Promise<number> {
  if (!process.env.BLOB_READ_WRITE_TOKEN || urls.length === 0) return 0
  try {
    const { del } = await import('@vercel/blob')
    for (const url of urls) {
      await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN })
    }
    return urls.length
  } catch {
    return 0
  }
}
