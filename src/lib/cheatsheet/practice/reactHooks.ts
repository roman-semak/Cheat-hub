import type { PracticeTask } from '../types'

// Section E of the interview-prep checklist: reusable custom hooks.
export const reactHooksTasks: PracticeTask[] = [
  {
    id: 'react-use-debounced-value',
    title: 'useDebouncedValue',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'high',
    tags: ['custom hook', 'useEffect', 'debounce'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> реалізуй хук <code>useDebouncedValue(value, delay)</code>, який повертає значення, що оновлюється лише через <code>delay</code> мс <strong>після</strong> того, як <code>value</code> перестав змінюватись (наприклад, для поля пошуку — не смикати API на кожне натискання клавіші).</p>`,
    starterCode: `import { useEffect, useState } from 'react';

function useDebouncedValue<T>(value: T, delay: number): T {
  // TODO: поверни значення, яке оновлюється лише через \`delay\` мс
  // після того, як \`value\` перестав змінюватись.
  return value;
}

// Приклад використання:
// const debouncedQuery = useDebouncedValue(query, 300);
// useEffect(() => { searchApi(debouncedQuery); }, [debouncedQuery]);`,
    solution: `function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // скидаємо попередній таймер при новій зміні value
  }, [value, delay]);

  return debounced;
}`,
    explanation: `<ul class="list">
      <li>Внутрішній стан <code>debounced</code> оновлюється не одразу, а лише через <code>setTimeout</code>.</li>
      <li>Кожна зміна <code>value</code> (чи <code>delay</code>) перезапускає ефект; cleanup-функція скасовує попередній таймер — саме в цьому суть debounce.</li>
      <li>При розмонтуванні компонента cleanup теж спрацює й прибере «висячий» таймер — витоку немає.</li>
      <li>Відрізняється від <code>debounce()</code> із секції JS Utilities: там дебaунсили <em>виклик функції</em>; тут — <em>значення, що рендериться</em>, через власний React-хук.</li>
    </ul>`,
  },
  {
    id: 'use-local-storage',
    title: 'useLocalStorage — синхронізація зі storage',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'mid',
    tags: ['localStorage', 'lazy init', 'storage event', 'SSR'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> <code>useLocalStorage&lt;T&gt;(key, initialValue)</code> — як <code>useState</code>, але персистить у <code>localStorage</code>:</p>
      <ul class="list">
        <li>ліниво читає початкове значення з storage (JSON.parse), з fallback на <code>initialValue</code>;</li>
        <li>підтримує функціональний апдейт (<code>setValue(prev =&gt; ...)</code>);</li>
        <li>синхронізується між вкладками через подію <code>storage</code>;</li>
        <li>SSR-safe (немає <code>window</code> на сервері);</li>
        <li>⚠️ у розборі — застереження: не для секретів / токенів.</li>
      </ul>`,
    starterCode: `import { useCallback, useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // TODO
  return [initialValue, (v: T) => {}] as const;
}`,
    solution: `import { useCallback, useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue; // SSR
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue; // пошкоджений JSON
    }
  }, [key, initialValue]);

  const [stored, setStored] = useState<T>(readValue); // ліниве init

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* quota / private mode */
        }
        return next;
      });
    },
    [key],
  );

  // Синхронізація між вкладками
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setStored(readValue());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, readValue]);

  return [stored, setValue] as const;
}`,
    explanation: `<ul class="list">
      <li><strong>Ліниве</strong> <code>useState(readValue)</code> — читаємо з диску лише при першому рендері, не на кожному.</li>
      <li>Функціональний апдейт: <code>value instanceof Function ? value(prev) : value</code> — той самий контракт, що й <code>useState</code>.</li>
      <li>Подія <code>storage</code> прилітає <em>в інші</em> вкладки при зміні — так стан синхронізується між ними (у своїй вкладці подія не спрацьовує, тому пишемо стан вручну).</li>
      <li><code>typeof window === 'undefined'</code> + <code>try/catch</code> — SSR і режим приватного перегляду / вичерпана квота не мають ламати застосунок.</li>
      <li>⚠️ <code>localStorage</code> доступний будь-якому JS на сторінці (XSS) і не шифрується — <strong>ніколи</strong> не зберігай там токени, паролі, PII.</li>
    </ul>`,
  },
  {
    id: 'use-previous',
    title: 'usePrevious — попереднє значення',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'mid',
    tags: ['useRef', 'useEffect', 'render timing'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> <code>usePrevious(value)</code> — повертає значення <code>value</code> з <strong>попереднього</strong> рендера (при першому рендері — <code>undefined</code>). Поясни, чому це працює саме з <code>useRef</code> + <code>useEffect</code>, а не навпаки.</p>`,
    starterCode: `import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T): T | undefined {
  // TODO
  return undefined;
}`,
    solution: `import { useEffect, useRef } from 'react';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value; // оновлюємо ПІСЛЯ рендера
  }, [value]);

  return ref.current; // під час рендера ще тримає значення з минулого разу
}`,
    explanation: `<ul class="list">
      <li>Ключ — <strong>момент</strong> оновлення: <code>return ref.current</code> виконується під час рендера (ще старе значення), а <code>ref.current = value</code> в ефекті — <strong>після</strong> коміту.</li>
      <li>Тож наступний рендер побачить у <code>ref.current</code> те, що було <code>value</code> на попередньому.</li>
      <li>Оновлювати ref прямо в тілі компонента не можна — це побічний ефект під час рендера, і в Strict/Concurrent режимі поведінка стане непередбачуваною.</li>
      <li>Типове застосування: порівняти <code>prop</code> «до/після» в ефекті, анімувати зміну числа, детектити напрямок зміни.</li>
    </ul>`,
  },
  {
    id: 'use-toggle',
    title: 'useToggle — булевий перемикач',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'mid',
    tags: ['useState', 'useCallback', 'useMemo'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> <code>useToggle(initial = false)</code> → <code>[value, { toggle, on, off, set }]</code>. Усі методи мають <strong>стабільні</strong> посилання (не змінюються між рендерами).</p>`,
    starterCode: `import { useCallback, useMemo, useState } from 'react';

function useToggle(initial = false) {
  // TODO: [value, { toggle, on, off, set }] зі стабільними колбеками
}`,
    solution: `import { useCallback, useMemo, useState } from 'react';

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const handlers = useMemo(
    () => ({
      toggle: () => setValue((v) => !v),
      on: () => setValue(true),
      off: () => setValue(false),
      set: setValue, // сеттер зі useState вже стабільний
    }),
    [], // setValue стабільний → об'єкт створюється один раз
  );

  return [value, handlers] as const;
}`,
    explanation: `<ul class="list">
      <li><code>setValue</code> зі <code>useState</code> гарантовано стабільний між рендерами — тож <code>useMemo(() =&gt; ({...}), [])</code> безпечно створює об'єкт-хендлерів <strong>один раз</strong>.</li>
      <li>Функціональний апдейт <code>setValue(v =&gt; !v)</code> у <code>toggle</code> — не залежить від поточного <code>value</code>, тож замикання не «протухає».</li>
      <li>Стабільні хендлери → компоненти, яким їх передають як пропси, не ре-рендеряться дарма (разом із <code>React.memo</code>).</li>
      <li>Повертаємо кортеж <code>[value, handlers]</code> (як <code>useState</code>), а хендлери групуємо в об'єкт — зручно деструктурувати лише потрібне.</li>
    </ul>`,
  },
  {
    id: 'use-on-click-outside',
    title: 'useOnClickOutside',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'mid',
    tags: ['useRef', 'useEffect', 'events', 'pointerdown'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> <code>useOnClickOutside(ref, handler)</code> — викликає <code>handler</code>, коли клік/тап стався <strong>поза</strong> елементом <code>ref</code> (для закриття дропдаунів, поповерів).</p>
      <ul class="list">
        <li>слухач на <code>document</code>;</li>
        <li>завжди свіжий <code>handler</code> без перепідписки;</li>
        <li>ігнорувати кліки всередині <code>ref</code>.</li>
      </ul>`,
    starterCode: `import { useEffect, useRef, type RefObject } from 'react';

function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  // TODO
}`,
    solution: `import { useEffect, useRef, type RefObject } from 'react';

function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler; // завжди актуальний, без рестарту ефекту

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return; // клік усередині — ігноруємо
      handlerRef.current(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
}`,
    explanation: `<ul class="list">
      <li><code>el.contains(event.target)</code> — перевірка, чи ціль події всередині елемента; якщо ні — це «зовнішній» клік.</li>
      <li><code>handler</code> тримаємо в <code>ref</code>: інакше нестабільний inline-колбек змушував би перепідписувати слухачі на кожен рендер.</li>
      <li><code>mousedown</code>/<code>touchstart</code>, а не <code>click</code> — реагуємо раніше, до можливих <code>stopPropagation</code> і до зміни DOM; закриття відчувається миттєвим.</li>
      <li>Тонкість: якщо тригер (кнопка «відкрити») поза <code>ref</code>, клік по ньому теж вважатиметься «зовнішнім» — тоді або включають тригер у перевірку, або керують станом в одному місці.</li>
    </ul>`,
  },
  {
    id: 'use-media-query',
    title: 'useMediaQuery — реактивний медіа-запит',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'low',
    tags: ['matchMedia', 'useSyncExternalStore', 'SSR'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> <code>useMediaQuery('(min-width: 768px)')</code> → <code>boolean</code>, що реактивно оновлюється при зміні розміру / орієнтації. SSR-safe. Бонус: реалізуй через <code>useSyncExternalStore</code>.</p>`,
    starterCode: `import { useSyncExternalStore } from 'react';

function useMediaQuery(query: string): boolean {
  // TODO
  return false;
}`,
    solution: `import { useCallback, useSyncExternalStore } from 'react';

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false; // на сервері medіа невідома

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}`,
    explanation: `<ul class="list">
      <li><code>window.matchMedia(query)</code> дає <code>MediaQueryList</code> з <code>.matches</code> і подією <code>change</code> — це вже готове «зовнішнє сховище».</li>
      <li><code>useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)</code> — офіційний спосіб підписки на зовнішні джерела: він коректно працює в Concurrent-режимі й не дає «tearing».</li>
      <li><code>getServerSnapshot</code> повертає стабільне значення (<code>false</code>) — інакше hydration mismatch.</li>
      <li>Версія на <code>useState</code> + <code>useEffect</code> теж працює, але має відомий баг: між першим рендером і ефектом значення може бути застарілим.</li>
    </ul>`,
  },
  {
    id: 'use-interval',
    title: 'useInterval (Dan Abramov)',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'low',
    tags: ['useRef', 'useEffect', 'stale closure', 'setInterval'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> <code>useInterval(callback, delay)</code>:</p>
      <ul class="list">
        <li>викликає <strong>найсвіжіший</strong> <code>callback</code> кожні <code>delay</code> мс (без stale closure);</li>
        <li>інтервал <strong>не</strong> перезапускається, коли змінюється лише <code>callback</code>;</li>
        <li><code>delay = null</code> — пауза;</li>
        <li>cleanup при розмонтуванні / зміні <code>delay</code>.</li>
      </ul>`,
    starterCode: `import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  // TODO
}`,
    solution: `import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // тримаємо ref свіжим — окремим ефектом, без залежності від delay
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return; // пауза
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}`,
    explanation: `<ul class="list">
      <li><strong>Дві відповідальності — два ефекти:</strong> один синхронізує <code>savedCallback.current</code> зі свіжим колбеком, другий керує самим інтервалом.</li>
      <li>Інтервал у <code>setInterval</code> викликає <code>savedCallback.current()</code> — завжди останню версію, тож stale closure немає, хоч ефект інтервалу і запущений один раз.</li>
      <li>Масив залежностей другого ефекту — тільки <code>[delay]</code>: зміна колбека не «смикає» таймер (інакше він би скидався на кожному рендері батька з inline-функцією).</li>
      <li><code>delay === null</code> → ефект нічого не робить; повернення до числа — знову ставить таймер.</li>
    </ul>`,
  },
  {
    id: 'use-intersection-observer',
    title: 'useIntersectionObserver',
    level: 'Middle',
    topic: 'React Hooks',
    priority: 'low',
    tags: ['IntersectionObserver', 'useRef', 'useState', 'cleanup'],
    language: 'tsx',
    prompt: `<p><strong>Завдання:</strong> <code>useIntersectionObserver(options?)</code> → <code>[ref, entry]</code>, де <code>ref</code> вішається на елемент, а <code>entry</code> — останній <code>IntersectionObserverEntry</code> (або <code>null</code>). Бонус: опція <code>freezeOnceVisible</code> — перестати спостерігати після першої появи (для lazy-картинок).</p>`,
    starterCode: `import { useEffect, useRef, useState } from 'react';

interface Options extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(options: Options = {}) {
  // TODO
}`,
    solution: `import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver({
  freezeOnceVisible = false,
  ...observerInit
}: Options = {}) {
  const ref = useRef<Element | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = ref.current;
    if (!node || frozen || typeof IntersectionObserver !== 'function') return;

    const observer = new IntersectionObserver(([e]) => setEntry(e), observerInit);
    observer.observe(node);
    return () => observer.disconnect();
    // серіалізуємо примітивні опції, щоб не перестворювати observer щорендеру
  }, [frozen, observerInit.root, observerInit.rootMargin, JSON.stringify(observerInit.threshold)]);

  return [ref, entry] as const;
}`,
    explanation: `<ul class="list">
      <li>Хук володіє <code>ref</code> сам і повертає його назовні — споживач лише вішає на елемент (<code>&lt;div ref={ref}&gt;</code>).</li>
      <li><code>freezeOnceVisible</code>: щойно <code>isIntersecting</code>, ефект бачить <code>frozen === true</code>, відключає observer і більше не створює — типово для lazy-load зображень / «побачив один раз».</li>
      <li>У залежностях — <strong>примітивні</strong> поля опцій (+ <code>JSON.stringify(threshold)</code> для масиву), інакше новий об'єкт <code>options</code> щорендеру перестворював би observer.</li>
      <li><code>observer.disconnect()</code> у cleanup — і при unmount, і при зміні опцій.</li>
    </ul>`,
  },
]
