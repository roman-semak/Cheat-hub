import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { TaskCard as TaskCardData } from '@/lib/cheatsheet/types'
import { DifficultyBadge } from './DifficultyBadge'
import { CodeBlock } from './CodeBlock'

export function TaskCard({ task }: { task: TaskCardData }) {
  return (
    <div className="glass-subtle rounded-xl border border-white/10 p-4 transition-colors hover:border-orange-400/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-slate-100">
          {task.title}
          {task.number > 0 && (
            <span className="ml-2 text-xs font-normal text-slate-500">#{task.number}</span>
          )}
        </h3>
        <DifficultyBadge difficulty={task.difficulty} />
      </div>

      {task.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{task.description}</p>
      )}

      {task.hint && (
        <div className="mt-3 rounded-lg border-l-2 border-indigo-400/60 bg-indigo-500/5 px-3 py-2 text-sm text-slate-300">
          💡 {task.hint}
        </div>
      )}

      {task.complexity && !task.code && (
        <p className="mt-2 text-xs text-slate-500">⏱ {task.complexity}</p>
      )}

      {task.code && (
        <CodeBlock
          code={task.code}
          summary={task.complexity ? `TypeScript — ${task.complexity}` : undefined}
          language={task.language ?? 'typescript'}
        />
      )}

      {task.practiceSlug && (
        <Link
          href={`/problems/${task.practiceSlug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-300"
        >
          Практика <ArrowRight size={14} />
        </Link>
      )}
    </div>
  )
}
