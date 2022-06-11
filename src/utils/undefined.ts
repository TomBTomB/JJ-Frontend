export const isNotUndefined = <T>(value: T | undefined): value is T => value !== undefined

export const isUndefined = <T>(value: T | undefined): value is undefined => value === undefined

export const nonUndefined = <T>(value: T | undefined, defaultValue: T): T => isUndefined(value) ? defaultValue : value

export const mapUndefined = <T, V>(value: T | undefined, mapper: (t: T) => V): V | undefined =>
  isUndefined(value) ? undefined : mapper(value)