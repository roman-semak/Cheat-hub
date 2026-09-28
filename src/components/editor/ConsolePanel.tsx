'use client'

import type { ReactNode } from 'react'
import { Terminal } from 'lucide-react'
import type { TestResult } from './TestResults'
import { cn } from '@/lib/utils'

// console.* output captured per test case by src/lib/runner.ts. Grouped by case
// because the same line prints once per test, and knowing which input produced
// it is the whole point when debugging.
//
// Lives in a drawer under the editor, so the height is bounded here rather than
// filling its parent.
export function ConsolePanel({ results }: { results: TestResult[] | null }) {
  if (!results) {
    return (
      <Empty>
        Натисни <b className="text-slate-300">Run Code</b> — тут зʼявиться вивід{' '}
        <code className="rounded bg-black/40 px-1 font-mono text-cyan-300">console.log</code> із
        твого рішення.
      </Empty>
    )
  }

  const withLogs = results.filter((r) => r.logs && r.logs.length > 0)

  if (withLogs.length === 0) {
    return (
      <Empty>
        Запуск не дав виводу. Додай{' '}
        <code className="rounded bg-black/40 px-1 font-mono text-cyan-300">console.log(...)</code> у
        рішення — значення зʼявляться тут, окремо для кожного тесту.
      </Empty>
    )
  }

  return (
    <div className="custom-scrollbar max-h-64 overflow-auto">
      <div className="flex flex-col gap-2 p-2">
        {results.map((result, i) =>
          result.logs && result.logs.length > 0 ? (
            <div key={i} className="rounded-lg border border-white/10 bg-black/30">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-1.5">
                <span
                  className={cn(
                    'h-1.5 w-1.5 shrink-0 rounded-full',
                    result.passed ? 'bg-emerald-400' : 'bg-red-400',
                  )}
                />
                <span className="shrink-0 text-xs font-medium text-slate-300">Тест {i + 1}</span>
                <span className="truncate font-mono text-[11px] text-slate-500">{result.input}</span>
              </div>
              <pre className="custom-scrollbar overflow-x-auto px-3 py-2 font-mono text-[12px] leading-relaxed">
                {result.logs.map((line, j) => (
                  <div
                    key={j}
                    className={cn(
                      line.startsWith('[error]')
                        ? 'text-red-300'
                        : line.startsWith('[warn]')
                          ? 'text-amber-300'
                          : 'text-slate-300',
                    )}
                  >
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}

function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2 p-3 text-sm text-slate-400">
      <Terminal size={16} className="mt-0.5 shrink-0 text-slate-500" />
      <span>{children}</span>
    </p>
  )
}
