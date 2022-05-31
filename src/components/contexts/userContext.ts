import { User } from '../../data/users'
import { createContext, useContext } from 'react'

export const UserContext = createContext<User>(undefined as unknown as User)

export const useUserContext = () => useContext(UserContext)