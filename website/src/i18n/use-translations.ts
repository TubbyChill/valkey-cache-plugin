'use client'

import { useCallback } from 'react'
import en from './translations/en.json'
import fr from './translations/fr.json'
import es from './translations/es.json'

type TranslationKey = string

export const translations = {
  en,
  fr,
  es,
} as const

export type SupportedLanguage = keyof typeof translations

export function useTranslations(lang: SupportedLanguage) {
  const t = useCallback((key: TranslationKey): string => {
    const keys = key.split('.')
    let value: any = translations[lang]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return value as string
  }, [lang])

  return { t }
} 