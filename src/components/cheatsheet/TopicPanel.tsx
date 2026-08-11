'use client'

import { cn } from '@/lib/utils'

export interface TopicPanelItem {
  id: string
  label: string
  emoji?: string
}

export function TopicPanel({
  items,
  activeId,
  onJump,
  accentText = 'text-orange-300',
  accentBorder = 'border-orange-400',
}: {
  items: TopicPanelItem[]
  activeId: string
  onJump: (id: string) => void
  accentText?: string
  accentBorder?: string
}) {
  return (
    <nav className="hidden h-full w-56 shrink-0 overflow-y-auto border-r border-white/10 py-3 lg:block">
      <ul className="flex flex-col">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <button
                onClick={() => onJump(item.id)}
                className={cn(
                  'flex w-full items-center gap-2 border-l-[3px] px-3 py-2 text-left text-[13px] transition-colors',
                  active
                    ? cn('border-l-current bg-white/5', accentText, accentBorder)
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200',
                )}
              >
                {item.emoji && <span className="shrink-0">{item.emoji}</span>}
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
