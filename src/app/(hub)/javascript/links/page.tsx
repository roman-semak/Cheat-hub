import type { Metadata } from 'next'
import { javascriptLinks } from '@/lib/cheatsheet/javascript'
import { getTopic } from '@/lib/cheatsheet/registry'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('javascript')!

export const metadata: Metadata = {
  title: `${meta.title} — Посилання`,
  description: meta.blurb,
}

export default function Page() {
  return <ProseTopicView content={javascriptLinks} meta={meta} />
}
