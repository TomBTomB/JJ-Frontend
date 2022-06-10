import { User, UserData } from '../users'
import { LocalDataStorage } from './localDataStorage'

export class LocalUserData implements UserData {
  static type: string = 'user'

  constructor(
    private readonly data: LocalDataStorage<User>,
    private readonly currentUserId: string,
  ) {}

  getCurrentUser(): Promise<User | undefined> {
    return Promise.resolve(this.data.getValue(this.currentUserId))
  }

  getUserById(userId: string): Promise<User | undefined> {
    return Promise.resolve(this.data.getValue(userId))
  }

  searchUser(searchString: string): Promise<User[]> {
    const result = this.data.getAllByPredicate(user =>
      user.username.includes(searchString) || user.displayName.includes(searchString),
    )

    return Promise.resolve(result)
  }

}