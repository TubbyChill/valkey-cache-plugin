import { Inter } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { i18n } from '@/i18n/config'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    lang: string
  }
}

export default function RootLayout({
  children,
  params: { lang },
}: RootLayoutProps) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Navigation lang={lang} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 