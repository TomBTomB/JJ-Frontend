export type User = {
  id: string
  displayName: string
  username: string
  avatar: string
  bio?: string
}

export interface UserData {
  getCurrentUser(): Promise<User | undefined>

  getUserById(userId: string): Promise<User | undefined>

  searchUser(criteria: string): Promise<User[]>
}
