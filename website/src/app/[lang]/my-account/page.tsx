'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from '@/i18n/use-translations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import type { SupportedLanguage } from '@/i18n/use-translations'

interface MyAccountPageProps {
  params: {
    lang: SupportedLanguage
  }
}

export default function MyAccountPage({ params }: MyAccountPageProps) {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { t } = useTranslations(params.lang)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstname: session?.user?.name?.split(' ')[0] || '',
    lastname: session?.user?.name?.split(' ')[1] || '',
    email: session?.user?.email || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstname} ${formData.lastname}`.trim(),
          email: formData.email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const updatedUser = await response.json()
      await update({
        ...session,
        user: {
          ...session?.user,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      })

      toast({
        title: t('settings.success'),
        description: t('settings.profileUpdated'),
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: t('settings.error'),
        description: t('settings.updateFailed'),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>
      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                {t('settings.firstname')}
              </label>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                {t('settings.lastname')}
              </label>
              <Input
                id="lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('settings.email')}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? t('common.saving') : t('common.saveChanges')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 