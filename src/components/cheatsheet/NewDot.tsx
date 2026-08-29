'use client'

import { cn } from '@/lib/utils'

// The red "new content" marker — mirrors the green read-state check in
// TopicPanel. A filled rose dot; click to dismiss ("I've seen this").
export function NewDot({
  onDismiss,
  className,
}: {
  onDismiss: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onDismiss()
      }}
      aria-label="Нове — позначити як переглянуте"
      title="Нове на платформі — натисніть, щоб прибрати"
      className={cn(
        'shrink-0 rounded-full bg-rose-500 ring-2 ring-rose-500/25 transition-transform hover:scale-125',
        className ?? 'h-2 w-2',
      )}
    />
  )
}

// Non-interactive variant for rows that are themselves a <button> (nesting a
// button is invalid HTML). The parent row handles dismissal.
export function NewDotStatic({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      title="Нове на платформі"
      className={cn(
        'shrink-0 rounded-full bg-rose-500 ring-2 ring-rose-500/25',
        className ?? 'h-1.5 w-1.5',
      )}
    />
  )
}
