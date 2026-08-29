import { nextjsQuiz } from '@/lib/cheatsheet/nextjs-quiz'
import { topicMetadata } from '@/lib/seo'
import { Quiz } from '@/components/cheatsheet/Quiz'

export const metadata = topicMetadata('nextjs', 'quiz')

export default function Page() {
  return <Quiz data={nextjsQuiz} quizId="nextjs" />
}
