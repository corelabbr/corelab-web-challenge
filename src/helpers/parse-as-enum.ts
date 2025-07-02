export function parseAsEnum<T>(value: string | null, items: T[]): T | null {
  if (items.includes(value as T)) {
    return value as T
  }

  return null
}
