# Методи сортування (Sorting)

> Senior+ рівень. Пояснення українською, код і терміни англійською.
> Дві частини: (A) практика — `Array.prototype.sort()` у JS; (B) теорія алгоритмів для інтерв'ю.

---

# ЧАСТИНА A — `Array.prototype.sort()` (практика, must-know)

## 1. Головна пастка: сортування за замовчуванням — лексикографічне

```js
[10, 1, 2, 20, 3].sort();
// ❌ [1, 10, 2, 20, 3] — НЕ числове!
```

**Чому:** без компаратора `sort()` конвертує елементи в **рядки** і порівнює за Unicode-кодами. `'10' < '2'`, бо `'1' < '2'`.

**Фікс — завжди передавай comparator для чисел:**
```js
[10, 1, 2, 20, 3].sort((a, b) => a - b);  // ✅ [1, 2, 3, 10, 20] за зростанням
[10, 1, 2, 20, 3].sort((a, b) => b - a);  // за спаданням
```

> 🎯 Це топ-питання на "чи знаєш ти JS": числа без компаратора сортуються як рядки. Мастхев.

## 2. Як працює comparator

```js
arr.sort((a, b) => {
  // return < 0  → a йде ПЕРЕД b
  // return > 0  → a йде ПІСЛЯ b
  // return 0    → порядок не змінюється (для стабільного sort)
});
```

## 3. `sort()` мутує масив (in-place!)

```js
const arr = [3, 1, 2];
const sorted = arr.sort((a, b) => a - b);
arr === sorted;   // true — той самий масив, мутований!
```

**Наслідок для React:** ніколи не сортуй state напряму — це мутація:
```js
// ❌ мутує state
setItems(items.sort(...));
// ✅ копія перед сортуванням
setItems([...items].sort(...));
// або сучасне (ES2023) — не мутує:
setItems(items.toSorted((a, b) => a - b));
```

> 💡 **`toSorted()`** (ES2023) — immutable-версія, повертає новий масив. Разом із `toReversed`, `toSpliced`, `with`. Знання цього — сигнал, що ти стежиш за сучасним JS.

## 4. Стабільність (stable sort)

**Stable sort** — елементи з однаковим ключем зберігають відносний порядок. З ES2019 `Array.prototype.sort` **гарантовано стабільний** у всіх движках.

Навіщо: multi-level сортування (спершу за іменем, потім за віком — однакові віки лишаються в порядку за іменем):
```js
users
  .sort((a, b) => a.name.localeCompare(b.name))  // 2nd key
  .sort((a, b) => a.age - b.age);                 // 1st key (стабільно зберігає name-порядок)
```

## 5. Сортування рядків — `localeCompare` (не `<`)

```js
['ä', 'z', 'a'].sort();                    // ❌ неправильно для не-ASCII/локалей
['ä', 'z', 'a'].sort((a, b) => a.localeCompare(b));  // ✅ коректно за локаллю

// З опціями (регістронезалежно, локаль):
arr.sort((a, b) => a.localeCompare(b, 'uk', { sensitivity: 'base' }));
```
Для великих масивів рядків — **`Intl.Collator`** (швидше, ніж localeCompare щоразу):
```js
const collator = new Intl.Collator('uk');
arr.sort(collator.compare);
```

## 6. Сортування об'єктів / складні ключі

```js
// за кількома полями
data.sort((a, b) =>
  a.category.localeCompare(b.category) || b.price - a.price  // спершу category, потім price desc
);
```
Патерн `cmp1 || cmp2 || cmp3` — типовий для multi-key: перший ненульовий результат вирішує.

## 7. Складність `sort()`

- **Time:** O(n log n) в середньому і найгіршому.
- **Space:** залежить від движка (V8 використовує **TimSort** — гібрид merge+insertion, стабільний).

---

# ЧАСТИНА B — Алгоритми сортування (теорія для інтерв'ю)

## 8. Порівняльна таблиця (must-know)

| Алгоритм | Avg time | Worst | Space | Stable | Ідея |
|---|---|---|---|---|---|
| **Bubble Sort** | O(n²) | O(n²) | O(1) | ✅ | сусідні swap'и, "спливання" |
| **Selection Sort** | O(n²) | O(n²) | O(1) | ❌ | шукати мінімум, ставити на місце |
| **Insertion Sort** | O(n²) | O(n²) | O(1) | ✅ | вставляти в відсортовану частину; швидкий на малих/майже-сортованих |
| **Merge Sort** | O(n log n) | O(n log n) | **O(n)** | ✅ | divide & conquer, злиття |
| **Quick Sort** | O(n log n) | **O(n²)** | O(log n) | ❌ | pivot + partition |
| **Heap Sort** | O(n log n) | O(n log n) | O(1) | ❌ | binary heap |
| **TimSort** | O(n log n) | O(n log n) | O(n) | ✅ | merge+insertion гібрид (V8, Python) |
| **Counting/Radix** | O(n + k) | O(n + k) | O(n+k) | ✅ | без порівнянь, для цілих/обмеженого діапазону |

## 9. Ключові інсайти (що питають)

### Чому O(n log n) — межа для comparison sort?
Будь-яке сортування **на основі порівнянь** не може бути швидшим за **O(n log n)** у найгіршому — це доведена нижня межа (дерево рішень має n! листків, глибина ≥ log(n!) ≈ n log n).

### Як обійти O(n log n)?
**Non-comparison sorts** (Counting, Radix, Bucket) — O(n) для цілих/обмеженого діапазону, бо не порівнюють, а розкладають по "відрах". Ціна: працюють лише для специфічних даних (цілі, обмежений діапазон).

### Merge vs Quick
- **Merge:** гарантований O(n log n), стабільний, але O(n) додаткової пам'яті. Добре для linked lists і зовнішнього сортування.
- **Quick:** швидший на практиці (кеш-friendly, in-place), але O(n²) у найгіршому (поганий pivot). Фікс: рандомний/median-of-three pivot.

### Insertion sort — коли він кращий за O(n log n)?
На **малих** масивах і **майже відсортованих** даних — O(n) у кращому випадку. Тому TimSort використовує insertion для малих під-масивів.

## 10. Розібраний приклад — Quick Sort

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr;           // база рекурсії
  const [pivot, ...rest] = arr;              // pivot = перший (краще рандомний)
  const left = rest.filter(x => x < pivot);
  const right = rest.filter(x => x >= pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```
> ⚠️ Цей варіант читабельний, але не in-place (O(n) пам'ять через spread/filter). На інтерв'ю проговори: "для production — in-place partition, рандомний pivot, щоб уникнути O(n²)".

## 11. Розібраний приклад — Merge Sort

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    a[i] <= b[j] ? result.push(a[i++]) : result.push(b[j++]);
  }
  return [...result, ...a.slice(i), ...b.slice(j)];
}
```
**Complexity:** O(n log n) time, O(n) space. Стабільний.

---

## 12. Практичні поради для frontend-задач

- **99% часу — вбудований `sort()` з компаратором.** Реалізацію алгоритмів руками просять як алгоритмічну задачу, не для прода.
- **Великі списки в UI:** не сортуй у рендері щоразу — мемоізуй (`useMemo`), бо O(n log n) на кожен рендер б'є по перфу.
- **Серверне сортування:** для великих датасетів сортуй на бекенді/в БД (індекси), не тягни все на клієнт.
- **Derived state:** відсортований список — це **derived** дані, рахуй під час рендеру/в селекторі, не зберігай окремо в state (уникаєш розсинхрону).

```jsx
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.price - b.price),
  [items]
);
```

## 13. Пастки (чеклист помилок)

- `[3,10,2].sort()` без компаратора → лексикографічно (топ-помилка).
- `sort()` мутує → в React копіюй (`[...arr]` / `toSorted`).
- Comparator, що повертає `boolean` (`a > b`) замість числа → нестабільна/некоректна поведінка. Треба `a - b`.
- Порівняння рядків через `<` замість `localeCompare` → баги з локалями/регістром.
- Сортування у рендері без `useMemo` → зайва робота щорендер.

---

## 14. Твій контекст (як подати)

- **Практичний фокус:** "У проді — `Array.sort` з компаратором, `localeCompare`/`Intl.Collator` для i18n-списків (у мене 10+ мов на Marketplace — сортування назв за локаллю було реальним кейсом). Immutable через `toSorted`/копію для React-стану."
- **Big-O:** "Розумію, що вбудований sort це O(n log n) TimSort стабільний; знаю межу comparison sort і коли non-comparison (radix/counting) доречні."
- **Perf:** "Сортування великих UI-списків мемоізую, а для справді великих датасетів — на бекенді/в БД. Це частина мого фокусу на Core Web Vitals і рендер-перформансі."

---

## ✅ Чеклист "знаю тему на Senior"

- [ ] `sort()` без компаратора = лексикографічно (числа ламаються)
- [ ] Comparator: <0 / >0 / 0, `a - b` для чисел
- [ ] `sort()` мутує in-place → копія/`toSorted` для React
- [ ] Stable sort гарантований з ES2019; multi-key сортування
- [ ] Рядки: `localeCompare` / `Intl.Collator`, не `<`
- [ ] TimSort у V8 (O(n log n), стабільний)
- [ ] Таблиця алгоритмів: bubble/selection/insertion/merge/quick/heap
- [ ] O(n log n) — нижня межа comparison sort + чому
- [ ] Non-comparison (counting/radix) — O(n), коли доречні
- [ ] Merge vs Quick trade-offs (пам'ять vs швидкість, worst case)
- [ ] React: derived + useMemo, не сортувати state напряму
