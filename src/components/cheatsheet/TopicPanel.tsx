'use client'

import { Check, RotateCcw, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReadState } from '@/lib/userStore'
import { NewDot } from './NewDot'

export interface TopicPanelItem {
  id: string
  label: string
  emoji?: string
  state?: ReadState
  isNew?: boolean
}

export function TopicPanel({
  items,
  activeId,
  onJump,
  onToggleState,
  onDismissNew,
  accentText = 'text-orange-300',
  accentBorder = 'border-orange-400',
}: {
  items: TopicPanelItem[]
  activeId: string
  onJump: (id: string) => void
  onToggleState?: (id: string) => void
  onDismissNew?: (id: string) => void
  accentText?: string
  accentBorder?: string
}) {
  return (
    <nav className="hidden h-full w-56 shrink-0 overflow-y-auto border-r border-white/10 py-3 lg:block">
      <ul className="flex flex-col">
        {items.map((item) => {
          const active = item.id === activeId
          const stateBg =
            item.state === 'read'
              ? 'bg-emerald-500/10'
              : item.state === 'review'
                ? 'bg-amber-500/10'
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
                {item.isNew && onDismissNew && (
                  <NewDot
                    onDismiss={() => onDismissNew(item.id)}
                    className="mr-0.5 h-2 w-2"
                  />
                )}
                {onToggleState && (
                  <button
                    type="button"
                    aria-label={
                      item.state === 'read'
                        ? 'Позначити як таке, що потрібно перечитати'
                        : item.state === 'review'
                          ? 'Скинути позначку'
                          : 'Позначити як прочитане'
                    }
                    onClick={() => onToggleState(item.id)}
                    className={cn(
                      'shrink-0 rounded p-0.5 hover:bg-white/10',
                      item.state === 'read'
                        ? 'text-emerald-400'
                        : item.state === 'review'
                          ? 'text-amber-400'
                          : 'text-slate-600',
                    )}
                  >
                    {item.state === 'read' ? (
                      <Check size={13} />
                    ) : item.state === 'review' ? (
                      <RotateCcw size={13} />
                    ) : (
                      <Circle size={13} />
                    )}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
