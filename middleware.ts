import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (url.pathname.startsWith('/admin')) {
    if (!basicAuth) {
      return new NextResponse('認証が必要です', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      })
    }
    const authValue = basicAuth.split(' ')[1]
    const [user, pass] = atob(authValue).split(':')
    if (
      user !== process.env.BASIC_AUTH_USER ||
      pass !== process.env.BASIC_AUTH_PASS
    ) {
      return new NextResponse('認証失敗', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      })
    }
  }
  return NextResponse.next()
}
