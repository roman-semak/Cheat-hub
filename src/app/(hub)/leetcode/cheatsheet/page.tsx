import Link from 'next/link'
import { Dumbbell } from 'lucide-react'
import { lifehacks, LIFEHACK_CATEGORIES } from '@/lib/cheatsheet/lifehacks'
import { pageMetadata } from '@/lib/seo'
import { LifehacksView } from '@/components/cheatsheet/LifehacksView'

export const metadata = pageMetadata({
  title: 'LeetCode — Шпаргалка',
  description: 'JS/TS лайфхаки та трюки роботи з методами мови для розв’язання задач.',
  path: '/leetcode/cheatsheet',
})

export default function LeetcodeCheatsheetPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-orange-400">🧩 LeetCode — Шпаргалка</h1>
          <p className="mt-1 text-sm text-slate-400">
            JS/TS лайфхаки та трюки роботи з методами мови.
          </p>
        </div>
        <Link
          href="/problems"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Dumbbell size={16} /> Практика
        </Link>
      </header>

      <LifehacksView hacks={lifehacks} categories={LIFEHACK_CATEGORIES} />
    </div>
  )
}
