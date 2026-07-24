'use client'

import { useEffect, useRef, useState } from 'react'
import { Download, Upload, RotateCcw, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useUserStore } from '@/lib/userStore'

const SYNC_STATUS_TEXT: Record<string, string> = {
  idle: 'Готово до синхронізації',
  syncing: 'Синхронізація…',
  synced: 'Синхронізовано',
  disabled: 'Вимкнено — введи пароль і збережи (сервер має бути налаштований)',
  error: 'Помилка — перевір пароль або налаштування сервера',
}

export function ProfilePanel() {
  const {
    data,
    setUsername,
    exportJson,
    importJson,
    resetData,
    syncState,
    lastSyncedAt,
    getSyncKey,
    setSyncKey,
    syncNow,
  } = useUserStore()
  const fileRef = useRef<HTMLInputElement>(null)

  // Passphrase input — initialised from localStorage after mount to avoid a
  // hydration mismatch, which legitimately requires setState in an effect (the
  // cascading-render lint rule flags this as a false positive).
  const [keyInput, setKeyInput] = useState('')
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeyInput(getSyncKey())
  }, [getSyncKey])

  const handleSync = () => {
    setSyncKey(keyInput)
    void syncNow()
  }

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

      {/* Sync across devices / environments */}
      <div className="glass-subtle rounded-xl p-6 space-y-3">
        <h2 className="text-sm font-semibold text-slate-300">Синхронізація</h2>
        <p className="text-xs text-slate-400">
          Введи спільний пароль, щоб об&apos;єднати прогрес між localhost і
          задеплоєною версією. Пароль зберігається лише в цьому браузері й має
          збігатися з <code className="text-slate-300">SYNC_SECRET</code> на сервері.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Пароль синхронізації"
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-slate-900/50 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <Button
            onClick={handleSync}
            variant="default"
            disabled={!keyInput.trim() || syncState === 'syncing'}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw
              size={16}
              className={syncState === 'syncing' ? 'animate-spin' : undefined}
            />
            Sync now
          </Button>
        </div>
        <p className="text-xs text-slate-500">
          {SYNC_STATUS_TEXT[syncState] ?? SYNC_STATUS_TEXT.idle}
          {syncState === 'synced' && lastSyncedAt
            ? ` · ${new Date(lastSyncedAt).toLocaleTimeString()}`
            : ''}
        </p>
      </div>
    </div>
  )
}
