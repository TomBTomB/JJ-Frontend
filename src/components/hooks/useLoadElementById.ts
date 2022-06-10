import { useCallback, useEffect, useMemo, useState } from 'react'
import { isUndefined } from '../../utils/undefined'

export type LoadElementState<E> =
  | {
  status: 'loading'
}
  | {
  status: 'not-found'
}
  | {
  status: 'error'
  detail: string
}
  | {
  status: 'loaded'
  value: E
}

const LoadingState: LoadElementState<any> = {status: 'loading'}

const NotFoundState: LoadElementState<any> = {status: 'not-found'}

export const useLoadElementById = <E>(id: string | undefined, loader: (id: string) => Promise<E | undefined>) => {
  const [state, setState] = useState<LoadElementState<E>>(LoadingState)

  const load = useCallback(() => {
    if (isUndefined(id))
      setState(NotFoundState)
    else
      loader(id).then(element => {
        if (element === undefined)
          setState(NotFoundState)
        else
          setState({status: 'loaded', value: element})
      })
        .catch(error => ({status: 'error', detail: error.toString()}))
  }, [setState, loader])

  useEffect(() => load(), [])

  return useMemo(() => ({
    state,
    load,
  }), [state])
}