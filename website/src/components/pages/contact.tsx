'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Building2, Mail, MessageSquare } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface ContactMethodProps {
  icon: React.ReactNode
  title: string
  description: string
  action: string
  href: string
}

function ContactMethod({ icon, title, description, action, href }: ContactMethodProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start">
        <div className="text-primary mr-4">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
          <Link href={href} className="text-primary hover:underline">
            {action}
          </Link>
        </div>
      </div>
    </Card>
  )
}

export function ContactPage({ lang }: { lang: string }) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const contactMethods = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Live Chat Support',
      description: 'Get instant help from our support team during business hours.',
      action: 'Start Chat',
      href: '/chat'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      description: "Send us an email and we'll get back to you within 24 hours.",
      action: 'support@valkey-cache.com',
      href: 'mailto:support@valkey-cache.com'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Visit Our Office',
      description: 'Schedule a meeting at our headquarters.',
      action: 'Get Directions',
      href: 'https://maps.google.com'
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          // Handle validation errors
          const fieldErrors: Record<string, string> = {}
          data.errors.forEach((error: { field: string; message: string }) => {
            fieldErrors[error.field] = error.message
          })
          setErrors(fieldErrors)
          toast({
            title: 'Error',
            description: 'Please check the form for errors.',
            variant: 'destructive',
          })
        } else {
          // Handle other errors
          toast({
            title: 'Error',
            description: data.message || 'Something went wrong. Please try again.',
            variant: 'destructive',
          })
        }
        return
      }

      // Success
      toast({
        title: 'Success',
        description: data.message,
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
        </p>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contactMethods.map((method) => (
            <ContactMethod key={method.title} {...method} />
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
                className={errors.subject ? 'border-destructive' : ''}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-destructive">{errors.subject}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className={errors.message ? 'border-destructive' : ''}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-destructive">{errors.message}</p>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-8">
            Check out our documentation and frequently asked questions for quick answers to common questions.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={`/${lang}/docs`}>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </Link>
            <Link href={`/${lang}/faq`}>
              <Button variant="outline" size="lg">
                Read FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 