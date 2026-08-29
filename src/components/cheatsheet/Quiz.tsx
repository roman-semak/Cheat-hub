'use client'

import { useMemo, useRef } from 'react'
import { Check, X, ChevronDown, RotateCcw } from 'lucide-react'
import type { QuizData, TopicSlug } from '@/lib/cheatsheet/types'
import { useUserStore } from '@/lib/userStore'
import { useScrollSpy } from '@/lib/cheatsheet/useScrollSpy'
import { getTopic } from '@/lib/cheatsheet/registry'
import { breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { cn } from '@/lib/utils'

const RESULT_ID = 'quiz-result'

export function Quiz({ data, quizId }: { data: QuizData; quizId: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data: user, hydrated, setQuizAnswer, resetQuiz } = useUserStore()

  // answers[i] = chosen option index, or undefined if unanswered.
  // Only trust persisted answers after hydration to avoid an SSR mismatch.
  const answers = useMemo(
    () => (hydrated ? user.quizzes[quizId]?.answers ?? {} : {}),
    [hydrated, user.quizzes, quizId],
  )

  const total = data.questions.length
  const answeredCount = Object.keys(answers).length
  const score = useMemo(
    () =>
      Object.entries(answers).filter(
        ([i, opt]) => data.questions[Number(i)].correct === opt,
      ).length,
    [answers, data.questions],
  )
  const incorrect = answeredCount - score

  // Track which question is currently in view → current step in the HUD.
  const ids = useMemo(
    () => [...data.questions.map((q) => q.id), RESULT_ID],
    [data.questions],
  )
  const activeId = useScrollSpy(ids, scrollRef)
  const step = activeId === RESULT_ID ? total : Math.max(1, ids.indexOf(activeId) + 1)
  const progress = total > 0 ? (step / total) * 100 : 0

  const choose = (qi: number, oi: number) => setQuizAnswer(quizId, qi, oi)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const reset = () => {
    resetQuiz(quizId)
    scrollTo(data.questions[0]?.id ?? RESULT_ID)
  }

  const topic = getTopic(quizId as TopicSlug)

  return (
    <div
      ref={scrollRef}
      className="h-[100dvh] snap-y snap-mandatory overflow-y-auto scroll-smooth"
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Cheat Hub', path: '/' },
          ...(topic ? [{ name: topic.title, path: `/${quizId}` }] : []),
          { name: `${topic?.title ?? quizId} — Квіз`, path: `/${quizId}/quiz` },
        ])}
      />
      {/* Always-visible "calculator" HUD */}
      <aside className="glass-subtle fixed right-4 top-4 z-40 w-[190px] rounded-2xl border border-white/10 p-3 shadow-lg sm:w-[220px]">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs font-medium text-slate-400">Питання</span>
          <span className="text-sm font-semibold text-slate-100">
            {step} <span className="text-slate-500">/ {total}</span>
          </span>
        </div>

        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-300">
            <Check size={14} /> {score}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-1 text-red-300">
            <X size={14} /> {incorrect}
          </span>
          <span className="ml-auto text-xs font-normal text-slate-500">
            ще {Math.max(0, total - answeredCount)}
          </span>
        </div>

        {answeredCount > 0 && (
          <button
            onClick={reset}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 py-1.5 text-xs text-slate-400 hover:border-white/30 hover:text-slate-200"
          >
            <RotateCcw size={13} /> Почати спочатку
          </button>
        )}
      </aside>

      {/* One question per screen (scroll-snap) */}
      {data.questions.map((q, qi) => {
        const chosen = answers[qi]
        const answered = chosen !== undefined
        const nextId = qi + 1 < total ? data.questions[qi + 1].id : RESULT_ID
        return (
          <section
            key={q.id}
            id={q.id}
            className="flex min-h-[100dvh] snap-start flex-col items-center justify-center px-6 py-20"
          >
            <div className="w-full max-w-3xl">
              <div className="mb-3 text-sm font-medium text-indigo-300">
                Питання {qi + 1} з {total}
              </div>
              <h3
                className="mb-6 text-xl font-semibold text-slate-100"
                dangerouslySetInnerHTML={{ __html: q.question }}
              />
              <div className="flex flex-col gap-2.5">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.correct
                  const isChosen = oi === chosen
                  return (
                    <button
                      key={oi}
                      onClick={() => choose(qi, oi)}
                      disabled={answered}
                      className={cn(
                        'flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                        !answered &&
                          'border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5',
                        answered &&
                          isCorrect &&
                          'border-emerald-500/50 bg-emerald-500/10 text-emerald-200',
                        answered &&
                          isChosen &&
                          !isCorrect &&
                          'border-red-500/50 bg-red-500/10 text-red-200',
                        answered && !isChosen && !isCorrect && 'border-white/5 text-slate-500',
                      )}
                    >
                      <span dangerouslySetInnerHTML={{ __html: opt }} />
                      {answered && isCorrect && <Check size={16} className="shrink-0" />}
                      {answered && isChosen && !isCorrect && <X size={16} className="shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {answered && q.explanation && (
                <div
                  className="cheat-prose mt-4 rounded-lg border-l-2 border-indigo-400/60 bg-indigo-500/5 px-4 py-3 text-sm"
                  dangerouslySetInnerHTML={{ __html: q.explanation }}
                />
              )}

              {answered && (
                <button
                  onClick={() => scrollTo(nextId)}
                  className="mt-6 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  {qi + 1 < total ? 'Далі' : 'До результатів'} <ChevronDown size={16} />
                </button>
              )}
            </div>
          </section>
        )
      })}

      {/* Final results slide */}
      <section
        id={RESULT_ID}
        className="flex min-h-[100dvh] snap-start flex-col items-center justify-center px-6 py-20 text-center"
      >
        <div className="w-full max-w-md">
          <h2 className="mb-2 text-lg font-semibold text-slate-300">{data.title}</h2>
          <div className="mb-1 text-5xl font-bold text-slate-100">
            <span className="text-emerald-400">{score}</span>
            <span className="text-slate-500"> / </span>
            {total}
          </div>
          <p className="mb-6 text-sm text-slate-400">
            правильних відповідей
            {answeredCount < total && (
              <>
                {' '}· відповіли на {answeredCount} з {total}
              </>
            )}
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <RotateCcw size={16} /> Почати спочатку
          </button>
        </div>
      </section>
    </div>
  )
}
