import { gitCheat } from '@/lib/cheatsheet/git'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('git')!

export const metadata = topicMetadata('git', 'cheatsheet')

export default function Page() {
  return <ProseTopicView content={gitCheat} meta={meta} variant="cheat" />
}
