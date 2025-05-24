import * as React from 'react'
import { Metadata } from 'next'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { PerformanceContent } from '@/components/pages/performance-content'

interface PerformancePageProps {
  params: {
    lang: SupportedLanguage
  }
}

export function generateMetadata({ params }: PerformancePageProps): Metadata {
  const { lang } = params

  return {
    title: 'Performance Features - ValKey Cache Plugin',
    description: 'Learn about the performance benefits of using ValKey Cache in your WordPress site.',
    openGraph: {
      title: 'Performance Features - ValKey Cache Plugin',
      description: 'Learn about the performance benefits of using ValKey Cache in your WordPress site.',
      type: 'website',
      locale: lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Performance Features - ValKey Cache Plugin',
      description: 'Learn about the performance benefits of using ValKey Cache in your WordPress site.',
    },
  }
}

export default function PerformancePage({ params }: PerformancePageProps) {
  return <PerformanceContent lang={params.lang} />
} 