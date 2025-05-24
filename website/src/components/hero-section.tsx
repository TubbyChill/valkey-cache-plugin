'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { useTranslations } from '@/i18n/use-translations'

interface HeroSectionProps {
  lang: SupportedLanguage
}

export function HeroSection({ lang }: HeroSectionProps) {
  const { t } = useTranslations(lang)

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/10">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-muted-foreground">
                <span>Just shipped v1.0</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t('home.hero.description')}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href={`/${lang}/signup`}>
              <Button size="lg">
                {t('common.cta.getStarted')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/${lang}/docs`}>
              <Button variant="outline" size="lg">
                {t('common.cta.learnMore')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="/hero-image.png"
              alt="ValKey Dashboard"
              className="w-[76rem] rounded-md bg-background/5 shadow-2xl ring-1 ring-background/10"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  )
} 