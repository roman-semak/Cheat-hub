'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { QuickRefBlock, QuickRefColumn, QuickRefContent, QuickRefGroup } from '@/lib/cheatsheet/types'
import { cn } from '@/lib/utils'
import { QuickRefLifecycleDiagram } from './QuickRefLifecycleDiagram'
import { QuickRefHooksCatalog } from './QuickRefHooksCatalog'

const STORAGE_KEY = 'quickrefCollapsedColumns'

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

function QuickRefColumnCard({
  column,
  collapsed,
  onToggle,
}: {
  column: QuickRefColumn
  collapsed: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="glass-subtle flex flex-col gap-2.5 rounded-2xl border-t-2 p-4"
      style={{ borderTopColor: column.accentHex }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between gap-2 text-left"
        aria-expanded={!collapsed}
      >
        <h2 className="text-sm font-bold" style={{ color: column.accentHex }}>
          {column.title}
        </h2>
        <ChevronDown
          size={14}
          className={cn('shrink-0 text-slate-500 transition-transform', collapsed && '-rotate-90')}
        />
      </button>
      {!collapsed &&
        column.blocks.map((block, i) => {
          if (isLifecycleBlock(block)) return <QuickRefLifecycleDiagram key={i} block={block} />
          if (isHooksCatalogBlock(block)) return <QuickRefHooksCatalog key={i} block={block} />
          if (isChipRow(block)) return <QuickRefChipRowBlock key={i} block={block} />
          return <QuickRefGroupBlock key={i} group={block} />
        })}
    </div>
  )
}

export function QuickRefView({ content }: { content: QuickRefContent }) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  // Read persisted collapse state after mount to avoid hydration mismatch,
  // same pattern as HubShell's sidebar collapse.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCollapsed(new Set(JSON.parse(stored)))
  }, [])

  const toggle = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {content.columns.map((column) => (
          <QuickRefColumnCard
            key={column.id}
            column={column}
            collapsed={collapsed.has(column.id)}
            onToggle={() => toggle(column.id)}
          />
        ))}
      </div>
    </div>
  )
}
