import manifest from './contentManifest.generated.json'

// First-seen date per trackable content key (see scripts/stamp-new-content.mjs).
const ENTRIES = manifest.entries as Record<string, string>

// Content dated on/after this is eligible for the red "new" dot; everything
// older is treated as already seen. Single source of truth is the manifest.
export const NEW_SINCE = manifest.newSince

// A key is "new" for a given user when the platform added it recently AND the
// user has not dismissed it. `seenNew` comes from userStore (UserData.seenNew).
export function isKeyNew(key: string, seenNew: Record<string, true>): boolean {
  if (seenNew[key]) return false
  const added = ENTRIES[key]
  return added !== undefined && added >= NEW_SINCE
}

// Of `keys`, the ones the platform added recently, regardless of dismissal —
// used to decide whether "mark all as seen" is worth showing.
export function recentlyAddedKeys(keys: string[]): string[] {
  return keys.filter((k) => {
    const added = ENTRIES[k]
    return added !== undefined && added >= NEW_SINCE
  })
}
