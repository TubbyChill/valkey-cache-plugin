import { Metadata } from 'next'
import { HomePage } from '@/components/pages/home'
import { i18n } from '@/i18n/config'

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

export default function Page({ params }: { params: { lang: string } }) {
  return <HomePage lang={params.lang} />
} 