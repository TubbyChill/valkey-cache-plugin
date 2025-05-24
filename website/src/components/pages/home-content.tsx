'use client'

import * as React from 'react'
import { HeroSection } from '@/components/hero-section'
import type { SupportedLanguage } from '@/i18n/use-translations'

interface HomeContentProps {
  lang: SupportedLanguage
}

export function HomeContent({ lang }: HomeContentProps) {
  return (
    <main>
      <HeroSection lang={lang} />
      {/* Add more sections here */}
    </main>
  )
} 