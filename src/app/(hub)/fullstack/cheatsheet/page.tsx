import type { Metadata } from 'next'
import { fullstackCheat } from '@/lib/cheatsheet/fullstack-cheat'
import { getTopic } from '@/lib/cheatsheet/registry'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('fullstack')!

export const metadata: Metadata = {
  title: `${meta.title} — Шпаргалка`,
  description: meta.blurb,
}

export default function Page() {
  return <ProseTopicView content={fullstackCheat} meta={meta} variant="cheat" />
}
