import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isValidLocale } from './i18n/config'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const pathname = request.nextUrl.pathname

  // Get locale from pathname
  const pathnameLocale = pathname.split('/')[1]

  // Check if there is any supported locale in the pathname
  if (
    pathname === '/' ||
    !isValidLocale(pathnameLocale)
  ) {
    // Redirect if there is no locale
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 
                  request.headers.get('accept-language')?.split(',')[0].split('-')[0] || 
                  defaultLocale

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  // Matcher ignoring /_next/ and /api/
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 