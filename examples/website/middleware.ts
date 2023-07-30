import { createI18nMiddleware } from 'next-docs-zeta/middleware'
import type { NextRequest } from 'next/server'
import { defaultLanguage, languages } from './app/i18n'

export function middleware(request: NextRequest) {
  return createI18nMiddleware(
    request,
    languages,
    defaultLanguage,
    (locale, slug) => `/${locale}/${slug}`
  )
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
