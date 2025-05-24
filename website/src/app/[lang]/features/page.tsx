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

export default function Page() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Performance</h2>
          <p className="text-muted-foreground">
            Lightning-fast caching with optimized WordPress-specific strategies.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Memory Efficiency</h2>
          <p className="text-muted-foreground">
            Smart memory management for optimal resource utilization.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Easy Integration</h2>
          <p className="text-muted-foreground">
            Simple setup and configuration for WordPress sites.
          </p>
        </div>
      </div>
    </div>
  )
} 