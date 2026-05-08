export { }

declare global {
  interface Promise<T> {
    validateResponse(errorMessage?: string): Promise<NonNullable<T>>
  }
}

Promise.prototype.validateResponse = async function <T>(
  this: Promise<T>,
  errorMessage?: string
): Promise<NonNullable<T>> {
  const response = await this

  if (response == null) {
    throw new Error(errorMessage ?? 'Response validation failed')
  }

  return response as NonNullable<T>
}
