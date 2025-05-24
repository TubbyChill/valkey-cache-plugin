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
    <div 
      role="article"
      className={`pricing-tier p-8 rounded-lg border ${popular ? 'border-primary bg-primary/5' : 'bg-card'}`}
    >
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

export default function Page() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Free</h2>
          <p className="text-3xl font-bold mb-4">$0</p>
          <ul className="space-y-2 mb-6">
            <li>Basic caching</li>
            <li>Community support</li>
            <li>1 website</li>
          </ul>
          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md">
            Get Started
          </button>
        </div>
        <div className="p-6 border rounded-lg bg-primary/5 border-primary">
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="text-3xl font-bold mb-4">$29/mo</p>
          <ul className="space-y-2 mb-6">
            <li>Advanced caching</li>
            <li>Priority support</li>
            <li>5 websites</li>
            <li>Performance analytics</li>
          </ul>
          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md">
            Subscribe
          </button>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
          <p className="text-3xl font-bold mb-4">Custom</p>
          <ul className="space-y-2 mb-6">
            <li>Custom caching rules</li>
            <li>24/7 support</li>
            <li>Unlimited websites</li>
            <li>Advanced analytics</li>
            <li>Custom integrations</li>
          </ul>
          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
} 