import * as React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { MegaMenu } from '@/components/navigation/mega-menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ValKey Cache Plugin - Modern Redis Alternative for WordPress',
  description: 'High-performance Redis alternative designed specifically for WordPress. Open-source and backed by the Linux Foundation.',
  openGraph: {
    title: 'ValKey Cache Plugin - Modern Redis Alternative for WordPress',
    description: 'High-performance Redis alternative designed specifically for WordPress. Open-source and backed by the Linux Foundation.',
    type: 'website',
    locale: 'en_US',
    url: 'https://valkey-cache-plugin.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ValKey Cache Plugin - Modern Redis Alternative for WordPress',
    description: 'High-performance Redis alternative designed specifically for WordPress. Open-source and backed by the Linux Foundation.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MegaMenu />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
} 