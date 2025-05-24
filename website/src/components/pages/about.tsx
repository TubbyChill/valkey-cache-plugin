'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  image: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

function TeamMember({ name, role, bio, image, social }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-primary mb-2">{role}</p>
      <p className="text-muted-foreground mb-4">{bio}</p>
      <div className="flex gap-4">
        {social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {social.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <Github className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  )
}

export function AboutPage({ lang }: { lang: string }) {
  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      bio: 'WordPress developer with 15+ years of experience. Passionate about open source and performance optimization.',
      image: '/team/john-smith.jpg',
      social: {
        twitter: 'https://twitter.com/johnsmith',
        linkedin: 'https://linkedin.com/in/johnsmith',
        github: 'https://github.com/johnsmith'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'Lead Developer',
      bio: 'Core contributor to WordPress and Redis. Expert in distributed systems and caching technologies.',
      image: '/team/sarah-johnson.jpg',
      social: {
        twitter: 'https://twitter.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        github: 'https://github.com/sarahjohnson'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Performance Engineer',
      bio: 'Previously at AWS, specialized in high-performance distributed systems and cache optimization.',
      image: '/team/michael-chen.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/michaelchen',
        github: 'https://github.com/michaelchen'
      }
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About ValKey Cache</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          We're on a mission to make WordPress faster and more efficient through innovative caching solutions.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              ValKey Cache was born from a simple observation: WordPress sites needed a better caching solution. 
              While Redis has been the go-to choice for years, we believed there was room for improvement.
            </p>
            <p>
              As a Linux Foundation-stewarded project, we're committed to open source values and community-driven 
              development. Our goal is to provide a modern, efficient, and user-friendly caching solution that 
              helps WordPress sites perform at their best.
            </p>
            <p>
              We're backed by leading companies in the industry, including AWS and Google, who share our vision 
              of creating better tools for the WordPress ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-muted-foreground mb-8">
            We're always looking for talented individuals who share our passion for performance and open source.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={`/${lang}/careers`}>
              <Button variant="default" size="lg">
                View Careers
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="https://github.com/valkey-cache">
              <Button variant="outline" size="lg">
                <Github className="h-4 w-4 mr-2" />
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 