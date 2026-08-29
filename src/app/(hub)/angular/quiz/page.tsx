import { angularQuiz } from '@/lib/cheatsheet/angular-quiz'
import { topicMetadata } from '@/lib/seo'
import { Quiz } from '@/components/cheatsheet/Quiz'

export const metadata = topicMetadata('angular', 'quiz')

export default function Page() {
  return <Quiz data={angularQuiz} quizId="angular" />
}
