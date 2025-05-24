'use client'

import { usePathname } from 'next/navigation'
import { defaultLocale } from '@/i18n/config'

// Import all translations
const translations = {
  en: () => import('@/i18n/translations/en.json').then((module) => module.default),
  fr: () => import('@/i18n/translations/fr.json').then((module) => module.default),
  // Add other languages as they become available
}

type TranslationKey = string
type TranslationValue = string | Record<string, any>

function getNestedValue(obj: Record<string, any>, path: string): string | undefined {
  const value = path.split('.').reduce((acc, part) => acc?.[part], obj)
  return typeof value === 'string' ? value : undefined
}

export function useTranslations() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || defaultLocale

  const t = async (key: TranslationKey): Promise<string> => {
    try {
      const loadTranslation = translations[locale as keyof typeof translations]
      if (!loadTranslation) {
        // Fallback to default locale if translation not available
        const defaultTranslations = await translations[defaultLocale]()
        const value = getNestedValue(defaultTranslations, key)
        return value || key
      }

      const currentTranslations = await loadTranslation()
      const value = getNestedValue(currentTranslations, key)
      return value || key
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error)
      return key // Return the key as fallback
    }
  }

  return { t }
} 