'use client'

import { useMemo, useRef } from 'react'
import type { TopicContent, TopicMeta } from '@/lib/cheatsheet/types'
import { ACCENT } from '@/lib/cheatsheet/registry'
import { useScrollSpy } from '@/lib/cheatsheet/useScrollSpy'
import { useReadTracking } from '@/lib/cheatsheet/useReadTracking'
import { useUserStore, cycleReadState } from '@/lib/userStore'
import { TopicPanel, TopicPanelItem } from './TopicPanel'
import { MobileSectionNav } from './MobileSectionNav'
import { ContentBlocks } from './ContentBlocks'

export function ProseTopicView({
  content,
  meta,
}: {
  content: TopicContent
  meta: TopicMeta
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const accent = ACCENT[meta.accent]
  const { data } = useUserStore()

  // Kept independent of `data.readState` so its identity is stable across
  // read-state changes — otherwise useReadTracking's effect would re-run on
  // every toggle/auto-mark, re-observing already-visible sentinels and
  // firing a spurious auto-read right after a manual toggle.
  const ids = useMemo(() => content.sections.map((s) => s.id), [content.sections])

  const items: TopicPanelItem[] = useMemo(
    () =>
      content.sections.map((s) => ({
        id: s.id,
        label: s.title,
        state: data.readState[`${content.slug}:${s.id}`],
      })),
    [content.sections, content.slug, data.readState],
  )
  const activeId = useScrollSpy(ids, scrollRef)
  useReadTracking(content.slug, ids, scrollRef)

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const toggleState = (id: string) => cycleReadState(`${content.slug}:${id}`)

  return (
    <div className="flex h-screen">
      <TopicPanel
        items={items}
        activeId={activeId}
        onJump={jump}
        onToggleState={toggleState}
        accentText={accent.text}
        accentBorder=""
      />

      <div
        ref={scrollRef}
        className="flex-1 snap-y snap-proximity overflow-y-auto scroll-smooth"
      >
        <MobileSectionNav items={items} activeId={activeId} onJump={jump} />

        <header className="border-b border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-6 py-8 md:px-10">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-100">
            <span>{meta.icon}</span> {meta.title}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">{meta.blurb}</p>
        </header>

        {content.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-[100dvh] scroll-mt-4 snap-start px-6 py-8 md:px-10"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 text-2xl font-bold text-slate-100">{section.title}</h2>
              <ContentBlocks blocks={section.blocks} />
              <div id={`${section.id}-end`} />
            </div>
          </section>
        ))}

        <div className="h-24" />
      </div>
    </div>
  )
}
