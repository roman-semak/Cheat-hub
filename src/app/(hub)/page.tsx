import { TOPICS } from '@/lib/cheatsheet/registry'
import { pageMetadata } from '@/lib/seo'
import { TopicHubCard } from '@/components/cheatsheet/TopicHubCard'

export const metadata = pageMetadata({
  title: { absolute: 'Cheat Hub — шпаргалки та теорія для співбесід' },
  description:
    'Шпаргалки та теорія для співбесід: Architecture, React, Angular, JS/TS, Git, AI та LeetCode з практикою в редакторі.',
  path: '/',
})

export default function HubHome() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
          Cheat Hub
        </h1>
        <p className="mt-2 max-w-2xl text-slate-400">
          Теорія та шпаргалки для підготовки до співбесід. Обери тему, а у розділі{' '}
          <span className="text-orange-400">LeetCode</span> — переходь від теорії до практики в
          редакторі коду.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic) => (
          <TopicHubCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  )
}
