# Алгоритми пошуку (Search)

> Senior+ рівень. Пояснення українською, код і терміни англійською.
> Частини: (A) практика — вбудовані методи JS; (B) базові алгоритми (linear/binary); (C) обхід структур (tree/graph).

---

# ЧАСТИНА A — Вбудовані методи пошуку в JS (практика)

## 1. Огляд і складність

| Метод | Що повертає | Складність | Нотатки |
|---|---|---|---|
| `arr.indexOf(x)` | індекс або -1 | **O(n)** | строге `===`, не знаходить `NaN` |
| `arr.includes(x)` | boolean | **O(n)** | знаходить `NaN` (SameValueZero) |
| `arr.find(fn)` | елемент або undefined | **O(n)** | за предикатом |
| `arr.findIndex(fn)` | індекс або -1 | **O(n)** | за предикатом |
| `arr.findLast/findLastIndex` | з кінця | **O(n)** | ES2023 |
| `Set.has(x)` | boolean | **O(1)** | хеш-lookup |
| `Map.get(x)` / `Map.has(x)` | значення/boolean | **O(1)** | хеш-lookup |
| `obj[key]` | значення | **O(1)** | хеш-lookup |

## 2. Головний Senior-інсайт: O(n) lookup у циклі = O(n²)

Найчастіша помилка перформансу (і твоя відома зона зі скрину):

```js
// ❌ O(n²) — includes/indexOf ЛІНІЙНІ, всередині циклу
const result = arr.filter(x => otherArr.includes(x));

// ✅ O(n) — Set дає O(1) lookup
const set = new Set(otherArr);
const result = arr.filter(x => set.has(x));
```

> 🎯 Правило: якщо треба **багато разів** перевіряти належність — конвертуй у `Set`/`Map` один раз (O(n)), далі кожна перевірка O(1). Це перетворює O(n²) на O(n).

## 3. `indexOf` vs `includes` — тонкість із NaN

```js
[NaN].indexOf(NaN);    // -1 ❌ (використовує ===, а NaN !== NaN)
[NaN].includes(NaN);   // true ✅ (SameValueZero)
```

---

# ЧАСТИНА B — Базові алгоритми пошуку

## 4. Linear Search (лінійний)

Прохід по кожному елементу, поки не знайдеш. Працює на **будь-яких** даних (несортованих).

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```
**Time:** O(n). **Space:** O(1). Це те, що роблять `indexOf`/`find` під капотом.

## 5. Binary Search (бінарний) — must-know

Працює **ТІЛЬКИ на відсортованому** масиві. Ділить діапазон навпіл щоразу.

```js
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);  // або low + (high-low)/2 проти overflow
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;       // праворуч
    else high = mid - 1;                         // ліворуч
  }
  return -1;
}
```

**Time:** O(log n). **Space:** O(1) ітеративно / O(log n) рекурсивно.

**Ключові моменти для інтерв'ю:**
- **Передумова:** дані **мають бути відсортовані**. Якщо ні — спершу sort O(n log n), тоді пошук O(log n). Разова сортування виправдана лише при багатьох пошуках.
- **Overflow-safe mid:** `low + Math.floor((high - low) / 2)` (у JS не критично, але в Java/C++ — так; згадка = сигнал).
- **`while (low <= high)`** — `<=`, не `<` (інакше пропустиш елемент).

## 6. Варіації binary search (часті follow-up)

- **Find first/last occurrence** (при дублікатах) — не зупинятись на першому знайденому, продовжити в потрібну сторону.
- **Find insertion point** (lower/upper bound) — де вставити елемент, зберігши порядок (як `Array.prototype` не має, але патерн частий).
- **Search in rotated sorted array** — класична LeetCode-задача, модифікований binary search.
- **Binary search on answer** — коли шукаєш не в масиві, а мінімальне/максимальне значення, що задовольняє умову (напр. "мінімальна швидкість").

```js
// Lower bound — перший індекс, де arr[i] >= target
function lowerBound(arr, target) {
  let low = 0, high = arr.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (arr[mid] < target) low = mid + 1;
    else high = mid;
  }
  return low;
}
```

## 7. Hash-based search (найшвидший)

`Set`/`Map`/object дають **O(1)** амортизовано через хешування. Це не "алгоритм пошуку" в класичному сенсі, а структура даних — але на практиці **основний спосіб** швидкого пошуку у фронтенді.

```js
const byId = new Map(users.map(u => [u.id, u]));  // O(n) побудова
byId.get(42);                                       // O(1) пошук
```

> 💡 Trade-off: O(1) пошук ціною O(n) пам'яті на індекс. Майже завжди виправдано, якщо шукаєш багато разів.

---

# ЧАСТИНА C — Обхід дерев і графів (traversal)

Релевантно для frontend: DOM-дерево, вкладені коментарі, file explorer, роут-дерева, JSON-структури.

## 8. DFS (Depth-First Search) — вглиб

Йде якомога глибше, потім backtrack. Реалізація — рекурсія або стек.

```js
// Рекурсивно (обхід дерева-компонентів / вкладених коментарів)
function dfs(node, visit) {
  visit(node);
  for (const child of node.children ?? []) {
    dfs(child, visit);
  }
}
```
**Порядки для бінарних дерев:** pre-order (корінь→ліво→право), in-order (ліво→корінь→право, дає відсортований для BST), post-order (ліво→право→корінь).

**Use case frontend:** рекурсивний рендер дерева (file explorer), пошук вузла в JSON, обхід DOM.

## 9. BFS (Breadth-First Search) — вширину

Йде рівень за рівнем. Реалізація — **черга (queue)**.

```js
function bfs(root, visit) {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();   // черга (FIFO)
    visit(node);
    queue.push(...(node.children ?? []));
  }
}
```
**Use case:** знайти **найкоротший шлях** (незважений граф), обхід рівнями (напр. "усі елементи на глибині 2").

## 10. DFS vs BFS (порівняння — часте питання)

| | DFS | BFS |
|---|---|---|
| Структура | стек / рекурсія | черга |
| Пам'ять | O(висота) | O(ширина) — може бути велика |
| Найкоротший шлях (unweighted) | ❌ не гарантує | ✅ гарантує |
| Глибокі дерева | ризик stack overflow (рекурсія) | безпечніше |
| Широкі дерева | ощадливіше по пам'яті | багато пам'яті |

> 🎯 Правило: **найкоротший шлях у незваженому графі → BFS**. Просто "відвідати всі" / глибокі структури → DFS. Зважений граф → Dijkstra (не BFS).

## 11. Пошук у графах — коротко про решту

- **Dijkstra** — найкоротший шлях у **зваженому** графі (невід'ємні ваги). Priority queue.
- **A\*** — Dijkstra + евристика (напр. навігація, ігри).
- **Cycle detection / visited-set** — при обході графа (не дерева!) треба `Set` відвіданих, інакше нескінченний цикл.

```js
// Граф потребує visited (на відміну від дерева)
function dfsGraph(node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const next of node.neighbors) dfsGraph(next, visited);
}
```

---

## 12. Практичні frontend-кейси

- **Autocomplete/search UI:** фільтрація списку — O(n) `filter`; для великих даних — індексація (Map за префіксом) або **Trie** для prefix-пошуку; серверний пошук (Elasticsearch) для справді великих.
- **Debounce на пошуку** — не шукати на кожну літеру (твоя тема): debounce + race-condition guard.
- **Знайти вузол у дереві** (коментарі, меню, DOM) — DFS.
- **Fuzzy search** — бібліотеки Fuse.js (не пиши сам на інтерв'ю, але знай, що існує).
- **Мемоізація пошуку** — `useMemo` для дорогих фільтрів у рендері.

```jsx
const filtered = useMemo(
  () => items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())),
  [items, query]
);
```

## 13. Пастки

- **`includes`/`indexOf` у циклі** → приховане O(n²); заміни на `Set` (твоя відома зона).
- **Binary search на несортованому** → невірний результат (передумова!).
- **`while (low < high)` замість `<=`** у стандартному binary search → пропуск елемента.
- **DFS рекурсія на дуже глибокому дереві** → stack overflow; ітеративний варіант зі стеком.
- **Обхід графа без `visited`** → нескінченний цикл.
- **`queue.shift()`** у BFS — O(n) на великих масивах; для перфу — справжня черга/двоконечна (deque) або індекс-покажчик.

---

## 14. Твій контекст (як подати)

- **Практичний фокус:** "У фронтенді пошук — це переважно `Set`/`Map` для O(1) lookup замість `includes` у циклі, і `filter`/`find` для UI. Binary search руками рідко, але розумію передумову (сортованість) і O(log n)."
- **Дерева:** "DFS/BFS застосовував на практиці — обхід вкладених структур (коментарі, меню, JSON), рекурсивний рендер деревовидних UI типу file explorer."
- **Perf:** "Пошук у великих UI-списках — debounce (щоб не шукати на кожну літеру), `useMemo` для дорогих фільтрів, а для справді великих даних — серверний пошук/індексація, не все на клієнті. Це в межах мого фокусу на Core Web Vitals."
- **Твоя зона зростання:** свідомо згадай, що уникаєш прихованого O(n²) через Set — це перетворює відому слабкість зі скрину на демонстрацію обізнаності.

---

## ✅ Чеклист "знаю тему на Senior"

- [ ] Складність вбудованих: indexOf/includes/find O(n), Set/Map O(1)
- [ ] O(n) lookup у циклі = O(n²) → Set/Map фікс
- [ ] indexOf vs includes (NaN, SameValueZero)
- [ ] Linear search O(n) на будь-яких даних
- [ ] Binary search O(log n), ТІЛЬКИ на сортованих, `<=`, overflow-safe mid
- [ ] Варіації: first/last occurrence, lower/upper bound, rotated array
- [ ] Hash-based (Set/Map) — основний спосіб у фронтенді, O(1) ціною O(n) пам'яті
- [ ] DFS (стек/рекурсія) vs BFS (черга)
- [ ] BFS → найкоротший шлях у незваженому графі
- [ ] Граф потребує visited-set (дерево — ні)
- [ ] Dijkstra/A* для зважених — на рівні впізнавання
- [ ] Frontend: DFS для дерев UI, debounce+useMemo для пошуку, Trie/сервер для великих
