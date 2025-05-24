'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Check, ArrowRight } from 'lucide-react'

interface PricingTierProps {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  href: string
  popular?: boolean
}

function PricingTier({ name, price, description, features, cta, href, popular }: PricingTierProps) {
  return (
    <Card className={`relative flex flex-col ${popular ? 'border-primary shadow-lg' : ''}`} role="article">
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader>
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Free' && <span className="text-muted-foreground">/month</span>}
        </div>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={href} className="w-full">
          <Button className="w-full" variant={popular ? 'default' : 'outline'}>
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export function PricingPage({ lang }: { lang: string }) {
  const tiers = [
    {
      name: 'Free',
      price: 'Free',
      description: 'Perfect for small WordPress sites and personal blogs.',
      features: [
        'Up to 100,000 cache entries',
        'Basic cache management',
        'Community support',
        'Standard performance',
        'GitHub issue tracking'
      ],
      cta: 'Get Started',
      href: `/${lang}/download`
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Ideal for growing businesses and high-traffic sites.',
      features: [
        'Unlimited cache entries',
        'Advanced cache management',
        'Priority email support',
        'Enhanced performance',
        'Real-time analytics',
        'Custom cache rules',
        'Multiple site support'
      ],
      cta: 'Start Free Trial',
      href: `/${lang}/pro`,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      description: 'For large organizations with complex caching needs.',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom development',
        'SLA guarantee',
        'Advanced security',
        'Team management',
        'Training sessions',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      href: `/${lang}/enterprise`
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include core features with additional benefits as you scale.
        </p>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <PricingTier key={tier.name} {...tier} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8">
            Have questions about our pricing? Check out our documentation or contact our sales team.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={`/${lang}/docs/pricing`}>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </Link>
            <Link href={`/${lang}/contact`}>
              <Button size="lg">
                Contact Sales
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 