import * as React from 'react'
import { Metadata } from 'next'
import { i18n } from '@/i18n/config'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { HomeContent } from '@/components/pages/home-content'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'ValKey Cache Plugin - Modern Redis Alternative for WordPress',
    description: 'High-performance Redis alternative designed specifically for WordPress. Open-source and backed by the Linux Foundation.',
    openGraph: {
      title: 'ValKey Cache Plugin - Modern Redis Alternative for WordPress',
      description: 'High-performance Redis alternative designed specifically for WordPress. Open-source and backed by the Linux Foundation.',
      type: 'website',
      locale: params.lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ValKey Cache Plugin - Modern Redis Alternative for WordPress',
      description: 'High-performance Redis alternative designed specifically for WordPress. Open-source and backed by the Linux Foundation.',
    },
  }
}

interface HomePageProps {
  params: {
    lang: SupportedLanguage
  }
}

export default function HomePage({ params }: HomePageProps) {
  return <HomeContent lang={params.lang} />
} 