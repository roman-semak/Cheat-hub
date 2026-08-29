import { fullstackContent } from '@/lib/cheatsheet/fullstack'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('fullstack')!

export const metadata = topicMetadata('fullstack', 'extended')

export default function Page() {
  return <ProseTopicView content={fullstackContent} meta={meta} />
}
