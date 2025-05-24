import { Metadata } from 'next'

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