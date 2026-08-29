'use client'

import { cn } from '@/lib/utils'
import { StatusMarker, type ContentStatus } from './StatusMarker'

export interface TopicPanelItem {
  id: string
  label: string
  emoji?: string
  status?: ContentStatus
}

export function TopicPanel({
  items,
  activeId,
  onJump,
  onCycleStatus,
  accentText = 'text-orange-300',
  accentBorder = 'border-orange-400',
}: {
  items: TopicPanelItem[]
  activeId: string
  onJump: (id: string) => void
  onCycleStatus?: (id: string) => void
  accentText?: string
  accentBorder?: string
}) {
  return (
    <nav className="hidden h-full w-56 shrink-0 overflow-y-auto border-r border-white/10 py-3 lg:block">
      <ul className="flex flex-col">
        {items.map((item) => {
          const active = item.id === activeId
          const stateBg =
            item.status === 'read'
              ? 'bg-emerald-500/10'
              : item.status === 'new'
                ? 'bg-rose-500/10'
                : ''
          return (
            <li key={item.id}>
              <div
                className={cn(
                  'flex w-full items-center gap-1 border-l-[3px] pr-1.5 text-[13px] transition-colors',
                  active
                    ? cn('border-l-current', stateBg || 'bg-white/5', accentText, accentBorder)
                    : cn(
                        'border-transparent text-slate-400 hover:text-slate-200',
                        stateBg || 'hover:bg-white/5',
                      ),
                )}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onJump(item.id)
                  }}
                  className="flex min-w-0 flex-1 items-center gap-2 py-2 pl-3 text-left"
                >
                  {item.emoji && <span className="shrink-0">{item.emoji}</span>}
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                </a>
                {onCycleStatus && (
                  <StatusMarker
                    status={item.status ?? 'unread'}
                    onCycle={() => onCycleStatus(item.id)}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
