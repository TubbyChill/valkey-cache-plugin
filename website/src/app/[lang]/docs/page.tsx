import { Metadata } from 'next'
import { DocsPage } from '@/components/pages/docs'
import { i18n } from '@/i18n/config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Documentation - ValKey Cache Plugin',
    description: 'Comprehensive documentation for ValKey Cache Plugin. Learn how to install, configure, and optimize your WordPress caching setup.',
    openGraph: {
      title: 'Documentation - ValKey Cache Plugin',
      description: 'Comprehensive documentation for ValKey Cache Plugin. Learn how to install, configure, and optimize your WordPress caching setup.',
      type: 'website',
      locale: params.lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Documentation - ValKey Cache Plugin',
      description: 'Comprehensive documentation for ValKey Cache Plugin. Learn how to install, configure, and optimize your WordPress caching setup.',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  return <DocsPage lang={params.lang} />
} 