'use client'

import { useCallback, useMemo, useRef } from 'react'
import type { TopicContent, TopicMeta } from '@/lib/cheatsheet/types'
import { ACCENT, formatHref } from '@/lib/cheatsheet/registry'
import { breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { useScrollSpy } from '@/lib/cheatsheet/useScrollSpy'
import { useReadTracking } from '@/lib/cheatsheet/useReadTracking'
import { useRestoreSectionScroll, useSectionHashSync } from '@/lib/cheatsheet/useSectionHash'
import { resetReadStateForTopic, resetAllReadState } from '@/lib/userStore'
import { useContentStatus } from '@/lib/cheatsheet/useContentStatus'
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
  const format =
    variant === 'cheat' ? 'cheatsheet' : variant === 'links' ? 'links' : 'extended'
  const path = formatHref(content.slug, format)
  const ns =
    variant === 'cheat'
      ? `${content.slug}-cheat`
      : variant === 'links'
        ? `${content.slug}-links`
        : content.slug

  // Kept independent of read/seen state so its identity is stable — otherwise
  // useReadTracking's effect would re-run on every status change, re-observing
  // already-visible sentinels.
  const ids = useMemo(() => content.sections.map((s) => s.id), [content.sections])

  const pairFor = useCallback(
    (id: string) => ({ newKey: `${ns}:${id}`, readKey: `${content.slug}:${id}` }),
    [ns, content.slug],
  )
  const pairs = useMemo(
    () => content.sections.map((s) => pairFor(s.id)),
    [content.sections, pairFor],
  )
  const { statusOf, cycle, hasRecent, markAllSeen } = useContentStatus(pairs)

  const items: TopicPanelItem[] = useMemo(
    () =>
      content.sections.map((s) => ({
        id: s.id,
        label: s.title,
        status: statusOf(pairFor(s.id)),
      })),
    [content.sections, statusOf, pairFor],
  )
  const activeId = useScrollSpy(ids, scrollRef)
  const isNewId = useCallback(
    (id: string) => statusOf(pairFor(id)) === 'new',
    [statusOf, pairFor],
  )
  useReadTracking(content.slug, ids, scrollRef, isNewId)
  useRestoreSectionScroll(ids, scrollRef)
  useSectionHashSync(activeId)

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const cycleStatus = (id: string) => cycle(pairFor(id))

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Cheat Hub', path: '/' },
          { name: meta.title, path },
        ])}
      />
      <div className="flex h-screen">
        <TopicPanel
        items={items}
        activeId={activeId}
        onJump={jump}
        onCycleStatus={cycleStatus}
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
                title="Лише поточний топік"
                className="inline-flex items-center gap-2 text-red-300"
              >
                <RotateCcw size={16} /> Скинути прогрес
              </Button>
              <Button
                onClick={() => {
                  if (confirm('Скинути позначки прочитаного в усіх топіках?')) {
                    resetAllReadState()
                  }
                }}
                variant="ghost"
                title="Усі топіки"
                className="inline-flex items-center gap-2 text-red-300"
              >
                <RotateCcw size={16} /> Скинути все
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
    </>
  )
}
