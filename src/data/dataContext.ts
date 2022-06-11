import { createContext, useContext } from 'react'

import { FullPost, PostData } from './posts'
import {ApiPostData} from "./api/apiPostData";
import { User, UserData } from './users'
import {ApiUserData} from "./api/apiUserData";

export interface DataContainer {
  posts: PostData
  users: UserData
}

export const DataContext = createContext<DataContainer>({
  // posts: new LocalPostData(new LocalDataStorage<FullPost>(LocalPostData.type)),
  posts: new ApiPostData(),
  // users: new LocalUserData(new LocalDataStorage<User>(LocalUserData.type), ''),
  users: new ApiUserData(),
})

export const usePostData = (): PostData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.posts
}

export const useUserData = (): UserData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.users
}