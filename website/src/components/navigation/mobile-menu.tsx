'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/auth/login-modal'
import { useRouter } from 'next/navigation'

interface MobileMenuProps {
  lang: string
}

export function MobileMenu({ lang }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoginOpen, setIsLoginOpen] = React.useState(false)
  const [isNavigating, setIsNavigating] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Handle click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavigation = (href: string) => {
    setIsNavigating(true)
    setIsOpen(false)
    // Remove any double slashes and ensure proper path format
    const cleanPath = href.replace(/\/+/g, '/').replace(/\/$/, '')
    router.push(cleanPath)
  }

  return (
    <div className="md:hidden" ref={menuRef}>
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
                href={`/${lang}`}
                className="text-lg font-medium hover:text-primary flex items-center"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(`/${lang}`)
                }}
              >
                <Home className="h-5 w-5 mr-2" />
                Home
              </Link>
              <Link
                href={`/${lang}/pricing`}
                className="text-lg font-medium hover:text-primary"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(`/${lang}/pricing`)
                }}
              >
                Pricing
              </Link>
              <Link
                href={`/${lang}/docs`}
                className="text-lg font-medium hover:text-primary"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(`/${lang}/docs`)
                }}
              >
                Documentation
              </Link>
            </div>

            <div className="mt-8 flex flex-col space-y-4">
              <LoginModal
                lang={lang}
                isOpen={isLoginOpen}
                onOpenChange={setIsLoginOpen}
                trigger={
                  <Button
                    variant="ghost"
                    className="w-full"
                    disabled={isNavigating}
                  >
                    Log in
                  </Button>
                }
              />
              <Button
                className="w-full"
                onClick={() => handleNavigation(`/${lang}/signup`)}
                disabled={isNavigating}
              >
                {isNavigating ? 'Loading...' : 'Get Started'}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
} 