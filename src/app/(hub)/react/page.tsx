import { reactContent } from '@/lib/cheatsheet/react'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('react')!

export const metadata = topicMetadata('react', 'extended')

export default function Page() {
  return <ProseTopicView content={reactContent} meta={meta} />
}
