import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QUICKREF_TOPICS, QUICKREF_BLOCKS } from '@/lib/cheatsheet/quickref'
import { getTopic } from '@/lib/cheatsheet/registry'
import type { TopicSlug } from '@/lib/cheatsheet/types'
import { QuickRefTopicView } from '@/components/cheatsheet/QuickRefTopicView'

export function generateStaticParams() {
  return QUICKREF_TOPICS.map((topic) => ({ topic }))
}

function resolve(topic: string) {
  if (!QUICKREF_TOPICS.includes(topic as TopicSlug)) return null
  const meta = getTopic(topic as TopicSlug)
  const blocks = QUICKREF_BLOCKS[topic as TopicSlug]
  if (!meta || !blocks) return null
  return { meta, blocks }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>
}): Promise<Metadata> {
  const resolved = resolve((await params).topic)
  if (!resolved) return {}
  return {
    title: `${resolved.meta.title} — Шпаргалка`,
    description: resolved.meta.blurb,
  }
}

export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const resolved = resolve((await params).topic)
  if (!resolved) notFound()
  return <QuickRefTopicView meta={resolved.meta} blocks={resolved.blocks} />
}
