import type { PracticeTask } from '../types'

// Section F of the interview-prep checklist: "read the code, find & fix the bug".
export const reactDebuggingTasks: PracticeTask[] = [
  {
    id: 'react-stale-closure-interval',
    title: 'Застарілий closure в setInterval',
    level: 'Senior',
    topic: 'React Debugging',
    priority: 'high',
    tags: ['useEffect', 'useRef', 'stale closure'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>Ticker</code> має рахувати секунди, але лічильник застряє на <code>1</code> й далі не росте.</p>
      <p><strong>Завдання:</strong> полагодь так, щоб <code>count</code> коректно інкрементувався щосекунди, а <code>setInterval</code> ставився <strong>один раз</strong> (без перезапуску ефекту на кожен рендер).</p>`,
    starterCode: `import { useEffect, useState } from 'react';

function Ticker() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // TODO: тут count завжди 0 (застарілий closure) — лічильник "застряг" на 1
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []); // навмисно порожній масив — інтервал ставиться один раз

  return <p>Count: {count}</p>;
}`,
    solution: `useEffect(() => {
  const id = setInterval(() => {
    setCount((c) => c + 1); // функціональне оновлення — не залежить від застарілого closure
  }, 1000);

  return () => clearInterval(id);
}, []);`,
    explanation: `<ul class="list">
      <li>Ефект (і, відповідно, <code>setInterval</code>) запускається лише один раз через <code>[]</code>, тож колбек назавжди «замкнутий» на значення <code>count</code> зі свого першого виклику — <code>0</code>.</li>
      <li><code>setCount(count + 1)</code> щоразу рахує <code>0 + 1</code> — тому лічильник показує сталу <code>1</code>.</li>
      <li>Функціональна форма <code>setCount(c =&gt; c + 1)</code> не читає зовнішню змінну — React сам передає актуальне значення, тож застарілий closure більше не заважає.</li>
      <li>Для складніших випадків (коли інтервалу потрібні кілька «свіжих» значень або функцій) типовий патерн — тримати актуальний колбек у <code>useRef</code> і викликати <code>ref.current()</code> всередині <code>setInterval</code>.</li>
    </ul>`,
  },
  {
    id: 'react-missing-dependency',
    title: 'Missing dependency в useEffect',
    level: 'Middle',
    topic: 'React Debugging',
    priority: 'high',
    tags: ['useEffect', 'dependency array', 'stale'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>SearchResults</code> робить запит у <code>useEffect</code>, але при зміні пропа <code>query</code> результати <strong>не оновлюються</strong> — показує відповідь на найперший <code>query</code>.</p>
      <p><strong>Завдання:</strong> знайди причину і полагодь. Поясни, чому «просто прибрати ESLint-warning через <code>// eslint-disable</code>» — погана ідея.</p>`,
    starterCode: `import { useEffect, useState } from 'react';

declare function api(q: string): Promise<string[]>;

function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    api(query).then(setResults);
  }, []); // ← масив залежностей

  return <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>;
}`,
    solution: `function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;
    api(query).then((data) => {
      if (!ignore) setResults(data);
    });
    return () => { ignore = true; };
  }, [query]); // ← query у залежностях: ефект перезапускається при його зміні

  return <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>;
}`,
    explanation: `<ul class="list">
      <li>Порожній <code>[]</code> означає «запустити ефект один раз» — при зміні <code>query</code> React його не перезапускає, тож запит іде лише зі стартовим значенням.</li>
      <li>Правило: у масиві залежностей мають бути <strong>всі</strong> реактивні значення, які ефект читає (<code>query</code>). ESLint-плагін <code>react-hooks/exhaustive-deps</code> саме це і перевіряє.</li>
      <li><code>// eslint-disable</code> ховає симптом, а не причину: баг лишається, і наступний розробник не бачить, що залежність «навмисно» пропущена.</li>
      <li>Додано <code>ignore</code>-guard — заодно закриває race condition при швидкій зміні <code>query</code>.</li>
    </ul>`,
  },
  {
    id: 'react-direct-state-mutation',
    title: 'Пряма мутація стану',
    level: 'Middle',
    topic: 'React Debugging',
    priority: 'high',
    tags: ['immutability', 'setState', 're-render'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> кнопка «Додати» в <code>TodoList</code> начебто працює (дані змінюються), але новий елемент <strong>не з'являється</strong> на екрані, поки не станеться інший ре-рендер.</p>
      <p><strong>Завдання:</strong> знайди й виправ усі місця з мутацією стану (їх кілька).</p>`,
    starterCode: `import { useState } from 'react';

interface Todo { id: number; text: string; done: boolean; }

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const add = (text: string) => {
    todos.push({ id: Date.now(), text, done: false }); // 1
    setTodos(todos); // 2 — те саме посилання
  };

  const toggle = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) todo.done = !todo.done; // 3
    setTodos(todos); // 4
  };

  return null;
}`,
    solution: `const add = (text: string) => {
  setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
};

const toggle = (id: number) => {
  setTodos((prev) =>
    prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
  );
};`,
    explanation: `<ul class="list">
      <li><code>todos.push(...)</code> мутує наявний масив; <code>setTodos(todos)</code> отримує <strong>те саме посилання</strong> — <code>Object.is(prev, next)</code> дає <code>true</code>, React вважає, що стан не змінився, і пропускає ре-рендер.</li>
      <li><code>todo.done = !todo.done</code> — та сама проблема на рівні об'єкта елемента.</li>
      <li>Фікс: завжди <strong>новий</strong> масив (<code>[...prev, x]</code>, <code>prev.map(...)</code>, <code>prev.filter(...)</code>) і <strong>нові</strong> об'єкти для змінених елементів (<code>{ ...t, done: !t.done }</code>).</li>
      <li>Функціональний апдейт <code>setTodos(prev =&gt; ...)</code> — коректно працює при кількох оновленнях поспіль і не залежить від застарілого <code>todos</code>.</li>
    </ul>`,
  },
  {
    id: 'react-missing-cleanup',
    title: 'Відсутній cleanup (leak підписки)',
    level: 'Middle',
    topic: 'React Debugging',
    priority: 'mid',
    tags: ['useEffect', 'cleanup', 'event listener', 'memory leak'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>WindowSize</code> підписується на <code>resize</code>, але:</p>
      <ul class="list">
        <li>слухач ніколи не знімається — після кількох монтувань їх багато, і в консолі попередження про <code>setState</code> на розмонтованому компоненті;</li>
        <li>ще й <code>setInterval</code> для лог-хартбіту не чиститься.</li>
      </ul>
      <p><strong>Завдання:</strong> додай коректний cleanup.</p>`,
    starterCode: `import { useEffect, useState } from 'react';

function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    setInterval(() => console.log('alive', window.innerWidth), 5000);
  }, []);

  return <p>{width}px</p>;
}`,
    solution: `useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', onResize);

  const id = setInterval(() => console.log('alive', window.innerWidth), 5000);

  return () => {
    window.removeEventListener('resize', onResize); // та сама референція, що й додавали
    clearInterval(id);
  };
}, []);`,
    explanation: `<ul class="list">
      <li>Cleanup-функція ефекту виконується при розмонтуванні (і перед кожним повторним запуском ефекту) — саме туди йде <code>removeEventListener</code> / <code>clearInterval</code>.</li>
      <li><code>removeEventListener</code> вимагає <strong>ту саму</strong> функцію-референцію, що передавали в <code>addEventListener</code> — тому виносимо <code>onResize</code> в іменовану змінну, а не inline-стрілку.</li>
      <li>Без cleanup: кожне монтування додає новий слухач/таймер, старі продовжують жити й тримати замикання (та компонент) → витік пам'яті + попередження про <code>setState</code> після unmount.</li>
      <li>У Strict Mode (dev) React навмисно монтує компонент двічі — щоб такі відсутні cleanup'и одразу впадали в очі.</li>
    </ul>`,
  },
  {
    id: 'react-index-as-key',
    title: 'Index як key у динамічному списку',
    level: 'Middle',
    topic: 'React Debugging',
    priority: 'mid',
    tags: ['key', 'reconciliation', 'list', 'state'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> список задач з інпутом-нотаткою в кожному рядку. Після видалення <strong>першого</strong> рядка нотатки «з'їжджають» — текст, який був у другому рядку, тепер показується в першому.</p>
      <p><strong>Завдання:</strong> поясни, чому <code>key={index}</code> тут баг, і виправ.</p>`,
    starterCode: `import { useState } from 'react';

interface Task { id: string; title: string; }

function TaskList({ tasks, onRemove }: { tasks: Task[]; onRemove: (id: string) => void }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.title}
          <input placeholder="Нотатка…" /> {/* неконтрольований — стан живе в DOM */}
          <button onClick={() => onRemove(task.id)}>×</button>
        </li>
      ))}
    </ul>
  );
}`,
    solution: `<ul>
  {tasks.map((task) => (
    <li key={task.id}> {/* стабільний ідентифікатор елемента, а не позиція */}
      {task.title}
      <input placeholder="Нотатка…" />
      <button onClick={() => onRemove(task.id)}>×</button>
    </li>
  ))}
</ul>`,
    explanation: `<ul class="list">
      <li><code>key</code> каже React, «який елемент є яким» між рендерами. З <code>key={index}</code> після видалення першого рядка елемент, що був <code>key=1</code>, стає <code>key=0</code> — React вважає, що це «той самий» перший рядок, і <strong>перевикористовує</strong> його DOM/стан.</li>
      <li>Неконтрольований <code>&lt;input&gt;</code> тримає значення в DOM-вузлі — тож перевикористаний вузол приносить чужий текст. Те саме сталося б зі станом у дочірньому компоненті, фокусом, анімацією.</li>
      <li>Стабільний <code>key={task.id}</code> прив'язує ідентичність до <em>даних</em>, а не до позиції — React коректно видаляє саме той вузол.</li>
      <li>Індекс як key прийнятний лише коли список статичний (не сортується, не фільтрується, елементи не додаються/видаляються з середини).</li>
    </ul>`,
  },
  {
    id: 'react-stale-response-race',
    title: 'Race condition при зміні id (застаріла відповідь)',
    level: 'Senior',
    topic: 'React Debugging',
    priority: 'high',
    tags: ['useEffect', 'race condition', 'cleanup'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>UserCard</code> отримує <code>userId</code> і завантажує користувача. При швидкій зміні <code>userId</code> (наприклад, клацання по списку) повільніша відповідь на СТАРИЙ запит може прийти пізніше і затерти дані вже нового користувача.</p>
      <p><strong>Завдання:</strong> полагодь так, щоб застосовувалась лише відповідь, що відповідає <strong>останньому</strong> запитаному <code>userId</code>.</p>`,
    starterCode: `import { useEffect, useState } from 'react';

interface User { id: number; name: string; }

declare function fetchUserById(id: number): Promise<User>; // затримка різна для різних id, не контролюється

function UserCard({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TODO: якщо userId змінюється швидко, стара (повільніша) відповідь
    // може прийти пізніше і затерти дані вже нового користувача.
    fetchUserById(userId).then((data) => setUser(data));
  }, [userId]);

  if (!user) return <p>Завантаження…</p>;
  return <p>{user.name}</p>;
}`,
    solution: `function UserCard({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let ignore = false;
    setUser(null); // скидаємо, поки чекаємо новий запит

    fetchUserById(userId).then((data) => {
      if (!ignore) setUser(data); // застосовуємо лише якщо цей запит все ще актуальний
    });

    return () => {
      ignore = true; // при зміні userId (або unmount) позначаємо цей запит застарілим
    };
  }, [userId]);

  if (!user) return <p>Завантаження…</p>;
  return <p>{user.name}</p>;
}`,
    explanation: `<ul class="list">
      <li>Cleanup-функція <code>useEffect</code> виконується перед <strong>кожним</strong> повторним запуском ефекту (не лише при unmount) — саме там позначаємо попередній запит застарілим.</li>
      <li>Прапорець <code>ignore</code> — найпростіший спосіб захисту; для реальних HTTP-запитів варто ще й скасовувати сам fetch через <code>AbortController</code>, щоб не витрачати мережу даремно (React-стан і без цього вже в безпеці).</li>
      <li>Відрізняється від <code>react-fetch-user-retry</code>: там <code>cancelled</code>-прапорець захищав від <code>setState</code> після unmount під час <em>ретраїв одного запиту</em>; тут — від застосування <em>застарілої відповіді</em>, коли сам <code>userId</code> вже змінився кілька разів поспіль.</li>
    </ul>`,
  },
  {
    id: 'react-memo-referential-equality',
    title: 'React.memo не рятує від зайвих рендерів',
    level: 'Senior',
    topic: 'React Debugging',
    priority: 'high',
    tags: ['memo', 'useCallback', 'referential equality'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> <code>Row</code> обгорнутий у <code>React.memo</code>, але при кліку на кнопку «tick» (стан, ніяк не пов'язаний зі списком) кожен <code>Row</code> все одно ре-рендериться.</p>
      <p><strong>Завдання:</strong> зроби так, щоб клік на «tick» <strong>не</strong> викликав ре-рендер жодного <code>Row</code>, не знімаючи <code>memo</code> з компонента.</p>`,
    starterCode: `import { memo, useState } from 'react';

interface RowProps {
  id: number;
  label: string;
  onSelect: (id: number) => void;
  style: React.CSSProperties;
}

const Row = memo(function Row({ id, label, onSelect, style }: RowProps) {
  console.log('render Row', id);
  return (
    <div style={style} onClick={() => onSelect(id)}>
      {label}
    </div>
  );
});

interface ListProps {
  items: { id: number; label: string }[];
  onSelectItem: (id: number) => void; // припускаємо: стабільна референція
}

function ItemList({ items, onSelectItem }: ListProps) {
  const [tick, setTick] = useState(0); // не пов'язано зі списком

  return (
    <div>
      <button onClick={() => setTick((t) => t + 1)}>tick: {tick}</button>
      {items.map((item) => (
        <Row
          key={item.id}
          id={item.id}
          label={item.label}
          onSelect={(id) => onSelectItem(id)} // TODO: нова функція щоразу
          style={{ padding: 8 }} // TODO: новий об'єкт щоразу
        />
      ))}
    </div>
  );
}`,
    solution: `const rowStyle: React.CSSProperties = { padding: 8 }; // hoisted — стабільне посилання

function ItemList({ items, onSelectItem }: ListProps) {
  const [tick, setTick] = useState(0);

  return (
    <div>
      <button onClick={() => setTick((t) => t + 1)}>tick: {tick}</button>
      {items.map((item) => (
        <Row
          key={item.id}
          id={item.id}
          label={item.label}
          onSelect={onSelectItem} // стабільна референція, id передається окремим пропом
          style={rowStyle}
        />
      ))}
    </div>
  );
}`,
    explanation: `<ul class="list">
      <li><code>React.memo</code> робить shallow-порівняння пропів. Новий inline-об'єкт чи функція на кожен рендер батька — новий за посиланням, тож <code>Row</code> вважається «зміненим», навіть якщо дані ті самі.</li>
      <li><code>style</code> — статичний об'єкт, тож просто виносимо його за межі компонента (module-level константа) — нуль ре-рендерів через нього.</li>
      <li>Замість створення нової функції-обгортки для кожного item на кожному рендері батька, передаємо стабільний <code>onSelectItem</code> і сирий <code>id</code> окремо; сам виклик <code>onSelect(id)</code> формується вже всередині <code>Row</code> — там це не проблема, бо ця функція не є пропом, який порівнює <code>memo</code>.</li>
      <li>Якщо сам <code>onSelectItem</code> нестабільний (створюється вище по дереву), його теж треба обгорнути в <code>useCallback</code> — інакше проблема просто переїде на рівень вище.</li>
    </ul>`,
  },
]
