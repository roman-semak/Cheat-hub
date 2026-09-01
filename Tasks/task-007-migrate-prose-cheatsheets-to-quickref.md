# Task 007: Мігрувати прозові cheatsheet-сторінки у єдиний quickref-хаб

**Дата створення:** 2026-09-01  
**Статус:** 📋 TODO → 🔄 IN_PROGRESS → ✅ DONE

---

## 📌 Опис

Зараз «Шпаргалка» (`/quickref/[topic]`, компонент `QuickRefTopicView`) охоплює
лише 3 теми — `react`, `javascript`, `angular` — і має власний таб-бар зверху
(`QUICKREF_TOPICS`).

Паралельно існують окремі прозові cheatsheet-сторінки з іншим рендером:

| URL | Рендер |
|---|---|
| `/git/cheatsheet` | `ProseTopicView variant="cheat"` |
| `/ai/cheatsheet` | `ProseTopicView variant="cheat"` |
| `/architecture/cheatsheet` | `ProseTopicView variant="cheat"` |
| `/fullstack/cheatsheet` | `ProseTopicView variant="cheat"` |
| `/nextjs/cheatsheet` | `ProseTopicView variant="cheat"` |
| `/leetcode/cheatsheet` | `LifehacksView` (Lifehacks) |

Мета: звести всі шпаргалки в один хаб `/quickref/*` зі спільним верхнім
таб-баром і однаковим виглядом карток, як у react/js/angular. Коментар у
`src/lib/cheatsheet/quickref.ts:6-9` уже фіксує цей намір.

Пов'язано з: перебудова quickref-шпаргалки (таб-бар тем + прибрані позначки
статусу) — вже виконана в `QuickRefTopicView.tsx` / `CheatSidebar.tsx`.

---

## 📋 План виконання

### Крок 1: Аудит контенту та формату
- [ ] Порівняти `QuickRefBlock[]` (quickref) з `TopicContent.sections` /
      `ContentBlock` (прозові) та `Lifehack[]` (leetcode).
- [ ] Вирішити: (а) конвертувати прозовий контент у `QuickRefBlock[]`, чи
      (б) розширити `renderBlock` у `QuickRefTopicView`, щоб він умів рендерити
      прозові секції / lifehacks усередині masonry.
- [ ] Визначити, що робити зі статус-маркерами прозових сторінок (у quickref їх
      прибрали — тут або лишити тільки в `TopicPanel`, або прибрати теж).

### Крок 2: Розширити реєстр quickref
- [ ] Додати нові slug у `QUICKREF_TOPICS` (`src/lib/cheatsheet/quickref.ts`).
- [ ] Заповнити `QUICKREF_BLOCKS` для кожної нової теми (нові data-файли
      `quickref-<topic>.ts` або адаптер з наявних `*-cheat.ts` / `lifehacks.ts`).
- [ ] Оновити `src/lib/cheatsheet/quickrefKeys.ts` за потреби (ключі для
      `stamp:new` / `contentManifest.generated.json`).

### Крок 3: Рендер і навігація
- [ ] Переконатися, що `QuickRefTopicView` коректно рендерить усі нові типи
      блоків (масонрі, діалоги коду, mermaid, grid тощо).
- [ ] Таб-бар зверху автоматично підхопить нові теми з `QUICKREF_TOPICS` —
      перевірити overflow/scroll при 6+ табах.
- [ ] `src/components/cheatsheet/CheatSidebar.tsx` — прибрати формат-лінк
      `cheatsheet` у мігрованих тем (щоб не було дубля зі старим URL).

### Крок 4: Маршрути та редіректи
- [ ] `src/app/(hub)/quickref/[topic]/page.tsx` — `generateStaticParams`
      підхопить нові теми автоматично; перевірити `notFound()` логіку.
- [ ] Видалити / зредіректити старі сторінки:
      `src/app/(hub)/{git,ai,architecture,fullstack,nextjs}/cheatsheet/page.tsx`,
      `src/app/(hub)/leetcode/cheatsheet/page.tsx` → `next.config.js` redirects
      або `redirect()` у самих page.tsx на `/quickref/<slug>`.
- [ ] `src/app/sitemap.ts` — джерело вже `QUICKREF_TOPICS`; прибрати старі
      cheatsheet-URL, якщо додаються окремо.
- [ ] `src/lib/cheatsheet/registry.ts` — прибрати `'cheatsheet'` з `formats`
      мігрованих тем; за потреби скоригувати `formatHref`.

### Крок 5: Верифікація
- [ ] `npm run dev` (5001) — кожна нова тема відкривається на `/quickref/<slug>`,
      таб-бар перемикає, старі URL редіректять.
- [ ] `npm run build` — без помилок.
- [ ] `npm run stamp:new -- --check` — маніфест узгоджений (запустити
      `npm run stamp:new` і закомітити, якщо додано нові одиниці контенту).
- [ ] `npm run verify:approaches` (якщо зачіпали leetcode-контент).
- [ ] Задокументувати результати нижче + оновити `CLAUDE.md` (розділ про
      quickref / cheatsheet pipeline).

---

## 🔧 Файли для зміни

| Файл | Дія |
|---|---|
| `src/lib/cheatsheet/quickref.ts` | Переробити (`QUICKREF_TOPICS`, `QUICKREF_BLOCKS`) |
| `src/lib/cheatsheet/quickref-<topic>.ts` | Новий (data-блоки на кожну мігровану тему) |
| `src/lib/cheatsheet/quickrefKeys.ts` | Переробити за потреби |
| `src/components/cheatsheet/QuickRefTopicView.tsx` | Переробити (нові типи блоків) |
| `src/components/cheatsheet/CheatSidebar.tsx` | Переробити (прибрати `cheatsheet` формат) |
| `src/lib/cheatsheet/registry.ts` | Переробити (`formats`, `formatHref`) |
| `src/app/(hub)/{git,ai,architecture,fullstack,nextjs}/cheatsheet/page.tsx` | Видалити / редірект |
| `src/app/(hub)/leetcode/cheatsheet/page.tsx` | Видалити / редірект |
| `src/app/sitemap.ts` | Переробити |
| `next.config.js` | Переробити (redirects старих URL) |
| `CLAUDE.md` | Переробити (документація) |

---

## ✅ Результати

[Заповнюється після виконання]

---

## 📝 Примітки

- Прозовий контент (`react.ts`, `*-cheat.ts`, `lifehacks.ts`) також живить
  end-of-section interview-questions попапи та `stamp:new` — не ламати ці
  залежності при конвертації.
- `LifehacksView` має власні категорії (`LIFEHACK_CATEGORIES`) — masonry
  quickref категорій не має, продумати групування.
- Порядок табів = порядок у `QUICKREF_TOPICS`.
- Розглянути ліміт довжини таб-бару / горизонтальний скрол на мобільному при
  великій кількості тем.
