'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, Search, User } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { useTranslations } from '@/i18n/use-translations'

interface TopNavProps {
  lang: SupportedLanguage
}

export function TopNav({ lang }: TopNavProps) {
  const pathname = usePathname()
  const { t } = useTranslations(lang)

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-full">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${lang}/app/dashboard`} className="text-xl font-bold">
              ValKey
            </Link>
            <div className="hidden md:flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('navigation.search')}
                className="bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 