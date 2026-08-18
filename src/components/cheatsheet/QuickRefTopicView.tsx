'use client'

import { useMemo } from 'react'
import type { QuickRefBlock, QuickRefGroup, TopicMeta } from '@/lib/cheatsheet/types'
import { useColumnCount, useMasonry } from '@/lib/cheatsheet/useMasonry'
import { cn } from '@/lib/utils'
import { QuickRefLifecycleDiagram } from './QuickRefLifecycleDiagram'
import { QuickRefHooksCatalog } from './QuickRefHooksCatalog'

function isChipRow(block: QuickRefBlock): block is Extract<QuickRefBlock, { chips: string[] }> {
  return 'chips' in block
}

function isLifecycleBlock(
  block: QuickRefBlock,
): block is Extract<QuickRefBlock, { phases: unknown[] }> {
  return 'phases' in block
}

function isHooksCatalogBlock(
  block: QuickRefBlock,
): block is Extract<QuickRefBlock, { hooks: unknown[] }> {
  return 'hooks' in block
}

function ChipList({ chips, className }: { chips: string[]; className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {chips.map((chip, i) => (
        <span
          key={i}
          className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10.5px] text-slate-400 [&_b]:font-semibold [&_b]:text-slate-200 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: chip }}
        />
      ))}
    </div>
  )
}

function BlockLabel({ label }: { label?: string }) {
  if (!label) return null
  return <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</div>
}

function QuickRefGroupBlock({ group }: { group: QuickRefGroup }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-2">
      <BlockLabel label={group.label} />
      <div className="flex flex-col gap-1.5">
        {group.entries.map((entry) => (
          <div key={entry.term}>
            {entry.inline ? (
              <div className="flex items-baseline justify-between gap-2 text-xs">
                <span className="font-mono font-semibold text-slate-200">{entry.term}</span>
                {entry.desc && (
                  <span
                    className="text-right text-slate-400"
                    dangerouslySetInnerHTML={{ __html: entry.desc }}
                  />
                )}
              </div>
            ) : (
              <div className="text-xs leading-snug">
                <span className="font-mono font-semibold text-slate-200">{entry.term}</span>
                {entry.desc && (
                  <div
                    className="mt-0.5 text-[11px] text-slate-400"
                    dangerouslySetInnerHTML={{ __html: entry.desc }}
                  />
                )}
              </div>
            )}
            {entry.chips && entry.chips.length > 0 && <ChipList chips={entry.chips} className="mt-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickRefChipRowBlock({ block }: { block: Extract<QuickRefBlock, { chips: string[] }> }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-2">
      <BlockLabel label={block.label} />
      <ChipList chips={block.chips} />
    </div>
  )
}

function renderBlock(block: QuickRefBlock) {
  if (isLifecycleBlock(block)) return <QuickRefLifecycleDiagram block={block} />
  if (isHooksCatalogBlock(block)) return <QuickRefHooksCatalog block={block} />
  if (isChipRow(block)) return <QuickRefChipRowBlock block={block} />
  return <QuickRefGroupBlock group={block} />
}

export function QuickRefTopicView({ meta, blocks }: { meta: TopicMeta; blocks: QuickRefBlock[] }) {
  const columnCount = useColumnCount()
  const ids = useMemo(() => blocks.map((_, i) => String(i)), [blocks])
  const { buckets, itemRef } = useMasonry(ids, columnCount)

  return (
    <div>
      <header className="border-b border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-6 py-8 md:px-10">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-100">
          <span>{meta.icon}</span> {meta.title}
        </h1>
        <p className="mt-2 max-w-2xl text-slate-400">{meta.blurb}</p>
      </header>

      <div className="px-6 py-8 md:px-10">
        <div className="flex items-start gap-3">
          {buckets.map((bucket, i) => (
            <div key={i} className="flex flex-1 flex-col gap-3">
              {bucket.map((id) => {
                const block = blocks[Number(id)]
                if (!block) return null
                return (
                  <div key={id} ref={itemRef(id)}>
                    {renderBlock(block)}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
