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

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export function FeaturesPage({ lang }: { lang: string }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Features that Make ValKey Stand Out
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover why ValKey is the best caching solution for WordPress.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast Performance"
              description="Experience up to 10x faster page loads with our optimized caching engine. Perfect for high-traffic WordPress sites."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Intelligent Cache Management"
              description="AI-powered cache invalidation learns from your traffic patterns to ensure optimal cache performance."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="User-Friendly Interface"
              description="Simple setup and intuitive controls make cache management accessible to everyone, regardless of technical expertise."
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Resource Efficient"
              description="Optimized memory usage and storage patterns help reduce server costs while maintaining high performance."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8" />}
              title="Enterprise Security"
              description="Built-in encryption, access controls, and security best practices keep your cached data safe."
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8" />}
              title="Advanced Analytics"
              description="Comprehensive insights into cache performance, hit rates, and optimization opportunities."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with ValKey Cache today and see the difference in your WordPress site's performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={`/${lang}/download`}>
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${lang}/docs`}>
              <Button size="lg" variant="outline">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 