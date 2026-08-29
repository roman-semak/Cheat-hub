'use client'

import { useMemo, useRef } from 'react'
import type { TopicContent, TopicMeta } from '@/lib/cheatsheet/types'
import { ACCENT } from '@/lib/cheatsheet/registry'
import { useScrollSpy } from '@/lib/cheatsheet/useScrollSpy'
import { useReadTracking } from '@/lib/cheatsheet/useReadTracking'
import { useRestoreSectionScroll, useSectionHashSync } from '@/lib/cheatsheet/useSectionHash'
import { useUserStore, cycleReadState, resetReadStateForTopic, markSeen } from '@/lib/userStore'
import { useNewContent } from '@/lib/cheatsheet/useNewContent'
import { RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TopicPanel, TopicPanelItem } from './TopicPanel'
import { MobileSectionNav } from './MobileSectionNav'
import { ContentBlocks } from './ContentBlocks'
import { InterviewQuestionsBlock } from './InterviewQuestionsBlock'

// prose/cheat/links share a `slug`, so the "new" tracking namespace is
// suffixed for the non-primary variants to avoid key collisions.
type ProseVariant = 'prose' | 'cheat' | 'links'

export function ProseTopicView({
  content,
  meta,
  variant = 'prose',
}: {
  content: TopicContent
  meta: TopicMeta
  variant?: ProseVariant
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const accent = ACCENT[meta.accent]
  const { data } = useUserStore()
  const ns =
    variant === 'cheat'
      ? `${content.slug}-cheat`
      : variant === 'links'
        ? `${content.slug}-links`
        : content.slug

  // Kept independent of `data.readState` so its identity is stable across
  // read-state changes — otherwise useReadTracking's effect would re-run on
  // every toggle/auto-mark, re-observing already-visible sentinels and
  // firing a spurious auto-read right after a manual toggle.
  const ids = useMemo(() => content.sections.map((s) => s.id), [content.sections])

  const newKeys = useMemo(
    () => content.sections.map((s) => `${ns}:${s.id}`),
    [content.sections, ns],
  )
  const { isNew, hasRecent, markAllSeen } = useNewContent(newKeys)

  const items: TopicPanelItem[] = useMemo(
    () =>
      content.sections.map((s) => ({
        id: s.id,
        label: s.title,
        state: data.readState[`${content.slug}:${s.id}`],
        isNew: isNew(`${ns}:${s.id}`),
      })),
    [content.sections, content.slug, ns, data.readState, isNew],
  )
  const activeId = useScrollSpy(ids, scrollRef)
  useReadTracking(content.slug, ids, scrollRef)
  useRestoreSectionScroll(ids, scrollRef)
  useSectionHashSync(activeId)

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const toggleState = (id: string) => cycleReadState(`${content.slug}:${id}`)
  const dismissNew = (id: string) => markSeen(`${ns}:${id}`)

  return (
    <div className="flex h-screen">
      <TopicPanel
        items={items}
        activeId={activeId}
        onJump={jump}
        onToggleState={toggleState}
        onDismissNew={dismissNew}
        accentText={accent.text}
        accentBorder=""
      />

      <div
        ref={scrollRef}
        className="flex-1 snap-y snap-proximity overflow-y-auto scroll-smooth"
      >
        <MobileSectionNav items={items} activeId={activeId} onJump={jump} />

        <header className="border-b border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-6 py-8 md:px-10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-100">
                <span>{meta.icon}</span> {meta.title}
              </h1>
              <p className="mt-2 max-w-2xl text-slate-400">{meta.blurb}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-1">
              {hasRecent && (
                <Button
                  onClick={markAllSeen}
                  variant="ghost"
                  className="inline-flex items-center gap-2 text-rose-300"
                >
                  <Sparkles size={16} /> Позначити нове як переглянуте
                </Button>
              )}
              <Button
                onClick={() => {
                  if (confirm(`Скинути всі позначки прочитаного в «${meta.title}»?`)) {
                    resetReadStateForTopic(content.slug)
                  }
                }}
                variant="ghost"
                className="inline-flex items-center gap-2 text-red-300"
              >
                <RotateCcw size={16} /> Скинути прогрес
              </Button>
            </div>
          </div>
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
              {section.interviewQuestions && section.interviewQuestions.length > 0 && (
                <InterviewQuestionsBlock
                  sectionTitle={section.title}
                  questions={section.interviewQuestions}
                />
              )}
              <div id={`${section.id}-end`} />
            </div>
          </section>
        ))}

        <div className="h-24" />
      </div>
    </div>
  )
}
