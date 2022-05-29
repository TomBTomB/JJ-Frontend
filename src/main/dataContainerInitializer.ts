import { DataContainer } from '../data/dataContext'
import { LocalPostData } from '../data/localStorage/localPostData'
import { FullPost } from '../data/posts'
import { User } from '../data/users'
import { LocalDataStorage } from '../data/localStorage/localDataStorage'
import {ApiPostData} from "../data/api/apiPostData";

const initialUsers: User[] = [
  {
    id: '806a7f05-479c-4e43-9554-27c3af4d973c',
    displayName: 'Bird Person',
    username: 'little_bird',
    avatar: '/generic-avatar.jpg',
  },
  {
    id: '56892d6a-fd7c-4c1c-9fc6-1554c2243fdc',
    displayName: 'Joe Doe',
    username: 'joedoe',
    avatar: '/generic-avatar.jpg',
  },
  {
    id: '85ce0a1e-cd98-4c64-bb12-14bbc1a1f36e',
    displayName: 'Homer',
    username: 'homer',
    avatar: '/generic-avatar.jpg',
  },
]

const initialPosts: FullPost[] = [
  {
    id: 'bb558482-6bc9-4529-9551-0a1141741627',
    user: initialUsers[1],
    text: 'Really great',
    thread: [],
  },
  {
    id: '28c0143f-12d7-41e9-85e5-8eb813339862',
    user: initialUsers[1],
    text: 'I\'m great',
    thread: [
      {
        id: '32beae9b-d3af-45bc-88f8-4cb792c95a09',
        user: initialUsers[0],
        text: 'Not that great...'
      }
    ],
  },
  {
    id: '700e1d1a-fcc7-4389-9d2e-159f8419da53',
    user: initialUsers[2],
    text: 'Doh!',
    thread: [],
  },
]

export const createDataContainer = (): Promise<DataContainer> => {

  // const postStorage = new LocalDataStorage<FullPost>(LocalPostData.type)
  //
  // if (postStorage.getAll().length === 0)
  //   initialPosts.forEach(post => postStorage.setValue(post.id, post))

  return Promise.resolve({
    posts: new ApiPostData()
  })
}