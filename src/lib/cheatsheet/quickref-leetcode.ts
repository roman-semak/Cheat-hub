import type { QuickRefBlock } from './types'

// LeetCode quickref board — JS tricks for solving problems. Replaces the old
// lifehacks list at /leetcode/cheatsheet (grouped by strings / arrays /
// objects / numbers as before).
export const leetcodeQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'Рядки',
    icon: '🔤',
    entries: [
      { term: 'str.slice(-1)', desc: "останній символ; від'ємний індекс рахує з кінця (працює і для масивів)" },
      { term: 'str.at(-1)', desc: 'те саме, читабельніше' },
      { term: "[...str].reverse().join('')", desc: 'розвернути рядок' },
      { term: "str.split('')", desc: 'рядок → масив символів' },
      { term: 'str.charCodeAt(i) - 97', desc: "індекс літери <code>a-z</code> → 0..25" },
      { term: 'String.fromCharCode(97 + i)', desc: 'індекс → літера' },
      { term: "str.padStart(8, '0')", desc: 'доповнити нулями' },
      { term: "str.replace(/[^a-z0-9]/gi, '')", desc: 'лишити тільки літери/цифри (palindrome)' },
    ],
  },
  {
    label: 'Масиви',
    icon: '📚',
    entries: [
      { term: 'Array.from({ length: n }, () => [])', desc: '<b>незалежні</b> вкладені масиви (не <code>fill([])</code>!)' },
      { term: 'new Array(n).fill(0)', desc: 'масив нулів / dp-таблиця' },
      { term: 'arr.sort((a, b) => a - b)', desc: 'числове сортування — без компаратора сортує як рядки' },
      { term: '[...new Set(arr)]', desc: 'унікальні значення' },
      { term: 'arr.at(-1)', desc: 'останній елемент' },
      { term: '[a[i], a[j]] = [a[j], a[i]]', desc: 'swap без temp' },
      { term: 'arr.flat(Infinity)', desc: 'розплющити будь-яку глибину' },
      {
        term: 'Prefix sum',
        desc: 'сума на відрізку за O(1)',
        code: `const pre = [0];
for (const x of nums) pre.push(pre.at(-1) + x);
const sum = (l, r) => pre[r + 1] - pre[l];`,
        codeLanguage: 'javascript',
      },
    ],
  },
  {
    label: "Об'єкти, Map, Set",
    icon: '🗂️',
    entries: [
      { term: 'map.set(k, (map.get(k) ?? 0) + 1)', desc: 'лічильник частот' },
      {
        term: 'Group anagrams',
        desc: 'ключ — відсортований рядок',
        code: `const groups = new Map();
for (const w of words) {
  const key = [...w].sort().join('');
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(w);
}
return [...groups.values()];`,
        codeLanguage: 'javascript',
      },
      { term: 'Map vs {}', desc: 'Map — будь-які ключі, порядок вставки, <code>size</code>' },
      { term: 'Object.entries(obj)', desc: '<code>[key, value]</code> пари для сортування' },
      { term: 'set.has(x)', desc: 'перевірка за O(1) замість <code>includes</code> O(n)' },
    ],
  },
  {
    label: 'Числа',
    icon: '🔢',
    entries: [
      { term: 'Math.trunc(a / b)', desc: 'цілочисельне ділення (до нуля)' },
      { term: '(a % m + m) % m', desc: "коректний модуль для від'ємних" },
      { term: 'Infinity / -Infinity', desc: 'стартові значення для min/max' },
      { term: 'Number.MAX_SAFE_INTEGER', desc: '2⁵³−1 — далі <code>BigInt</code> (<code>10n</code>)' },
      { term: 'x & 1', desc: 'непарність · <code>x >> 1</code> — ділення на 2' },
      { term: 'n & (n - 1)', desc: 'прибрати молодший біт · <code>=== 0</code> → степінь двійки' },
      { term: 'a ^ b', desc: 'XOR — знайти одиночний елемент серед пар' },
    ],
  },
  {
    label: 'Шаблони',
    icon: '🧩',
    entries: [
      {
        term: 'Two pointers',
        desc: 'відсортований масив / палиндром',
        code: `let l = 0, r = nums.length - 1;
while (l < r) {
  const s = nums[l] + nums[r];
  if (s === target) return [l, r];
  s < target ? l++ : r--;
}`,
        codeLanguage: 'javascript',
      },
      {
        term: 'Sliding window',
        desc: 'найдовший/найкоротший підмасив з умовою',
        code: `let l = 0, best = 0;
const seen = new Map();
for (let r = 0; r < s.length; r++) {
  seen.set(s[r], (seen.get(s[r]) ?? 0) + 1);
  while (seen.get(s[r]) > 1) {
    seen.set(s[l], seen.get(s[l]) - 1);
    l++;
  }
  best = Math.max(best, r - l + 1);
}`,
        codeLanguage: 'javascript',
      },
      {
        term: 'Binary search',
        desc: 'lower bound — перший ≥ target',
        code: `let lo = 0, hi = nums.length;
while (lo < hi) {
  const mid = (lo + hi) >> 1;
  nums[mid] < target ? (lo = mid + 1) : (hi = mid);
}
return lo;`,
        codeLanguage: 'javascript',
      },
      {
        term: 'BFS',
        desc: 'найкоротший шлях у незваженому графі; черга через індекс',
        code: `const queue = [start];
const seen = new Set([start]);
for (let i = 0; i < queue.length; i++) {
  const node = queue[i];
  for (const next of graph[node]) {
    if (!seen.has(next)) { seen.add(next); queue.push(next); }
  }
}`,
        codeLanguage: 'javascript',
      },
    ],
  },
]
