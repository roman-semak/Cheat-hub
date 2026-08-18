import Link from 'next/link'
import type { TopicMeta } from '@/lib/cheatsheet/types'
import { ACCENT, FORMAT_LABELS, formatHref, topicHref } from '@/lib/cheatsheet/registry'
import { cn } from '@/lib/utils'

export function TopicHubCard({ topic }: { topic: TopicMeta }) {
  const accent = ACCENT[topic.accent]

  return (
    <div
      className={cn(
        'glass-subtle group flex flex-col rounded-2xl border border-white/10 p-5 transition-colors',
        accent.border,
      )}
    >
      <Link href={topicHref(topic)} className="flex items-start gap-3">
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xl',
            accent.gradient,
          )}
        >
          {topic.icon}
        </span>
        <div>
          <h3 className={cn('text-lg font-semibold text-slate-100 group-hover:text-white')}>
            {topic.title}
          </h3>
        </div>
      </Link>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{topic.blurb}</p>

      {topic.badges && topic.badges.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {topic.badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      {topic.slug !== 'quickref' && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
          {topic.formats.map((format) => (
            <Link
              key={format}
              href={formatHref(topic.slug, format)}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10',
                format === topic.formats[0] && accent.text,
              )}
            >
              {FORMAT_LABELS[format]}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
