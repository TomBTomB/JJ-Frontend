import { FullPost, NewPost, Post, PostData } from '../posts'
import { LocalDataStorage } from './localDataStorage'
import { v4 as uuid } from 'uuid'

export class LocalPostData implements PostData {
  static type: string = 'post'

  constructor(private readonly data: LocalDataStorage<FullPost>) {}

  getFeedPosts(): Promise<Post[]> {
    return Promise.resolve(this.data.getAll())
  }

  getFullPostById(id: string): Promise<FullPost | undefined> {
    return Promise.resolve(this.data.getValue(id))
  }

  createPost(newPost: NewPost): Promise<Post> {
    const post = this.createPostFromNewPost(newPost)

    const fullPost: FullPost = {...post, thread: []}

    return Promise.resolve(this.data.setValue(fullPost.id, fullPost))
  }

  answerPost(postId: string, answer: NewPost): Promise<FullPost> {
    const maybePost = this.data.getValue(postId)

    if (maybePost !== undefined) {
      const newPost = {
        ...maybePost,
        thread: maybePost.thread.concat(this.createPostFromNewPost(answer)),
      }

      return Promise.resolve(this.data.setValue(newPost.id, newPost))
    }

    return Promise.reject(`Post ${postId} not found`)
  }

  private createPostFromNewPost = (newPost: NewPost): Post => ({
    id: uuid(),
    ...newPost,
  })

  getPostsByUser(userId: string): Promise<Post[]> {
    const result = this.data.getAllByPredicate(post => post.user.id === userId)
    return Promise.resolve(result);
  }
}