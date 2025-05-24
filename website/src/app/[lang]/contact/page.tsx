import { Metadata } from 'next'
import { ContactPage } from '@/components/pages/contact'
import { i18n } from '@/i18n/config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Contact Us - ValKey Cache Plugin Support',
    description: 'Get in touch with the ValKey Cache Plugin team for support, partnership inquiries, or general questions.',
    openGraph: {
      title: 'Contact Us - ValKey Cache Plugin Support',
      description: 'Get in touch with the ValKey Cache Plugin team for support, partnership inquiries, or general questions.',
      type: 'website',
      locale: params.lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us - ValKey Cache Plugin Support',
      description: 'Get in touch with the ValKey Cache Plugin team for support, partnership inquiries, or general questions.',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  return <ContactPage lang={params.lang} />
} 