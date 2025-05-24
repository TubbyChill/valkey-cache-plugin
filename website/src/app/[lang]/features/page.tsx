import { Metadata } from 'next'
import { FeaturesPage } from '@/components/pages/features'
import { i18n } from '@/i18n/config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Features - ValKey Cache Plugin for WordPress',
    description: 'Explore the powerful features of ValKey Cache Plugin, the modern Redis alternative for WordPress. Learn about our AI-powered caching, real-time analytics, and more.',
    openGraph: {
      title: 'Features - ValKey Cache Plugin for WordPress',
      description: 'Explore the powerful features of ValKey Cache Plugin, the modern Redis alternative for WordPress. Learn about our AI-powered caching, real-time analytics, and more.',
      type: 'website',
      locale: params.lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Features - ValKey Cache Plugin for WordPress',
      description: 'Explore the powerful features of ValKey Cache Plugin, the modern Redis alternative for WordPress. Learn about our AI-powered caching, real-time analytics, and more.',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  return <FeaturesPage lang={params.lang} />
} 