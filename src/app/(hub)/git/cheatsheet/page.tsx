import type { Metadata } from 'next'
import { gitCheat } from '@/lib/cheatsheet/git'
import { getTopic } from '@/lib/cheatsheet/registry'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('git')!

export const metadata: Metadata = {
  title: `${meta.title} — Шпаргалка`,
  description: meta.blurb,
}

export default function Page() {
  return <ProseTopicView content={gitCheat} meta={meta} variant="cheat" />
}
