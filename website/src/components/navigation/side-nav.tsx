'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, BarChart, Database, Users, Settings } from 'lucide-react'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { useTranslations } from '@/i18n/use-translations'

interface SideNavProps {
  lang: SupportedLanguage
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/app/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    href: '/app/analytics',
    icon: BarChart,
  },
  {
    title: 'Cache',
    href: '/app/cache',
    icon: Database,
  },
  {
    title: 'Users',
    href: '/app/users',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/app/settings',
    icon: Settings,
  },
]

export function SideNav({ lang }: SideNavProps) {
  const pathname = usePathname()
  const { t } = useTranslations(lang)

  return (
    <nav className="w-64 bg-muted/30 h-[calc(100vh-4rem)] p-4 space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === `/${lang}${item.href}`
        
        return (
          <Link
            key={item.href}
            href={`/${lang}${item.href}`}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              isActive 
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{t(`navigation.${item.title.toLowerCase()}`)}</span>
          </Link>
        )
      })}
    </nav>
  )
} 