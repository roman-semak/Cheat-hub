import { aiContent } from '@/lib/cheatsheet/ai'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('ai')!

export const metadata = topicMetadata('ai', 'extended')

export default function Page() {
  return <ProseTopicView content={aiContent} meta={meta} />
}
