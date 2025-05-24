'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Brain, Users, DollarSign, Lock, BarChart } from 'lucide-react'
import { useTranslations } from '@/i18n/use-translations'
import type { SupportedLanguage } from '@/i18n/use-translations'

interface HomePageProps {
  params: {
    lang: SupportedLanguage
  }
}

export default function HomePage({ params }: HomePageProps): React.ReactNode {
  const { t } = useTranslations(params.lang)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={`/${params.lang}/download`}>
                <Button size="lg" className="w-full sm:w-auto">
                  {t('home.hero.getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${params.lang}/docs`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t('home.hero.documentation')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title={t('home.features.speed.title')}
              description={t('home.features.speed.description')}
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title={t('home.features.smart.title')}
              description={t('home.features.smart.description')}
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title={t('home.features.easy.title')}
              description={t('home.features.easy.description')}
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title={t('home.features.cost.title')}
              description={t('home.features.cost.description')}
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8" />}
              title={t('home.features.security.title')}
              description={t('home.features.security.description')}
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8" />}
              title={t('home.features.analytics.title')}
              description={t('home.features.analytics.description')}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.testimonials.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote={t('home.testimonials.quote1.text')}
              author={t('home.testimonials.quote1.author')}
              role={t('home.testimonials.quote1.role')}
            />
            <TestimonialCard
              quote={t('home.testimonials.quote2.text')}
              author={t('home.testimonials.quote2.author')}
              role={t('home.testimonials.quote2.role')}
            />
            <TestimonialCard
              quote={t('home.testimonials.quote3.text')}
              author={t('home.testimonials.quote3.author')}
              role={t('home.testimonials.quote3.role')}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          <Link href={`/${params.lang}/download`}>
            <Button size="lg">
              {t('home.cta.button')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <p className="text-lg mb-4 italic">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  )
} 