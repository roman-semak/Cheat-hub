# Service Worker

> Senior+ рівень. Пояснення українською, код і терміни англійською.

---

## 1. Що це

**Service Worker (SW)** — це скрипт, який браузер запускає **у фоні, окремо від сторінки**, як **проксі між застосунком і мережею**. Він перехоплює мережеві запити, може віддавати відповіді з кешу, працювати офлайн, отримувати push-повідомлення і робити background sync.

Ключові характеристики:
- Працює в **окремому потоці** (не блокує UI, немає доступу до DOM).
- **Event-driven** — прокидається на подію, обробляє, засинає (не тримається в пам'яті постійно).
- **HTTPS-only** (крім `localhost`) — бо може перехоплювати весь трафік, це вимога безпеки.
- **Асинхронний** повністю — жодного синхронного API (немає `localStorage`, лише `IndexedDB`/`Cache API`).

> 🎯 Ключова фраза: SW — це **programmable network proxy** між сторінкою і мережею, основа PWA (offline, push, background sync).

---

## 2. Головна ментальна модель: proxy

```
   Web Page (main thread)
        │  fetch()
        ▼
  ┌───────────────┐
  │ Service Worker│  ← перехоплює 'fetch' event
  └───────────────┘
     │         │
     ▼         ▼
  Cache      Network
  (Cache API)  (real request)
```

SW сам вирішує: віддати з кешу, піти в мережу, чи скомбінувати. Це дає повний контроль над мережевою поведінкою застосунку.

---

## 3. Життєвий цикл (lifecycle) — найважливіше для інтерв'ю

Життєвий цикл — головне джерело плутанини і найчастіша тема питань.

```
Register → Install → (Waiting) → Activate → Idle ⇄ Fetch/Message → Terminated
```

### 3.1 Register
Зі сторінки реєструєш SW:
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### 3.2 Install
Спрацьовує раз, коли браузер вперше бачить SW (або нову версію). Тут зазвичай **прекешують** статику:
```js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then(cache =>
      cache.addAll(['/', '/index.html', '/app.js', '/styles.css'])
    )
  );
});
```
`event.waitUntil()` — тримає SW у фазі install, поки проміс не завершиться.

### 3.3 Waiting (ключова пастка!)
Якщо вже є **активний старий** SW, новий переходить у стан **waiting** і НЕ активується, поки всі вкладки зі старим SW не закриються. Це зроблено, щоб не міняти SW "під ногами" у відкритих вкладок.

- `self.skipWaiting()` — примусово активувати новий SW одразу (обережно: старі вкладки отримають новий SW).

### 3.4 Activate
Тут **чистять старі кеші** (видаляють версії, що більше не потрібні):
```js
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== 'v1').map(k => caches.delete(k)))
    )
  );
});
```
- `clients.claim()` — дозволяє новому SW одразу контролювати вже відкриті сторінки (без перезавантаження).

> ⚠️ Топ-пастка: без `skipWaiting()` + `clients.claim()` нова версія SW не застосовується, поки користувач не закриє всі вкладки. Це джерело багів "оновив, а старе досі показується".

---

## 4. Fetch event — перехоплення запитів

Серце SW. Обробляєш кожен мережевий запит сторінки:

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request)   // з кешу, або в мережу
    )
  );
});
```

`event.respondWith()` — каже браузеру "я сам відповім на цей запит".

---

## 5. Caching strategies (must-know — часте питання)

| Стратегія | Логіка | Коли |
|---|---|---|
| **Cache First** | кеш → якщо нема, мережа | статика (JS/CSS/шрифти/зображення) |
| **Network First** | мережа → якщо офлайн, кеш | динамічні дані, що мають бути свіжі |
| **Stale-While-Revalidate** | віддати кеш ОДРАЗУ + оновити кеш у фоні | баланс швидкості й свіжості (найпопулярніша) |
| **Network Only** | завжди мережа | некешовані запити (POST, аналітика) |
| **Cache Only** | завжди кеш | прекешований app shell |

**Stale-While-Revalidate** (пояснити детально — це фаворит):
```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('dynamic').then(async (cache) => {
      const cached = await cache.match(event.request);
      const network = fetch(event.request).then(res => {
        cache.put(event.request, res.clone());  // оновлюємо кеш у фоні
        return res;
      });
      return cached || network;  // миттєво кеш, паралельно оновлення
    })
  );
});
```
Користувач бачить кеш **миттєво**, а наступний візит отримає оновлені дані. Компроміс: перший показ може бути трохи застарілим.

---

## 6. App Shell + offline

**App Shell модель:** прекешуєш мінімальний "каркас" (HTML/CSS/JS оболонки) на install → застосунок відкривається офлайн миттєво, а контент довантажується. Це фундамент PWA.

```js
// offline fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match('/offline.html'))
  );
});
```

---

## 7. Push Notifications + Background Sync

### Push
SW отримує push навіть коли сторінка закрита:
```js
self.addEventListener('push', (event) => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, { body: data.body })
  );
});
```
(Потрібні: Push API + сервер із VAPID-ключами.)

### Background Sync
Відкладає дію, поки не з'явиться мережа (напр. відправити повідомлення, коли зв'язок повернеться):
```js
self.addEventListener('sync', (event) => {
  if (event.tag === 'send-messages') {
    event.waitUntil(sendQueuedMessages());
  }
});
```

---

## 8. Комунікація SW ↔ Page

SW не має доступу до DOM, тому спілкується через повідомлення:

```js
// Page → SW
navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });

// SW → Page
self.clients.matchAll().then(clients =>
  clients.forEach(c => c.postMessage({ type: 'UPDATE_AVAILABLE' }))
);
```
Або **`BroadcastChannel`** / **`MessageChannel`** для двостороннього зв'язку. Типовий кейс: SW каже сторінці "є оновлення" → сторінка показує тост "Reload to update".

---

## 9. Storage в SW

- **Cache API** — для мережевих відповідей (Request/Response пари).
- **IndexedDB** — для структурованих даних (черги, стан). Єдина async-БД, доступна в SW.
- ❌ **`localStorage` НЕДОСТУПНИЙ** — він синхронний, а SW повністю async. Часте питання-пастка.

---

## 10. Інструменти

- **Workbox** (від Google) — де-факто стандарт: готові caching-стратегії, роутинг, прекеш-маніфест, versioning. Руками SW пишуть рідко в проді — беруть Workbox.
- **Vite PWA plugin / next-pwa** — генерують SW через Workbox автоматично.

> 💡 На інтерв'ю: "розумію SW на низькому рівні (lifecycle, fetch, стратегії), але в проді використовую Workbox, щоб не писати boilerplate і не наробити помилок у lifecycle/versioning".

---

## 11. Service Worker vs суміжне (не плутати)

| | Призначення |
|---|---|
| **Service Worker** | мережевий proxy, offline, push, персистентний між сесіями |
| **Web Worker** | обчислення у фоновому потоці (не проксі, живе поки жива сторінка) |
| **Web Worker (dedicated)** | важкі обчислення без блокування UI |
| **Shared Worker** | один worker на кілька вкладок |
| **MV3 Extension Service Worker** | той самий концепт для розширень (замінив persistent background page) |

---

## 12. Пастки

- **Waiting-стан** — нова версія не активується без `skipWaiting`/`claim` (розділ 3).
- **Кешування "назавжди"** — забув версіонування кешу → користувачі застрягли на старому. Потрібна стратегія інвалідизації (versioned cache names, Workbox precache manifest).
- **Кешування `index.html` Cache First** — небезпечно: юзер не побачить оновлень. Для HTML — Network First або SWR.
- **`localStorage` у SW** — не існує, тільки IndexedDB/Cache.
- **Debugging** — SW "залипає"; в DevTools → Application → Service Workers → "Update on reload" рятує під час розробки.
- **Range requests** (відео) — SW має правильно обробляти, інакше медіа ламається.

---

## 13. Твій контекст (як подати)

- **MV3 / browser extensions:** якщо йдеш у Dashlane-подібні продукти — SW у MV3-розширеннях це та сама модель (event-driven, може "вмерти" → потрібен retry/state в IndexedDB). Твоя `retry with backoff` утиліта прямо релевантна: "service worker може завершитись між подіями, тому комунікація потребує retry і персистентного стану".
- **Performance:** "SW + caching-стратегії — інструмент для Core Web Vitals: app shell для миттєвого first paint, stale-while-revalidate для швидкості з фоновим оновленням. Це доповнює мою роботу над bundle-size і LCP."
- **Чесна межа:** "PWA/offline на рівні концепцій і Workbox — так; глибокий production PWA з offline-first синхронізацією — залежить від проєкту, можу чесно сказати, де hands-on, а де конц-рівень."

---

## ✅ Чеклист "знаю тему на Senior"

- [ ] SW = programmable network proxy, окремий потік, event-driven, HTTPS-only
- [ ] Lifecycle: register → install → waiting → activate → idle/fetch → terminated
- [ ] `waitUntil`, `skipWaiting`, `clients.claim()` — навіщо кожен
- [ ] Waiting-пастка (нова версія не активується) + фікс
- [ ] Fetch event + `respondWith`
- [ ] 5 caching-стратегій + коли яка (SWR детально)
- [ ] App Shell + offline fallback
- [ ] Push + Background Sync
- [ ] Комунікація postMessage / BroadcastChannel (немає DOM)
- [ ] Storage: Cache API + IndexedDB; НЕ localStorage
- [ ] Workbox як prod-стандарт
- [ ] SW vs Web Worker vs MV3 extension worker
- [ ] Пастки: versioning кешу, HTML не Cache First, залипання в DevTools
