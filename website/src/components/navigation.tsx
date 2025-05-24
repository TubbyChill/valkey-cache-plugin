'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavigationProps {
  session: Session | null
}

export function Navigation({ session }: NavigationProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">ValKey</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Products</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mega-menu">
                <div className="mega-menu-column">
                  <h3 className="mega-menu-title">Core Features</h3>
                  <Link href="/features/performance" className="mega-menu-link">
                    Performance
                  </Link>
                  <Link href="/features/efficiency" className="mega-menu-link">
                    Memory Efficiency
                  </Link>
                  <Link href="/features/community" className="mega-menu-link">
                    Community Support
                  </Link>
                </div>
                <div className="mega-menu-column">
                  <h3 className="mega-menu-title">Solutions</h3>
                  <Link href="/solutions/wordpress" className="mega-menu-link">
                    WordPress Plugin
                  </Link>
                  <Link href="/solutions/enterprise" className="mega-menu-link">
                    Enterprise
                  </Link>
                  <Link href="/solutions/cloud" className="mega-menu-link">
                    Cloud Hosting
                  </Link>
                </div>
                <div className="mega-menu-column">
                  <h3 className="mega-menu-title">Resources</h3>
                  <Link href="/docs" className="mega-menu-link">
                    Documentation
                  </Link>
                  <Link href="/blog" className="mega-menu-link">
                    Blog
                  </Link>
                  <Link href="/support" className="mega-menu-link">
                    Support
                  </Link>
                </div>
                <div className="mega-menu-column">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="text-sm font-medium">Try ValKey Pro</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Get started with advanced features and priority support.
                    </p>
                    <Button className="mt-4" size="sm">
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            
            <Link href="/docs" className="text-muted-foreground hover:text-foreground">
              Documentation
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {session ? (
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 