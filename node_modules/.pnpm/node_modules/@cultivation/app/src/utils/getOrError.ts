export function getOrError<T>(value: T | null | undefined, message?: string): T {
  if (value == null) throw new Error(message ?? 'Value is null or undefined')
  return value
}
