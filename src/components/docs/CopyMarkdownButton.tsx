'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Copies the full Markdown source of a docs page to the clipboard — same
// copy/feedback pattern as CodeBlock.
export function CopyMarkdownButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={copy}
      aria-label="Скопіювати весь markdown сторінки"
      className="inline-flex shrink-0 items-center gap-2 border-white/15 hover:border-white/30 hover:bg-white/5"
    >
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      {copied ? 'Скопійовано' : 'Скопіювати MD'}
    </Button>
  )
}
