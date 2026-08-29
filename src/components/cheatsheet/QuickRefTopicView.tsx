'use client'

import { useEffect, useMemo, useState } from 'react'
import type { QuickRefBlock, QuickRefGroup, TopicMeta } from '@/lib/cheatsheet/types'
import { useColumnCount, useMasonry } from '@/lib/cheatsheet/useMasonry'
import { quickRefBlockKeys } from '@/lib/cheatsheet/quickrefKeys'
import { useNewContent } from '@/lib/cheatsheet/useNewContent'
import { cn } from '@/lib/utils'
import { QuickRefLifecycleDiagram } from './QuickRefLifecycleDiagram'
import { QuickRefHooksCatalog } from './QuickRefHooksCatalog'
import { NewDotStatic } from './NewDot'

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
          className="rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-slate-400 [&_b]:font-semibold [&_b]:text-slate-200 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: chip }}
        />
      ))}
    </div>
  )
}

function BlockLabel({ label }: { label?: string }) {
  if (!label) return null
  return <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</div>
}

function QuickRefGroupBlock({ group }: { group: QuickRefGroup }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
      <BlockLabel label={group.label} />
      <div className="flex flex-col gap-2">
        {group.entries.map((entry) => (
          <div key={entry.term} className="text-sm leading-snug">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono font-semibold text-slate-200">{entry.term}</span>
              {entry.chips && entry.chips.length > 0 && <ChipList chips={entry.chips} />}
            </div>
            {entry.desc && (
              <div
                className="mt-1 text-xs text-slate-400"
                dangerouslySetInnerHTML={{ __html: entry.desc }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickRefChipRowBlock({ block }: { block: Extract<QuickRefBlock, { chips: string[] }> }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
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

// Anchor id for a block's wrapper, used for both scroll targeting and the
// IntersectionObserver spy below.
function blockAnchorId(id: string) {
  return `qr-block-${id}`
}

export function QuickRefTopicView({ meta, blocks }: { meta: TopicMeta; blocks: QuickRefBlock[] }) {
  const columnCount = useColumnCount()
  const ids = useMemo(() => blocks.map((_, i) => String(i)), [blocks])
  const { buckets, itemRef } = useMasonry(ids, columnCount)
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  // Per-block "new" tracking. Keys derived from block labels via the shared
  // helper (same as the stamp-new-content script).
  const trackKeys = useMemo(
    () => quickRefBlockKeys(blocks).map((k) => `quickref:${meta.slug}:${k}`),
    [blocks, meta.slug],
  )
  const { isNew, markSeen } = useNewContent(trackKeys)

  // Page scrolls at the window level here (no dedicated scroll container like
  // ProseTopicView has), so this observes the viewport directly rather than
  // reusing useScrollSpy (which requires a root element ref).
  useEffect(() => {
    if (ids.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id.replace('qr-block-', ''))
        })
      },
      { rootMargin: '-48px 0px -70% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(blockAnchorId(id))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  const jump = (id: string) => {
    document.getElementById(blockAnchorId(id))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <nav className="sticky top-0 z-20 flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-slate-950/90 px-3 py-1.5 backdrop-blur">
        {blocks.map((block, i) => {
          const id = String(i)
          const blockIsNew = isNew(trackKeys[i])
          return (
            <button
              key={id}
              type="button"
              title={block.label ?? meta.title}
              onClick={() => {
                jump(id)
                if (blockIsNew) markSeen(trackKeys[i])
              }}
              className={cn(
                'relative shrink-0 rounded-md px-2 py-1 text-base leading-none transition-colors',
                activeId === id ? 'bg-white/10' : 'hover:bg-white/5',
              )}
            >
              {block.icon ?? meta.icon}
              {blockIsNew && (
                <NewDotStatic className="absolute right-0.5 top-0.5 h-1.5 w-1.5" />
              )}
            </button>
          )
        })}
      </nav>

      <div className="px-6 py-6 md:px-10">
        <div className="flex items-start gap-3">
          {buckets.map((bucket, i) => (
            <div key={i} className="flex flex-1 flex-col gap-3">
              {bucket.map((id) => {
                const block = blocks[Number(id)]
                if (!block) return null
                const key = trackKeys[Number(id)]
                return (
                  <div
                    key={id}
                    id={blockAnchorId(id)}
                    ref={itemRef(id)}
                    className="relative scroll-mt-14"
                  >
                    {isNew(key) && (
                      <button
                        type="button"
                        onClick={() => markSeen(key)}
                        aria-label="Нове — позначити як переглянуте"
                        title="Нове на платформі — натисніть, щоб прибрати"
                        className="absolute -right-1 -top-1 z-10 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-rose-500/25 transition-transform hover:scale-125"
                      />
                    )}
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
