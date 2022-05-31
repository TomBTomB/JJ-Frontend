import React, { ReactNode, useEffect, useState } from 'react'
import { getUserData, User } from '../data/users'
import { Loading } from '../components/loading'
import { UserContext } from '../components/contexts/userContext'

export type UserLoaderProps = {
  children: ReactNode
}

type UserLoaderState =
  | {
  loaded: false
}
  | {
  loaded: true
  user: User
}

export const UserLoader = ({children}: UserLoaderProps) => {
  const [state, setState] = useState<UserLoaderState>({loaded: false})

  useEffect(() => {
    getUserData().then((user) => {
      setState({loaded: true, user})
    })
  }, [])

  if (!state.loaded)
    return <Loading/>

  return (
    <UserContext.Provider value={state.user}>
      {children}
    </UserContext.Provider>
  )
}