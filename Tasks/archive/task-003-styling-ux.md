# Task 003: Стилізація та UX покращення головної сторінки

**Дата створення:** 2026-05-23  
**Дата завершення:** 2026-05-23  
**Статус:** ✅ DONE

---

## 📌 Опис

Покращення UI платформи: більш чистий navbar з логотипом, компактний layout, статистика прогресу з форматом "X/Y", фільтрація/сортування задач, маркування вирішених задач, фіксований фон.

**Мета:**
- ✅ Фіксований фон - не прокручується при скролі
- ✅ Логотип у navbar (`</>` дужки) замість тексту
- ✅ Видалити кнопку "Problems" з navbar
- ✅ Видалити заголовок "Problems" та опис зі сторінки
- ✅ Зменшити відступ зверху (py-12 → py-6)
- ✅ Статистика з форматом "X / Y" (solved / total)
- ✅ Per-difficulty статистика: Easy, Medium, Hard як "X/Y"
- ✅ Фільтри по складності, статусу вирішення, пошук
- ✅ Сортування: Default, A-Z, Z-A, Easiest, Hardest
- ✅ Візуальне маркування вирішених задач (зелена галочка ✓)

---

## 📋 План виконання

### Крок 1: Фон
- [x] Додати `background-attachment: fixed` до body в globals.css

### Крок 2: Navbar
- [x] Замінити текст "LeetCode Local" на SVG-логотип `</>`
- [x] Видалити кнопку "Problems" (праву частину navbar)
- [x] Зменшити padding: py-4 → py-3
- [x] Додати hover-ефект на логотип

### Крок 3: Головна сторінка
- [x] Fetch Progress даних (solved задачи)
- [x] Обчислити solved counts по складності
- [x] Видалити mb-10 блок з h1 та p
- [x] Змінити py-12 → py-6
- [x] Оновити stats блок з форматом "X / Y"
- [x] Передати solvedIds у ProblemList

### Крок 4: ProblemList компонент
- [x] Додати solvedIds prop
- [x] Додати useState для фільтрів (difficulty, status, search)
- [x] Додати useState для сортування
- [x] Реалізувати filter UI (buttons + search input + dropdown)
- [x] Показувати ✓ для вирішених задач
- [x] Затьмарити текст для вирішених задач
- [x] Додати border-left зеленого кольору для вирішених
- [x] Клієнтська фільтрація без зміни URL

---

## 🔧 Файли для зміни

| Файл | Дія | Статус |
|---|---|---|
| `src/app/globals.css` | Додати `background-attachment: fixed` | ✅ |
| `src/components/glass/GlassNavbar.tsx` | Логотип `</>`, видалити кнопку | ✅ |
| `src/app/page.tsx` | Fetch progress,統計, менший відступ | ✅ |
| `src/components/problems/ProblemList.tsx` | Фільтри, сортування, solved маркер | ✅ |

---

## ✅ Результати

### Navbar
- ✅ Логотип `</>` з градієнтом indigo-400 to cyan-400
- ✅ Текст "LeetCode Local" рядом з логотипом
- ✅ Hover-ефект: текст светлішає
- ✅ Кнопка "Problems" видалена

### Статистика
```
Total: 0 / 470 (solvedCount / totalProblems)

Easy: 0/144
Medium: 0/221
Hard: 0/105
```

### Фільтри та сортування
- ✅ Difficulty: All, Easy, Medium, Hard (button group)
- ✅ Status: All, Solved, Unsolved (button group)
- ✅ Search: text input з placeholder "Search problems..."
- ✅ Sort: dropdown з опціями [Default, A-Z, Z-A, Easiest, Hardest]

### Problem List
- ✅ Вирішені задачи:
  - Зелена галочка ✓ ліворуч
  - Затьмарений текст (text-slate-400)
  - Зелена лінія зліва (border-l-2 border-emerald-400)
- ✅ Невирішені задачи:
  - Білий текст (text-slate-100)
  - Normale вигляд

### Фон
- ✅ Градієнт from-slate-950 via-slate-900 to-indigo-950
- ✅ Фіксований при скролі (background-attachment: fixed)
- ✅ Займає весь viewport (min-h-screen)

---

## 🧪 Верифікація

### Localhost тестування
1. ✅ `npm run dev` → сервер запущений на http://localhost:3000
2. ✅ Сторінка завантажується: GET / 200
3. ✅ Navbar відображається з логотипом `</>`
4. ✅ Статистика показує "0 / 470", Easy "0/144", Medium "0/221", Hard "0/105"
5. ✅ Фільтри присутні (All, Easy, Medium, Hard buttons)
6. ✅ Search input з placeholder "Search problems..."
7. ✅ Sort dropdown з опціями
8. ✅ Problem list завантажується

### Prisma логи
```
prisma:query SELECT `main`.`Progress`.`problemId` FROM `main`.`Progress` WHERE `main`.`Progress`.`status` = ? LIMIT ? OFFSET ?
prisma:query SELECT `main`.`Problem`.`id`, `main`.`Problem`.`slug`, `main`.`Problem`.`title`, `main`.`Problem`.`difficulty` FROM `main`.`Problem` ORDER BY `main`.`Problem`.`id` ASC
```
✅ Запити виконуються успішно

---

## 📝 Обмеження & Примітки

- Фільтрація та сортування — на клієнтськой стороні (useState), не на серверу
- Progress дані завантажуються по сервера для обчислення вирішених задач
- Solved маркер оснований на status='solved' у Progress таблиці
- Пошук case-insensitive і шукає в заголовку задачи

---

## 🚀 Наступні кроки (опціонально)

- [ ] Додати animation для перехідних станів фільтрів
- [ ] Додати keyboard shortcuts для фільтрів
- [ ] Додати localStorage для збереження фільтрів користувача
- [ ] Додати difficulty graph на stats блоці
- [ ] Додати estimated time per problem

