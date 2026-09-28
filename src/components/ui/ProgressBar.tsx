'use client'

import { cn } from '@/lib/utils'

// The app's one progress bar. TopicProgressBar (sidebar) wraps this; Quiz still
// has its own inline copy and should migrate here eventually.
//
// `fillClassName` REPLACES the default fill rather than being appended:
// appending `bg-green-400` to `bg-gradient-to-r from-indigo-400 to-cyan-400`
// would not displace it — twMerge groups background-image and background-color
// separately, so the gradient would win and the colour would be ignored.
export function ProgressBar({
  value,
  max,
  percent,
  label,
  height = 'h-1.5',
  trackClassName = 'bg-black/30',
  fillClassName = 'bg-gradient-to-r from-indigo-400 to-cyan-400',
  completeClassName = 'bg-emerald-400',
  animate = true,
  className,
}: {
  value: number
  max: number
  /** Pass it when the caller already computed it; otherwise derived. */
  percent?: number
  /** Used verbatim as aria-label — the caller owns the wording and language. */
  label: string
  /** Tailwind height class; goes after the base so it can override. */
  height?: string
  trackClassName?: string
  fillClassName?: string
  completeClassName?: string
  /** False until mounted, to suppress the 0%→N% sweep on first paint. */
  animate?: boolean
  className?: string
}) {
  if (max === 0) return null

  const resolved = percent ?? (max > 0 ? Math.round((Math.min(value, max) / max) * 100) : 0)

  return (
    <span
      role="progressbar"
      aria-valuenow={resolved}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('block overflow-hidden rounded-full', trackClassName, height, className)}
    >
      <span
        className={cn(
          'block h-full rounded-full transition-[width] duration-300',
          resolved >= 100 ? completeClassName : fillClassName,
          !animate && 'duration-0',
        )}
        // The floor keeps a single solved problem out of 181 visible, where
        // 1% would otherwise round to a sub-pixel and vanish.
        style={{ width: resolved > 0 ? `max(${resolved}%, 2px)` : 0 }}
      />
    </span>
  )
}
