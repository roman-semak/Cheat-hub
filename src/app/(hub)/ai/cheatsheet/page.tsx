import type { Metadata } from 'next'
import { aiCheat } from '@/lib/cheatsheet/ai'
import { getTopic } from '@/lib/cheatsheet/registry'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('ai')!

export const metadata: Metadata = {
  title: `${meta.title} — Шпаргалка`,
  description: meta.blurb,
}

export default function Page() {
  return <ProseTopicView content={aiCheat} meta={meta} variant="cheat" />
}
