import type { Metadata } from 'next'
import { architectureCheat } from '@/lib/cheatsheet/architecture'
import { getTopic } from '@/lib/cheatsheet/registry'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('architecture')!

export const metadata: Metadata = {
  title: `${meta.title} — Шпаргалка`,
  description: meta.blurb,
}

export default function Page() {
  return <ProseTopicView content={architectureCheat} meta={meta} variant="cheat" />
}
