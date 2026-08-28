# Технічні задачі для практики — чеклист

> Для підготовки до технічного інтерв'ю (Dashlane / Sigma) · React + JavaScript
> Пріоритет: 🔴 висока ймовірність · 🟡 середня · 🟢 низька (але можливо)
> Практикуй з таймером і вголос (think-out-loud)

---

## A. JavaScript Utilities (реалізуй з нуля)

- [ ] 🔴 **debounce** — базовий + leading/trailing опції
- [ ] 🔴 **throttle** — базовий + trailing; поясни різницю з debounce
- [ ] 🔴 **deepClone** — примітиви, вкладені об'єкти, масиви, Date; edge: циклічні посилання (WeakMap)
- [ ] 🔴 **deepEqual** — глибоке порівняння двох об'єктів
- [ ] 🟡 **EventEmitter** — on / off / emit / once, повертати unsubscribe
- [ ] 🟡 **curry** — каррінг функції довільної арності
- [ ] 🟡 **memoize** — кеш результатів за аргументами
- [ ] 🟡 **once** — функція, що викликається лише раз
- [ ] 🟡 **pipe / compose** — композиція функцій
- [ ] 🟢 **classNames** — утиліта (як бібліотека clsx)
- [ ] 🟢 **get(obj, 'a.b.c')** — доступ по шляху з дефолтом
- [ ] 🟢 **set(obj, 'a.b.c', value)** — запис по шляху

## B. Масиви та рядки

- [ ] 🔴 **groupAnagrams** — групування анаграм (був на скрині!)
- [ ] 🔴 **flatten** — вкладений масив у плоский (рекурсивно + за глибиною)
- [ ] 🟡 **dedupe / unique** — унікальні елементи (Set)
- [ ] 🟡 **chunk** — розбити масив на групи по N
- [ ] 🟡 **groupBy** — згрупувати масив об'єктів за ключем
- [ ] 🟡 **intersection / union / difference** — операції над множинами
- [ ] 🟡 **two-sum** — знайти пару з заданою сумою (Map, O(n))
- [ ] 🟢 **isPalindrome** — перевірка паліндрома
- [ ] 🟢 **reverse string / words** — розворот
- [ ] 🟢 **firstUniqueChar** — перша унікальна літера
- [ ] 🟢 **countOccurrences** — підрахунок частот (Map)

## C. Async / Promises

- [ ] 🔴 **retry with backoff** — повтор із exponential backoff (релевантно MV3)
- [ ] 🟡 **Promise.all** — реалізуй з нуля
- [ ] 🟡 **Promise.allSettled** — з нуля
- [ ] 🟡 **Promise.race** — з нуля
- [ ] 🟡 **promisify** — callback-стиль → Promise
- [ ] 🟡 **promise pool / limit** — паралельне виконання з лімітом concurrency
- [ ] 🟢 **sleep / delay** — Promise-обгортка над setTimeout
- [ ] 🟢 **cancellable promise** — скасовуваний проміс
- [ ] 🟢 **async series / parallel** — послідовне vs паралельне виконання

## D. React Components (machine coding — найважливіше!)

- [ ] 🔴 **Autocomplete / Typeahead** — debounce + async + race guard + cleanup (твоя тема!)
- [ ] 🔴 **Todo list** — add/delete/toggle/filter, іммутабельність, derived state
- [ ] 🔴 **useFetch** — custom hook (idle/loading/success/error), cleanup
- [ ] 🔴 **Modal / Dialog** — Portal, focus trap, Esc-закриття, aria-modal
- [ ] 🟡 **Tabs** — compound component pattern
- [ ] 🟡 **Accordion** — розкривні секції (одна/кілька відкриті)
- [ ] 🟡 **Data table** — сортування, фільтрація, пагінація
- [ ] 🟡 **Star rating** — інтерактивний рейтинг з hover
- [ ] 🟡 **Pagination** — компонент з номерами сторінок
- [ ] 🟡 **Infinite scroll** — Intersection Observer
- [ ] 🟢 **Image carousel** — next/prev, auto-play, індикатори
- [ ] 🟢 **File explorer** — рекурсивне дерево (розкриття вузлів)
- [ ] 🟢 **Progress bar / stepper** — багатокроковий індикатор
- [ ] 🟢 **Toast / notification** — черга нотифікацій з авто-закриттям
- [ ] 🟢 **Debounced search input** — окремо як мінімальний приклад

## E. React Custom Hooks

- [ ] 🔴 **useDebounce** — дебаунс значення
- [ ] 🟡 **useLocalStorage** — синхронізація зі storage (обережно: не для секретів!)
- [ ] 🟡 **usePrevious** — попереднє значення (useRef)
- [ ] 🟡 **useToggle** — булевий перемикач
- [ ] 🟡 **useOnClickOutside** — детект кліку поза елементом
- [ ] 🟢 **useMediaQuery** — реактивний медіа-запит
- [ ] 🟢 **useInterval** — інтервал із коректним cleanup (stale closure!)
- [ ] 🟢 **useIntersectionObserver** — обгортка над IO

## F. React Debugging (code reading — знайди й полагодь баг)

- [ ] 🔴 **Stale closure** в useEffect/setInterval — знайди й виправ
- [ ] 🔴 **Missing dependency** в масиві залежностей
- [ ] 🔴 **Мутація стану** напряму (push замість нового масиву)
- [ ] 🟡 **Missing cleanup** — leak підписки/інтервалу
- [ ] 🟡 **Race condition** в async-фетчі — виправ через guard/AbortController
- [ ] 🟡 **Index як key** у динамічному списку — чому баг
- [ ] 🟢 **Зайві ре-рендери** — де потрібен useMemo/useCallback (діагностика)

## G. DOM / Vanilla JS (рідше для React-ролі)

- [ ] 🟡 **Event delegation** — реалізуй патерн (один listener на батька)
- [ ] 🟢 **querySelector** — власна проста реалізація
- [ ] 🟢 **DOM traversal** — обхід дерева (BFS/DFS)
- [ ] 🟢 **Virtual DOM diff** — спрощений алгоритм (складне, senior)

## H. Frontend System Design (обговорення, не завжди код)

- [ ] 🔴 **Autofill feature / browser extension** — content script ↔ background, security, MV3 (Dashlane-домен!)
- [ ] 🔴 **Secure vault UI** — on-demand розшифровка, віртуалізація, auto-lock
- [ ] 🟡 **Real-time sync UI** — WebSockets, reconnect, conflict resolution (твій домен)
- [ ] 🟡 **Data table architecture** — великі дані, віртуалізація, серверна пагінація
- [ ] 🟡 **Checkout / subscription flow** — стани, 3DS, idempotency
- [ ] 🟢 **Onboarding wizard** — стейт-машина, персист прогресу, аналітика
- [ ] 🟢 **Design system component** — переюзабельний компонент з варіантами

---

## 📅 План практики (пріоритети)

**Спершу закрий усі 🔴 (висока ймовірність):**
1. debounce, throttle, deepClone, deepEqual, groupAnagrams, flatten
2. retry with backoff
3. Autocomplete, Todo, useFetch, Modal, useDebounce
4. React debugging: stale closure, missing deps, мутація стану
5. System design: autofill/extension, vault UI

**Потім 🟡, за наявності часу — 🟢.**

> **Головне правило практики:** розв'язуй **вголос** і **з таймером** (30-45 хв на React-компонент, 15-20 хв на JS-утиліту). Завжди: clarify → підхід словами → код → тест → Big-O. Тренуй саме процес, не тільки результат — його й оцінюють.
