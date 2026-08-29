import { algorithmsContent } from '@/lib/cheatsheet/algorithms'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('algorithms')!

export const metadata = topicMetadata('algorithms', 'extended')

export default function Page() {
  return <ProseTopicView content={algorithmsContent} meta={meta} />
}
