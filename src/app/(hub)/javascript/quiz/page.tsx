import { javascriptQuiz } from '@/lib/cheatsheet/javascript-quiz'
import { topicMetadata } from '@/lib/seo'
import { Quiz } from '@/components/cheatsheet/Quiz'

export const metadata = topicMetadata('javascript', 'quiz')

export default function Page() {
  return <Quiz data={javascriptQuiz} quizId="javascript" />
}
