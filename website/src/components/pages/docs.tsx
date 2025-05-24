'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Book, Code, Terminal, Settings, Shield, Zap, Search } from 'lucide-react'

interface DocSectionProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function DocSection({ icon, title, description, href }: DocSectionProps) {
  return (
    <Link href={href} className="block p-6 rounded-lg border bg-card hover:border-primary transition-colors">
      <div className="flex items-start">
        <div className="text-primary mr-4">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export function DocsPage({ lang }: { lang: string }) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const sections = [
    {
      icon: <Book className="h-6 w-6" />,
      title: 'Getting Started',
      description: 'Learn the basics of ValKey Cache and get up and running quickly.',
      href: `/${lang}/docs/getting-started`
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'API Reference',
      description: 'Detailed documentation of the ValKey Cache API and configuration options.',
      href: `/${lang}/docs/api`
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      title: 'CLI Tools',
      description: 'Command-line tools for managing your ValKey Cache installation.',
      href: `/${lang}/docs/cli`
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'Configuration',
      description: 'Learn how to configure ValKey Cache for optimal performance.',
      href: `/${lang}/docs/configuration`
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Security',
      description: 'Best practices for securing your ValKey Cache installation.',
      href: `/${lang}/docs/security`
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Performance Tuning',
      description: 'Advanced techniques for optimizing cache performance.',
      href: `/${lang}/docs/performance`
    }
  ]

  const filteredSections = sections.filter(section => {
    const searchLower = searchQuery.toLowerCase()
    return (
      section.title.toLowerCase().includes(searchLower) ||
      section.description.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Everything you need to know about ValKey Cache. From getting started to advanced configuration.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={`/${lang}/docs/getting-started`}>
            <Button size="lg">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href={`/${lang}/docs/api`}>
            <Button variant="outline" size="lg">
              API Reference
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredSections.map((section) => (
            <DocSection key={section.title} {...section} />
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={`/${lang}/support`}>
              <Button variant="outline">
                Contact Support
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="https://discord.gg/valkey">
              <Button variant="outline">
                Join Discord
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 