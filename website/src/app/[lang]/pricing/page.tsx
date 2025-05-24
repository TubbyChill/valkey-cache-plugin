'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

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
    <div className={`p-8 rounded-lg border ${popular ? 'border-primary bg-primary/5' : 'bg-card'}`}>
      <h3 className="text-2xl font-semibold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-muted-foreground">/month</span>}
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="h-5 w-5 text-primary mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={href}>
        <Button className="w-full" variant={popular ? 'default' : 'outline'}>
          {cta}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  )
}

export default function PricingPage() {
  const tiers = [
    {
      name: 'Free',
      price: 'Free',
      description: 'Perfect for small WordPress sites and personal blogs.',
      features: [
        'Up to 100,000 cached objects',
        'Basic cache analytics',
        'Community support',
        'Standard security features',
        'Manual cache invalidation'
      ],
      cta: 'Get Started',
      href: '/download'
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Ideal for growing businesses and high-traffic sites.',
      features: [
        'Unlimited cached objects',
        'Advanced analytics dashboard',
        'Priority email support',
        'Enhanced security features',
        'AI-powered cache invalidation',
        'Custom cache rules'
      ],
      cta: 'Start Free Trial',
      href: '/signup',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with complex caching needs.',
      features: [
        'Custom deployment options',
        'Dedicated support team',
        'SLA guarantees',
        'Advanced security controls',
        'Custom integrations',
        'Training and onboarding'
      ],
      cta: 'Contact Sales',
      href: '/contact'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include core ValKey Cache features.
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
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee on all paid plans.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 