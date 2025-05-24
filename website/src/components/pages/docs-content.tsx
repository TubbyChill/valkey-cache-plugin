'use client'

import * as React from 'react'
import { CodeBlock } from '@/components/code-block'
import type { SupportedLanguage } from '@/i18n/use-translations'
import { useTranslations } from '@/i18n/use-translations'

interface DocsContentProps {
  lang: SupportedLanguage
  exampleCode: string
}

export function DocsContent({ lang, exampleCode }: DocsContentProps) {
  const { t } = useTranslations(lang)
  
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Documentation</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Learn how to integrate ValKey Cache into your WordPress site.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
            <p className="text-muted-foreground mb-6">
              Get started with ValKey Cache in just a few minutes. Here's a basic example:
            </p>
            <CodeBlock code={exampleCode} language="typescript" />
          </section>
        </div>
      </div>
    </div>
  )
} 