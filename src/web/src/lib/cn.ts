/** Joins class names, dropping the false ones. Small on purpose: no dependency for this. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}
