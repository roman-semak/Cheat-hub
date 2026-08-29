'use client'

import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

// The unified per-content-unit marker. Three states in one control:
//   new    — added to the platform recently, user hasn't acknowledged it (red •)
//   unread — acknowledged / not new, not marked read (grey ○)
//   read   — user marked it done, or scrolled past it (green ✓)
// Click cycles new → unread → read → unread. "new" is only reachable from the
// content manifest, never by clicking back.
export type ContentStatus = 'new' | 'unread' | 'read'

const LABEL: Record<ContentStatus, string> = {
  new: 'Нове на платформі — натисніть, щоб позначити переглянутим',
  unread: 'Позначити прочитаним',
  read: 'Прочитано — натисніть, щоб зняти',
}

function Icon({ status, className }: { status: ContentStatus; className?: string }) {
  if (status === 'new') {
    return (
      <span
        className={cn(
          'block rounded-full bg-rose-500 ring-2 ring-rose-500/25',
          className ?? 'h-2 w-2',
        )}
      />
    )
  }
  if (status === 'read') return <Check size={13} className={cn('text-emerald-400', className)} />
  return <Circle size={13} className={cn('text-slate-600', className)} />
}

// Interactive: use where a nested <button> is valid.
export function StatusMarker({
  status,
  onCycle,
  className,
  iconClassName,
}: {
  status: ContentStatus
  onCycle: () => void
  className?: string
  iconClassName?: string
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onCycle()
      }}
      aria-label={LABEL[status]}
      title={LABEL[status]}
      className={cn(
        'shrink-0 rounded p-0.5 transition-transform hover:scale-110 hover:bg-white/10',
        className,
      )}
    >
      <Icon status={status} className={iconClassName} />
    </button>
  )
}

// Non-interactive glyph — for contexts that are themselves a <button>
// (nesting a button is invalid HTML), e.g. the quickref nav row.
export function StatusGlyph({
  status,
  className,
}: {
  status: ContentStatus
  className?: string
}) {
  if (status === 'unread') return null
  return (
    <span aria-hidden title={LABEL[status]} className="inline-flex">
      <Icon status={status} className={className} />
    </span>
  )
}
