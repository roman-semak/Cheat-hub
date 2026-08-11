'use client'

import { useRef, useState } from 'react'
import { Download, Upload, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useUserStore } from '@/lib/userStore'

const SYNC_STATE_LABEL: Record<string, string> = {
  idle: '',
  syncing: 'Синхронізація…',
  synced: 'Синхронізовано',
  error: 'Помилка синхронізації',
}

function SyncPanel() {
  const { authUsername, syncState, login, logout } = useUserStore()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  // Read straight from the DOM at submit time rather than trusting
  // controlled-input state — some browsers/password managers autofill these
  // fields without firing a React-visible change event, which left the
  // button permanently disabled even though the inputs looked filled.
  // `login` transparently creates the account on first use, so there's only
  // one action here — no separate register step.
  const handleLogin = async () => {
    const username = usernameRef.current?.value.trim() ?? ''
    const password = passwordRef.current?.value ?? ''
    if (!username || !password) {
      setError('Введіть логін та пароль')
      return
    }
    setError('')
    setPending(true)
    const result = await login(username, password)
    setPending(false)
    if (result.error) {
      setError(result.error)
    } else {
      if (usernameRef.current) usernameRef.current.value = ''
      if (passwordRef.current) passwordRef.current.value = ''
    }
  }

  if (authUsername) {
    return (
      <div className="glass-subtle rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-semibold text-slate-300">Синхронізація</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="success">{authUsername}</Badge>
          <span className="text-xs text-slate-400">{SYNC_STATE_LABEL[syncState]}</span>
        </div>
        <Button onClick={logout} variant="ghost" className="inline-flex items-center gap-2">
          Вийти
        </Button>
      </div>
    )
  }

  return (
    <div className="glass-subtle rounded-xl p-6 space-y-3">
      <h2 className="text-sm font-semibold text-slate-300">Синхронізація</h2>
      <p className="text-xs text-slate-400">
        Увійдіть, щоб автоматично синхронізувати прогрес між пристроями.
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          ref={usernameRef}
          type="text"
          autoComplete="username"
          defaultValue=""
          placeholder="Логін"
          className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-slate-900/50 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
        <input
          ref={passwordRef}
          type="password"
          autoComplete="current-password"
          defaultValue=""
          placeholder="Пароль"
          className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-slate-900/50 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleLogin} disabled={pending} variant="default">
          Увійти / Зареєструватися
        </Button>
      </div>
    </div>
  )
}

export function ProfilePanel() {
  const { data, setUsername, exportJson, importJson, resetData } = useUserStore()
  const fileRef = useRef<HTMLInputElement>(null)

  const solvedCount = Object.values(data.progress).filter((s) => s === 'solved').length
  const attemptedCount = Object.values(data.progress).filter(
    (s) => s === 'attempted',
  ).length

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      await importJson(file)
    } catch {
      alert('Не вдалося прочитати JSON-файл. Перевірте формат.')
    } finally {
      e.target.value = ''
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Профіль</h1>
        <p className="text-sm text-slate-400">
          Прогрес зберігається у цьому браузері. Експортуй JSON, щоб зробити бекап
          або перенести на інший пристрій.
        </p>
      </div>

      <SyncPanel />

      {/* Username */}
      <div className="glass-subtle rounded-xl p-6 space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-slate-300">
          Ім&apos;я користувача
        </label>
        <input
          id="username"
          type="text"
          value={data.username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введіть своє ім'я"
          className="w-full px-3 py-2 rounded-lg bg-slate-900/50 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </div>

      {/* Stats */}
      <div className="glass-subtle rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Solved</p>
            <p className="text-2xl font-bold text-emerald-400">{solvedCount}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Attempted</p>
            <p className="text-2xl font-bold text-yellow-300">{attemptedCount}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Submissions</p>
            <p className="text-2xl font-bold text-slate-100">{data.submissions.length}</p>
          </div>
        </div>
      </div>

      {/* Export / Import / Reset */}
      <div className="glass-subtle rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-semibold text-slate-300">Дані (JSON)</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={exportJson}
            variant="default"
            className="inline-flex items-center gap-2"
          >
            <Download size={16} /> Export JSON
          </Button>
          <Button
            onClick={() => fileRef.current?.click()}
            variant="secondary"
            className="inline-flex items-center gap-2"
          >
            <Upload size={16} /> Import JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            className="hidden"
          />
          <Button
            onClick={() => {
              if (confirm('Очистити весь локальний прогрес?')) resetData()
            }}
            variant="ghost"
            className="inline-flex items-center gap-2 text-red-300"
          >
            <RotateCcw size={16} /> Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
