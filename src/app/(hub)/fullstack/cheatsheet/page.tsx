import { fullstackCheat } from '@/lib/cheatsheet/fullstack-cheat'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('fullstack')!

export const metadata = topicMetadata('fullstack', 'cheatsheet')

export default function Page() {
  return <ProseTopicView content={fullstackCheat} meta={meta} variant="cheat" />
}
