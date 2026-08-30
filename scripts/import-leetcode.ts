import LeetCode, { Credential } from 'leetcode-query'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CLIArgs {
  easy: number
  medium: number
  hard: number
  dryRun: boolean
}

interface Problem {
  acRate: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questionFrontendId: string
  isPaidOnly: boolean
  title: string
  titleSlug: string
  topicTags: Array<{ name: string }>
}

interface DetailedProblem {
  questionId: string
  questionFrontendId: string
  title: string
  titleSlug: string
  difficulty: string
  content?: string
  topicTags?: Array<{ name: string }>
  companyTagStats?: Array<{ taggedByCompany: string }>
  codeSnippets?: Array<{ langSlug: string; code: string }>
  solution?: { content: string }
}

const RATE_LIMIT_MS = 300

function parseArgs(): CLIArgs {
  const args = {
    easy: 150,
    medium: 200,
    hard: 100,
    dryRun: false,
  }

  process.argv.forEach((arg) => {
    if (arg.startsWith('--easy=')) args.easy = parseInt(arg.split('=')[1])
    if (arg.startsWith('--medium=')) args.medium = parseInt(arg.split('=')[1])
    if (arg.startsWith('--hard=')) args.hard = parseInt(arg.split('=')[1])
    if (arg === '--dry-run') args.dryRun = true
  })

  return args
}

function extractFunctionName(code: string): string {
  const match = code.match(/(?:var|const|function)\s+(\w+)\s*[=\s(]/)
  return match?.[1] || 'solution'
}

function convertHtmlToMarkdown(html: string): string {
  if (!html) return ''

  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')

  text = text.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
  text = text.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
  text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
  text = text.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n')
  text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
  text = text.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
  text = text.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
  text = text.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
  text = text.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
  text = text.replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```')
  text = text.replace(/<br\s*\/?>/gi, '\n')
  text = text.replace(/<\/p>/gi, '\n')
  text = text.replace(/<p[^>]*>/gi, '')
  text = text.replace(/<[^>]+>/g, '')

  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')

  text = text.replace(/\n\n\n+/g, '\n\n')
  text = text.trim()

  return text
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function importProblems() {
  const args = parseArgs()

  try {
    console.log('🚀 Starting Smart LeetCode import...')
    console.log(`📊 Target: Easy=${args.easy}, Medium=${args.medium}, Hard=${args.hard}`)
    console.log(`${args.dryRun ? '🔍 DRY RUN MODE (no database changes)' : ''}\n`)

    // Initialize LeetCode API
    const credential = new Credential()
    await credential.init(process.env.LEETCODE_SESSION!)
    const lc = new LeetCode(credential)

    console.log('✓ Authenticated with LeetCode\n')

    // PASS 1: Fetch all problems metadata (fast, no detail call)
    console.log('📥 PASS 1: Fetching all problems metadata...')
    const allProblems = new Map<string, Problem>()

    let offset = 0
    let totalFetched = 0

    while (true) {
      const batchSize = 50
      const response = (await lc.problems({ limit: batchSize, offset })) as any

      if (!response?.questions?.length) {
        console.log('✓ All problems fetched\n')
        break
      }

      for (const problem of response.questions) {
        // Filter: no premium, must have difficulty
        if (problem.isPaidOnly || !problem.difficulty) continue

        allProblems.set(problem.titleSlug, {
          acRate: problem.acRate,
          difficulty: problem.difficulty,
          questionFrontendId: problem.questionFrontendId,
          isPaidOnly: problem.isPaidOnly,
          title: problem.title,
          titleSlug: problem.titleSlug,
          topicTags: problem.topicTags || [],
        })
        totalFetched++
      }

      offset += batchSize

      if (totalFetched % 100 === 0) {
        process.stdout.write(`  Fetched ${totalFetched} problems...\r`)
      }
    }

    console.log(`\n✓ Total non-premium problems: ${totalFetched}\n`)

    // PASS 2: Select top problems by acRate for each difficulty
    console.log('📊 PASS 2: Selecting top problems by acRate...')

    const easyProblems = Array.from(allProblems.values())
      .filter((p) => p.difficulty === 'Easy' && p.acRate > 50)
      .sort((a, b) => b.acRate - a.acRate)
      .slice(0, args.easy)

    const mediumProblems = Array.from(allProblems.values())
      .filter((p) => p.difficulty === 'Medium' && p.acRate > 50)
      .sort((a, b) => b.acRate - a.acRate)
      .slice(0, args.medium)

    const hardProblems = Array.from(allProblems.values())
      .filter((p) => p.difficulty === 'Hard')
      .sort((a, b) => b.acRate - a.acRate)
      .slice(0, args.hard)

    const selectedProblems = [...easyProblems, ...mediumProblems, ...hardProblems]

    console.log(`📊 Easy: ${easyProblems.length} (acRate > 50%)`)
    console.log(`📊 Medium: ${mediumProblems.length} (acRate > 50%)`)
    console.log(`📊 Hard: ${hardProblems.length} (top by acRate)`)
    console.log(`📊 Total selected: ${selectedProblems.length}\n`)

    if (args.dryRun) {
      console.log('🔍 DRY RUN: Would import these problems:')
      console.log('='.repeat(60))
      selectedProblems.forEach((p, i) => {
        console.log(`${i + 1}. [${p.difficulty[0]}] ${p.title} (acRate: ${p.acRate.toFixed(1)}%)`)
      })
      console.log('='.repeat(60))
      console.log(`\n✅ Dry run complete. Use without --dry-run to import.\n`)
      return
    }

    // PASS 3: Fetch detailed info for selected problems
    console.log('📥 PASS 3: Fetching detailed info for selected problems...\n')

    let imported = 0
    let errors = 0

    for (const problem of selectedProblems) {
      process.stdout.write(`[${imported + errors + 1}/${selectedProblems.length}] ${problem.title}... `)

      try {
        await sleep(RATE_LIMIT_MS)

        const detailed = (await lc.problem(problem.titleSlug)) as DetailedProblem

        // Extract JS starter code
        const jsCodeSnippet = (detailed.codeSnippets || []).find(
          (c: any) => c.langSlug === 'javascript',
        )
        const jsCode = jsCodeSnippet?.code || ''

        if (!jsCode) {
          console.log('⚠️  no JS code')
          errors++
          continue
        }

        // Extract data
        const difficulty = detailed.difficulty || 'Easy'
        const description = convertHtmlToMarkdown(detailed.content || '')
        const tags = JSON.stringify(
          (detailed.topicTags || []).map((t: { name: string }) => t.name),
        )
        const companies = JSON.stringify(
          (detailed.companyTagStats || []).map((c: { taggedByCompany: string }) => c.taggedByCompany),
        )
        const editorial = detailed.solution?.content || null

        // Save to database
        await prisma.problem.upsert({
          where: { slug: problem.titleSlug },
          create: {
            slug: problem.titleSlug,
            title: problem.title,
            frontendId: problem.questionFrontendId,
            difficulty,
            acRate: problem.acRate,
            description,
            tags,
            companies,
            starterCode: jsCode,
            // Test cases are generated separately by scripts/generate-testcases.ts
            // (LeetCode's API does not return expected outputs).
            testCases: '[]',
            solution: null,
            editorial,
          },
          update: {
            title: problem.title,
            frontendId: problem.questionFrontendId,
            difficulty,
            acRate: problem.acRate,
            description,
            tags,
            companies,
            starterCode: jsCode,
            // testCases intentionally left untouched on update — owned by the sidecar.
            editorial,
          },
        })

        console.log('✓')
        imported++
      } catch (error) {
        console.log('✗')
        errors++
      }
    }

    console.log(`\n✅ Import complete!`)
    console.log(`📊 Statistics:`)
    console.log(`   Imported: ${imported}`)
    console.log(`   Errors: ${errors}`)
    console.log(`   Success rate: ${((imported / selectedProblems.length) * 100).toFixed(1)}%\n`)

    // Verify database state
    const easyCount = await prisma.problem.count({
      where: { difficulty: 'Easy' },
    })
    const mediumCount = await prisma.problem.count({
      where: { difficulty: 'Medium' },
    })
    const hardCount = await prisma.problem.count({
      where: { difficulty: 'Hard' },
    })
    const totalCount = await prisma.problem.count()

    console.log(`📦 Database state:`)
    console.log(`   Easy: ${easyCount}`)
    console.log(`   Medium: ${mediumCount}`)
    console.log(`   Hard: ${hardCount}`)
    console.log(`   Total: ${totalCount}\n`)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

importProblems()
