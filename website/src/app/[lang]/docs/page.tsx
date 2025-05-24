import * as React from 'react'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { i18n } from '@/i18n/config'
import { DocsContent } from '@/components/pages/docs-content'

const exampleCode = `import { ValKeyCache } from '@valkey/cache';

// Initialize the cache
const cache = new ValKeyCache({
  maxSize: '1GB',
  ttl: '1h',
  cleanupInterval: '5m',
});

// Store a value
await cache.set('user:123', {
  id: 123,
  name: 'John Doe',
  email: 'john@example.com',
});

// Retrieve a value
const user = await cache.get('user:123');

// Delete a value
await cache.delete('user:123');

// Clear the entire cache
await cache.clear();

// Get cache stats
const stats = await cache.getStats();
console.log('Cache size:', stats.size);
console.log('Hit rate:', stats.hitRate);`

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

interface DocsPageProps {
  params: {
    lang: SupportedLanguage
  }
}

export default function DocsPage({ params }: DocsPageProps) {
  return <DocsContent lang={params.lang} exampleCode={exampleCode} />
} 