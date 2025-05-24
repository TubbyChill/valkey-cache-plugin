'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function MegaMenu() {
  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              ValKey
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/features">Features</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/docs">Documentation</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/blog">Blog</Link>
            </Button>
            <ThemeToggle />
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 