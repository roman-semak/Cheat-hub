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
        {
          question: 'Як розвернути ціле число (Reverse Integer) без переводу в рядок, і на що звернути увагу зі знаком та переповненням?',
          answer: 'Ітеративно: <code>rev = rev * 10 + (x % 10)</code>, потім <code>x = (x / 10) | 0</code>, доки <code>x !== 0</code>. У JS <code>%</code> зберігає знак діленого (<code>-123 % 10 === -3</code>), а <code>| 0</code> трунькає до нуля в обидва боки — тож той самий цикл коректно працює і для відʼємних чисел без окремої гілки. Для 32-бітної умови LeetCode після кожного кроку (або в кінці) перевіряють вихід за межі <code>[-2³¹, 2³¹-1]</code> і повертають 0. Складність — O(log₁₀ x) за кількістю цифр.',
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

    /* ============ Sorting ============ */
    {
      id: 'sorting',
      title: '🔢 Сортування',
      interviewQuestions: [
        {
          question: "Що поверне <code>[10, 1, 2, 20, 3].sort()</code> і чому? Як правильно сортувати числа?",
          answer: "<code>[1, 10, 2, 20, 3]</code>. Без компаратора <code>sort()</code> перетворює елементи на <strong>рядки</strong> і порівнює їх за UTF-16 кодами, тож <code>'10' &lt; '2'</code>, бо <code>'1' &lt; '2'</code>. Для чисел завжди передають компаратор: <code>(a, b) =&gt; a - b</code> — за зростанням, <code>b - a</code> — за спаданням. Компаратор має повертати <strong>число</strong> (&lt;0 / 0 / &gt;0); <code>(a, b) =&gt; a &gt; b</code> повертає boolean, і результат залежить від движка — класичний баг.",
        },
        {
          question: "Чому <code>setItems(items.sort(cmp))</code> — баг у React, і як відсортувати правильно?",
          answer: "<code>sort()</code> сортує <strong>in-place</strong> і повертає той самий масив: <code>arr.sort() === arr</code>. Тож ти мутуєш поточний state, а в <code>setItems</code> передаєш ту саму reference — React порівнює через <code>Object.is</code>, може пропустити ре-рендер, а мемоізовані діти й селектори бачать «тихо змінені» дані. Правильно — копія: <code>[...items].sort(cmp)</code> або ES2023 <code>items.toSorted(cmp)</code>. Ще краще — не зберігати відсортований список у state взагалі, а рахувати його як derived через <code>useMemo(() =&gt; [...items].sort(cmp), [items, cmp])</code>.",
        },
        {
          question: "Що таке stable sort, чи гарантує його JS і навіщо він на практиці?",
          answer: "Стабільне сортування зберігає відносний порядок елементів з <strong>однаковим ключем</strong>. З ES2019 <code>Array.prototype.sort</code> гарантовано стабільний у всіх движках (V8 використовує <strong>TimSort</strong> — гібрид merge + insertion). Практична користь — multi-level сортування: відсортувати за другорядним ключем, потім за головним, і рівні за головним лишаться впорядкованими за другорядним. Альтернатива в одному проході — ланцюжок компараторів <code>a.cat.localeCompare(b.cat) || b.price - a.price</code>.",
        },
        {
          question: "Чому comparison sort не може бути швидшим за O(n log n), і як Counting/Radix обходять цю межу? Merge чи Quick — що і коли?",
          answer: "Будь-яке сортування порівняннями — це бінарне дерево рішень з <code>n!</code> листками (усі перестановки), тому його висота (кількість порівнянь у гіршому) ≥ <code>log₂(n!) ≈ n log n</code>. <strong>Counting / Radix / Bucket</strong> не порівнюють, а розкладають елементи по «відрах» за значенням/розрядом — O(n + k), але лише для цілих або обмеженого діапазону. <strong>Merge</strong> — гарантований O(n log n), стабільний, але O(n) пам'яті; добре для linked lists і зовнішнього сортування. <strong>Quick</strong> — на практиці швидший (in-place, cache-friendly), але O(n²) у гіршому при поганому pivot; лікується рандомним або median-of-three pivot.",
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Дві частини: <strong>(A)</strong> практика — <code>Array.prototype.sort()</code>, яким сортують у 99% реального коду; <strong>(B)</strong> теорія алгоритмів, яку питають на інтерв'ю.</p>
  <h3 class="topic">A · Пастка №1: сортування за замовчуванням — лексикографічне <span class="tag tag-key">KEY</span></h3>
  <p>Без компаратора <code>sort()</code> перетворює елементи на <strong>рядки</strong> і порівнює за Unicode-кодами: <code>'10' &lt; '2'</code>, бо <code>'1' &lt; '2'</code>. Для чисел <strong>завжди</strong> передавай comparator.</p>
  <p><strong>Контракт компаратора:</strong> повертає <code>&lt; 0</code> — <code>a</code> перед <code>b</code>; <code>&gt; 0</code> — <code>a</code> після <code>b</code>; <code>0</code> — порядок не змінюється.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'Лексикографічна пастка, comparator і мутація',
          code: `[10, 1, 2, 20, 3].sort();                // ❌ [1, 10, 2, 20, 3]
[10, 1, 2, 20, 3].sort((a, b) => a - b); // ✅ [1, 2, 3, 10, 20] — за зростанням
[10, 1, 2, 20, 3].sort((a, b) => b - a); // за спаданням

// sort() мутує in-place і повертає ТОЙ САМИЙ масив
const arr = [3, 1, 2];
const sorted = arr.sort((a, b) => a - b);
arr === sorted; // true

// React: ніколи не сортуй state напряму
setItems(items.sort(cmp));              // ❌ мутація state
setItems([...items].sort(cmp));         // ✅ копія
setItems(items.toSorted(cmp));          // ✅ ES2023, не мутує`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">A · Стабільність і multi-key</h3>
  <p><strong>Stable sort</strong> — елементи з однаковим ключем зберігають відносний порядок. З <strong>ES2019</strong> <code>Array.prototype.sort</code> гарантовано стабільний. <code>toSorted()</code> (ES2023) — immutable-версія разом із <code>toReversed</code>, <code>toSpliced</code>, <code>with</code>.</p>
  <h3 class="topic">A · Рядки — <code>localeCompare</code>, не <code>&lt;</code></h3>
  <p>Порівняння через <code>&lt;</code> / дефолтний <code>sort()</code> ламається на не-ASCII, регістрі й локалях. <code>localeCompare</code> сортує за правилами мови; для великих масивів — <strong><code>Intl.Collator</code></strong>: колатор створюється один раз, а не на кожне порівняння.</p>
  <h3 class="topic">A · Складність вбудованого <code>sort()</code></h3>
  <p><strong>Time</strong> O(n log n) в середньому і найгіршому. V8 використовує <strong>TimSort</strong> — гібрид merge + insertion, стабільний; пам'ять — O(n).</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'Multi-key, localeCompare, Intl.Collator',
          code: `// стабільність: спершу 2-й ключ, потім 1-й — рівні за age лишаються в порядку name
users
  .sort((a, b) => a.name.localeCompare(b.name)) // 2nd key
  .sort((a, b) => a.age - b.age);               // 1st key

// те саме одним компаратором: перший ненульовий результат вирішує
data.sort((a, b) =>
  a.category.localeCompare(b.category) || b.price - a.price, // category, потім price desc
);

['ä', 'z', 'a'].sort();                               // ❌ некоректно для локалей
['ä', 'z', 'a'].sort((a, b) => a.localeCompare(b));  // ✅
arr.sort((a, b) => a.localeCompare(b, 'uk', { sensitivity: 'base' })); // без регістру

const collator = new Intl.Collator('uk');            // великі масиви — швидше
arr.sort(collator.compare);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">B · Алгоритми сортування — порівняльна таблиця <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Алгоритм</th><th>Avg</th><th>Worst</th><th>Space</th><th>Stable</th><th>Ідея</th></tr>
      <tr><td><strong>Bubble</strong></td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>✅</td><td>сусідні swap'и, «спливання»</td></tr>
      <tr><td><strong>Selection</strong></td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>❌</td><td>знайти мінімум, поставити на місце</td></tr>
      <tr><td><strong>Insertion</strong></td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>✅</td><td>вставка у відсортовану частину; O(n) на майже відсортованих</td></tr>
      <tr><td><strong>Merge</strong></td><td>O(n log n)</td><td>O(n log n)</td><td><strong>O(n)</strong></td><td>✅</td><td>divide &amp; conquer + злиття</td></tr>
      <tr><td><strong>Quick</strong></td><td>O(n log n)</td><td><strong>O(n²)</strong></td><td>O(log n)</td><td>❌</td><td>pivot + partition</td></tr>
      <tr><td><strong>Heap</strong></td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>❌</td><td>binary heap</td></tr>
      <tr><td><strong>TimSort</strong></td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>✅</td><td>merge + insertion (V8, Python)</td></tr>
      <tr><td><strong>Counting / Radix</strong></td><td>O(n + k)</td><td>O(n + k)</td><td>O(n + k)</td><td>✅</td><td>без порівнянь; цілі / обмежений діапазон</td></tr>
    </table>
  </div>
  <h3 class="topic">B · Ключові інсайти</h3>
  <ul class="list">
    <li><strong>Нижня межа O(n log n)</strong> для comparison sort: дерево рішень має <code>n!</code> листків, його глибина ≥ <code>log(n!) ≈ n log n</code>.</li>
    <li><strong>Як обійти:</strong> non-comparison sorts (Counting, Radix, Bucket) — O(n) для цілих / обмеженого діапазону, бо розкладають по «відрах», а не порівнюють.</li>
    <li><strong>Merge vs Quick:</strong> Merge — гарантований O(n log n), стабільний, але O(n) пам'яті (linked lists, зовнішнє сортування). Quick — швидший на практиці (in-place, cache-friendly), але O(n²) при поганому pivot → рандомний / median-of-three pivot.</li>
    <li><strong>Insertion sort кращий за O(n log n)</strong> на <em>малих</em> і <em>майже відсортованих</em> даних — O(n) у кращому випадку; тому TimSort використовує його для коротких під-масивів.</li>
  </ul>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'Quick Sort (читабельний, не in-place) і Merge Sort',
          code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;              // база рекурсії
  const [pivot, ...rest] = arr;                 // у проді — рандомний pivot
  const left = rest.filter(x => x < pivot);
  const right = rest.filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
// ⚠️ O(n) зайвої пам'яті через spread/filter. На інтерв'ю проговори:
// для production — in-place partition (Lomuto/Hoare) + рандомний pivot.

function mergeSort(arr) {                        // O(n log n) time, O(n) space, stable
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}

function merge(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    result.push(a[i] <= b[j] ? a[i++] : b[j++]); // <= зберігає стабільність
  }
  return [...result, ...a.slice(i), ...b.slice(j)];
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Практика для frontend-задач</h3>
  <ul class="list">
    <li><strong>99% часу — вбудований <code>sort()</code> з компаратором.</strong> Реалізацію руками просять як алгоритмічну задачу, не для проду.</li>
    <li><strong>Великі списки в UI:</strong> не сортуй у кожному рендері — <code>useMemo</code>, бо O(n log n) на кожен рендер б'є по перфу.</li>
    <li><strong>Справді великі датасети</strong> — сортуй на бекенді / в БД (індекси), не тягни все на клієнт.</li>
    <li><strong>Derived state:</strong> відсортований список — похідні дані; рахуй під час рендеру чи в селекторі, не зберігай окремо в state (нема розсинхрону).</li>
  </ul>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Відсортований список як derived-дані',
          code: `const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.price - b.price),
  [items],
);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Пастки <span class="tag tag-pit">PIT</span></h3>
  <ul class="list">
    <li><strong><code>[3, 10, 2].sort()</code> без компаратора</strong> → лексикографічно (топ-помилка).</li>
    <li><strong><code>sort()</code> мутує</strong> → у React копіюй (<code>[...arr]</code> / <code>toSorted</code>).</li>
    <li><strong>Компаратор повертає boolean</strong> (<code>a &gt; b</code>) замість числа → некоректний, залежний від движка результат. Треба <code>a - b</code>.</li>
    <li><strong>Рядки через <code>&lt;</code></strong> замість <code>localeCompare</code> / <code>Intl.Collator</code> → баги з локалями й регістром.</li>
    <li><strong>Сортування в рендері без <code>useMemo</code></strong> → зайва робота щорендер.</li>
  </ul>
  <div class="alert alert-good"><span class="icon">💬</span> <span><strong>Як подати на співбесіді:</strong> «У проді — <code>Array.sort</code> з компаратором, <code>localeCompare</code> / <code>Intl.Collator</code> для багатомовних списків, immutable через <code>toSorted</code> або копію для React-стану. Знаю, що вбудований sort — стабільний TimSort за O(n log n), розумію нижню межу comparison sort і коли доречні radix / counting. Великі UI-списки мемоізую, а справді великі датасети сортую на бекенді — це частина роботи над рендер-перформансом».</span></div>`,
        },
      ],
    },

    /* ============ Searching ============ */
    {
      id: 'searching',
      title: '🔍 Алгоритми пошуку',
      interviewQuestions: [
        {
          question: "Чому <code>a.filter(x =&gt; b.includes(x))</code> — це прихований O(n²), і як переписати за O(n)?",
          answer: "<code>includes</code> / <code>indexOf</code> / <code>find</code> — <strong>лінійні</strong>: кожен виклик проходить масив <code>b</code> заново. Усередині <code>filter</code> по <code>a</code> це дає O(n·m) ≈ O(n²). Фікс — один раз побудувати хеш-індекс: <code>const set = new Set(b)</code> (O(m)), далі <code>a.filter(x =&gt; set.has(x))</code> — кожна перевірка O(1) амортизовано, разом O(n + m). Ціна — O(m) додаткової пам'яті, що майже завжди виправдано, якщо перевірок багато.",
        },
        {
          question: "Які передумови й типові помилки класичного binary search? Чому умова циклу — <code>low &lt;= high</code>?",
          answer: "Передумова — дані <strong>відсортовані</strong>; на несортованих результат просто неправильний (сортувати заради одного пошуку — O(n log n), гірше за лінійний O(n); виправдано лише для багатьох запитів). При закритому інтервалі <code>[low, high]</code> умова <code>low &lt;= high</code> потрібна, бо коли <code>low === high</code> ще лишається один непереглянутий елемент — з <code>&lt;</code> його пропустиш. Інші класичні баги: <code>low = mid</code> замість <code>mid + 1</code> (нескінченний цикл) і overflow у <code>(low + high) / 2</code> у мовах з фіксованими int — безпечно <code>low + ((high - low) &gt;&gt; 1)</code>.",
        },
        {
          question: "Що таке lower bound і «binary search on answer»? Наведіть приклад, де пошук іде не по масиву.",
          answer: "<strong>Lower bound</strong> — перший індекс, де <code>arr[i] &gt;= target</code> (точка вставки зі збереженням порядку); напіввідкритий інтервал <code>[low, high)</code> і <code>while (low &lt; high)</code>. Через нього рахують first/last occurrence і кількість елементів у діапазоні. <strong>Binary search on answer</strong> — шукаємо мінімальне/максимальне <em>значення відповіді</em>, для якого монотонний предикат <code>ok(x)</code> стає істинним: мінімальна швидкість, щоб з'їсти банани за h годин (Koko), мінімальна місткість, щоб доставити вантажі за d днів. Складність — O(log(діапазон) · вартість <code>ok</code>).",
        },
        {
          question: "DFS чи BFS: коли що обирати, чому BFS гарантує найкоротший шлях і навіщо графу <code>visited</code>?",
          answer: "<strong>BFS</strong> (черга) обходить рівнями, тож перше досягнення вузла відбувається мінімальною кількістю ребер — звідси гарантія найкоротшого шляху в <em>незваженому</em> графі; ціна — пам'ять O(ширина). <strong>DFS</strong> (рекурсія/стек) — O(висота) пам'яті, природний для «відвідати все», шляхів, backtracking, топосорту, але на дуже глибоких структурах рекурсія ризикує stack overflow. У дереві кожен вузол має одного батька, а в графі є цикли й кілька шляхів до вузла — без <code>Set</code> відвіданих обхід зациклиться або обробить вузол багато разів. Для зважених графів BFS не підходить — потрібен Dijkstra.",
        },
      ],
      blocks: [
        {
          kind: 'paragraph',
          html: `<p>Три рівні: <strong>(A)</strong> вбудовані методи JS і їхня складність — те, що реально пишуть у проді; <strong>(B)</strong> базові алгоритми — linear, binary, hash; <strong>(C)</strong> обхід дерев і графів — DFS / BFS.</p>
  <h3 class="topic">A · Вбудовані методи пошуку <span class="tag tag-key">KEY</span></h3>
  <div class="table-wrap">
    <table>
      <tr><th>Метод</th><th>Повертає</th><th>Складність</th><th>Нотатки</th></tr>
      <tr><td><code>arr.indexOf(x)</code></td><td>індекс або -1</td><td><strong>O(n)</strong></td><td>строге <code>===</code>, не знаходить <code>NaN</code></td></tr>
      <tr><td><code>arr.includes(x)</code></td><td>boolean</td><td><strong>O(n)</strong></td><td>знаходить <code>NaN</code> (SameValueZero)</td></tr>
      <tr><td><code>arr.find(fn)</code> / <code>findIndex(fn)</code></td><td>елемент / індекс</td><td><strong>O(n)</strong></td><td>за предикатом</td></tr>
      <tr><td><code>findLast</code> / <code>findLastIndex</code></td><td>з кінця</td><td><strong>O(n)</strong></td><td>ES2023</td></tr>
      <tr><td><code>Set.has(x)</code></td><td>boolean</td><td><strong>O(1)</strong></td><td>хеш-lookup</td></tr>
      <tr><td><code>Map.get(k)</code> / <code>Map.has(k)</code></td><td>значення / boolean</td><td><strong>O(1)</strong></td><td>хеш-lookup</td></tr>
      <tr><td><code>obj[key]</code></td><td>значення</td><td><strong>O(1)</strong></td><td>хеш-lookup</td></tr>
    </table>
  </div>
  <div class="alert"><span class="icon">🎯</span> <span><strong>Головний Senior-інсайт:</strong> O(n)-lookup усередині циклу = <strong>O(n²)</strong>. Якщо належність перевіряється багато разів — один раз конвертуй у <code>Set</code> / <code>Map</code> (O(n)), далі кожна перевірка O(1).</span></div>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'Прихований O(n²) → O(n) через Set; тонкість indexOf vs includes',
          code: `// ❌ O(n²) — includes лінійний, і він усередині filter
const common = arr.filter(x => otherArr.includes(x));

// ✅ O(n) — Set дає O(1) lookup
const set = new Set(otherArr);
const common2 = arr.filter(x => set.has(x));

[NaN].indexOf(NaN);  // -1   (===, а NaN !== NaN)
[NaN].includes(NaN); // true (SameValueZero)`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">B · Linear Search</h3>
  <p>Прохід по кожному елементу до збігу. Працює на <strong>будь-яких</strong> (несортованих) даних. <strong>Time</strong> O(n), <strong>Space</strong> O(1) — саме це роблять <code>indexOf</code> / <code>find</code> під капотом.</p>
  <h3 class="topic">B · Binary Search <span class="tag tag-key">KEY</span></h3>
  <p>Працює <strong>тільки на відсортованому</strong> масиві: щокроку відкидає половину діапазону. <strong>Time</strong> O(log n), <strong>Space</strong> O(1) ітеративно / O(log n) рекурсивно.</p>
  <ul class="list">
    <li><strong>Передумова:</strong> сортованість. Якщо даних не відсортовано — sort O(n log n) + пошук O(log n) виправдані лише при <em>багатьох</em> пошуках.</li>
    <li><strong><code>while (low &lt;= high)</code></strong> — саме <code>&lt;=</code> для закритого інтервалу, інакше пропустиш останній елемент.</li>
    <li><strong>Overflow-safe mid:</strong> <code>low + ((high - low) &gt;&gt; 1)</code> — у JS не критично, але в Java/C++ це баг; згадка — сигнал досвіду.</li>
  </ul>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'Linear, binary search і lower bound (точка вставки)',
          code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;          // закритий інтервал [low, high]
  while (low <= high) {
    const mid = low + ((high - low) >> 1);     // overflow-safe
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;      // шукаємо праворуч
    else high = mid - 1;                       // шукаємо ліворуч
  }
  return -1;
}

// Lower bound — перший індекс, де arr[i] >= target
function lowerBound(arr, target) {
  let low = 0, high = arr.length;              // напіввідкритий [low, high)
  while (low < high) {
    const mid = (low + high) >> 1;
    if (arr[mid] < target) low = mid + 1;
    else high = mid;
  }
  return low;
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Варіації binary search (часті follow-up)</h3>
  <ul class="list">
    <li><strong>First / last occurrence</strong> при дублікатах — не зупинятися на першому збігу, а продовжити в потрібний бік (або lower/upper bound).</li>
    <li><strong>Insertion point</strong> (lower / upper bound) — куди вставити, зберігши порядок; у <code>Array.prototype</code> такого методу немає.</li>
    <li><strong>Search in rotated sorted array</strong> — класика LeetCode: на кожному кроці одна з половин гарантовано відсортована.</li>
    <li><strong>Binary search on answer</strong> — шукаємо не в масиві, а мінімальне/максимальне значення, що задовольняє монотонну умову («мінімальна швидкість», «мінімальна місткість»).</li>
  </ul>
  <h3 class="topic">B · Hash-based search — найшвидший на практиці</h3>
  <p><code>Set</code> / <code>Map</code> / об'єкт дають <strong>O(1)</strong> амортизовано через хешування. Формально це структура даних, а не «алгоритм пошуку», але саме так у фронтенді шукають найчастіше. <strong>Trade-off:</strong> O(1) пошук ціною O(n) пам'яті на індекс — майже завжди виправдано, якщо шукаєш багато разів.</p>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'Індекс за ключем: O(n) побудова, далі O(1) пошук',
          code: `const byId = new Map(users.map(u => [u.id, u])); // O(n) один раз
byId.get(42);                                      // O(1)`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">C · Обхід дерев і графів</h3>
  <p>Релевантно і для фронтенду: DOM-дерево, вкладені коментарі, file explorer, дерева роутів і меню, JSON-структури.</p>
  <p><strong>DFS (Depth-First)</strong> — іде якомога глибше, потім backtrack; рекурсія або явний стек. Порядки для бінарних дерев: <strong>pre-order</strong> (корінь → ліво → право), <strong>in-order</strong> (ліво → корінь → право — дає відсортований порядок для BST), <strong>post-order</strong> (ліво → право → корінь).</p>
  <p><strong>BFS (Breadth-First)</strong> — рівень за рівнем через <strong>чергу</strong> (FIFO). Use case: найкоротший шлях у незваженому графі, «усі вузли на глибині k».</p>
  <div class="table-wrap">
    <table>
      <tr><th></th><th>DFS</th><th>BFS</th></tr>
      <tr><td>Структура</td><td>стек / рекурсія</td><td>черга</td></tr>
      <tr><td>Пам'ять</td><td>O(висота)</td><td>O(ширина) — може бути велика</td></tr>
      <tr><td>Найкоротший шлях (unweighted)</td><td>❌ не гарантує</td><td>✅ гарантує</td></tr>
      <tr><td>Глибокі дерева</td><td>ризик stack overflow (рекурсія)</td><td>безпечніше</td></tr>
      <tr><td>Широкі дерева</td><td>ощадливіше по пам'яті</td><td>багато пам'яті</td></tr>
    </table>
  </div>
  <div class="alert"><span class="icon">🎯</span> <span>Найкоротший шлях у <strong>незваженому</strong> графі → <strong>BFS</strong>. «Відвідати все» / глибокі структури → <strong>DFS</strong>. <strong>Зважений</strong> граф → <strong>Dijkstra</strong> (priority queue, невід'ємні ваги); <strong>A*</strong> = Dijkstra + евристика (навігація, ігри).</span></div>`,
        },
        {
          kind: 'code',
          language: 'javascript',
          caption: 'DFS / BFS по дереву і DFS по графу з visited-set',
          code: `// DFS — рекурсивно (дерево компонентів, вкладені коментарі)
function dfs(node, visit) {
  visit(node);
  for (const child of node.children ?? []) dfs(child, visit);
}

// BFS — черга; індекс-вказівник замість shift() (shift — O(n))
function bfs(root, visit) {
  const queue = [root];
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    visit(node);
    queue.push(...(node.children ?? []));
  }
}

// Граф (на відміну від дерева) потребує visited — інакше нескінченний цикл
function dfsGraph(node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const next of node.neighbors) dfsGraph(next, visited);
}`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Практичні frontend-кейси</h3>
  <ul class="list">
    <li><strong>Autocomplete / search UI:</strong> <code>filter</code> — O(n); для великих даних — індекс (<code>Map</code> за префіксом) або <strong>Trie</strong>; для справді великих — серверний пошук (Elasticsearch).</li>
    <li><strong>Debounce</strong> на інпуті — не шукати на кожну літеру; плюс захист від race condition (скасувати застарілий запит).</li>
    <li><strong>Знайти вузол у дереві</strong> (коментарі, меню, DOM) — DFS.</li>
    <li><strong>Fuzzy search</strong> — бібліотеки на кшталт Fuse.js (на інтерв'ю не пишуть, але знати варто).</li>
    <li><strong>Мемоізація</strong> дорогих фільтрів у рендері — <code>useMemo</code>.</li>
  </ul>`,
        },
        {
          kind: 'code',
          language: 'tsx',
          caption: 'Фільтр списку без перерахунку на кожен рендер',
          code: `const filtered = useMemo(
  () => items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())),
  [items, query],
);`,
        },
        {
          kind: 'paragraph',
          html: `<h3 class="topic">Пастки <span class="tag tag-pit">PIT</span></h3>
  <ul class="list">
    <li><strong><code>includes</code> / <code>indexOf</code> у циклі</strong> → приховане O(n²); заміни на <code>Set</code>.</li>
    <li><strong>Binary search на несортованому</strong> → невірний результат (передумова!).</li>
    <li><strong><code>while (low &lt; high)</code> замість <code>&lt;=</code></strong> у класичному (закритому) binary search → пропуск елемента.</li>
    <li><strong>Рекурсивний DFS на дуже глибокому дереві</strong> → stack overflow; ітеративний варіант зі стеком.</li>
    <li><strong>Обхід графа без <code>visited</code></strong> → нескінченний цикл.</li>
    <li><strong><code>queue.shift()</code> у BFS</strong> — O(n) на великих масивах; індекс-вказівник або справжня deque.</li>
  </ul>
  <div class="alert alert-good"><span class="icon">💬</span> <span><strong>Як подати на співбесіді:</strong> «У фронтенді пошук — це переважно <code>Set</code>/<code>Map</code> для O(1) замість <code>includes</code> у циклі та <code>filter</code>/<code>find</code> для UI. Binary search руками пишу рідко, але знаю передумову (сортованість) і варіації. DFS/BFS застосовую для вкладених структур — коментарі, меню, JSON, file explorer. Для великих списків — debounce, <code>useMemo</code>, а для справді великих даних — серверний пошук».</span></div>`,
        },
      ],
    },
  ],
}
