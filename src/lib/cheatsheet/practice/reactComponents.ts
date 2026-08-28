import type { PracticeTask } from '../types'

// Section D of the interview-prep checklist: React "machine coding" round —
// build a working component in 30–45 min.
export const reactComponentsTasks: PracticeTask[] = [
  {
    id: 'autocomplete-typeahead',
    title: 'Autocomplete / Typeahead',
    level: 'Senior',
    topic: 'React Components',
    priority: 'high',
    language: 'tsx',
    tags: ['debounce', 'AbortController', 'race condition', 'a11y'],
    prompt: `<p><strong>Завдання:</strong> компонент <code>Autocomplete</code> з полем вводу та випадаючим списком підказок.</p>
      <ul class="list">
        <li>запит до <code>search(query, signal)</code> — <strong>дебаунс 300 мс</strong>, порожній запит не шле;</li>
        <li>скасовуй попередній запит (<code>AbortController</code>) — застаріла відповідь не має затирати новішу;</li>
        <li>стани <code>loading</code> / <code>error</code> / порожній результат;</li>
        <li>навігація стрілками ↑/↓, вибір Enter, закриття Esc;</li>
        <li>прибирай «висячий» запит при розмонтуванні.</li>
      </ul>`,
    starterCode: `import { useEffect, useRef, useState } from 'react';

declare function search(query: string, signal: AbortSignal): Promise<string[]>;

function Autocomplete() {
  const [query, setQuery] = useState('');
  // TODO: debounce, AbortController, keyboard nav, стани
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}`,
    solution: `import { useEffect, useRef, useState } from 'react';

function Autocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>('idle');
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setStatus('idle');
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus('loading');
      try {
        const data = await search(q, controller.signal);
        setResults(data);
        setStatus('done');
        setActive(-1);
        setOpen(true);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setStatus('error');
      }
    }, 300);

    return () => {
      clearTimeout(timer);   // скасувати ще не відправлений запит
      controller.abort();    // обірвати вже відправлений
    };
  }, [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') setActive((i) => Math.min(i + 1, results.length - 1));
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(i - 1, 0));
    else if (e.key === 'Enter' && active >= 0) {
      setQuery(results[active]);
      setOpen(false);
    } else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open}
        aria-controls="ac-list"
        aria-activedescendant={active >= 0 ? \`ac-\${active}\` : undefined}
      />
      {open && status === 'done' && (
        <ul id="ac-list" role="listbox">
          {results.length === 0 && <li aria-disabled>Нічого не знайдено</li>}
          {results.map((item, i) => (
            <li
              key={item}
              id={\`ac-\${i}\`}
              role="option"
              aria-selected={i === active}
              onMouseDown={() => { setQuery(item); setOpen(false); }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {status === 'loading' && <span>Завантаження…</span>}
      {status === 'error' && <span>Помилка запиту</span>}
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li>Дебаунс і скасування живуть <strong>в одному ефекті</strong>, залежному від <code>query</code>: cleanup чистить і <code>setTimeout</code>, і <code>AbortController</code> — тож на кожен keystroke стара робота відкидається.</li>
      <li><code>AbortController</code> вирішує race condition <em>на рівні мережі</em>: відповідь на скасований запит приходить як <code>AbortError</code>, який ми ігноруємо — новіша відповідь не затирається.</li>
      <li>Один enum-статус замість <code>isLoading/isError</code> boolean'ів — неможливий суперечливий стан.</li>
      <li>A11y: <code>role="combobox"</code> + <code>aria-activedescendant</code> — скрінрідер озвучує активний пункт без переміщення фокуса з інпута.</li>
      <li><code>onMouseDown</code> (не <code>onClick</code>) на пункті — спрацьовує до <code>blur</code> інпута, тож вибір мишею не «з'їдається» закриттям.</li>
    </ul>`,
  },
  {
    id: 'todo-list',
    title: 'Todo list — add / toggle / delete / filter',
    level: 'Middle',
    topic: 'React Components',
    priority: 'high',
    language: 'tsx',
    tags: ['immutability', 'derived state', 'useMemo'],
    prompt: `<p><strong>Завдання:</strong> <code>TodoApp</code>:</p>
      <ul class="list">
        <li>додавання (Enter або кнопка), не додавати порожні;</li>
        <li>toggle «виконано», видалення;</li>
        <li>фільтр <em>Усі / Активні / Виконані</em> — <strong>похідний</strong> стан, не дублювати списки;</li>
        <li>лічильник активних;</li>
        <li>усі оновлення — <strong>імутабельні</strong>.</li>
      </ul>`,
    starterCode: `import { useMemo, useState } from 'react';

interface Todo { id: number; text: string; done: boolean; }
type Filter = 'all' | 'active' | 'done';

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  // TODO
  return null;
}`,
    solution: `import { useMemo, useState } from 'react';

interface Todo { id: number; text: string; done: boolean; }
type Filter = 'all' | 'active' | 'done';

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [draft, setDraft] = useState('');

  const add = () => {
    const text = draft.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setDraft('');
  };

  const toggle = (id: number) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const remove = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'done') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos],
  );

  return (
    <div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && add()}
      />
      <button onClick={add}>Додати</button>

      <div>
        {(['all', 'active', 'done'] as Filter[]).map((f) => (
          <button key={f} disabled={f === filter} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span style={{ textDecoration: t.done ? 'line-through' : undefined }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)}>×</button>
          </li>
        ))}
      </ul>

      <p>{activeCount} активних</p>
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li>Джерело правди — <strong>один</strong> масив <code>todos</code>. Відфільтрований список і лічильник — <em>похідні</em> через <code>useMemo</code>, а не окремий стан (інакше вони розсинхронізуються).</li>
      <li>Усі мутації через функціональний <code>setTodos(prev =&gt; …)</code> + <code>map</code>/<code>filter</code>/spread — новий масив і нові об'єкти лише там, де змінилось.</li>
      <li><code>toggle</code> створює новий об'єкт тільки для потрібного todo (<code>{ ...t, done: !t.done }</code>) — решта зберігають посилання.</li>
      <li>Ключ <code>t.id</code> (стабільний), не індекс — інакше при фільтрації стан чекбоксів «поїде».</li>
    </ul>`,
  },
  {
    id: 'use-fetch-component',
    title: 'useFetch — custom hook (idle/loading/success/error)',
    level: 'Middle',
    topic: 'React Components',
    priority: 'high',
    language: 'tsx',
    tags: ['custom hook', 'AbortController', 'state machine', 'cleanup'],
    prompt: `<p><strong>Завдання:</strong> хук <code>useFetch&lt;T&gt;(url)</code>, що повертає <code>{ status, data, error, refetch }</code>:</p>
      <ul class="list">
        <li>стани: <code>'idle' | 'loading' | 'success' | 'error'</code>;</li>
        <li>перезапит при зміні <code>url</code>;</li>
        <li>скасування попереднього запиту (<code>AbortController</code>) — без race condition і без <code>setState</code> після unmount;</li>
        <li><code>refetch()</code> для ручного повтору.</li>
      </ul>`,
    starterCode: `import { useCallback, useEffect, useState } from 'react';

type FetchState<T> =
  | { status: 'idle' | 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

function useFetch<T>(url: string) {
  // TODO
}`,
    solution: `import { useCallback, useEffect, useState } from 'react';

type FetchState<T> =
  | { status: 'idle' | 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error };

function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });
  const [nonce, setNonce] = useState(0);
  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json() as Promise<T>;
      })
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((error: Error) => {
        if (error.name === 'AbortError') return; // застарілий/скасований запит
        setState({ status: 'error', data: null, error });
      });

    return () => controller.abort();
  }, [url, nonce]);

  return { ...state, refetch };
}`,
    explanation: `<ul class="list">
      <li>Стан — <strong>дискримінований union</strong>: <code>data</code> непорожня лише при <code>status: 'success'</code>, тож TypeScript не дасть звернутись до <code>data</code> у стані помилки.</li>
      <li><code>AbortController</code> у cleanup: при зміні <code>url</code> (або <code>refetch</code>) старий запит обривається, його <code>AbortError</code> ігнорується — новіша відповідь завжди виграє.</li>
      <li>Cleanup також рятує від <code>setState</code> після unmount — <code>abort()</code> зупиняє ланцюжок <code>.then</code>.</li>
      <li><code>refetch</code> через лічильник <code>nonce</code> у масиві залежностей — стабільна ідіома «запустити ефект заново на вимогу».</li>
    </ul>`,
  },
  {
    id: 'modal-dialog',
    title: 'Modal / Dialog — Portal + focus trap + Esc',
    level: 'Senior',
    topic: 'React Components',
    priority: 'high',
    language: 'tsx',
    tags: ['createPortal', 'focus trap', 'aria-modal', 'useEffect'],
    prompt: `<p><strong>Завдання:</strong> компонент <code>Modal</code>:</p>
      <ul class="list">
        <li>рендер через <code>createPortal</code> у <code>document.body</code>;</li>
        <li>закриття по Esc і по кліку на бекдроп;</li>
        <li><strong>focus trap</strong> — Tab не виходить за межі модалки; при відкритті фокус усередину, при закритті — назад на тригер;</li>
        <li><code>role="dialog"</code>, <code>aria-modal</code>, блокування скролу <code>body</code>.</li>
      </ul>`,
    starterCode: `import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  // TODO: portal, esc, focus trap, scroll lock
  return null;
}`,
    solution: `import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current!;

    // фокус усередину модалки
    const focusables = () =>
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // scroll lock

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus(); // повернути фокус на тригер
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)' }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // клік усередині не закриває
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}`,
    explanation: `<ul class="list">
      <li><code>createPortal</code> у <code>body</code> — модалка виходить за межі <code>overflow:hidden</code> / <code>z-index</code> контейнерів, але лишається в React-дереві (контекст, події працюють).</li>
      <li>Focus trap: на <code>Tab</code>/<code>Shift+Tab</code> на краях списку фокусабельних елементів «загортаємо» фокус назад усередину.</li>
      <li>Зберігаємо <code>document.activeElement</code> до відкриття і повертаємо фокус у cleanup — користувач не «губиться» після закриття.</li>
      <li>Scroll lock через <code>body.style.overflow</code> з відновленням попереднього значення.</li>
      <li>Бекдроп: <code>onClick={onClose}</code>, а на самому діалозі <code>stopPropagation</code> — клік по контенту не закриває.</li>
      <li>У проді краще взяти нативний <code>&lt;dialog&gt;</code> або <code>focus-trap</code>/Radix — тут важливо показати розуміння механіки.</li>
    </ul>`,
  },
  {
    id: 'tabs-compound',
    title: 'Tabs — compound component',
    level: 'Middle',
    topic: 'React Components',
    priority: 'mid',
    language: 'tsx',
    tags: ['compound components', 'context', 'a11y'],
    prompt: `<p><strong>Завдання:</strong> набір <code>&lt;Tabs&gt;</code>, <code>&lt;Tabs.List&gt;</code>, <code>&lt;Tabs.Tab&gt;</code>, <code>&lt;Tabs.Panel&gt;</code> через <strong>compound-component</strong> патерн (спільний стан через Context).</p>
      <ul class="list">
        <li>активна вкладка керується всередині (uncontrolled) або через проп <code>value</code>/<code>onChange</code>;</li>
        <li>клавіатура: ← → перемикають вкладки, панель має <code>role="tabpanel"</code>.</li>
      </ul>`,
    starterCode: `import { createContext, useContext, useId, useState } from 'react';

// TODO: Tabs + Tabs.List + Tabs.Tab + Tabs.Panel через Context
function Tabs() { return null; }`,
    solution: `import { createContext, useContext, useId, useState, type ReactNode } from 'react';

interface TabsCtx {
  active: string;
  setActive: (id: string) => void;
  baseId: string;
}
const Ctx = createContext<TabsCtx | null>(null);
const useTabs = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('Tabs.* must be used within <Tabs>');
  return ctx;
};

function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue);
  const baseId = useId();
  return <Ctx.Provider value={{ active, setActive, baseId }}>{children}</Ctx.Provider>;
}

function List({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabs();
  const selected = active === value;
  return (
    <button
      role="tab"
      id={\`\${baseId}-tab-\${value}\`}
      aria-selected={selected}
      aria-controls={\`\${baseId}-panel-\${value}\`}
      tabIndex={selected ? 0 : -1}
      onClick={() => setActive(value)}
      onKeyDown={(e) => {
        // ← → навігація реалізується на рівні List через refs; спрощено:
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          (e.currentTarget.parentElement?.querySelectorAll('[role=tab]') ?? []) as unknown;
        }
      }}
    >
      {children}
    </button>
  );
}

function Panel({ value, children }: { value: string; children: ReactNode }) {
  const { active, baseId } = useTabs();
  if (active !== value) return null;
  return (
    <div role="tabpanel" id={\`\${baseId}-panel-\${value}\`} aria-labelledby={\`\${baseId}-tab-\${value}\`}>
      {children}
    </div>
  );
}

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

// <Tabs defaultValue="a">
//   <Tabs.List><Tabs.Tab value="a">A</Tabs.Tab><Tabs.Tab value="b">B</Tabs.Tab></Tabs.List>
//   <Tabs.Panel value="a">…</Tabs.Panel>
//   <Tabs.Panel value="b">…</Tabs.Panel>
// </Tabs>`,
    explanation: `<ul class="list">
      <li><strong>Compound components:</strong> публічний API — вкладені елементи, спільний стан ховається в Context. Споживач не передає пропси «наскрізь».</li>
      <li>Хук <code>useTabs</code> кидає помилку поза <code>&lt;Tabs&gt;</code> — рання діагностика неправильного використання.</li>
      <li><code>useId</code> дає стабільні унікальні id для зв'язки <code>aria-controls</code> ↔ <code>aria-labelledby</code> (важливо при кількох Tabs на сторінці, SSR-safe).</li>
      <li><code>tabIndex</code>: активна вкладка <code>0</code>, решта <code>-1</code> — «roving tabindex», щоб Tab заходив у групу один раз, а всередині — стрілки.</li>
      <li><code>Tabs.List = List</code> — присвоєння статичних властивостей для крапкового доступу.</li>
    </ul>`,
  },
  {
    id: 'accordion',
    title: 'Accordion — одна / кілька відкритих',
    level: 'Middle',
    topic: 'React Components',
    priority: 'mid',
    language: 'tsx',
    tags: ['state', 'Set', 'a11y', 'controlled'],
    prompt: `<p><strong>Завдання:</strong> <code>Accordion</code> з секціями:</p>
      <ul class="list">
        <li>проп <code>allowMultiple</code> — можна тримати відкритими кілька, або лише одну;</li>
        <li>заголовок — <code>button</code> з <code>aria-expanded</code>, контент — <code>region</code>;</li>
        <li>керований набір відкритих секцій.</li>
      </ul>`,
    starterCode: `import { useState } from 'react';

interface Item { id: string; title: string; content: React.ReactNode; }

function Accordion({ items, allowMultiple = false }: { items: Item[]; allowMultiple?: boolean }) {
  // TODO
  return null;
}`,
    solution: `import { useState } from 'react';

function Accordion({ items, allowMultiple = false }: { items: Item[]; allowMultiple?: boolean }) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []); // не multiple → скидаємо решту
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id}>
            <button
              aria-expanded={isOpen}
              aria-controls={\`panel-\${item.id}\`}
              id={\`header-\${item.id}\`}
              onClick={() => toggle(item.id)}
            >
              {item.title}
            </button>
            <div
              id={\`panel-\${item.id}\`}
              role="region"
              aria-labelledby={\`header-\${item.id}\`}
              hidden={!isOpen}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li>Стан — <code>Set</code> id відкритих секцій. При <code>!allowMultiple</code> у <code>toggle</code> починаємо з порожнього <code>Set</code> — гарантовано лише одна відкрита.</li>
      <li>Іммутабельно: <code>new Set(prev)</code>, потім <code>add</code>/<code>delete</code> — інакше React не побачить зміну.</li>
      <li><code>aria-expanded</code> на кнопці + <code>hidden</code> на панелі + зв'язка <code>aria-controls</code>/<code>aria-labelledby</code> — мінімальний коректний a11y-контракт.</li>
      <li><code>hidden</code> замість умовного рендеру зберігає стан контенту (напр. позицію скролу) між розкриттями.</li>
    </ul>`,
  },
  {
    id: 'data-table',
    title: 'Data table — сортування + фільтр + пагінація',
    level: 'Senior',
    topic: 'React Components',
    priority: 'mid',
    language: 'tsx',
    tags: ['useMemo', 'derived state', 'generics'],
    prompt: `<p><strong>Завдання:</strong> generic <code>DataTable&lt;T&gt;</code>:</p>
      <ul class="list">
        <li>колонки з <code>key</code>, <code>header</code>, опційним <code>sortable</code>;</li>
        <li>клік по заголовку — сортування asc/desc/none;</li>
        <li>текстовий фільтр по всіх колонках;</li>
        <li>клієнтська пагінація (розмір сторінки);</li>
        <li>фільтр → сортування → пагінація як <strong>ланцюг похідних</strong> обчислень.</li>
      </ul>`,
    starterCode: `import { useMemo, useState } from 'react';

interface Column<T> { key: keyof T; header: string; sortable?: boolean; }

function DataTable<T extends Record<string, unknown>>({
  rows,
  columns,
  pageSize = 10,
}: { rows: T[]; columns: Column<T>[]; pageSize?: number }) {
  // TODO
  return null;
}`,
    solution: `import { useMemo, useState } from 'react';

function DataTable<T extends Record<string, unknown>>({
  rows,
  columns,
  pageSize = 10,
}: { rows: T[]; columns: Column<T>[]; pageSize?: number }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<{ key: keyof T; dir: 'asc' | 'desc' } | null>(null);
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      columns.some((c) => String(row[c.key]).toLowerCase().includes(q)),
    );
  }, [rows, columns, query]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const { key, dir } = sort;
    return [...filtered].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return dir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = useMemo(
    () => sorted.slice(safePage * pageSize, safePage * pageSize + pageSize),
    [sorted, safePage, pageSize],
  );

  const onSort = (key: keyof T) =>
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return null; // третій клік — скидання
    });

  return (
    <div>
      <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} />
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                onClick={c.sortable ? () => onSort(c.key) : undefined}
                aria-sort={
                  sort?.key === c.key
                    ? sort.dir === 'asc' ? 'ascending' : 'descending'
                    : 'none'
                }
              >
                {c.header}
                {sort?.key === c.key ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => <td key={String(c.key)}>{String(row[c.key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={safePage === 0} onClick={() => setPage((p) => p - 1)}>‹</button>
        <span>{safePage + 1} / {pageCount}</span>
        <button disabled={safePage >= pageCount - 1} onClick={() => setPage((p) => p + 1)}>›</button>
      </div>
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li>Три <code>useMemo</code> утворюють <strong>конвеєр</strong>: <code>rows → filtered → sorted → pageRows</code>. Кожен перераховується лише коли змінюється його вхід.</li>
      <li>Сортування — на <strong>копії</strong> (<code>[...filtered].sort()</code>): <code>Array.sort</code> мутує, а <code>filtered</code> може бути самим <code>rows</code>.</li>
      <li><code>safePage</code> замикає сторінку в межах <code>[0, pageCount-1]</code> — коли фільтр зменшив кількість сторінок, не показуємо порожнечу.</li>
      <li>Цикл станів сортування <code>asc → desc → none</code> — типова UX-очікуваність.</li>
      <li>Для великих даних (10k+ рядків) — переносять фільтр/сорт/пагінацію на сервер + віртуалізація рядків (див. секцію System Design).</li>
    </ul>`,
  },
  {
    id: 'star-rating',
    title: 'Star rating — hover + клавіатура',
    level: 'Middle',
    topic: 'React Components',
    priority: 'mid',
    language: 'tsx',
    tags: ['controlled', 'hover state', 'a11y', 'radiogroup'],
    prompt: `<p><strong>Завдання:</strong> <code>StarRating</code> (за замовчуванням 5 зірок):</p>
      <ul class="list">
        <li>hover підсвічує зірки до курсора (тимчасово), клік фіксує значення;</li>
        <li>керований: <code>value</code> + <code>onChange</code>;</li>
        <li>клавіатура: ← → змінюють оцінку; <code>role="radiogroup"</code>;</li>
        <li>проп <code>readOnly</code>.</li>
      </ul>`,
    starterCode: `import { useState } from 'react';

interface Props {
  value: number;
  onChange?: (v: number) => void;
  count?: number;
  readOnly?: boolean;
}

function StarRating({ value, onChange, count = 5, readOnly }: Props) {
  // TODO
  return null;
}`,
    solution: `import { useState } from 'react';

function StarRating({ value, onChange, count = 5, readOnly }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value; // hover має пріоритет над зафіксованим value

  const set = (v: number) => {
    if (readOnly) return;
    onChange?.(v === value ? 0 : v); // повторний клік по тій самій зірці — скидання
  };

  return (
    <div
      role="radiogroup"
      aria-label="Оцінка"
      onMouseLeave={() => setHover(null)}
      onKeyDown={(e) => {
        if (readOnly) return;
        if (e.key === 'ArrowRight') set(Math.min(value + 1, count));
        if (e.key === 'ArrowLeft') set(Math.max(value - 1, 0));
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            role="radio"
            aria-checked={value === starValue}
            tabIndex={readOnly ? -1 : value === starValue || (value === 0 && i === 0) ? 0 : -1}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onClick={() => set(starValue)}
            style={{ cursor: readOnly ? 'default' : 'pointer' }}
          >
            {starValue <= display ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li>Два джерела «скільки зірок світиться»: постійне <code>value</code> і тимчасове <code>hover</code>. <code>display = hover ?? value</code> — hover перекриває, <code>onMouseLeave</code> скидає його.</li>
      <li><code>hover</code> — окремий локальний стан, <strong>не</strong> викликає <code>onChange</code>: батько не має знати про наведення.</li>
      <li><code>role="radiogroup"</code> / <code>role="radio"</code> + <code>aria-checked</code> — семантика «вибір одного з N».</li>
      <li>Roving <code>tabIndex</code>: у групу заходимо Tab'ом один раз, всередині — стрілки.</li>
    </ul>`,
  },
  {
    id: 'pagination-component',
    title: 'Pagination — номери сторінок з еліпсисом',
    level: 'Middle',
    topic: 'React Components',
    priority: 'mid',
    language: 'tsx',
    tags: ['algorithm', 'range', 'a11y'],
    prompt: `<p><strong>Завдання:</strong> <code>Pagination</code> — кнопки сторінок навколо поточної з <code>…</code> для згорнутих діапазонів: <code>1 … 4 5 [6] 7 8 … 20</code>. Пропси: <code>page</code>, <code>pageCount</code>, <code>onChange</code>, <code>siblings = 1</code>.</p>`,
    starterCode: `function getPages(page: number, pageCount: number, siblings = 1): (number | '…')[] {
  // TODO: 1, поточна ± siblings, остання, '…' між розривами
  return [];
}`,
    solution: `function getPages(page: number, pageCount: number, siblings = 1): (number | '…')[] {
  const totalNumbers = siblings * 2 + 5; // first, last, current, 2 dots
  if (pageCount <= totalNumbers) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, pageCount - 1);

  const pages: (number | '…')[] = [1];
  if (left > 2) pages.push('…');
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < pageCount - 1) pages.push('…');
  pages.push(pageCount);
  return pages;
}

function Pagination({
  page, pageCount, onChange, siblings = 1,
}: { page: number; pageCount: number; onChange: (p: number) => void; siblings?: number }) {
  return (
    <nav aria-label="Пагінація">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>‹</button>
      {getPages(page, pageCount, siblings).map((p, i) =>
        p === '…' ? (
          <span key={\`gap-\${i}\`}>…</span>
        ) : (
          <button
            key={p}
            aria-current={p === page ? 'page' : undefined}
            disabled={p === page}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button disabled={page === pageCount} onClick={() => onChange(page + 1)}>›</button>
    </nav>
  );
}`,
    explanation: `<ul class="list">
      <li>Головне — <strong>чиста функція</strong> <code>getPages</code>: її легко протестувати окремо від рендера.</li>
      <li>Якщо сторінок мало (<code>&lt;= totalNumbers</code>) — показуємо всі, без еліпсиса.</li>
      <li>Інакше: завжди <code>1</code> і <code>pageCount</code>, вікно <code>page ± siblings</code>, а <code>…</code> вставляємо лише коли між краєм і вікном є розрив <code>&gt; 1</code>.</li>
      <li><code>aria-current="page"</code> на активній кнопці; <code>…</code> — не інтерактивний <code>span</code>, не кнопка.</li>
    </ul>`,
  },
  {
    id: 'infinite-scroll',
    title: 'Infinite scroll — IntersectionObserver',
    level: 'Senior',
    topic: 'React Components',
    priority: 'mid',
    language: 'tsx',
    tags: ['IntersectionObserver', 'useRef', 'useCallback', 'pagination'],
    prompt: `<p><strong>Завдання:</strong> список, що дозавантажує наступну сторінку, коли «сентинел» унизу з'являється у в'юпорті.</p>
      <ul class="list">
        <li><code>IntersectionObserver</code> на елемент-маркер;</li>
        <li>не робити паралельних запитів (<code>loading</code> guard);</li>
        <li>зупинитись, коли <code>hasMore === false</code>;</li>
        <li>коректно перестворювати observer через <strong>ref-callback</strong>.</li>
      </ul>`,
    starterCode: `import { useCallback, useEffect, useRef, useState } from 'react';

declare function fetchPage(page: number): Promise<{ items: string[]; hasMore: boolean }>;

function InfiniteList() {
  // TODO
  return null;
}`,
    solution: `import { useCallback, useEffect, useRef, useState } from 'react';

function InfiniteList() {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const next = page + 1;
      const res = await fetchPage(next);
      setItems((prev) => [...prev, ...res.items]);
      setHasMore(res.hasMore);
      setPage(next);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      observer.current?.disconnect();
      if (!node) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) loadMore();
      });
      observer.current.observe(node);
    },
    [loadMore],
  );

  useEffect(() => () => observer.current?.disconnect(), []);

  return (
    <div>
      <ul>{items.map((it, i) => <li key={i}>{it}</li>)}</ul>
      {hasMore && <div ref={sentinelRef}>{loading ? 'Завантаження…' : ''}</div>}
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li><strong>Ref-callback</strong> замість <code>useRef</code> + <code>useEffect</code>: коли сентинел монтується/змінюється, React викликає callback — там перестворюємо observer із актуальним <code>loadMore</code>.</li>
      <li><code>loadMore</code> у <code>useCallback</code> із залежностями — при зміні <code>loading</code>/<code>hasMore</code>/<code>page</code> ref-callback перезапускається з новою версією.</li>
      <li><code>loading</code> guard на початку <code>loadMore</code> — сентинел може «блимнути» кілька разів, але паралельних запитів не буде.</li>
      <li>Коли <code>hasMore</code> стає <code>false</code> — сентинел не рендериться, observer відключається.</li>
      <li>Фінальний <code>useEffect</code>-cleanup відключає observer при розмонтуванні всього списку.</li>
    </ul>`,
  },
  {
    id: 'image-carousel',
    title: 'Image carousel — next/prev + автоплей',
    level: 'Middle',
    topic: 'React Components',
    priority: 'low',
    language: 'tsx',
    tags: ['useState', 'useEffect', 'setInterval', 'modulo'],
    prompt: `<p><strong>Завдання:</strong> <code>Carousel</code>:</p>
      <ul class="list">
        <li>кнопки next/prev із <strong>циклічним</strong> переходом;</li>
        <li>індикатори-крапки (клік → перехід);</li>
        <li>автоплей кожні <code>interval</code> мс, який <strong>пауза</strong> при hover і скидає таймер після ручного перемикання;</li>
        <li>cleanup інтервалу.</li>
      </ul>`,
    starterCode: `import { useEffect, useRef, useState } from 'react';

function Carousel({ images, interval = 3000 }: { images: string[]; interval?: number }) {
  // TODO
  return null;
}`,
    solution: `import { useCallback, useEffect, useRef, useState } from 'react';

function Carousel({ images, interval = 3000 }: { images: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i + delta + images.length) % images.length), // модуль з захистом від від'ємних
    [images.length],
  );

  useEffect(() => {
    if (paused || images.length < 2) return;
    const id = setInterval(() => go(1), interval);
    return () => clearInterval(id); // рестарт таймера при зміні index/paused/interval
  }, [go, interval, paused, index, images.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img src={images[index]} alt={\`Слайд \${index + 1}\`} />
      <button onClick={() => go(-1)} aria-label="Попередній">‹</button>
      <button onClick={() => go(1)} aria-label="Наступний">›</button>
      <div role="tablist">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={\`Слайд \${i + 1}\`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li><code>(i + delta + n) % n</code> — циклічний індекс, що працює й для <code>delta = -1</code> (без <code>+ n</code> отримали б <code>-1</code>).</li>
      <li><code>index</code> у масиві залежностей ефекту → після ручного кліку інтервал перезапускається з повного відліку (не «доганяє» одразу).</li>
      <li>Пауза при hover — окремий boolean-стан; ефект просто не ставить таймер, поки <code>paused</code>.</li>
      <li><code>go</code> у <code>useCallback</code> залежить лише від <code>images.length</code> — стабільна між рендерами при незмінному списку.</li>
    </ul>`,
  },
  {
    id: 'file-explorer',
    title: 'File explorer — рекурсивне дерево',
    level: 'Senior',
    topic: 'React Components',
    priority: 'low',
    language: 'tsx',
    tags: ['recursion', 'tree', 'Set', 'a11y'],
    prompt: `<p><strong>Завдання:</strong> <code>FileTree</code> для вкладеної структури тек/файлів:</p>
      <ul class="list">
        <li>рекурсивний компонент <code>Node</code>;</li>
        <li>розкриття/згортання тек (клік по теці);</li>
        <li>відступ за рівнем вкладеності;</li>
        <li>стан розкритих вузлів — підняти в корінь дерева.</li>
      </ul>`,
    starterCode: `interface FSNode {
  name: string;
  type: 'file' | 'folder';
  children?: FSNode[];
}

function FileTree({ root }: { root: FSNode }) {
  // TODO: рекурсивний рендер, розкриття тек
  return null;
}`,
    solution: `import { useState } from 'react';

function FileTree({ root }: { root: FSNode }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([root.name]));

  const toggle = (path: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(path) ? next.delete(path) : next.add(path);
      return next;
    });

  const renderNode = (node: FSNode, path: string, depth: number) => {
    const isFolder = node.type === 'folder';
    const isOpen = expanded.has(path);

    return (
      <li key={path} role="treeitem" aria-expanded={isFolder ? isOpen : undefined}>
        <span
          style={{ paddingLeft: depth * 16, cursor: isFolder ? 'pointer' : 'default' }}
          onClick={() => isFolder && toggle(path)}
        >
          {isFolder ? (isOpen ? '📂' : '📁') : '📄'} {node.name}
        </span>
        {isFolder && isOpen && node.children && (
          <ul role="group">
            {node.children.map((child) =>
              renderNode(child, \`\${path}/\${child.name}\`, depth + 1),
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul role="tree">{renderNode(root, root.name, 0)}</ul>
  );
}`,
    explanation: `<ul class="list">
      <li>Рекурсія по структурі: <code>renderNode</code> викликає себе для <code>children</code>, збільшуючи <code>depth</code> (відступ) і накопичуючи <code>path</code> як унікальний ключ.</li>
      <li>Стан розкритих вузлів — <strong>один <code>Set</code></strong> у корені (за повним шляхом), а не boolean у кожному вузлі: простіше скидати/зберігати, немає дубльованого стану.</li>
      <li>Файли не мають <code>aria-expanded</code>; теки — <code>role="treeitem"</code> + вкладений <code>role="group"</code>.</li>
      <li>Для дуже великих дерев — ліниве завантаження <code>children</code> при першому розкритті + віртуалізація видимих рядків.</li>
    </ul>`,
  },
  {
    id: 'stepper-progress',
    title: 'Stepper — багатокроковий індикатор',
    level: 'Middle',
    topic: 'React Components',
    priority: 'low',
    language: 'tsx',
    tags: ['state', 'wizard', 'a11y', 'guard'],
    prompt: `<p><strong>Завдання:</strong> <code>Stepper</code> для майстра з кроків:</p>
      <ul class="list">
        <li>next/back, не вийти за межі <code>[0, steps-1]</code>;</li>
        <li>візуальний прогрес (заповнена смуга + номери);</li>
        <li>заборона переходу вперед, якщо поточний крок не валідний (проп <code>canProceed</code>);</li>
        <li>клік по вже пройденому кроку — повернутись назад.</li>
      </ul>`,
    starterCode: `import { useState } from 'react';

function Stepper({ steps, canProceed = true }: { steps: string[]; canProceed?: boolean }) {
  // TODO
  return null;
}`,
    solution: `import { useState } from 'react';

function Stepper({ steps, canProceed = true }: { steps: string[]; canProceed?: boolean }) {
  const [current, setCurrent] = useState(0);
  const last = steps.length - 1;

  const next = () => {
    if (current < last && canProceed) setCurrent((c) => c + 1);
  };
  const back = () => setCurrent((c) => Math.max(c - 1, 0));
  const goTo = (i: number) => {
    if (i < current) setCurrent(i); // тільки назад по пройдених
  };

  const percent = (current / last) * 100;

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
      >
        <div style={{ width: \`\${percent}%\`, height: 4, background: 'currentColor' }} />
      </div>

      <ol>
        {steps.map((label, i) => (
          <li key={label} aria-current={i === current ? 'step' : undefined}>
            <button
              disabled={i >= current}
              onClick={() => goTo(i)}
            >
              {i < current ? '✓' : i + 1}
            </button>
            {label}
          </li>
        ))}
      </ol>

      <button disabled={current === 0} onClick={back}>Назад</button>
      <button disabled={current === last || !canProceed} onClick={next}>Далі</button>
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li>Один числовий стан <code>current</code>; усі переходи затиснуті в <code>[0, last]</code> через <code>Math.max</code>/умови.</li>
      <li><code>canProceed</code> — зовнішній guard: батько знає, чи валідна форма поточного кроку, і блокує «Далі».</li>
      <li>Навігація кліком — лише на <code>i &lt; current</code> (назад по пройдених крокам); вперед стрибати не можна.</li>
      <li><code>role="progressbar"</code> з <code>aria-valuenow/min/max</code> — скрінрідер озвучує «крок 2 з 4».</li>
    </ul>`,
  },
  {
    id: 'toast-queue',
    title: 'Toast / notification — черга + автозакриття',
    level: 'Senior',
    topic: 'React Components',
    priority: 'low',
    language: 'tsx',
    tags: ['context', 'queue', 'setTimeout', 'portal', 'a11y'],
    prompt: `<p><strong>Завдання:</strong> система тостів через Context:</p>
      <ul class="list">
        <li><code>useToast()</code> → <code>toast(message, { type, duration })</code>;</li>
        <li>кілька тостів одночасно (стек), кожен авто-закривається через <code>duration</code>;</li>
        <li>ручне закриття (×), таймер очищається при розмонтуванні;</li>
        <li>контейнер — <code>aria-live="polite"</code>, рендер через портал.</li>
      </ul>`,
    starterCode: `import { createContext, useCallback, useContext, useState } from 'react';

// TODO: ToastProvider + useToast + ToastViewport
function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}`,
    solution: `import {
  createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface Toast { id: number; message: string; type: 'info' | 'success' | 'error'; duration: number; }
type ToastInput = { type?: Toast['type']; duration?: number };

const ToastCtx = createContext<((msg: string, opts?: ToastInput) => void) | null>(null);
export const useToast = () => {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
  }, []);

  const toast = useCallback(
    (message: string, opts: ToastInput = {}) => {
      const id = Date.now() + Math.random();
      const duration = opts.duration ?? 4000;
      setToasts((prev) => [...prev, { id, message, type: opts.type ?? 'info', duration }]);
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
    },
    [dismiss],
  );

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach(clearTimeout); // усі «висячі» таймери при unmount
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      {createPortal(
        <div aria-live="polite" style={{ position: 'fixed', top: 16, right: 16 }}>
          {toasts.map((t) => (
            <div key={t.id} role="status" data-type={t.type}>
              {t.message}
              <button onClick={() => dismiss(t.id)} aria-label="Закрити">×</button>
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastCtx.Provider>
  );
}`,
    explanation: `<ul class="list">
      <li>Стан — масив тостів; <code>toast()</code> додає (spread), <code>dismiss()</code> прибирає (<code>filter</code>) — обидва імутабельно.</li>
      <li>Таймери зберігаються в <code>useRef(Map)</code> за <code>id</code> — не викликають ре-рендер, і кожен можна скасувати індивідуально (ручне закриття) або всі разом при unmount.</li>
      <li>Провайдер віддає <strong>лише функцію</strong> <code>toast</code> через Context — стабільну (<code>useCallback</code>), тож споживачі не ре-рендеряться від появи нових тостів.</li>
      <li><code>aria-live="polite"</code> на контейнері + <code>role="status"</code> — скрінрідер зачитує нові повідомлення, не перебиваючи користувача.</li>
      <li>Портал у <code>body</code> — тости поверх усього, поза <code>overflow</code>/<code>transform</code> контекстами.</li>
    </ul>`,
  },
  {
    id: 'debounced-search-input',
    title: 'Debounced search input (мінімальний приклад)',
    level: 'Middle',
    topic: 'React Components',
    priority: 'mid',
    language: 'tsx',
    tags: ['useEffect', 'debounce', 'controlled input'],
    prompt: `<p><strong>Завдання:</strong> мінімальний <code>SearchInput</code>: користувач друкує, а <code>onSearch(term)</code> викликається лише через 400 мс після зупинки набору. Порожній рядок — теж валідний виклик (скидання). Без сторонніх бібліотек.</p>`,
    starterCode: `import { useEffect, useState } from 'react';

function SearchInput({ onSearch }: { onSearch: (term: string) => void }) {
  const [value, setValue] = useState('');
  // TODO: викликати onSearch(value) з дебаунсом 400 мс
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}`,
    solution: `import { useEffect, useRef, useState } from 'react';

function SearchInput({ onSearch }: { onSearch: (term: string) => void }) {
  const [value, setValue] = useState('');
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch; // завжди свіжий колбек, без рестарту ефекту

  useEffect(() => {
    const id = setTimeout(() => onSearchRef.current(value.trim()), 400);
    return () => clearTimeout(id); // кожен keystroke скасовує попередній таймер
  }, [value]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Пошук…"
      aria-label="Пошук"
    />
  );
}`,
    explanation: `<ul class="list">
      <li>Дебаунс = <code>setTimeout</code> в ефекті + <code>clearTimeout</code> у cleanup. Ефект залежить від <code>value</code>, тож кожна зміна скасовує попередній відкладений виклик.</li>
      <li><code>onSearch</code> тримаємо в <code>ref</code> і не додаємо в залежності: якщо батько передає новий inline-колбек на кожен рендер, ефект не має через це перезапускати таймер.</li>
      <li>Відрізняється від хука <code>useDebouncedValue</code>: тут дебаунсимо <em>побічний ефект</em> (виклик), а не значення для рендера.</li>
      <li><code>value.trim()</code> — не шлемо запит по пробілах; порожній рядок передаємо свідомо (скидання результатів).</li>
    </ul>`,
  },
  {
    id: 'react-fetch-user-retry',
    title: 'Fetch користувача з ретраями',
    level: 'Middle',
    topic: 'React Components',
    priority: 'mid',
    tags: ['useEffect', 'useState', 'retry', 'error handling'],
    language: 'tsx',
    prompt: `<p><strong>Дано:</strong> функція <code>fetchUser()</code> — вона <em>рандомно</em> (через <code>setTimeout</code>) або резолвиться з даними користувача (<code>name</code>, <code>email</code>), або відхиляється з помилкою. Змінювати саму <code>fetchUser</code> не можна.</p>
      <p><strong>Завдання:</strong> реалізуй компонент <code>UserProfile</code>, який:</p>
      <ul class="list">
        <li>при монтуванні викликає <code>fetchUser()</code>;</li>
        <li>якщо запит <strong>успішний</strong> — показує ім'я та email користувача;</li>
        <li>якщо <strong>перша</strong> спроба провалилась — показує проміжний текст (наприклад, «Не вдалося завантажити, повторюємо…») і <strong>повторює</strong> запит ще раз;</li>
        <li>якщо провалилась і <strong>друга</strong> спроба (два фейли поспіль) — показує фінальний текст помилки і <strong>більше не робить запитів</strong> (без нескінченних ретраїв).</li>
      </ul>`,
    starterCode: `interface User {
  name: string;
  email: string;
}

// Задана функція — не змінювати. Рандомно (~40%) відхиляє проміс.
function fetchUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.4) {
        reject(new Error('Network error'));
      } else {
        resolve({ name: 'Іван Петренко', email: 'ivan@example.com' });
      }
    }, 500);
  });
}

function UserProfile() {
  // TODO:
  // 1. Викликати fetchUser() при монтуванні компонента.
  // 2. Якщо успіх — показати ім'я та email.
  // 3. Якщо 1-ша спроба невдала — показати текст "Не вдалося завантажити, повторюємо…"
  //    і повторити запит ще раз.
  // 4. Якщо 2-га спроба теж невдала — показати текст "Не вдалося завантажити користувача"
  //    і зупинитись (без подальших запитів).

  return null;
}`,
    solution: `type Status = 'loading' | 'retrying' | 'success' | 'error';

function UserProfile() {
  const [status, setStatus] = useState<Status>('loading');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const data = await fetchUser();
          if (!cancelled) {
            setUser(data);
            setStatus('success');
          }
          return; // успіх — далі не пробуємо
        } catch {
          if (cancelled) return;
          setStatus(attempt === 1 ? 'retrying' : 'error');
        }
      }
    }

    load();
    return () => {
      cancelled = true; // не робити setState після unmount
    };
  }, []);

  if (status === 'loading') return <p>Завантаження…</p>;
  if (status === 'retrying') return <p>Не вдалося завантажити, повторюємо…</p>;
  if (status === 'error') return <p>Не вдалося завантажити користувача</p>;

  return (
    <div>
      <p>{user!.name}</p>
      <p>{user!.email}</p>
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li><code>for</code>-цикл з <code>await fetchUser()</code> усередині <code>useEffect</code> — просте й читабельне обмеження кількості спроб: 1 початкова + 1 ретрай, без рекурсії чи бібліотек.</li>
      <li>Статус — це <strong>одна</strong> змінна-«машина станів» (<code>'loading' | 'retrying' | 'success' | 'error'</code>), а не набір окремих boolean-прапорців (<code>isLoading</code>, <code>isError</code>, ...) — так неможливо потрапити в суперечливий стан («і завантаження, і помилка одночасно»).</li>
      <li><code>cancelled</code>-прапорець у cleanup-функції ефекту захищає від класичної помилки: <code>setState</code> викликається вже після того, як компонент розмонтувався (запит все ще "летить").</li>
      <li>Порожній масив залежностей <code>[]</code> — запит запускається рівно один раз при монтуванні, ретраї відбуваються <em>всередині</em> цього самого виклику ефекту, а не через повторний рендер/ефект.</li>
    </ul>`,
  },
]
