'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Github, Mail } from 'lucide-react'

interface LoginModalProps {
  children: React.ReactNode
}

export function LoginModal({ children }: LoginModalProps) {
  const [open, setOpen] = React.useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/app/dashboard'

  const handleProviderSignIn = async (provider: string) => {
    await signIn(provider, { callbackUrl })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log in to your account</DialogTitle>
          <DialogDescription>
            Choose your preferred login method to access your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => handleProviderSignIn('github')}
            className="flex items-center gap-2"
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => handleProviderSignIn('google')}
            className="flex items-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 