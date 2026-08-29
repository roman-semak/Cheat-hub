'use client'

import { useMemo, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import 'highlight.js/styles/github-dark.css'
import type { Lifehack } from '@/lib/cheatsheet/types'
import { highlight } from '@/lib/cheatsheet/highlight'
import { StatusMarker, type ContentStatus } from './StatusMarker'

// One lifehack: title, tags, always-visible highlighted code with a copy button,
// and an optional note (may contain inline <code>).
export function LifehackCard({
  hack,
  status,
  onCycleStatus,
}: {
  hack: Lifehack
  status?: ContentStatus
  onCycleStatus?: () => void
}) {
  const [copied, setCopied] = useState(false)
  const language = hack.language ?? 'typescript'

  const highlighted = useMemo(() => highlight(hack.code, language), [hack.code, language])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hack.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-black/20 p-4 transition-colors hover:border-orange-400/40">
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-100">
          {onCycleStatus && (
            <StatusMarker status={status ?? 'unread'} onCycle={onCycleStatus} />
          )}
          {hack.title}
        </h3>
        {hack.tags && hack.tags.length > 0 && (
          <div className="flex flex-wrap justify-end gap-1">
            {hack.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={copy}
          className="absolute right-2 top-2 z-10 rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Скопіювати код"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 pr-10 text-[13px] leading-relaxed">
          <code
            className="hljs bg-transparent p-0 font-mono"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>

      {hack.note && (
        <div
          className="cheat-prose text-xs text-slate-400"
          dangerouslySetInnerHTML={{ __html: hack.note }}
        />
      )}
    </div>
  )
}
