'use client'

import type { TopicPanelItem } from './TopicPanel'

// Compact section selector shown below the `lg` breakpoint, where the fixed
// TopicPanel is hidden (it would otherwise double up with the hub sidebar on
// iPad-width screens). Jumps to the chosen section.
export function MobileSectionNav({
  items,
  activeId,
  onJump,
}: {
  items: TopicPanelItem[]
  activeId: string
  onJump: (id: string) => void
}) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 px-4 py-2 backdrop-blur lg:hidden">
      <label className="sr-only" htmlFor="section-nav">
        Розділи
      </label>
      <select
        id="section-nav"
        value={activeId}
        onChange={(e) => onJump(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-slate-200"
      >
        {items.map((item) => {
          const prefix = item.state === 'read' ? '✓ ' : item.state === 'review' ? '↻ ' : ''
          const label = item.emoji ? `${item.emoji} ${item.label}` : item.label
          return (
            <option key={item.id} value={item.id}>
              {prefix}
              {label}
            </option>
          )
        })}
      </select>
    </div>
  )
}
