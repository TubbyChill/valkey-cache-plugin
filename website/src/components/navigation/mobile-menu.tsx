'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

interface MobileMenuProps {
  lang: string
}

export function MobileMenu({ lang }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background">
          <nav className="container py-8">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${lang}/pricing`}
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href={`/${lang}/docs`}
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Documentation
              </Link>
            </div>

            <div className="mt-8 flex flex-col space-y-4">
              <Link href={`/${lang}/login`} onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href={`/${lang}/signup`} onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
} 