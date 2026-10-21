import { redirect } from 'next/navigation'
import { auth } from './auth'
import { getUserById } from './store'
import type { UserRecord } from './types'

/** Protected pages use this. Unauthenticated visitors are sent to /login. */
export async function requireSession(path: string): Promise<{ userId: string; user: UserRecord }> {
  const session = await auth()
  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=${encodeURIComponent(path)}`)
  }
  const user = await getUserById(session.user.id)
  if (!user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(path)}`)
  }
  return { userId: session.user.id, user }
}
