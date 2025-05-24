'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight, Database, Cpu, BarChart } from 'lucide-react'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { useTranslations } from '@/i18n/use-translations'

interface MemoryEfficiencyContentProps {
  lang: SupportedLanguage
}

export function MemoryEfficiencyContent({ lang }: MemoryEfficiencyContentProps) {
  const { t } = useTranslations(lang)

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{t('features.memoryEfficiency.title')}</h1>
        <p className="text-xl text-muted-foreground mb-12">
          {t('features.memoryEfficiency.description')}
        </p>

        <div className="grid gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {t('features.memoryEfficiency.features.allocation.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('features.memoryEfficiency.features.allocation.description')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {t('features.memoryEfficiency.features.optimization.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('features.memoryEfficiency.features.optimization.description')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {t('features.memoryEfficiency.features.monitoring.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('features.memoryEfficiency.features.monitoring.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {t('features.memoryEfficiency.cta.title')}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t('features.memoryEfficiency.cta.description')}
          </p>
          <div className="flex gap-4">
            <Link href={`/${lang}/signup`}>
              <Button>
                {t('features.memoryEfficiency.cta.getStarted')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${lang}/docs`}>
              <Button variant="outline">
                {t('features.memoryEfficiency.cta.viewDocs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 