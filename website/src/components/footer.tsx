'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Github, Twitter, MessageSquare } from 'lucide-react'

interface FooterProps {
  lang: string
}

export function Footer({ lang }: FooterProps) {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    const path = href.startsWith('/') ? href : `/${href}`
    const langPath = path.startsWith(`/${lang}`) ? path : `/${lang}${path}`
    router.push(langPath)
  }

  const getLocalizedHref = (path: string) => {
    return path.startsWith('/') ? `/${lang}${path}` : `/${lang}/${path}`
  }

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getLocalizedHref('/features')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/pricing')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/enterprise')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getLocalizedHref('/docs')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/blog')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/support')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getLocalizedHref('/about')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/contact')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/careers')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getLocalizedHref('/privacy')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/terms')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalizedHref('/cookies')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 ValKey Cache Plugin. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/valkey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/valkey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://discord.gg/valkey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 