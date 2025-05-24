'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/auth/login-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MobileMenu } from '@/components/navigation/mobile-menu'

interface NavigationProps {
  lang: string
}

export function Navigation({ lang }: NavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)

  const handleNavigation = (href: string) => {
    // Ensure href starts with language prefix
    const path = href.startsWith('/') ? href : `/${href}`
    const langPath = path.startsWith(`/${lang}`) ? path : `/${lang}${path}`
    router.push(langPath)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          href={`/${lang}`} 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault()
            handleNavigation('/')
          }}
        >
          <span className="text-xl font-bold">ValKey</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Products</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mega-menu">
                <div className="mega-menu-column">
                  <h3 className="mega-menu-title">Core Features</h3>
                  <Link 
                    href={`/${lang}/features/performance`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/features/performance')
                    }}
                  >
                    Performance
                  </Link>
                  <Link 
                    href={`/${lang}/features/efficiency`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/features/efficiency')
                    }}
                  >
                    Memory Efficiency
                  </Link>
                  <Link 
                    href={`/${lang}/features/community`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/features/community')
                    }}
                  >
                    Community Support
                  </Link>
                </div>
                <div className="mega-menu-column">
                  <h3 className="mega-menu-title">Solutions</h3>
                  <Link 
                    href={`/${lang}/solutions/wordpress`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/solutions/wordpress')
                    }}
                  >
                    WordPress Plugin
                  </Link>
                  <Link 
                    href={`/${lang}/solutions/enterprise`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/solutions/enterprise')
                    }}
                  >
                    Enterprise
                  </Link>
                  <Link 
                    href={`/${lang}/solutions/cloud`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/solutions/cloud')
                    }}
                  >
                    Cloud Hosting
                  </Link>
                </div>
                <div className="mega-menu-column">
                  <h3 className="mega-menu-title">Resources</h3>
                  <Link 
                    href={`/${lang}/docs`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/docs')
                    }}
                  >
                    Documentation
                  </Link>
                  <Link 
                    href={`/${lang}/blog`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/blog')
                    }}
                  >
                    Blog
                  </Link>
                  <Link 
                    href={`/${lang}/support`} 
                    className="mega-menu-link"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation('/support')
                    }}
                  >
                    Support
                  </Link>
                </div>
                <div className="mega-menu-column">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="text-sm font-medium">Try ValKey Pro</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Get started with advanced features and priority support.
                    </p>
                    <Link 
                      href={`/${lang}/pro`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation('/pro')
                      }}
                    >
                      <Button className="mt-4" size="sm">
                        Start Free Trial
                      </Button>
                    </Link>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              href={`/${lang}/pricing`} 
              className="text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation('/pricing')
              }}
            >
              Pricing
            </Link>
            
            <Link 
              href={`/${lang}/docs`} 
              className="text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation('/docs')
              }}
            >
              Documentation
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <LoginModal
              lang={lang}
              isOpen={isLoginOpen}
              onOpenChange={setIsLoginOpen}
              trigger={
                <Button variant="ghost">Log in</Button>
              }
            />
            <Link 
              href={`/${lang}/signup`}
              onClick={(e) => {
                e.preventDefault()
                handleNavigation('/signup')
              }}
            >
              <Button>Get Started</Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <MobileMenu lang={lang} />
          </div>
        </div>
      </div>
    </header>
  )
} 