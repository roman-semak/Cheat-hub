# Task 004: Remote sync з прообразом логіну (Turso + username/password)

**Дата створення:** 2026-08-11  
**Статус:** 🔄 IN_PROGRESS

---

## 📌 Опис

Перехід від чистого localStorage-прогресу до опційної віддаленої синхронізації через Turso (libSQL) з прообразом логіну (username + пароль), щоб різні пристрої/люди синкали *свої* дані, а не спільний бакет. Попередня спроба (Upstash, спільний секрет на весь застосунок, без ідентичності користувача) була свідомо відкочена раніше — ця реалізація вирішує саме ту прогалину.

**Мета:**
- ✅ Remote-сховище: Turso (libSQL) через вже встановлені `@libsql/client` / `@prisma/adapter-libsql`
- ✅ Прообраз логіну: username + пароль (хешування, не plaintext)
- ✅ Автоматична синхронізація у фоні (debounce ~1.5с на push, pull при логіні)
- ✅ Без merge-логіки — навмисне спрощення: last-write-wins, повне перезаписування в обидва боки
- ✅ Хто не логінився — поведінка не змінюється (чистий local-only режим як і раніше)

---

## 📋 План виконання

### Крок 1: Prisma schema
- [x] Додати модель `User` (`username` @unique, `passwordHash`, `data` — JSON-блоб усього `UserData`, `createdAt`/`updatedAt`)
- [x] Міграція `20260811093252_add_user` (локально, без Turso-акаунту)

### Крок 2: `src/lib/db.ts` — Prisma singleton
- [x] `PrismaClient` через `@prisma/adapter-libsql` + `@libsql/client`
- [x] `TURSO_DATABASE_URL` для прода, локальний fallback інакше

### Крок 3: `src/lib/auth.ts` — auth без нових залежностей
- [x] `hashPassword`/`verifyPassword` — `scryptSync` + сіль, `timingSafeEqual`
- [x] `signSession`/`verifySession` — HMAC-SHA256 підписані cookie-токени (`AUTH_SECRET`)

### Крок 4: Рефакторинг стору
- [x] Винести чисті типи/`normalize()`/`emptyData()` з `userStore.ts` у новий `src/lib/userData.ts` (щоб API-роути могли reuse без `'use client'`)

### Крок 5: `src/lib/userStore.ts` — auth/sync стан
- [x] `authUsername`/`syncState`/`lastSyncedAt` як окремий стабільний snapshot-об'єкт для `useSyncExternalStore`
- [x] `login()` — pull з сервера (перезаписує локальне)
- [x] `register()` — push локального на сервер (не перезаписує щойно створений акаунт пустими даними)
- [x] `logout()` — чистить лише auth-прапорець, локальні дані лишає недоторканими
- [x] Дебаунсований автопуш з існуючого choke-point `update()`

### Крок 6: API-роути
- [x] `POST /api/auth/register` — 409 якщо зайнято
- [x] `POST /api/auth/login` — 401 з єдиним generic-повідомленням
- [x] `POST /api/auth/logout`
- [x] `GET/PUT /api/sync` — 401 без валідної сесії, `PUT` проганяє тіло через спільний `normalize()`

### Крок 7: UI
- [x] Блок "Синхронізація" в `src/components/profile/ProfilePanel.tsx` (форма логін/пароль, статус синку, кнопка "Вийти")

### Крок 8: Env
- [x] `AUTH_SECRET` в `.env.example` і локальному `.env` (`openssl rand -hex 32`)

### Крок 9: Тестування
- [x] `npm run build` — чисто, без TS-помилок
- [x] Наскрізний smoke-test через curl (реєстрація → логін → push → pull → logout → перевірка 401/409)

---

## 🔧 Файли для зміни

| Файл | Дія | Статус |
|---|---|---|
| `prisma/schema.prisma` | Додати модель `User` | ✅ |
| `prisma/migrations/20260811093252_add_user/` | Нова міграція | ✅ |
| `src/lib/db.ts` | Новий — Prisma+libSQL singleton | ✅ |
| `src/lib/auth.ts` | Новий — хешування паролів + сесії | ✅ |
| `src/lib/userData.ts` | Новий — винесені типи/`normalize()` | ✅ |
| `src/lib/userStore.ts` | Auth/sync стан + дії | ✅ |
| `src/app/api/auth/register/route.ts` | Новий | ✅ |
| `src/app/api/auth/login/route.ts` | Новий | ✅ |
| `src/app/api/auth/logout/route.ts` | Новий | ✅ |
| `src/app/api/sync/route.ts` | Новий (GET+PUT) | ✅ |
| `src/components/profile/ProfilePanel.tsx` | Блок синхронізації | ✅ |
| `.env.example` / `.env` | `AUTH_SECRET` | ✅ |

---

## ✅ Результати

### Smoke-test (curl, наскрізний)

```
register (нове ім'я)        → 200 {"username":"testuser1"}
login (невірний пароль)     → 401 {"error":"Invalid username or password"}
login (вірний пароль)       → 200 {"username":"testuser1","data":{}}
GET /api/sync (з cookie)    → 200 {}
PUT /api/sync               → 200 {"ok":true}
GET /api/sync (після PUT)   → 200 <дані, що щойно запушили>
GET /api/sync (без cookie)  → 401
register (дублікат)         → 409 {"error":"Username already taken"}
logout                      → 200 {"ok":true}
GET /api/sync (після logout)→ 401
```

`npm run build` — успішно, всі роути `/api/auth/*` та `/api/sync` згенеровані як `ƒ` (dynamic).

### Знайдений і виправлений баг

Prisma CLI резолвить відносний `file:./dev.db` відносно `prisma/schema.prisma` (→ `prisma/dev.db`), а `@libsql/client` у рантаймі — відносно `process.cwd()` (→ порожній `./dev.db` у корені проєкту). Через це застосунок стукався в інший, порожній файл ("no such table: main.User"). Виправлено: `src/lib/db.ts` для локального fallback тепер будує абсолютний шлях `path.join(process.cwd(), 'prisma', 'dev.db')`.

Також виявлено, що вже запущений (з 10.08) dev-сервер тримав у пам'яті старий згенерований Prisma Client (до міграції) — після `prisma migrate dev` процес треба перезапускати, оскільки `@prisma/client` винесений у `serverExternalPackages` і не хот-релоудиться.

---

## 📝 Примітки

- Дані користувача зберігаються одним JSON-блобом у колонці `User.data` — без нормалізації в реляційні таблиці, узгоджено з тим, як `Problem.tags`/`Problem.testCases` вже зберігають JSON як `String`.
- Немає conflict-резолюції: логін завжди перезаписує локальне серверними даними, автопуш завжди перезаписує серверні локальними. Свідоме спрощення.
- **Ручні кроки поза кодовою базою** (потребують зовнішнього акаунту Turso):
  1. `turso db create cheat-hub` → `turso db show cheat-hub --url` → реальний `TURSO_DATABASE_URL`
  2. `turso db tokens create cheat-hub` → реальний `TURSO_AUTH_TOKEN`
  3. Згенерувати `AUTH_SECRET` для прод-середовища (`openssl rand -hex 32`) і виставити на хостингу
  4. Застосувати згенеровану міграцію до реальної Turso-БД вручну: `turso db shell cheat-hub < prisma/migrations/20260811093252_add_user/migration.sql` (Prisma Migrate не вміє напряму в `libsql://`)
