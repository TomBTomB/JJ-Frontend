export const isNotUndefined = <T>(value: T | undefined): value is T => value !== undefined

export const isUndefined = <T>(value: T | undefined): value is undefined => value === undefined

export const mapUndefined = <T, V>(value: T | undefined, mapper: (t: T) => V): V | undefined =>
  isUndefined(value) ? undefined : mapper(value)