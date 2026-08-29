'use client'

import { useMemo, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import type { Lifehack, LifehackCategory } from '@/lib/cheatsheet/types'
import { useNewContent } from '@/lib/cheatsheet/useNewContent'
import { Button } from '@/components/ui/Button'
import { LifehackCard } from './LifehackCard'

// JS/TS lifehacks grouped by category with a free-text search over
// title / tags / code. Empty categories are hidden while filtering.
export function LifehacksView({
  hacks,
  categories,
}: {
  hacks: Lifehack[]
  categories: LifehackCategory[]
}) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return hacks
    return hacks.filter((h) => {
      const haystack = [h.title, h.code, ...(h.tags ?? [])].join(' ').toLowerCase()
      return haystack.includes(term)
    })
  }, [hacks, search])

  const groups = useMemo(
    () =>
      categories
        .map((cat) => ({ cat, items: filtered.filter((h) => h.category === cat.id) }))
        .filter((g) => g.items.length > 0),
    [categories, filtered],
  )

  const newKeys = useMemo(() => hacks.map((h) => `lifehack:${h.id}`), [hacks])
  const { isNew, hasRecent, markSeen, markAllSeen } = useNewContent(newKeys)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за назвою, тегом або кодом…"
            className="w-full rounded-lg border border-white/10 bg-black/20 py-2.5 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-orange-400/50 focus:outline-none"
          />
        </div>
        {hasRecent && (
          <Button
            onClick={markAllSeen}
            variant="ghost"
            className="inline-flex shrink-0 items-center gap-2 text-rose-300"
          >
            <Sparkles size={16} /> Позначити нове як переглянуте
          </Button>
        )}
      </div>

      {groups.length === 0 ? (
        <p className="text-sm text-slate-500">Нічого не знайдено.</p>
      ) : (
        groups.map(({ cat, items }) => (
          <section key={cat.id}>
            <h2 className="mb-3 flex items-center gap-2 border-b border-orange-400/30 pb-2 text-lg font-bold text-orange-400">
              {cat.emoji && <span>{cat.emoji}</span>} {cat.title}
              <span className="text-sm font-normal text-slate-500">({items.length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {items.map((hack) => (
                <LifehackCard
                  key={hack.id}
                  hack={hack}
                  isNew={isNew(`lifehack:${hack.id}`)}
                  onDismissNew={() => markSeen(`lifehack:${hack.id}`)}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
