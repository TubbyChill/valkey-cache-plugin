import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from '@/hooks/use-translations'
import './mega-menu.css'

interface NavLink {
  title: string
  href: string
  description?: string
}

interface NavSection {
  title: string
  links: NavLink[]
}

const productLinks: NavSection = {
  title: 'Product',
  links: [
    {
      title: 'Features',
      href: '/features',
      description: 'Explore ValKey Cache features and capabilities'
    },
    {
      title: 'Pricing',
      href: '/pricing',
      description: 'Simple, transparent pricing plans'
    },
    {
      title: 'Documentation',
      href: '/docs',
      description: 'Detailed guides and API references'
    }
  ]
}

const resourceLinks: NavSection = {
  title: 'Resources',
  links: [
    {
      title: 'Blog',
      href: '/blog',
      description: 'Latest updates and technical articles'
    },
    {
      title: 'Case Studies',
      href: '/case-studies',
      description: 'See how others use ValKey Cache'
    },
    {
      title: 'Support',
      href: '/support',
      description: '24/7 support for Pro users'
    }
  ]
}

const communityLinks: NavSection = {
  title: 'Community',
  links: [
    {
      title: 'GitHub',
      href: 'https://github.com/valkey-cache',
      description: 'Contribute to the open source project'
    },
    {
      title: 'Discord',
      href: '/discord',
      description: 'Join our developer community'
    },
    {
      title: 'Twitter',
      href: 'https://twitter.com/valkeycache',
      description: 'Follow us for updates'
    }
  ]
}

export function MegaMenu() {
  const { theme } = useTheme()
  const { t } = useTranslations()
  const [translations, setTranslations] = React.useState({
    product: 'Product',
    pricing: 'Pricing',
    documentation: 'Documentation',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    tryPro: 'Try ValKey Pro'
  })

  React.useEffect(() => {
    const loadTranslations = async () => {
      const [
        product,
        pricing,
        documentation,
        signIn,
        getStarted,
        tryPro
      ] = await Promise.all([
        t('common.navigation.product'),
        t('common.navigation.pricing'),
        t('common.navigation.documentation'),
        t('common.navigation.signIn'),
        t('common.navigation.getStarted'),
        t('common.cta.tryPro')
      ])

      setTranslations({
        product,
        pricing,
        documentation,
        signIn,
        getStarted,
        tryPro
      })
    }

    loadTranslations()
  }, [t])

  const productLinks: NavSection = {
    title: translations.product,
    links: [
      {
        title: 'Features',
        href: '/features',
        description: 'Explore ValKey Cache features and capabilities'
      },
      {
        title: translations.pricing,
        href: '/pricing',
        description: 'Simple, transparent pricing plans'
      },
      {
        title: translations.documentation,
        href: '/docs',
        description: 'Detailed guides and API references'
      }
    ]
  }

  return (
    <nav className="relative bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">ValKey</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-2 text-sm font-medium">
                {translations.product}
              </button>
              <div className="absolute top-full left-0 w-screen max-w-7xl mx-auto hidden group-hover:block">
                <div className="mega-menu">
                  <div className="grid grid-cols-4 gap-x-8">
                    {/* Product Links */}
                    <div className="mega-menu-column">
                      <h3 className="mega-menu-title">{productLinks.title}</h3>
                      {productLinks.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="mega-menu-link"
                        >
                          <div className="font-medium">{link.title}</div>
                          {link.description && (
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Resources Links */}
                    <div className="mega-menu-column">
                      <h3 className="mega-menu-title">{resourceLinks.title}</h3>
                      {resourceLinks.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="mega-menu-link"
                        >
                          <div className="font-medium">{link.title}</div>
                          {link.description && (
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Community Links */}
                    <div className="mega-menu-column">
                      <h3 className="mega-menu-title">{communityLinks.title}</h3>
                      {communityLinks.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="mega-menu-link"
                        >
                          <div className="font-medium">{link.title}</div>
                          {link.description && (
                            <p className="text-sm text-muted-foreground">
                              {link.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* CTA Column */}
                    <div className="mega-menu-column bg-accent/50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold mb-2">{translations.tryPro}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get started with ValKey Pro and supercharge your WordPress caching
                      </p>
                      <Button>Start Free Trial</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/pricing" className="text-sm font-medium">
              {translations.pricing}
            </Link>
            <Link href="/docs" className="text-sm font-medium">
              {translations.documentation}
            </Link>
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="outline">{translations.signIn}</Button>
            <Button>{translations.getStarted}</Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 