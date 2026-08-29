import { angularContent } from '@/lib/cheatsheet/angular'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('angular')!

export const metadata = topicMetadata('angular', 'extended')

export default function Page() {
  return <ProseTopicView content={angularContent} meta={meta} />
}
