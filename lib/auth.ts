import NextAuth, { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { z } from 'zod'
import { verifyPassword } from './passwords'
import { createUser, getUserByEmail, getUserById } from './store'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
})

const providers = [
  Credentials({
    name: 'Email and password',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(raw) {
      const parsed = credentialsSchema.safeParse(raw)
      if (!parsed.success) return null
      const user = await getUserByEmail(parsed.data.email)
      if (!user || !user.passwordHash) return null
      const valid = await verifyPassword(parsed.data.password, user.passwordHash)
      if (!valid) return null
      return {
        id: user.id,
        email: user.email,
        name: user.displayName ?? undefined,
      }
    },
  }),
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }) as never,
  )
}

/**
 * Production requires a real secret. Development falls back to a local value so
 * `npm run dev` works on a fresh clone without configuration.
 */
const secret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV !== 'production' ? 'hosea-minds-local-development-secret' : undefined)

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 30 },
  pages: { signIn: '/login' },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        await createUser({
          email: user.email,
          displayName: user.name ?? null,
          provider: 'google',
        })
      }
      return true
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.uid = user.id
      }
      if (!token.uid && token.email) {
        const record = await getUserByEmail(token.email)
        if (record) token.uid = record.id
      }
      return token
    },
    async session({ session, token }) {
      if (typeof token.uid === 'string') {
        session.user.id = token.uid
        const record = await getUserById(token.uid)
        if (record) {
          session.user.name = record.displayName ?? session.user.name
          session.user.email = record.email
        }
      }
      return session
    },
  },
})
