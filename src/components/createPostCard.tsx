import React, { useCallback, useMemo, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import { useUserContext } from './contexts/userContext'

export type CreatePostCardProps = {
  placeholder: string
  buttonMessage: string
  onPost: (postText: string) => void
  sx?: SxProps<Theme>
}

const cardStyle: SxProps<Theme> = {
  margin: '10px',
}

const inputStyle: SxProps<Theme> = {
  width: '100%',
}

export const CreatePostCard = ({onPost, buttonMessage, placeholder, sx}: CreatePostCardProps) => {
  const {displayName, username, avatar} = useUserContext()

  const [postText, setPostText] = useState('')

  const handleTextChange =
    useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPostText(event.target.value), [setPostText])

  const handleSendPost = useCallback(() => {
    onPost(postText)
    setPostText('')
  }, [onPost, postText, setPostText])

  const handleKeyPress =
    useCallback((event: React.KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && !event.shiftKey && setTimeout(handleSendPost), [handleSendPost])

  const fullCardStyle = useMemo(() => ({...cardStyle, ...sx}), [sx])

  return (
    <Card sx={fullCardStyle}>
      <CardHeader
        avatar={<Avatar src={avatar}/>}
        title={displayName}
        subheader={`@${username}`}
      />

      <CardContent>
        <TextField
          id="outlined-multiline-static"
          label={placeholder}
          multiline
          rows={2}
          onChange={handleTextChange}
          value={postText}
          sx={inputStyle}
          onKeyPress={handleKeyPress}
        />
      </CardContent>


      <CardActions>
        <Button size="medium" onClick={handleSendPost}>{buttonMessage}</Button>
      </CardActions>
    </Card>
  )
}
