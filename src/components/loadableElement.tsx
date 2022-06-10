import React, { ReactElement, ReactNode } from 'react'
import { LoadElementState } from './hooks/useLoadElementById'
import { Loading } from './loading'
import { NotFound } from './notFound'
import { Error } from './error'

export type LoadableElementProps<E> = {
  state: LoadElementState<E>
  renderValue: (e: E) => ReactElement
}

export const LoadableElement = <E extends unknown>({state, renderValue}: LoadableElementProps<E>) => {
  switch (state.status) {
    case 'loading':
      return <Loading/>
    case 'not-found':
      return <NotFound/>
    case 'error':
      return <Error error={state.detail}/>
    case 'loaded':
      const {value} = state
      return renderValue(value)
  }
}