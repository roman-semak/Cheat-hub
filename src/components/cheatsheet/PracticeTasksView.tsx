'use client'

import { useEffect, useMemo, useState } from 'react'
import Editor, { type Monaco } from '@monaco-editor/react'
import { Search, Check, Copy, Eye, EyeOff, RotateCcw, Sparkles } from 'lucide-react'
import 'highlight.js/styles/github-dark.css'
import type { PracticeTask, PracticeTopic } from '@/lib/cheatsheet/types'
import { highlight } from '@/lib/cheatsheet/highlight'
import { useNewContent } from '@/lib/cheatsheet/useNewContent'
import { GlassPanel } from '@/components/glass/GlassPanel'
import { Button } from '@/components/ui/Button'
import { NewDotStatic } from './NewDot'

const TOPICS: PracticeTopic[] = [
  'JS Utilities',
  'Arrays & Strings',
  'Async',
  'React Components',
  'React Hooks',
  'React Debugging',
  'DOM',
  'System Design',
  'RxJS',
  'Angular',
  'React Native',
]

const LEVEL_STYLE: Record<string, string> = {
  Middle: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Senior: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
}

// 🔴/🟡/🟢 priority markers from the interview-prep checklist.
const PRIORITY_DOT: Record<string, string> = {
  high: 'bg-rose-400',
  mid: 'bg-amber-400',
  low: 'bg-slate-500',
}
const PRIORITY_LABEL: Record<string, string> = {
  high: 'Висока ймовірність на інтерв’ю',
  mid: 'Середня ймовірність',
  low: 'Низька ймовірність',
}

// Monaco compiler options — IntelliSense only (code is never executed here).
function beforeMount(monaco: Monaco) {
  const opts = {
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    lib: ['es2020', 'dom'],
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    noEmit: true,
  }
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions(opts)
  // Third-party modules (rxjs, ...) are not loaded → silence "cannot find module".
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  })
}

// Interview-style practice: pick a task, attempt it in the editor, reveal the
// reference solution. Nothing is executed — these are static study cards.
export function PracticeTasksView({ tasks }: { tasks: PracticeTask[] }) {
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState<PracticeTopic | 'all'>('all')
  const [selectedId, setSelectedId] = useState<string>(tasks[0]?.id ?? '')

  const groups = useMemo(() => {
    const term = search.trim().toLowerCase()
    return TOPICS.map((t) => ({
      topic: t,
      tasks: tasks.filter((task) => {
        if (topic !== 'all' && task.topic !== topic) return false
        if (task.topic !== t) return false
        if (!term) return true
        const haystack = [task.title, task.topic, task.level, ...(task.tags ?? [])]
          .join(' ')
          .toLowerCase()
        return haystack.includes(term)
      }),
    })).filter((g) => g.tasks.length > 0)
  }, [tasks, search, topic])

  const filtered = useMemo(() => groups.flatMap((g) => g.tasks), [groups])

  // Keep a valid selection whenever the filter changes.
  useEffect(() => {
    if (filtered.length > 0 && !filtered.some((t) => t.id === selectedId)) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId])

  const selected = useMemo(
    () => tasks.find((t) => t.id === selectedId) ?? null,
    [tasks, selectedId],
  )

  const newKeys = useMemo(() => tasks.map((t) => `practice:${t.id}`), [tasks])
  const { isNew, hasRecent, markSeen, markAllSeen } = useNewContent(newKeys)

  const openTask = (id: string) => {
    setSelectedId(id)
    markSeen(`practice:${id}`) // opening a task counts as seeing it
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar: search + topic filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за назвою, темою або тегом…"
            className="w-full rounded-lg border border-white/10 bg-black/20 py-2.5 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-orange-400/50 focus:outline-none"
          />
        </div>
        {hasRecent && (
          <Button
            onClick={markAllSeen}
            variant="ghost"
            className="inline-flex shrink-0 items-center gap-2 text-rose-300"
          >
            <Sparkles size={16} /> Позначити нове як переглянуте
          </Button>
        )}
        <div className="flex flex-wrap gap-1.5">
          {(['all', ...TOPICS] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                topic === t
                  ? 'border-orange-400/50 bg-orange-500/15 text-orange-300'
                  : 'border-white/10 bg-black/20 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t === 'all' ? 'Усі' : t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(240px,320px)_1fr]">
        {/* Master: task list, grouped by topic */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 && (
            <p className="text-sm text-slate-500">Нічого не знайдено.</p>
          )}
          {groups.map((group) => (
            <div key={group.topic} className="flex flex-col gap-2">
              <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                {group.topic} ({group.tasks.length})
              </div>
              <ul className="flex flex-col gap-2">
                {group.tasks.map((task) => (
                  <li key={task.id}>
                    <button
                      onClick={() => openTask(task.id)}
                      className={`w-full rounded-xl border p-3 text-left transition-colors ${
                        task.id === selectedId
                          ? 'border-orange-400/50 bg-orange-500/10'
                          : 'border-white/10 bg-black/20 hover:border-orange-400/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex items-start gap-1.5 text-sm font-semibold text-slate-100">
                          {isNew(`practice:${task.id}`) && (
                            <NewDotStatic className="mt-1.5 h-1.5 w-1.5" />
                          )}
                          {task.priority && (
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                PRIORITY_DOT[task.priority]
                              }`}
                              title={PRIORITY_LABEL[task.priority]}
                            />
                          )}
                          {task.title}
                        </span>
                        <span
                          className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${
                            LEVEL_STYLE[task.level]
                          }`}
                        >
                          {task.level}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="rounded bg-white/5 px-1.5 py-0.5 font-medium text-slate-400">
                          {task.topic}
                        </span>
                        {task.tags?.slice(0, 3).map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detail: selected task */}
        {selected && <TaskDetail key={selected.id} task={selected} />}
      </div>
    </div>
  )
}

function TaskDetail({ task }: { task: PracticeTask }) {
  const language = task.language ?? 'typescript'
  const isDiscussion = task.format === 'discussion'
  const [code, setCode] = useState(task.starterCode ?? '')
  const [showSolution, setShowSolution] = useState(false)
  const [copied, setCopied] = useState(false)

  const solutionHtml = useMemo(
    () => (isDiscussion ? task.solution : highlight(task.solution, language)),
    [task.solution, language, isDiscussion],
  )

  const copySolution = async () => {
    try {
      await navigator.clipboard.writeText(task.solution)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold text-slate-100">{task.title}</h2>
          <span
            className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
              LEVEL_STYLE[task.level]
            }`}
          >
            {task.level}
          </span>
          <span className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-400">
            {task.topic}
          </span>
        </div>
      </div>

      {/* Prompt */}
      <div
        className="cheat-prose text-sm text-slate-300"
        dangerouslySetInnerHTML={{ __html: task.prompt }}
      />

      {/* Editor (editable; not executed) — hidden for discussion cards */}
      {!isDiscussion && (
        <GlassPanel className="h-[360px] overflow-hidden">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(v) => setCode(v ?? '')}
            theme="vs-dark"
            beforeMount={beforeMount}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              tabCompletion: 'on',
            }}
          />
        </GlassPanel>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={showSolution ? 'secondary' : 'default'}
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => setShowSolution((s) => !s)}
        >
          <span className="flex items-center gap-2">
            {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSolution
              ? isDiscussion
                ? 'Сховати відповідь'
                : 'Сховати рішення'
              : isDiscussion
                ? 'Показати відповідь'
                : 'Показати рішення'}
          </span>
        </Button>
        {!isDiscussion && (
          <Button variant="outline" onClick={() => setCode(task.starterCode ?? '')}>
            <span className="flex items-center gap-2">
              <RotateCcw size={16} /> Скинути код
            </span>
          </Button>
        )}
      </div>

      {/* Solution + explanation */}
      {showSolution && (
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-emerald-300">
                {isDiscussion ? 'Еталонна відповідь' : 'Рішення'}
              </h3>
              {!isDiscussion && (
                <button
                  onClick={copySolution}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                  aria-label="Скопіювати рішення"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              )}
            </div>
            {isDiscussion ? (
              <div
                className="cheat-prose rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-300"
                dangerouslySetInnerHTML={{ __html: solutionHtml }}
              />
            ) : (
              <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 text-[13px] leading-relaxed">
                <code
                  className="hljs bg-transparent p-0 font-mono"
                  dangerouslySetInnerHTML={{ __html: solutionHtml }}
                />
              </pre>
            )}
          </div>

          {task.explanation && (
            <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/5 p-4">
              <h3 className="mb-2 text-sm font-semibold text-indigo-200">Розбір</h3>
              <div
                className="cheat-prose text-sm text-slate-300"
                dangerouslySetInnerHTML={{ __html: task.explanation }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
