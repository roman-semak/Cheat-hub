'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import { TOPICS, FORMAT_LABELS, formatHref, topicHref, ACCENT, getTopic } from '@/lib/cheatsheet/registry'
import { QUICKREF_TOPICS } from '@/lib/cheatsheet/quickref'
import { useUserStore } from '@/lib/userStore'
import { cn } from '@/lib/utils'

interface CheatSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function CheatSidebar({ collapsed, onToggle }: CheatSidebarProps) {
  const pathname = usePathname()
  const { data } = useUserStore()
  const profileActive = pathname === '/profile'

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
            const accent = ACCENT[topic.accent]
            const hrefs = topic.formats.map((f) => formatHref(topic.slug, f))
            const isActive =
              pathname === `/${topic.slug}` ||
              pathname.startsWith(`/${topic.slug}/`) ||
              hrefs.includes(pathname)
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
                    <span className={cn('truncate', isActive && accent.text)}>{topic.title}</span>
                  )}
                </Link>

                {!collapsed && isActive && (
                  <ul className="mb-1 ml-7 mt-0.5 flex flex-col gap-0.5 border-l border-white/10 pl-2">
                    {topic.slug === 'quickref'
                      ? QUICKREF_TOPICS.map((slug) => {
                          const subTopic = getTopic(slug)
                          if (!subTopic) return null
                          const href = `/quickref/${slug}`
                          const subActive = pathname === href
                          return (
                            <li key={slug}>
                              <Link
                                href={href}
                                className={cn(
                                  'flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors',
                                  subActive
                                    ? cn('font-medium', accent.text)
                                    : 'text-slate-400 hover:text-slate-200',
                                )}
                              >
                                <span>{subTopic.icon}</span>
                                <span className="truncate">{subTopic.title}</span>
                              </Link>
                            </li>
                          )
                        })
                      : topic.formats.map((format) => {
                          const href = formatHref(topic.slug, format)
                          const formatActive = pathname === href
                          return (
                            <li key={format}>
                              <Link
                                href={href}
                                className={cn(
                                  'block rounded px-2 py-1 text-xs transition-colors',
                                  formatActive
                                    ? cn('font-medium', accent.text)
                                    : 'text-slate-400 hover:text-slate-200',
                                )}
                              >
                                {FORMAT_LABELS[format]}
                              </Link>
                            </li>
                          )
                        })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

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
