import { javascriptContent } from '@/lib/cheatsheet/javascript'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('javascript')!

export const metadata = topicMetadata('javascript', 'extended')

export default function Page() {
  return <ProseTopicView content={javascriptContent} meta={meta} />
}
