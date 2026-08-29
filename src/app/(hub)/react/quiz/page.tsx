import { reactQuiz } from '@/lib/cheatsheet/react-quiz'
import { topicMetadata } from '@/lib/seo'
import { Quiz } from '@/components/cheatsheet/Quiz'

export const metadata = topicMetadata('react', 'quiz')

export default function Page() {
  return <Quiz data={reactQuiz} quizId="react" />
}
