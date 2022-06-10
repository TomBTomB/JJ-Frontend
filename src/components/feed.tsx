import React from 'react'

import { Stack } from '@mui/material'

import { Post } from '../data/posts'
import { PostCard } from './postCard'

export type FeedProps = {
  posts: Post[]
}

export const Feed = ({posts}: FeedProps) => {
  return (
    <Stack>
      {posts
        .map(post => <PostCard key={post.id} post={post} shouldNavigate/>)
      }
    </Stack>
  )
}
