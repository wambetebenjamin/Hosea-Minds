import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED = ['/journal', '/tracker', '/groups', '/check-in', '/profile']

const SESSION_COOKIES = [
  'authjs.session-token',
  '__Secure-authjs.session-token',
  'next-auth.session-token',
  '__Secure-next-auth.session-token',
]

/**
 * A cheap first line of defence so unauthenticated visitors get a real 307 to
 * /login instead of a streamed page. Each protected page still verifies the
 * session and the user record on the server before rendering any data.
 */
export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isProtected = PROTECTED.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  if (!isProtected) return NextResponse.next()

  const hasSession = SESSION_COOKIES.some((name) => Boolean(request.cookies.get(name)?.value))
  if (hasSession) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/login'
  url.search = `?callbackUrl=${encodeURIComponent(`${pathname}${search}`)}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/journal/:path*', '/tracker/:path*', '/groups/:path*', '/check-in/:path*', '/profile/:path*'],
}
