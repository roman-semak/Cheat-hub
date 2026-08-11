# Task 001: Import LeetCode Problems via leetcode-query

**Дата створення:** 2026-05-23  
**Дата завершення:** 2026-05-23  
**Статус:** ✅ DONE

---

## 📌 Опис

Наповнити локальну платформу всіма задачами з LeetCode (~2600+) за допомогою npm-пакету `leetcode-query`. Потрібно отримати описи, JS/TS starter code, editorials та company tags.

**Критично:** Переробити `src/lib/runner.ts` щоб підтримувати динамічний dispatch функцій (зараз hardcoded).

---

## 📋 План виконання

### Крок 1: Підготовка та встановлення залежностей
- [ ] Встановити `npm install leetcode-query --legacy-peer-deps`
- [ ] Отримати LEETCODE_SESSION cookie з браузера (авторизований акаунт на leetcode.com)
- [ ] Додати `LEETCODE_SESSION=...` в `.env` файл

### Крок 2: Переробити runner.ts для динамічного dispatch
- [ ] Видалити hardcoded функції (`twoSum`, `reverseString`, `containsDuplicate`)
- [ ] Додати regex-парсинг ім'я функції: `/(var|const|function)\s+(\w+)\s*[=\s(]/`
- [ ] Оновити wrapper щоб динамічно викликати функцію по імені
- [ ] Перевірити що старі тест-кейси все ще працюють

### Крок 3: Створити скрипт імпорту (scripts/import-leetcode.ts)
- [ ] Налаштувати аутентифікацію через `leetcode-query`
- [ ] Реалізувати пагінацію (по 50 задач)
- [ ] Маппити LeetCode API → Prisma schema:
  - `slug` → `slug`
  - `title` → `title`
  - `difficulty` → `difficulty`
  - `content` (HTML) → `description` (конвертувати в Markdown)
  - `topicTags[].name` → `tags` (JSON string)
  - `companyTagStats` → `companies` (JSON string)
  - `codeDefinition[javascript].code` → `starterCode`
  - `solution.content` → `editorial` (для premium)
- [ ] Додати rate limiting: 300ms між запитами
- [ ] Додати прогрес-бар у консолі
- [ ] Фільтрувати: лише задачі з JavaScript starter code

### Крок 4: HTML → Markdown конвертація
- [ ] Встановити `npm install html-to-markdown --legacy-peer-deps` (або альтернатива)
- [ ] Або: написати простий regex-based конвертер для базових HTML тегів

### Крок 5: Тестування на малому наборі
- [ ] Запустити скрипт з флагом `--limit 5` (перші 5 задач)
- [ ] Перевірити в `npx prisma studio` що задачі завантажились коректно
- [ ] Відкрити `/problems/two-sum` в браузері — перевірити опис, editorial, starter code
- [ ] Натиснути **Run** — перевірити що code runner працює після переробки runner.ts

### Крок 6: Повний імпорт
- [ ] Запустити скрипт без флагів (всі ~2600 задач)
- [ ] Час: ~15-20 хв (з rate limiting)
- [ ] Монітирити логи на помилки
- [ ] При необхідності: додати resuming capability (якщо упаде на половині)

### Крок 7: Фінальна верифікація
- [ ] `npx prisma studio` → перевірити COUNT(*)
- [ ] Відкрити 5-10 випадкових задач → перевірити дані коректні
- [ ] Запустити код на 3 задачах різної складності
- [ ] Перевірити company tags чи заповнені для більшості задач

---

## 🔧 Файли для створення/зміни

| Файл | Дія |
|---|---|
| `scripts/import-leetcode.ts` | **НОВИЙ** — скрипт імпорту |
| `src/lib/runner.ts` | **ПЕРЕРОБИТИ** — динамічний dispatch |
| `.env` | **ДОДАТИ** — `LEETCODE_SESSION` |
| `package.json` | **ДОДАТИ** — скрипт "import": "npx tsx scripts/import-leetcode.ts" |

---

## ✅ Результати

[Будуть заповнені після виконання]

```
Статистика:
- Всього задач завантажено: ___ / 2600
- Задач з editorial: ___ / всього
- Задач з company tags: ___ / всього
- Tiempo імпорту: ___ хвилин
- Помилок: ___
```

---

## 📝 Обмеження & Примітки

1. **Editorial** — доступні тільки для LeetCode Premium акаунту. Вільні користувачі отримають частину.
2. **Company tags** — можуть бути порожніми для деяких нових задач
3. **HTML → Markdown** — базова конвертація, складний HTML потребує ручної правки
4. **Rate limiting** — 300ms між запитами щоб не забанили IP
5. **Resuming** — якщо скрипт упаде, додати логіку пропуску вже завантажених

---

## 🔗 Залежності

- `leetcode-query` (npm)
- `html-to-markdown` або аналогічна (або писати своя)
- Prisma (вже встановлена)
- Node.js + tsx (вже встановлені)

**Потрібен:** LeetCode акаунт (вільний, але краще Premium для editorial)
