import type { PracticeTask } from '../types'
import { jsUtilitiesTasks } from './jsUtilities'
import { arraysStringsTasks } from './arraysStrings'
import { asyncTasks } from './async'
import { reactComponentsTasks } from './reactComponents'
import { reactHooksTasks } from './reactHooks'
import { reactDebuggingTasks } from './reactDebugging'
import { domTasks } from './dom'
import { systemDesignTasks } from './systemDesign'
import { rxjsTasks } from './rxjs'
import { angularTasks } from './angular'
import { reactNativeTasks } from './reactNative'

// Interview-style practice exercises ("fix / complete / solve") in the spirit of
// live-coding rounds. Static study cards: for 'code' tasks the editor is editable
// so you can attempt a solution, then reveal the reference answer — nothing is
// executed. 'discussion' tasks (system design) hide the editor and show a
// structured reference answer instead.
//
// Grouped to mirror the interview-prep checklist
// (Docs/Tech_Interview_Practice_Tasks_Roman_UA.md) sections A–H, plus the
// original RxJS / Angular / React Native sets.
export const practiceTasks: PracticeTask[] = [
  ...jsUtilitiesTasks, // A. JavaScript Utilities
  ...arraysStringsTasks, // B. Масиви та рядки
  ...asyncTasks, // C. Async / Promises
  ...reactComponentsTasks, // D. React Components
  ...reactHooksTasks, // E. React Custom Hooks
  ...reactDebuggingTasks, // F. React Debugging
  ...domTasks, // G. DOM / Vanilla JS
  ...systemDesignTasks, // H. Frontend System Design (discussion)
  ...rxjsTasks,
  ...angularTasks,
  ...reactNativeTasks,
]
