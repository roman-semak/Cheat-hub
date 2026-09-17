'use client'

import { useState } from 'react'
import { Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { downloadTextFile } from '@/lib/download'
import { cn } from '@/lib/utils'

// Hands the user a whole topic (or quickref board) as a .md file.
//
// `build` does the serialization lazily so the markdown converter and its HTML
// parser stay out of the page's initial chunk — see src/lib/cheatsheet/toMarkdown.ts.
// `prefetch` warms that chunk on hover/focus, so the click itself doesn't wait
// on a network round-trip.
export function DownloadMarkdownButton({
  filename,
  build,
  prefetch,
  label = 'Завантажити MD',
  title,
  size = 'md',
  className,
}: {
  filename: string
  build: () => Promise<string>
  prefetch?: () => Promise<unknown>
  label?: string
  title?: string
  size?: 'sm' | 'md'
  className?: string
}) {
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const warm = () => {
    prefetch?.().catch(() => {
      /* chunk will be fetched on click instead */
    })
  }

  const run = async () => {
    setBusy(true)
    try {
      downloadTextFile(await build(), filename, 'text/markdown')
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      /* serialization failed or downloads are blocked */
    } finally {
      setBusy(false)
    }
  }

  const iconSize = size === 'sm' ? 13 : 16

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      onClick={() => void run()}
      onPointerEnter={warm}
      onFocus={warm}
      disabled={busy}
      title={title ?? label}
      aria-label={title ?? label}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 text-sky-300 hover:text-sky-200',
        className,
      )}
    >
      {done ? <Check size={iconSize} className="text-emerald-400" /> : <Download size={iconSize} />}
      {done ? 'Готово' : label}
    </Button>
  )
}
