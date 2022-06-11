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

  isFollowed(userId: string): Promise<boolean | undefined>

  toggleFollow(userId: string): Promise<void>
}
