import { isNotNull } from '../../utils/null'

export class LocalDataStorage<T> {
  private keySeparator = `~`

  constructor(private readonly type: string) {}

  getValue = (id: string): T | undefined => {
    let maybeStringValue = localStorage.getItem(this.createKey(id))
    if (maybeStringValue === null || maybeStringValue === undefined)
      return undefined
    else
      return JSON.parse(maybeStringValue)
  }

  setValue = (id: string, value: T): T => {
    const stringValue = JSON.stringify(value)
    localStorage.setItem(this.createKey(id), stringValue)

    return value
  }

  getAll = (): T[] =>
    Object.keys(localStorage)
      .filter(key => key.split(this.keySeparator)[0] === this.type)
      .map(key => localStorage.getItem(key))
      .filter(isNotNull)
      .map(value => JSON.parse(value))

  getAllByPredicate = (predicate: (t: T) => boolean): T[] =>
    this.getAll().filter(predicate)

  private createKey = (id: string): string => this.type + this.keySeparator + id
}