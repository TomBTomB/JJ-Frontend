import React from 'react'
import { Container, Stack } from '@mui/material'
import { FullPost } from '../data/posts'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import { PostCard } from './postCard'
import { CreatePostCard } from './createPostCard'

export type PostCardProps = {
  post: FullPost
  onPostAnswer: (postText: string) => void
}

const answerStyle: SxProps<Theme> = {
  margin: '10px 20px',
}

export const PostDetail = ({post, onPostAnswer}: PostCardProps) => {
  return (
    <Container>
      <PostCard post={post}/>

      <CreatePostCard
        buttonMessage="Answer"
        placeholder="What do you think of this?"
        onPost={onPostAnswer}
        sx={answerStyle}
      />

      <Stack>
        {post.thread
          .map(answer => (<PostCard key={answer.id} post={answer} sx={answerStyle}/>))
        }
      </Stack>


    </Container>
  )
}
