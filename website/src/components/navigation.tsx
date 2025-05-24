'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/auth/login-modal'
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MobileMenu } from '@/components/navigation/mobile-menu'
import { useTranslations } from '@/i18n/use-translations'
import type { SupportedLanguage } from '@/i18n/use-translations'

interface NavigationProps {
  lang: SupportedLanguage
}

export function Navigation({ lang }: NavigationProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslations(lang)

  const isAppRoute = pathname.startsWith(`/${lang}/app`)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
          <span className="font-bold">ValKey</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {!isAppRoute && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">{t('navigation.products')}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/${lang}/features`}>{t('navigation.features')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/${lang}/pricing`}>{t('navigation.pricing')}</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href={`/${lang}/docs`}>
                  <Button variant="ghost">{t('navigation.documentation')}</Button>
                </Link>
              </>
            )}
          </nav>
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher currentLang={lang} />
            <ThemeToggle />
            {session ? (
              <Button variant="ghost" onClick={() => router.push(`/${lang}/app/dashboard`)}>
                {t('navigation.dashboard')}
              </Button>
            ) : (
              <>
                <LoginModal>
                  <Button variant="ghost">{t('navigation.login')}</Button>
                </LoginModal>
                <Link href={`/${lang}/signup`}>
                  <Button>{t('navigation.signup')}</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 