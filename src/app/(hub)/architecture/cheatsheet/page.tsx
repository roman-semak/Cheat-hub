import { architectureCheat } from '@/lib/cheatsheet/architecture'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('architecture')!

export const metadata = topicMetadata('architecture', 'cheatsheet')

export default function Page() {
  return <ProseTopicView content={architectureCheat} meta={meta} variant="cheat" />
}
