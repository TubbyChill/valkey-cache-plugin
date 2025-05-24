'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { i18n } from '@/i18n/config'

const LANGUAGE_NAMES: { [key: string]: string } = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  ru: 'Русский',
  ja: '日本語',
}

interface LanguageSwitcherProps {
  currentLang: string
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLang: string) => {
    // Get the path without the language prefix
    const pathWithoutLang = pathname.replace(`/${currentLang}`, '')
    const newPath = `/${newLang}${pathWithoutLang}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={locale === currentLang ? 'bg-accent' : ''}
          >
            {LANGUAGE_NAMES[locale] || locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 