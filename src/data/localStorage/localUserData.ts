import { User, UserData } from '../users'
import { LocalDataStorage } from './localDataStorage'
import { isNotUndefined, mapUndefined, nonUndefined } from '../../utils/undefined'

export type UserWithFollow = User & {
  isFollowed?: boolean
}

export class LocalUserData implements UserData {
  static type: string = 'user'

  constructor(
    private readonly data: LocalDataStorage<UserWithFollow>,
    private readonly currentUserId: string,
  ) {}

  getCurrentUser(): Promise<UserWithFollow | undefined> {
    return Promise.resolve(this.data.getValue(this.currentUserId))
  }

  getUserById(userId: string): Promise<UserWithFollow | undefined> {
    return Promise.resolve(this.data.getValue(userId))
  }

  isFollowed(userId: string): Promise<boolean | undefined> {
    const result = mapUndefined(this.data.getValue(this.currentUserId), user => user?.isFollowed)
    return Promise.resolve(result)
  }

  toggleFollow(userId: string): Promise<void> {
    const newUser = mapUndefined(
      this.data.getValue(this.currentUserId),
      user => ({...user, isFollowed: !nonUndefined(user.isFollowed, false)}),
    )

    if (isNotUndefined(newUser))
      this.data.setValue(newUser.id, newUser)

    return Promise.resolve(undefined)
  }

}