'use client'

import { KeyboardEvent, ReactNode, useRef } from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  label: ReactNode
}

// Controlled tab bar that can host React children (TabsBlock can't — its API is
// HTML-string only). Panels are rendered by the caller so an expensive child
// like Monaco can stay mounted and merely be hidden.
//
// a11y contract copied from TabsBlock: roving tabindex, arrow/Home/End keys,
// aria-selected / aria-controls / aria-labelledby.
export function Tabs({
  idBase,
  items,
  active,
  onChange,
  className,
  children,
}: {
  /** Shared id root — the caller owns it so its panels can point back here. */
  idBase: string
  items: TabItem[]
  active: string
  onChange: (id: string) => void
  className?: string
  /** Right-aligned extras (buttons, badges) on the same row as the tabs. */
  children?: ReactNode
}) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const select = (index: number) => {
    const next = items[(index + items.length) % items.length]
    onChange(next.id)
    tabRefs.current[next.id]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = items.findIndex((t) => t.id === active)
    if (e.key === 'ArrowRight') select(i + 1)
    else if (e.key === 'ArrowLeft') select(i - 1)
    else if (e.key === 'Home') select(0)
    else if (e.key === 'End') select(items.length - 1)
    else return
    e.preventDefault()
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div role="tablist" onKeyDown={onKeyDown} className="flex flex-wrap gap-1.5">
        {items.map((tab) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el
              }}
              type="button"
              role="tab"
              id={tabId(idBase, tab.id)}
              aria-selected={selected}
              aria-controls={panelId(idBase, tab.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors',
                selected
                  ? 'border-indigo-400/60 bg-indigo-500/20 text-indigo-100'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {children}
    </div>
  )
}

// Panels live in the caller, so both sides derive their ids from the same
// caller-owned `idBase` (typically a useId()).
export const tabId = (base: string, id: string) => `${base}-tab-${id}`
export const panelId = (base: string, id: string) => `${base}-panel-${id}`
