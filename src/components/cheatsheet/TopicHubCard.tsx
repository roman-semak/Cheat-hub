import Link from 'next/link'
import type { TopicMeta } from '@/lib/cheatsheet/types'
import { ACCENT, FORMAT_LABELS, formatHref, getTopic, topicHref } from '@/lib/cheatsheet/registry'
import { CHEATSHEET_ENTRIES } from '@/lib/cheatsheet/quickref'
import { cn } from '@/lib/utils'

// The ⚡ Шпаргалка card lists every cheat sheet in the app instead of its own
// (single) format — that section is where all of them now live.
function cardLinks(topic: TopicMeta): { href: string; label: string }[] {
  if (topic.slug === 'quickref') {
    return CHEATSHEET_ENTRIES.map((entry) => ({
      href: entry.href,
      label: entry.label ?? getTopic(entry.slug)?.title ?? entry.slug,
    }))
  }
  return topic.formats.map((format) => ({
    href: formatHref(topic.slug, format),
    label: FORMAT_LABELS[format],
  }))
}

export function TopicHubCard({ topic }: { topic: TopicMeta }) {
  const accent = ACCENT[topic.accent]
  const links = cardLinks(topic)

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

      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'rounded-lg px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10',
              i === 0 && accent.text,
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
