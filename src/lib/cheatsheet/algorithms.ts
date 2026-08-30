// Algorithms topic — довідник структур даних і алгоритмічних патернів для
// LeetCode. Контент авторський (не auto-generated). Рендериться через
// ProseTopicView → ContentBlocks: дві секції-групи, кожен алгоритм — картка
// (.grid2 / .card) усередині блоку 'paragraph', як у ide.ts. Кутові дужки в
// прикладах коду екрановані (&lt; &gt; &amp;), бо HTML.
import type { TopicContent } from './types'

export const algorithmsContent: TopicContent = {
  slug: 'algorithms',
  intro: [
    {
      kind: 'paragraph',
      html: '<p>Більшість задач LeetCode зводяться до правильно обраної <strong>структури даних</strong> та <strong>алгоритмічного патерну</strong>. Нижче — довідник: що це, коли застосовувати та яка складність (Big-O). Розділено на дві групи.</p>',
    },
  ],
  sections: [
    /* ============ Data structures ============ */
    {
      id: 'data-structures',
      title: '🗂️ Структури даних',
      interviewQuestions: [
        {
          question: 'Чому вибір правильної структури даних часто важливіший за мікрооптимізацію алгоритму на співбесіді?',
          answer: 'Неправильна структура даних (наприклад, лінійний пошук у масиві замість <code>Map</code>/<code>Set</code> для перевірки належності) змінює асимптотичну складність усього рішення з O(1) на O(n) для кожної операції — жодна мікрооптимізація коду не компенсує неправильний вибір на цьому рівні. Інтерв\'юери часто оцінюють саме те, чи кандидат одразу розпізнає, яка структура підходить під профіль операцій задачі (часті вставки? пошук? порядок?).',
        },
        {
          question: 'У чому різниця між стеком (Stack) і чергою (Queue) з точки зору порядку обробки, і як це впливає на вибір структури для конкретної задачі (наприклад, BFS vs DFS)?',
          answer: 'Stack — LIFO (Last In, First Out): останній доданий елемент обробляється першим, природно підходить для DFS (глибина обходу через рекурсію чи явний стек) і задач з відкатом (backtracking). Queue — FIFO (First In, First Out): елементи обробляються в порядку додавання, що відповідає BFS — обхід рівень за рівнем, де потрібно спершу обробити всіх «сусідів», перш ніж йти глибше.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <div class="grid2">
              <div class="card">
                <h4>Array (масив)</h4>
                <p>Послідовність елементів з доступом за індексом — основа майже всіх задач.</p>
                <p><strong>Коли:</strong> прямий доступ за індексом, ітерація, база для two pointers / sliding window.</p>
                <p><strong>Big-O:</strong> доступ O(1) · пошук O(n) · push/pop у кінці O(1) · вставка в середину O(n).</p>
                <pre><code>const a = [1, 2, 3];
a.push(4); a[0]; a.length;</code></pre>
              </div>

              <div class="card">
                <h4>Hash Map / Hash Set</h4>
                <p>Відображення ключ → значення (<code>Map</code>) або множина унікальних (<code>Set</code>). Найчастіша структура на LeetCode.</p>
                <p><strong>Коли:</strong> підрахунок частот, кеш «бачив раніше», пошук доповнення (Two Sum), дедуплікація.</p>
                <p><strong>Big-O:</strong> вставка / пошук / видалення O(1) у середньому.</p>
                <pre><code>const m = new Map();
m.set(k, v); m.get(k); m.has(k);
const s = new Set(); s.add(x); s.has(x);</code></pre>
              </div>

              <div class="card">
                <h4>Stack (стек, LIFO)</h4>
                <p>Останній прийшов — перший вийшов. У JS — звичайний масив із <code>push</code>/<code>pop</code>.</p>
                <p><strong>Коли:</strong> валідація дужок, монотонний стек, ітеративний DFS, скасування дій.</p>
                <p><strong>Big-O:</strong> push / pop / peek O(1).</p>
                <pre><code>const st = [];
st.push(x); st.pop(); st.at(-1);</code></pre>
              </div>

              <div class="card">
                <h4>Queue / Deque (черга)</h4>
                <p>Перший прийшов — перший вийшов; deque — додавання/видалення з обох кінців.</p>
                <p><strong>Коли:</strong> BFS, обхід по рівнях, sliding-window maximum (монотонна черга).</p>
                <p><strong>Big-O:</strong> enqueue / dequeue O(1) (на масиві <code>shift()</code> — O(n), для O(1) тримають індекс голови).</p>
                <pre><code>const q = [];
q.push(x); const first = q.shift();</code></pre>
              </div>

              <div class="card">
                <h4>Linked List (зв'язний список)</h4>
                <p>Вузли зі значенням і вказівником <code>next</code> (одно-) чи ще й <code>prev</code> (двозв'язний).</p>
                <p><strong>Коли:</strong> O(1) вставка/видалення за вузлом, реверс списку, виявлення циклу (Floyd, два вказівники).</p>
                <p><strong>Big-O:</strong> доступ O(n) · вставка / видалення за посиланням O(1).</p>
                <pre><code>class ListNode {
  constructor(val) { this.val = val; this.next = null; }
}</code></pre>
              </div>

              <div class="card">
                <h4>Heap / Priority Queue</h4>
                <p>Бінарна купа — швидкий доступ до min/max. У JS немає вбудованої, реалізують масивом.</p>
                <p><strong>Коли:</strong> top-K елементів, медіана потоку, Dijkstra, злиття k відсортованих списків.</p>
                <p><strong>Big-O:</strong> push / pop O(log n) · peek (min/max) O(1).</p>
                <pre><code>// peek = a[0]; sift-up при push,
// sift-down при pop кореня.</code></pre>
              </div>

              <div class="card">
                <h4>Tree · Binary Tree / BST</h4>
                <p>Вузли з лівим/правим нащадком. У BST: ліве піддерево &lt; вузол &lt; праве.</p>
                <p><strong>Коли:</strong> ієрархії, впорядкований пошук, обходи in/pre/post-order, діапазонні запити.</p>
                <p><strong>Big-O:</strong> пошук / вставка O(h): O(log n) збалансоване, O(n) у гіршому.</p>
                <pre><code>class TreeNode {
  constructor(val) { this.val = val; this.left = this.right = null; }
}</code></pre>
              </div>

              <div class="card">
                <h4>Trie (префіксне дерево)</h4>
                <p>Дерево, де кожен вузол — символ; шлях від кореня — префікс слова.</p>
                <p><strong>Коли:</strong> автодоповнення, пошук слів/префіксів, словники, задачі на рядки.</p>
                <p><strong>Big-O:</strong> вставка / пошук O(L), де L — довжина слова.</p>
                <pre><code>const root = { children: {}, end: false };</code></pre>
              </div>

              <div class="card">
                <h4>Graph (граф)</h4>
                <p>Вузли + ребра. Найчастіше зберігають як список суміжності (<code>Map</code> вузол → сусіди).</p>
                <p><strong>Коли:</strong> зв'язність, найкоротші шляхи, цикли, топологічне сортування, островки на сітці.</p>
                <p><strong>Big-O:</strong> обхід (DFS/BFS) O(V + E).</p>
                <pre><code>const g = new Map();
(g.get(u) ?? g.set(u, []).get(u)).push(v);</code></pre>
              </div>

              <div class="card">
                <h4>Union-Find (DSU)</h4>
                <p>Неперетинні множини: <code>find</code> (корінь) + <code>union</code> зі стисненням шляхів.</p>
                <p><strong>Коли:</strong> компоненти зв'язності, цикл у неорієнтованому графі, алгоритм Kruskal.</p>
                <p><strong>Big-O:</strong> майже O(1) (обернена Аккермана α) на операцію.</p>
                <pre><code>function find(p, x) {
  while (p[x] !== x) { p[x] = p[p[x]]; x = p[x]; }
  return x;
}</code></pre>
              </div>
            </div>
          `,
        },
      ],
    },

    /* ============ Algorithmic patterns ============ */
    {
      id: 'patterns',
      title: '⚙️ Алгоритми та патерни',
      interviewQuestions: [
        {
          question: 'Чим підхід Two Pointers відрізняється від наївного вкладеного циклу для задач на відсортованому масиві, і яку складність це дає?',
          answer: 'Two Pointers рухає два вказівники назустріч (або в одному напрямку) по відсортованих даних, використовуючи впорядкованість, щоб на кожному кроці відкидати частину простору пошуку — це часто зводить складність з O(n²) наївного вкладеного циклу до O(n), бо кожен елемент розглядається щонайбільше константну кількість разів.',
        },
        {
          question: 'Коли варто застосувати Sliding Window замість перерахунку суми/умови для кожного підмасиву з нуля?',
          answer: 'Sliding Window виправдана, коли задача передбачає рух неперервного вікна (підмасиву/підрядка) по даних і умову можна оновлювати <em>інкрементально</em> при зсуві вікна (додати новий елемент, прибрати старий), замість повного перерахунку — це зводить складність з O(n·k) чи O(n²) до O(n), уникаючи повторної обробки тих самих елементів.',
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `
            <div class="grid2">
              <div class="card">
                <h4>Two Pointers</h4>
                <p>Два індекси рухаються назустріч або в одному напрямку, скорочуючи перебір.</p>
                <p><strong>Коли:</strong> відсортований масив, палиндроми, пара із заданою сумою, видалення дублікатів in-place.</p>
                <p><strong>Big-O:</strong> O(n).</p>
                <pre><code>let l = 0, r = a.length - 1;
while (l &lt; r) { /* ... */ l++; r--; }</code></pre>
              </div>

              <div class="card">
                <h4>Sliding Window</h4>
                <p>Рухоме вікно [l..r]: розширюй <code>r</code>, стискай <code>l</code>, поки умова виконується.</p>
                <p><strong>Коли:</strong> найдовший підрядок без повторів, підмасив із сумою ≥ target, частотні вікна.</p>
                <p><strong>Big-O:</strong> O(n).</p>
                <pre><code>let l = 0;
for (let r = 0; r &lt; n; r++) {
  // add a[r]; while (bad) remove a[l++];
}</code></pre>
              </div>

              <div class="card">
                <h4>Binary Search</h4>
                <p>Ділення відсортованого простору навпіл до знаходження відповіді.</p>
                <p><strong>Коли:</strong> відсортований масив, «простір відповідей», перша/остання позиція, мінімізація максимуму.</p>
                <p><strong>Big-O:</strong> O(log n).</p>
                <pre><code>let l = 0, r = n - 1;
while (l &lt;= r) {
  const mid = (l + r) &gt;&gt; 1;
  if (a[mid] === t) return mid;
  a[mid] &lt; t ? (l = mid + 1) : (r = mid - 1);
}</code></pre>
              </div>

              <div class="card">
                <h4>Prefix Sum</h4>
                <p>Масив накопичених сум для миттєвих діапазонних запитів.</p>
                <p><strong>Коли:</strong> сума підмасиву, кількість підмасивів із сумою = k (разом із hash map).</p>
                <p><strong>Big-O:</strong> побудова O(n) · запит діапазону O(1).</p>
                <pre><code>pre[0] = 0;
for (let i = 0; i &lt; n; i++) pre[i + 1] = pre[i] + a[i];
// сума [i..j] = pre[j + 1] - pre[i]</code></pre>
              </div>

              <div class="card">
                <h4>Sorting</h4>
                <p>Впорядкування як передобробка. Вбудований <code>Array.sort</code> — O(n log n).</p>
                <p><strong>Коли:</strong> підготовка до two pointers / greedy / intervals; counting sort для малого діапазону значень.</p>
                <p><strong>Big-O:</strong> порівняльне O(n log n) · counting O(n + k).</p>
                <pre><code>a.sort((x, y) =&gt; x - y);</code></pre>
              </div>

              <div class="card">
                <h4>Recursion &amp; Backtracking</h4>
                <p>Будуємо рішення крок за кроком; за невдачі відкочуємо вибір (undo).</p>
                <p><strong>Коли:</strong> перестановки, комбінації, підмножини, генерація дужок, судоку, N-Queens.</p>
                <p><strong>Big-O:</strong> експоненційне — часто O(2ⁿ) або O(n!).</p>
                <pre><code>function bt(path) {
  if (done) { res.push([...path]); return; }
  for (const c of choices) { path.push(c); bt(path); path.pop(); }
}</code></pre>
              </div>

              <div class="card">
                <h4>DFS (пошук углиб)</h4>
                <p>Йдемо якомога глибше перед поверненням; рекурсія або явний стек.</p>
                <p><strong>Коли:</strong> дерева/графи, компоненти зв'язності, шляхи, цикли, островки на сітці.</p>
                <p><strong>Big-O:</strong> O(V + E).</p>
                <pre><code>function dfs(u) {
  seen.add(u);
  for (const v of g.get(u) ?? []) if (!seen.has(v)) dfs(v);
}</code></pre>
              </div>

              <div class="card">
                <h4>BFS (пошук ушир)</h4>
                <p>Обхід по рівнях за допомогою черги.</p>
                <p><strong>Коли:</strong> найкоротший шлях у незваженому графі, обхід дерева по рівнях, мінімум кроків.</p>
                <p><strong>Big-O:</strong> O(V + E).</p>
                <pre><code>const q = [start]; seen.add(start);
while (q.length) {
  const u = q.shift();
  for (const v of g.get(u) ?? []) if (!seen.has(v)) { seen.add(v); q.push(v); }
}</code></pre>
              </div>

              <div class="card">
                <h4>Dynamic Programming</h4>
                <p>Розбиття на підзадачі, що перекриваються; мемоізація (top-down) або таблиця (bottom-up).</p>
                <p><strong>Коли:</strong> оптимум / підрахунок шляхів, рюкзак, LIS, edit distance, монети.</p>
                <p><strong>Big-O:</strong> залежить від станів — часто O(n) або O(n·m).</p>
                <pre><code>dp[0] = 0; dp[1] = 1;
for (let i = 2; i &lt;= n; i++) dp[i] = dp[i - 1] + dp[i - 2];</code></pre>
              </div>

              <div class="card">
                <h4>Greedy</h4>
                <p>На кожному кроці робимо локально найкращий вибір — коли це доводимо веде до глобального оптимуму.</p>
                <p><strong>Коли:</strong> інтервали, jump game, здача певними монетами, максимізація з сортуванням.</p>
                <p><strong>Big-O:</strong> часто O(n log n) через попереднє сортування.</p>
                <pre><code>let reach = 0;
for (let i = 0; i &lt;= reach; i++) reach = Math.max(reach, i + a[i]);</code></pre>
              </div>

              <div class="card">
                <h4>Bit Manipulation</h4>
                <p>Операції над бітами: <code>&amp;</code> <code>|</code> <code>^</code> <code>~</code> <code>&lt;&lt;</code> <code>&gt;&gt;</code>.</p>
                <p><strong>Коли:</strong> множини як бітові маски, парність, унікальний елемент (XOR), степені двійки.</p>
                <p><strong>Big-O:</strong> O(1) на операцію (O(к-ть бітів) на число).</p>
                <pre><code>x &amp; 1        // парність
x &gt;&gt; 1       // ділення на 2
a ^ b        // XOR
x &amp; (x - 1)  // прибрати молодший біт</code></pre>
              </div>

              <div class="card">
                <h4>Digit Manipulation (робота з цифрами)</h4>
                <p>Розбір числа по цифрах без переводу в рядок: <code>x % 10</code> — остання цифра, <code>(x / 10) | 0</code> (або <code>Math.trunc(x / 10)</code>) — відкинути останню, <code>res = res * 10 + d</code> — доклеїти цифру справа.</p>
                <p><strong>Коли:</strong> reverse integer, паліндром-число, сума/добуток цифр, happy number, plus one, підрахунок цифр.</p>
                <p><strong>Big-O:</strong> O(log₁₀ x) — кількість цифр числа.</p>
                <pre><code>let rev = 0;
while (x !== 0) {
  rev = rev * 10 + (x % 10); // взяти останню цифру
  x = (x / 10) | 0;          // відкинути її (трунк до нуля)
}</code></pre>
              </div>

              <div class="card">
                <h4>Intervals</h4>
                <p>Відрізки [start, end]: сортуй за початком, потім об'єднуй або шукай перетини.</p>
                <p><strong>Коли:</strong> merge intervals, insert interval, кількість переговорних (meeting rooms).</p>
                <p><strong>Big-O:</strong> O(n log n).</p>
                <pre><code>iv.sort((a, b) =&gt; a[0] - b[0]);
for (const [s, e] of iv) {
  if (s &lt;= last[1]) last[1] = Math.max(last[1], e);
  else res.push(last = [s, e]);
}</code></pre>
              </div>
            </div>
          `,
        },
      ],
    },
  ],
}
