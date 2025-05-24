'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useTranslations } from '@/i18n/use-translations'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const t = useTranslations()

  useEffect(() => {
    fetchUser()
  }, [params.id])

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`)
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      router.push('/app/users')
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <Input
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Role
          </label>
          <Select
            id="role"
            value={user.role}
            onChange={(value) => setUser({ ...user, role: value })}
            options={[
              { label: 'Admin', value: 'ADMIN' },
              { label: 'User', value: 'USER' },
            ]}
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save Changes</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/app/users')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
} 