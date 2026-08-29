import { reactNativeContent } from '@/lib/cheatsheet/react-native'
import { getTopic } from '@/lib/cheatsheet/registry'
import { topicMetadata } from '@/lib/seo'
import { ProseTopicView } from '@/components/cheatsheet/ProseTopicView'

const meta = getTopic('react-native')!

export const metadata = topicMetadata('react-native', 'extended')

export default function Page() {
  return <ProseTopicView content={reactNativeContent} meta={meta} />
}
