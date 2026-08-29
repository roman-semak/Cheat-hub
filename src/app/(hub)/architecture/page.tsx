import { architectureContent } from '@/lib/cheatsheet/architecture'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('architecture')!

export const metadata = topicMetadata('architecture', 'extended')

export default function Page() {
  return <ProseTopicView content={architectureContent} meta={meta} />
}
