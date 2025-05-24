import { Metadata } from 'next'
import { BlogPage } from '@/components/pages/blog'
import { i18n } from '@/i18n/config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Blog - ValKey Cache Plugin News and Updates',
    description: 'Stay up to date with the latest news, tutorials, and best practices for WordPress caching with ValKey Cache Plugin.',
    openGraph: {
      title: 'Blog - ValKey Cache Plugin News and Updates',
      description: 'Stay up to date with the latest news, tutorials, and best practices for WordPress caching with ValKey Cache Plugin.',
      type: 'website',
      locale: params.lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - ValKey Cache Plugin News and Updates',
      description: 'Stay up to date with the latest news, tutorials, and best practices for WordPress caching with ValKey Cache Plugin.',
    },
  }
}

export default function Page({ params }: { params: { lang: string } }) {
  return <BlogPage lang={params.lang} />
} 