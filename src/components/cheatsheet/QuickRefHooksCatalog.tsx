'use client'

import { useMemo } from 'react'
import 'highlight.js/styles/github-dark.css'
import { highlight } from '@/lib/cheatsheet/highlight'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { QuickRefHookRow, QuickRefHooksCatalogBlock } from '@/lib/cheatsheet/types'

function HookRow({ row }: { row: QuickRefHookRow }) {
  const highlighted = useMemo(
    () => highlight(row.example, row.exampleLanguage ?? 'tsx'),
    [row.example, row.exampleLanguage],
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full flex-col gap-0.5 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-white/5"
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-xs font-semibold text-slate-200">{row.hook}</span>
            <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">
              {row.when}
            </span>
          </div>
          <div className="text-[11px] text-slate-400">{row.why}</div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="mb-0 flex-row items-center justify-between gap-2 border-b border-white/10 px-5 py-3 pr-12">
          <DialogTitle className="font-mono text-sm font-medium text-slate-200">
            {row.hook}
          </DialogTitle>
          <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-slate-400">{row.when}</span>
        </DialogHeader>
        <div className="px-5 py-4">
          <p className="text-sm text-slate-300">{row.why}</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-black/30 p-4 text-[13px] leading-relaxed [&_code.hljs]:!p-0">
            <code
              className="hljs bg-transparent font-mono"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function QuickRefHooksCatalog({ block }: { block: QuickRefHooksCatalogBlock }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-2">
      {block.label && (
        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {block.label}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {block.hooks.map((row) => (
          <HookRow key={row.hook} row={row} />
        ))}
      </div>
    </div>
  )
}
