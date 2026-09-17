'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, RotateCcw, Sparkles } from 'lucide-react'
import 'highlight.js/styles/github-dark.css'
import type { QuickRefBlock, QuickRefEntry, QuickRefGroup, TopicMeta } from '@/lib/cheatsheet/types'
import { useColumnCount, useMasonry } from '@/lib/cheatsheet/useMasonry'
import { CHEATSHEET_ENTRIES } from '@/lib/cheatsheet/quickref'
import { getTopic } from '@/lib/cheatsheet/registry'
import { highlight } from '@/lib/cheatsheet/highlight'
import { breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { quickRefBlockKeys } from '@/lib/cheatsheet/quickrefKeys'
import { useContentStatus, sameKey } from '@/lib/cheatsheet/useContentStatus'
import {
  resetReadStateForTopic,
  resetSeenForTopic,
  resetTopicStatus,
} from '@/lib/userStore'
import { Button } from '@/components/ui/Button'
import { StatusMarker } from './StatusMarker'
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

function EntryHead({ entry, hasCode }: { entry: QuickRefEntry; hasCode?: boolean }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono font-semibold text-slate-200">{entry.term}</span>
        {entry.chips && entry.chips.length > 0 && <ChipList chips={entry.chips} />}
        {hasCode && (
          <span className="shrink-0 rounded bg-white/5 px-1 font-mono text-[10px] text-slate-500">
            {'{…}'}
          </span>
        )}
      </div>
      {entry.desc && (
        <div
          className="mt-1 text-xs text-slate-400"
          dangerouslySetInnerHTML={{ __html: entry.desc }}
        />
      )}
    </>
  )
}

function EntryRow({ entry }: { entry: QuickRefEntry }) {
  const highlighted = useMemo(
    () => (entry.code ? highlight(entry.code, entry.codeLanguage ?? 'typescript') : ''),
    [entry.code, entry.codeLanguage],
  )
  const [hintOpen, setHintOpen] = useState(false)

  if (!entry.code) {
    return (
      <div className="text-sm leading-snug">
        <EntryHead entry={entry} />
      </div>
    )
  }

  return (
    <Dialog>
      <div
        className="relative text-sm leading-snug"
        onMouseEnter={() => setHintOpen(true)}
        onMouseLeave={() => setHintOpen(false)}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            onFocus={() => setHintOpen(true)}
            onBlur={() => setHintOpen(false)}
            className="w-full cursor-help rounded-md text-left transition-colors hover:bg-white/5"
          >
            <EntryHead entry={entry} hasCode />
          </button>
        </DialogTrigger>

        {hintOpen && (
          <div
            role="tooltip"
            className="absolute left-0 right-0 top-full z-30 mt-1 rounded-lg border border-white/10 bg-slate-950/95 p-3 shadow-xl backdrop-blur"
          >
            <pre className="overflow-x-auto text-[12px] leading-relaxed [&_code.hljs]:!bg-transparent [&_code.hljs]:!p-0">
              <code
                className="hljs bg-transparent font-mono"
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </pre>
          </div>
        )}
      </div>

      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="mb-0 border-b border-white/10 px-5 py-3 pr-12">
          <DialogTitle className="font-mono text-sm font-medium text-slate-200">
            {entry.term}
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 py-4">
          {entry.desc && (
            <p
              className="text-sm text-slate-300"
              dangerouslySetInnerHTML={{ __html: entry.desc }}
            />
          )}
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

function QuickRefGroupBlock({ group }: { group: QuickRefGroup }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-3">
      <BlockLabel label={group.label} />
      <div className="flex flex-col gap-2">
        {group.entries.map((entry) => (
          <EntryRow key={entry.term} entry={entry} />
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

export function QuickRefTopicView({ meta, blocks }: { meta: TopicMeta; blocks: QuickRefBlock[] }) {
  const columnCount = useColumnCount()
  const ids = useMemo(() => blocks.map((_, i) => String(i)), [blocks])
  const { buckets, itemRef } = useMasonry(ids, columnCount)

  // One tracking key per board block — same derivation the manifest script uses,
  // so the ✓ / • markers line up with `quickref:<slug>:<key>` in the manifest.
  const blockKeys = useMemo(() => quickRefBlockKeys(blocks), [blocks])
  const readPrefix = `quickref:${meta.slug}:`
  const pairFor = useCallback(
    (index: number) => sameKey(`quickref:${meta.slug}:${blockKeys[index]}`),
    [meta.slug, blockKeys],
  )
  const pairs = useMemo(
    () => blockKeys.map((_, i) => pairFor(i)),
    [blockKeys, pairFor],
  )
  const { statusOf, cycle, hasRecent, markAllSeen } = useContentStatus(pairs)

  return (
    <div className="paper min-h-screen">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Cheat Hub', path: '/' },
          { name: `${meta.title} — Шпаргалка`, path: `/quickref/${meta.slug}` },
        ])}
      />
      <h1 className="sr-only">{meta.title} — Шпаргалка</h1>
      <nav className="sticky top-0 z-20 flex items-center gap-1 overflow-x-auto border-b border-white/10 bg-slate-950/90 px-3 py-1.5 backdrop-blur">
        {CHEATSHEET_ENTRIES.map((entry) => {
          const t = getTopic(entry.slug)
          if (!t) return null
          const active = entry.slug === meta.slug
          return (
            <Link
              key={entry.href}
              href={entry.href}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-white/10 font-medium text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
              )}
            >
              <span>{t.icon}</span>
              <span>{entry.label ?? t.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-wrap items-center justify-end gap-1 px-6 pt-4 md:px-10">
        {hasRecent && (
          <>
            <Button
              onClick={markAllSeen}
              variant="ghost"
              size="sm"
              className="inline-flex items-center gap-1.5 text-rose-300"
            >
              <Sparkles size={14} /> Позначити нове як переглянуте
            </Button>
            <Button
              onClick={() => {
                if (confirm(`Повернути червоні позначки «нове» в «${meta.title}»?`)) {
                  resetSeenForTopic(readPrefix)
                }
              }}
              variant="ghost"
              size="sm"
              title="Повернути позначки «нове» (•) на цій шпаргалці"
              className="inline-flex items-center gap-1.5 text-rose-300"
            >
              <span className="block h-2 w-2 rounded-full bg-rose-500" /> Скинути •
            </Button>
          </>
        )}
        <Button
          onClick={() => {
            if (confirm(`Зняти всі зелені ✓ на шпаргалці «${meta.title}»?`)) {
              resetReadStateForTopic(`quickref:${meta.slug}`)
            }
          }}
          variant="ghost"
          size="sm"
          title="Зняти позначки прочитаного (✓) на цій шпаргалці"
          className="inline-flex items-center gap-1.5 text-emerald-300"
        >
          <Check size={14} /> Скинути ✓
        </Button>
        <Button
          onClick={() => {
            if (confirm(`Скинути всі позначки (✓ і •) на шпаргалці «${meta.title}»?`)) {
              resetTopicStatus(readPrefix, readPrefix)
            }
          }}
          variant="ghost"
          size="sm"
          title="Зелені ✓ і червоні • на цій шпаргалці"
          className="inline-flex items-center gap-1.5 text-red-300"
        >
          <RotateCcw size={14} /> Скинути все
        </Button>
      </div>

      <div className="px-6 py-6 md:px-10">
        <div className="flex items-start gap-3">
          {buckets.map((bucket, i) => (
            <div key={i} className="flex flex-1 flex-col gap-3">
              {bucket.map((id) => {
                const index = Number(id)
                const block = blocks[index]
                if (!block) return null
                const status = statusOf(pairFor(index))
                return (
                  <div key={id} ref={itemRef(id)} className="relative">
                    <div
                      className={cn(
                        'rounded-lg',
                        status === 'read' && 'ring-1 ring-emerald-500/25',
                        status === 'new' && 'ring-1 ring-rose-500/30',
                      )}
                    >
                      {renderBlock(block)}
                    </div>
                    <StatusMarker
                      status={status}
                      onCycle={() => cycle(pairFor(index))}
                      className="absolute right-1 top-1 z-10 bg-slate-950/60"
                    />
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
