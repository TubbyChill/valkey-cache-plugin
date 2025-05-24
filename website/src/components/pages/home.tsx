'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Brain, Users, DollarSign, Lock, BarChart } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
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

function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <blockquote className="text-lg text-muted-foreground mb-4">{quote}</blockquote>
      <div>
        <cite className="not-italic font-semibold">{author}</cite>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

export function HomePage({ lang }: { lang: string }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Supercharge your WordPress caching with ValKey
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The modern, high-performance Redis alternative designed specifically for WordPress.
              Open-source and backed by the Linux Foundation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={`/${lang}/download`}>
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={`/${lang}/docs`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Documentation
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
            Why Choose ValKey Cache?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast"
              description="Up to 10x faster than Redis with optimized WordPress-specific caching strategies."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Smart Caching"
              description="AI-powered cache invalidation that learns from your site's traffic patterns."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Easy to Use"
              description="Simple installation and configuration. No Redis expertise required."
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Cost Effective"
              description="Reduce server costs with efficient memory usage and optimized storage."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8" />}
              title="Secure by Default"
              description="Enterprise-grade security with encryption at rest and in transit."
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8" />}
              title="Real-time Analytics"
              description="Detailed insights into cache performance and optimization opportunities."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Trusted by WordPress Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="ValKey Cache transformed our site's performance. Load times dropped by 70% overnight."
              author="Jane Smith"
              role="CTO, TechBlog.com"
            />
            <TestimonialCard
              quote="The easiest caching solution I've ever used. Perfect for agencies managing multiple sites."
              author="Mike Johnson"
              role="WordPress Developer"
            />
            <TestimonialCard
              quote="Finally, a caching solution that just works. No more Redis headaches!"
              author="Sarah Williams"
              role="DevOps Lead, WP Engine"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Supercharge Your WordPress Site?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of WordPress sites already using ValKey Cache.
            Get started for free today.
          </p>
          <Link href={`/${lang}/download`}>
            <Button size="lg">
              Start Caching Smarter <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
} 