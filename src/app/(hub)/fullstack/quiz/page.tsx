import { fullstackQuiz } from '@/lib/cheatsheet/fullstack-quiz'
import { topicMetadata } from '@/lib/seo'
import { Quiz } from '@/components/cheatsheet/Quiz'

export const metadata = topicMetadata('fullstack', 'quiz')

export default function Page() {
  return <Quiz data={fullstackQuiz} quizId="fullstack" />
}
