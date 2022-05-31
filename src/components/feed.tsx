import React from 'react'
import { CreatePostCard } from './createPostCard'
import { Post } from '../data/posts'
import { PostCard } from './postCard'
import { Container, Stack } from '@mui/material'

export type FeedProps = {
  posts: Post[]
  onUserPost: (postText: string) => void
}

export const Feed = ({posts, onUserPost}: FeedProps) => {
  return (
    <Container>
      <CreatePostCard buttonMessage="Post it!" placeholder="What's happening?" onPost={onUserPost}/>

      <Stack>

        {posts
          .map(post => <PostCard key={post.id} post={post} shouldNavigate/>)
        }
      </Stack>
    </Container>
  )
}
