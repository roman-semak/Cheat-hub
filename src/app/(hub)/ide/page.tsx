import { ideContent } from '@/lib/cheatsheet/ide'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('ide')!

export const metadata = topicMetadata('ide', 'extended')

export default function Page() {
  return <ProseTopicView content={ideContent} meta={meta} />
}
