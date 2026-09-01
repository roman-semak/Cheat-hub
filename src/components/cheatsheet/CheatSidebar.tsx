'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import { TOPICS, FORMAT_LABELS, formatHref, topicHref, ACCENT, getTopic } from '@/lib/cheatsheet/registry'
import type { TopicMeta, TopicSlug } from '@/lib/cheatsheet/types'
import { useUserStore } from '@/lib/userStore'
import { cn } from '@/lib/utils'

interface CheatSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

// Sub-links for one topic: its declared formats. Shared between the inline
// list (shown under the active topic when expanded) and the flyout (shown on
// tap when collapsed) so the two states can't drift apart. The `quickref`
// topic has no sub-links — its React/JS/Angular switch lives in the top tab
// bar inside the page (see QuickRefTopicView).
function TopicSubLinks({
  topic,
  pathname,
  accentTextClass,
  onNavigate,
}: {
  topic: TopicMeta
  pathname: string
  accentTextClass: string
  onNavigate?: () => void
}) {
  if (topic.slug === 'quickref') return null

  return (
    <>
      {topic.formats.map((format) => {
        const href = formatHref(topic.slug, format)
        const formatActive = pathname === href
        return (
          <li key={format}>
            <Link
              href={href}
              onClick={onNavigate}
              className={cn(
                'block rounded px-2 py-1 text-xs transition-colors',
                formatActive
                  ? cn('bg-white/5 font-medium', accentTextClass)
                  : 'text-slate-400 hover:text-slate-200',
              )}
            >
              {FORMAT_LABELS[format]}
            </Link>
          </li>
        )
      })}
    </>
  )
}

export function CheatSidebar({ collapsed, onToggle }: CheatSidebarProps) {
  const pathname = usePathname()
  const { data } = useUserStore()
  const profileActive = pathname === '/profile'

  // Collapsed-rail flyout: tap an icon to reveal its name + sub-links next
  // to the rail, since the 56px rail has no room for text and native title
  // tooltips don't work on touch (iPad). `top` is the tapped icon's
  // viewport position; the flyout is `fixed` (not absolute) so the nav
  // list's `overflow-y-auto` can't clip it.
  const [openFlyout, setOpenFlyout] = useState<{ slug: TopicSlug; top: number } | null>(null)
  const flyoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openFlyout) return

    const handlePointerDown = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setOpenFlyout(null)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenFlyout(null)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openFlyout])

  // Close the flyout after a navigation completes.
  useEffect(() => {
    setOpenFlyout(null)
  }, [pathname])

  const flyoutTopic = openFlyout ? getTopic(openFlyout.slug) : undefined

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
                  onClick={(e) => {
                    if (!collapsed) return
                    e.preventDefault()
                    const top = e.currentTarget.getBoundingClientRect().top
                    setOpenFlyout((prev) => (prev?.slug === topic.slug ? null : { slug: topic.slug, top }))
                  }}
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

                {!collapsed && isActive && topic.slug !== 'quickref' && (
                  <ul className="mb-1 ml-7 mt-0.5 flex flex-col gap-0.5 border-l border-white/10 pl-2">
                    <TopicSubLinks topic={topic} pathname={pathname} accentTextClass={accent.text} />
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

      {/* Collapsed-rail flyout */}
      {collapsed && openFlyout && flyoutTopic && (
        <div
          ref={flyoutRef}
          className="fixed z-50 w-52 rounded-lg border border-white/10 bg-slate-900 p-2 shadow-2xl"
          style={{ left: 64, top: Math.min(openFlyout.top, window.innerHeight - 260) }}
        >
          <Link
            href={topicHref(flyoutTopic)}
            onClick={() => setOpenFlyout(null)}
            className={cn(
              'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-white/5',
              ACCENT[flyoutTopic.accent].text,
            )}
          >
            <span className="text-base">{flyoutTopic.icon}</span>
            <span className="truncate">{flyoutTopic.title}</span>
          </Link>
          {flyoutTopic.slug !== 'quickref' && (
            <ul className="mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-2">
              <TopicSubLinks
                topic={flyoutTopic}
                pathname={pathname}
                accentTextClass={ACCENT[flyoutTopic.accent].text}
                onNavigate={() => setOpenFlyout(null)}
              />
            </ul>
          )}
        </div>
      )}
    </aside>
  )
}
