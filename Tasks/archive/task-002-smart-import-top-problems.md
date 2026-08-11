# Task 002: Розумний імпорт "Топ 400-500" LeetCode задач

**Дата створення:** 2026-05-23  
**Дата завершення:** 2026-05-23  
**Статус:** ✅ DONE

---

## 📌 Опис

Замість випадкового імпорту всіх задач з LeetCode — вибрати **400-500 найкращих** за якістю для ефективної практики.

**Мета:**
- ✅ Імпортувати 150 Easy, 200 Medium, 100 Hard задач
- ✅ Фільтрація за acceptance rate (acRate > 50%)
- ✅ Двохпрохідний імпорт (швидкий список + повні деталі)
- ✅ Додати `frontendId` та `acRate` в БД для фільтрування

---

## 📋 План виконання

### Крок 1: Оновити Prisma Schema
- [x] Додати `frontendId String?` (номер задачи #1, #2...)
- [x] Додати `acRate Float?` (відсоток прийнятих рішень)
- [x] Запустити міграцію

### Крок 2: Переписати import скрипт
- [x] Двохпрохідний імпорт:
  - Прохід 1: fetch всіх задач metadata (без detail call)
  - Прохід 2: fetch деталей тільки для вибраних
- [x] CLI флаги: `--easy=150 --medium=200 --hard=100`
- [x] Фільтрація: `isPaidOnly=false`, `acRate > 50%` (Easy/Medium), топ за acRate (Hard)
- [x] `--dry-run` режим для перевірки

### Крок 3: Запустити імпорт ✅
- [x] Запустити: `npx tsx scripts/import-leetcode.ts --easy=150 --medium=200 --hard=100`
- [x] Перевірити результати в БД

### Крок 4: Верифікація ✅
- [x] COUNT задач в БД: 470 (попередні 54 + нові 416)
- [x] Розподіл по складності: Easy 144, Medium 221, Hard 105
- [x] Тест в браузері: Maximum Binary Tree завантажується ✓
- [x] API тест: POST /api/run → OK ✓

---

## 🔧 Файли для зміни

| Файл | Дія | Статус |
|---|---|---|
| `prisma/schema.prisma` | Додати `frontendId`, `acRate` | ✅ |
| `prisma/migrations/` | Нова міграція | ✅ |
| `scripts/import-leetcode.ts` | Переписати з 2-прохідним підходом | ✅ |

---

## ✅ Результати

### Статистика імпорту

```
🚀 Starting Smart LeetCode import...
📊 Target: Easy=150, Medium=200, Hard=100

📥 PASS 1: Fetching all problems metadata... ✓ 3171 non-premium problems
📊 PASS 2: Selecting top problems by acRate...
   Easy: 150 (acRate > 50%)
   Medium: 200 (acRate > 50%)
   Hard: 100 (top by acRate)
   Total selected: 450

📥 PASS 3: Fetching detailed info for selected problems...

✅ Import complete!
📊 Statistics:
   Imported: 423
   Errors: 27 (no JS code)
   Success rate: 94.0%

📦 Database state:
   Easy: 144
   Medium: 221
   Hard: 105
   Total: 470
```

### Верифікація

| Тест | Результат |
|---|---|
| **Homepage** | ✅ Показує "Total Problems: 470" |
| **Problem page** | ✅ Maximum Binary Tree завантажується |
| **Code runner API** | ✅ POST /api/run повертає результати |
| **Dynamic dispatch** | ✅ Функція викликається правильно |

### Структура БД

- `Problem.frontendId` — номер задачи з LeetCode (#1, #2...)
- `Problem.acRate` — acceptance rate для фільтрування
- Всі 470 задач мають: description, starter code, tags, companies

---

## 📝 Примітки

- Hard задачи рідко мають acRate > 50%, тому беремо топ-100 без порогу
- Dry-run режим дозволяє перевірити список перед імпортом
- Імпорт займе ~15-20 хвилин (по 300ms на задачу)
