import { GlassCard } from '@/components/glass/GlassCard'
import { Badge } from '@/components/ui/Badge'

export interface TestResult {
  passed: boolean
  input: string
  expected: string
  actual?: string
  error?: string
  /** console.* output captured while this case ran — shown in the Консоль tab. */
  logs?: string[]
}

interface TestResultsProps {
  results: TestResult[]
}

export function TestResults({ results }: TestResultsProps) {
  const passedCount = results.filter((r) => r.passed).length
  const totalCount = results.length

  return (
    <GlassCard variant="subtle">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-100">Test Results</h3>
          <Badge variant={passedCount === totalCount ? 'success' : 'error'}>
            {passedCount}/{totalCount} passed
          </Badge>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {results.map((result, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border"
              style={{
                borderColor: result.passed
                  ? 'rgba(34, 197, 94, 0.3)'
                  : 'rgba(239, 68, 68, 0.3)',
                backgroundColor: result.passed
                  ? 'rgba(34, 197, 94, 0.05)'
                  : 'rgba(239, 68, 68, 0.05)',
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-mono text-slate-400">Test {idx + 1}</span>
                <Badge variant={result.passed ? 'success' : 'error'}>
                  {result.passed ? '✓ Passed' : '✗ Failed'}
                </Badge>
              </div>

              {result.error && (
                <div className="text-red-400 text-xs mb-2">
                  <p className="font-mono">Error: {result.error}</p>
                </div>
              )}

              {!result.error && (
                <div className="text-xs space-y-1">
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
      </div>
    </GlassCard>
  )
}
