import type { Metadata } from 'next'
import { reactNativeContent } from '@/lib/cheatsheet/react-native'
import { getTopic } from '@/lib/cheatsheet/registry'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('react-native')!

export const metadata: Metadata = {
  title: `${meta.title} — Теорія`,
  description: meta.blurb,
}

export default function Page() {
  return <ProseTopicView content={reactNativeContent} meta={meta} />
}
