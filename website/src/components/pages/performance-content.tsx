'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight, Zap, LineChart, Clock } from 'lucide-react'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { useTranslations } from '@/i18n/use-translations'

interface PerformanceContentProps {
  lang: SupportedLanguage
}

export function PerformanceContent({ lang }: PerformanceContentProps) {
  const { t } = useTranslations(lang)

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t('features.performance.title')}</h1>
        <p className="text-xl text-muted-foreground mb-12">
          {t('features.performance.description')}
        </p>

        <div className="grid gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {t('features.performance.features.speed.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('features.performance.features.speed.description')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {t('features.performance.features.scalability.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('features.performance.features.scalability.description')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {t('features.performance.features.realtime.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('features.performance.features.realtime.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {t('features.performance.cta.title')}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t('features.performance.cta.description')}
          </p>
          <div className="flex gap-4">
            <Link href={`/${lang}/signup`}>
              <Button>
                {t('features.performance.cta.getStarted')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${lang}/docs`}>
              <Button variant="outline">
                {t('features.performance.cta.viewDocs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 