import type { PracticeTask } from '../types'

// React Native-specific exercises (AsyncStorage, FlatList, AppState).
export const reactNativeTasks: PracticeTask[] = [
  {
    id: 'react-native-async-storage-hook',
    title: 'Типізований useAsyncStorage хук',
    level: 'Middle',
    topic: 'React Native',
    priority: 'mid',
    tags: ['AsyncStorage', 'useEffect', 'custom hook'],
    language: 'tsx',
    prompt: `<p><strong>Дано:</strong> AsyncStorage — асинхронний key-value store (аналог <code>localStorage</code> у React Native).</p>
      <p><strong>Завдання:</strong> реалізуй типізований хук <code>useAsyncStorage&lt;T&gt;(key: string, initialValue: T)</code>, який:</p>
      <ul class="list">
        <li>при монтуванні завантажує значення з AsyncStorage за <code>key</code> (JSON.parse), поки триває завантаження — повертає <code>loading: true</code>;</li>
        <li>якщо значення в сховищі немає — використовує <code>initialValue</code>;</li>
        <li>якщо <code>JSON.parse</code> впав (пошкоджені дані) — не кидає помилку назовні, а тихо повертається до <code>initialValue</code>;</li>
        <li>повертає <code>setValue</code>, яка одночасно оновлює React-стан <strong>і</strong> персистить нове значення (JSON.stringify) в AsyncStorage.</li>
      </ul>`,
    starterCode: `import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage<T>(key: string, initialValue: T) {
  // TODO:
  // 1. При монтуванні завантажити значення з AsyncStorage.getItem(key) і JSON.parse.
  //    Поки триває завантаження — loading: true.
  // 2. Якщо значення нема, або JSON.parse кидає помилку — використати initialValue.
  // 3. setValue: оновлює React-стан І пише в AsyncStorage.setItem(key, JSON.stringify(...)).

  return { value: initialValue, setValue: (v: T) => {}, loading: true };
}`,
    solution: `function useAsyncStorage<T>(key: string, initialValue: T) {
  const [value, setValueState] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (!cancelled && raw !== null) {
          setValueState(JSON.parse(raw) as T);
        }
      } catch {
        // пошкоджені дані в сховищі — тихо лишаємось на initialValue
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key]);

  const setValue = useCallback(
    (next: T) => {
      setValueState(next);
      AsyncStorage.setItem(key, JSON.stringify(next)).catch(() => {
        // best-effort персистентність — React-стан вже оновлено незалежно від диску
      });
    },
    [key],
  );

  return { value, setValue, loading };
}`,
    explanation: `<ul class="list">
      <li>Завантаження — в <code>useEffect</code> з <code>cancelled</code>-прапорцем (той самий патерн, що й для fetch-запитів) — захист від <code>setState</code> після розмонтування, якщо AsyncStorage.getItem ще не встиг відповісти.</li>
      <li><code>try/catch</code> навколо <code>JSON.parse</code> — пошкоджені/несумісні дані в сховищі (наприклад, після зміни формату між версіями застосунку) не повинні валити компонент, а мовчки відкочуються до <code>initialValue</code>.</li>
      <li><code>setValue</code> оновлює React-стан <strong>синхронно</strong>, а запис в AsyncStorage — асинхронний best-effort поруч: UI не чекає на диск, щоб відреагувати на зміну.</li>
      <li><code>useCallback</code> зі стабільною залежністю <code>[key]</code> — щоб <code>setValue</code> можна було безпечно передавати як пропс далі по дереву без зайвих ре-рендерів.</li>
    </ul>`,
  },
  {
    id: 'react-native-flatlist-rerender-fix',
    title: 'FlatList ре-рендерить усі рядки на кожен keystroke',
    level: 'Senior',
    topic: 'React Native',
    priority: 'mid',
    tags: ['FlatList', 'memo', 'useCallback', 'referential equality'],
    language: 'tsx',
    prompt: `<p><strong>Проблема:</strong> екран показує <code>FlatList</code> з користувачами й поле пошуку над ним. При кожному натисканні клавіші в пошуку <strong>всі</strong> рядки списку ре-рендеряться — хоча сам список <code>users</code> не змінюється, змінюється лише незалежний <code>query</code>.</p>
      <p><strong>Завдання:</strong> знайди причину зайвих ре-рендерів рядків і виправ код (без зміни зовнішньої поведінки).</p>`,
    starterCode: `import { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';

interface User {
  id: string;
  name: string;
}

function UserListScreen({ users }: { users: User[] }) {
  const [query, setQuery] = useState('');

  const handlePress = (id: string) => {
    console.log('opened', id);
  };

  return (
    <View>
      <TextInput value={query} onChangeText={setQuery} placeholder="Пошук…" />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

// TODO: чому Pressable/Text у кожному рядку ре-рендериться при зміні query,
// хоча users і сам рядок не залежать від query? Виправ.`,
    solution: `import { useState, useCallback, memo } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';

interface User {
  id: string;
  name: string;
}

const Row = memo(function Row({ item, onPress }: { item: User; onPress: (id: string) => void }) {
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.name}</Text>
    </Pressable>
  );
});

function UserListScreen({ users }: { users: User[] }) {
  const [query, setQuery] = useState('');

  const handlePress = useCallback((id: string) => {
    console.log('opened', id);
  }, []);

  return (
    <View>
      <TextInput value={query} onChangeText={setQuery} placeholder="Пошук…" />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Row item={item} onPress={handlePress} />}
      />
    </View>
  );
}`,
    explanation: `<ul class="list">
      <li>Кожен рендер <code>UserListScreen</code> (а <code>setQuery</code> викликає саме його) створює <strong>новий</strong> inline-<code>renderItem</code> і новий inline <code>handlePress</code> — React Native не знає, що "логічно" це той самий рядок, бачить лише нові референси пропсів.</li>
      <li>Вихід рядка в окремий компонент <code>Row</code>, обгорнутий у <code>memo</code>, сам по собі <strong>не рятує</strong>, поки <code>onPress</code> — новий inline-колбек на кожен рендер батька: <code>memo</code> порівнює пропси поверхнево, а новий референс функції завжди "інший".</li>
      <li><code>useCallback(..., [])</code> для <code>handlePress</code> стабілізує референс між рендерами <code>UserListScreen</code> — тепер <code>memo</code> на <code>Row</code> справді бачить однакові пропси при незмінних <code>item</code>/<code>onPress</code> і пропускає ре-рендер.</li>
      <li><code>keyExtractor</code> додано явно — без нього FlatList падає назад на індекс масиву як ключ, що ламає reconciliation при сортуванні/фільтрації списку (тут не було в оригіналі — це супутній баг того ж класу).</li>
    </ul>`,
  },
  {
    id: 'react-native-appstate-polling-pause',
    title: 'Пауза поллінгу коли застосунок у фоні',
    level: 'Senior',
    topic: 'React Native',
    priority: 'mid',
    tags: ['AppState', 'useEffect', 'setInterval', 'cleanup'],
    language: 'tsx',
    prompt: `<p><strong>Дано:</strong> функція <code>fetchStatus()</code> — емулює запит статусу на бекенд (Promise).</p>
      <p><strong>Завдання:</strong> реалізуй хук <code>useStatusPolling(intervalMs: number)</code>, який:</p>
      <ul class="list">
        <li>поки застосунок <strong>активний</strong> (foreground) — викликає <code>fetchStatus()</code> кожні <code>intervalMs</code> мілісекунд і зберігає останній результат у стані;</li>
        <li>коли застосунок іде <strong>у фон</strong> (background/inactive) — зупиняє поллінг (без зайвих мережевих запитів, поки користувач не дивиться на екран);</li>
        <li>коли застосунок <strong>повертається</strong> на передній план — відновлює поллінг (одразу робить один запит, а не чекає повний інтервал);</li>
        <li>коректно чистить таймер і підписку на <code>AppState</code> при розмонтуванні.</li>
      </ul>`,
    starterCode: `import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

function useStatusPolling(intervalMs: number) {
  const [status, setStatus] = useState<string | null>(null);

  // TODO:
  // 1. Поки застосунок active — setInterval(fetchStatus, intervalMs), зберігати результат.
  // 2. AppState.addEventListener('change', ...) — на перехід у background/inactive зупиняти таймер.
  // 3. На повернення в active — одразу зробити один запит і відновити таймер.
  // 4. Прибрати і таймер, і підписку в cleanup.

  return status;
}

// Задана функція — не змінювати.
declare function fetchStatus(): Promise<string>;`,
    solution: `function useStatusPolling(intervalMs: number) {
  const [status, setStatus] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const poll = () => {
      fetchStatus().then(setStatus).catch(() => {});
    };

    const startPolling = () => {
      if (intervalRef.current) return; // вже йде
      poll(); // одразу один запит при (по)відновленні
      intervalRef.current = setInterval(poll, intervalMs);
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (AppState.currentState === 'active') startPolling();

    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        startPolling();
      } else {
        stopPolling();
      }
    });

    return () => {
      stopPolling();
      subscription.remove();
    };
  }, [intervalMs]);

  return status;
}`,
    explanation: `<ul class="list">
      <li><code>AppState.addEventListener('change', ...)</code> — RN-специфічний API без прямого web-аналога: браузерна вкладка не має поняття "згорнутий на іншому додатку", а мобільний застосунок постійно переходить active/background/inactive.</li>
      <li>Таймер зберігається в <code>useRef</code>, а не в стані — зміна таймера не повинна викликати ре-рендер; <code>intervalRef.current</code> також слугує "прапорцем", чи поллінг уже йде (захист від подвійного <code>setInterval</code> при кількох підряд <code>active</code>-подіях).</li>
      <li>При поверненні в <code>active</code> — одразу один запит <em>плюс</em> перезапуск таймера, а не чекання повного <code>intervalMs</code>: користувач очікує свіжі дані одразу після повернення в застосунок, а не через довільну затримку.</li>
      <li>Cleanup прибирає <strong>і</strong> таймер (<code>clearInterval</code>), <strong>і</strong> підписку (<code>subscription.remove()</code>) — пропуск будь-якого з двох лишає активний поллінг чи orphan-listener після розмонтування компонента.</li>
    </ul>`,
  },
]
