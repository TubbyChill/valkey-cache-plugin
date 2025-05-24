'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'

interface BlogPostProps {
  title: string
  description: string
  date: string
  readTime: string
  author: string
  slug: string
}

function BlogPost({ title, description, date, readTime, author, slug }: BlogPostProps) {
  return (
    <article className="p-6 rounded-lg border bg-card hover:bg-card/80 transition-colors">
      <Link href={`/blog/${slug}`}>
        <h3 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">{title}</h3>
      </Link>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {date}
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {readTime}
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          {author}
        </div>
      </div>
    </article>
  )
}

export function BlogPage({ lang }: { lang: string }) {
  const posts = [
    {
      title: 'Introducing ValKey Cache: A Modern Redis Alternative for WordPress',
      description: 'Learn about ValKey Cache and how it can improve your WordPress site performance with its innovative caching solution.',
      date: 'March 15, 2025',
      readTime: '5 min read',
      author: 'John Smith',
      slug: 'introducing-valkey-cache'
    },
    {
      title: 'How to Optimize WordPress Performance with ValKey Cache',
      description: 'Follow our comprehensive guide to boost your WordPress site speed using ValKey Cache. Real-world examples and best practices included.',
      date: 'March 10, 2025',
      readTime: '8 min read',
      author: 'Sarah Johnson',
      slug: 'optimize-wordpress-performance'
    },
    {
      title: 'ValKey Cache vs Redis: A Performance Comparison',
      description: 'An in-depth analysis comparing ValKey Cache and Redis performance in WordPress environments. See the benchmarks and real-world results.',
      date: 'March 5, 2025',
      readTime: '10 min read',
      author: 'Michael Chen',
      slug: 'valkey-vs-redis'
    },
    {
      title: 'Best Practices for WordPress Caching',
      description: 'Master the art of WordPress caching with our expert guide. Learn how to implement caching effectively and avoid common pitfalls.',
      date: 'March 1, 2025',
      readTime: '7 min read',
      author: 'Sarah Williams',
      slug: 'wordpress-caching-best-practices'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 text-center bg-muted/50">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Stay up to date with the latest news, tutorials, and insights about ValKey Cache and WordPress performance.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={`/${lang}/docs`}>
            <Button variant="outline" size="lg">
              Read Documentation
            </Button>
          </Link>
          <Link href={`/${lang}/newsletter`}>
            <Button size="lg">
              Subscribe to Updates
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Latest Posts</h2>
          <div className="grid gap-8">
            {posts.map((post) => (
              <BlogPost key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-muted-foreground mb-8">
            Get the latest ValKey Cache updates, WordPress performance tips, and exclusive content delivered to your inbox.
          </p>
          <div className="flex justify-center">
            <Link href={`/${lang}/newsletter`}>
              <Button size="lg">
                Subscribe Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 