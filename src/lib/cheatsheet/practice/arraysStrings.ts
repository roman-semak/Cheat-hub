import type { PracticeTask } from '../types'

// Section B of the interview-prep checklist: array & string manipulation.
export const arraysStringsTasks: PracticeTask[] = [
  {
    id: 'group-anagrams',
    title: 'groupAnagrams()',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'high',
    tags: ['Map', 'sort', 'hashing', 'strings'],
    prompt: `<p><strong>Завдання:</strong> <code>groupAnagrams(words)</code> — згрупуй слова, що є анаграмами одне одного.</p>
      <p><code>['eat','tea','tan','ate','nat','bat']</code> → <code>[['eat','tea','ate'],['tan','nat'],['bat']]</code>.</p>
      <p>Ця задача була на скрині співбесіди. Обговори складність.</p>`,
    starterCode: `function groupAnagrams(words: string[]): string[][] {
  // TODO: ключ = канонічна форма слова
  return [];
}`,
    solution: `function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const word of words) {
    // канонічний ключ: відсортовані літери ('eat' -> 'aet')
    const key = word.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(word);
  }

  return [...groups.values()];
}

// Альтернативний ключ — частотний вектор (O(n·k) замість O(n·k·log k)):
// const key = counts.join(','); // де counts[26] — підрахунок 'a'..'z'`,
    explanation: `<ul class="list">
      <li>Ідея: два слова — анаграми ⟺ у них однакова канонічна форма. Найпростіша канонічна форма — відсортовані літери.</li>
      <li><code>Map&lt;ключ, слова[]&gt;</code> групує за один прохід.</li>
      <li><strong>Складність:</strong> <code>O(n · k log k)</code> (n слів, k — довжина слова, сортування кожного). З частотним вектором на 26 літер — <code>O(n · k)</code>.</li>
      <li><strong>Пам'ять:</strong> <code>O(n · k)</code> на зберігання груп.</li>
    </ul>`,
  },
  {
    id: 'flatten-array',
    title: 'flatten() — рекурсивно + за глибиною',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'high',
    tags: ['recursion', 'reduce', 'depth'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>flatten(arr, depth = Infinity)</code>:</p>
      <ul class="list">
        <li><code>flatten([1, [2, [3, [4]]]])</code> → <code>[1, 2, 3, 4]</code>;</li>
        <li><code>flatten([1, [2, [3, [4]]]], 1)</code> → <code>[1, 2, [3, [4]]]</code>;</li>
        <li>без <code>Array.prototype.flat</code>.</li>
      </ul>`,
    starterCode: `function flatten<T>(arr: unknown[], depth = Infinity): T[] {
  // TODO
  return [];
}`,
    solution: `function flatten<T>(arr: unknown[], depth = Infinity): T[] {
  const result: T[] = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten<T>(item, depth - 1)); // спускаємось на рівень глибше
    } else {
      result.push(item as T);
    }
  }

  return result;
}

// Ітеративно (через стек) — без ризику переповнення стека викликів:
// function flatten<T>(arr: unknown[]): T[] {
//   const stack = [...arr];
//   const out: T[] = [];
//   while (stack.length) {
//     const next = stack.pop()!;
//     if (Array.isArray(next)) stack.push(...next);
//     else out.unshift(next as T);
//   }
//   return out;
// }`,
    explanation: `<ul class="list">
      <li>Рекурсія: якщо елемент — масив і <code>depth &gt; 0</code>, розкриваємо його <code>flatten(item, depth - 1)</code>; інакше додаємо як є.</li>
      <li><code>depth</code> зменшується на кожному рівні → <code>0</code> зупиняє подальше розкриття.</li>
      <li><code>Infinity - 1 === Infinity</code>, тож дефолт коректно розкриває на будь-яку глибину.</li>
      <li>Для дуже глибоких масивів безпечніша <strong>ітеративна</strong> версія зі стеком — рекурсія може впертись у ліміт стека викликів.</li>
    </ul>`,
  },
  {
    id: 'dedupe-unique',
    title: 'unique() — унікальні елементи',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'mid',
    tags: ['Set', 'Map', 'key-selector'],
    prompt: `<p><strong>Завдання:</strong></p>
      <ul class="list">
        <li><code>unique(arr)</code> — унікальні примітиви, зберігаючи порядок першої появи;</li>
        <li><code>uniqueBy(arr, keyFn)</code> — унікальність за похідним ключем (напр. <code>u =&gt; u.id</code> для об'єктів).</li>
      </ul>`,
    starterCode: `function unique<T>(arr: T[]): T[] {
  // TODO
  return arr;
}

function uniqueBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  // TODO
  return arr;
}`,
    solution: `function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]; // Set зберігає порядок вставки
}

function uniqueBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  const result: T[] = [];
  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}`,
    explanation: `<ul class="list">
      <li><code>new Set(arr)</code> дедуплікує за <code>SameValueZero</code> (як <code>===</code>, але <code>NaN</code> дорівнює <code>NaN</code>); ітерація <code>Set</code> — у порядку вставки.</li>
      <li>Для об'єктів <code>Set</code> не допоможе (порівняння за посиланням) — потрібен <code>keyFn</code> і окремий <code>Set</code> ключів.</li>
      <li>Складність обох — <code>O(n)</code> час, <code>O(n)</code> пам'ять.</li>
    </ul>`,
  },
  {
    id: 'chunk',
    title: 'chunk() — розбити на групи по N',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'mid',
    tags: ['slice', 'loop'],
    prompt: `<p><strong>Завдання:</strong> <code>chunk(arr, size)</code> → масив підмасивів довжиною <code>size</code> (останній може бути коротшим). <code>chunk([1,2,3,4,5], 2)</code> → <code>[[1,2],[3,4],[5]]</code>. Кинь помилку, якщо <code>size &lt; 1</code>.</p>`,
    starterCode: `function chunk<T>(arr: T[], size: number): T[][] {
  // TODO
  return [];
}`,
    solution: `function chunk<T>(arr: T[], size: number): T[][] {
  if (size < 1) throw new RangeError('size must be >= 1');

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size)); // slice сам обрізає хвіст
  }
  return result;
}`,
    explanation: `<ul class="list">
      <li>Крок циклу — <code>size</code>, а не <code>1</code>; <code>slice(i, i + size)</code> безпечно виходить за межі масиву (не кидає, просто коротший хвіст).</li>
      <li>Валідація <code>size &gt;= 1</code> — інакше <code>i += 0</code> дасть нескінченний цикл.</li>
      <li>Практика: посторінкове відображення, батчинг запитів (<code>chunk(ids, 100)</code> → по 100 у запит).</li>
    </ul>`,
  },
  {
    id: 'group-by',
    title: 'groupBy() — згрупувати за ключем',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'mid',
    tags: ['reduce', 'Map', 'record'],
    prompt: `<p><strong>Завдання:</strong> <code>groupBy(arr, keyFn)</code> → об'єкт <code>{ [key]: item[] }</code>.
      <code>groupBy(users, u =&gt; u.role)</code> → <code>{ admin: [...], user: [...] }</code>.</p>`,
    starterCode: `function groupBy<T>(
  arr: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  // TODO
  return {};
}`,
    solution: `function groupBy<T>(
  arr: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item); // створюємо масив за потреби, одразу пушимо
    return acc;
  }, {});
}

// Нативно (2024+): Object.groupBy(arr, keyFn) / Map.groupBy(arr, keyFn)`,
    explanation: `<ul class="list">
      <li><code>reduce</code> з акумулятором-об'єктом; <code>acc[key] ??= []</code> ініціалізує групу при першій появі ключа.</li>
      <li><code>Object.create(null)</code> замість <code>{}</code> варто взяти, якщо ключі можуть бути <code>'__proto__'</code>, <code>'constructor'</code> тощо.</li>
      <li>Нативний <code>Object.groupBy</code> / <code>Map.groupBy</code> вже є в сучасних рантаймах — але реалізацію все одно просять.</li>
    </ul>`,
  },
  {
    id: 'set-operations',
    title: 'intersection / union / difference',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'mid',
    tags: ['Set', 'filter'],
    prompt: `<p><strong>Завдання:</strong> реалізуй три операції над масивами як над множинами (результат — масив унікальних):</p>
      <ul class="list">
        <li><code>union(a, b)</code> — усі елементи з обох;</li>
        <li><code>intersection(a, b)</code> — лише спільні;</li>
        <li><code>difference(a, b)</code> — ті, що в <code>a</code>, але не в <code>b</code>.</li>
      </ul>`,
    starterCode: `function union<T>(a: T[], b: T[]): T[] {
  return [];
}
function intersection<T>(a: T[], b: T[]): T[] {
  return [];
}
function difference<T>(a: T[], b: T[]): T[] {
  return [];
}`,
    solution: `function union<T>(a: T[], b: T[]): T[] {
  return [...new Set([...a, ...b])];
}

function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}

function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => !setB.has(x));
}`,
    explanation: `<ul class="list">
      <li>Ключ до <code>O(n + m)</code>: перетворюємо один масив на <code>Set</code>, далі <code>has</code> — це <code>O(1)</code> замість <code>Array.includes</code> (<code>O(n)</code>) у циклі.</li>
      <li>Наївний <code>a.filter(x =&gt; b.includes(x))</code> — <code>O(n·m)</code>, на співбесіді це помітять.</li>
      <li>ES2025 додає нативні <code>Set.prototype.union/intersection/difference</code>.</li>
    </ul>`,
  },
  {
    id: 'two-sum',
    title: 'twoSum() — пара із заданою сумою',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'mid',
    tags: ['Map', 'hash', 'O(n)'],
    prompt: `<p><strong>Завдання:</strong> <code>twoSum(nums, target)</code> → індекси двох чисел, що дають у сумі <code>target</code> (рівно одне рішення). Зроби за <strong>один прохід</strong>, <code>O(n)</code>.</p>`,
    starterCode: `function twoSum(nums: number[], target: number): [number, number] | null {
  // TODO: O(n) через Map
  return null;
}`,
    solution: `function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }

  return null;
}`,
    explanation: `<ul class="list">
      <li>Для кожного числа рахуємо «доповнення» <code>target - nums[i]</code> і перевіряємо, чи бачили його раніше.</li>
      <li><code>Map</code> «значення → індекс» дає <code>O(1)</code> перевірку — весь алгоритм <code>O(n)</code> час, <code>O(n)</code> пам'ять.</li>
      <li>Записуємо поточне число <strong>після</strong> перевірки — інакше на <code>target = 2·nums[i]</code> знайдемо той самий елемент двічі.</li>
      <li>Brute-force — подвійний цикл <code>O(n²)</code>; для <em>відсортованого</em> масиву є варіант з двома вказівниками <code>O(n)</code> без пам'яті.</li>
    </ul>`,
  },
  {
    id: 'is-palindrome',
    title: 'isPalindrome() — з нормалізацією',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'low',
    tags: ['two-pointers', 'regex', 'strings'],
    prompt: `<p><strong>Завдання:</strong> <code>isPalindrome(str)</code> — <code>true</code>, якщо рядок читається однаково в обидва боки, ігноруючи регістр і не-літерно-цифрові символи. <code>"A man, a plan, a canal: Panama"</code> → <code>true</code>.</p>
      <p>Зроби за <code>O(1)</code> додаткової пам'яті (два вказівники).</p>`,
    starterCode: `function isPalindrome(str: string): boolean {
  // TODO: два вказівники, O(1) пам'яті
  return false;
}`,
    solution: `function isPalindrome(str: string): boolean {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Строго O(1) пам'яті — без clean, пропускаючи символи на льоту:
// while (left < right) {
//   while (left < right && !isAlnum(str[left])) left++;
//   while (left < right && !isAlnum(str[right])) right--;
//   if (str[left].toLowerCase() !== str[right].toLowerCase()) return false;
//   left++; right--;
// }`,
    explanation: `<ul class="list">
      <li>Два вказівники з країв ідуть до центру, порівнюючи символи — <code>O(n)</code> час.</li>
      <li>Проста версія створює нормалізований рядок (<code>O(n)</code> пам'ять); строго <code>O(1)</code> версія пропускає зайві символи прямо в циклі.</li>
      <li><code>str.split('').reverse().join('') === str</code> — найкоротше, але <code>O(n)</code> пам'ять і повільніше.</li>
    </ul>`,
  },
  {
    id: 'reverse-string-words',
    title: 'reverseString / reverseWords',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'low',
    tags: ['strings', 'split', 'two-pointers'],
    prompt: `<p><strong>Завдання:</strong></p>
      <ul class="list">
        <li><code>reverseString('hello')</code> → <code>'olleh'</code>;</li>
        <li><code>reverseWords('  the sky  is blue ')</code> → <code>'blue is sky the'</code> (прибрати зайві пробіли).</li>
      </ul>`,
    starterCode: `function reverseString(s: string): string {
  return s;
}

function reverseWords(s: string): string {
  return s;
}`,
    solution: `function reverseString(s: string): string {
  return [...s].reverse().join(''); // [...s] коректно розбиває юнікод-символи
}

function reverseWords(s: string): string {
  return s
    .trim()
    .split(/\\s+/) // розбити по будь-якій кількості пробілів
    .reverse()
    .join(' ');
}`,
    explanation: `<ul class="list">
      <li><code>[...s]</code> (spread) розбиває рядок по code points — <code>s.split('')</code> ламає емодзі / сурогатні пари.</li>
      <li><code>reverseWords</code>: <code>trim()</code> прибирає краї, <code>split(/\\s+/)</code> схлопує внутрішні пробіли, <code>reverse().join(' ')</code> збирає назад.</li>
      <li>In-place реверс масиву символів (два вказівники) — коли просять <code>O(1)</code> пам'яті і дано <code>char[]</code>.</li>
    </ul>`,
  },
  {
    id: 'first-unique-char',
    title: 'firstUniqueChar()',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'low',
    tags: ['Map', 'frequency', 'strings'],
    prompt: `<p><strong>Завдання:</strong> <code>firstUniqueChar(s)</code> → індекс першого символу, що зустрічається рівно один раз; <code>-1</code>, якщо такого немає. <code>'leetcode'</code> → <code>0</code>, <code>'loveleetcode'</code> → <code>2</code>.</p>`,
    starterCode: `function firstUniqueChar(s: string): number {
  // TODO
  return -1;
}`,
    solution: `function firstUniqueChar(s: string): number {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);

  for (let i = 0; i < s.length; i++) {
    if (counts.get(s[i]) === 1) return i;
  }
  return -1;
}`,
    explanation: `<ul class="list">
      <li>Два проходи: перший рахує частоти, другий шукає перший символ із частотою <code>1</code>.</li>
      <li>Порядок ітерації рядка зберігає позиції → перший знайдений і є відповіддю.</li>
      <li><code>O(n)</code> час, <code>O(k)</code> пам'ять (k — розмір алфавіту, для ASCII — константа).</li>
    </ul>`,
  },
  {
    id: 'count-occurrences',
    title: 'countOccurrences() — частоти',
    level: 'Middle',
    topic: 'Arrays & Strings',
    priority: 'low',
    tags: ['Map', 'reduce', 'frequency'],
    prompt: `<p><strong>Завдання:</strong> <code>countOccurrences(arr)</code> → <code>Map</code> «елемент → скільки разів». Додай <code>mostFrequent(arr)</code>, що повертає найчастіший елемент.</p>`,
    starterCode: `function countOccurrences<T>(arr: T[]): Map<T, number> {
  return new Map();
}

function mostFrequent<T>(arr: T[]): T | undefined {
  return undefined;
}`,
    solution: `function countOccurrences<T>(arr: T[]): Map<T, number> {
  const counts = new Map<T, number>();
  for (const item of arr) {
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }
  return counts;
}

function mostFrequent<T>(arr: T[]): T | undefined {
  let best: T | undefined;
  let bestCount = 0;
  for (const [item, count] of countOccurrences(arr)) {
    if (count > bestCount) {
      best = item;
      bestCount = count;
    }
  }
  return best;
}`,
    explanation: `<ul class="list">
      <li><code>Map</code>, а не <code>{}</code>: ключем може бути будь-що (об'єкт, число без приведення до рядка), і немає колізій з <code>Object.prototype</code>.</li>
      <li><code>counts.get(item) ?? 0</code> — акуратний інкремент із дефолтом.</li>
      <li><code>mostFrequent</code> шукає максимум за один прохід по <code>Map</code> — <code>O(n)</code> сумарно.</li>
    </ul>`,
  },
]
