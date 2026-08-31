const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '../..')
const SRC = path.join(ROOT, 'CheetSheet')

function extractQuestions(file) {
  const html = fs.readFileSync(file, 'utf8')
  const start = html.indexOf('const questions = [')
  if (start < 0) throw new Error('no questions in ' + file)
  // find matching closing "];" after start
  const from = html.indexOf('[', start)
  let depth = 0
  let i = from
  for (; i < html.length; i++) {
    if (html[i] === '[') depth++
    else if (html[i] === ']') {
      depth--
      if (depth === 0) break
    }
  }
  const arraySrc = html.slice(from, i + 1)
  // eval in a function scope
  const questions = new Function(`return ${arraySrc}`)()
  return questions
}

function buildTopic(slug, title) {
  const questions = extractQuestions(path.join(SRC, slug, 'quiz.html'))
  const normalized = questions.map((q, idx) => ({
    id: `q${idx + 1}`,
    question: q.q ?? q.question,
    options: q.options,
    correct: q.correct,
    explanation: q.explanation ?? '',
  }))
  const data = { title, questions: normalized }
  const out =
    `// AUTO-GENERATED from CheetSheet/${slug}/quiz.html. Re-running overwrites.\n` +
    `import type { QuizData } from './types'\n\n` +
    `export const ${slug}Quiz: QuizData = ` +
    JSON.stringify(data, null, 2) +
    '\n'
  fs.writeFileSync(path.join(ROOT, `src/lib/cheatsheet/${slug}-quiz.ts`), out)
  console.log(`${slug}: ${normalized.length} questions`)
}

buildTopic('angular', 'Angular Quiz')
buildTopic('javascript', 'JS / TS Quiz')
