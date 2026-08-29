import type { Metadata } from 'next'
import { nextjsCheat } from '@/lib/cheatsheet/nextjs'
import { getTopic } from '@/lib/cheatsheet/registry'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('nextjs')!

export const metadata: Metadata = {
  title: `${meta.title} — Шпаргалка`,
  description: meta.blurb,
}

export default function Page() {
  return <ProseTopicView content={nextjsCheat} meta={meta} variant="cheat" />
}
