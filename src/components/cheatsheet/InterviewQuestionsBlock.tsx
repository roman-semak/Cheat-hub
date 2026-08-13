'use client'

import { useState } from 'react'
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react'
import type { FlashcardItem } from '@/lib/cheatsheet/types'
import { cn } from '@/lib/utils'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Clickable end-of-section block that opens a popup with senior-frontend
// interview Q&A for that section, navigable via a numbered tab-strip or
// Prev/Next (slider-style).
export function InterviewQuestionsBlock({
  sectionTitle,
  questions,
}: {
  sectionTitle: string
  questions: FlashcardItem[]
}) {
  const [active, setActive] = useState(0)
  const current = questions[active]

  return (
    <Dialog onOpenChange={(open) => !open && setActive(0)}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="glass-dark mt-8 flex w-full items-center justify-between rounded-xl border border-white/10 px-5 py-4 text-left transition-colors hover:border-indigo-400/40"
        >
          <span className="flex items-center gap-2 font-medium text-slate-100">
            <Briefcase size={18} className="text-cyan-400" />
            Питання на співбесіді
          </span>
          <span className="text-sm text-slate-400">{questions.length} питань →</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-cyan-400">💼</span> Питання на співбесіді — {sectionTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={cn(
                'h-7 min-w-7 rounded-full px-2 text-xs font-medium transition-colors',
                i === active
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200',
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="cheat-prose">
          <p className="font-semibold text-slate-100" dangerouslySetInnerHTML={{ __html: current.question }} />
          <div dangerouslySetInnerHTML={{ __html: current.answer }} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setActive((i) => Math.max(0, i - 1))}
            disabled={active === 0}
            className="flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-slate-100 disabled:opacity-30"
          >
            <ChevronLeft size={16} /> Попереднє
          </button>
          <span className="text-xs text-slate-500">
            {active + 1} / {questions.length}
          </span>
          <button
            type="button"
            onClick={() => setActive((i) => Math.min(questions.length - 1, i + 1))}
            disabled={active === questions.length - 1}
            className="flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-slate-100 disabled:opacity-30"
          >
            Наступне <ChevronRight size={16} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
