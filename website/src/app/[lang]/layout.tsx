import * as React from 'react'
import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from '@/components/session-provider'
import { i18n } from '@/i18n/config'
import type { SupportedLanguage } from '@/i18n/use-translations'

import '@/styles/globals.css'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'ValKey Cache Plugin',
  description: 'High-performance Redis alternative designed specifically for WordPress',
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    lang: SupportedLanguage
  }
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative min-h-screen">
              <Navigation lang={params.lang} />
              <div className="flex-1">{children}</div>
              <Footer lang={params.lang} />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
} 