'use client'

import { useMemo, useState } from 'react'
import { Check, Code2, Copy } from 'lucide-react'
import 'highlight.js/styles/github-dark.css'
import { highlight } from '@/lib/cheatsheet/highlight'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function CodeBlock({
  code,
  summary,
  language = 'typescript',
}: {
  code: string
  summary?: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)

  const highlighted = useMemo(() => highlight(code, language), [code, language])
  const lineCount = useMemo(() => code.split('\n').length, [code])
  const title = summary ?? `Код (${language})`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group mt-3 flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-left text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <Code2 size={14} className="text-slate-500 group-hover:text-slate-300" />
            {title}
          </span>
          <span className="text-slate-500">{lineCount} рядк.</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="flex-row items-center justify-between gap-2 border-b border-white/10 px-5 py-3 pr-12 mb-0">
          <DialogTitle className="text-sm font-medium text-slate-200">{title}</DialogTitle>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Скопіювати код"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Скопійовано' : 'Копіювати'}
          </button>
        </DialogHeader>
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed [&_code.hljs]:!p-0">
          <code
            className="hljs bg-transparent font-mono"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </DialogContent>
    </Dialog>
  )
}
