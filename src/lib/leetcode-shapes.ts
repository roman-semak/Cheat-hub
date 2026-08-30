// Shared between the app runner (src/lib/runner.ts) and the test-case generator
// (scripts/generate-testcases.ts). Lets a solution written against LeetCode's
// signature run in the vm sandbox: ListNode/TreeNode (de)serialisation, and the
// `__run` adapter that also handles in-place (`void`) problems.

export interface CompactSignature {
  /** LeetCode entry function name (matches the starter code). */
  name: string
  /** LeetCode metaData param types, e.g. ["integer[]", "ListNode"]. */
  paramTypes: string[]
  /** LeetCode metaData return type, e.g. "integer[]" | "void" | "ListNode". */
  returnType: string
}

const NODE_TYPES = new Set(['ListNode', 'TreeNode', 'Node'])
const baseType = (t: string) => t.replace(/\[\]/g, '')

export function signatureUsesNodeShapes(sig: CompactSignature): boolean {
  return (
    NODE_TYPES.has(baseType(sig.returnType)) ||
    sig.paramTypes.some((t) => NODE_TYPES.has(baseType(t)))
  )
}

/**
 * `exampleTestcases` is newline-joined, one JSON value per parameter, cases
 * concatenated. Split into `[argsJsonForCase1, ...]` where each entry is a JSON
 * string of the positional-argument array.
 */
export function parseExampleTestcases(raw: string, paramCount: number): string[] {
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
  if (paramCount <= 0 || lines.length === 0 || lines.length % paramCount !== 0) {
    throw new Error(
      `cannot chunk ${lines.length} testcase lines into groups of ${paramCount}`,
    )
  }
  const cases: string[] = []
  for (let i = 0; i < lines.length; i += paramCount) {
    const args = lines.slice(i, i + paramCount).map((line) => JSON.parse(line))
    cases.push(JSON.stringify(args))
  }
  return cases
}

/** Sandbox prelude: node constructors, (de)serialisers, `__convertIn/Out`. */
export const SANDBOX_PRELUDE = `
function ListNode(val, next) { this.val = (val === undefined ? 0 : val); this.next = (next === undefined ? null : next); }
function TreeNode(val, left, right) { this.val = (val === undefined ? 0 : val); this.left = (left === undefined ? null : left); this.right = (right === undefined ? null : right); }

function __arrToList(arr) {
  if (arr == null) return null;
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
  return head;
}
function __listToArr(node) {
  const out = [];
  let seen = 0;
  while (node && seen++ < 100000) { out.push(node.val); node = node.next; }
  return out;
}
function __arrToTree(arr) {
  if (!arr || arr.length === 0 || arr[0] == null) return null;
  const root = new TreeNode(arr[0]);
  const q = [root];
  let i = 1;
  while (q.length && i < arr.length) {
    const cur = q.shift();
    if (i < arr.length) { const v = arr[i++]; if (v != null) { cur.left = new TreeNode(v); q.push(cur.left); } }
    if (i < arr.length) { const v = arr[i++]; if (v != null) { cur.right = new TreeNode(v); q.push(cur.right); } }
  }
  return root;
}
function __treeToArr(root) {
  if (!root) return [];
  const out = [];
  const q = [root];
  while (q.length) {
    const cur = q.shift();
    if (cur == null) { out.push(null); continue; }
    out.push(cur.val);
    q.push(cur.left); q.push(cur.right);
  }
  while (out.length && out[out.length - 1] == null) out.pop();
  return out;
}

function __baseType(t) { return t.replace(/\\[\\]/g, ''); }
function __convertIn(value, type) {
  const base = __baseType(type);
  if (base === 'ListNode') return __arrToList(value);
  if (base === 'TreeNode') return __arrToTree(value);
  return value;
}
function __convertOut(value, type) {
  const base = __baseType(type);
  if (base === 'ListNode') return __listToArr(value);
  if (base === 'TreeNode') return __treeToArr(value);
  return value;
}
`

/**
 * Adapter appended after the solution code. `executeInVm(code, '__run', "[[...args]]")`
 * then converts inputs, calls the solution, and returns a plain JSON-able value
 * (for `void` returns, the mutated first argument).
 */
export function buildAdapter(fnName: string, sig: CompactSignature): string {
  return `
const __paramTypes = ${JSON.stringify(sig.paramTypes)};
const __returnType = ${JSON.stringify(sig.returnType)};
function __run(rawArgs) {
  const args = rawArgs.map((v, i) => __convertIn(v, __paramTypes[i] || ''));
  const r = ${fnName}(...args);
  if (__returnType === 'void') return __convertOut(args[0], __paramTypes[0] || '');
  return __convertOut(r, __returnType);
}
`
}
