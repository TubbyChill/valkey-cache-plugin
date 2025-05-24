'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({
  code,
  language = 'typescript',
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className={cn('relative rounded-lg bg-muted p-4', className)}>
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8"
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <div className="relative">
        <pre className={cn('overflow-x-auto p-4 text-sm', showLineNumbers && 'pl-12')}>
          {showLineNumbers && (
            <div className="absolute left-4 top-4 select-none text-sm text-muted-foreground">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
      {copied && (
        <div className="absolute right-4 top-4 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
          Copied!
        </div>
      )}
    </div>
  )
} 