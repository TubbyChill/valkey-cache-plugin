import * as React from 'react'
import { Metadata } from 'next'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { MemoryEfficiencyContent } from '@/components/pages/memory-efficiency-content'

interface MemoryEfficiencyPageProps {
  params: {
    lang: SupportedLanguage
  }
}

export function generateMetadata({ params }: MemoryEfficiencyPageProps): Metadata {
  const { lang } = params

  return {
    title: 'Memory Efficiency - ValKey Cache Plugin',
    description: 'Learn about the memory optimization features of ValKey Cache for WordPress.',
    openGraph: {
      title: 'Memory Efficiency - ValKey Cache Plugin',
      description: 'Learn about the memory optimization features of ValKey Cache for WordPress.',
      type: 'website',
      locale: lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Memory Efficiency - ValKey Cache Plugin',
      description: 'Learn about the memory optimization features of ValKey Cache for WordPress.',
    },
  }
}

export default function MemoryEfficiencyPage({ params }: MemoryEfficiencyPageProps) {
  return <MemoryEfficiencyContent lang={params.lang} />
} 