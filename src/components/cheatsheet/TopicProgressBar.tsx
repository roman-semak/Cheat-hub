'use client'

import { ProgressBar } from '@/components/ui/ProgressBar'

// Thin completion rail under a sidebar topic row: the share of that topic's
// trackable units the reader has marked ✓.
//
// The fill is the shared brand gradient rather than the per-topic ACCENT colour
// on purpose: `ACCENT[...].dot` is used nowhere today and 10 of its 13 classes
// appear in no file Tailwind scans (`content` covers src/{pages,components,app},
// not src/lib), so they would be purged in production and every bar would
// render invisible.
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
  return (
    <ProgressBar
      value={read}
      max={total}
      percent={percent}
      label={`${label}: прочитано ${read} з ${total}`}
      height={collapsed ? 'h-0.5' : 'h-[3px]'}
      animate={animate}
      className={className}
    />
  )
}
