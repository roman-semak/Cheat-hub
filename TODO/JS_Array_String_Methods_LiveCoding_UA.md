# JavaScript: методи Array та String (для live coding)

> Senior+ рівень. Пояснення українською, код і терміни англійською.
> Фокус: що реально треба на технічній live coding співбесіді.
> ⚠️ Позначки: **MUT** = мутує оригінал; **NEW** = повертає новий (immutable).

---

# ЧАСТИНА A — ARRAYS

## 1. Додати / прибрати елементи (must-know)

### Кінець масиву
```js
arr.push(x);        // MUT — додати в КІНЕЦЬ, повертає нову довжину
arr.push(a, b, c);  // можна кілька
arr.pop();          // MUT — прибрати з КІНЦЯ, повертає видалений елемент
```

### Початок масиву
```js
arr.unshift(x);     // MUT — додати на ПОЧАТОК, повертає нову довжину
arr.shift();        // MUT — прибрати з ПОЧАТКУ, повертає видалений елемент
```

> ⚠️ `shift`/`unshift` — **O(n)** (зсув усіх елементів). `push`/`pop` — **O(1)**. На великих масивах уникай частих shift.

### Immutable-версії (для React-стану)
```js
// додати в кінець
const next = [...arr, x];
// додати на початок
const next = [x, ...arr];
// прибрати з кінця
const next = arr.slice(0, -1);
// прибрати з початку
const next = arr.slice(1);
```

---

## 2. `splice` — універсальне додавання/видалення/заміна (MUT)

`splice(start, deleteCount, ...itemsToAdd)` — найпотужніший, мутує:

```js
const arr = [1, 2, 3, 4, 5];

arr.splice(1, 2);           // видалити 2 елементи з індексу 1 → arr = [1, 4, 5]
arr.splice(1, 0, 'a', 'b'); // вставити без видалення → [1, 'a', 'b', 4, 5]
arr.splice(1, 1, 'x');      // замінити 1 елемент → [1, 'x', ...]
arr.splice(-1, 1);          // видалити останній
```
Повертає масив **видалених** елементів.

### `slice` — витягти частину (NEW, не мутує!) — не плутати зі splice
```js
arr.slice(1, 3);    // NEW — елементи [1..3), НЕ включаючи 3
arr.slice(-2);      // останні 2
arr.slice();        // поверхнева копія всього масиву
```
> 🎯 Часта плутанина: **slice** = NEW (копія частини), **splice** = MUT (вирізає/вставляє). Запам'ятай: spliCe з "C" = Copy.

### `toSpliced` (ES2023) — immutable splice (NEW)
```js
const next = arr.toSpliced(1, 2);  // як splice, але повертає новий масив
```

---

## 3. Трансформація (усі NEW — не мутують)

```js
arr.map(x => x * 2);              // трансформувати кожен → новий масив
arr.filter(x => x > 2);          // залишити ті, що проходять предикат
arr.reduce((acc, x) => acc + x, 0); // згорнути в одне значення
arr.reduceRight(...);            // reduce з кінця
arr.flat();                       // розплющити на 1 рівень
arr.flat(Infinity);               // повністю розплющити вкладені
arr.flatMap(x => [x, x * 2]);    // map + flat(1) за один прохід
```

### `reduce` — детально (часто на співбесіді)
```js
// сума
[1,2,3].reduce((acc, x) => acc + x, 0);           // 6
// групування (groupBy патерн)
words.reduce((acc, w) => {
  const key = w[0];
  (acc[key] ??= []).push(w);   // ??= — якщо нема ключа, створити масив
  return acc;
}, {});
// підрахунок частот
arr.reduce((acc, x) => { acc[x] = (acc[x] || 0) + 1; return acc; }, {});
```

---

## 4. Пошук (див. окрему шпаргалку по search)

```js
arr.indexOf(x);          // O(n), індекс або -1 (===, не знаходить NaN)
arr.lastIndexOf(x);      // з кінця
arr.includes(x);         // O(n), boolean (знаходить NaN)
arr.find(fn);            // перший елемент за предикатом або undefined
arr.findIndex(fn);       // індекс за предикатом або -1
arr.findLast(fn);        // ES2023 — з кінця
arr.findLastIndex(fn);   // ES2023
arr.some(fn);            // чи хоч один проходить → boolean
arr.every(fn);           // чи всі проходять → boolean
```

---

## 5. Сортування та реверс (див. окрему шпаргалку по sorting)

```js
arr.sort((a, b) => a - b);   // MUT! числа за зростанням (без компаратора = лексикографічно!)
arr.reverse();               // MUT — розвернути
arr.toSorted((a,b) => a-b);  // NEW (ES2023) — immutable sort
arr.toReversed();            // NEW (ES2023) — immutable reverse
```
> ⚠️ `sort`/`reverse` **мутують** → для React копіюй: `[...arr].sort(...)` або `toSorted`.

---

## 6. Об'єднання та перетворення

```js
arr.concat(other);         // NEW — з'єднати масиви
[...arr1, ...arr2];        // те саме через spread
arr.join('-');             // → рядок "1-2-3"
arr.fill(0);               // MUT — заповнити значенням
arr.fill(0, 1, 3);         // заповнити з індексу 1 до 3
arr.at(-1);                // останній елемент (ES2022, підтримує від'ємні)
arr.with(1, 'x');          // NEW (ES2023) — копія із заміною індексу 1
```

---

## 7. Ітерація

```js
arr.forEach((x, i) => ...);      // побічні ефекти (не повертає нічого)
for (const x of arr) { ... }      // значення (можна break/continue)
for (const [i, x] of arr.entries()) { ... }  // індекс + значення
arr.keys();    // ітератор індексів
arr.values();  // ітератор значень
```
> 💡 `forEach` не можна перервати (`break` не працює); для дострокового виходу — `for...of` або `some`.

---

## 8. Створення масивів

```js
Array.from({ length: 5 }, (_, i) => i);   // [0,1,2,3,4] — генерація
Array.from('abc');                          // ['a','b','c'] — з iterable
Array.from(new Set([1,1,2]));               // [1,2] — dedupe через Set
Array.of(1, 2, 3);                          // [1,2,3]
Array(5).fill(0);                           // [0,0,0,0,0]
[...Array(5).keys()];                       // [0,1,2,3,4]
```

---

## 9. Корисні патерни (часто на співбесіді)

```js
// Dedupe (унікальні)
[...new Set(arr)];

// Перетин двох масивів (O(n) через Set)
const set = new Set(arr2);
arr1.filter(x => set.has(x));

// Max/Min
Math.max(...arr);  Math.min(...arr);

// Сума
arr.reduce((a, b) => a + b, 0);

// Chunk (розбити на групи по n)
const chunk = (arr, n) =>
  Array.from({ length: Math.ceil(arr.length / n) },
    (_, i) => arr.slice(i * n, i * n + n));

// Плоский масив → Map за ключем
new Map(users.map(u => [u.id, u]));

// Перевернути пари (object entries)
Object.entries(obj);   // [[k, v], ...]
Object.fromEntries(pairs);  // назад в об'єкт
```

---

# ЧАСТИНА B — STRINGS

> ⚠️ Рядки в JS **immutable** — усі методи повертають **новий** рядок, оригінал не змінюється.

## 10. Доступ і довжина

```js
str.length;          // довжина
str[0];              // символ за індексом
str.at(-1);          // останній (ES2022, від'ємні індекси)
str.charAt(0);       // символ (старіший спосіб)
str.charCodeAt(0);   // код символу (напр. 'A' → 65)
String.fromCharCode(65);  // '65' → 'A'
str.codePointAt(0);  // для emoji/Unicode поза BMP
```

---

## 11. Пошук у рядку

```js
str.includes('ab');       // boolean
str.indexOf('ab');        // індекс або -1
str.lastIndexOf('ab');    // з кінця
str.startsWith('ab');     // boolean
str.endsWith('ab');       // boolean
str.match(/regex/);       // збіги з regex
str.matchAll(/regex/g);   // усі збіги (ітератор)
str.search(/regex/);      // індекс першого regex-збігу
```

---

## 12. Витяг частини

```js
str.slice(1, 4);        // [1..4) — підтримує від'ємні (як в масиві)
str.slice(-3);          // останні 3 символи
str.substring(1, 4);    // схоже, але НЕ підтримує від'ємні (стає 0)
str.substr(1, 3);       // (deprecated) з індексу 1, довжина 3
```
> 💡 Використовуй **`slice`** — найпередбачуваніший (від'ємні індекси, консистентний з масивами).

---

## 13. Трансформація

```js
str.toUpperCase();  str.toLowerCase();
str.trim();         // прибрати пробіли з обох боків
str.trimStart();  str.trimEnd();
str.padStart(5, '0');   // '42' → '00042'
str.padEnd(5, '.');     // '42' → '42...'
str.repeat(3);          // 'ab' → 'ababab'
str.replace('a', 'b');       // замінити ПЕРШЕ входження
str.replace(/a/g, 'b');      // усі (з flag g)
str.replaceAll('a', 'b');    // усі (ES2021, без regex)
```

---

## 14. Розбиття та об'єднання (критично для алгоритмів)

```js
str.split('');       // → масив символів ['a','b','c']
str.split(' ');      // → масив слів
str.split(',');      // → за роздільником
arr.join('');        // масив → рядок назад
str.split('').reverse().join('');  // РЕВЕРС рядка (класика)
```

> 🎯 Патерн `split → обробити як масив → join` — основа багатьох string-задач (реверс, anagram, паліндром).

---

## 15. Часті string-патерни (live coding)

```js
// Реверс рядка
str.split('').reverse().join('');
[...str].reverse().join('');  // spread коректніше для Unicode/emoji

// Паліндром
const isPalindrome = s => s === s.split('').reverse().join('');

// Підрахунок символів (частоти)
[...str].reduce((acc, ch) => { acc[ch] = (acc[ch]||0)+1; return acc; }, {});

// Anagram check (сортування)
const key = s => s.split('').sort().join('');
key('listen') === key('silent');  // true

// Перша унікальна літера
[...str].find(ch => str.indexOf(ch) === str.lastIndexOf(ch));

// Capitalize
str.charAt(0).toUpperCase() + str.slice(1);

// Title case
str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

// Прибрати не-літери (для паліндром-задач)
str.toLowerCase().replace(/[^a-z0-9]/g, '');

// Порахувати слова
str.trim().split(/\s+/).length;
```

---

## 16. Template literals (сучасний рядок)

```js
const name = 'Roman';
`Hi, ${name}!`;                 // інтерполяція
`Line1\nLine2`;                 // багаторядковий
`Sum: ${1 + 2}`;                // вирази всередині
```

---

## 17. Число ↔ рядок (часто треба)

```js
// Рядок → число
Number('42');       parseInt('42px', 10);   parseFloat('3.14');
+'42';              // унарний плюс — швидко
// Число → рядок
String(42);         (42).toString();        `${42}`;
(255).toString(16); // → 'ff' (у 16-й системі)
(3.14159).toFixed(2); // → '3.14'
```

---

# ЧАСТИНА C — ШВИДКИЙ ДОВІДНИК MUT vs NEW

## Мутують оригінал (обережно в React!)
```
Array:  push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin
String: (жоден — рядки immutable)
```

## Повертають новий (безпечні)
```
Array:  map, filter, reduce, slice, concat, flat, flatMap,
        toSorted, toReversed, toSpliced, with, join
String: усі методи (slice, replace, toUpperCase, split, trim, pad...)
```

> 🎯 Правило для React: у стані ніколи не використовуй MUT-методи напряму. Копіюй (`[...arr]`) або бери immutable-версії (`toSorted`, `toSpliced`, `with`).

---

## 18. Складність (Big-O) — коротко

| Операція | Складність |
|---|---|
| `push` / `pop` | O(1) |
| `shift` / `unshift` | **O(n)** (зсув) |
| `splice` | O(n) |
| `includes` / `indexOf` / `find` | O(n) |
| `Set.has` / `Map.get` | O(1) |
| `sort` | O(n log n) |
| `map` / `filter` / `reduce` / `forEach` | O(n) |
| доступ за індексом `arr[i]` | O(1) |

---

## ✅ Чеклист "готовий до live coding"

- [ ] push/pop (кінець, O(1)) vs shift/unshift (початок, O(n))
- [ ] splice (MUT, вставка/видалення) vs slice (NEW, копія частини)
- [ ] map/filter/reduce — впевнено, включно з groupBy/частоти через reduce
- [ ] find/some/every/includes
- [ ] sort мутує → копія для React; toSorted (ES2023)
- [ ] dedupe через Set, перетин через Set (O(n))
- [ ] Array.from для генерації і dedupe
- [ ] String immutable — усі методи NEW
- [ ] split → обробка → join (реверс, anagram, паліндром)
- [ ] slice vs substring (від'ємні індекси)
- [ ] replace vs replaceAll, regex з flag g
- [ ] padStart/padEnd, trim, repeat
- [ ] template literals, число↔рядок
- [ ] MUT vs NEW таблиця — знати напам'ять
- [ ] Big-O основних операцій
