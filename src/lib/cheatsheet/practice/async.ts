import type { PracticeTask } from '../types'

// Section C of the interview-prep checklist: Promises, the event loop,
// concurrency control and hand-rolled combinators.
export const asyncTasks: PracticeTask[] = [
  {
    id: 'retry-with-backoff-promise',
    title: 'retry() з exponential backoff (Promise)',
    level: 'Middle',
    topic: 'Async',
    priority: 'high',
    tags: ['promise', 'retry', 'backoff', 'async'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>retry(fn, { retries, baseDelay })</code> — викликає асинхронну <code>fn()</code>, і якщо вона відхилилась, повторює до <code>retries</code> разів із <strong>експоненційною</strong> затримкою (<code>baseDelay</code>, <code>baseDelay*2</code>, <code>baseDelay*4</code>, …).</p>
      <ul class="list">
        <li>якщо якась спроба успішна — одразу повертаємо її результат;</li>
        <li>якщо вичерпали всі спроби — відхиляємось <strong>останньою</strong> помилкою;</li>
        <li>додай опційний <code>signal?: AbortSignal</code>, щоб можна було скасувати очікування між спробами.</li>
      </ul>
      <p>Релевантно для нестабільної мережі / фонового service worker (MV3).</p>`,
    starterCode: `interface RetryOptions {
  retries: number;
  baseDelay: number;
  signal?: AbortSignal;
}

async function retry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T> {
  // TODO: до opts.retries повторів, затримка baseDelay * 2 ** attempt,
  // повернути перший успіх або відхилитись останньою помилкою.
  return fn();
}`,
    solution: `function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(id);
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });
  });
}

async function retry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T> {
  const { retries, baseDelay, signal } = opts;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;          // остання спроба — не спимо
      await sleep(baseDelay * 2 ** attempt, signal); // 1x, 2x, 4x, …
    }
  }
  throw lastError;
}`,
    explanation: `<ul class="list">
      <li>Цикл <code>for</code> з <code>await fn()</code> — просте обмеження кількості спроб без рекурсії; <code>attempt === retries</code> перериває цикл <em>перед</em> зайвим сном.</li>
      <li><code>baseDelay * 2 ** attempt</code> дає експоненту. У проді до цього додають «jitter» (випадкові ±) — щоб клієнти не били бекенд синхронно.</li>
      <li><code>sleep</code> слухає <code>AbortSignal</code> і відхиляється <code>AbortError</code>, тож скасування працює навіть під час паузи між спробами.</li>
      <li>Зберігаємо <code>lastError</code> і кидаємо саме її — викликач бачить реальну причину, а не абстрактне «retry failed».</li>
    </ul>`,
  },
  {
    id: 'promise-all-from-scratch',
    title: 'Promise.all() з нуля',
    level: 'Middle',
    topic: 'Async',
    priority: 'mid',
    tags: ['promise', 'combinator', 'aggregate'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>promiseAll(items)</code> — приймає масив проміс(ів)/значень і повертає проміс, що:</p>
      <ul class="list">
        <li>резолвиться масивом результатів у <strong>тому ж порядку</strong>, що й вхід (не порядок завершення);</li>
        <li>відхиляється <strong>одразу</strong>, щойно будь-який елемент відхилився (fail-fast);</li>
        <li>коректно працює на порожньому масиві (резолвиться <code>[]</code>).</li>
      </ul>`,
    starterCode: `function promiseAll<T>(items: Array<T | Promise<T>>): Promise<T[]> {
  // TODO: без використання Promise.all
  return Promise.resolve([]) as Promise<T[]>;
}`,
    solution: `function promiseAll<T>(items: Array<T | Promise<T>>): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const results = new Array<T>(items.length);
    let remaining = items.length;

    if (remaining === 0) {
      resolve(results);
      return;
    }

    items.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;           // пишемо за індексом → порядок збережено
          remaining -= 1;
          if (remaining === 0) resolve(results);
        },
        reject, // перший reject "перемагає"; наступні виклики resolve/reject ігноруються
      );
    });
  });
}`,
    explanation: `<ul class="list">
      <li><code>Promise.resolve(item)</code> нормалізує і «сирі» значення, і проміси — <code>Promise.all</code> робить так само.</li>
      <li>Результати пишемо <strong>за індексом</strong>, а не <code>push</code> — тому порядок відповідає входу попри різний час завершення.</li>
      <li>Лічильник <code>remaining</code> замість перевірки <code>results.length</code>: <code>undefined</code>-значення теж легітимні, довжину масиву не можна використати як «скільки готово».</li>
      <li>Проміс можна зарезолвити/відхилити лише раз — тому перший <code>reject</code> дає fail-fast, а подальші виклики просто no-op.</li>
    </ul>`,
  },
  {
    id: 'promise-allsettled-from-scratch',
    title: 'Promise.allSettled() з нуля',
    level: 'Middle',
    topic: 'Async',
    priority: 'mid',
    tags: ['promise', 'combinator', 'allSettled'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>allSettled(items)</code>, що <strong>ніколи не відхиляється</strong> і резолвиться масивом дескрипторів:</p>
      <ul class="list">
        <li><code>{ status: 'fulfilled', value }</code> — для успішних;</li>
        <li><code>{ status: 'rejected', reason }</code> — для відхилених;</li>
        <li>порядок = порядок входу.</li>
      </ul>`,
    starterCode: `type Settled<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: unknown };

function allSettled<T>(items: Array<Promise<T>>): Promise<Settled<T>[]> {
  // TODO: без Promise.allSettled
  return Promise.resolve([]);
}`,
    solution: `function allSettled<T>(items: Array<Promise<T>>): Promise<Settled<T>[]> {
  return Promise.all(
    items.map((p) =>
      Promise.resolve(p).then(
        (value): Settled<T> => ({ status: 'fulfilled', value }),
        (reason): Settled<T> => ({ status: 'rejected', reason }),
      ),
    ),
  );
}`,
    explanation: `<ul class="list">
      <li>Ключова ідея: кожен проміс «загортаємо» так, щоб він <strong>завжди резолвився</strong> — і успіх, і помилка перетворюються на об'єкт-дескриптор.</li>
      <li>Після цього жоден елемент не може відхилитись, тож <code>Promise.all</code> над обгортками безпечний і зберігає порядок.</li>
      <li>Другий аргумент <code>.then(onFulfilled, onRejected)</code> ловить помилку локально — на відміну від <code>.catch()</code> у ланцюжку, він не перехопить помилку з <code>onFulfilled</code>.</li>
    </ul>`,
  },
  {
    id: 'promise-race-from-scratch',
    title: 'Promise.race() + withTimeout',
    level: 'Middle',
    topic: 'Async',
    priority: 'mid',
    tags: ['promise', 'race', 'timeout'],
    prompt: `<p><strong>Завдання:</strong></p>
      <ul class="list">
        <li>реалізуй <code>race(items)</code> — резолвиться/відхиляється результатом <strong>першого</strong> промісу, що завершився;</li>
        <li>на його основі зроби <code>withTimeout(promise, ms)</code>, який відхиляється <code>Error('Timeout')</code>, якщо <code>promise</code> не встиг за <code>ms</code>.</li>
      </ul>`,
    starterCode: `function race<T>(items: Array<Promise<T>>): Promise<T> {
  // TODO: без Promise.race
  return new Promise<T>(() => {});
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  // TODO: використай race
  return promise;
}`,
    solution: `function race<T>(items: Array<Promise<T>>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    for (const item of items) {
      Promise.resolve(item).then(resolve, reject); // хто перший — той і виграв
    }
  });
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    const id = setTimeout(() => reject(new Error('Timeout')), ms);
    // приберемо таймер, коли основний проміс завершиться першим
    promise.finally(() => clearTimeout(id));
  });
  return race([promise, timeout]);
}`,
    explanation: `<ul class="list">
      <li>Проміс «фіксується» першим викликом <code>resolve</code>/<code>reject</code> — решта ігноруються, тож достатньо підписатись на всі елементи й передати їм <code>resolve</code>/<code>reject</code>.</li>
      <li><code>withTimeout</code> — типовий продовий приклад <code>race</code>: гонка реального промісу з таймером-«будильником».</li>
      <li><code>clearTimeout</code> у <code>finally</code> — щоб «висячий» таймер не тримав event loop живим, коли запит уже відповів.</li>
      <li>Обмеження: програний проміс не скасовується (fetch продовжить летіти) — для реального скасування потрібен <code>AbortController</code>.</li>
    </ul>`,
  },
  {
    id: 'promisify',
    title: 'promisify() — callback → Promise',
    level: 'Middle',
    topic: 'Async',
    priority: 'mid',
    tags: ['promise', 'callback', 'node', 'error-first'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>promisify(fn)</code> для функцій у Node-стилі «error-first callback»: останній аргумент — <code>(err, result) =&gt; void</code>.</p>
      <p>Результат — функція, що приймає ті самі аргументи <strong>без</strong> колбека і повертає <code>Promise</code>: резолвиться <code>result</code>, відхиляється <code>err</code>. Збережи <code>this</code>.</p>`,
    starterCode: `type Callback<R> = (err: unknown, result?: R) => void;

function promisify<A extends unknown[], R>(
  fn: (...args: [...A, Callback<R>]) => void,
) {
  // TODO: повернути (...args: A) => Promise<R>
}

// Приклад: const readFile = promisify(fs.readFile);
// await readFile('a.txt', 'utf8');`,
    solution: `function promisify<A extends unknown[], R>(
  fn: (...args: [...A, Callback<R>]) => void,
) {
  return function (this: unknown, ...args: A): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      fn.call(this, ...args, (err: unknown, result?: R) => {
        if (err) reject(err);
        else resolve(result as R);
      });
    });
  };
}`,
    explanation: `<ul class="list">
      <li>Повертаємо <strong>звичайну</strong> <code>function</code> (не стрілку), щоб <code>this</code> прив'язувався від виклику; далі <code>fn.call(this, …)</code> передає його оригіналу.</li>
      <li>Колбек додаємо <em>останнім</em> аргументом через spread — саме там його очікують Node-style API.</li>
      <li>«Error-first»: якщо <code>err</code> truthy — <code>reject</code>, інакше <code>resolve(result)</code>.</li>
      <li>Обмеження: не підтримує колбеки з кількома результатами (<code>(err, a, b)</code>) — <code>util.promisify</code> для таких випадків має <code>promisify.custom</code>.</li>
    </ul>`,
  },
  {
    id: 'sleep-delay',
    title: 'sleep / delay — пауза на Promise',
    level: 'Middle',
    topic: 'Async',
    priority: 'low',
    tags: ['promise', 'setTimeout', 'async'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>sleep(ms)</code> — повертає проміс, що резолвиться через <code>ms</code> мілісекунд; і <code>delay(value, ms)</code> — резолвиться <code>value</code> через <code>ms</code>. Додай скасування через <code>AbortSignal</code>.</p>`,
    starterCode: `function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  // TODO
  return Promise.resolve();
}`,
    solution: `function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const id = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(id);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

const delay = <T>(value: T, ms: number, signal?: AbortSignal): Promise<T> =>
  sleep(ms, signal).then(() => value);

// Використання: for (const url of urls) { await fetch(url); await sleep(1000); }`,
    explanation: `<ul class="list">
      <li>Базова версія — один рядок: <code>new Promise(r =&gt; setTimeout(r, ms))</code>. Все інше — «senior-штрихи».</li>
      <li>Перевірка <code>signal.aborted</code> <em>до</em> <code>setTimeout</code> — щоб уже скасований сигнал не створював зайвий таймер.</li>
      <li><code>{ once: true }</code> у слухачі <code>abort</code> — автоприбирання лістенера після спрацювання.</li>
      <li><code>delay</code> — тонка обгортка над <code>sleep</code>: зручно вставляти в ланцюжки <code>.then()</code>.</li>
    </ul>`,
  },
  {
    id: 'cancellable-promise',
    title: 'Скасовуваний проміс',
    level: 'Senior',
    topic: 'Async',
    priority: 'low',
    tags: ['promise', 'cancel', 'AbortController'],
    prompt: `<p><strong>Проблема:</strong> нативний <code>Promise</code> не можна «скасувати» — можна лише ігнорувати результат.</p>
      <p><strong>Завдання:</strong> реалізуй <code>makeCancellable(promise)</code>, що повертає <code>{ promise, cancel }</code>: після <code>cancel()</code> обгорнутий проміс <strong>ніколи</strong> не резолвиться і не відхиляється (щоб не тригерити <code>setState</code> в розмонтованому компоненті). Поясни, чому кращий підхід — <code>AbortController</code>.</p>`,
    starterCode: `function makeCancellable<T>(promise: Promise<T>): {
  promise: Promise<T>;
  cancel: () => void;
} {
  // TODO
  return { promise, cancel: () => {} };
}`,
    solution: `function makeCancellable<T>(promise: Promise<T>) {
  let cancelled = false;

  const wrapped = new Promise<T>((resolve, reject) => {
    promise.then(
      (value) => {
        if (!cancelled) resolve(value);
      },
      (error) => {
        if (!cancelled) reject(error);
      },
    );
  });

  return {
    promise: wrapped,
    cancel: () => {
      cancelled = true;
    },
  };
}

// useEffect(() => {
//   const { promise, cancel } = makeCancellable(fetchData());
//   promise.then(setData);
//   return cancel;
// }, []);`,
    explanation: `<ul class="list">
      <li>«Скасування» тут — це <strong>ігнорування</strong> результату: сам оригінальний проміс (і мережевий запит за ним) продовжує виконуватись.</li>
      <li>Прапорець <code>cancelled</code> у замиканні перевіряється перед <code>resolve</code>/<code>reject</code> — після <code>cancel()</code> обгортка «зависає» назавжди, тож <code>.then</code> у компоненті не спрацює.</li>
      <li><strong>Кращий підхід</strong> — <code>AbortController</code>: <code>fetch(url, { signal })</code> реально <em>обриває</em> HTTP-запит і звільняє з'єднання, а не просто глушить результат.</li>
      <li>Вічно-pending проміс — це маленький «витік» (він ніколи не збереться GC, поки живе замикання), тому в новому коді віддають перевагу <code>AbortController</code> + <code>ignore</code>-прапорцю.</li>
    </ul>`,
  },
  {
    id: 'async-series-parallel',
    title: 'Послідовне vs паралельне виконання',
    level: 'Middle',
    topic: 'Async',
    priority: 'low',
    tags: ['async', 'await', 'reduce', 'Promise.all'],
    prompt: `<p><strong>Завдання:</strong> реалізуй дві функції над масивом асинхронних задач <code>tasks: Array&lt;() =&gt; Promise&lt;T&gt;&gt;</code>:</p>
      <ul class="list">
        <li><code>series(tasks)</code> — запускає їх <strong>по черзі</strong> (наступна стартує тільки після завершення попередньої), повертає масив результатів;</li>
        <li><code>parallel(tasks)</code> — запускає <strong>всі одразу</strong>, повертає масив результатів у порядку задач.</li>
      </ul>
      <p>Поясни у розборі типову помилку — <code>forEach</code> з <code>async</code>.</p>`,
    starterCode: `async function series<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  // TODO: строго по черзі
  return [];
}

async function parallel<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  // TODO: усі одразу
  return [];
}`,
    solution: `async function series<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    results.push(await task()); // чекаємо кожну перед наступною
  }
  return results;
}

async function parallel<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  return Promise.all(tasks.map((task) => task())); // усі стартують синхронно в .map
}`,
    explanation: `<ul class="list">
      <li><code>series</code>: <code>for…of</code> + <code>await</code> всередині — єдиний спосіб гарантувати послідовність. <code>reduce</code>-варіант (<code>acc.then(...)</code>) робить те саме, але читається гірше.</li>
      <li><code>parallel</code>: <code>tasks.map(task =&gt; task())</code> <strong>одразу</strong> викликає всі функції → всі проміси вже «в польоті», <code>Promise.all</code> лише чекає й зберігає порядок.</li>
      <li><strong>Типова помилка:</strong> <code>tasks.forEach(async (t) =&gt; { await t() })</code> — <code>forEach</code> не чекає проміси, зовнішня функція завершиться раніше за всі задачі, а помилки будуть unhandled.</li>
      <li>Проміжний варіант — <code>mapLimit</code> (див. «Promise.all із лімітом конкурентності»): паралельно, але не більше N одночасно.</li>
    </ul>`,
  },
  {
    id: 'event-loop-order',
    title: 'Порядок виконання (event loop)',
    level: 'Senior',
    topic: 'Async',
    priority: 'high',
    tags: ['microtask', 'setTimeout', 'promise'],
    prompt: `<p><strong>Завдання:</strong> не запускаючи код, випиши <strong>точний порядок</strong> виводу в консоль і поясни чому. Це класичне питання про мікротаски vs макротаски.</p>
      <p>У редакторі — код. Твоя відповідь: послідовність чисел/рядків та обґрунтування (мікротаски виконуються перед наступною макротаскою).</p>`,
    starterCode: `console.log('1: start');

setTimeout(() => console.log('2: timeout'), 0);

Promise.resolve()
  .then(() => console.log('3: promise A'))
  .then(() => console.log('4: promise B'));

(async () => {
  console.log('5: async start');
  await null;
  console.log('6: after await');
})();

console.log('7: end');

// Питання: у якому порядку зʼявиться вивід?`,
    solution: `// Порядок виводу:
// 1: start
// 5: async start      (синхронна частина async-функції виконується одразу)
// 7: end
// 3: promise A        (мікротаски)
// 6: after await      (продовження після await — теж мікротаска)
// 4: promise B        (наступна мікротаска в ланцюжку .then)
// 2: timeout          (макротаска — останньою)`,
    explanation: `<ul class="list">
      <li>Спершу виконується весь <strong>синхронний</strong> код: <code>1</code>, <code>5</code>, <code>7</code>. Тіло <code>async</code>-функції до першого <code>await</code> — синхронне.</li>
      <li>Далі спорожняється <strong>черга мікротасок</strong> (Promise <code>.then</code>, продовження після <code>await</code>): <code>3</code>, <code>6</code>, <code>4</code>.</li>
      <li>Порядок мікротасок — за моментом їх постановки в чергу: <code>promise A</code> ставиться раніше, ніж продовження <code>await</code>; <code>promise B</code> — уже після резолву <code>A</code>.</li>
      <li><strong>Макротаска</strong> <code>setTimeout</code> (<code>2</code>) — лише коли черга мікротасок порожня.</li>
    </ul>`,
  },
  {
    id: 'promise-pool',
    title: 'Promise.all із лімітом конкурентності',
    level: 'Senior',
    topic: 'Async',
    priority: 'mid',
    tags: ['promise', 'concurrency', 'pool'],
    prompt: `<p><strong>Завдання:</strong> реалізуй <code>mapLimit(items, limit, worker)</code>, який виконує <code>worker(item)</code> для всіх елементів, але <strong>не більше <code>limit</code></strong> одночасно, і повертає результати <strong>у порядку вхідних елементів</strong>.</p>
      <p>Це часте senior-питання: <code>Promise.all</code> запускає все відразу — треба обмежити паралелізм (rate-limit / захист бекенду).</p>`,
    starterCode: `async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  // TODO: не більше \`limit\` одночасних worker(); порядок результатів = порядок items
  return [];
}`,
    solution: `async function mapLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;

  async function runner() {
    while (next < items.length) {
      const current = next++;            // атомарно «беремо» індекс
      results[current] = await worker(items[current], current);
    }
  }

  // Запускаємо min(limit, N) воркерів; кожен тягне наступний елемент
  const pool = Array.from({ length: Math.min(limit, items.length) }, runner);
  await Promise.all(pool);
  return results;
}`,
    explanation: `<ul class="list">
      <li>Замість запуску всіх промісів одразу — <code>limit</code> «воркерів», кожен у циклі бере наступний вільний індекс.</li>
      <li>Спільний лічильник <code>next</code> у замиканні гарантує, що елемент обробиться рівно один раз (JS однопотоковий — гонки на <code>next++</code> немає).</li>
      <li>Результати пишемо за індексом → порядок збережено попри різний час виконання.</li>
    </ul>`,
  },
]
