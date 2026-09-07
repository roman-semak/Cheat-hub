'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import {
  TOPICS,
  FORMAT_LABELS,
  formatHref,
  topicHref,
  ACCENT,
  getTopic,
} from '@/lib/cheatsheet/registry'
import { CHEATSHEET_ENTRIES, CHEATSHEET_HREFS } from '@/lib/cheatsheet/quickref'
import type { TopicMeta } from '@/lib/cheatsheet/types'
import { useUserStore } from '@/lib/userStore'
import { cn } from '@/lib/utils'

interface CheatSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface SectionLink {
  href: string
  label: string
  icon?: string
}

// Sub-links of the active section, listed in the bottom block below the topic
// list. The ⚡ Шпаргалка section owns every cheat sheet in the app
// (CHEATSHEET_ENTRIES — migrated quickref boards plus the prose pages still at
// their own URLs); every other topic lists only its own declared formats.
function sectionLinks(topic: TopicMeta): SectionLink[] {
  if (topic.slug === 'quickref') {
    return CHEATSHEET_ENTRIES.map((entry) => {
      const entryTopic = getTopic(entry.slug)
      return {
        href: entry.href,
        label: entry.label ?? entryTopic?.title ?? entry.slug,
        icon: entryTopic?.icon,
      }
    })
  }
  return topic.formats.map((format) => ({
    href: formatHref(topic.slug, format),
    label: FORMAT_LABELS[format],
  }))
}

export function CheatSidebar({ collapsed, onToggle }: CheatSidebarProps) {
  const pathname = usePathname()
  const { data } = useUserStore()
  const profileActive = pathname === '/profile'

  // Cheat-sheet URLs sit under their owning topic (/git/cheatsheet, …) but
  // belong to the ⚡ Шпаргалка section, so they must not light up that topic.
  const cheatsheetActive = pathname.startsWith('/quickref') || CHEATSHEET_HREFS.has(pathname)

  const isTopicActive = (topic: TopicMeta) => {
    if (topic.slug === 'quickref') return cheatsheetActive
    if (cheatsheetActive) return false
    if (pathname === `/${topic.slug}` || pathname.startsWith(`/${topic.slug}/`)) return true
    // A format can live outside the topic's own path (practice -> /problems),
    // so match its href and anything nested under it (/problems/two-sum).
    return topic.formats.some((format) => {
      const href = formatHref(topic.slug, format)
      return pathname === href || pathname.startsWith(`${href}/`)
    })
  }

  const activeTopic = TOPICS.find(isTopicActive)
  const links = activeTopic ? sectionLinks(activeTopic) : []

  return (
    <aside
      className={cn(
        'glass-dark fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 transition-[width] duration-200',
        collapsed ? 'w-[56px]' : 'w-[224px]',
      )}
    >
      {/* Brand + toggle */}
      <div className="flex items-center justify-between px-3 py-4">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text font-mono text-xl font-bold text-transparent">
            &lt;/&gt;
          </span>
          {!collapsed && (
            <span className="whitespace-nowrap text-sm font-semibold text-slate-200">
              Cheat Hub
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Розгорнути панель' : 'Згорнути панель'}
          className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <ul className="flex flex-col gap-1">
          {TOPICS.map((topic) => {
            const isActive = topic === activeTopic
            return (
              <li key={topic.slug}>
                <Link
                  href={topicHref(topic)}
                  title={topic.title}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white',
                  )}
                >
                  <span className="w-5 shrink-0 text-center text-base">{topic.icon}</span>
                  {!collapsed && (
                    <span className={cn('truncate', isActive && ACCENT[topic.accent].text)}>
                      {topic.title}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Formats of the active section — kept out of the topic list so the list
          above stays a flat set of sections. Hidden on the 56px rail, which has
          no room for labels. */}
      {!collapsed && activeTopic && links.length > 0 && (
        <div className="border-t border-white/10 px-2 py-2">
          <div className="flex items-center gap-2 px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <span className="text-sm">{activeTopic.icon}</span>
            <span className="truncate">{activeTopic.title}</span>
          </div>
          <ul className="flex max-h-64 flex-col gap-0.5 overflow-y-auto">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors',
                      active
                        ? cn('bg-white/5 font-medium', ACCENT[activeTopic.accent].text)
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
                    )}
                  >
                    {link.icon && (
                      <span className="w-4 shrink-0 text-center text-sm">{link.icon}</span>
                    )}
                    <span className="truncate">{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Profile link (local user) */}
      <div className="border-t border-white/10 px-2 py-2">
        <Link
          href="/profile"
          title="Профіль"
          className={cn(
            'flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors',
            profileActive
              ? 'bg-white/10 text-white'
              : 'text-slate-300 hover:bg-white/5 hover:text-white',
          )}
        >
          <span className="w-5 shrink-0 text-center">
            <User size={16} className="mx-auto" />
          </span>
          {!collapsed && (
            <span className="truncate">{data.username || 'Профіль'}</span>
          )}
        </Link>
      </div>
    </aside>
  )
}
