import { Metadata } from 'next'
import { AboutPage } from '@/components/pages/about'
import { i18n } from '@/i18n/config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'About ValKey Cache Plugin - Our Story and Mission',
    description: 'Learn about the team behind ValKey Cache Plugin and our mission to revolutionize WordPress caching.',
    openGraph: {
      title: 'About ValKey Cache Plugin - Our Story and Mission',
      description: 'Learn about the team behind ValKey Cache Plugin and our mission to revolutionize WordPress caching.',
      type: 'website',
      locale: params.lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About ValKey Cache Plugin - Our Story and Mission',
      description: 'Learn about the team behind ValKey Cache Plugin and our mission to revolutionize WordPress caching.',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  return <AboutPage lang={params.lang} />
} 