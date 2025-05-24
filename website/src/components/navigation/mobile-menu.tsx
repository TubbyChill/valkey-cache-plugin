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
  const menuRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleNavigation = (href: string) => {
    // Ensure href starts with language prefix
    const path = href.startsWith('/') ? href : `/${href}`
    const langPath = path.startsWith(`/${lang}`) ? path : `/${lang}${path}`
    router.push(langPath)
    setIsOpen(false)
  }

  return (
    <div ref={menuRef}>
      <Button
        variant="ghost"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <nav className="absolute right-0 mt-2 w-screen bg-background border-b shadow-lg">
          <div className="container py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${lang}`}
                className="flex items-center space-x-2 text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('/')
                }}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              <Link
                href={`/${lang}/pricing`}
                className="text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('/pricing')
                }}
              >
                Pricing
              </Link>
              
              <Link
                href={`/${lang}/docs`}
                className="text-sm font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('/docs')
                }}
              >
                Documentation
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t flex flex-col space-y-4">
              <LoginModal
                lang={lang}
                isOpen={isLoginOpen}
                onOpenChange={setIsLoginOpen}
                trigger={
                  <Button variant="ghost" className="justify-start">Log in</Button>
                }
              />
              <Button
                onClick={() => handleNavigation('/signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </nav>
      )}
    </div>
  )
} 