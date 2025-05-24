import { Metadata } from 'next'
import { SideNav } from '@/components/navigation/side-nav'
import { TopNav } from '@/components/navigation/top-nav'
import type { SupportedLanguage } from '@/i18n/use-translations'

export const metadata: Metadata = {
  title: 'ValKey Dashboard',
  description: 'Manage your ValKey cache settings and monitor performance',
}

interface DashboardLayoutProps {
  children: React.ReactNode
  params: {
    lang: SupportedLanguage
  }
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav lang={params.lang} />
      <div className="flex">
        <SideNav lang={params.lang} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 