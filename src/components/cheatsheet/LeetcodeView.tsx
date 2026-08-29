'use client'

import { useMemo, useRef } from 'react'
import Link from 'next/link'
import { Dumbbell } from 'lucide-react'
import type { LeetcodeData } from '@/lib/cheatsheet/types'
import { useScrollSpy } from '@/lib/cheatsheet/useScrollSpy'
import { useContentStatus, sameKey } from '@/lib/cheatsheet/useContentStatus'
import { TopicPanel, TopicPanelItem } from './TopicPanel'
import { MobileSectionNav } from './MobileSectionNav'
import { TaskCard } from './TaskCard'

export function LeetcodeView({ data }: { data: LeetcodeData }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const pairs = useMemo(
    () =>
      data.sections.flatMap((s) => [
        sameKey(`leetcode:${s.id}`),
        ...s.tasks.map((t) => sameKey(`leetcode-task:${t.id}`)),
      ]),
    [data.sections],
  )
  const { statusOf, cycle } = useContentStatus(pairs)

  const items: TopicPanelItem[] = useMemo(
    () => [
      { id: 'cover', label: 'Зміст', emoji: '📋' },
      ...data.sections.map((s) => ({
        id: s.id,
        label: s.title,
        emoji: s.emoji,
        status: statusOf(sameKey(`leetcode:${s.id}`)),
      })),
    ],
    [data.sections, statusOf],
  )
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const activeId = useScrollSpy(ids, scrollRef)

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const totalTasks = data.sections.reduce((a, s) => a + s.tasks.length, 0)

  return (
    <div className="flex h-screen">
      <TopicPanel
        items={items}
        activeId={activeId}
        onJump={jump}
        onCycleStatus={(id) => cycle(sameKey(`leetcode:${id}`))}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-smooth">
        <MobileSectionNav items={items} activeId={activeId} onJump={jump} />

        {/* Cover */}
        <section
          id="cover"
          className="flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-br from-orange-500/20 via-orange-700/10 to-transparent px-8 py-16 text-center"
        >
          <div className="text-5xl">🧩</div>
          <h1 className="mt-4 text-4xl font-bold text-slate-100">LeetCode</h1>
          <p className="mt-3 max-w-xl text-slate-400">
            NeetCode 250 — база задач для live-coding інтерв’ю. Теорія + практика в редакторі коду.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-8 border-t border-white/10 pt-6">
            <Stat value={`${data.sections.length}`} label="тем" />
            <Stat value={`${totalTasks}`} label="задач" />
            <Stat value="TS" label="розв’язки" />
          </div>

          <Link
            href="/problems"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600"
          >
            <Dumbbell size={18} /> Перейти до практики
          </Link>
        </section>

        {/* Sections */}
        {data.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-4 px-6 py-10 md:px-10">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-1 flex items-center gap-2 text-2xl font-bold text-slate-100">
                <span>{section.emoji}</span> {section.title}
                {section.count != null && (
                  <span className="text-sm font-normal text-slate-500">({section.count})</span>
                )}
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {section.tasks.map((task) => (
                  <TaskCard
                    key={`${section.id}-${task.id}-${task.number}`}
                    task={task}
                    status={statusOf(sameKey(`leetcode-task:${task.id}`))}
                    onCycleStatus={() => cycle(sameKey(`leetcode-task:${task.id}`))}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <div className="h-24" />
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-orange-400">{value}</div>
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  )
}
