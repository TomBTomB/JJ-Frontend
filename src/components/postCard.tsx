import React, { useCallback } from 'react'
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material'
import { Post } from '../data/posts'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

export type PostCardProps = {
  post: Post
  sx?: SxProps<Theme>
  shouldNavigate?: boolean
}

const cardStyle: SxProps<Theme> = {
  margin: '10px',
}

export const PostCard = ({post, sx, shouldNavigate = false}: PostCardProps) => {
  const navigate = useNavigate()

  const {text, user} = post
  const {displayName, username, avatar} = user

  const mergedCardStyle = {...cardStyle, ...sx}

  const handleContentClick = useCallback(() => {
    if (shouldNavigate)
      navigate(`/posts/${post.id}`)
  }, [navigate, post.id])

  const handleHeaderClick = useCallback(() => navigate(`/users/${post.user.id}`), [navigate, post.user.id])

  return (
    <Card sx={mergedCardStyle}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar src={avatar}/>}
          title={displayName}
          subheader={`@${username}`}
          onClick={handleHeaderClick}
        />
        <CardContent onClick={handleContentClick}>
          <Typography variant="body1" color="text.primary">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
