'use client'

import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight, List } from 'lucide-react'
import { useUserStore } from '@/lib/userStore'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'problemNavCollapsed'

export interface ProblemNavItem {
  slug: string
  title: string
  difficulty: string
}

type DifficultyFilter = 'all' | 'Easy' | 'Medium' | 'Hard'

const diffDot: Record<string, string> = {
  Easy: 'bg-green-400',
  Medium: 'bg-yellow-400',
  Hard: 'bg-red-400',
}

export function ProblemNavShell({
  items,
  children,
}: {
  items: ProblemNavItem[]
  children: ReactNode
}) {
  const pathname = usePathname()
  const currentSlug = pathname.split('/').filter(Boolean).pop() ?? ''
  const { data } = useUserStore()
  const progress = data.progress

  const [collapsed, setCollapsed] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')

  // Read persisted collapse state after mount to avoid hydration mismatch
  // (mirrors HubShell).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === 'true') setCollapsed(true)
    setHydrated(true)
  }, [])

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev
      window.localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  const currentIndex = useMemo(
    () => items.findIndex((i) => i.slug === currentSlug),
    [items, currentSlug],
  )
  const prev = currentIndex > 0 ? items[currentIndex - 1] : undefined
  const next =
    currentIndex >= 0 && currentIndex < items.length - 1
      ? items[currentIndex + 1]
      : undefined

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return items.filter((i) => {
      if (difficulty !== 'all' && i.difficulty !== difficulty) return false
      if (term && !i.title.toLowerCase().includes(term)) return false
      return true
    })
  }, [items, search, difficulty])

  const activeRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [currentSlug, collapsed, filtered])

  return (
    <div className="min-h-screen">
      <aside
        className={cn(
          'glass-dark fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 transition-[width] duration-200',
          collapsed ? 'w-[56px]' : 'w-[288px]',
        )}
      >
        {collapsed ? (
          <div className="flex flex-1 flex-col items-center gap-4 py-4">
            <button
              onClick={toggle}
              aria-label="Розгорнути список задач"
              className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={toggle}
              aria-label="Розгорнути список задач"
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-white"
            >
              <List size={16} />
              <span className="text-xs tracking-wide [writing-mode:vertical-rl]">
                Задачі
              </span>
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-3 py-3">
              <Link
                href="/problems"
                className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white"
              >
                <ArrowLeft size={14} />
                <span>Усі задачі</span>
              </Link>
              <button
                onClick={toggle}
                aria-label="Згорнути список задач"
                className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
            </div>

            {/* Prev / Next */}
            <div className="flex items-center gap-2 px-3 pb-2">
              <PrevNextLink item={prev} dir="prev" />
              <PrevNextLink item={next} dir="next" />
            </div>

            {/* Filters */}
            <div className="space-y-2 px-3 pb-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Пошук задач..."
                className="w-full rounded-lg bg-slate-900/50 px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <div className="flex flex-wrap gap-1">
                {(['all', 'Easy', 'Medium', 'Hard'] as DifficultyFilter[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      'rounded-lg px-2 py-0.5 text-xs font-medium transition-all',
                      difficulty === d
                        ? 'glass text-slate-100'
                        : 'text-slate-400 hover:text-slate-200',
                    )}
                  >
                    {d === 'all' ? 'Усі' : d}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <nav className="custom-scrollbar flex-1 overflow-y-auto px-2 py-2">
              {filtered.length === 0 ? (
                <p className="px-2 py-4 text-sm text-slate-500">Нічого не знайдено.</p>
              ) : (
                <ul className="flex flex-col gap-0.5">
                  {filtered.map((item) => {
                    const status = progress[item.slug]
                    const isActive = item.slug === currentSlug
                    return (
                      <li key={item.slug}>
                        <Link
                          ref={isActive ? activeRef : undefined}
                          href={`/problems/${item.slug}`}
                          className={cn(
                            'flex items-center gap-2 rounded-lg border-l-2 px-2 py-1.5 text-sm transition-colors',
                            isActive
                              ? 'border-indigo-400 bg-white/10 text-white'
                              : 'border-transparent text-slate-300 hover:bg-white/5 hover:text-white',
                          )}
                        >
                          <span className="flex w-3 shrink-0 justify-center">
                            {status === 'solved' ? (
                              <span className="text-emerald-400">✓</span>
                            ) : status === 'attempted' ? (
                              <span className="text-amber-400">•</span>
                            ) : (
                              <span
                                className={cn(
                                  'inline-block h-1.5 w-1.5 rounded-full',
                                  diffDot[item.difficulty] ?? 'bg-slate-500',
                                )}
                              />
                            )}
                          </span>
                          <span
                            className={cn(
                              'truncate',
                              status === 'solved' && !isActive && 'text-slate-400',
                            )}
                          >
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </nav>
          </>
        )}
      </aside>

      <div
        className={cn(
          'min-h-screen transition-[margin] duration-200',
          'ml-[56px]',
          collapsed ? 'md:ml-[56px]' : 'md:ml-[288px]',
          !hydrated && 'duration-0',
        )}
      >
        {children}
      </div>
    </div>
  )
}

function PrevNextLink({
  item,
  dir,
}: {
  item?: ProblemNavItem
  dir: 'prev' | 'next'
}) {
  const label = dir === 'prev' ? 'Попередня' : 'Наступна'
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight

  if (!item) {
    return (
      <span className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/5 px-2 py-1 text-xs text-slate-600">
        {dir === 'prev' && <Icon size={12} />}
        {label}
        {dir === 'next' && <Icon size={12} />}
      </span>
    )
  }

  return (
    <Link
      href={`/problems/${item.slug}`}
      title={item.title}
      className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-slate-300 hover:bg-white/5 hover:text-white"
    >
      {dir === 'prev' && <Icon size={12} />}
      <span className="truncate">{label}</span>
      {dir === 'next' && <Icon size={12} />}
    </Link>
  )
}
