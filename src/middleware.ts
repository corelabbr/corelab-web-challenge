import type { NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'

const i18nMiddleware = createI18nMiddleware({
  locales: ['en', 'pt'],
  defaultLocale: 'en',
})

export function middleware(request: NextRequest) {
  console.log('@', request.url)

  return i18nMiddleware(request)
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next|favicon.ico|icon.png|robots.txt).*)',
}
