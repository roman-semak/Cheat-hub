import type { QuickRefBlock } from './types'

// Fullstack quickref board — condensed from the old prose `fullstackCheat`
// sheet: facts, numbers and snippets for the "15 minutes before" review.
export const fullstackQuickRefBlocks: QuickRefBlock[] = [
  {
    label: 'HTTP методи',
    icon: '🌐',
    entries: [
      { term: 'GET', chips: ['safe', 'idempotent', 'cacheable'], desc: 'читання' },
      { term: 'POST', desc: 'створення · <b>НЕ</b> idempotent' },
      { term: 'PUT', chips: ['idempotent'], desc: 'повна заміна' },
      { term: 'PATCH', desc: 'часткове оновлення' },
      { term: 'DELETE', chips: ['idempotent'], desc: 'видалення' },
    ],
  },
  {
    label: 'HTTP коди',
    icon: '🔢',
    entries: [
      { term: '200 / 201 / 204', desc: 'OK / Created / No Content' },
      { term: '301 / 304', desc: 'Moved / Not Modified' },
      { term: '400 / 404', desc: 'bad request / missing' },
      { term: '401 vs 403', desc: '<b>401</b> — хто ти? (не залогінений) · <b>403</b> — тобі не можна' },
      { term: '409 / 422 / 429', desc: 'conflict / unprocessable / too many requests' },
      { term: '500 / 502 / 503 / 504', desc: 'server / bad gateway / unavailable / gateway timeout' },
    ],
  },
  {
    label: 'Бази даних',
    icon: '🗄️',
    entries: [
      { term: 'SQL коли', desc: "зв'язки, транзакції, гнучкі запити, цілісність · <b>дефолт = Postgres</b>" },
      { term: 'NoSQL коли', desc: 'гнучка схема, масштаб запису, доступ за ключем, документ-агрегати' },
      { term: 'ACID', desc: 'Atomicity · Consistency · Isolation · Durability' },
      { term: 'CAP', desc: 'при partition обираєш <b>Consistency</b> або <b>Availability</b>' },
      {
        term: 'Isolation levels',
        chips: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
      },
      {
        term: 'Транзакція',
        desc: 'або все, або нічого',
        code: `BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
        codeLanguage: 'sql',
      },
    ],
  },
  {
    label: 'Продуктивність БД',
    icon: '🚀',
    entries: [
      { term: 'N+1', desc: "1 запит на список + N на зв'язки → eager load / JOIN / DataLoader" },
      {
        term: 'Індекс',
        desc: 'на WHERE / JOIN / ORDER BY, перевіряй <code>EXPLAIN ANALYZE</code>',
        code: `CREATE INDEX idx_orders_user ON orders (user_id, created_at DESC);
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;`,
        codeLanguage: 'sql',
      },
    ],
  },
  {
    label: 'Auth',
    icon: '🔐',
    entries: [
      { term: 'Sessions', desc: 'стейтфул, легко відкликати, потрібен store (Redis)' },
      { term: 'JWT', desc: 'стейтлес, масштабовано, важко відкликати → короткий TTL + refresh' },
      { term: 'Cookie', chips: ['HttpOnly', 'Secure', 'SameSite'], desc: 'anti-XSS · HTTPS · anti-CSRF' },
      { term: 'localStorage', desc: '<b>НЕ</b> зберігай там JWT (XSS)' },
      { term: 'OAuth2 / OIDC', desc: 'делегований доступ / identity поверх OAuth2' },
      { term: 'RBAC', desc: 'права через ролі' },
      { term: 'Паролі', chips: ['bcrypt', 'argon2'], desc: '+ сіль' },
    ],
  },
  {
    label: 'Кеш',
    icon: '⚡',
    entries: [
      { term: 'Рівні', desc: 'browser → CDN → app (Redis) → DB' },
      { term: 'Стратегії', chips: ['cache-aside (дефолт)', 'write-through', 'write-behind'] },
      { term: 'Інвалідація', desc: 'TTL + події; стережись <b>stampede</b>' },
    ],
  },
  {
    label: 'Черги',
    icon: '📨',
    entries: [
      { term: 'Навіщо', desc: "розв'язка сервісів, згладжування піків, фонові задачі" },
      { term: 'Інструменти', chips: ['RabbitMQ', 'Kafka', 'BullMQ', 'SQS'] },
      { term: 'At-least-once', desc: 'споживач має бути <b>ідемпотентним</b>' },
      { term: 'DLQ', desc: 'dead letter queue для фейлів' },
    ],
  },
  {
    label: 'Безпека (OWASP)',
    icon: '🛡️',
    entries: [
      { term: 'SQLi', desc: 'параметризовані запити / ORM, ніколи не конкатенуй ввід' },
      { term: 'XSS', desc: 'екрануй вивід, CSP, обережно з <code>innerHTML</code>' },
      { term: 'CSRF', desc: 'SameSite-cookies + CSRF-токени' },
      { term: 'CORS ≠ захист', desc: 'механізм браузера; access control — на сервері для кожного ресурсу' },
      { term: 'Гігієна', chips: ['секрети в env', 'HTTPS усюди', 'rate limit на логін'] },
    ],
  },
  {
    label: 'DevOps',
    icon: '🐳',
    entries: [
      { term: 'Docker', desc: 'образ = app + залежності, шари кешуються, multi-stage → малий образ' },
      {
        term: 'Docker CLI',
        chips: ['build', 'run', 'compose up', 'logs -f', 'exec -it'],
        code: `docker build -t app .
docker run -p 3000:3000 --env-file .env app
docker compose up -d
docker ps && docker logs -f <id>
docker exec -it <id> sh`,
        codeLanguage: 'bash',
      },
      { term: 'CI', desc: 'lint → test → build на push' },
      { term: 'CD', chips: ['blue-green', 'canary', 'rolling'] },
      { term: 'IaC', desc: 'Terraform' },
      { term: '12-factor', desc: 'конфіг в env, стейтлес, логи в stdout' },
    ],
  },
  {
    label: 'System Design — каркас',
    icon: '🧠',
    chips: [
      'load balancing',
      'horizontal / stateless',
      'caching + інвалідація',
      'CAP / eventual consistency',
      'черги',
      'idempotency / retries',
      'graceful degradation',
      '<b>trade-offs уголос</b>',
    ],
  },
  {
    label: 'Головне правило',
    icon: '🎯',
    entries: [
      {
        term: 'Senior-відповідь',
        desc: '«залежить від…» → варіанти → trade-off → конкретне рішення з обґрунтуванням',
      },
    ],
  },
]
