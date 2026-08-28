import type { Metadata } from 'next'
import Link from 'next/link'
import { Dumbbell } from 'lucide-react'
import { practiceTasks } from '@/lib/cheatsheet/practiceTasks'
import { PracticeTasksView } from '@/components/cheatsheet/PracticeTasksView'

export const metadata: Metadata = {
  title: 'Практичні завдання — інтерв’ю',
  description:
    'Інтерв’ю-стайл задачі рівня Middle/Senior: JS-утиліти, масиви та рядки, async/Promises, React-компоненти, кастомні хуки, дебаг React, DOM і frontend system design. Виправ або допиши код і звір із рішенням.',
}

export default function PracticeTasksPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-orange-400">
            🧩 Практичні завдання
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Задачі рівня Middle/Senior зі співбесід за секціями чеклісту: JS-утиліти,
            масиви й рядки, async, React-компоненти та хуки, дебаг, DOM, system design.
            Виправ або допиши код, потім звір із рішенням.
          </p>
        </div>
        <Link
          href="/problems"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Dumbbell size={16} /> LeetCode
        </Link>
      </header>

      <PracticeTasksView tasks={practiceTasks} />
    </div>
  )
}
