'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { LoginModal } from '@/components/auth/login-modal'
import { useTranslations } from '@/i18n/use-translations'
import type { SupportedLanguage } from '@/i18n/use-translations'

interface MobileMenuProps {
  lang: SupportedLanguage
}

export function MobileMenu({ lang }: MobileMenuProps) {
  const router = useRouter()
  const { t } = useTranslations(lang)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)

  const handleNavigation = (href: string) => {
    const path = href.startsWith('/') ? href : `/${href}`
    const langPath = path.startsWith(`/${lang}`) ? path : `/${lang}${path}`
    router.push(langPath)
    setIsOpen(false)
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">{t('navigation.toggleMenu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col gap-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t('navigation.products')}</h3>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" onClick={() => handleNavigation('/features')}>
                  {t('navigation.features')}
                </Button>
                <Button variant="ghost" onClick={() => handleNavigation('/features/performance')}>
                  {t('navigation.performance')}
                </Button>
                <Button variant="ghost" onClick={() => handleNavigation('/features/memory-efficiency')}>
                  {t('navigation.memoryEfficiency')}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t('navigation.solutions')}</h3>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" onClick={() => handleNavigation('/wordpress-plugin')}>
                  {t('navigation.wordpressPlugin')}
                </Button>
                <Button variant="ghost" onClick={() => handleNavigation('/enterprise')}>
                  {t('navigation.enterprise')}
                </Button>
                <Button variant="ghost" onClick={() => handleNavigation('/cloud-hosting')}>
                  {t('navigation.cloudHosting')}
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">{t('navigation.resources')}</h3>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" onClick={() => handleNavigation('/docs')}>
                  {t('navigation.documentation')}
                </Button>
                <Button variant="ghost" onClick={() => handleNavigation('/blog')}>
                  {t('navigation.blog')}
                </Button>
                <Button variant="ghost" onClick={() => handleNavigation('/support')}>
                  {t('navigation.support')}
                </Button>
              </div>
            </div>
            <Button variant="ghost" onClick={() => handleNavigation('/pricing')}>
              {t('navigation.pricing')}
            </Button>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" onClick={() => setIsLoginOpen(true)}>
                {t('navigation.login')}
              </Button>
              <Button onClick={() => handleNavigation('/signup')}>
                {t('navigation.getStarted')}
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <LoginModal lang={lang} isOpen={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  )
} 