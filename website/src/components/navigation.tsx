'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslations(lang)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)

  const handleNavigation = (href: string) => {
    const path = href.startsWith('/') ? href : `/${href}`
    const langPath = path.startsWith(`/${lang}`) ? path : `/${lang}${path}`
    router.push(langPath)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          href={`/${lang}`} 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault()
            handleNavigation('/')
          }}
        >
          <span className="text-xl font-bold">ValKey</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">{t('navigation.products')}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleNavigation('/features')}>
                  {t('navigation.features')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/features/performance')}>
                  {t('navigation.performance')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/features/memory-efficiency')}>
                  {t('navigation.memoryEfficiency')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/wordpress-plugin')}>
                  {t('navigation.wordpressPlugin')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/enterprise')}>
                  {t('navigation.enterprise')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/cloud-hosting')}>
                  {t('navigation.cloudHosting')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              href={`/${lang}/pricing`} 
              className="text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation('/pricing')
              }}
            >
              {t('navigation.pricing')}
            </Link>
            
            <Link 
              href={`/${lang}/docs`} 
              className="text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation('/docs')
              }}
            >
              {t('navigation.documentation')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher currentLang={lang} />
            <ThemeToggle />
            <LoginModal
              lang={lang}
              isOpen={isLoginOpen}
              onOpenChange={setIsLoginOpen}
              trigger={
                <Button variant="ghost">{t('navigation.login')}</Button>
              }
            />
            <Link 
              href={`/${lang}/signup`}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation('/signup')
              }}
            >
              <Button>{t('navigation.getStarted')}</Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <LanguageSwitcher currentLang={lang} />
            <ThemeToggle />
            <MobileMenu lang={lang} />
          </div>
        </div>
      </div>
    </header>
  )
} 