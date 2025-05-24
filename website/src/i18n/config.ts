export const defaultLocale = 'en'

export const locales = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
  },
  {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
  },
  {
    code: 'pt',
    name: 'Português',
    flag: '🇵🇹',
  },
  {
    code: 'nl',
    name: 'Nederlands',
    flag: '🇳🇱',
  },
  {
    code: 'pl',
    name: 'Polski',
    flag: '🇵🇱',
  },
  {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
  },
  {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
  },
]

export type Locale = typeof locales[number]['code']

export function isValidLocale(locale: string): locale is Locale {
  return locales.map(l => l.code).includes(locale as Locale)
}

export function getLocaleByCode(code: string) {
  return locales.find(locale => locale.code === code)
}

export const FALLBACK_LOCALE = defaultLocale 