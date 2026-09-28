import vm from 'vm'

type ConsoleLevel = 'log' | 'error' | 'warn' | 'info'

// Bounds for captured console output: enough for real debugging, small enough
// that `while (true) console.log(x)` can't take the page down.
const MAX_LOG_LINES = 100
const MAX_LOG_CHARS = 2000

function formatLogArg(value: unknown): string {
  if (typeof value === 'string') return value
  if (value instanceof Error) return value.message
  let text: string
  try {
    text = JSON.stringify(value) ?? String(value)
  } catch {
    text = String(value) // circular structures, BigInt, …
  }
  return text.length > MAX_LOG_CHARS ? `${text.slice(0, MAX_LOG_CHARS)}…` : text
}
import { transform } from 'sucrase'
import {
  SANDBOX_PRELUDE,
  buildAdapter,
  type CompactSignature,
} from './leetcode-shapes'

type Language = 'javascript' | 'typescript'

interface TestCase {
  input: string
  expected: string
}

interface RunResult {
  passed: boolean
  input: string
  expected: string
  actual?: string
  error?: string
  /** console.* output captured for this test case (see executeInVm). */
  logs?: string[]
}

const TIMEOUT_MS = 5000

/**
 * A `testCases` array counts as "no real tests" when it is empty or contains
 * only the legacy `{input:'placeholder'}` stub written by scripts/import-leetcode.ts
 * for problems whose expected outputs were never generated.
 */
export function hasRealTestCases(testCases: TestCase[]): boolean {
  if (!Array.isArray(testCases) || testCases.length === 0) return false
  return !testCases.every((tc) => tc?.input === 'placeholder')
}

interface ExecuteResult {
  result?: string
  error?: string
  /** Anything the solution passed to console.* during this run. */
  logs?: string[]
}

/**
 * Runs `fnName(...args)` inside a Node `vm` sandbox. `argsJson` must be a JSON
 * array of the positional arguments. Returns the JSON-stringified return value
 * (`result`) or a one-line `error`, plus whatever the solution logged.
 */
export function executeInVm(
  code: string,
  fnName: string,
  argsJson: string,
  timeoutMs = TIMEOUT_MS,
): ExecuteResult {
  const wrapper = `
${code}

(function () {
  const args = ${argsJson};
  if (typeof ${fnName} !== 'function') {
    __error = 'Function ${fnName} not found';
    return;
  }
  try {
    __result = JSON.stringify(${fnName}(...args));
  } catch (e) {
    __error = e instanceof Error ? e.message : String(e);
  }
})();
`

  // Console output used to be swallowed, which made debugging inside the editor
  // impossible. Capture it instead, bounded on both axes so a runaway loop
  // can't blow up the response or the browser.
  const logs: string[] = []
  const record = (level: ConsoleLevel) => (...args: unknown[]) => {
    if (logs.length >= MAX_LOG_LINES) return
    if (logs.length === MAX_LOG_LINES - 1) {
      logs.push(`… вивід обрізано на ${MAX_LOG_LINES} рядках`)
      return
    }
    const text = args.map(formatLogArg).join(' ')
    logs.push(level === 'log' ? text : `[${level}] ${text}`)
  }

  const sandbox: Record<string, unknown> = {
    __result: undefined,
    __error: undefined,
    console: {
      log: record('log'),
      error: record('error'),
      warn: record('warn'),
      info: record('info'),
    },
  }

  try {
    const script = new vm.Script(wrapper)
    const context = vm.createContext(sandbox)
    script.runInContext(context, { timeout: timeoutMs })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    // Logs are returned even on a crash — the last line before a throw is
    // usually the most useful thing on screen.
    return { error: msg.split('\n')[0], logs }
  }

  if (sandbox.__error !== undefined) {
    return { error: String(sandbox.__error), logs }
  }

  return {
    result: sandbox.__result === undefined ? undefined : String(sandbox.__result),
    logs,
  }
}

/**
 * Extract the entry function name from `var`/`const`/`function name`
 * declarations. Names starting with `_` are skipped: the TypeScript transform
 * (sucrase) prepends helpers like `_nullishCoalesce` / `_optionalChain` when the
 * code uses `??` / `?.`, and those must not be mistaken for the solution.
 */
export function extractFunctionName(code: string): string {
  const re = /(?:var|const|function)\s+(\w+)\s*[=\s(]/g
  for (const match of code.matchAll(re)) {
    if (!match[1].startsWith('_')) return match[1]
  }
  return 'solution'
}

function parseSignature(
  signature: CompactSignature | string | undefined,
): CompactSignature | null {
  if (!signature) return null
  try {
    const sig = typeof signature === 'string' ? JSON.parse(signature) : signature
    if (sig && Array.isArray(sig.paramTypes) && typeof sig.returnType === 'string') {
      return sig as CompactSignature
    }
  } catch {
    /* fall through */
  }
  return null
}

export async function runCode(
  code: string,
  language: Language,
  testCases: TestCase[],
  signature?: CompactSignature | string,
): Promise<RunResult[]> {
  if (!hasRealTestCases(testCases)) {
    return (testCases.length ? testCases : [{ input: '', expected: '' }]).map(
      (tc) => ({
        passed: false,
        input: tc.input,
        expected: tc.expected,
        error: 'No test cases available for this problem yet',
      }),
    )
  }

  // TypeScript is transpiled to plain JS once; the result runs in a Node `vm`
  // context per test case. This avoids spawning child processes (which do not
  // work on Vercel serverless).
  let jsCode = code
  if (language === 'typescript') {
    try {
      jsCode = transform(code, { transforms: ['typescript'] }).code
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      return testCases.map((tc) => ({
        passed: false,
        input: tc.input,
        expected: tc.expected,
        error: `Compilation error: ${msg.split('\n')[0]}`,
      }))
    }
  }

  const sig = parseSignature(signature)
  // The LeetCode signature name is authoritative when we have it; otherwise fall
  // back to scanning the code (skipping sucrase helper declarations).
  const fnName = sig?.name || extractFunctionName(jsCode)

  // With a signature we run through the LeetCode-shape adapter: array inputs are
  // turned into ListNode/TreeNode where needed, `void` problems are judged by
  // the mutated first argument, and node returns are re-serialised to arrays —
  // matching how scripts/generate-testcases.ts produced `expected`.
  const runnableCode = sig
    ? `${SANDBOX_PRELUDE}\n${jsCode}\n${buildAdapter(fnName, sig)}`
    : jsCode
  const entry = sig ? '__run' : fnName

  return testCases.map((testCase) =>
    runSingle(runnableCode, entry, Boolean(sig), testCase),
  )
}

function runSingle(
  code: string,
  entry: string,
  wrapArgs: boolean,
  testCase: TestCase,
): RunResult {
  const fail = (error: string, logs?: string[]): RunResult => ({
    passed: false,
    input: testCase.input,
    expected: testCase.expected,
    error,
    logs,
  })

  let parsed: unknown
  try {
    parsed = JSON.parse(testCase.input)
  } catch {
    return fail('Invalid JSON input')
  }
  if (!Array.isArray(parsed)) {
    return fail('Test input must be a JSON array of arguments')
  }

  // `__run` takes the whole positional-args array as one parameter; a bare
  // function is spread-called. executeInVm always spreads, so wrap once.
  const argsJson = JSON.stringify(wrapArgs ? [parsed] : parsed)
  const { result, error, logs } = executeInVm(code, entry, argsJson)

  if (error !== undefined) return fail(error, logs)

  const actual = String(result ?? '').trim()
  const expected = testCase.expected.trim()

  return {
    passed: actual === expected,
    input: testCase.input,
    expected,
    actual,
    logs,
  }
}
