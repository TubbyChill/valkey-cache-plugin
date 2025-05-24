import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n/config'

// List of supported languages
const locales = ['en', 'fr', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja']
const defaultLocale = 'en'

// Get the preferred locale from headers
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale
  
  const preferredLocale = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0])
    .find(lang => locales.includes(lang.substring(0, 2)))
  
  return preferredLocale ? preferredLocale.substring(0, 2) : defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // If it's the root path, redirect to the locale path
  if (pathname === '/') {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }
  
  // Check if the pathname starts with a locale
  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || i18n.defaultLocale

  // Check if the locale is supported
  const finalLocale = i18n.locales.includes(locale as any) ? locale : i18n.defaultLocale

  request.nextUrl.pathname = `/${finalLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
} 