'use client'

import { KeyboardEvent, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Tabbed prose: one pill per tab, only the active panel is rendered. Panel HTML
// sits inside the parent .cheat-prose, so cards/tables/code keep their styles.
export function TabsBlock({ tabs }: { tabs: { label: string; html: string }[] }) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number) => {
    const next = (i + tabs.length) % tabs.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') select(active + 1)
    else if (e.key === 'ArrowLeft') select(active - 1)
    else if (e.key === 'Home') select(0)
    else if (e.key === 'End') select(tabs.length - 1)
    else return
    e.preventDefault()
  }

  if (tabs.length === 0) return null
  const current = tabs[active]

  return (
    <div className="my-4">
      <div
        role="tablist"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1.5 border-b border-white/10 pb-2"
      >
        {tabs.map((tab, i) => {
          const selected = i === active
          return (
            <button
              key={tab.label}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm transition-colors',
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
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="pt-3"
        dangerouslySetInnerHTML={{ __html: current.html }}
      />
    </div>
  )
}
