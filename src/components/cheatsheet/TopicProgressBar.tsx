'use client'

import { cn } from '@/lib/utils'

// Thin completion rail under a sidebar topic row: the share of that topic's
// trackable units the reader has marked ✓.
//
// Styling follows the Quiz HUD bar (Quiz.tsx) so the app has one progress-bar
// language. The fill is a single brand gradient rather than the per-topic
// ACCENT colour on purpose: `ACCENT[...].dot` is used nowhere today and 10 of
// its 13 classes appear in no file Tailwind scans (`content` covers
// src/{pages,components,app}, not src/lib), so they would be purged in a
// production build and every bar would render invisible.
export function TopicProgressBar({
  read,
  total,
  percent,
  label,
  collapsed,
  animate,
  className,
}: {
  read: number
  total: number
  percent: number
  /** Topic title, for the accessible name. */
  label: string
  collapsed: boolean
  /** False until the client has mounted — suppresses the 0%→N% sweep. */
  animate: boolean
  className?: string
}) {
  if (total === 0) return null

  return (
    <span
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: прочитано ${read} з ${total}`}
      className={cn(
        'block overflow-hidden rounded-full bg-black/30',
        collapsed ? 'h-0.5' : 'h-[3px]',
        className,
      )}
    >
      <span
        className={cn(
          'block h-full rounded-full transition-[width] duration-300',
          percent >= 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-indigo-400 to-cyan-400',
          !animate && 'duration-0',
        )}
        // The floor keeps 1-of-43 visible on the 40px collapsed rail, where 2%
        // would round to a sub-pixel and vanish.
        style={{ width: percent > 0 ? `max(${percent}%, 2px)` : 0 }}
      />
    </span>
  )
}
