'use client'

import { useCallback, useMemo, useRef } from 'react'
import type { TopicContent, TopicMeta } from '@/lib/cheatsheet/types'
import { ACCENT, formatHref } from '@/lib/cheatsheet/registry'
import { breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { useScrollSpy } from '@/lib/cheatsheet/useScrollSpy'
import { useReadTracking } from '@/lib/cheatsheet/useReadTracking'
import { useRestoreSectionScroll, useSectionHashSync } from '@/lib/cheatsheet/useSectionHash'
import {
  resetReadStateForTopic,
  resetAllReadState,
  resetReadStateForKeys,
  resetReviewForTopic,
  resetTopicStatus,
} from '@/lib/userStore'
import { useContentStatus } from '@/lib/cheatsheet/useContentStatus'
import { Check, ChevronDown, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DownloadMarkdownButton } from './DownloadMarkdownButton'
import { SectionResetButton } from './SectionResetButton'
import { TopicPanel, TopicPanelItem } from './TopicPanel'
import { MobileSectionNav } from './MobileSectionNav'
import { ContentBlocks } from './ContentBlocks'
import { InterviewQuestionsBlock } from './InterviewQuestionsBlock'

// prose/links share a `slug`; the links variant only needs its own suffix for
// the Markdown download filename — read state is shared with the prose page.
type ProseVariant = 'prose' | 'links'

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
  const path = formatHref(content.slug, variant === 'links' ? 'links' : 'extended')
  const ns = variant === 'links' ? `${content.slug}-links` : content.slug

  // Kept independent of read/seen state so its identity is stable — otherwise
  // useReadTracking's effect would re-run on every status change, re-observing
  // already-visible sentinels.
  const ids = useMemo(() => content.sections.map((s) => s.id), [content.sections])

  const keyFor = useCallback((id: string) => `${content.slug}:${id}`, [content.slug])
  const keys = useMemo(() => ids.map(keyFor), [ids, keyFor])
  const { statusOf, cycle, hasRead, hasReview } = useContentStatus(keys)

  const items: TopicPanelItem[] = useMemo(
    () =>
      content.sections.map((s) => ({
        id: s.id,
        label: s.title,
        status: statusOf(keyFor(s.id)),
      })),
    [content.sections, statusOf, keyFor],
  )
  const activeId = useScrollSpy(ids, scrollRef)
  // Scrolling past a section only fills an EMPTY slot (markReadIfUnset), so it
  // can never overwrite a red "review" flag the reader set deliberately.
  useReadTracking(content.slug, ids, scrollRef)
  useRestoreSectionScroll(ids, scrollRef)
  useSectionHashSync(activeId)

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const cycleStatus = (id: string) => cycle(keyFor(id))

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

        <header className="snap-start border-b border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent px-6 py-8 md:px-10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-100">
                <span>{meta.icon}</span> {meta.title}
              </h1>
              <p className="mt-2 max-w-2xl text-slate-400">{meta.blurb}</p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-1">
              <DownloadMarkdownButton
                filename={`cheat-hub-${ns}.md`}
                title={`Завантажити «${meta.title}» як Markdown`}
                prefetch={() => import('@/lib/cheatsheet/toMarkdown')}
                build={async () => {
                  const { topicToMarkdown } = await import('@/lib/cheatsheet/toMarkdown')
                  return topicToMarkdown(content, meta, { path })
                }}
              />
              {hasRead && (
                <Button
                  onClick={() => {
                    if (confirm(`Зняти всі зелені ✓ у «${meta.title}»?`)) {
                      resetReadStateForTopic(content.slug)
                    }
                  }}
                  variant="ghost"
                  title="Зняти позначки прочитаного (✓) у цьому топіку"
                  className="inline-flex items-center gap-2 text-emerald-300"
                >
                  <Check size={16} /> Скинути ✓
                </Button>
              )}
              {hasReview && (
                <Button
                  onClick={() => {
                    if (confirm(`Зняти всі червоні позначки «повторити» в «${meta.title}»?`)) {
                      resetReviewForTopic(content.slug)
                    }
                  }}
                  variant="ghost"
                  title="Зняти позначки «повторити» (●) у цьому топіку"
                  className="inline-flex items-center gap-2 text-rose-300"
                >
                  <span className="block h-2 w-2 rounded-full bg-rose-500" /> Скинути ●
                </Button>
              )}
              {(hasRead || hasReview) && (
                <Button
                  onClick={() => {
                    if (confirm(`Скинути всі позначки (✓ і ●) в «${meta.title}»?`)) {
                      resetTopicStatus(`${content.slug}:`)
                    }
                  }}
                  variant="ghost"
                  title="Зелені ✓ і червоні ● у цьому топіку"
                  className="inline-flex items-center gap-2 text-red-300"
                >
                  <RotateCcw size={16} /> Скинути все
                </Button>
              )}
              <Button
                onClick={() => {
                  if (confirm('Скинути позначки прочитаного в усіх топіках?')) {
                    resetAllReadState()
                  }
                }}
                variant="ghost"
                size="sm"
                title="Позначки прочитаного в усіх топіках"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-red-300"
              >
                <RotateCcw size={13} /> Усі топіки
              </Button>
            </div>
          </div>
        </header>

        {content.sections.map((section, i) => {
          const next = content.sections[i + 1]
          return (
          <section
            key={section.id}
            id={section.id}
            className="min-h-[100dvh] scroll-mt-4 snap-start px-6 py-8 md:px-10"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-100">
                <span>{section.title}</span>
                <SectionResetButton
                  show={statusOf(keyFor(section.id)) !== 'unread'}
                  label={section.title}
                  onReset={() => resetReadStateForKeys([`${content.slug}:${section.id}`])}
                />
              </h2>
              <ContentBlocks blocks={section.blocks} />
              {section.interviewQuestions && section.interviewQuestions.length > 0 && (
                <InterviewQuestionsBlock
                  sectionTitle={section.title}
                  questions={section.interviewQuestions}
                />
              )}
              {next && (
                <div className="mt-10 flex justify-center">
                  <Button
                    onClick={() => jump(next.id)}
                    variant="outline"
                    className="inline-flex max-w-full items-center gap-2"
                  >
                    <span className="truncate">Далі: {next.title}</span>
                    <ChevronDown size={16} className="shrink-0" />
                  </Button>
                </div>
              )}
              <div id={`${section.id}-end`} />
            </div>
          </section>
          )
        })}

        <div className="h-24" />
      </div>
      </div>
    </>
  )
}
