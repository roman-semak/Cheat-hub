'use client'

import { RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

// Clears every green ✓ (read marker) for one section / group. Rendered inline
// next to a section heading; hidden entirely when the section has nothing read.
export function SectionResetButton({
  show,
  label,
  onReset,
  className,
}: {
  show: boolean
  label: string
  onReset: () => void
  className?: string
}) {
  if (!show) return null
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (confirm(`Скинути позначки прочитаного в розділі «${label}»?`)) onReset()
      }}
      title="Зняти всі ✓ у цьому розділі"
      aria-label={`Зняти всі позначки прочитаного в розділі «${label}»`}
      className={cn(
        'shrink-0 rounded p-1 text-slate-500 transition-colors hover:bg-white/10 hover:text-red-300',
        className,
      )}
    >
      <RotateCcw size={14} />
    </button>
  )
}
