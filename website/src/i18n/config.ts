export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'fr', 'es', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja'] as const,
} as const

export type Locale = typeof i18n.locales[number]

export function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale)
}

export function getLocaleByCode(code: string) {
  return i18n.locales.find(locale => locale === code)
}

export const FALLBACK_LOCALE = i18n.defaultLocale 