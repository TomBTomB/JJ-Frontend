import { createContext, useContext } from 'react'

import { FullPost, PostData } from './posts'
import { LocalPostData } from './localStorage/localPostData'
import { LocalDataStorage } from './localStorage/localDataStorage'
import {ApiPostData} from "./api/apiPostData";
import { User, UserData } from './users'
import { LocalUserData } from './localStorage/localUserData'

export interface DataContainer {
  posts: PostData
  users: UserData
}

export const DataContext = createContext<DataContainer>({
  // posts: new LocalPostData(new LocalDataStorage<FullPost>(LocalPostData.type)),
  posts: new ApiPostData(),
  users: new LocalUserData(new LocalDataStorage<User>(LocalUserData.type), ''),
})

export const usePostData = (): PostData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.posts
}

export const useUserData = (): UserData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.users
}