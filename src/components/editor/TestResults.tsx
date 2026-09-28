import { CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export interface TestResult {
  passed: boolean
  input: string
  expected: string
  actual?: string
  error?: string
  /** console.* output captured while this case ran — shown in the Console tab. */
  logs?: string[]
}

// Rendered inside the results/console tab panel under the editor, so it brings
// no card or heading of its own — the tab label and its badge carry those.
export function TestResults({ results }: { results: TestResult[] | null }) {
  if (!results || results.length === 0) {
    return (
      <p className="flex items-start gap-2 p-3 text-sm text-slate-400">
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-slate-500" />
        <span>
          Натисни <b className="text-slate-300">Run Code</b> — тут зʼявиться результат по кожному
          тесту.
        </span>
      </p>
    )
  }

  return (
    <div className="custom-scrollbar max-h-64 space-y-2 overflow-y-auto p-2">
      {results.map((result, idx) => (
        <div
          key={idx}
          className="rounded-lg border p-3"
          style={{
            borderColor: result.passed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
            backgroundColor: result.passed ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)',
          }}
        >
          <div className="mb-2 flex items-start justify-between">
            <span className="font-mono text-sm text-slate-400">Test {idx + 1}</span>
            <Badge variant={result.passed ? 'success' : 'error'}>
              {result.passed ? '✓ Passed' : '✗ Failed'}
            </Badge>
          </div>

          {result.error ? (
            <p className="font-mono text-xs text-red-400">Error: {result.error}</p>
          ) : (
            <div className="space-y-1 text-xs">
              <p className="text-slate-400">
                <span className="text-slate-500">Input:</span> {result.input}
              </p>
              <p className="text-slate-400">
                <span className="text-slate-500">Expected:</span> {result.expected}
              </p>
              {result.actual !== undefined && (
                <p className={result.passed ? 'text-green-400' : 'text-red-400'}>
                  <span className="text-slate-500">Actual:</span> {result.actual}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
