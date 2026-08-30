'use client'

import { useState, useCallback } from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'
import { GlassPanel } from '@/components/glass/GlassPanel'
import { Button } from '@/components/ui/Button'
import { TestResults, type TestResult } from './TestResults'
import { markSolved, markAttempted, addSubmission } from '@/lib/userStore'

interface TestCase {
  input: string
  expected: string
}

interface CodeEditorProps {
  starterCode: string
  testCases: TestCase[]
  problemSlug: string
  /** False when the problem has no generated test cases yet — hides Run/Submit. */
  hasTests?: boolean
  /** JSON string of the LeetCode signature; forwarded to /api/run. */
  signature?: string
}

type Language = 'javascript' | 'typescript'

function beforeMount(monaco: Monaco) {
  const tsDefaults = monaco.languages.typescript.typescriptDefaults
  const jsDefaults = monaco.languages.typescript.javascriptDefaults

  const compilerOptions = {
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    lib: ['es2020', 'dom'],
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    noEmit: true,
  }

  tsDefaults.setCompilerOptions(compilerOptions)
  jsDefaults.setCompilerOptions(compilerOptions)

  tsDefaults.setDiagnosticsOptions({ noSemanticValidation: false, noSyntaxValidation: false })
  jsDefaults.setDiagnosticsOptions({ noSemanticValidation: true, noSyntaxValidation: false })
}

export function CodeEditor({
  starterCode,
  testCases,
  problemSlug,
  hasTests = true,
  signature,
}: CodeEditorProps) {
  const [code, setCode] = useState(starterCode)
  const [language, setLanguage] = useState<Language>('typescript')
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (persistSubmission: boolean) => {
      setIsRunning(true)
      setError(null)
      setResults(null)

      try {
        const response = await fetch('/api/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, language, testCases, signature }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Failed to run code')
          return
        }

        setResults(data.results)
        const allPassed =
          Array.isArray(data.results) &&
          data.results.length > 0 &&
          data.results.every((r: { passed: boolean }) => r.passed)

        if (allPassed) {
          markSolved(problemSlug)
        } else {
          markAttempted(problemSlug)
        }

        if (persistSubmission) {
          addSubmission({
            slug: problemSlug,
            code,
            language,
            status: allPassed ? 'Accepted' : 'Wrong Answer',
            createdAt: new Date().toISOString(),
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsRunning(false)
      }
    },
    [code, language, testCases, problemSlug, signature],
  )

  const handleRun = useCallback(() => execute(false), [execute])
  const handleSubmit = useCallback(() => execute(true), [execute])

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-300">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 text-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
        </select>
      </div>

      <GlassPanel className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          beforeMount={beforeMount}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
            padding: { top: 16, bottom: 16 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: { other: true, comments: false, strings: false },
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
            parameterHints: { enabled: true },
            wordBasedSuggestions: 'off',
            suggest: {
              showMethods: true,
              showFunctions: true,
              showVariables: true,
              showClasses: true,
              showProperties: true,
              showKeywords: true,
              showSnippets: true,
            },
          }}
        />
      </GlassPanel>

      {hasTests ? (
        <div className="flex gap-2">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            variant="default"
            className="w-full"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isRunning}
            variant="secondary"
            className="w-full"
          >
            Submit
          </Button>
        </div>
      ) : (
        <GlassPanel className="p-4">
          <p className="text-sm text-slate-300">
            Тестів для цієї задачі поки немає — можна писати рішення тут і
            звірятися з розділом <span className="font-medium">Solution</span>.
          </p>
        </GlassPanel>
      )}

      {error && (
        <GlassPanel className="p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </GlassPanel>
      )}

      {results && <TestResults results={results} />}
    </div>
  )
}
