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

  const handleClick = useCallback(() => {
    if (shouldNavigate)
      navigate(`/posts/${post.id}`)
  }, [navigate, post.id])

  return (
    <Card sx={mergedCardStyle} onClick={handleClick}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar src={avatar}/>}
          title={displayName}
          subheader={`@${username}`}
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
